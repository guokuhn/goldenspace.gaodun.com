import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import LoginModal from './components/LoginModal';
import { mockUser } from './data/mockData';
import { User } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (phone: string, name: string) => {
    setCurrentUser({ ...mockUser, phone, name });
    setIsLoggedIn(true);
    setShowLoginModal(false);
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

