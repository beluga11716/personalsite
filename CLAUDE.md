# CLAUDE.md — raynardの个人页

V:\personalsite — 基于 Vite + React + TypeScript 的个人站点，部署于 Cloudflare Pages / GitHub Pages。

## 技术栈

- **框架**: React 19 + TypeScript 6
- **构建**: Vite 8
- **样式**: Tailwind CSS v3 + shadcn/ui 结构
- **动画**: framer-motion 12
- **图标**: lucide-react
- **背景**: WebGL GLSL 片段着色器 (FBM 噪声迷雾)
- **部署**: Cloudflare Workers + GitHub Actions 自动部署

## 项目结构

```
src/
├── main.tsx                          # 入口
├── App.tsx                           # 主页面：打字机 + 社交链接 + 三张 Lens 卡片
├── worker.ts                         # Cloudflare Workers 入口 (静态资源 + SPA fallback)
├── index.css                         # Tailwind 指令 + 基础样式 (纯黑背景 #000)
├── lib/utils.ts                      # cn() 工具
├── components/
│   ├── ui/
│   │   ├── mist-background.tsx       # WebGL 迷雾背景 (青绿色调, 纯黑底)
│   │   ├── typewriter.tsx            # 打字机效果 (framer-motion)
│   │   ├── lens.tsx                  # 放大镜组件 (hover 交互)
│   │   ├── button.tsx                # shadcn Button
│   │   └── card.tsx                  # shadcn Card
│   └── random-image.tsx              # (未使用) 随机图预加载器，已被固定图替代
```

## 页面布局

单页滚动：
1. **顶部** — 打字机循环 6 句繁体中文 ("你那麼焦慮...")，白色，响应式字号 `text-lg sm:text-2xl md:text-4xl lg:text-5xl`，允许换行。打字机绝对定位于固定高度容器内，防止换行时布局抖动。
2. **社交链接** — GitHub / Email / Telegram，圆角按钮，手机端允许换行
3. **三张 Lens 卡片** — my blog / Temporary email address / imgbed，每张带交互放大镜 (`zoomFactor=2, lensSize=220`)，手机端自适应宽度 (`w-full max-w-96`)

### 响应式间距
- 页面：`py-12 sm:py-20 gap-12 sm:gap-24`
- 链接：`gap-2 sm:gap-4 mt-8 sm:mt-12`
- 打字机容器：`min-h-16 sm:min-h-10 md:min-h-16 lg:min-h-20`

## 卡片链接

| 卡片 | URL | 图片 |
|------|-----|------|
| my blog | https://raynard.lol | `tu.raynard.lol/file/wallpaper/1781497514745.webp` |
| Temporary email address | https://mail.raynard.lol/ | `tu.raynard.lol/file/wallpaper/1781012326607.webp` |
| imgbed | https://tu.raynard.lol/ | `tu.raynard.lol/file/wallpaper/1782213451787.webp` |

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

- **Cloudflare Workers**: push main → GitHub Actions 自动执行 `npm run build && npx wrangler deploy`。Worker 入口 `src/worker.ts`，静态资源由 `[assets]` binding 自动分发，SPA fallback 由 Worker 处理。
- **本地**: `npm run dev` / `npm run build && npm run preview`

### 部署配置要点
- `wrangler.toml`：`main = "src/worker.ts"` + `[assets] directory = "./dist"`
- `.github/workflows/deploy.yml`：使用 `npx wrangler@latest deploy`（非 `wrangler-action@v3`，后者的旧版 wrangler 不支持 `[assets]`）
- GitHub 需配置 Secret `CLOUDFLARE_API_TOKEN`
- 不要使用 `_redirects` 文件（Workers 的 `[assets]` 会解析并可能触发无限循环），SPA fallback 在 `worker.ts` 中处理

## 关键问题与解决

1. **Lens 双渲染图片不一致**: 随机图 URL 每次请求返回不同图片，Lens 渲染 children 两次导致两张图不同。解决：`RandomImage` 组件用 `new Image()` 预加载解析重定向后的真实 URL，缓存后供 Lens 两次渲染共用。后续发现 URL 去重和内容指纹去重均无法彻底解决（服务器不重定向，不同 URL 返回相同图片内容），最终换用三张固定 webp 图片。

2. **TypeScript 6 baseUrl 废弃**: 添加 `"ignoreDeprecations": "6.0"` 到 tsconfig。

3. **lucide-react 无 Github 图标**: 使用内联 SVG 替代。

4. **白色背景改黑色**: 仅改 CSS 不够，需修改 GLSL 着色器内 `baseColor` 为纯黑，并调低雾气亮度。

5. **手机端打字机文字溢出**: `!whitespace-nowrap` 强制长句不换行，在窄屏上溢出。解决：移除 nowrap，降低基础字号，允许文字自然换行。

6. **打字机换行导致布局抖动**: 文字从一行换到两行时容器高度变化，下方组件上下跳动。解决：打字机用 `absolute` 脱离文档流，外层容器用 `min-h-*` 固定高度，换行不影响布局。

7. **Cloudflare Workers 部署报错**: `_redirects` 中 `/* → /index.html` 造成无限循环 → 删除文件。`wrangler-action@v3` 安装旧版 wrangler 不支持 `[assets]` → 改用 `npx wrangler@latest deploy`。
