import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, Circle, Plus, TrendingUp, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockSchedules, weeklyCheckInData, weeklyPointsData } from '../data/mockData';

interface MyScheduleProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

export default function MySchedule({ isLoggedIn, onLoginClick }: MyScheduleProps) {
  const [schedules, setSchedules] = useState(mockSchedules);

  const toggleComplete = (id: string) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, status: s.status === 'completed' ? 'pending' : 'completed' } : s
    ));
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="text-primary-500" size={24} />
            <h2 className="text-xl font-bold text-gray-800">我的日程</h2>
          </div>
        </div>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-gray-600 mb-6">登录后开始制定您的成长计划</p>
          <button
            onClick={onLoginClick}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            立即登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="text-primary-500" size={24} />
          <h2 className="text-xl font-bold text-gray-800">我的日程</h2>
        </div>
        <Link 
          to="/schedule"
          className="text-primary-500 hover:text-primary-600 flex items-center space-x-1 text-sm"
        >
          <span>查看详情</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* 左右两栏布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 左侧：日程事项 */}
        <div>
          <div className="space-y-3 mb-6">
            {schedules.slice(0, 5).map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <button
                  onClick={() => toggleComplete(schedule.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {schedule.status === 'completed' ? (
                    <CheckCircle className="text-accent-500" size={20} />
                  ) : (
                    <Circle className="text-gray-400" size={20} />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${schedule.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {schedule.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{schedule.date} · {schedule.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      +{schedule.points}积分
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            <Plus size={20} />
            <span>添加日程</span>
          </button>
        </div>

        {/* 右侧：趋势图 */}
        <div className="space-y-6">
          {/* 日程完成趋势 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="text-accent-500" size={20} />
              <h3 className="font-semibold text-gray-800">日程完成趋势</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={weeklyCheckInData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 积分增长趋势 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="text-primary-500" size={20} />
              <h3 className="font-semibold text-gray-800">积分增长趋势</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={weeklyPointsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="points" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

