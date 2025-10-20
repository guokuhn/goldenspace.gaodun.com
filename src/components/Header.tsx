import { Link } from 'react-router-dom';
import { User } from '../types';
import { Trophy, LogIn, ChevronRight, GraduationCap } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  user: User | null;
  onLoginClick: () => void;
}

export default function Header({ isLoggedIn, user, onLoginClick }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40 border-b border-primary-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <GraduationCap className="text-2xl text-primary-600 transition-transform duration-300 group-hover:scale-110" size={40} />
          <div>
            <h1 className="text-2xl font-bold text-gradient">
              Golden Space
            </h1>
            <p className="text-xs text-primary-600">大学生成长云空间</p>
          </div>
        </Link>

        <div className="flex items-center space-x-6">
          {isLoggedIn && user ? (
            <>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full border border-primary-200 hover:shadow-md transition-all duration-300">
                <Trophy className="text-primary-600 hover:text-primary-500 transition-colors" size={20} />
                <span className="font-semibold text-primary-700">{user.points}</span>
                <span className="text-sm text-primary-600">积分</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="text-3xl transition-transform duration-300 group-hover:scale-110">{user.avatar || '👨‍🎓'}</div>
                <div className="hidden md:block">
                  <p className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.school} · {user.grade}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-primary-500 transition-colors transform group-hover:translate-x-1" />
              </div>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="tech-button flex items-center space-x-2 px-6 py-2"
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

