import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Gift, Share2, Trophy } from 'lucide-react';
import { mockReferralRankings } from '../data/mockData';

export default function ReferralActivityPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-neutral-600 hover:text-primary-400 transition-colors">
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-neutral-800">圈人奖励</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 活动介绍 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 text-center border border-neutral-200">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Gift className="text-primary-400" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">圈人奖励活动</h2>
          <p className="text-base text-neutral-600 mb-6 max-w-2xl mx-auto">
            邀请好友加入 Golden Space，共同成长！每成功邀请一位好友注册并完成首次打卡，您将获得 <span className="font-bold text-primary-400">50积分</span> 奖励。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-300 transition-all">
              <div className="text-4xl mb-3">1️⃣</div>
              <h3 className="font-bold text-neutral-800 text-base mb-2">分享邀请链接</h3>
              <p className="text-sm text-neutral-600">扫码或转发邀请卡片给微信好友</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-300 transition-all">
              <div className="text-4xl mb-3">2️⃣</div>
              <h3 className="font-bold text-neutral-800 text-base mb-2">好友完成注册</h3>
              <p className="text-sm text-neutral-600">好友点击链接完成登录注册</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-300 transition-all">
              <div className="text-4xl mb-3">3️⃣</div>
              <h3 className="font-bold text-neutral-800 text-base mb-2">获得积分奖励</h3>
              <p className="text-sm text-neutral-600">好友完成首次打卡，双方获得积分</p>
            </div>
          </div>

          <button className="bg-primary-400 hover:bg-primary-600 text-white px-12 py-3 rounded-xl text-base font-semibold transition-all">
            <div className="flex items-center space-x-2">
              <Share2 size={20} />
              <span>立即邀请好友</span>
            </div>
          </button>
        </div>

        {/* 我的邀请统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-neutral-200 hover:border-primary-300 transition-all">
            <Users className="mx-auto text-primary-400 mb-3" size={32} />
            <p className="text-3xl font-bold text-primary-400 mb-2">12</p>
            <p className="text-neutral-600 font-medium">累计邀请人数</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-neutral-200 hover:border-primary-300 transition-all">
            <Gift className="mx-auto text-primary-400 mb-3" size={32} />
            <p className="text-3xl font-bold text-primary-400 mb-2">600</p>
            <p className="text-neutral-600 font-medium">累计获得积分</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-neutral-200 hover:border-primary-300 transition-all">
            <Trophy className="mx-auto text-primary-400 mb-3" size={32} />
            <p className="text-3xl font-bold text-primary-400 mb-2">15</p>
            <p className="text-neutral-600 font-medium">全国排名</p>
          </div>
        </div>

        {/* 圈人排行榜 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-200">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="text-primary-400" size={24} />
            <h2 className="text-2xl font-bold text-neutral-800">圈人排行榜</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 全国排行 */}
            <div>
              <h3 className="font-bold text-neutral-700 mb-4 flex items-center space-x-2 text-base">
                <span className="text-xl">🌍</span>
                <span>全国排行</span>
              </h3>
              <div className="space-y-2">
                {mockReferralRankings.slice(0, 10).map((user, index) => (
                  <div
                    key={user.rank}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 transition-all cursor-pointer"
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                      index === 0 ? 'bg-primary-400 text-white' :
                      index === 1 ? 'bg-primary-100 text-primary-400' :
                      index === 2 ? 'bg-primary-50 text-primary-400' :
                      'bg-neutral-100 text-neutral-600'
                    }`}>
                      {user.rank}
                    </div>
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-800 text-sm">{user.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-400 text-sm">{user.points}</p>
                      <p className="text-xs text-neutral-500">积分</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 本校排行 */}
            <div>
              <h3 className="font-bold text-neutral-700 mb-4 flex items-center space-x-2 text-base">
                <span className="text-xl">🎓</span>
                <span>本校排行</span>
              </h3>
              <div className="space-y-2">
                {mockReferralRankings.slice(10, 20).map((user, index) => (
                  <div
                    key={user.rank}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 transition-all cursor-pointer"
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                      index === 0 ? 'bg-primary-400 text-white' :
                      index === 1 ? 'bg-primary-100 text-primary-400' :
                      index === 2 ? 'bg-primary-50 text-primary-400' :
                      'bg-neutral-100 text-neutral-600'
                    }`}>
                      {index + 1}
                    </div>
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-800 text-sm">{user.name}</p>
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
        </div>
      </div>
    </div>
  );
}
