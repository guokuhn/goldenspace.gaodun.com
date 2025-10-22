import { Link } from 'react-router-dom';
import { Users, Swords, ArrowRight, Gift, Target, Activity } from 'lucide-react';
import { mockReferralRankings, mockPKRankings } from '../data/mockData';

export default function Activities() {
  return (
    <div className="card p-6 h-[950px] flex flex-col group hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Target className="text-xl text-primary-400 group-hover:scale-110 group-hover:rotate-12 transition-all" size={28} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-xl font-bold text-neutral-800">活动</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* 圈人奖励 */}
          <div className="mb-5">
            <Link
              to="/referral"
              className="relative bg-gradient-to-br from-primary-50 to-white p-4 rounded-xl hover:shadow-md transition-all block mb-4 border border-primary-200 overflow-hidden group/card"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="text-primary-400 group-hover/card:scale-110 transition-transform" size={22} />
                    <h3 className="font-bold text-neutral-800 text-base">圈人奖励</h3>
                  </div>
                  <ArrowRight className="text-primary-400 group-hover/card:translate-x-1 transition-transform" size={18} />
                </div>
                <p className="text-sm text-neutral-600 font-medium">邀请好友助力，赢取丰厚奖励</p>
              </div>
            </Link>

            <h3 className="font-bold text-neutral-700 mb-3 flex items-center space-x-2 text-sm">
              <Gift className="text-primary-400" size={18} />
              <span>邀请排行</span>
            </h3>
            <div className="space-y-2">
              {mockReferralRankings.slice(0, 3).map((user, index) => (
                <div key={`referral-${user.rank}`} className="group/item flex items-center space-x-2 p-3 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${
                    index < 3 ? 'bg-primary-400 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {index + 1}
                  </div>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-9 h-9 rounded-full object-cover border-2 border-neutral-200 group-hover/item:scale-110 transition-transform"
                  />
                  <span className="flex-1 text-sm font-semibold text-neutral-800 truncate">{user.name}</span>
                  <span className="text-sm font-bold text-primary-400">{user.points}</span>
                </div>
              ))}
            </div>
            <Link
              to="/referral"
              className="mt-3 w-full block text-center bg-white text-primary-400 py-2.5 rounded-xl hover:bg-primary-50 transition-all text-sm font-semibold border border-primary-200 flex items-center justify-center"
            >
              <span>查看更多</span>
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>

          {/* PK挑战赛 */}
          <div>
            <Link
              to="/pk"
              className="relative bg-gradient-to-br from-secondary-50 to-white p-4 rounded-xl hover:shadow-md transition-all block mb-4 border border-secondary-200 overflow-hidden group/card"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Swords className="text-secondary-400 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all" size={22} />
                    <h3 className="font-bold text-neutral-800 text-base">PK挑战赛</h3>
                  </div>
                  <ArrowRight className="text-secondary-400 group-hover/card:translate-x-1 transition-transform" size={18} />
                </div>
                <p className="text-sm text-neutral-600 font-medium">随机匹配对手，一决高下</p>
              </div>
            </Link>

            <h3 className="font-bold text-neutral-700 mb-3 flex items-center space-x-2 text-sm">
              <Activity className="text-secondary-400" size={18} />
              <span>PK排行</span>
            </h3>
            <div className="space-y-2">
              {mockPKRankings.slice(0, 3).map((user, index) => (
                <div key={`pk-${user.rank}`} className="group/item flex items-center space-x-2 p-3 rounded-xl bg-white border border-neutral-200 hover:border-secondary-300 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${
                    index < 3 ? 'bg-secondary-400 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {index + 1}
                  </div>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-9 h-9 rounded-full object-cover border-2 border-neutral-200 group-hover/item:scale-110 transition-transform" 
                  />
                  <span className="flex-1 text-sm font-semibold text-neutral-800 truncate">{user.name}</span>
                  <span className="text-sm font-bold text-secondary-400">{user.points}</span>
                </div>
              ))}
            </div>
            <Link
              to="/pk"
              className="mt-3 w-full block text-center bg-white text-secondary-400 py-2.5 rounded-xl hover:bg-secondary-50 transition-all text-sm font-semibold border border-secondary-200 flex items-center justify-center"
            >
              <span>查看更多</span>
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
      </div>
    </div>
  );
}

