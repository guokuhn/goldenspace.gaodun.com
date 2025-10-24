import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Medal, Users, Crown } from 'lucide-react';
import { mockRankings } from '../data/mockData';

export default function Rankings() {
  return (
    <div className="card p-6 h-[950px] flex flex-col group hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Trophy className="text-xl text-[#2790FD] group-hover:scale-110 transition-transform" size={28} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#2790FD] rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-xl font-bold text-neutral-800">排行榜</h2>
        </div>
      </div>

      <div className="rounded-xl mb-5 overflow-hidden">
        <img 
          src="/images/baiwan.png" 
          alt="百万成长计划" 
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* 总排行榜 - 展示3条数据 */}
        <div className="mb-5">
          <h3 className="font-bold text-neutral-700 mb-3 flex items-center space-x-2 text-sm">
            <Users className="text-[#2790FD]" size={20} />
            <span>总排行榜</span>
          </h3>
          <div className="space-y-2">
            {mockRankings.slice(0, 3).map((user, index) => (
              <div
                key={`global-${user.rank}`}
                className="group/item flex items-center space-x-3 p-3 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                  index === 0 ? 'bg-gold text-neutral-800' : 
                  index === 1 ? 'bg-silver text-neutral-800' : 
                  'bg-bronze text-white'
                }`}>
                  {index < 3 ? <Medal size={16} /> : user.rank}
                </div>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-neutral-200 group-hover/item:scale-110 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral-800 text-sm truncate">{user.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-400 text-sm">{user.points}</p>
                  <p className="text-xs text-neutral-500">积分</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 本校排行榜 - 展示3条数据 */}
        <div>
          <h3 className="font-bold text-neutral-700 mb-3 flex items-center space-x-2 text-sm">
            <Trophy className="text-primary-400" size={20} />
            <span>本校排行榜</span>
          </h3>
          <div className="space-y-2">
            {mockRankings.slice(5, 8).map((user, index) => (
              <div
                key={`school-${user.rank}`}
                className="group/item flex items-center space-x-3 p-3 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                  index === 0 ? 'bg-gold text-neutral-800' : 
                  index === 1 ? 'bg-silver text-neutral-800' : 
                  'bg-bronze text-white'
                }`}>
                  {index < 3 ? <Medal size={16} /> : index + 1}
                </div>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-neutral-200 group-hover/item:scale-110 transition-transform" 
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral-800 text-sm truncate">{user.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-400 text-sm">{user.points}</p>
                  <p className="text-xs text-neutral-500">积分</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link
        to="/rankings"
        className="mt-4 w-full block text-center bg-white text-primary-400 py-2.5 rounded-xl hover:bg-primary-50 transition-all text-sm font-semibold border border-primary-400 flex items-center justify-center"
      >
        <span>查看完整排行榜</span>
        <ArrowRight size={14} className="ml-1" />
      </Link>
    </div>
  );
}

