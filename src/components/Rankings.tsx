import { Link } from 'react-router-dom';
import { Trophy, ArrowRight } from 'lucide-react';
import { mockRankings } from '../data/mockData';

export default function Rankings() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="text-secondary-500" size={24} />
          <h2 className="text-xl font-bold text-gray-800">排行榜</h2>
        </div>
        <Link 
          to="/rankings"
          className="text-primary-500 hover:text-primary-600 flex items-center space-x-1 text-sm"
        >
          <span>查看详情</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl p-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-1">百万成长计划</p>
          <p className="text-sm text-gray-600">百万公益基金 · 助你成为更好的自己</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {/* 总排行榜 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <span>🌍</span>
              <span>总排行榜</span>
            </h3>
            <div className="space-y-2">
              {mockRankings.slice(0, 5).map((user, index) => (
                <div
                  key={`global-${user.rank}`}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    index < 3 ? 'bg-gradient-to-r from-secondary-50 to-primary-50' : 'hover:bg-gray-50'
                  } transition-colors`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs ${
                    index === 0 ? 'bg-yellow-400 text-white' :
                    index === 1 ? 'bg-gray-300 text-white' :
                    index === 2 ? 'bg-orange-400 text-white' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {index < 3 ? '🏆' : user.rank}
                  </div>
                  <div className="text-lg">{user.avatar}</div>
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

          {/* 本校排行榜 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <span>🎓</span>
              <span>本校排行榜</span>
            </h3>
            <div className="space-y-2">
              {mockRankings.slice(0, 5).map((user, index) => (
                <div
                  key={`school-${user.rank}`}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    index < 3 ? 'bg-gradient-to-r from-secondary-50 to-primary-50' : 'hover:bg-gray-50'
                  } transition-colors`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs ${
                    index === 0 ? 'bg-yellow-400 text-white' :
                    index === 1 ? 'bg-gray-300 text-white' :
                    index === 2 ? 'bg-orange-400 text-white' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {index < 3 ? '🏆' : user.rank}
                  </div>
                  <div className="text-lg">{user.avatar}</div>
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
      </div>

      <Link
        to="/rankings"
        className="mt-4 w-full block text-center bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
      >
        查看完整排行榜
      </Link>
    </div>
  );
}

