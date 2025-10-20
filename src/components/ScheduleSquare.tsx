import { Link } from 'react-router-dom';
import { Users, ChevronRight, Trophy, Sparkles } from 'lucide-react';
import { scheduleUserNames, userAvatars } from '../data/mockData';

export default function ScheduleSquare() {
  const schools = ['清华大学', '北京大学', '复旦大学', '浙江大学', '上海交通大学'];
  const userSchedules = Array.from({ length: 3 }, (_, i) => ({
    id: `${i + 1}`,
    name: scheduleUserNames[i],
    school: schools[i % schools.length],
    avatar: userAvatars[i % userAvatars.length],
    points: 1850 - i * 70,
    weekSchedules: 8 + (i % 2)
  }));

  return (
    <div className="tech-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 group">
          <Users className="text-primary-500 transition-transform group-hover:scale-110 hover:text-primary-600" size={24} />
          <h2 className="text-xl font-bold text-gradient">日程广场</h2>
        </div>
        <Link 
          to="/schedule-square"
          className="text-primary-500 hover:text-primary-600 flex items-center space-x-1 text-sm group"
        >
          <span>更多</span>
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-1 hover:text-primary-600" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 flex-1 overflow-y-auto">
        {userSchedules.map((user, index) => (
          <div
            key={user.id}
            className="bg-white/70 backdrop-blur-sm p-4 rounded-xl hover:shadow-md transition-all cursor-pointer group border border-tech-100"
          >
            <div className="flex items-start space-x-3">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {user.name}
                      {index < 3 && (
                        <Sparkles className="inline-block ml-1 text-primary-500" size={12} />
                      )}
                    </p>
                    <p className="text-xs text-gray-600">{user.school}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-tech-100 text-tech-700 px-2 py-1 rounded">
                    <Trophy size={14} />
                    <span className="text-sm font-semibold">{user.points}</span>
                  </div>
                </div>
                <div className="bg-white/80 rounded-lg p-3 border border-tech-50">
                  <p className="text-sm text-gray-700 mb-2">本周日程安排</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">已完成 {user.weekSchedules - 2}/{user.weekSchedules} 项</span>
                    <div className="flex space-x-1">
                      {Array.from({ length: 7 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs transition-transform group-hover:scale-110 ${idx < user.weekSchedules - 2 ? 'bg-tech-500 text-white' : idx < user.weekSchedules ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-400'}`}
                        >
                          {idx < user.weekSchedules - 2 ? '✓' : '·'}
                        </div>
                      ))}
                    </div>
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

