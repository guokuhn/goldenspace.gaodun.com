import { makeAutoObservable, runInAction } from "mobx";
import { apiService, LoginRequest } from "../services/api";
import { UserUpdateRequest, UserInfo } from "../types/api";



/**
 * 用户状态管理 Store
 * 使用 MobX 实现响应式状态管理和 localStorage 持久化
 */
class UserStore {
    // 用户信息
    userInfo: UserInfo | null = null;

    // 登录状态
    isLoggedIn: boolean = false;

    // 加载状态
    isLoading: boolean = false;

    // 错误信息
    error: string | null = null;

    // localStorage 的 key
    private readonly STORAGE_KEY = "goldenspace_user_info";

    constructor() {
        // 让 MobX 自动跟踪所有属性和方法
        makeAutoObservable(this, {}, { autoBind: true });

        // 初始化时从 localStorage 恢复状态
        this.initFromStorage();
    }

    /**
     * 从 localStorage 初始化用户信息
     */
    private initFromStorage() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const userInfo = JSON.parse(stored) as UserInfo;
                runInAction(() => {
                    this.userInfo = userInfo;
                    this.isLoggedIn = true;
                });
            }
        } catch (error) {
            console.error("恢复用户信息失败:", error);
            // 如果数据损坏，清除 localStorage
            this.clearStorage();
        }
    }

    /**
     * 保存用户信息到 localStorage
     */
    private saveToStorage(userInfo: UserInfo) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userInfo));
        } catch (error) {
            console.error("保存用户信息失败:", error);
        }
    }

    /**
     * 清除 localStorage
     */
    private clearStorage() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.error("清除用户信息失败:", error);
        }
    }

    /**
     * 用户登录
     * @param nickName 昵称
     * @param userName 用户名（手机号）
     * @returns 登录成功返回 UserInfo，失败返回 null
     */
    async login(nickName: string, userName: string): Promise<UserInfo | null> {
        // 重置错误状态
        runInAction(() => {
            this.isLoading = true;
            this.error = null;
        });

        try {
            const params: LoginRequest = {
                nickName,
                userName,
            };

            // 调用登录接口
            const response = await apiService.login(params);

            if (response.status === 200) {
                const userInfo: UserInfo = response.result;
                
                // 更新状态
                runInAction(() => {
                    this.userInfo = userInfo;
                    this.isLoggedIn = true;
                    this.isLoading = false;

                    // 持久化到 localStorage
                    this.saveToStorage(userInfo);
                });
                
                // 返回用户信息，让调用方可以直接使用
                return userInfo;
            } else {
                runInAction(() => {
                    this.isLoading = false;
                    this.error = response?.message || "登录失败，请重试";
                });
                return null;
            }
        } catch (error: any) {
            runInAction(() => {
                this.isLoading = false;
                this.error =
                    error?.response?.data?.message ||
                    error?.message ||
                    "登录失败，请重试";
            });

            return null;
        }
    }

    /**
     * 用户登出
     */
    logout() {
        runInAction(() => {
            this.userInfo = null;
            this.isLoggedIn = false;
            this.error = null;
        });

        // 清除 localStorage
        this.clearStorage();
    }

    /**
     * 清除错误信息
     */
    clearError() {
        runInAction(() => {
            this.error = null;
        });
    }

    /**
     * 更新用户信息
     */
    updateUserInfo(userInfo: Partial<UserInfo>) {
        if (this.userInfo) {
            runInAction(() => {
                this.userInfo = { ...this.userInfo!, ...userInfo };
                // 同步更新到 localStorage
                this.saveToStorage(this.userInfo);
            });
        }
    }

    /**
     * 获取用户 ID
     */
    get userId(): string | null {
        return this.userInfo?.userId || null;
    }

    /**
     * 获取用户昵称
     */
    get nickName(): string | null {
        return this.userInfo?.nickName || null;
    }

    /**
     * 获取用户名（手机号）
     */
    get userName(): string | null {
        return this.userInfo?.userName || null;
    }

    /**
     * 获取用户积分
     */
    get points(): number {
        return this.userInfo?.points || 0;
    }

    /**
     * 更新用户积分
     * @param points 新的积分值或积分增量
     * @param isIncrement 是否为增量模式（默认 true）
     */
    updatePoints(points: number, isIncrement: boolean = true): void {
        runInAction(() => {
            if (this.userInfo) {
                const newPoints = isIncrement 
                    ? (this.userInfo.points || 0) + points
                    : points;
                
                this.userInfo = {
                    ...this.userInfo,
                    points: Math.max(0, newPoints) // 确保积分不为负数
                };
                
                // 持久化到 localStorage
                this.saveToStorage(this.userInfo);
            }
        });
    }

    /**
     * 更新用户个人资料（调用后端接口）
     * @param data 用户资料数据
     */
    async updateUserProfile(data: {
        grade: string;
        major: string;
        school: string;
        target: string;
    }): Promise<boolean> {
        if (!this.userInfo?.userId) {
            runInAction(() => {
                this.error = "用户未登录";
            });
            return false;
        }

        runInAction(() => {
            this.isLoading = true;
            this.error = null;
        });

        try {
            const params: UserUpdateRequest = {
                userId: this.userInfo.userId,
                grade: data.grade,
                major: data.major,
                school: data.school,
                target: data.target,
            };

            // 调用更新接口
            const response = await apiService.updateUser(params);

            if (response.status === 200) {
                // 更新本地用户信息
                runInAction(() => {
                    if (this.userInfo) {
                        this.userInfo = {
                            ...this.userInfo,
                            grade: data.grade,
                            major: data.major,
                            school: data.school,
                            target: data.target,
                        };
                        this.isLoading = false;

                        // 持久化到 localStorage
                        this.saveToStorage(this.userInfo);
                    }
                });
                return true;
            } else {
                runInAction(() => {
                    this.isLoading = false;
                    this.error = response?.message || "更新用户信息失败，请重试";
                });
                return false;
            }
        } catch (error: any) {
            runInAction(() => {
                this.isLoading = false;
                this.error =
                    error?.response?.data?.message ||
                    error?.message ||
                    "更新用户信息失败，请重试";
            });
            return false;
        }
    }
}

// 导出单例
export const userStore = new UserStore();
export default UserStore;
