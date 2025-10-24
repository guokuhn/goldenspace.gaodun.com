import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, CheckCircle, Download, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';
import { TaskResponse } from '../types/api';

interface ScheduleItem {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function MobileSchedulePage() {
  const [searchParams] = useSearchParams();
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [addedToCalendar, setAddedToCalendar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 从 URL 参数获取信息
    const userId = searchParams.get('userId') || '';
    const startTime = searchParams.get('startTime') || '';
    const endTime = searchParams.get('endTime') || '';
    
    // 如果有 title 参数，说明是单个日程模式（兼容旧版）
    const title = searchParams.get('title');
    if (title) {
      const description = searchParams.get('description') || '';
      const date = searchParams.get('date') || '';
      setSchedules([{
        title,
        description,
        date,
        startTime: '09:00',
        endTime: '10:00'
      }]);
      setLoading(false);
      return;
    }
    
    // 批量获取任务列表
    if (userId && startTime) {
      fetchTasksAndGenerateSchedules(userId, startTime, endTime);
    } else {
      setError('缺少必要的参数');
      setLoading(false);
    }
  }, [searchParams]);

  const fetchTasksAndGenerateSchedules = async (userId: string, startTime: string, endTime: string) => {
    try {
      setLoading(true);
      setError('');
      
      // 调用 API 获取任务列表
      const response = await apiService.getTaskList({
        userId,
        startDay: startTime,
        endDay: endTime
      });
      
      if (response.status !== 200 || !response.result) {
        throw new Error(response.message || '获取任务列表失败');
      }
      
      // 将任务转换为日程列表
      const taskList: TaskResponse[] = response.result;
      const scheduleList: ScheduleItem[] = taskList.map((task, index) => {
        // 计算每个任务的时间（间隔1小时）
        const hour = 9 + index; // 从早上9点开始
        const startTime = `${hour.toString().padStart(2, '0')}:00`;
        const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
        
        return {
          title: task.taskName || '未命名任务',
          description: task.taskDesc || '',
          date: task.taskDate || startTime,
          startTime,
          endTime
        };
      });
      
      setSchedules(scheduleList);
    } catch (err: any) {
      console.error('获取任务失败:', err);
      setError(err.message || '加载失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCalendar = () => {
    if (schedules.length === 0) {
      alert('暂无日程数据');
      return;
    }
    
    // 创建包含所有日程的 ICS 文件
    let icsEvents = '';
    
    schedules.forEach((schedule, index) => {
      const { title, description, date, startTime, endTime } = schedule;
      
      if (!date) return;
      
      // 格式化日期和时间为 ICS 格式
      const formattedDate = date.replace(/-/g, '');
      const formattedStartTime = startTime.replace(/:/g, '') + '00';
      const formattedEndTime = endTime.replace(/:/g, '') + '00';
      
      const startDateTime = `${formattedDate}T${formattedStartTime}`;
      const endDateTime = `${formattedDate}T${formattedEndTime}`;
      
      icsEvents += `BEGIN:VEVENT
UID:golden-space-${Date.now()}-${index}@gaodun.com
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:${title}
DESCRIPTION:${description}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
`;
    });
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Golden Space//Schedule//CN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${icsEvents}END:VCALENDAR`;

    // 创建 Blob 并下载
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `golden-space-schedules-${schedules.length}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    setAddedToCalendar(true);
    
    // 2秒后重置状态
    setTimeout(() => {
      setAddedToCalendar(false);
    }, 2000);
  };

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="text-primary-400 mx-auto mb-4 animate-spin" size={48} />
          <p className="text-neutral-600">正在加载日程...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <Calendar className="text-neutral-300 mx-auto mb-4" size={64} />
          <p className="text-neutral-500 mb-2">加载失败</p>
          <p className="text-sm text-neutral-400">{error}</p>
        </div>
      </div>
    );
  }

  // 无数据状态
  if (schedules.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <Calendar className="text-neutral-300 mx-auto mb-4" size={64} />
          <p className="text-neutral-500">暂无日程数据</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* 顶部装饰 */}
      <div className="bg-primary-400 h-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>

      {/* 内容卡片 */}
      <div className="relative -mt-16 px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
          {/* 标题区域 */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Calendar className="text-primary-400" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 mb-2">添加到手机日历</h1>
            <p className="text-sm text-neutral-500">Golden Space 日程同步 · 共 {schedules.length} 个日程</p>
          </div>

          {/* 日程列表 */}
          <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
            {schedules.map((schedule, index) => (
              <div key={index} className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-neutral-800 mb-1">{schedule.title}</h3>
                    {schedule.description && (
                      <p className="text-sm text-neutral-600 mb-2">{schedule.description}</p>
                    )}
                    <div className="flex items-center space-x-2 text-xs text-neutral-500">
                      <span>{schedule.date}</span>
                      <span>·</span>
                      <span>{schedule.startTime} - {schedule.endTime}</span>
                    </div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 操作按钮 */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCalendar}
              disabled={addedToCalendar}
              className={`w-full flex items-center justify-center space-x-2 py-4 rounded-xl font-semibold transition-all ${
                addedToCalendar
                  ? 'bg-success text-white'
                  : 'bg-primary-400 text-white hover:bg-primary-500 active:scale-95'
              }`}
            >
              {addedToCalendar ? (
                <>
                  <CheckCircle size={20} />
                  <span>已添加 {schedules.length} 个日程</span>
                </>
              ) : (
                <>
                  <Download size={20} />
                  <span>一键添加所有日程到日历</span>
                </>
              )}
            </button>
          </div>

          {/* 提示信息 */}
          <div className="mt-6 bg-primary-50 border border-primary-200 rounded-xl p-4">
            <p className="text-xs text-neutral-600 leading-relaxed">
              <span className="font-semibold">💡 使用说明：</span>
              <br />
              • 点击按钮会下载包含所有日程的 .ics 文件到手机
              <br />
              • 用手机日历应用（iOS 日历 / Google 日历等）打开文件即可批量添加
              <br />
              • iOS 用户：下载后在"文件"应用中找到 .ics 文件，点击即可导入
              <br />
              • Android 用户：推荐使用 Google 日历打开下载的文件
            </p>
          </div>
        </div>

        {/* 底部品牌信息 */}
        <div className="text-center mt-8">
          <p className="text-sm text-neutral-400">Powered by Golden Space</p>
          <p className="text-xs text-neutral-300 mt-1">大学生成长云空间</p>
        </div>
      </div>
    </div>
  );
}

