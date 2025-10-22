import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Users, Video } from 'lucide-react';
import { mockLives } from '../data/mockData';

export default function LivesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    grade: '',
    goal: '',
    major: ''
  });

  const grades = ['大一', '大二', '大三', '大四'];
  const goals = ['普通就业', '体制内就业', '保研', '考研', '留学'];
  const majors = ['计算机', '经济学', '管理学', '法学', '医学', '工程'];

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors">
            <ArrowLeft size={20} className="hover:text-primary-500 transition-colors" />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">公益直播</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 搜索和筛选 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索直播..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-3 group">
            <Filter size={18} className="text-primary-500 group-hover:text-primary-600 transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">筛选条件</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* 直播网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockLives.map((live) => (
            <div
              key={live.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer relative"
            >
              <div className="absolute top-3 right-3 z-10 bg-accent text-white text-xs px-2 py-0.5 rounded animate-pulse">
                直播中
              </div>
              <div className="w-full aspect-video overflow-hidden relative transition-transform group-hover:scale-[1.05]">
                <img 
                  src={live.cover} 
                  alt={live.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Video className="text-accent" size={32} />
                  </div>
                </div>
              </div>
              <h3 className="font-semibold module-secondary mb-2 line-clamp-2 h-12">{live.title}</h3>
              <div className="flex items-center space-x-1 text-gray-600 mb-3 group">                <Users size={16} className="text-accent-500 group-hover:text-accent-600 transition-colors" />
                <span className="text-sm group-hover:text-accent-600 transition-colors">{live.viewers} 人观看</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">                {live.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded">                    {tag}
                  </span>
                ))}
              </div>
              <button className="w-full bg-gradient-to-r from-accent-500 to-green-600 text-white py-2 rounded-lg hover:shadow-lg transition-all">                进入直播间
              </button>
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

