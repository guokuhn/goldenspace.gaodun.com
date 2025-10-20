import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle, Circle, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateUserSchedules, weeklyPointsData, scheduleUserNames, userAvatars } from '../data/mockData';

export default function UserScheduleDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  const [schedules, setSchedules] = useState<any[]>([]);
  const [view, setView] = useState<'week' | 'month' | 'semester' | 'year'>('week');
  
  // 模拟用户信息
  const userInfo = {
    id: userId || '1',
    name: scheduleUserNames[(parseInt(userId || '1') - 1) % scheduleUserNames.length],
    school: ['清华大学', '北京大学', '复旦大学', '浙江大学', '上海交通大学'][parseInt(userId || '1') % 5],
    avatar: userAvatars[(parseInt(userId || '1') - 1) % userAvatars.length],
    points: 2000 - parseInt(userId || '1') * 30
  };

  useEffect(() => {
    if (userId) {
      // 生成用户的日程数据
      const userSchedulesData = generateUserSchedules(userId);
      setSchedules(userSchedulesData);
    }
  }, [userId]);

  // 模拟学习时间数据
  const learningTimeData = Array.from({ length: 12 }, (_, i) => ({
    month: `${i + 1}月`,
    hours: 20 + parseInt(userId || '1') * 2 + Math.floor(Math.random() * 20)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/schedule-square" className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors">
            <ArrowLeft size={20} className="hover:text-primary-500 transition-colors" />
            <span>返回日程广场</span>
          </Link>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{userInfo.avatar}</span>
            <h1 className="text-2xl font-bold text-gray-800">{userInfo.name}的日程</h1>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{userInfo.avatar}</div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{userInfo.name}</h2>
                <p className="text-gray-600">{userInfo.school}</p>
              </div>
            </div>
            <div className="bg-tech-100 text-tech-700 px-4 py-2 rounded-lg font-semibold text-lg">
              {userInfo.points} 积分
            </div>
          </div>
        </div>

        {/* 视图切换 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex space-x-2 mb-6">
            {(['week', 'month', 'semester', 'year'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  view === v
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {v === 'week' ? '周' : v === 'month' ? '月' : v === 'semester' ? '学期' : '年度'}
              </button>
            ))}
          </div>

          {/* 日程列表 */}
          <div className="space-y-3">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="mt-1 flex-shrink-0">
                  {schedule.status === 'completed' ? (
                    <CheckCircle className="text-accent-500 group-hover:scale-110 transition-transform duration-300" size={24} />
                  ) : (
                    <Circle className="text-gray-400 group-hover:text-primary-500 transition-colors" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-semibold ${schedule.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {schedule.title}
                    </h3>
                    <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-semibold">
                      +{schedule.points}积分
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{schedule.description}</p>
                  <div className="flex items-center space-x-2 group">
                    <Calendar size={14} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                    <span className="text-xs text-gray-500 group-hover:text-primary-600 transition-colors">{schedule.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 学习数据统计 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-primary-50">
          <div className="flex items-center space-x-2 mb-6 group">
            <BarChart3 className="text-tech-500 group-hover:text-tech-600 transition-colors" size={24} />
            <h2 className="text-xl font-bold text-gray-800">学习数据统计</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-primary-50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">积分趋势</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyPointsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="week" tick={{ fill: '#6b7280' }} />
                    <YAxis tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: '1px solid #fcd34d',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="points" 
                      stroke="#008cff" 
                      strokeWidth={3} 
                      dot={{ stroke: '#008cff', strokeWidth: 2, r: 5, fill: 'white' }}
                      activeDot={{ r: 7, stroke: '#008cff', strokeWidth: 2, fill: '#008cff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-primary-50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">学习时长 (小时/月)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={learningTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" tick={{ fill: '#6b7280' }} />
                    <YAxis tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: '1px solid #fcd34d',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#ff6b1a" 
                      strokeWidth={3} 
                      dot={{ stroke: '#ff6b1a', strokeWidth: 2, r: 5, fill: 'white' }}
                      activeDot={{ r: 7, stroke: '#ff6b1a', strokeWidth: 2, fill: '#ff6b1a' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}