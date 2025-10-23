import React from 'react';
import { userStore } from './UserStore';

/**
 * Root Store 聚合所有 Store
 */
class RootStore {
  userStore = userStore;

  constructor() {
    // 可以在这里添加更多的 Store
  }
}

// 创建 RootStore 实例
export const rootStore = new RootStore();

// 创建 React Context
export const StoreContext = React.createContext(rootStore);

// 自定义 Hook 用于在组件中使用 Store
export const useStores = () => {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error('useStores must be used within StoreProvider');
  }
  return context;
};

// 便捷的单个 Store Hook
export const useUserStore = () => {
  const { userStore } = useStores();
  return userStore;
};

export default rootStore;

