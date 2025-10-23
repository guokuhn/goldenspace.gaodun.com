import { Schedule } from '../types';

interface UserProfile {
  grade: string;
  goal: string;
  interests: string[];
  studyHoursPerDay: number;
}

/**
 * 获取本周的开始日期（周一）和结束日期（周日）
 * @param date 可选，指定日期，默认为当前日期
 * @returns { startDate: Date, endDate: Date, startDateStr: string, endDateStr: string }
 */
export const getWeekRange = (date: Date = new Date()) => {
  const current = new Date(date);
  
  // 获取当前是星期几（0=周日, 1=周一, ..., 6=周六）
  const dayOfWeek = current.getDay();
  
  // 计算到周一的偏移量
  // 如果是周日(0)，则偏移量为-6；否则为1-dayOfWeek
  const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  
  // 计算周一日期
  const monday = new Date(current);
  monday.setDate(current.getDate() + offsetToMonday);
  monday.setHours(0, 0, 0, 0);
  
  // 计算周日日期（周一 + 6天）
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  
  // 格式化日期为 YYYY-MM-DD（本地时间）
  const formatLocalDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return {
    startDate: monday,
    endDate: sunday,
    startDateStr: monday.toISOString(),
    endDateStr: sunday.toISOString(),
    // 使用本地时间格式化
    startDateFormatted: formatLocalDate(monday),
    endDateFormatted: formatLocalDate(sunday),
  };
};

// 根据用户目标生成推荐的学习内容
const getRecommendedTasks = (goal: string, interests: string[]): string[] => {
  const tasksByGoal: Record<string, string[]> = {
    '普通就业': [
      '完成简历制作和优化',
      '学习职场技能课程',
      '准备面试常见问题',
      '参与项目实战练习',
      '了解目标公司文化'
    ],
    '体制内就业': [
      '行测题目练习（数量关系）',
      '申论写作训练',
      '时事政治学习',
      '面试模拟练习',
      '公文写作练习'
    ],
    '保研': [
      '专业课复习和整理笔记',
      '科研论文阅读',
      '参与科研项目',
      '准备学术竞赛',
      '联系目标院校导师'
    ],
    '考研': [
      '英语单词背诵（100个）',
      '数学习题练习',
      '专业课知识点复习',
      '政治知识点学习',
      '真题模拟练习'
    ],
    '留学': [
      '托福/雅思备考',
      'GRE/GMAT练习',
      '文书材料准备',
      '背景提升活动',
      '了解目标院校信息'
    ],
    '创业': [
      '市场调研和分析',
      '商业计划书撰写',
      '学习创业课程',
      '参加创业活动',
      '寻找合作伙伴'
    ]
  };

  const interestTasks: Record<string, string> = {
    '编程开发': '完成编程练习题',
    '数据分析': '学习数据分析工具',
    '人工智能': '学习AI算法基础',
    '算法竞赛': '刷算法题',
    '英语学习': '英语阅读和听力练习',
    '考证考级': '备考相关证书',
    '论文写作': '学术论文写作练习',
    '科研项目': '参与科研项目工作',
    '公务员考试': '行测申论练习',
    '留学申请': '准备留学材料',
    '职业规划': '职业发展规划',
    '创业实践': '创业项目实践'
  };

  const tasks = [...(tasksByGoal[goal] || [])];
  
  // 根据兴趣添加额外任务
  interests.forEach(interest => {
    if (interestTasks[interest]) {
      tasks.push(interestTasks[interest]);
    }
  });

  return tasks;
};

// 生成个性化日程计划
export const generatePersonalizedSchedule = (profile: UserProfile): Schedule[] => {
  const tasks = getRecommendedTasks(profile.goal, profile.interests);
  const schedules: Schedule[] = [];
  
  const today = new Date();
  const tasksPerDay = Math.min(Math.ceil(profile.studyHoursPerDay / 1.5), 3); // 每1.5小时一个任务，最多3个
  
  // 生成未来7天的日程
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(date.getDate() + day);
    const formattedDate = date.toISOString().split('T')[0];
    
    // 为每天分配任务
    for (let taskIndex = 0; taskIndex < tasksPerDay && tasks.length > 0; taskIndex++) {
      const randomTaskIndex = Math.floor(Math.random() * tasks.length);
      const task = tasks[randomTaskIndex];
      
      schedules.push({
        id: `schedule-${day}-${taskIndex}`,
        date: formattedDate,
        title: task,
        status: day === 0 && taskIndex === 0 ? 'completed' : 'pending',
        description: `根据你的${profile.goal}目标定制`,
        points: 10 + Math.floor(Math.random() * 15)
      });
    }
  }
  
  return schedules;
};

// 获取推荐课程
export const getRecommendedCourses = (goal: string): string[] => {
  const coursesByGoal: Record<string, string[]> = {
    '普通就业': ['大学生职业规划', '求职面试技巧', '简历制作实战'],
    '体制内就业': ['公务员考试攻略', '行测高分技巧', '申论写作指导'],
    '保研': ['保研经验分享', '科研入门指导', '学术竞赛准备'],
    '考研': ['考研全程规划', '考研英语突破', '考研数学技巧'],
    '留学': ['留学申请指南', '托福雅思备考', '文书写作技巧'],
    '创业': ['大学生创业指南', '商业计划书撰写', '创业实战经验']
  };
  
  return coursesByGoal[goal] || [];
};

// 获取推荐直播
export const getRecommendedLives = (interests: string[]): string[] => {
  const livesByInterest: Record<string, string> = {
    '编程开发': '互联网大厂技术面试分享',
    '数据分析': 'Python数据分析实战',
    '人工智能': 'AI技术发展趋势讲座',
    '考研': '考研经验分享直播',
    '保研': '保研面试技巧',
    '公务员考试': '公务员考试备考策略',
    '留学申请': '海外名校申请经验'
  };
  
  return interests
    .map(interest => livesByInterest[interest])
    .filter(live => live !== undefined);
};

