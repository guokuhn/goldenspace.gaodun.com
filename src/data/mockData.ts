import { User, Schedule, RankUser, Course, Live, Post } from '../types';

export const mockUser: User = {
  id: '1',
  name: '学习小达人📚',
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

// 排行榜专用用户名（20个）
export const rankingUserNames = [
  '高数网课笔记阿慧',
  'CET6 听力技巧阿桐',
  '早八课提神小物阿强',
  '图书馆书籍推荐阿琳',
  '期末冲刺刷题包小辉',
  '论文引用格式库阿莉',
  'GPA 计算小工具小涛',
  '考研复试模拟练阿倩',
  '英语晨读材料库小宇',
  '考证报名提醒阿萌',
  '自习室学习搭子阿哲',
  '小组作业灵感库阿雯',
  '考研数学公式本小航',
  'CET6 翻译素材阿蕊',
  '早八课笔记补完小博',
  '图书馆闭馆路线阿彤',
  '期末复习错题本小阳',
  '论文致谢模板阿沁',
  'GPA 目标进度条阿哲',
  '背单词打卡日历阿玲'
];

// 日程广场专用用户名（20个）
export const scheduleUserNames = [
  '考研英语作文课阿昊',
  '考证模拟考试卷阿珊',
  '自习室灯光调整小峰',
  '小组作业分工表阿静',
  '考研政治知识点阿轩',
  '高数解题思路库阿妮',
  '英语阅读提分术小凯',
  '考证真题解析师阿雅',
  '自习室零食分享小斌',
  '小组作业分工表阿慧',
  '考研专业课笔记阿桐',
  '英语作文提分术阿强',
  '考证刷题百题斩阿琳',
  '期末复习划重点小辉',
  '笔记配色小天才阿莉',
  '图书馆闭馆选手小涛',
  '早八咖啡配学习阿倩',
  '背单词到凌晨小宇',
  '高数网课追更中阿萌',
  '考研复试准备中阿哲'
];

// 活动模块专用用户名（20个）
export const activityUserNames = [
  '小夏的雅思备考路',
  '考研英语作文课阿昊',
  '考证模拟考试卷阿珊',
  '自习室灯光调整小峰',
  '小组作业分工表阿静',
  '考研政治知识点阿轩',
  '高数解题思路库阿妮',
  '英语阅读提分术小凯',
  '考证真题解析师阿雅',
  '自习室零食分享小斌',
  '小组作业分工表阿慧',
  '考研专业课笔记阿桐',
  '英语作文提分术阿强',
  '考证刷题百题斩阿琳',
  '期末复习划重点小辉',
  '笔记配色小天才阿莉',
  '图书馆闭馆选手小涛',
  '早八咖啡配学习阿倩',
  '背单词到凌晨小宇',
  '高数网课追更中阿萌'
];

// 备用多样化风格用户名（保留）
export const realNames = [
  '小夏的雅思备考路',
  '高数网课笔记阿慧',
  'CET6 听力技巧阿桐',
  '早八课提神小物阿强',
  '图书馆书籍推荐阿琳',
  '期末冲刺刷题包小辉',
  '论文引用格式库阿莉',
  'GPA 计算小工具小涛',
  '考研复试模拟练阿倩',
  '英语晨读材料库小宇',
  '考证报名提醒阿萌',
  '自习室学习搭子阿哲',
  '小组作业灵感库阿雯',
  '考研数学公式本小航',
  'CET6 翻译素材阿蕊',
  '早八课笔记补完小博'
];

// 真实风格的用户头像图片URL
export const userAvatars = [
  'https://picsum.photos/id/64/200', 'https://picsum.photos/id/65/200', 'https://picsum.photos/id/66/200', 'https://picsum.photos/id/67/200', 'https://picsum.photos/id/68/200',
  'https://picsum.photos/id/69/200', 'https://picsum.photos/id/70/200', 'https://picsum.photos/id/71/200', 'https://picsum.photos/id/72/200', 'https://picsum.photos/id/73/200',
  'https://picsum.photos/id/74/200', 'https://picsum.photos/id/75/200', 'https://picsum.photos/id/76/200', 'https://picsum.photos/id/77/200', 'https://picsum.photos/id/78/200',
  'https://picsum.photos/id/79/200', 'https://picsum.photos/id/80/200', 'https://picsum.photos/id/81/200', 'https://picsum.photos/id/82/200', 'https://picsum.photos/id/83/200',
  'https://picsum.photos/id/84/200', 'https://picsum.photos/id/85/200', 'https://picsum.photos/id/86/200', 'https://picsum.photos/id/87/200', 'https://picsum.photos/id/88/200',
  'https://picsum.photos/id/89/200', 'https://picsum.photos/id/90/200', 'https://picsum.photos/id/91/200', 'https://picsum.photos/id/92/200', 'https://picsum.photos/id/93/200',
  'https://picsum.photos/id/94/200', 'https://picsum.photos/id/95/200', 'https://picsum.photos/id/96/200', 'https://picsum.photos/id/97/200', 'https://picsum.photos/id/98/200',
  'https://picsum.photos/id/99/200', 'https://picsum.photos/id/100/200', 'https://picsum.photos/id/101/200', 'https://picsum.photos/id/102/200', 'https://picsum.photos/id/103/200'
];

export const mockRankings: RankUser[] = Array.from({ length: 20 }, (_, i) => ({
  rank: i + 1,
  name: rankingUserNames[i],
  points: 2000 - i * 50,
  avatar: userAvatars[i % userAvatars.length]
}));

export const mockCourses: Course[] = [
  { id: 'course-1', title: '大学四年职业规划全攻略：从新生到职场精英', cover: 'https://picsum.photos/id/26/500/300', tags: ['职业规划', '职场入门'], goal: ['普通就业'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-2', title: '保研全流程攻略：成绩提升、竞赛选择与科研准备', cover: 'https://picsum.photos/id/48/500/300', tags: ['保研', '经验分享'], goal: ['保研'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-3', title: '公务员考试通关手册：行测+申论高效备考', cover: 'https://picsum.photos/id/180/500/300', tags: ['考公', '备考策略'], goal: ['体制内就业'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-4', title: '考研备战全年规划：公共课+专业课复习方法', cover: 'https://picsum.photos/id/20/500/300', tags: ['考研', '复习规划'], goal: ['考研'], major: ['计算机', '数学'] },
  { id: 'course-5', title: '留学申请全攻略：选校定位、文书写作与面试准备', cover: 'https://picsum.photos/id/24/500/300', tags: ['留学', '申请技巧'], goal: ['留学'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-6', title: '大学生创业指南：从创意到落地的实战经验', cover: 'https://picsum.photos/id/28/500/300', tags: ['职业规划', '目标设定'], goal: ['普通就业', '体制内就业'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-7', title: '公务员考试通关手册：行测+申论高效备考', cover: 'https://picsum.photos/id/33/500/300', tags: ['考公', '备考策略'], goal: ['体制内就业'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-8', title: '国考省考全解析：政策解读与报考策略', cover: 'https://picsum.photos/id/42/500/300', tags: ['考研', '公共课'], goal: ['考研'], major: ['计算机', '数学'] },
  { id: 'course-9', title: '选调生备考指南：特殊报考条件与复习重点', cover: 'https://picsum.photos/id/52/500/300', tags: ['留学', '申请技巧'], goal: ['留学'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-10', title: '考研备战全年规划：公共课+专业课复习方法', cover: 'https://picsum.photos/id/56/500/300', tags: ['保研', '经验分享'], goal: ['保研'], major: ['计算机', '数学'] },
  { id: 'course-11', title: '考研英语高分突破：词汇、阅读与写作技巧', cover: 'https://picsum.photos/id/60/500/300', tags: ['考研', '复试'], goal: ['考研'], major: ['计算机', '数学'] },
  { id: 'course-12', title: '专业课复习攻略：如何高效掌握核心知识点', cover: 'https://picsum.photos/id/62/500/300', tags: ['科研', '项目管理'], goal: ['保研', '考研'], major: ['计算机', '数学'] },
  { id: 'course-13', title: '保研全流程攻略：成绩提升、竞赛选择与科研准备', cover: 'https://picsum.photos/id/91/500/300', tags: ['留学', '规划'], goal: ['留学'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-14', title: '从普通本科到985/211：成功保研经验分享', cover: 'https://picsum.photos/id/201/500/300', tags: ['考公', '选调生'], goal: ['体制内就业'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-15', title: '留学申请全攻略：选校定位、文书写作与面试准备', cover: 'https://picsum.photos/id/202/500/300', tags: ['学术', '论文写作'], goal: ['保研', '考研'], major: ['计算机', '数学'] }
];

export const mockLives: Live[] = [
  { id: 'live-1', title: '清华大学学长分享：从双非到985保研成功之路', cover: 'https://picsum.photos/id/100/500/300', viewers: 1200, tags: ['保研', '经验分享'], goal: ['保研'], major: ['计算机', '数学'] },
  { id: 'live-2', title: '考研数学满分经验：如何高效备考数学科目', cover: 'https://picsum.photos/id/101/500/300', viewers: 1500, tags: ['考研', '数学'], goal: ['考研'], major: ['计算机', '数学'] },
  { id: 'live-3', title: '公务员上岸经验：行测80+高分技巧分享', cover: 'https://picsum.photos/id/102/500/300', viewers: 1800, tags: ['考公', '行测'], goal: ['体制内就业'], major: ['计算机', '经济学'] },
  { id: 'live-4', title: '美国藤校留学申请：如何打造竞争力强的申请材料', cover: 'https://picsum.photos/id/103/500/300', viewers: 1300, tags: ['留学', '美国'], goal: ['留学'], major: ['计算机', '经济学'] },
  { id: 'live-5', title: '研究生复试全攻略：面试常见问题与应对策略', cover: 'https://picsum.photos/id/104/500/300', viewers: 1600, tags: ['考研', '复试'], goal: ['考研'], major: ['计算机', '数学'] },
  { id: 'live-6', title: '科研竞赛经验：如何从0到1开展科研项目', cover: 'https://picsum.photos/id/106/500/300', viewers: 1100, tags: ['科研', '竞赛'], goal: ['保研', '考研'], major: ['计算机', '数学'] },
  { id: 'live-7', title: '英国G5申请经验：雅思备考与文书写作技巧', cover: 'https://picsum.photos/id/107/500/300', viewers: 1400, tags: ['留学', '英国'], goal: ['留学'], major: ['计算机', '管理学'] },
  { id: 'live-8', title: '国考申论高分模板：如何写出让考官眼前一亮的文章', cover: 'https://picsum.photos/id/108/500/300', viewers: 1700, tags: ['考公', '申论'], goal: ['体制内就业'], major: ['计算机', '经济学'] },
  { id: 'live-9', title: '互联网大厂求职：技术面试通关技巧与项目准备', cover: 'https://picsum.photos/id/109/500/300', viewers: 1900, tags: ['求职', '互联网'], goal: ['普通就业'], major: ['计算机'] },
  { id: 'live-10', title: '留学签证申请指南：面签准备与常见问题解答', cover: 'https://picsum.photos/id/111/500/300', viewers: 1250, tags: ['留学', '签证'], goal: ['留学'], major: ['计算机', '经济学', '管理学'] }
];

// 生成不同用户的日程数据
export const generateUserSchedules = (userId: string) => {
  const scheduleTitles = [
    '完成高等数学作业',
    '背诵英语单词30分钟',
    '复习专业课笔记',
    '参加编程培训课程',
    '阅读专业书籍',
    '准备考研英语词汇',
    '练习英语口语',
    '准备公务员考试行测',
    '撰写学术论文',
    '参加社团活动'
  ];
  
  const descriptions = [
    '第五章习题',
    'CET-4核心词汇',
    '数据结构与算法',
    'React框架入门',
    '《计算机网络》第三章',
    '考研核心词汇5000',
    '英语角练习会话',
    '数量关系模块',
    '毕业论文初稿',
    '学生会会议'
  ];
  
  // 根据userId生成不同的随机种子
  const seed = parseInt(userId.replace(/\D/g, '')) || 1;
  
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];
    
    // 使用种子确保不同用户的日程内容有所差异
    const titleIndex = (seed + i) % scheduleTitles.length;
    const descIndex = (seed + i + 2) % descriptions.length;
    
    return {
      id: `${userId}-schedule-${i + 1}`,
      date: formattedDate,
      title: scheduleTitles[titleIndex],
      status: i % 3 === 0 ? 'completed' : 'pending',
      description: descriptions[descIndex],
      points: 10 + Math.floor(Math.random() * 20)
    };
  });
};

// 社区模块专用用户名（20个）
export const communityUserNames = [
  '背单词打卡日历阿玲',
  '考研英语作文课阿昊',
  '考证模拟考试卷阿珊',
  '自习室灯光调整小峰',
  '小组作业分工表阿静',
  '考研政治知识点阿轩',
  '高数解题思路库阿妮',
  '英语阅读提分术小凯',
  '考证真题解析师阿雅',
  '自习室零食分享小斌',
  '小组作业分工表阿慧',
  '考研专业课笔记阿桐',
  '英语作文提分术阿强',
  '考证刷题百题斩阿琳',
  '期末复习划重点小辉',
  '笔记配色小天才阿莉',
  '图书馆闭馆选手小涛',
  '早八咖啡配学习阿倩',
  '背单词到凌晨小宇',
  '高数网课追更中阿萌'
];

export const mockPosts: Post[] = Array.from({ length: 20 }, (_, i) => {
  const contents = [
    `今天泡了一整天图书馆，完成了高等数学作业，虽然很难但超有成就感！#学习打卡 #高数不挂科`,
    `终于搞懂了C++的多态机制，写了个小项目练习一下，代码运行成功的那一刻太开心了！#编程学习 #C++`,
    `英语单词打卡第30天，坚持就是胜利✊已经记住500个新单词了！#英语学习 #背单词`,
    `今天参加了Python数据分析实战课，老师讲得超棒，回家自己又练习了一遍~ #Python #数据分析`,
    `复习了一下数据结构的排序算法，手写了一遍快排和归并排序的代码，感觉掌握得更扎实了！#算法学习 #计算机专业`,
    `准备英语六级考试中，听力和阅读每天都要练习，希望这次能一次性通过！#六级备考 #英语学习`,
    `今天去听了一场关于AI发展趋势的学术讲座，受益匪浅，对未来的研究方向有了新的思考！#学术讲座 #AI`,
    `整理了一下线性代数的笔记，用思维导图的方式总结了重点知识点，复习起来更方便了！#笔记整理 #线性代数`,
    `参加了校园编程竞赛的初赛，感觉发挥得还不错，希望能进入决赛！#编程竞赛 #大学生活`,
    `今天和小组同学一起讨论了软件工程的小组作业，确定了项目方向和分工，接下来要开始正式开发了！#小组作业 #软件工程`,
  ];
  return {
    id: `post-${i + 1}`,
    author: communityUserNames[i],
    avatar: userAvatars[(i + 10) % userAvatars.length],
    content: contents[i % contents.length],
    images: i % 3 === 0 ? [`https://picsum.photos/id/${120 + i}/300/200`, `https://picsum.photos/id/${140 + i}/300/200`] : undefined,
    publishTime: `${i + 1}小时前`,
    likes: 50 + i * 10,
    favorites: 20 + i * 5
  };
});

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

