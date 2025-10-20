import { Link } from 'react-router-dom';
import { BookOpen, Video, Briefcase, ChevronRight, Gift, FileText, MessageCircle, Target, Briefcase as BriefcaseIcon, Building } from 'lucide-react';
import { mockCourses, mockLives } from '../data/mockData';

export default function GrowthPackage() {

  return (
    <div className="tech-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 group">
          <Gift className="text-2xl text-primary-600 transition-transform group-hover:scale-110" size={32} />
          <h2 className="text-xl font-bold text-gradient">成长加油包</h2>
        </div>
      </div>

      {/* 公益课程 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 group">
            <BookOpen className="text-tech-500 group-hover:text-tech-600 transition-colors" size={20} />
            <h3 className="font-semibold text-gray-800">公益课程</h3>
          </div>
          <Link to="/courses" className="text-tech-500 hover:text-tech-600 flex items-center space-x-1 text-sm group">
            <span>更多</span>
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1 hover:text-tech-600" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {mockCourses.slice(0, 5).map((course) => (
            <div
              key={course.id}
              className="bg-gradient-to-br from-tech-50 to-primary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="w-full aspect-square mb-2 overflow-hidden rounded-lg transition-transform group-hover:scale-110">
                <img 
                  src={course.cover} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 text-center line-clamp-2">{course.title}</p>
              <div className="flex flex-wrap gap-1 mt-2 justify-center">
                {course.tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="text-xs bg-tech-100 text-tech-700 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 公益直播 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Video className="text-tech-500" size={20} />
            <h3 className="font-semibold text-gray-800">公益直播</h3>
          </div>
          <Link to="/lives" className="text-tech-500 hover:text-tech-600 flex items-center space-x-1 text-sm group">
            <span>更多</span>
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {mockLives.slice(0, 5).map((live) => (
            <div
              key={live.id}
              className="bg-gradient-to-br from-tech-50 to-orange-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all cursor-pointer relative group"
            >
              <div className="absolute top-2 right-2 bg-tech-500 text-white text-xs px-2 py-0.5 rounded animate-pulse">
                直播中
              </div>
              <div className="w-full aspect-square mb-2 overflow-hidden rounded-lg transition-transform group-hover:scale-110 relative">
                <img 
                  src={live.cover} 
                  alt={live.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Video className="text-tech-600" size={24} />
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800 text-center line-clamp-2">{live.title}</p>
              <p className="text-xs text-gray-600 text-center mt-2">👥 {live.viewers}人观看</p>
            </div>
          ))}
        </div>
      </div>

      {/* 实习求职工具 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Briefcase className="text-tech-500" size={20} />
            <h3 className="font-semibold text-gray-800">实习求职</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <a href="#" className="bg-gradient-to-br from-tech-50 to-primary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center group">
            <FileText className="text-2xl text-primary-600 mb-2 transition-transform group-hover:scale-110" size={28} />
            <p className="text-sm font-medium text-gray-800">AI简历</p>
          </a>
          <a href="#" className="bg-gradient-to-br from-tech-50 to-primary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center group">
            <MessageCircle className="text-2xl text-primary-600 mb-2 transition-transform group-hover:scale-110" size={28} />
            <p className="text-sm font-medium text-gray-800">AI面试</p>
          </a>
          <a href="#" className="bg-gradient-to-br from-tech-50 to-primary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center group">
            <FileText className="text-2xl text-primary-600 mb-2 transition-transform group-hover:scale-110" size={28} />
            <p className="text-sm font-medium text-gray-800">AI网申</p>
          </a>
          <a href="#" className="bg-gradient-to-br from-tech-50 to-primary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center group">
            <Target className="text-2xl text-primary-600 mb-2 transition-transform group-hover:scale-110" size={28} />
            <p className="text-sm font-medium text-gray-800">AI选岗</p>
          </a>
          <a href="#" className="bg-gradient-to-br from-tech-50 to-primary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center group">
            <BriefcaseIcon className="text-2xl text-primary-600 mb-2 transition-transform group-hover:scale-110" size={28} />
            <p className="text-sm font-medium text-gray-800">实习职位</p>
          </a>
          <a href="#" className="bg-gradient-to-br from-tech-50 to-primary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center group">
            <Building className="text-2xl text-primary-600 mb-2 transition-transform group-hover:scale-110" size={28} />
            <p className="text-sm font-medium text-gray-800">体制内职位</p>
          </a>
        </div>
      </div>
    </div>
  );
}

