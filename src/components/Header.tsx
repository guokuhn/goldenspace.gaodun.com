import { Link } from 'react-router-dom';
import { User } from '../types';
import { Trophy, LogIn } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  user: User | null;
  onLoginClick: () => void;
}

export default function Header({ isLoggedIn, user, onLoginClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="text-4xl">🎓</div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Golden Space
            </h1>
            <p className="text-xs text-gray-600">大学生成长云空间</p>
          </div>
        </Link>

        <div className="flex items-center space-x-6">
          {isLoggedIn && user ? (
            <>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full">
                <Trophy className="text-primary-600" size={20} />
                <span className="font-semibold text-primary-700">{user.points}</span>
                <span className="text-sm text-gray-600">积分</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{user.avatar || '👨‍🎓'}</div>
                <div className="hidden md:block">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.school} · {user.grade}</p>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
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

