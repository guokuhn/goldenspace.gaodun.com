import { User } from '../types';
import Header from '../components/Header';
import DailyReport from '../components/DailyReport';
import MySchedule from '../components/MySchedule';
import Rankings from '../components/Rankings';
import Activities from '../components/Activities';
import GrowthPackage from '../components/GrowthPackage';
import ScheduleSquare from '../components/ScheduleSquare';
import Community from '../components/Community';

interface HomePageProps {
  isLoggedIn: boolean;
  user: User | null;
  onLoginClick: () => void;
}

export default function HomePage({ isLoggedIn, user, onLoginClick }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <Header isLoggedIn={isLoggedIn} user={user} onLoginClick={onLoginClick} />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* 每日报告 */}
        <section className="mb-8">
          <DailyReport user={user} />
        </section>

        {/* 我的日程 - 横版独占 */}
        <section className="mb-8">
          <MySchedule isLoggedIn={isLoggedIn} onLoginClick={onLoginClick} />
        </section>

        {/* 排行榜和活动 - 两列布局 */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:items-stretch">
            {/* 排行榜 */}
            <div className="flex">
              <Rankings />
            </div>

            {/* 活动 */}
            <div className="flex">
              <Activities />
            </div>
          </div>
        </section>

        {/* 成长加油包 */}
        <section className="mb-8">
          <GrowthPackage />
        </section>

        {/* 底部两列 */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:items-stretch">
            {/* 日程广场 */}
            <div className="flex">
              <ScheduleSquare />
            </div>

            {/* 社区 */}
            <div className="flex">
              <Community />
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="mb-2">© 2024 Golden Space - 大学生成长云空间</p>
          <p className="text-sm">百万公益基金 · 助你成为更好的自己</p>
        </div>
      </footer>
    </div>
  );
}

