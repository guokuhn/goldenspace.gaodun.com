import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Heart, MessageCircle, Bookmark, Plus } from 'lucide-react';
import { mockPosts } from '../data/mockData';

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    grade: '',
    goal: '',
    school: '',
    major: '',
    tag: ''
  });

  const grades = ['大一', '大二', '大三', '大四'];
  const goals = ['普通就业', '体制内就业', '保研', '考研', '留学'];
  const schools = ['清华大学', '北京大学', '复旦大学', '浙江大学', '上海交通大学'];
  const majors = ['计算机', '经济学', '管理学', '法学', '医学', '工程'];
  const tags = ['学习打卡', '求职经验', '保研分享', '考研心得', '留学申请', '日常生活'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors">
            <ArrowLeft size={20} className="hover:text-primary-500 transition-colors" />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">社区</h1>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all group">
            <Plus size={18} className="transform group-hover:rotate-45 transition-transform duration-300" />
            <span>发布</span>
          </button>
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
                  placeholder="搜索内容..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-3 group">
            <Filter size={18} className="text-primary-500 group-hover:text-primary-600 transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">筛选条件</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">热门标签</label>
              <select
                value={filters.tag}
                onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="">全部</option>
                {tags.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* 热门标签 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white transition-all shadow-md"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* 瀑布流布局 */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {mockPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all break-inside-avoid cursor-pointer"
            >
              <div className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <img 
                    src={post.avatar} 
                    alt={post.author} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.publishTime}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{post.content}</p>

                {post.images && (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {post.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${post.author}的帖子图片`}
                        className="aspect-square w-full h-full object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors group">
                    <Heart size={18} className="transform group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-primary-500 transition-colors group">
                    <MessageCircle size={18} className="transform group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">评论</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-secondary-500 transition-colors group">
                    <Bookmark size={18} className="transform group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">{post.favorites}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 加载更多 */}
        <div className="text-center mt-8">
          <button className="bg-white text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all shadow-md">
            加载更多
          </button>
        </div>
      </div>
    </div>
  );
}

