import { observer } from 'mobx-react-lite';
import { useUserStore } from '../stores';
import { LogOut, User } from 'lucide-react';

/**
 * 用户信息展示组件示例
 * 展示如何使用 MobX UserStore
 */
const UserProfile = observer(() => {
  const userStore = useUserStore();

  if (!userStore.isLoggedIn) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gradient">个人信息</h2>
        <button
          onClick={() => userStore.logout()}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <LogOut size={18} />
          退出登录
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <User className="text-primary-500" size={24} />
          <div>
            <p className="text-sm text-gray-600">用户ID</p>
            <p className="font-semibold">{userStore.userId}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl">👤</div>
          <div>
            <p className="text-sm text-gray-600">昵称</p>
            <p className="font-semibold">{userStore.nickName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl">📱</div>
          <div>
            <p className="text-sm text-gray-600">手机号</p>
            <p className="font-semibold">{userStore.userName}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>提示：</strong>您的登录状态已保存到本地，刷新页面后会自动恢复。
        </p>
      </div>
    </div>
  );
});

UserProfile.displayName = 'UserProfile';

export default UserProfile;

