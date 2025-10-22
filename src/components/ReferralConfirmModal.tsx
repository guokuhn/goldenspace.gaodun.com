import { X, UserPlus, Gift, AlertCircle } from 'lucide-react';

interface ReferralConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  scheduleTitle: string;
  scheduleDate: string;
}

export default function ReferralConfirmModal({ 
  onClose, 
  onConfirm, 
  scheduleTitle,
  scheduleDate 
}: ReferralConfirmModalProps) {
  const handleReferral = () => {
    // 这里可以跳转到拉新页面或模拟拉新操作
    // 为了演示，我们直接确认
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-secondary-400 to-secondary-500 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <AlertCircle className="text-white" size={24} />
            <h2 className="text-xl font-bold text-white">完成日程提示</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 transition-colors p-1 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6">
          {/* 提示信息 */}
          <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 mb-6">
            <p className="text-neutral-700 leading-relaxed mb-3">
              您标记的日程 <span className="font-bold text-primary-400">「{scheduleTitle}」</span> 的计划日期是 
              <span className="font-bold text-secondary-400"> {scheduleDate}</span>，
              已经晚于计划时间。
            </p>
            <p className="text-sm text-neutral-600">
              为了督促您按时完成学习计划，需要完成一次拉新任务才能标记此日程为已完成。
            </p>
          </div>

          {/* 拉新说明 */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3 mb-3">
              <Gift className="text-primary-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="font-bold text-neutral-800 mb-2">拉新奖励</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• 邀请1位好友注册，可标记本次日程完成</li>
                  <li>• 您将获得 <span className="text-primary-400 font-semibold">50积分</span> 奖励</li>
                  <li>• 好友也将获得 <span className="text-primary-400 font-semibold">30积分</span> 新人礼包</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="space-y-3">
            <button
              onClick={handleReferral}
              className="w-full flex items-center justify-center space-x-2 bg-secondary-400 hover:bg-secondary-500 text-white py-3 rounded-xl transition-all font-semibold shadow-md transform hover:scale-105"
            >
              <UserPlus size={20} />
              <span>立即邀请好友</span>
            </button>
            <button
              onClick={onClose}
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3 rounded-xl transition-all font-semibold"
            >
              稍后再说
            </button>
          </div>

          {/* 温馨提示 */}
          <div className="mt-4 text-center">
            <p className="text-xs text-neutral-500">
              💡 按时完成日程可以直接标记，无需拉新哦~
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

