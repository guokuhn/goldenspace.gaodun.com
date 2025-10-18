# Golden Space - 大学生成长云空间

一个为在校大学生提供全周期日程规划服务的平台，通过个性化日程管理、积分激励、榜单排名、圈人助力、随机PK等功能，帮助大学生更好地规划和完成学业目标。

## 项目特色

### 核心功能

1. **每日报告** - AI助理Golden提供个性化每日数据播报和智能对话
2. **我的日程** - 支持周/月/学期/年度维度的日程管理，打卡获得积分
3. **榜单系统** - 多维度排名（总榜单、学校榜单、学习榜单、上岸之星等）
4. **活动中心** 
   - 圈人奖励：邀请好友获得积分
   - PK挑战赛：随机匹配对手进行积分对战
5. **成长加油包** - 公益课程、公益直播、实习求职工具
6. **日程广场** - 浏览其他用户的日程计划，相互学习
7. **社区** - 分享学习、求职经验，记录成长点滴

### 技术特性

- ⚡️ React 18 + TypeScript - 类型安全的现代化开发
- 🎨 Tailwind CSS - 响应式设计，支持PC端和移动端
- 📊 Recharts - 数据可视化图表
- 🎯 React Router - 单页应用路由管理
- 💫 Lucide React - 精美的图标库
- 🎭 青春活泼的UI设计 - 橙色、黄色、绿色主题配色

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm 或 yarn

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 开发模式

\`\`\`bash
npm run dev
\`\`\`

启动后自动在浏览器打开 http://localhost:3000

### 构建生产版本

\`\`\`bash
npm run build
\`\`\`

### 预览生产构建

\`\`\`bash
npm run preview
\`\`\`

## 项目结构

\`\`\`
golden space/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── Header.tsx      # 顶部导航栏
│   │   ├── LoginModal.tsx  # 登录模态框
│   │   ├── DailyReport.tsx # 每日报告
│   │   ├── MySchedule.tsx  # 我的日程
│   │   ├── Rankings.tsx    # 榜单
│   │   ├── Activities.tsx  # 活动
│   │   ├── GrowthPackage.tsx    # 成长加油包
│   │   ├── ScheduleSquare.tsx   # 日程广场
│   │   └── Community.tsx        # 社区
│   ├── pages/              # 页面组件
│   │   ├── HomePage.tsx           # 首页
│   │   ├── ScheduleDetailPage.tsx # 日程详情页
│   │   ├── RankingDetailPage.tsx  # 榜单详情页
│   │   ├── ReferralActivityPage.tsx # 圈人奖励页
│   │   ├── PKActivityPage.tsx     # PK挑战赛页
│   │   ├── CoursesPage.tsx        # 公益课程页
│   │   ├── LivesPage.tsx          # 公益直播页
│   │   ├── ScheduleSquarePage.tsx # 日程广场页
│   │   └── CommunityPage.tsx      # 社区页
│   ├── data/
│   │   └── mockData.ts     # 模拟数据
│   ├── types.ts            # TypeScript类型定义
│   ├── App.tsx             # 应用主组件
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
\`\`\`

## 功能说明

### 用户登录
- 支持手机号登录
- 输入用户名称
- 登录后可查看所有功能

### 日程管理
- 支持查看周/月/学期/年度日程
- 打卡完成日程获得积分
- 查看打卡趋势图和积分趋势图
- 通过对话式交互制定个性化日程计划

### 积分系统
- 完成日程打卡获得积分
- 邀请好友获得积分奖励
- PK挑战赛获胜获得积分
- 积分可用于排行榜竞争和PK消耗

### 榜单排名
- 总榜单：所有用户积分排名
- 学校榜单：同校用户积分排名
- 学习榜单：课程直播观看时长排名
- 目标榜单：按毕业目标分类的排名

### 社区互动
- 发布学习、求职动态
- 浏览其他用户内容
- 点赞、评论、收藏
- 热门标签分类

## 响应式设计

项目采用移动优先的响应式设计策略：

- **移动端**：320px - 768px
- **平板端**：768px - 1024px  
- **桌面端**：1024px+（优化 1366×768 和 1920×1080）

## 设计理念

### 配色方案
- **主色调**：橙色 (#f97316) - 活力与热情
- **辅助色**：黄色 (#eab308) - 温暖与希望
- **强调色**：绿色 (#22c55e) - 成长与进步

### UI风格
- 青春活泼的视觉风格
- 圆角卡片设计
- 渐变色背景
- 流畅的动画过渡
- 友好的交互反馈

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 开发计划

- [ ] 接入真实后端API
- [ ] 实现真实的LLM对话功能
- [ ] 添加更多数据可视化图表
- [ ] 优化移动端体验
- [ ] 添加消息通知系统
- [ ] 实现实时更新功能
- [ ] 添加PWA支持

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎联系项目团队。

