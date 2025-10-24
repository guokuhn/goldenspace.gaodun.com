import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';

interface WelcomePageProps {
  onComplete: () => void;
}

const WelcomePage = ({ onComplete }: WelcomePageProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 自动播放视频
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('视频自动播放失败:', error);
      });
    }
  }, []);

  const handleGetStarted = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    onComplete();
    navigate('/');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 背景视频 */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/images/welcome.mp4"
        loop
        muted
        playsInline
        autoPlay
      />

      {/* 深色遮罩层，使文字更清晰 */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

      {/* 内容层 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* 标题文字 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 drop-shadow-2xl animate-fade-in">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
            Golden Space
          </span>
          <br />
          <span className="text-white text-3xl md:text-4xl lg:text-5xl mt-4 block">
            大学生学习成长云空间
          </span>
        </h1>

        {/* 立即开始按钮 */}
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl animate-fade-in-delay"
        >
          立即开始
        </button>
      </div>

      {/* 登录弹窗 */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default WelcomePage;