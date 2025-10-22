import { X, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Schedule } from '../types';

interface SyncScheduleModalProps {
  onClose: () => void;
  schedules: Schedule[];
}

export default function SyncScheduleModal({ onClose, schedules }: SyncScheduleModalProps) {
  // 生成移动端页面链接 - 显示所有日程
  const getMobilePageUrl = () => {
    // 这里我们可以传递所有日程的信息，或者只传递一个标识让H5页面从localStorage读取
    return `${window.location.origin}/mobile-schedule?mode=all`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-secondary-400 to-secondary-500 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <Smartphone className="text-white" size={24} />
            <h2 className="text-xl font-bold text-white">同步至手机日程</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 transition-colors p-1 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* 内容 - 两栏布局 */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 左侧：二维码 */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-2xl border-2 border-secondary-200 mb-4">
                <QRCodeSVG
                  value={getMobilePageUrl()}
                  size={180}
                  level="H"
                  includeMargin={true}
                  className="mx-auto"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-neutral-800 mb-2">使用手机扫描二维码</h3>
                <p className="text-sm text-neutral-600">
                  扫码后可在手机浏览器中查看您的所有日程
                </p>
              </div>
            </div>

            {/* 右侧：说明和统计 */}
            <div className="flex flex-col justify-center space-y-4">
              {/* 日程统计 */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-neutral-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-neutral-800">{schedules.length}</p>
                  <p className="text-xs text-neutral-500 mt-1">总日程</p>
                </div>
                <div className="bg-primary-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-primary-400">
                    {schedules.filter(s => s.status === 'completed').length}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">已完成</p>
                </div>
                <div className="bg-secondary-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-secondary-400">
                    {schedules.filter(s => s.status === 'pending').length}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">待完成</p>
                </div>
              </div>

              {/* 功能说明 */}
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  <span className="font-semibold">📱 功能说明：</span>
                  <br />
                  • 扫码后可在手机浏览器打开
                  <br />
                  • 查看您的所有日程安排
                  <br />
                  • 支持下载 .ics 日历文件
                  <br />
                  • 兼容 iOS 和 Android 系统
                </p>
              </div>

              {/* 关闭按钮 */}
              <button
                onClick={onClose}
                className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-2.5 rounded-xl transition-all font-semibold"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

