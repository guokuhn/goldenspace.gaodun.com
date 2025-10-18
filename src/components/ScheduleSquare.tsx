import { Link } from 'react-router-dom';
import { Users, ArrowRight, Trophy } from 'lucide-react';

export default function ScheduleSquare() {
  const userSchedules = [
    { id: '1', name: '李同学', school: '清华大学', avatar: '👨‍🎓', points: 1850, weekSchedules: 8 },
    { id: '2', name: '王同学', school: '北京大学', avatar: '👩‍🎓', points: 1720, weekSchedules: 7 },
    { id: '3', name: '张同学', school: '清华大学', avatar: '🧑‍💻', points: 1680, weekSchedules: 9 },
    { id: '4', name: '刘同学', school: '复旦大学', avatar: '👨‍💼', points: 1550, weekSchedules: 6 },
    { id: '5', name: '陈同学', school: '浙江大学', avatar: '👩‍💼', points: 1480, weekSchedules: 7 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="text-accent-500" size={24} />
          <h2 className="text-xl font-bold text-gray-800">日程广场</h2>
        </div>
        <Link 
          to="/schedule-square"
          className="text-primary-500 hover:text-primary-600 flex items-center space-x-1 text-sm"
        >
          <span>更多</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 flex-1 overflow-y-auto">
        {userSchedules.map((user) => (
          <div
            key={user.id}
            className="bg-gradient-to-br from-accent-50 to-green-50 p-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className="text-3xl">{user.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.school}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-primary-100 text-primary-700 px-2 py-1 rounded">
                    <Trophy size={14} />
                    <span className="text-sm font-semibold">{user.points}</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-gray-700 mb-2">本周日程安排</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">已完成 {user.weekSchedules - 2}/{user.weekSchedules} 项</span>
                    <div className="flex space-x-1">
                      {Array.from({ length: 7 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                            idx < user.weekSchedules - 2
                              ? 'bg-accent-500 text-white'
                              : idx < user.weekSchedules
                              ? 'bg-gray-200 text-gray-600'
                              : 'bg-gray-100 text-gray-400'
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
          </div>
        ))}
      </div>
    </div>
  );
}

