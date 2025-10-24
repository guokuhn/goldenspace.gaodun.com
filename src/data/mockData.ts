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

// 获取当前日期的辅助函数
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const getDateOffset = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const mockSchedules: Schedule[] = [
  {
    id: '1',
    date: getDateOffset(-4), // 4天前
    time: '09:00',
    title: '完成高等数学作业',
    status: 'completed',
    description: '第五章习题',
    points: 10
  },
  {
    id: '2',
    date: getDateOffset(-3), // 3天前（延迟未完成，需要拉新）
    time: '14:00',
    title: '参加英语四级模拟考试',
    status: 'pending',
    description: '提前准备答题卡',
    points: 20,
    image: '/images/golden-space-cover-1.png',
    link: '/courses'
  },
  {
    id: '3',
    date: getDateOffset(-2), // 2天前（延迟未完成，需要拉新）
    time: '19:00',
    title: '观看Python编程课程',
    status: 'pending',
    description: '第10-12章',
    points: 15,
    image: '/images/golden-space-cover-2.png',
    link: '/courses'
  },
  {
    id: '4',
    date: getDateOffset(-1), // 昨天（延迟未完成，需要拉新）
    time: '10:00',
    title: '整理专业课笔记',
    status: 'pending',
    description: '数据结构与算法',
    points: 10,
    image: '/images/golden-space-cover-3.png'
  },
  {
    id: '6',
    date: '2024-10-21', // 固定日期21号（用于测试延迟标记）
    time: '16:00',
    title: '完成数据库实验报告',
    status: 'pending',
    description: 'SQL查询优化实验',
    points: 15,
    image: '/images/golden-space-cover-5.png',
    link: '/courses'
  },
  {
    id: '7',
    date: getTodayDate(), // 今天（可直接完成）
    time: '14:00',
    title: '复习计算机网络课程',
    status: 'pending',
    description: '第三章TCP/IP协议',
    points: 12,
    image: '/images/golden-space-cover-1.png'
  },
  {
    id: '5',
    date: getDateOffset(1), // 明天（不能提前完成）
    time: '15:30',
    title: '参加学术讲座',
    status: 'pending',
    description: 'AI发展趋势',
    points: 25,
    image: '/images/golden-space-cover-4.png',
    link: '/lives'
  },
];

// 统一用户名库 - 所有模块共享，确保不重复（120个）
export const allUserNames = [
  // 排行榜专用（1-20）
  '高数网课笔记阿慧', 'CET6听力技巧阿桐', '早八课提神小物阿强', '图书馆书籍推荐阿琳',
  '期末冲刺刷题包小辉', '论文引用格式库阿莉', 'GPA计算小工具小涛', '考研复试模拟练阿倩',
  '英语晨读材料库小宇', '考证报名提醒阿萌', '自习室学习搭子阿哲', '小组作业灵感库阿雯',
  '考研数学公式本小航', 'CET6翻译素材阿蕊', '早八课笔记补完小博', '图书馆闭馆路线阿彤',
  '期末复习错题本小阳', '论文致谢模板阿沁', 'GPA目标进度条小轩', '背单词打卡日历阿玲',

  // 排行榜详情页扩展（21-30）
  '专业课重点整理小明', '英语口语练习阿婷', '考研政治速记小刚', '数据分析笔记阿洁',
  '算法刷题记录小鹏', '雅思备考攻略阿敏', '托福高分经验小华', '保研经验分享阿悦',
  '竞赛获奖心得小龙', '项目实战总结阿晴',

  // 活动模块-圈人奖励（31-40）
  '考研英语作文课阿昊', '考证模拟考试卷阿珊', '自习室灯光调整小峰', '小组作业分工表阿静',
  '考研政治知识点阿萱', '高数解题思路库阿妮', '英语阅读提分术小凯', '考证真题解析师阿雅',
  '自习室零食分享小斌', '论文写作指南阿薇',

  // 活动模块-PK挑战（41-50）
  '编程竞赛冲刺阿杰', '数学建模笔记小文', '英语演讲训练阿芳', '算法竞赛进阶小松',
  '考研专业课笔记小涵', '英语写作提分术阿欣', '考证刷题百题斩小瑞', '期末复习划重点阿舒',
  '笔记配色小天才小颖', '图书馆闭馆选手阿霖',

  // PK活动详情页扩展（51-70）
  '早八咖啡配学习小思', '背单词到凌晨阿萍', '高数网课追更中小军', '考研复试准备中阿慧',
  '四级备考攻略小宏', '六级听力技巧阿娟', '专四专八经验小飞', '托业考试指南阿兰',
  '雅思写作模板小威', '托福口语练习阿婵', '保研夏令营攻略小东', '推免面试技巧阿琪',
  '考研调剂经验小亮', '复试英语准备阿璐', '科研论文写作小超', '学术会议分享阿娜',
  '竞赛准备心得小豪', '项目答辩技巧阿梅', '创新创业经验小勇', '实习求职攻略阿丽',

  // 推荐活动详情页扩展（71-90）
  '校园兼职分享小涛', '社团活动组织阿君', '志愿服务经历小芬', '社会实践总结阿英',
  '学生会工作心得小杰', '班级管理经验阿红', '宿舍学习氛围小磊', '图书馆占座技巧阿萍',
  '自习室推荐榜单小林', '考试周备考攻略阿芝', '选课策略分享小浩', '课程评价汇总阿秋',
  '教授推荐信攻略小晨', '奖学金申请心得阿雪', '助学金经验分享小康', '勤工俭学建议阿夏',
  '时间管理方法小翔', '学习效率提升阿云', '笔记方法总结小波', '思维导图应用阿丹',

  // 日程广场（91-110）
  '番茄工作法实践小韬', '早起打卡挑战阿月', '运动健身计划小峻', '健康饮食分享阿蓉',
  '心理调节方法小斌', '压力管理技巧阿欢', '睡眠质量改善小帆', '自我激励方法阿媛',
  '目标设定经验小俊', '习惯养成记录阿灵', '读书笔记分享小锋', '电影观后感汇总阿彬',
  '音乐推荐清单小洋', '旅行游记分享阿莎', '美食探店记录小宸', '摄影技巧学习阿珍',
  '绘画练习日记小昕', '书法临摹心得阿倩', '手工制作教程小澄', '编程项目实战阿筠',

  // 社区模块（111-120）
  '软件开发经验小泽', '前端框架学习阿瑶', '后端技术探索小齐', '数据库优化技巧阿茜',
  '网络安全知识小恒', '人工智能入门阿岚', '机器学习实践小晖', '深度学习笔记阿珺',
  '区块链技术研究小烨', '云计算应用分享阿璇'
];

// 各模块使用的用户名索引范围
export const rankingUserNames = allUserNames.slice(0, 30);  // 首页排行榜 + 详情页（1-30）
export const activityReferralUserNames = allUserNames.slice(30, 40);  // 圈人奖励（31-40）
export const activityPKUserNames = allUserNames.slice(40, 50);  // PK挑战（41-50）
export const pkDetailUserNames = allUserNames.slice(50, 70);  // PK详情页（51-70）
export const referralDetailUserNames = allUserNames.slice(70, 90);  // 推荐详情页（71-90）
export const scheduleUserNames = allUserNames.slice(90, 110);  // 日程广场（91-110）
export const communityUserNames = allUserNames;  // 社区模块使用全部用户名（1-120）

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

// 排行榜数据（用于首页排行榜和排行榜详情页）
export const mockRankings: RankUser[] = Array.from({ length: 30 }, (_, i) => ({
  rank: i + 1,
  name: rankingUserNames[i],
  points: 2000 - i * 50,
  avatar: userAvatars[i % userAvatars.length]
}));

// 圈人奖励排行榜（用于首页活动模块和推荐详情页）
export const mockReferralRankings: RankUser[] = Array.from({ length: 30 }, (_, i) => ({
  rank: i + 1,
  name: i < 10 ? activityReferralUserNames[i] : referralDetailUserNames[i - 10],
  points: 1800 - i * 45,
  avatar: userAvatars[(i + 30) % userAvatars.length]
}));

// PK挑战排行榜（用于首页活动模块和PK详情页）
export const mockPKRankings: RankUser[] = Array.from({ length: 30 }, (_, i) => ({
  rank: i + 1,
  name: i < 10 ? activityPKUserNames[i] : pkDetailUserNames[i - 10],
  points: 1700 - i * 40,
  avatar: userAvatars[(i + 60) % userAvatars.length]
}));

// 公益课程封面图库 - 5张金色云空间主题图片
export const courseCoverImages = [
  '/images/course/course1.png', // 蓝色背景，金色云空间主题
  '/images/course/course2.png', // 红色背景，金色云空间主题
  '/images/course/course3.png', // 绿色到橙色渐变背景，金色云空间主题
  '/images/course/course4.png', // 黄色到紫色渐变背景，金色云空间主题
  '/images/course/course5.png',  // 蓝色到粉色渐变背景，金色云空间主题
  '/images/course/course6.png', // 蓝色到粉色渐变背景，金色云空间主题
  '/images/course/course7.png', // 蓝色到粉色渐变背景，金色云空间主题
  '/images/course/course8.png', // 蓝色到粉色渐变背景，金色云空间主题
  '/images/course/course9.png', // 蓝色到粉色渐变背景，金色云空间主题
  '/images/course/course10.png', // 蓝色到粉色渐变背景，金色云空间主题
];

// 直播封面
export const liveCoverImages = [
  '/images/live/live1.png', // 蓝色背景，金色云空间主题
  '/images/live/live2.png', // 红色背景，金色云空间主题
  '/images/live/live3.png', // 绿色到橙色渐变背景，金色云空间主题
  '/images/live/live4.png', // 黄色到紫色渐变背景，金色云空间主题
  '/images/live/live5.png'  // 蓝色到粉色渐变背景，金色云空间主题
];

// 随机选择封面图片的辅助函数
const getRandomCover = () => courseCoverImages[Math.floor(Math.random() * courseCoverImages.length)];
const getRandomLiveCover = () => liveCoverImages[Math.floor(Math.random() * liveCoverImages.length)];


export const mockCourses: Course[] = [
  { id: 'course-1', title: '大学四年职业规划全攻略：从新生到职场精英', cover: getRandomCover(), tags: ['职业规划', '职场入门'], goal: ['普通就业'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-2', title: '保研全流程攻略：成绩提升、竞赛选择与科研准备', cover: getRandomCover(), tags: ['保研', '经验分享'], goal: ['保研'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-3', title: '公务员考试通关手册：行测+申论高效备考', cover: getRandomCover(), tags: ['考公', '备考策略'], goal: ['体制内就业'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-4', title: '考研备战全年规划：公共课+专业课复习方法', cover: getRandomCover(), tags: ['考研', '复习规划'], goal: ['考研'], major: ['计算机', '数学'] },
  { id: 'course-5', title: '留学申请全攻略：选校定位、文书写作与面试准备', cover: getRandomCover(), tags: ['留学', '申请技巧'], goal: ['留学'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-6', title: '大学生创业指南：从创意到落地的实战经验', cover: getRandomCover(), tags: ['职业规划', '目标设定'], goal: ['普通就业', '体制内就业'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-7', title: '公务员考试通关手册：行测+申论高效备考', cover: getRandomCover(), tags: ['考公', '备考策略'], goal: ['体制内就业'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-8', title: '国考省考全解析：政策解读与报考策略', cover: getRandomCover(), tags: ['考研', '公共课'], goal: ['考研'], major: ['计算机', '数学'] },
  { id: 'course-9', title: '选调生备考指南：特殊报考条件与复习重点', cover: getRandomCover(), tags: ['留学', '申请技巧'], goal: ['留学'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-10', title: '考研备战全年规划：公共课+专业课复习方法', cover: getRandomCover(), tags: ['保研', '经验分享'], goal: ['保研'], major: ['计算机', '数学'] },
  { id: 'course-11', title: '考研英语高分突破：词汇、阅读与写作技巧', cover: getRandomCover(), tags: ['考研', '复试'], goal: ['考研'], major: ['计算机', '数学'] },
  { id: 'course-12', title: '专业课复习攻略：如何高效掌握核心知识点', cover: getRandomCover(), tags: ['科研', '项目管理'], goal: ['保研', '考研'], major: ['计算机', '数学'] },
  { id: 'course-13', title: '保研全流程攻略：成绩提升、竞赛选择与科研准备', cover: getRandomCover(), tags: ['留学', '规划'], goal: ['留学'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-14', title: '从普通本科到985/211：成功保研经验分享', cover: getRandomCover(), tags: ['考公', '选调生'], goal: ['体制内就业'], major: ['计算机', '经济学', '管理学'] },
  { id: 'course-15', title: '留学申请全攻略：选校定位、文书写作与面试准备', cover: getRandomCover(), tags: ['学术', '论文写作'], goal: ['保研', '考研'], major: ['计算机', '数学'] }
];

// 公益直播也使用随机封面图片
export const mockLives: Live[] = [
  { id: 'live-1', title: '清华大学学长分享：从双非到985保研成功之路', cover: getRandomLiveCover(), viewers: 1200, tags: ['保研', '经验分享'], goal: ['保研'], major: ['计算机', '数学'] },
  { id: 'live-2', title: '考研数学满分经验：如何高效备考数学科目', cover: getRandomLiveCover(), viewers: 1500, tags: ['考研', '数学'], goal: ['考研'], major: ['计算机', '数学'] },
  { id: 'live-3', title: '公务员上岸经验：行测80+高分技巧分享', cover: getRandomLiveCover(), viewers: 1800, tags: ['考公', '行测'], goal: ['体制内就业'], major: ['计算机', '经济学'] },
  { id: 'live-4', title: '美国藤校留学申请：如何打造竞争力强的申请材料', cover: getRandomLiveCover(), viewers: 1300, tags: ['留学', '美国'], goal: ['留学'], major: ['计算机', '经济学'] },
  { id: 'live-5', title: '研究生复试全攻略：面试常见问题与应对策略', cover: getRandomLiveCover(), viewers: 1600, tags: ['考研', '复试'], goal: ['考研'], major: ['计算机', '数学'] },
  { id: 'live-6', title: '科研竞赛经验：如何从0到1开展科研项目', cover: getRandomLiveCover(), viewers: 1100, tags: ['科研', '竞赛'], goal: ['保研', '考研'], major: ['计算机', '数学'] },
  { id: 'live-7', title: '英国G5申请经验：雅思备考与文书写作技巧', cover: getRandomLiveCover(), viewers: 1400, tags: ['留学', '英国'], goal: ['留学'], major: ['计算机', '管理学'] },
  { id: 'live-8', title: '国考申论高分模板：如何写出让考官眼前一亮的文章', cover: getRandomLiveCover(), viewers: 1700, tags: ['考公', '申论'], goal: ['体制内就业'], major: ['计算机', '经济学'] },
  { id: 'live-9', title: '互联网大厂求职：技术面试通关技巧与项目准备', cover: getRandomLiveCover(), viewers: 1900, tags: ['求职', '互联网'], goal: ['普通就业'], major: ['计算机'] },
  { id: 'live-10', title: '留学签证申请指南：面签准备与常见问题解答', cover: getRandomLiveCover(), viewers: 1250, tags: ['留学', '签证'], goal: ['留学'], major: ['计算机', '经济学', '管理学'] }
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

export const mockPosts: Post[] = Array.from({ length: 50 }, (_, i) => {
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
    `刚刚完成了线性代数的期中考试，感觉答得还可以！复习的时候整理的笔记真的很有用~ #线性代数 #期中考试`,
    `今天听了一场关于人工智能的讲座，收获满满！未来AI真的很有前景~ #人工智能 #学术讲座`,
    `早起去操场跑步，然后在图书馆学习了一上午，感觉状态特别好！#早起学习 #自律`,
    `用Python写了个爬虫小程序，成功爬取了需要的数据，好有成就感！#Python爬虫 #编程实践`,
    `四级模拟考试考了580分，距离目标还差一点点，继续加油！#英语四级 #备考`,
    `今天整理了计算机网络的重点知识，准备明天的测验~ #计算机网络 #复习`,
    `参加了学校的创业讲座，听到了很多创业成功的学长学姐的经验分享~ #创业 #讲座`,
    `今天和导师讨论了毕业设计的选题，确定了研究方向！#毕业设计 #科研`,
    `刷LeetCode算法题第100天打卡！坚持就是胜利💪 #算法 #LeetCode`,
    `今天参加了英语角活动，和外教聊了很多，口语进步了不少~ #英语口语 #英语角`,
    `终于把操作系统课程的所有实验都做完了，累但是很充实！#操作系统 #实验`,
    `今天在图书馆偶遇了一位学霸，交流了学习方法，受益匪浅！#学习方法 #学霸`,
    `完成了数据库系统的课程设计，做了一个图书管理系统~ #数据库 #课程设计`,
    `今天复习了概率论，做了一套真题，错了好几道，继续努力！#概率论 #复习`,
    `参加了学校的志愿者活动，帮助社区老人学习使用智能手机~ #志愿者 #公益`,
    `今天学习了React的Hooks，感觉写起来比Class组件方便多了！#React #前端开发`,
    `晚上和室友一起复习，互相讲题真的很有效率！#学习 #室友`,
    `今天完成了机器学习课程的第一个项目，成功训练了一个分类模型~ #机器学习 #项目`,
    `参加了学校的职业规划讲座，对未来的就业方向有了更清晰的认识~ #职业规划 #就业`,
    `今天刷了10道算法题，感觉思路越来越清晰了！#算法训练 #坚持`,
    `完成了微积分的期末复习，整理了所有重点公式和定理~ #微积分 #期末复习`,
    `今天参加了校园马拉松，跑完全程！运动让人精神焕发💪 #马拉松 #运动`,
    `学习了Vue3的Composition API，写起来真的很优雅！#Vue #前端`,
    `今天去参加了学校的招聘会，投了几份简历，希望能有好消息~ #校园招聘 #求职`,
    `完成了离散数学的所有作业，这门课真的挺有意思的！#离散数学 #作业`,
    `今天和学长请教了保研的经验，收获了很多有用的信息！#保研 #经验分享`,
    `刚刚完成了托福模拟考试，阅读部分进步明显！#托福 #备考`,
    `今天学习了Docker容器技术，部署了第一个容器化应用~ #Docker #DevOps`,
    `参加了数学建模竞赛，熬了三天三夜，终于提交了论文！#数学建模 #竞赛`,
    `今天复习了编译原理，画了很多语法树和状态图~ #编译原理 #复习`,
    `完成了Web开发课程的期末项目，做了一个在线商城系统！#Web开发 #项目`,
    `今天学习了Kubernetes，感觉云原生技术真的很强大！#Kubernetes #云计算`,
    `参加了ACM程序设计竞赛的训练，做了很多动态规划的题~ #ACM #算法竞赛`,
    `今天整理了操作系统课程的所有笔记，准备期末考试！#操作系统 #笔记`,
    `学习了Spring Boot框架，写了第一个RESTful API~ #SpringBoot #后端开发`,
    `今天去实验室帮导师做实验，学到了很多科研方法！#科研 #实验室`,
    `完成了软件测试课程的自动化测试项目，学会了Selenium~ #软件测试 #自动化`,
    `今天参加了技术分享会，听学长讲解了微服务架构~ #技术分享 #微服务`,
    `刷了一天的力扣，终于把二叉树专题全部做完了！#力扣 #算法`,
    `今天学习了Git的高级用法，理解了rebase和merge的区别~ #Git #版本控制`,
  ];

  // 计算发布时间，让时间更真实
  let publishTime;
  if (i < 5) {
    publishTime = `${i + 1}小时前`;
  } else if (i < 15) {
    publishTime = `${Math.floor(i / 2)}小时前`;
  } else if (i < 30) {
    publishTime = `${i - 14}天前`;
  } else {
    publishTime = `${i - 28}天前`;
  }

  return {
    id: `post-${i + 1}`,
    author: communityUserNames[i % communityUserNames.length],
    avatar: userAvatars[i % userAvatars.length],
    content: contents[i % contents.length],
    images: i % 4 === 0 ? [`https://picsum.photos/id/${120 + i}/300/200`, `https://picsum.photos/id/${140 + i}/300/200`] : undefined,
    publishTime: publishTime,
    likes: 50 + i * 8,
    favorites: 20 + i * 3
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

