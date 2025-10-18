import { Link } from 'react-router-dom';
import { BookOpen, Video, Briefcase, ArrowRight } from 'lucide-react';
import { mockCourses, mockLives } from '../data/mockData';

export default function GrowthPackage() {
  const tools = [
    { name: 'AI简历', icon: '📝', url: '#' },
    { name: 'AI面试', icon: '🎤', url: '#' },
    { name: 'AI网申', icon: '📄', url: '#' },
    { name: 'AI选岗', icon: '🎯', url: '#' },
    { name: '实习职位', icon: '💼', url: '#' },
    { name: '体制内职位', icon: '🏛️', url: '#' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="text-2xl">🎁</div>
          <h2 className="text-xl font-bold text-gray-800">成长加油包</h2>
        </div>
      </div>

      {/* 公益课程 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-primary-500" size={20} />
            <h3 className="font-semibold text-gray-800">公益课程</h3>
          </div>
          <Link to="/courses" className="text-primary-500 hover:text-primary-600 flex items-center space-x-1 text-sm">
            <span>更多</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {mockCourses.slice(0, 5).map((course) => (
            <div
              key={course.id}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="text-4xl mb-2 text-center">{course.cover}</div>
              <p className="text-sm font-medium text-gray-800 text-center line-clamp-2">{course.title}</p>
              <div className="flex flex-wrap gap-1 mt-2 justify-center">
                {course.tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
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
            <Video className="text-accent-500" size={20} />
            <h3 className="font-semibold text-gray-800">公益直播</h3>
          </div>
          <Link to="/lives" className="text-primary-500 hover:text-primary-600 flex items-center space-x-1 text-sm">
            <span>更多</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {mockLives.slice(0, 5).map((live) => (
            <div
              key={live.id}
              className="bg-gradient-to-br from-accent-50 to-green-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all cursor-pointer relative"
            >
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded animate-pulse">
                直播中
              </div>
              <div className="text-4xl mb-2 text-center">{live.cover}</div>
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
            <Briefcase className="text-secondary-500" size={20} />
            <h3 className="font-semibold text-gray-800">实习求职</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {tools.map((tool, index) => (
            <a
              key={index}
              href={tool.url}
              className="bg-gradient-to-br from-secondary-50 to-yellow-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center"
            >
              <div className="text-3xl mb-2">{tool.icon}</div>
              <p className="text-sm font-medium text-gray-800">{tool.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

