import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Crown, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen">
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-neutral-600 hover:text-primary-400 transition-colors">
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-neutral-800">排行榜</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 百万成长计划介绍 */}
        <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-sm p-8 mb-8 text-center border border-primary-200">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Crown className="text-primary-400" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-neutral-800 mb-3">百万成长计划</h2>
          <p className="text-lg text-neutral-700 font-semibold mb-4">百万公益基金，助你成为更好的自己！</p>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm leading-relaxed">
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
                  ? 'bg-primary-400 text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:shadow-md border border-neutral-200 hover:border-primary-300'
              }`}
            >
              <div className="text-3xl mb-1">{type.icon}</div>
              <div className="text-sm font-semibold">{type.label}</div>
            </button>
          ))}
        </div>

        {/* 周期切换 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-neutral-200">
          <div className="flex space-x-3 mb-8">
            {(['week', 'month', 'semester', 'year'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  period === p
                    ? 'bg-primary-400 text-white'
                    : 'bg-white text-neutral-700 hover:bg-primary-50 border border-neutral-200'
                }`}
              >
                {p === 'week' ? '周榜' : p === 'month' ? '月榜' : p === 'semester' ? '学期榜' : '年度榜'}
              </button>
            ))}
          </div>

          {/* 前三名特殊展示 */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {mockRankings.slice(0, 3).map((user, index) => (
              <div
                key={user.rank}
                className="relative text-center p-6 rounded-2xl bg-white border border-neutral-200 hover:border-primary-300 transition-all"
              >
                <div className="text-6xl mb-3">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </div>
                <div className="relative inline-block mb-3">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-20 h-20 rounded-full object-cover border-2 border-neutral-200"
                  />
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                    index === 0 ? 'bg-primary-400' : 
                    index === 1 ? 'bg-primary-100 text-primary-400' : 
                    'bg-primary-50 text-primary-400'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <p className="font-bold text-neutral-800 text-lg mb-2">{user.name}</p>
                <div className="flex items-center justify-center space-x-2 bg-neutral-50 rounded-lg py-2 px-4">
                  <Trophy className="text-primary-400" size={20} />
                  <span className="text-2xl font-bold text-primary-400">{user.points}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 其他排名 (4-10名) */}
          <div className="space-y-3">
            {mockRankings.slice(3, 10).map((user, index) => (
              <div
                key={user.rank}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-neutral-100 rounded-full font-bold text-neutral-600 text-base">
                  {user.rank}
                </div>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                />
                <div className="flex-1">
                  <p className="font-bold text-neutral-800 text-base">{user.name}</p>
                  <p className="text-xs text-neutral-500">排名 #{user.rank}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Trophy className="text-primary-400" size={18} />
                    <span className="text-xl font-bold text-primary-400">{user.points}</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">积分</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

