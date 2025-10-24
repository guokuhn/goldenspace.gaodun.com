import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
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
import ScrollToTop from './components/ScrollToTop';
import { User } from './types';
import { useUserStore } from './stores';

const App = observer(() => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const userStore = useUserStore();
  const navigate = useNavigate();

  // 构造当前用户对象（完全使用 userStore 的真实数据）
  const currentUser: User | null = userStore.isLoggedIn && userStore.userInfo
    ? {
        id: userStore.userInfo.userId,
        name: userStore.userInfo.nickName,
        phone: userStore.userInfo.userName,
        school: userStore.userInfo.school || '',
        major: userStore.userInfo.major || '',
        grade: userStore.userInfo.grade || '',
        goal: (userStore.userInfo.target as User['goal']) || '普通就业',
        points: 0, // 积分初始值，后续可从后端获取
        avatar: userStore.userInfo.nickName.charAt(0), // 使用昵称首字符作为默认头像
      }
    : null;

  // 处理用户登出
  const handleLogout = () => {
    userStore.logout();
  };

  // 处理用户信息更新
  const handleUpdateUser = async (userData: {
    grade: string;
    major: string;
    school: string;
    goal: string;
  }): Promise<boolean> => {
    if (userStore.isLoggedIn) {
      // 调用 UserStore 的方法更新用户信息
      return await userStore.updateUserProfile({
        grade: userData.grade,
        major: userData.major,
        school: userData.school,
        target: userData.goal, // 注意：这里 goal 映射到 target
      });
    }
    return false;
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              isLoggedIn={userStore.isLoggedIn}
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
          onSuccess={() => {
            console.log('登录成功！用户信息:', userStore.userInfo);
          }}
        />
      )}
    </>
  );
});

export default App;

