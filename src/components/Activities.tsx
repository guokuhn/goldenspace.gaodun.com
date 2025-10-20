import { Link } from 'react-router-dom';
import { Users, Swords, ArrowRight, Gift, Activity } from 'lucide-react';
import { mockRankings } from '../data/mockData';

export default function Activities() {
  return (
    <div className="tech-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 group">
          <div className="text-2xl transition-transform group-hover:scale-110">🎯</div>
          <h2 className="text-xl font-bold text-gradient">活动</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
          {/* 圈人奖励 */}
          <div className="mb-6">
            <Link
              to="/referral"
              className="bg-gradient-to-r from-tech-50 to-accent-50 p-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all block mb-4 border border-tech-100"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Users className="text-tech-600 hover:text-tech-500 transition-colors" size={18} />
                  <h3 className="font-bold text-gray-800 text-sm">圈人奖励</h3>
                </div>
                <ArrowRight className="text-tech-600 hover:text-tech-500 transition-colors transform hover:-translate-x-1" size={16} />
              </div>
              <p className="text-xs text-gray-600">邀请好友助力，赢取丰厚奖励</p>
            </Link>

            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2 text-xs">
              <Gift className="text-tech-500 hover:text-tech-600 transition-colors" size={14} />
              <span>排行榜</span>
            </h3>
            <div className="space-y-2">
              {mockRankings.slice(0, 3).map((user, index) => (
                <div key={`referral-${user.rank}`} className="flex items-center space-x-2 p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-tech-50 hover:bg-tech-50 transition-all duration-300">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index < 3 ? 'bg-tech-100 text-tech-700 border border-tech-200' : 'bg-gray-100 text-gray-600'}`}>
                    {index + 1}
                  </div>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-7 h-7 rounded-full object-cover transition-transform hover:scale-110"
                  />
                  <span className="flex-1 text-xs text-gray-700 truncate">{user.name}</span>
                  <span className="text-xs font-semibold text-tech-600">{user.points}</span>
                </div>
              ))}
            </div>
            <Link
              to="/referral"
              className="mt-3 w-full block text-center bg-tech-50 text-tech-700 py-2 rounded-lg text-xs hover:bg-tech-100 transition-colors border border-tech-100 flex items-center justify-center"
            >
              <span>查看完整排行榜</span>
              <ArrowRight size={12} className="ml-1" />
            </Link>
          </div>

          {/* PK挑战赛 - 使用不同的用户数据避免重复 */}
          <div>
            <Link
              to="/pk"
              className="bg-gradient-to-r from-primary-50 to-secondary-50 p-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all block mb-4 border border-primary-100"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Swords className="text-primary-600" size={18} />
                  <h3 className="font-bold text-gray-800 text-sm">PK挑战赛</h3>
                </div>
                <ArrowRight className="text-primary-600" size={16} />
              </div>
              <p className="text-xs text-gray-600">随机匹配对手，一决高下</p>
            </Link>

            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2 text-xs">
              <Activity className="text-primary-500" size={14} />
              <span>排行榜</span>
            </h3>
            <div className="space-y-2">
              {mockRankings.slice(5, 8).map((user, index) => (
                <div key={`pk-${user.rank}`} className="flex items-center space-x-2 p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-primary-50 hover:bg-primary-50 transition-all duration-300">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index < 3 ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'bg-gray-100 text-gray-600'}`}>
                    {index + 1}
                  </div>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-7 h-7 rounded-full object-cover transition-transform hover:scale-110" 
                  />
                  <span className="flex-1 text-xs text-gray-700 truncate">{user.name}</span>
                  <span className="text-xs font-semibold text-primary-600">{user.points}</span>
                </div>
              ))}
            </div>
            <Link
              to="/pk"
              className="mt-3 w-full block text-center bg-primary-50 text-primary-700 py-2 rounded-lg text-xs hover:bg-primary-100 transition-colors border border-primary-100 flex items-center justify-center"
            >
              <span>查看完整排行榜</span>
              <ArrowRight size={12} className="ml-1" />
            </Link>
          </div>
      </div>
    </div>
  );
}

