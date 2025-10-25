import { Link } from 'react-router-dom';
import { User } from '../types';
import { Trophy, LogIn, LogOut, ChevronRight, GraduationCap } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  user: User | null;
  onLoginClick: () => void;
  onLogout?: () => void;
}

export default function Header({ isLoggedIn, user, onLoginClick, onLogout }: HeaderProps) {
  return (
    <header className="bg-white backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-neutral-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img 
            src="/images/logo2.png" 
            alt="Golden Space - 大学生学习成长云空间" 
            className="h-16 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/** 播放器 icon */}

        <div className="flex items-center space-x-6">
          {isLoggedIn && user ? (
            <>
              <Link 
                to="/points"
                className="flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full border border-primary-50 hover:shadow-md hover:border-primary-200 transition-all duration-300 cursor-pointer group/points"
              >
                <Trophy className="text-primary-400 group-hover/points:scale-110 transition-transform" size={20} />
                <span className="font-semibold text-primary-400">{user.points}</span>
                <span className="text-sm text-neutral-500">积分兑现金</span>
                <ChevronRight size={14} className="text-neutral-400 group-hover/points:text-primary-400 transition-colors" />
              </Link>
              <div className="hidden md:flex items-center space-x-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-2xl border border-primary-50 transition-transform duration-300 group-hover:scale-110">{user.avatar || '👨‍🎓'}</div>
                <div className="hidden md:block">
                  <p className="font-semibold text-neutral-800 group-hover:text-primary-400 transition-colors">{user.name}</p>
                  <p className="text-xs text-neutral-500">{user.school} · {user.grade}</p>
                </div>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:border-primary-400 hover:text-primary-400 hover:bg-primary-50 transition-all duration-300 font-medium"
                  title="退出登录"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">退出</span>
                </button>
              )}
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-2 px-6 py-2.5 bg-primary-400 text-white font-semibold rounded-lg hover:bg-primary-500 hover:shadow-md transition-all duration-300"
            >
              <LogIn size={20} />
              <span>登录</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

