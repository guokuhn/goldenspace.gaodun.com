import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { mockCourses } from '../data/mockData';

export default function CoursesPage() {
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
          <h1 className="text-2xl font-bold text-gray-800">公益课程</h1>
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
                  placeholder="搜索课程..."
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

        {/* 课程网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all cursor-pointer"
            >
              <div className="w-full aspect-video overflow-hidden">
                <img 
                  src={course.cover} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold module-secondary mb-2 line-clamp-2 h-12">{course.title}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {course.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full primary-button py-2">
                  立即领取
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
                  ? 'primary-button'
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

