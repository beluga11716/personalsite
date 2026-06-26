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

### 图片切换：随机图 → 固定图
- 随机图 URL 在 Lens 双渲染下始终存在图片不一致问题（URL 去重→内容指纹去重均失败）
- 换用三张固定 webp 图片：`tu.raynard.lol/file/wallpaper/1781497514745.webp` 等
- 移除 `RandomImage` 组件，改回原生 `<img>` 标签，固定 URL 无一致性问题

### Cloudflare Workers 部署
- 创建 `src/worker.ts`：Workers 入口，处理静态资源 + SPA fallback
- 更新 `wrangler.toml`：`main = "src/worker.ts"` + `[assets] directory = "./dist"`
- 安装 `@cloudflare/workers-types`
- 更新 `.github/workflows/deploy.yml`：从 GitHub Pages 切换为 `npx wrangler@latest deploy`
- 修复 `_redirects` 无限循环 → 删除文件（SPA fallback 由 worker.ts 处理）
- 修复 `wrangler-action@v3` 旧版 wrangler 不兼容 → 直接用 `npx wrangler@latest`

### 手机适配
- 打字机：移除 `!whitespace-nowrap`，字号改为 `text-base sm:text-2xl md:text-4xl lg:text-5xl`
- 卡片：`w-96 shrink-0` → `w-full max-w-96`，手机端撑满宽度
- 间距：`py-20 gap-24` → `py-12 sm:py-20 gap-12 sm:gap-24`
- 社交链接：添加 `flex-wrap`，`gap-2 sm:gap-4 mt-8 sm:mt-12`

### 打字机布局抖动修复
- 移除 nowrap 后文字换行时高度变化，导致下方组件上下跳动
- 解决：打字机会置于固定高度容器（`min-h-16 sm:min-h-10 md:min-h-16 lg:min-h-20`）内，用 `absolute` + `top-1/2 -translate-y-1/2` 脱离文档流，换行不影响容器高度

### 手机字号调整
- 基础字号 `text-base`(16px) → `text-lg`(18px)，容器 `min-h-14` → `min-h-16`
- `sm:` 及以上断点不变
