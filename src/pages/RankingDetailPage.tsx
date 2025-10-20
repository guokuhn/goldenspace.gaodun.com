import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';
import { mockRankings } from '../data/mockData';

export default function RankingDetailPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'semester' | 'year'>('month');
  const [rankingType, setRankingType] = useState<'total' | 'school' | 'learning' | 'job' | 'postgrad' | 'abroad'>('total');

  const rankingTypes = [
    { key: 'total', label: '总排行榜', icon: '🏆' },
    { key: 'school', label: '本校排行榜', icon: '🎓' },
    { key: 'learning', label: '学习排行榜', icon: '📚' },
    { key: 'job', label: '上岸之星', icon: '💼' },
    { key: 'postgrad', label: '保研之星', icon: '🎯' },
    { key: 'abroad', label: '留学之星', icon: '✈️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors">
            <ArrowLeft size={20} className="hover:text-primary-500 transition-colors" />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">排行榜</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 百万成长计划介绍 */}
        <div className="bg-gradient-to-r from-secondary-100 via-primary-100 to-accent-100 rounded-2xl shadow-lg p-8 mb-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">百万成长计划</h2>
          <p className="text-xl text-gray-700 mb-4">百万公益基金，助你成为更好的自己！</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            高顿公司面向全国大学生提供高顿云空间平台和百万公益基金，将根据每月、每学期、每年的积分排名，定期瓜分奖金。坚持打卡，提升自己，赢取奖励！
          </p>
        </div>

        {/* 排行榜类型切换 */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          {rankingTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => setRankingType(type.key as any)}
              className={`p-4 rounded-xl transition-all ${
                rankingType === type.key
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg transform -translate-y-1'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              <div className="text-3xl mb-1">{type.icon}</div>
              <div className="text-sm font-semibold">{type.label}</div>
            </button>
          ))}
        </div>

        {/* 周期切换 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex space-x-2 mb-6">
            {(['week', 'month', 'semester', 'year'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  period === p
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {p === 'week' ? '周榜' : p === 'month' ? '月榜' : p === 'semester' ? '学期榜' : '年度榜'}
              </button>
            ))}
          </div>

          {/* 前三名特殊展示 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {mockRankings.slice(0, 3).map((user, index) => (
              <div
                key={user.rank}
                className={`text-center p-6 rounded-xl ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 transform -translate-y-2' :
                  index === 1 ? 'bg-gradient-to-br from-gray-100 to-gray-200' :
                  'bg-gradient-to-br from-orange-100 to-orange-200'
                }`}
              >
                <div className={`text-6xl mb-2 ${index === 0 ? 'animate-bounce' : ''}`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </div>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                />
                <p className="font-bold text-gray-800 text-lg mb-1">{user.name}</p>
                <div className="flex items-center justify-center space-x-1 group">
                  <Trophy className="text-primary-600 group-hover:scale-110 transition-transform duration-300" size={20} />
                  <span className="text-2xl font-bold text-primary-600">{user.points}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 其他排名 */}
          <div className="space-y-2">
            {mockRankings.slice(3, 5).map((user) => (
              <div
                key={user.rank}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full font-bold text-gray-700">
                  {user.rank}
                </div>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 group">
                    <Trophy className="text-primary-500 group-hover:scale-110 transition-transform duration-300" size={18} />
                    <span className="text-xl font-bold text-primary-600">{user.points}</span>
                  </div>
                  <p className="text-xs text-gray-500">积分</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

