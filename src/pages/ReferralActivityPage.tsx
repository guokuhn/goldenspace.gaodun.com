import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Gift, Share2, Trophy } from 'lucide-react';
import { mockRankings } from '../data/mockData';

export default function ReferralActivityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">圈人奖励</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 活动介绍 */}
        <div className="bg-gradient-to-r from-accent-100 via-green-100 to-accent-100 rounded-2xl shadow-lg p-8 mb-8 text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">圈人奖励活动</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            邀请好友加入 Golden Space，共同成长！每成功邀请一位好友注册并完成首次打卡，您将获得 <span className="font-bold text-accent-600">50积分</span> 奖励。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-3">1️⃣</div>
              <h3 className="font-bold text-gray-800 mb-2">分享邀请链接</h3>
              <p className="text-sm text-gray-600">扫码或转发邀请卡片给微信好友</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-3">2️⃣</div>
              <h3 className="font-bold text-gray-800 mb-2">好友完成注册</h3>
              <p className="text-sm text-gray-600">好友点击链接完成登录注册</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-3">3️⃣</div>
              <h3 className="font-bold text-gray-800 mb-2">获得积分奖励</h3>
              <p className="text-sm text-gray-600">好友完成首次打卡，双方获得积分</p>
            </div>
          </div>

          <button className="bg-gradient-to-r from-accent-500 to-green-600 text-white px-12 py-4 rounded-xl text-lg font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="flex items-center space-x-3">
              <Share2 size={24} />
              <span>立即邀请好友</span>
            </div>
          </button>
        </div>

        {/* 我的邀请统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="mx-auto text-accent-500 mb-3" size={40} />
            <p className="text-4xl font-bold text-gray-800 mb-2">12</p>
            <p className="text-gray-600">累计邀请人数</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Gift className="mx-auto text-primary-500 mb-3" size={40} />
            <p className="text-4xl font-bold text-gray-800 mb-2">600</p>
            <p className="text-gray-600">累计获得积分</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Trophy className="mx-auto text-secondary-500 mb-3" size={40} />
            <p className="text-4xl font-bold text-gray-800 mb-2">15</p>
            <p className="text-gray-600">全国排名</p>
          </div>
        </div>

        {/* 圈人排行榜 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="text-accent-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">圈人排行榜</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 全国排行 */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                <span>🌍</span>
                <span>全国排行</span>
              </h3>
              <div className="space-y-2">
                {mockRankings.slice(0, 10).map((user, index) => (
                  <div
                    key={user.rank}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      index < 3 ? 'bg-gradient-to-r from-accent-50 to-green-50' : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                      index === 0 ? 'bg-yellow-400 text-white' :
                      index === 1 ? 'bg-gray-300 text-white' :
                      index === 2 ? 'bg-orange-400 text-white' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {user.rank}
                    </div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{user.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent-600">{user.points}</p>
                      <p className="text-xs text-gray-500">积分</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 本校排行 */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                <span>🎓</span>
                <span>本校排行</span>
              </h3>
              <div className="space-y-2">
                {mockRankings.slice(0, 10).map((user, index) => (
                  <div
                    key={user.rank}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      index < 3 ? 'bg-gradient-to-r from-accent-50 to-green-50' : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                      index === 0 ? 'bg-yellow-400 text-white' :
                      index === 1 ? 'bg-gray-300 text-white' :
                      index === 2 ? 'bg-orange-400 text-white' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {user.rank}
                    </div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{user.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent-600">{user.points}</p>
                      <p className="text-xs text-gray-500">积分</p>
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

