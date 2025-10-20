import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Medal, Users } from 'lucide-react';
import { mockRankings } from '../data/mockData';

export default function Rankings() {
  return (
    <div className="tech-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="text-primary-500 hover:text-primary-600 transition-colors" size={24} />
          <h2 className="text-xl font-bold text-gradient">排行榜</h2>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-6 border border-primary-100">
        <div className="text-center">
          <p className="text-2xl font-bold text-gradient mb-1">百万成长计划</p>
          <p className="text-sm text-primary-600">百万公益基金 · 助你成为更好的自己</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* 总排行榜 */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <Users className="text-primary-500 hover:text-primary-600 transition-colors" size={18} />
            <span>总排行榜</span>
          </h3>
          <div className="space-y-2">
            {mockRankings.slice(0, 3).map((user, index) => (
              <div
                key={`global-${user.rank}`}
                className={`flex items-center space-x-2 p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-primary-50 hover:bg-primary-50 transition-all duration-300 ${index < 3 ? 'glow-effect' : ''}`}
              >
                <div className={`w-7 h-7 flex items-center justify-center rounded-full font-bold text-xs ${index === 0 ? 'bg-yellow-400 text-white border border-yellow-500' : index === 1 ? 'bg-gray-300 text-white border border-gray-400' : index === 2 ? 'bg-orange-400 text-white border border-orange-500' : 'bg-primary-100 text-primary-700 border border-primary-200'}`}>
                  {index < 3 ? <Medal size={14} /> : user.rank}
                </div>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover transition-transform hover:scale-110"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-xs truncate">{user.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600 text-xs">{user.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 本校排行榜 - 使用不同的用户数据避免重复 */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <Trophy className="text-secondary-500" size={18} />
            <span>本校排行榜</span>
          </h3>
          <div className="space-y-2">
            {mockRankings.slice(5, 8).map((user, index) => (
              <div
                key={`school-${user.rank}`}
                className={`flex items-center space-x-2 p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-primary-50 hover:bg-primary-50 transition-all duration-300 ${index < 3 ? 'glow-effect' : ''}`}
              >
                <div className={`w-7 h-7 flex items-center justify-center rounded-full font-bold text-xs ${index === 0 ? 'bg-yellow-400 text-white border border-yellow-500' : index === 1 ? 'bg-gray-300 text-white border border-gray-400' : index === 2 ? 'bg-orange-400 text-white border border-orange-500' : 'bg-primary-100 text-primary-700 border border-primary-200'}`}>
                  {index < 3 ? <Medal size={14} /> : index + 1}
                </div>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover transition-transform hover:scale-110" 
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-xs truncate">{user.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600 text-xs">{user.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link
        to="/rankings"
        className="mt-4 w-full block text-center bg-primary-50 text-primary-700 py-3 rounded-lg hover:bg-primary-100 transition-colors text-xs border border-primary-100 flex items-center justify-center"
      >
        <span>查看完整排行榜</span>
        <ArrowRight size={12} className="ml-1" />
      </Link>
    </div>
  );
}

