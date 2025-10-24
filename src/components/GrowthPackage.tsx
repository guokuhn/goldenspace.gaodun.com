import { Link } from 'react-router-dom';
import { BookOpen, Video, Briefcase, ChevronRight, Gift, FileText, MessageCircle, Target, Briefcase as BriefcaseIcon, Building } from 'lucide-react';
import { mockCourses, mockLives } from '../data/mockData';
import { useState } from 'react';
import QRCodeModal from './QRCodeModal';

export default function GrowthPackage() {
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentQRImage, setCurrentQRImage] = useState('');
  const [currentQRTitle, setCurrentQRTitle] = useState('');

  const handleQRClick = (imagePath: string, title: string) => {
    setCurrentQRImage(imagePath);
    setCurrentQRTitle(title);
    setShowQRModal(true);
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 group">
          <Gift className="text-2xl module-icon transition-transform group-hover:scale-110" size={32} />
          <h2 className="text-xl font-bold module-title">成长加油包</h2>
        </div>
      </div>

      {/* 公益课程 */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-module-bg-primary/10 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 group">
              <BookOpen className="module-primary group-hover:module-secondary transition-colors" size={20} />
              <h3 className="font-semibold module-secondary">公益课程</h3>
            </div>
            <Link to="/courses" className="text-xs module-primary hover:module-secondary flex items-center space-x-1">
              <span>更多</span>
              <ChevronRight size={12} className="transition-transform hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {mockCourses.slice(0, 5).map((course) => (
              <div
                key={course.id}
                className="bg-gradient-to-br from-neutral-50 to-primary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-full aspect-square mb-2 overflow-hidden rounded-lg transition-transform group-hover:scale-110">
                  <img 
                    src={course.cover} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium module-secondary text-center line-clamp-2">{course.title}</p>
                <div className="flex flex-wrap gap-1 mt-2 justify-center">
                  {course.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="text-xs module-bg-primary text-white px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 公益直播 */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-module-bg-primary/10 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 group">
              <Video className="module-primary group-hover:module-secondary transition-colors" size={20} />
              <h3 className="font-semibold module-secondary">公益直播</h3>
            </div>
            <Link to="/lives" className="text-xs module-primary hover:module-secondary flex items-center space-x-1">
              <span>更多</span>
              <ChevronRight size={12} className="transition-transform hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {mockLives.slice(0, 5).map((live) => (
              <div
                key={live.id}
                className="bg-gradient-to-br from-neutral-50 to-secondary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all cursor-pointer relative group"
              >
                <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-0.5 rounded animate-pulse z-10">
                  直播中
                </div>
                <div className="w-full aspect-square mb-2 overflow-hidden rounded-lg transition-transform group-hover:scale-[1.05] relative">
                  <img 
                    src={live.cover} 
                    alt={live.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Video className="text-accent" size={24} />
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-neutral-800 text-center line-clamp-2">{live.title}</p>
                <p className="text-xs text-neutral-600 text-center mt-2">👥 {live.viewers}人观看</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 实习求职工具 */}
      <div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-module-bg-primary/10 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Briefcase className="text-primary-500" size={20} />
              <h3 className="font-semibold module-secondary">实习求职</h3>
            </div>
            {/* <Link to="/internships" className="text-xs module-primary hover:module-secondary flex items-center space-x-1">
              <span>更多</span>
              <ChevronRight size={12} className="transition-transform hover:translate-x-0.5" />
            </Link> */}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <a href="https://say.gaodun.com/position" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-neutral-50 to-secondary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center group">
              <FileText className="text-2xl text-secondary-400 mb-2 mx-auto transition-transform group-hover:scale-110" size={28} />
              <p className="text-sm font-medium text-neutral-800">AI简历</p>
            </a>
            <button onClick={() => handleQRClick('/images/qr/image1.png', 'AI面试')} className="bg-gradient-to-br from-neutral-50 to-secondary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center group w-full">
              <MessageCircle className="text-2xl text-secondary-400 mb-2 mx-auto transition-transform group-hover:scale-110" size={28} />
              <p className="text-sm font-medium text-neutral-800">AI面试</p>
            </button>
            <button onClick={() => handleQRClick('/images/qr/image2.png', 'AI网申')} className="bg-gradient-to-br from-neutral-50 to-secondary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center group w-full">
              <FileText className="text-2xl text-secondary-400 mb-2 mx-auto transition-transform group-hover:scale-110" size={28} />
              <p className="text-sm font-medium text-neutral-800">AI网申</p>
            </button>
            <button onClick={() => handleQRClick('/images/qr/image3.png', '实习职位')} className="bg-gradient-to-br from-neutral-50 to-secondary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center group w-full">
              <BriefcaseIcon className="text-2xl text-secondary-400 mb-2 mx-auto transition-transform group-hover:scale-110" size={28} />
              <p className="text-sm font-medium text-neutral-800">实习职位</p>
            </button>
            <button onClick={() => handleQRClick('/images/qr/image4.png', '体制内职位')} className="bg-gradient-to-br from-neutral-50 to-secondary-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all text-center group w-full">
              <Building className="text-2xl text-secondary-400 mb-2 mx-auto transition-transform group-hover:scale-110" size={28} />
              <p className="text-sm font-medium text-neutral-800">体制内职位</p>
            </button>
          </div>
        </div>
      </div>

      {/* 二维码弹窗 */}
      {showQRModal && (
        <QRCodeModal
          onClose={() => setShowQRModal(false)}
          qrImagePath={currentQRImage}
          title={currentQRTitle}
          description="扫描二维码了解更多"
        />
      )}
    </div>
  );
}

