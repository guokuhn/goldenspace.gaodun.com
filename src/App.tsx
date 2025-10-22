import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScheduleDetailPage from './pages/ScheduleDetailPage';
import RankingDetailPage from './pages/RankingDetailPage';
import ReferralActivityPage from './pages/ReferralActivityPage';
import PKActivityPage from './pages/PKActivityPage';
import CoursesPage from './pages/CoursesPage';
import LivesPage from './pages/LivesPage';
import ScheduleSquarePage from './pages/ScheduleSquarePage';
import CommunityPage from './pages/CommunityPage';
import UserScheduleDetailPage from './pages/UserScheduleDetailPage';
import OnboardingPage from './pages/OnboardingPage';
import PointsDetailPage from './pages/PointsDetailPage';
import MobileSchedulePage from './pages/MobileSchedulePage';
import LoginModal from './components/LoginModal';
import { mockUser } from './data/mockData';
import { User } from './types';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  const handleLogin = (phone: string, name: string) => {
    // 检查是否是首次登录（这里简单判断，实际应该从后端获取）
    const existingUser = localStorage.getItem(`user_${phone}`);
    const isNew = !existingUser;
    
    const user = { ...mockUser, phone, name };
    setCurrentUser(user);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    
    // 如果是首次登录，跳转到引导页面
    if (isNew) {
      setIsFirstLogin(true);
      navigate('/onboarding');
    }
  };

  const handleUpdateUser = (userData: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      // 保存到localStorage标记用户已完成设置
      localStorage.setItem(`user_${updatedUser.phone}`, JSON.stringify(updatedUser));
      setIsFirstLogin(false);
    }
  };

  const handleLogout = () => {
    // 清除用户状态
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsFirstLogin(false);
    // 可选：清除相关的localStorage数据
    // localStorage.removeItem('userSchedules');
    // localStorage.removeItem('recommendedCourses');
    // localStorage.removeItem('recommendedLives');
  };

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              isLoggedIn={isLoggedIn}
              user={currentUser}
              onLoginClick={() => setShowLoginModal(true)}
              onLogout={handleLogout}
            />
          } 
        />
        <Route 
          path="/onboarding" 
          element={
            <OnboardingPage 
              user={currentUser}
              onUpdateUser={handleUpdateUser}
            />
          } 
        />
        <Route path="/schedule" element={<ScheduleDetailPage user={currentUser} />} />
        <Route path="/rankings" element={<RankingDetailPage />} />
        <Route path="/referral" element={<ReferralActivityPage />} />
        <Route path="/pk" element={<PKActivityPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/lives" element={<LivesPage />} />
        <Route path="/schedule-square" element={<ScheduleSquarePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/user-schedule/:userId" element={<UserScheduleDetailPage />} />
        <Route path="/points" element={<PointsDetailPage user={currentUser} />} />
        <Route path="/mobile-schedule" element={<MobileSchedulePage />} />
      </Routes>
      
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}
    </>
  );
}

export default App;

