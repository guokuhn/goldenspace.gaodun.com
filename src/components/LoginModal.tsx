import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { useUserStore } from '../stores';

interface LoginModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const LoginModal = observer(({ onClose, onSuccess }: LoginModalProps) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [animateModal, setAnimateModal] = useState(false);
  const userStore = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    // 模态框显示动画
    setAnimateModal(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 11 && name.trim()) {
      // 调用 userStore 的登录方法
      const userInfo = await userStore.login(name, phone);
      
      if (userInfo) {
        console.log('userStore.userInfo', userInfo);
        // 检查用户是否已完成引导（target为空或不存在时跳转到引导页）
        if (!userInfo.target || userInfo.target.trim() === '') {
          onClose();
          navigate('/onboarding', { replace: true });
          return;
        }
        // 登录成功
        onSuccess?.();
        onClose();
      }
      // 如果失败，错误信息会显示在表单下方
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className={`w-full max-w-md relative transition-all duration-500 transform ${animateModal ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        {/* 科技感背景装饰 */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
        
        <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-neutral-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-primary-500 transition-colors"
          >
            <X size={24} className="hover:rotate-90 transition-transform duration-300 hover:text-primary-600" />
          </button>
          
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">🎓</div>
            <h2 className="text-3xl font-bold text-gradient mb-2">欢迎来到 Golden Space</h2>
            <p className="text-gray-600 flex items-center justify-center">
              你的专属成长云空间
              <Sparkles className="ml-1 text-primary-500 animate-pulse" size={14} />
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                用户名称
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入您的姓名"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all group-hover:border-primary-200"
                required
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                手机号
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 11) {
                    setPhone(value);
                  }
                }}
                placeholder="请输入11位手机号"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all group-hover:border-primary-200"
                required
              />
              {phone && phone.length !== 11 && (
                <p className="text-red-500 text-sm mt-1">请输入11位手机号</p>
              )}
            </div>

            {/* 错误提示 */}
            {userStore.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {userStore.error}
              </div>
            )}

            <button
              type="submit"
              disabled={phone.length !== 11 || !name.trim() || userStore.isLoading}
              className="w-full primary-button py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {userStore.isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>登录中...</span>
                </>
              ) : (
                '立即登录'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            登录即表示同意《用户协议》和《隐私政策》
          </p>
        </div>
      </div>
    </div>
  );
});

LoginModal.displayName = 'LoginModal';

export default LoginModal;

