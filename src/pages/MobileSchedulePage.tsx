import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, CheckCircle, Smartphone, Download } from 'lucide-react';

export default function MobileSchedulePage() {
  const [searchParams] = useSearchParams();
  const [scheduleData, setScheduleData] = useState({
    title: '',
    description: '',
    date: ''
  });
  const [addedToCalendar, setAddedToCalendar] = useState(false);

  useEffect(() => {
    // 从 URL 参数获取日程信息
    const title = searchParams.get('title') || '';
    const description = searchParams.get('description') || '';
    const date = searchParams.get('date') || '';
    
    setScheduleData({ title, description, date });
  }, [searchParams]);

  const handleAddToCalendar = () => {
    const { title, description, date } = scheduleData;
    
    if (!date) {
      alert('日期信息缺失');
      return;
    }
    
    // 格式化日期为 ICS 格式 (YYYYMMDD)
    const formattedDate = date.replace(/-/g, '');
    const startDateTime = `${formattedDate}T090000Z`; // 默认早上9点 UTC
    const endDateTime = `${formattedDate}T100000Z`; // 默认10点结束 UTC
    
    // 创建 ICS 文件内容
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Golden Space//Schedule//CN
BEGIN:VEVENT
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:${title}
DESCRIPTION:${description}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    // 创建 Blob 并下载
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.ics`;
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

  const handleAddToiOSCalendar = () => {
    const { title, description, date } = scheduleData;
    
    if (!date) {
      alert('日期信息缺失');
      return;
    }
    
    // iOS 使用 webcal 协议或直接打开日历应用
    // 这里我们使用 Google Calendar 的 URL scheme 作为兼容方案
    const startDate = new Date(date + 'T09:00:00');
    const endDate = new Date(date + 'T10:00:00');
    
    // 格式化为 Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
    
    window.open(googleCalendarUrl, '_blank');
    setAddedToCalendar(true);
    
    setTimeout(() => {
      setAddedToCalendar(false);
    }, 2000);
  };

  if (!scheduleData.title) {
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
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
          {/* 标题区域 */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Calendar className="text-primary-400" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 mb-2">添加到手机日历</h1>
            <p className="text-sm text-neutral-500">Golden Space 日程同步</p>
          </div>

          {/* 日程信息 */}
          <div className="space-y-4 mb-6">
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <h3 className="text-sm font-semibold text-neutral-500 mb-2">日程标题</h3>
              <p className="text-lg font-bold text-neutral-800">{scheduleData.title}</p>
            </div>

            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <h3 className="text-sm font-semibold text-neutral-500 mb-2">日程描述</h3>
              <p className="text-neutral-700">{scheduleData.description}</p>
            </div>

            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <h3 className="text-sm font-semibold text-neutral-500 mb-2">日期时间</h3>
              <p className="text-neutral-800 font-medium">{scheduleData.date} 09:00</p>
            </div>
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
                  <span>已添加到日历</span>
                </>
              ) : (
                <>
                  <Download size={20} />
                  <span>下载日历文件 (.ics)</span>
                </>
              )}
            </button>

            <button
              onClick={handleAddToiOSCalendar}
              className="w-full flex items-center justify-center space-x-2 bg-white text-primary-400 py-4 rounded-xl font-semibold border-2 border-primary-400 hover:bg-primary-50 active:scale-95 transition-all"
            >
              <Smartphone size={20} />
              <span>在线添加到日历</span>
            </button>
          </div>

          {/* 提示信息 */}
          <div className="mt-6 bg-primary-50 border border-primary-200 rounded-xl p-4">
            <p className="text-xs text-neutral-600 leading-relaxed">
              <span className="font-semibold">💡 使用说明：</span>
              <br />
              • 点击"下载日历文件"会下载 .ics 文件到手机，然后用日历应用打开即可添加
              <br />
              • 点击"在线添加到日历"会跳转到 Google 日历，适用于各种手机
              <br />
              • iOS 用户可以直接用系统日历应用打开下载的文件
              <br />
              • Android 用户推荐使用 Google 日历打开
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

