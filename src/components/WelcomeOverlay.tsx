import { useState, useEffect, useRef } from 'react';

interface WelcomeOverlayProps {
  onStart: () => void;
}

export default function WelcomeOverlay({ onStart }: WelcomeOverlayProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 确保视频自动播放
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('视频自动播放失败:', err);
      });
    }
  }, []);

  const handleStart = () => {
    setIsAnimating(true);
    // 动画完成后隐藏组件并调用回调
    setTimeout(() => {
      setIsHidden(true);
      onStart();
    }, 800); // 0.8秒动画时间
  };

  if (isHidden) return null;

  return (
    <div className={`fixed inset-0 z-50 ${
      isAnimating 
        ? 'pointer-events-none' 
        : ''
    }`}>
      {/* 视频背景 */}
      <div className={`absolute inset-0 transition-all duration-800 ease-in-out ${
        isAnimating
          ? 'scale-[0.05] -translate-x-[45vw] -translate-y-[45vh] rounded-full opacity-0'
          : 'scale-100 translate-x-0 translate-y-0'
      }`}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/welcome.mp4" type="video/mp4" />
          您的浏览器不支持视频播放。
        </video>

        {/* 遮罩层 */}
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* 内容层 */}
      <div className={`relative top-[30%] z-10 flex flex-col items-center justify-center h-full text-center px-4 transition-opacity duration-500 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}>
        {/* 标题文字 */}
        <h1 className="text-5xl md:text-7xl font-bold mb-3 animate-fadeIn">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x" 
                style={{ backgroundSize: '200% auto' }}>
            Golden Space
          </span>
        </h1>
        <p className="text-2xl md:text-3xl mb-12 animate-fadeIn animation-delay-300 text-white drop-shadow-lg">
          大学生学习成长云空间
        </p>

        {/* 立即开始按钮 */}
        <button
          onClick={handleStart}
          className="primary-button text-lg px-12 py-4 animate-fadeIn animation-delay-600 hover:scale-110 transition-transform duration-300"
        >
          立即开始
        </button>
      </div>
    </div>
  );
}