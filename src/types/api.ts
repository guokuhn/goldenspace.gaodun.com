/**
 * API 相关的类型定义
 * 集中管理所有 API 请求和响应的类型
 */

/**
 * 通用 API 响应格式
 */
export interface ApiResponse<T = any> {
  code?: number;
  message?: string;
  data?: T;
}

/**
 * 登录请求参数
 */
export interface LoginRequest {
  /** 用户昵称 */
  nickName: string;
  /** 用户名（手机号） */
  userName: string;
}

/**
 * 登录响应数据
 */
export interface LoginResponse {
  /** 用户ID */
  userId: string;
}

/**
 * 用户信息接口
 */
export interface UserInfo {
  userId: string;
  nickName: string;
  userName: string;
  grade?: string;
  major?: string;
  school?: string;
  target?: string;
}

/**
 * API 错误响应
 */
export interface ApiError {
  code?: number;
  message: string;
  details?: any;
}

/**
 * 任务列表请求参数
 */
export interface TaskListRequest {
  /** 开始时间 */
  startDay: string;
  /** 结束时间 */
  endDay?: string;
  /** 用户ID */
  userId?: string;
}

/**
 * 任务响应数据
 */
export interface TaskResponse {
  /** 创建时间 */
  createTime?: string;
  /** 完成时间 */
  finishTime?: string;
  /** 任务ID */
  id: number;
  /** 图片URL */
  imageUrl?: string;
  /** 任务编码 */
  taskCode?: string;
  /** 任务日期 */
  taskDate?: string;
  /** 任务描述 */
  taskDesc?: string;
  /** 任务名称 */
  taskName?: string;
  /** 任务积分 */
  taskPoints?: number;
  /** 任务来源 */
  taskSource?: number;
  /** 任务来源名称 */
  taskSourceName?: string;
  /** 任务状态 */
  taskStatus?: number; // 0: 未完成 1: 已完成
  /** 任务状态名称 */
  taskStatusName?: string;
  /** 任务类型 */
  taskType?: number;
  /** 任务类型名称 */
  taskTypeName?: string;
  /** 更新时间 */
  updateTime?: string;
}

/**
 * 创建任务请求参数
 */
export interface TaskCreateRequest {
  /** 任务描述 */
  taskDesc: string;
  /** 任务名称 */
  taskName: string;
  /** 任务日期 */
  taskDate: string;
  /** 用户ID */
  userId: string;
}

/**
 * 完成任务请求参数
 */
export interface TaskCompleteRequest {
  /** 任务ID */
  taskId: number;
  /** 用户ID */
  userId: string;
}

/**
 * 更新用户信息请求参数
 */
export interface UserUpdateRequest {
  /** 用户ID */
  userId: string;
  /** 年级 */
  grade: string;
  /** 专业 */
  major: string;
  /** 学校 */
  school: string;
  /** 目标 */
  target: string;
}

