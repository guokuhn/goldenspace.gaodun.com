import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Trophy } from 'lucide-react';

export default function ScheduleSquarePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    grade: '',
    goal: '',
    school: '',
    major: ''
  });

  const grades = ['大一', '大二', '大三', '大四'];
  const goals = ['普通就业', '体制内就业', '保研', '考研', '留学'];
  const schools = ['清华大学', '北京大学', '复旦大学', '浙江大学', '上海交通大学'];
  const majors = ['计算机', '经济学', '管理学', '法学', '医学', '工程'];

  const userSchedules = Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 1}`,
    name: `用户${i + 1}`,
    school: schools[i % schools.length],
    major: majors[i % majors.length],
    avatar: ['👨‍🎓', '👩‍🎓', '🧑‍💻', '👨‍💼', '👩‍💼'][i % 5],
    points: 2000 - i * 30,
    weekSchedules: 7 + (i % 3),
    goal: goals[i % goals.length],
    grade: grades[i % grades.length]
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">日程广场</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 搜索和筛选 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索用户..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <Filter size={18} className="text-gray-600" />
            <span className="font-semibold text-gray-700">筛选条件</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">年级</label>
              <select
                value={filters.grade}
                onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="">全部</option>
                {grades.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">毕业目标</label>
              <select
                value={filters.goal}
                onChange={(e) => setFilters({ ...filters, goal: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="">全部</option>
                {goals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">学校</label>
              <select
                value={filters.school}
                onChange={(e) => setFilters({ ...filters, school: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="">全部</option>
                {schools.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">专业</label>
              <select
                value={filters.major}
                onChange={(e) => setFilters({ ...filters, major: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="">全部</option>
                {majors.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* 日程卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userSchedules.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer"
            >
              <div className="bg-gradient-to-br from-accent-100 to-green-100 p-6">
                <div className="flex items-start space-x-3">
                  <div className="text-4xl">{user.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-800 text-lg">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.school}</p>
                        <p className="text-xs text-gray-500">{user.major} · {user.grade}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded">
                        {user.goal}
                      </span>
                      <div className="flex items-center space-x-1 bg-white rounded px-2 py-1">
                        <Trophy size={14} className="text-primary-500" />
                        <span className="text-sm font-semibold text-primary-700">{user.points}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">本周日程安排</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-600">已完成 {user.weekSchedules - 2}/{user.weekSchedules} 项</span>
                  <span className="text-xs text-accent-600 font-semibold">
                    {Math.round(((user.weekSchedules - 2) / user.weekSchedules) * 100)}%
                  </span>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: 7 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 h-8 rounded flex items-center justify-center text-xs ${
                        idx < user.weekSchedules - 2
                          ? 'bg-accent-500 text-white'
                          : idx < user.weekSchedules
                          ? 'bg-gray-200 text-gray-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {idx < user.weekSchedules - 2 ? '✓' : '·'}
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-accent-500 to-green-600 text-white py-2 rounded-lg hover:shadow-lg transition-all">
                  查看详情
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 分页 */}
        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                page === 1
                  ? 'bg-gradient-to-r from-accent-500 to-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

