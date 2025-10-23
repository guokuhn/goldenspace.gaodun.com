import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TaskListRequest, TaskResponse, TaskCreateRequest, TaskCompleteRequest, UserUpdateRequest, UserInfo } from '../types/api';

/**
 * API 响应接口
 */
export interface ApiResponse<T = any> {
  status: number;
  message: string;
  result: T;
}


// api 列表响应接口
export interface ApiListResponse<T = any> {
  status: number;
  message: string;
  result: {
    list: T[];
    pageNum: number;
    pageSize: number;
    size: number;
    totalPages: number;
    totalSize: number;
  };
}


/**
 * 登录请求参数
 */
export interface LoginRequest {
  nickName: string;
  userName: string;
}

/**
 * API 服务类
 * 封装 axios 实现统一的请求处理
 */
class ApiService {
  private instance: AxiosInstance;

  constructor() {
    // 创建 axios 实例
    this.instance = axios.create({
      baseURL: 'https://gtech19.gaodun.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 可以在这里添加 token 等认证信息
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        // 统一错误处理
        if (error.response) {
          const { status } = error.response;
          switch (status) {
            case 401:
              // 未授权，清除本地存储
              localStorage.removeItem('token');
              localStorage.removeItem('userInfo');
              break;
            case 403:
              console.error('没有权限访问该资源');
              break;
            case 404:
              console.error('请求的资源不存在');
              break;
            case 500:
              console.error('服务器错误');
              break;
            default:
              console.error('请求失败:', error.message);
          }
        } else if (error.request) {
          console.error('网络错误，请检查网络连接');
        } else {
          console.error('请求配置错误:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET 请求
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data as T;
  }

  /**
   * POST 请求
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data as T;
  }

  /**
   * PUT 请求
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data as T;
  }

  /**
   * DELETE 请求
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data as T;
  }

  /**
   * 用户登录
   */
  async login(params: LoginRequest): Promise<ApiResponse<UserInfo>> {
    try {
      const response = await this.post('/api/v1/user/login', params);
      return response;
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    }
  }

  /**
   * 获取任务列表
   */
  async getTaskList(params: TaskListRequest): Promise<ApiResponse<TaskResponse[]>> {
    try {
      const response = await this.post('/api/v1/task/list', params);
      return response;
    } catch (error) {
      console.error('获取任务列表失败:', error);
      throw error;
    }
  }

  /**
   * 创建任务
   */
  async createTask(params: TaskCreateRequest): Promise<ApiResponse> {
    try {
      const response = await this.post('/api/v1/task/create', params);
      return response;
    } catch (error) {
      console.error('创建任务失败:', error);
      throw error;
    }
  }

  /**
   * 完成任务
   */
  async completeTask(params: TaskCompleteRequest): Promise<ApiResponse> {
    try {
      const response = await this.post('/api/v1/task/complete', params);
      return response;
    } catch (error) {
      console.error('完成任务失败:', error);
      throw error;
    }
  }

  /**
   * 更新用户信息
   */
  async updateUser(params: UserUpdateRequest): Promise<ApiResponse> {
    try {
      const response = await this.post('/api/v1/user/update', params);
      return response;
    } catch (error) {
      console.error('更新用户信息失败:', error);
      throw error;
    }
  }
}

// 导出单例
export const apiService = new ApiService();
export default apiService;

