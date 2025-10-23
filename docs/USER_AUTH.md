# 用户登录系统使用文档

## 概述

本项目使用 **MobX** 进行状态管理，使用 **axios** 进行 HTTP 请求，并通过 **localStorage** 实现用户信息持久化。

## 技术栈

- **MobX**: 响应式状态管理
- **mobx-react-lite**: MobX 的 React 绑定（轻量级）
- **Axios**: HTTP 客户端，高性能、易用、易维护
- **localStorage**: 浏览器本地存储

## 架构设计

### 1. API 服务层 (`src/services/api.ts`)

封装了所有的 HTTP 请求逻辑：

```typescript
import { apiService } from '@/services/api';

// 登录
const response = await apiService.login({
  nickName: '张三',
  userName: '13800138000'
});
```

**特性：**
- ✅ 统一的请求/响应拦截器
- ✅ 自动添加 Authorization token
- ✅ 统一错误处理
- ✅ 类型安全的请求参数和响应

### 2. 用户状态管理 (`src/stores/UserStore.ts`)

使用 MobX 管理用户状态：

```typescript
import { useUserStore } from '@/stores';

function MyComponent() {
  const userStore = useUserStore();
  
  // 访问状态
  console.log(userStore.isLoggedIn);
  console.log(userStore.userInfo);
  
  // 调用方法
  await userStore.login('张三', '13800138000');
  userStore.logout();
}
```

**UserStore 状态：**

| 属性 | 类型 | 说明 |
|------|------|------|
| `userInfo` | `UserInfo \| null` | 用户信息对象 |
| `isLoggedIn` | `boolean` | 是否已登录 |
| `isLoading` | `boolean` | 是否正在加载（登录中） |
| `error` | `string \| null` | 错误信息 |

**UserStore 方法：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `login(nickName, userName)` | nickName: string, userName: string | Promise<boolean> | 用户登录 |
| `logout()` | - | void | 用户登出 |
| `clearError()` | - | void | 清除错误信息 |
| `updateUserInfo(userInfo)` | userInfo: Partial<UserInfo> | void | 更新用户信息 |

**UserStore Getters：**

| Getter | 类型 | 说明 |
|--------|------|------|
| `userId` | `string \| null` | 用户 ID |
| `nickName` | `string \| null` | 用户昵称 |
| `userName` | `string \| null` | 用户名（手机号） |

### 3. Store Context (`src/stores/index.ts`)

提供了便捷的 React Hooks：

```typescript
import { useUserStore, useStores } from '@/stores';

// 使用单个 Store
const userStore = useUserStore();

// 使用所有 Stores
const { userStore } = useStores();
```

## 使用示例

### 在组件中使用登录功能

```typescript
import { observer } from 'mobx-react-lite';
import { useUserStore } from '@/stores';

const MyComponent = observer(() => {
  const userStore = useUserStore();
  
  const handleLogin = async () => {
    const success = await userStore.login('张三', '13800138000');
    
    if (success) {
      console.log('登录成功！');
      console.log('用户ID:', userStore.userId);
      console.log('用户信息:', userStore.userInfo);
    } else {
      console.error('登录失败:', userStore.error);
    }
  };
  
  const handleLogout = () => {
    userStore.logout();
  };
  
  return (
    <div>
      {userStore.isLoggedIn ? (
        <>
          <p>欢迎，{userStore.nickName}！</p>
          <button onClick={handleLogout}>退出登录</button>
        </>
      ) : (
        <button onClick={handleLogin} disabled={userStore.isLoading}>
          {userStore.isLoading ? '登录中...' : '登录'}
        </button>
      )}
      
      {userStore.error && <p style={{ color: 'red' }}>{userStore.error}</p>}
    </div>
  );
});
```

## 持久化机制

用户信息会自动保存到 localStorage，key 为 `goldenspace_user_info`。

- ✅ **登录时**：自动保存用户信息到 localStorage
- ✅ **刷新页面**：自动从 localStorage 恢复用户状态
- ✅ **登出时**：自动清除 localStorage
- ✅ **数据损坏处理**：如果 localStorage 数据损坏，会自动清除并重置状态

## API 接口说明

### 登录接口

**URL**: `https://gtech19.gaodun.com/api/v1/user/login`

**方法**: POST

**请求参数**:
```json
{
  "nickName": "张三",
  "userName": "13800138000"
}
```

**响应数据**:
```json
{
  "userId": "123456"
}
```

## 错误处理

系统提供了完善的错误处理机制：

1. **网络错误**：自动提示"网络错误，请检查网络连接"
2. **401 未授权**：自动清除本地存储
3. **403 无权限**：提示"没有权限访问该资源"
4. **404 未找到**：提示"请求的资源不存在"
5. **500 服务器错误**：提示"服务器错误"
6. **其他错误**：显示具体的错误信息

## 最佳实践

### 1. 使用 observer 包装组件

```typescript
import { observer } from 'mobx-react-lite';

// ✅ 推荐：使用 observer
const MyComponent = observer(() => {
  const userStore = useUserStore();
  return <div>{userStore.nickName}</div>;
});
```

### 2. 合理处理加载状态

```typescript
const handleLogin = async () => {
  const success = await userStore.login('张三', '13800138000');
  if (success) {
    // 登录成功
  }
};

// 在 UI 中禁用按钮
<button disabled={userStore.isLoading}>
  {userStore.isLoading ? '登录中...' : '登录'}
</button>
```

## 总结

本登录系统具有以下优势：

✅ **高性能**：MobX 自动优化，只在必要时重新渲染  
✅ **易使用**：简洁的 API，清晰的代码结构  
✅ **易维护**：TypeScript 类型安全，职责分离  
✅ **可扩展**：模块化设计，易于添加新功能  
✅ **持久化**：自动保存到 localStorage  
✅ **错误处理**：完善的错误处理和提示机制

