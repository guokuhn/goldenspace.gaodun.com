import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle, Circle, Plus, Settings, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User } from '../types';
import { mockSchedules, weeklyCheckInData, weeklyPointsData } from '../data/mockData';

interface ScheduleDetailPageProps {
  user: User | null;
}

export default function ScheduleDetailPage({ user }: ScheduleDetailPageProps) {
  const [view, setView] = useState<'week' | 'month' | 'semester' | 'year'>('week');
  const [schedules, setSchedules] = useState(mockSchedules);
  const [showSetupModal, setShowSetupModal] = useState(!user);

  const toggleComplete = (id: string) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, status: s.status === 'completed' ? 'pending' : 'completed' } : s
    ));
  };

  const learningTimeData = Array.from({ length: 12 }, (_, i) => ({
    month: `${i + 1}月`,
    hours: Math.floor(Math.random() * 40) + 20
  }));

  const referralData = Array.from({ length: 12 }, (_, i) => ({
    month: `${i + 1}月`,
    count: Math.floor(Math.random() * 15) + 5
  }));

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors">
            <ArrowLeft size={20} className="hover:text-primary-500 transition-colors" />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">我的日程</h1>
          <button
            onClick={() => setShowSetupModal(true)}
            className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all group"
          >
            <Settings size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            <span>计划设置</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 视图切换 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex space-x-2 mb-6">
            {(['week', 'month', 'semester', 'year'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  view === v
                    ? 'primary-button'
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
                <button
                  onClick={() => toggleComplete(schedule.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {schedule.status === 'completed' ? (
                    <CheckCircle className="text-accent-500 group-hover:scale-110 transition-transform duration-300" size={24} />
                  ) : (
                    <Circle className="text-gray-400 group-hover:text-primary-500 transition-colors cursor-pointer" size={24} />
                  )}
                </button>
                <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-base font-semibold ${schedule.status === 'completed' ? 'text-gray-400 line-through' : 'module-secondary'}`}>
                {schedule.title}
              </h3>
              <span className="text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full font-semibold">
                +{schedule.points}积分
              </span>
            </div>
            <p className="text-xs module-primary mt-1">{schedule.description}</p>
                  <div className="flex items-center space-x-2 group">
                    <Calendar size={14} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                    <span className="text-xs text-gray-500 group-hover:text-primary-600 transition-colors">{schedule.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300 group">
            <Plus size={20} className="transform group-hover:rotate-90 transition-transform duration-300" />
            <span>添加新日程</span>
          </button>
        </div>

        {/* 统计图表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 成长轨迹 */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center space-x-2 mb-4 group">
              <BarChart3 className="text-primary-500 group-hover:text-primary-600 transition-colors" size={20} />
              <h2 className="text-base font-bold text-gray-800">成长轨迹 - 日程完成趋势</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyCheckInData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 11 }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #fcd34d',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#2790FD" 
                  strokeWidth={3} 
                  dot={{ stroke: '#2790FD', strokeWidth: 2, r: 5, fill: 'white' }}
                  activeDot={{ r: 7, stroke: '#2790FD', strokeWidth: 2, fill: '#2790FD' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        
          <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2 mb-4 group">
              <BarChart3 className="text-primary-500 group-hover:text-primary-600 transition-colors" size={20} />
              <h2 className="text-base font-bold text-neutral-800">成长轨迹 - 积分增长趋势</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyPointsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 11 }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
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
                  stroke="#FF5792" 
                  strokeWidth={3} 
                  dot={{ stroke: '#FF5792', strokeWidth: 2, r: 5, fill: 'white' }}
                  activeDot={{ r: 7, stroke: '#FF5792', strokeWidth: 2, fill: '#FF5792' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 学习达人 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2 mb-4 group">
              <BarChart3 className="text-secondary-500 group-hover:text-secondary-600 transition-colors" size={20} />
              <h2 className="text-base font-bold text-neutral-800">学习达人 - 观看时长</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={learningTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
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
                  stroke="#2790FD" 
                  strokeWidth={3} 
                  dot={{ stroke: '#2790FD', strokeWidth: 2, r: 5, fill: 'white' }}
                  activeDot={{ r: 7, stroke: '#2790FD', strokeWidth: 2, fill: '#2790FD' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 朋友圈达人 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-2 mb-4 group">
              <BarChart3 className="text-accent-500 group-hover:text-accent-600 transition-colors" size={20} />
              <h2 className="text-base font-bold text-gray-800">朋友圈达人 - 拉新助力</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={referralData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #fcd34d',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#1a92ff" 
                  strokeWidth={3} 
                  dot={{ stroke: '#1a92ff', strokeWidth: 2, r: 5, fill: 'white' }}
                  activeDot={{ r: 7, stroke: '#1a92ff', strokeWidth: 2, fill: '#1a92ff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 计划设置模态框 */}
      {showSetupModal && (
        <PlanSetupModal onClose={() => setShowSetupModal(false)} />
      )}
    </div>
  );
}

function PlanSetupModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    school: '',
    major: '',
    grade: '',
    goal: ''
  });

  const questions = [
    { key: 'school', question: '请问您就读于哪所学校？', placeholder: '例如：清华大学' },
    { key: 'major', question: '您的专业是什么？', placeholder: '例如：计算机科学与技术' },
    { 
      key: 'grade', 
      question: '您目前是几年级？', 
      options: ['大一', '大二', '大三', '大四'] 
    },
    { 
      key: 'goal', 
      question: '您的毕业目标是什么？', 
      options: ['普通就业', '体制内就业', '保研', '考研', '留学'] 
    }
  ];

  const currentQuestion = questions[step];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // 生成计划
      alert('日程计划已生成！');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">制定您的成长计划</h2>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">步骤 {step + 1}/{questions.length}</span>
            <span className="text-sm text-gray-600">{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-gradient transition-all duration-300"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xl font-semibold text-gray-800 mb-4">{currentQuestion.question}</p>
          
          {currentQuestion.options ? (
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFormData({ ...formData, [currentQuestion.key]: option });
                    setTimeout(handleNext, 300);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData[currentQuestion.key as keyof typeof formData] === option
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={formData[currentQuestion.key as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [currentQuestion.key]: e.target.value })}
              placeholder={currentQuestion.placeholder}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          )}
        </div>

        <div className="flex space-x-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              上一步
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!formData[currentQuestion.key as keyof typeof formData]}
            className="flex-1 primary-button py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {step === questions.length - 1 ? '生成计划' : '下一步'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}

