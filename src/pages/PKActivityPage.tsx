import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Swords, Trophy, Zap } from 'lucide-react';
import { mockRankings } from '../data/mockData';

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">PK挑战赛</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 活动介绍 */}
        <div className="bg-gradient-to-r from-primary-100 via-secondary-100 to-primary-100 rounded-2xl shadow-lg p-8 mb-8 text-center">
          <div className="text-6xl mb-4">⚔️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">天梯PK挑战赛</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            消耗 <span className="font-bold text-primary-600">1积分</span> 开启一场PK，系统将为您匹配积分相近的对手。
            月度积分更高者获胜，赢家将获得 <span className="font-bold text-accent-600">5积分</span> 奖励！
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">智能匹配</h3>
              <p className="text-sm text-gray-600">匹配积分相近5%以内的对手</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">实时对战</h3>
              <p className="text-sm text-gray-600">比拼月度积分，实力说话</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-gray-800 mb-2">赢取奖励</h3>
              <p className="text-sm text-gray-600">胜者获得积分，提升排名</p>
            </div>
          </div>
        </div>

        {/* PK区域 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {!isPKing && !pkResult && (
            <div className="text-center py-12">
              <div className="text-8xl mb-6 animate-pulse">⚔️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">准备好开始挑战了吗？</h3>
              <p className="text-gray-600 mb-8">消耗1积分，匹配对手开始PK</p>
              <button
                onClick={startPK}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-12 py-4 rounded-xl text-lg font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Swords size={24} />
                  <span>开始天梯赛PK</span>
                </div>
              </button>
            </div>
          )}

          {isPKing && (
            <div className="text-center py-12">
              <div className="text-8xl mb-6 animate-spin">⚡</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">正在匹配对手...</h3>
              <p className="text-gray-600">请稍候</p>
            </div>
          )}

          {pkResult && (
            <div className="text-center py-12">
              {pkResult === 'win' ? (
                <>
                  <div className="text-8xl mb-6 animate-bounce">🎉</div>
                  <h3 className="text-3xl font-bold text-accent-600 mb-4">恭喜你获胜了！</h3>
                  <p className="text-xl text-gray-700 mb-8">获得 +5 积分奖励</p>
                </>
              ) : (
                <>
                  <div className="text-8xl mb-6">😢</div>
                  <h3 className="text-3xl font-bold text-gray-600 mb-4">很遗憾，这次失败了</h3>
                  <p className="text-xl text-gray-700 mb-8">继续努力，下次一定能赢！</p>
                </>
              )}
              <div className="bg-gray-50 rounded-xl p-6 mb-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center flex-1">
                    <div className="text-4xl mb-2">👨‍🎓</div>
                    <p className="font-semibold text-gray-800">你</p>
                    <p className="text-2xl font-bold text-primary-600 mt-2">1580</p>
                  </div>
                  <div className="text-4xl mx-4">⚔️</div>
                  <div className="text-center flex-1">
                    <div className="text-4xl mb-2">👩‍🎓</div>
                    <p className="font-semibold text-gray-800">对手</p>
                    <p className="text-2xl font-bold text-gray-600 mt-2">1520</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setPkResult(null);
                  startPK();
                }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                再来一局
              </button>
            </div>
          )}
        </div>

        {/* 我的战绩 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Swords className="mx-auto text-primary-500 mb-3" size={32} />
            <p className="text-3xl font-bold text-gray-800 mb-2">25</p>
            <p className="text-gray-600">总场次</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Trophy className="mx-auto text-accent-500 mb-3" size={32} />
            <p className="text-3xl font-bold text-gray-800 mb-2">18</p>
            <p className="text-gray-600">胜场</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Zap className="mx-auto text-secondary-500 mb-3" size={32} />
            <p className="text-3xl font-bold text-gray-800 mb-2">72%</p>
            <p className="text-gray-600">胜率</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Trophy className="mx-auto text-primary-500 mb-3" size={32} />
            <p className="text-3xl font-bold text-gray-800 mb-2">90</p>
            <p className="text-gray-600">获得积分</p>
          </div>
        </div>

        {/* PK排行榜 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Swords className="text-primary-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">PK排行榜</h2>
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
                      index < 3 ? 'bg-gradient-to-r from-primary-50 to-secondary-50' : 'hover:bg-gray-50'
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
                      <p className="text-xs text-gray-500">胜率 {Math.floor(Math.random() * 30) + 60}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">{user.points}</p>
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
                      index < 3 ? 'bg-gradient-to-r from-primary-50 to-secondary-50' : 'hover:bg-gray-50'
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
                      <p className="text-xs text-gray-500">胜率 {Math.floor(Math.random() * 30) + 60}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">{user.points}</p>
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

