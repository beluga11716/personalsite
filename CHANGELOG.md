# 开发日志 — raynardの个人页

## 2026-06-26

### 项目初始化
- 使用 Vite 8 + React 19 + TypeScript 6 脚手架创建项目
- 安装 Tailwind CSS v3 + PostCSS + autoprefixer
- 配置路径别名 `@/` → `src/`
- 安装 shadcn/ui 依赖：class-variance-authority, clsx, tailwind-merge, lucide-react
- 创建 `components.json` shadcn 配置
- 配置 GitHub Pages Actions 部署 (`deploy.yml`)
- 配置 Cloudflare Pages (`wrangler.toml`, `_headers`, `_redirects`)

### WebGL 迷雾背景
- 创建 `MistBackground` 组件，使用 WebGL GLSL 片段着色器
- 实现多层 FBM (分形布朗运动) 噪声
- 添加鼠标交互辉光
- 多轮调色：深色锌调 → 纯黑底 + 中性灰雾 → 青绿色调 → 调浅绿色
- 最终参数：黑底 `(0,0,0)`，青绿雾，柔和辉光

### 打字机效果
- 创建 `Typewriter` 组件 (framer-motion 驱动)
- 支持逐字输入、自动删除、多词循环
- 6 句繁体中文："你那麼焦慮..." 等
- 白色文字，`lg:text-5xl`，单行不换行
- 紫色 → 白色 多轮调整

### 主题切换器 (已移除)
- 创建 `AnimatedThemeToggler` 组件 (View Transitions API)
- 支持 7 种形状过场动画
- light/dark 双模式 CSS 变量
- 用户觉得效果不好，已完整移除

### Lens 放大镜卡片
- 创建 `Lens` 组件 (hover 交互放大镜)
- 创建 shadcn `Card` 和 `Button` 组件
- 三张卡片并排：my blog、Temporary email address、imgbed
- 卡片链接实装：raynard.lol / mail.raynard.lol / tu.raynard.lol
- 放大镜效果修复：`RandomImage` 组件解决随机图 URL 双渲染不一致问题

### 页面布局
- 初始：两页 scroll-snap 分页
- 最终：合并为单页滚动，打字机在上，卡片在下

### 社交链接
- GitHub: https://github.com/beluga11716
- Email: ggbeluga11716@gmail.com
- Telegram: https://t.me/+jjPi8QtiO2ZhMzE9 (后添加)

### 其他
- 网站标题改为 "raynardの个人页"
- 网站图标从 newastroblog 项目复制 favicon.ico
- GitHub/Email 链接更新为真实地址
- 多处字号、颜色微调
