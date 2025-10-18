import { Link } from 'react-router-dom';
import { Users, Swords, ArrowRight } from 'lucide-react';
import { mockRankings } from '../data/mockData';

export default function Activities() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="text-2xl">🎯</div>
          <h2 className="text-xl font-bold text-gray-800">活动</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {/* 圈人奖励 */}
          <div>
            <Link
              to="/referral"
              className="bg-gradient-to-r from-accent-100 to-accent-50 p-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all block mb-3"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Users className="text-accent-600" size={18} />
                  <h3 className="font-bold text-gray-800 text-sm">圈人奖励</h3>
                </div>
                <ArrowRight className="text-accent-600" size={16} />
              </div>
              <p className="text-xs text-gray-600">邀请好友助力</p>
            </Link>

            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2 text-xs">
              <Users className="text-accent-500" size={14} />
              <span>排行榜</span>
            </h3>
            <div className="space-y-2">
              {mockRankings.slice(0, 5).map((user, index) => (
                <div key={`referral-${user.rank}`} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50">
                  <span className={`w-5 h-5 flex items-center justify-center text-xs font-bold ${
                    index < 3 ? 'text-accent-600' : 'text-gray-500'
                  }`}>
                    {user.rank}
                  </span>
                  <span className="text-lg">{user.avatar}</span>
                  <span className="flex-1 text-xs text-gray-700 truncate">{user.name}</span>
                  <span className="text-xs font-semibold text-accent-600">{user.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PK挑战赛 */}
          <div>
            <Link
              to="/pk"
              className="bg-gradient-to-r from-primary-100 to-secondary-100 p-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all block mb-3"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Swords className="text-primary-600" size={18} />
                  <h3 className="font-bold text-gray-800 text-sm">PK挑战赛</h3>
                </div>
                <ArrowRight className="text-primary-600" size={16} />
              </div>
              <p className="text-xs text-gray-600">随机匹配对手</p>
            </Link>

            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2 text-xs">
              <Swords className="text-primary-500" size={14} />
              <span>排行榜</span>
            </h3>
            <div className="space-y-2">
              {mockRankings.slice(0, 5).map((user, index) => (
                <div key={`pk-${user.rank}`} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50">
                  <span className={`w-5 h-5 flex items-center justify-center text-xs font-bold ${
                    index < 3 ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {user.rank}
                  </span>
                  <span className="text-lg">{user.avatar}</span>
                  <span className="flex-1 text-xs text-gray-700 truncate">{user.name}</span>
                  <span className="text-xs font-semibold text-primary-600">{user.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

