import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Swords, Trophy, Zap } from 'lucide-react';
import { mockPKRankings } from '../data/mockData';

export default function PKActivityPage() {
  const [isPKing, setIsPKing] = useState(false);
  const [pkResult, setPkResult] = useState<'win' | 'lose' | null>(null);

  const startPK = () => {
    setIsPKing(true);
    setPkResult(null);
    
    // 模拟PK过程
    setTimeout(() => {
      setIsPKing(false);
      setPkResult(Math.random() > 0.5 ? 'win' : 'lose');
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-neutral-600 hover:text-primary-400 transition-colors">
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-neutral-800">PK挑战赛</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 活动介绍 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 text-center border border-neutral-200">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Swords className="text-secondary-400" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">天梯PK挑战赛</h2>
          <p className="text-base text-neutral-600 mb-6 max-w-2xl mx-auto">
            消耗 <span className="font-bold text-primary-400">1积分</span> 开启一场PK，系统将为您匹配积分相近的对手。
            月度积分更高者获胜，赢家将获得 <span className="font-bold text-primary-400">5积分</span> 奖励！
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-300 transition-all">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-neutral-800 text-base mb-2">智能匹配</h3>
              <p className="text-sm text-neutral-600">匹配积分相近5%以内的对手</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-300 transition-all">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-neutral-800 text-base mb-2">实时对战</h3>
              <p className="text-sm text-neutral-600">比拼月度积分，实力说话</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-300 transition-all">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-neutral-800 text-base mb-2">赢取奖励</h3>
              <p className="text-sm text-neutral-600">胜者获得积分，提升排名</p>
            </div>
          </div>
        </div>

        {/* PK区域 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-neutral-200">
          {!isPKing && !pkResult && (
            <div className="text-center py-12">
              <div className="text-8xl mb-6">⚔️</div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">准备好开始挑战了吗？</h3>
              <p className="text-neutral-600 mb-8">消耗1积分，匹配对手开始PK</p>
              <button
                onClick={startPK}
                className="bg-secondary-400 hover:bg-secondary-600 text-white px-12 py-3 rounded-xl text-base font-semibold transition-all"
              >
                <div className="flex items-center space-x-2">
                  <Swords size={20} />
                  <span>开始天梯赛PK</span>
                </div>
              </button>
            </div>
          )}

          {isPKing && (
            <div className="text-center py-12">
              <div className="text-8xl mb-6 animate-spin">⚡</div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">正在匹配对手...</h3>
              <p className="text-neutral-600">请稍候</p>
            </div>
          )}

          {pkResult && (
            <div className="text-center py-12">
              {pkResult === 'win' ? (
                <>
                  <div className="text-8xl mb-6 animate-bounce">🎉</div>
                  <h3 className="text-3xl font-bold text-neutral-800 mb-4">恭喜你获胜了！</h3>
                  <p className="text-xl text-primary-400 font-semibold mb-8">获得 +5 积分奖励</p>
                </>
              ) : (
                <>
                  <div className="text-8xl mb-6">😢</div>
                  <h3 className="text-3xl font-bold text-neutral-800 mb-4">很遗憾，这次失败了</h3>
                  <p className="text-xl text-neutral-600 mb-8">继续努力，下次一定能赢！</p>
                </>
              )}
              <div className="bg-neutral-50 rounded-2xl p-6 mb-6 max-w-md mx-auto border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center flex-1">
                    <div className="text-4xl mb-2">👨‍🎓</div>
                    <p className="font-semibold text-neutral-800">你</p>
                    <p className="text-2xl font-bold text-primary-400 mt-2">1580</p>
                  </div>
                  <div className="text-4xl mx-4">⚔️</div>
                  <div className="text-center flex-1">
                    <div className="text-4xl mb-2">👩‍🎓</div>
                    <p className="font-semibold text-neutral-800">对手</p>
                    <p className="text-2xl font-bold text-neutral-500 mt-2">1520</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setPkResult(null);
                  startPK();
                }}
                className="bg-primary-400 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold transition-all"
              >
                再来一局
              </button>
            </div>
          )}
        </div>

        {/* 我的战绩 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-neutral-200 hover:border-primary-300 transition-all">
            <Swords className="mx-auto text-secondary-400 mb-3" size={32} />
            <p className="text-3xl font-bold text-primary-400 mb-2">25</p>
            <p className="text-neutral-600 font-medium">总场次</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-neutral-200 hover:border-primary-300 transition-all">
            <Trophy className="mx-auto text-primary-400 mb-3" size={32} />
            <p className="text-3xl font-bold text-primary-400 mb-2">18</p>
            <p className="text-neutral-600 font-medium">胜场</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-neutral-200 hover:border-primary-300 transition-all">
            <Zap className="mx-auto text-secondary-400 mb-3" size={32} />
            <p className="text-3xl font-bold text-primary-400 mb-2">72%</p>
            <p className="text-neutral-600 font-medium">胜率</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-neutral-200 hover:border-primary-300 transition-all">
            <Trophy className="mx-auto text-primary-400 mb-3" size={32} />
            <p className="text-3xl font-bold text-primary-400 mb-2">90</p>
            <p className="text-neutral-600 font-medium">获得积分</p>
          </div>
        </div>

        {/* PK排行榜 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-neutral-200">
          <div className="flex items-center space-x-2 mb-6">
            <Swords className="text-secondary-400" size={24} />
            <h2 className="text-2xl font-bold text-neutral-800">PK排行榜</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 全国排行 */}
            <div>
              <h3 className="font-bold text-neutral-700 mb-4 flex items-center space-x-2 text-base">
                <span className="text-xl">🌍</span>
                <span>全国排行</span>
              </h3>
              <div className="space-y-2">
                {mockPKRankings.slice(0, 10).map((user, index) => (
                  <div
                    key={user.rank}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-neutral-200 hover:border-secondary-300 transition-all cursor-pointer"
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                      index === 0 ? 'bg-secondary-400 text-white' :
                      index === 1 ? 'bg-secondary-100 text-secondary-400' :
                      index === 2 ? 'bg-secondary-50 text-secondary-400' :
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
                      <p className="text-xs text-neutral-500">胜率 {Math.floor(Math.random() * 30) + 60}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-secondary-400 text-sm">{user.points}</p>
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
                {mockPKRankings.slice(10, 20).map((user, index) => (
                  <div
                    key={user.rank}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-neutral-200 hover:border-secondary-300 transition-all cursor-pointer"
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                      index === 0 ? 'bg-secondary-400 text-white' :
                      index === 1 ? 'bg-secondary-100 text-secondary-400' :
                      index === 2 ? 'bg-secondary-50 text-secondary-400' :
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
                      <p className="text-xs text-neutral-500">胜率 {Math.floor(Math.random() * 30) + 60}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-secondary-400 text-sm">{user.points}</p>
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
