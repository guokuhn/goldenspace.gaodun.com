# 快速开始指南

## 📦 已安装的依赖

```json
{
  "mobx": "^6.x",
  "mobx-react-lite": "^4.x",
  "axios": "^1.x"
}
```

## 🚀 快速使用

### 1. 在组件中使用登录功能

```typescript
import { observer } from 'mobx-react-lite';
import { useUserStore } from '@/stores';

const MyComponent = observer(() => {
  const userStore = useUserStore();
  
  return (
    <div>
      {userStore.isLoggedIn ? (
        <div>欢迎，{userStore.nickName}！</div>
      ) : (
        <button onClick={() => userStore.login('张三', '13800138000')}>
          登录
        </button>
      )}
    </div>
  );
});
```

### 2. 访问用户信息

```typescript
const userStore = useUserStore();

// 登录状态
console.log(userStore.isLoggedIn);

// 用户信息
console.log(userStore.userId);
console.log(userStore.nickName);
console.log(userStore.userName);

// 完整用户信息对象
console.log(userStore.userInfo);
```

### 3. 登录/登出

```typescript
// 登录
const success = await userStore.login('张三', '13800138000');

// 登出
userStore.logout();
```

## 📝 核心功能

### UserStore 提供的功能

| 功能 | 说明 |
|------|------|
| ✅ 用户登录 | 调用 API 接口完成登录 |
| ✅ 用户登出 | 清除用户状态和本地存储 |
| ✅ 状态持久化 | 自动保存到 localStorage |
| ✅ 自动恢复 | 刷新页面自动恢复登录状态 |
| ✅ 加载状态 | 提供 isLoading 标志 |
| ✅ 错误处理 | 统一的错误处理机制 |

## 🎯 实际应用示例

### 示例：带加载状态的登录按钮

```typescript
import { observer } from 'mobx-react-lite';
import { useUserStore } from '@/stores';

const LoginButton = observer(({ nickName, userName }) => {
  const userStore = useUserStore();
  
  const handleLogin = async () => {
    const success = await userStore.login(nickName, userName);
    if (success) {
      alert('登录成功！');
    }
  };
  
  return (
    <button 
      onClick={handleLogin}
      disabled={userStore.isLoading}
    >
      {userStore.isLoading ? '登录中...' : '登录'}
    </button>
  );
});
```

## 💡 最佳实践提醒

1. ✅ **始终使用 observer**：确保组件能响应状态变化
2. ✅ **合理处理错误**：显示 userStore.error 给用户
3. ✅ **展示加载状态**：使用 userStore.isLoading 禁用按钮
4. ✅ **及时清除错误**：在重试前调用 userStore.clearError()
5. ✅ **类型安全**：充分利用 TypeScript 类型系统

## 🎉 完成！

现在你已经拥有了一个完整、高效、易用的用户登录系统！

