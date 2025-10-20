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
        {/* 第一行区域：我的日程、每日报告 */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 我的日程 - 占2/3区域 */}
            <div className="lg:col-span-2">
              <MySchedule isLoggedIn={isLoggedIn} onLoginClick={onLoginClick} />
            </div>

            {/* 每日报告 - 占1/3区域 */}
            <div>
              <DailyReport user={user} />
            </div>
          </div>
        </section>

        {/* 第二行区域：排行榜、活动、日程广场 */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 排行榜 */}
            <div>
              <Rankings />
            </div>

            {/* 活动 */}
            <div>
              <Activities />
            </div>

            {/* 日程广场 */}
            <div>
              <ScheduleSquare />
            </div>
          </div>
        </section>

        {/* 第三行区域：成长加油包、社区 */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 成长加油包 - 占2/3区域 */}
            <div className="lg:col-span-2">
              <GrowthPackage />
            </div>

            {/* 社区 - 占1/3区域 */}
            <div>
              <Community />
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gradient-to-r from-tech-50 to-primary-50 border-t border-tech-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 text-gradient font-medium">© 2024 Golden Space - 大学生成长云空间</p>
          <p className="text-sm text-primary-600">百万公益基金 · 助你成为更好的自己</p>
        </div>
      </footer>
    </div>
  );
}

