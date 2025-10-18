import { User, Schedule, RankUser, Course, Live, Post } from '../types';

export const mockUser: User = {
  id: '1',
  name: '张同学',
  phone: '13800138000',
  school: '清华大学',
  major: '计算机科学与技术',
  grade: '大二',
  goal: '保研',
  points: 1580,
  avatar: '👨‍🎓'
};

export const mockSchedules: Schedule[] = [
  { id: '1', date: '2024-10-18', title: '完成高等数学作业', status: 'completed', description: '第五章习题', points: 10 },
  { id: '2', date: '2024-10-19', title: '参加英语四级模拟考试', status: 'pending', description: '提前准备答题卡', points: 20 },
  { id: '3', date: '2024-10-20', title: '观看Python编程课程', status: 'pending', description: '第10-12章', points: 15 },
  { id: '4', date: '2024-10-21', title: '整理专业课笔记', status: 'pending', description: '数据结构与算法', points: 10 },
  { id: '5', date: '2024-10-22', title: '参加学术讲座', status: 'pending', description: 'AI发展趋势', points: 25 },
];

export const mockRankings: RankUser[] = Array.from({ length: 20 }, (_, i) => ({
  rank: i + 1,
  name: `用户${i + 1}`,
  points: 2000 - i * 50,
  avatar: ['👨‍🎓', '👩‍🎓', '🧑‍💻', '👨‍💼', '👩‍💼'][i % 5]
}));

export const mockCourses: Course[] = Array.from({ length: 15 }, (_, i) => ({
  id: `course-${i + 1}`,
  title: `公益课程 ${i + 1}：大学生职业规划`,
  cover: '📚',
  tags: ['职业规划', '求职技巧'],
  goal: ['普通就业', '体制内就业'],
  major: ['计算机', '经济学', '管理学']
}));

export const mockLives: Live[] = Array.from({ length: 10 }, (_, i) => ({
  id: `live-${i + 1}`,
  title: `直播${i + 1}：保研经验分享`,
  cover: '🎥',
  viewers: 1000 + i * 100,
  tags: ['保研', '经验分享'],
  goal: ['保研'],
  major: ['计算机', '数学']
}));

export const mockPosts: Post[] = Array.from({ length: 20 }, (_, i) => ({
  id: `post-${i + 1}`,
  author: `用户${i + 1}`,
  avatar: ['👨‍🎓', '👩‍🎓', '🧑‍💻', '👨‍💼', '👩‍💼'][i % 5],
  content: `今天完成了数据结构作业，学习了二叉树的遍历算法，收获满满！#学习打卡 #算法学习`,
  images: i % 3 === 0 ? ['📷', '📷'] : undefined,
  publishTime: `${i + 1}小时前`,
  likes: 50 + i * 10,
  favorites: 20 + i * 5
}));

export const weeklyCheckInData = [
  { week: '第1周', count: 5 },
  { week: '第2周', count: 7 },
  { week: '第3周', count: 6 },
  { week: '第4周', count: 8 },
  { week: '第5周', count: 9 },
  { week: '第6周', count: 7 },
  { week: '第7周', count: 10 },
];

export const weeklyPointsData = [
  { week: '第1周', points: 50 },
  { week: '第2周', points: 70 },
  { week: '第3周', points: 60 },
  { week: '第4周', points: 80 },
  { week: '第5周', points: 90 },
  { week: '第6周', points: 70 },
  { week: '第7周', points: 100 },
];

