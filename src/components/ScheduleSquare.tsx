import { Link } from 'react-router-dom';
import { Users, ChevronRight, Trophy, Sparkles, Calendar, TrendingUp } from 'lucide-react';
import { scheduleUserNames, userAvatars } from '../data/mockData';

export default function ScheduleSquare() {
  const schools = ['清华大学', '北京大学', '复旦大学', '浙江大学', '上海交通大学'];
  const userSchedules = Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 1}`,
    name: scheduleUserNames[i],
    school: schools[i % schools.length],
    avatar: userAvatars[i % userAvatars.length],
    points: 1850 - i * 70,
    weekSchedules: 8 + (i % 2)
  }));

  return (
    <div className="card p-6 h-[950px] flex flex-col group hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Calendar className="text-xl text-primary-400 group-hover:scale-110 transition-transform" size={28} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-xl font-bold text-neutral-800">日程广场</h2>
        </div>
        <Link 
            to="/schedule-square"
            className="text-primary-400 hover:text-primary-600 flex items-center space-x-1 text-sm group/link font-semibold"
          >
            <span>更多</span>
            <ChevronRight size={16} className="transition-transform group-hover/link:translate-x-1" />
          </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 flex-1 overflow-y-auto scrollbar-hide">
        {userSchedules.map((user, index) => (
          <div
              key={user.id}
              className="relative bg-white p-4 rounded-xl hover:shadow-md transition-all cursor-pointer group/card border border-neutral-200 hover:border-primary-300 overflow-hidden"
            >
            {index < 3 && (
              <div className="absolute top-2 right-2 z-10">
                <Sparkles className="text-primary-400" size={16} />
              </div>
            )}
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-neutral-200 group-hover/card:scale-110 transition-transform"
                />
                {index < 3 && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-bold text-neutral-800 text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-neutral-500 font-medium">{user.school}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-primary-50 text-primary-400 px-3 py-1.5 rounded-lg border border-primary-200">
                    <Trophy size={14} />
                    <span className="text-sm font-bold">{user.points}</span>
                  </div>
                </div>
                <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="text-primary-400" size={12} />
                      <p className="text-xs font-bold text-neutral-700">本周打卡进度</p>
                    </div>
                    <span className="text-xs font-bold text-primary-400">{user.weekSchedules - 2}/{user.weekSchedules} 项</span>
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: 7 }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                          idx < user.weekSchedules - 2 
                            ? 'bg-primary-400 text-white' 
                            : idx < user.weekSchedules 
                            ? 'bg-primary-100 text-primary-400' 
                            : 'bg-neutral-200 text-neutral-400'
                        }`}
                      >
                        {idx < user.weekSchedules - 2 ? '✓' : '·'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


