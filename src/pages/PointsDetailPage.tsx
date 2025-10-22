import { Link } from 'react-router-dom';
import { ChevronLeft, Trophy, Gift, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface PointsDetailPageProps {
  user: User | null;
}

export default function PointsDetailPage({ user }: PointsDetailPageProps) {
  // 模拟领取记录数据
  const redeemHistory = [
    {
      id: 1,
      date: '2024-10-20',
      amount: 500,
      fund: '教育助学基金',
      status: 'completed',
      description: '已成功捐赠到山区小学'
    },
    {
      id: 2,
      date: '2024-10-15',
      amount: 300,
      fund: '科研创新基金',
      status: 'completed',
      description: '已用于支持大学生创新项目'
    },
    {
      id: 3,
      date: '2024-10-10',
      amount: 200,
      fund: '图书馆建设基金',
      status: 'completed',
      description: '已用于购买学习资料'
    },
    {
      id: 4,
      date: '2024-10-05',
      amount: 400,
      fund: '职业培训基金',
      status: 'completed',
      description: '已用于提供免费职业培训'
    },
    {
      id: 5,
      date: '2024-09-28',
      amount: 350,
      fund: '教育助学基金',
      status: 'completed',
      description: '已成功捐赠到贫困地区'
    }
  ];

  // 兑换规则数据
  const exchangeRules = [
    { points: 100, amount: '1元', description: '支持公益教育' },
    { points: 500, amount: '5元', description: '帮助一名学生购买学习用品' },
    { points: 1000, amount: '10元', description: '资助一周的午餐' },
    { points: 5000, amount: '50元', description: '支持一学期的课外辅导' }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center space-x-2 text-neutral-600 hover:text-primary-400 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold text-neutral-800">我的积分</h1>
          <div className="w-24"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 积分总览卡片 */}
        <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-sm p-8 mb-8 text-center border border-primary-200">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="text-primary-400" size={48} />
          </div>
          <h2 className="text-4xl font-bold text-primary-400 mb-2">{user?.points || 0}</h2>
          <p className="text-neutral-600 mb-6">我的当前积分</p>
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="bg-white rounded-xl p-4 border border-neutral-200">
              <p className="text-2xl font-bold text-neutral-800">1,250</p>
              <p className="text-xs text-neutral-500 mt-1">累计获得</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-neutral-200">
              <p className="text-2xl font-bold text-neutral-800">350</p>
              <p className="text-xs text-neutral-500 mt-1">已兑换</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-neutral-200">
              <p className="text-2xl font-bold text-primary-400">{user?.points || 0}</p>
              <p className="text-xs text-neutral-500 mt-1">可用余额</p>
            </div>
          </div>
        </div>

        {/* 百万公益基金说明 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-neutral-200">
          <div className="flex items-center space-x-3 mb-6">
            <Gift className="text-secondary-400" size={32} />
            <h2 className="text-2xl font-bold text-neutral-800">百万公益基金计划</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-neutral-600 leading-relaxed">
              Golden Space 发起"百万公益基金计划"，旨在通过用户的学习积分，转化为实际的公益基金，用于支持教育事业、帮助贫困学生、建设学习设施等公益项目。
            </p>
            <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
              <h3 className="font-bold text-neutral-800 mb-3 flex items-center">
                <TrendingUp className="text-primary-400 mr-2" size={20} />
                积分如何转化为公益基金？
              </h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  <span>每 100 积分 = 1 元公益基金</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  <span>积分通过完成学习打卡、参与活动、分享内容等方式获得</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  <span>平台每季度公布公益基金使用明细，确保透明公开</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  <span>所有用户可以随时查看自己的积分兑换记录</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 兑换规则 */}
          <div className="mb-6">
            <h3 className="font-bold text-neutral-800 mb-4 flex items-center">
              <Gift className="text-primary-400 mr-2" size={20} />
              兑换规则
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exchangeRules.map((rule, index) => (
                <div key={index} className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-primary-400">{rule.points} 积分</span>
                    <span className="text-lg font-bold text-neutral-800">{rule.amount}</span>
                  </div>
                  <p className="text-sm text-neutral-600">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 兑换按钮 */}
          <div className="text-center">
            <button className="bg-primary-400 hover:bg-primary-500 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-md">
              立即兑换公益基金
            </button>
            <p className="text-xs text-neutral-500 mt-3">当前可兑换：{Math.floor((user?.points || 0) / 100)} 元</p>
          </div>
        </div>

        {/* 领取记录 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-neutral-200">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="text-primary-400" size={32} />
            <h2 className="text-2xl font-bold text-neutral-800">兑换记录</h2>
          </div>

          <div className="space-y-4">
            {redeemHistory.map((record) => (
              <div 
                key={record.id}
                className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-primary-400 mt-1" size={20} />
                    <div>
                      <h3 className="font-bold text-neutral-800 mb-1">{record.fund}</h3>
                      <p className="text-sm text-neutral-600">{record.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-secondary-400 text-lg">-{record.amount} 积分</p>
                    <p className="text-xs text-neutral-500">{(record.amount / 100).toFixed(2)} 元</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                  <span className="text-xs text-neutral-500 flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {record.date}
                  </span>
                  <span className="text-xs bg-primary-50 text-primary-400 px-3 py-1 rounded-full">
                    {record.status === 'completed' ? '已完成' : '处理中'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {redeemHistory.length === 0 && (
            <div className="text-center py-12">
              <Gift className="text-neutral-300 mx-auto mb-4" size={48} />
              <p className="text-neutral-500">暂无兑换记录</p>
              <p className="text-sm text-neutral-400 mt-2">快去获取积分，参与公益活动吧！</p>
            </div>
          )}
        </div>

        {/* 获取积分方式 */}
        <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl shadow-sm p-8 mt-8 border border-secondary-200">
          <h3 className="text-xl font-bold text-neutral-800 mb-6 text-center">如何获取更多积分？</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 border border-neutral-200">
                <CheckCircle className="text-primary-400" size={28} />
              </div>
              <h4 className="font-bold text-neutral-800 mb-2">每日打卡</h4>
              <p className="text-sm text-neutral-600">完成学习任务，每天最多可获得 50 积分</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 border border-neutral-200">
                <Trophy className="text-primary-400" size={28} />
              </div>
              <h4 className="font-bold text-neutral-800 mb-2">参与活动</h4>
              <p className="text-sm text-neutral-600">参与 PK 挑战、邀新活动，赢取额外积分</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 border border-neutral-200">
                <Gift className="text-primary-400" size={28} />
              </div>
              <h4 className="font-bold text-neutral-800 mb-2">分享内容</h4>
              <p className="text-sm text-neutral-600">在社区分享学习心得，获得点赞奖励</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

