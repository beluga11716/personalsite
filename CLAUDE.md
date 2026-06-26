# CLAUDE.md — raynardの个人页

V:\personalsite — 基于 Vite + React + TypeScript 的个人站点，部署于 Cloudflare Pages / GitHub Pages。

## 技术栈

- **框架**: React 19 + TypeScript 6
- **构建**: Vite 8
- **样式**: Tailwind CSS v3 + shadcn/ui 结构
- **动画**: framer-motion 12
- **图标**: lucide-react
- **背景**: WebGL GLSL 片段着色器 (FBM 噪声迷雾)

## 项目结构

```
src/
├── main.tsx                          # 入口
├── App.tsx                           # 主页面：打字机 + 社交链接 + 三张 Lens 卡片
├── index.css                         # Tailwind 指令 + 基础样式 (纯黑背景 #000)
├── lib/utils.ts                      # cn() 工具
├── components/
│   ├── ui/
│   │   ├── mist-background.tsx       # WebGL 迷雾背景 (青绿色调, 纯黑底)
│   │   ├── typewriter.tsx            # 打字机效果 (framer-motion)
│   │   ├── lens.tsx                  # 放大镜组件 (hover 交互)
│   │   ├── button.tsx                # shadcn Button
│   │   └── card.tsx                  # shadcn Card
│   └── random-image.tsx              # 随机图 URL 解析器 (解决 Lens 双渲染问题)
```

## 页面布局

单页滚动：
1. **顶部** — 打字机循环 6 句繁体中文 ("你那麼焦慮...")，白色，`lg:text-5xl`，单行不换行 (`!whitespace-nowrap`)
2. **社交链接** — GitHub / Email / Telegram，圆角按钮
3. **三张 Lens 卡片** — my blog / Temporary email address / imgbed，每张带交互放大镜 (`zoomFactor=2, lensSize=220`)

## 卡片链接

| 卡片 | URL |
|------|-----|
| my blog | https://raynard.lol |
| Temporary email address | https://mail.raynard.lol/ |
| imgbed | https://tu.raynard.lol/ |

## 社交链接

| 平台 | 地址 |
|------|------|
| GitHub | https://github.com/beluga11716 |
| Email | ggbeluga11716@gmail.com |
| Telegram | https://t.me/+jjPi8QtiO2ZhMzE9 |

## 背景着色器配置

- 底色: `vec3(0.0, 0.0, 0.0)` 纯黑
- 雾气暗层: `vec3(0.12, 0.16, 0.14)` 淡青绿
- 雾气亮层: `vec3(0.18, 0.22, 0.20)`
- 鼠标辉光: `vec3(0.45, 0.6, 0.55)` 柔和青绿
- 后处理: `pow(color, 1.08) * 1.25`

## 部署

- **Cloudflare Pages**: `npm run build` → `npx wrangler pages deploy dist`
- **GitHub Pages**: push main → Actions 自动部署 (`.github/workflows/deploy.yml`)
- **本地**: `npm run dev` / `npm run build && npm run preview`

## 关键问题与解决

1. **Lens 双渲染图片不一致**: 随机图 URL 每次请求返回不同图片，Lens 渲染 children 两次导致两张图不同。解决：`RandomImage` 组件用 `new Image()` 预加载解析重定向后的真实 URL，缓存后供 Lens 两次渲染共用。

2. **TypeScript 6 baseUrl 废弃**: 添加 `"ignoreDeprecations": "6.0"` 到 tsconfig。

3. **lucide-react 无 Github 图标**: 使用内联 SVG 替代。

4. **白色背景改黑色**: 仅改 CSS 不够，需修改 GLSL 着色器内 `baseColor` 为纯黑，并调低雾气亮度。
