import { X, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { observer } from "mobx-react-lite";

interface QRCodeModalProps {
  onClose: () => void;
  qrValue?: string;
  qrImagePath?: string;
  title?: string;
  description?: string;
}

export default observer(function QRCodeModal({ 
  onClose, 
  qrValue = window.location.href,
  qrImagePath,
  title = "扫码查看",
  description = "使用手机扫描二维码访问"
}: QRCodeModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-primary-400 to-primary-500 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <QrCode className="text-white" size={24} />
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 transition-colors p-1 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* 内容 */}
        <div className="p-8">
          {/* 二维码容器 */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-2xl border-2 border-primary-200 shadow-lg mb-6">
              {qrImagePath ? (
                <img
                  src={qrImagePath}
                  alt="二维码"
                  className="w-[220px] h-[220px] object-contain mx-auto"
                />
              ) : (
                <QRCodeSVG
                  value={qrValue}
                  size={220}
                  level="H"
                  includeMargin={true}
                  className="mx-auto"
                />
              )}
            </div>
            
            {/* 说明文字 */}
            <div className="text-center mb-6">
              <h3 className="font-bold text-neutral-800 mb-2">{description}</h3>
              <p className="text-sm text-neutral-600">
                你来成长，我助力～
              </p>
            </div>

            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="w-full bg-primary-400 hover:bg-primary-500 text-white py-3 rounded-xl transition-all font-semibold shadow-md hover:shadow-lg"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});