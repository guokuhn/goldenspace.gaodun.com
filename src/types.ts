export interface User {
  id: string;
  name: string;
  phone: string;
  school: string;
  major: string;
  grade: string;
  goal: '普通就业' | '体制内就业' | '保研' | '考研' | '留学';
  points: number;
  avatar?: string;
}

export interface Schedule {
  id: string;
  date: string;
  time?: string;
  title: string;
  status: 'pending' | 'completed';
  description: string;
  points: number;
  image?: string; // 日程配图
  link?: string; // 点击跳转链接
}

export interface RankUser {
  rank: number;
  name: string;
  points: number;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  cover: string;
  tags: string[];
  goal: string[];
  major: string[];
}

export interface Live {
  id: string;
  title: string;
  cover: string;
  viewers: number;
  tags: string[];
  goal: string[];
  major: string[];
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  images?: string[];
  video?: string;
  publishTime: string;
  likes: number;
  favorites: number;
}

