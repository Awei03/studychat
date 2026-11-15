# StudyChat · AI 学习助手

面向大学生的 AI 学习助手：把大模型对话包装成开箱即用的学习工具，预置代码讲解、翻译、润色、出题、答疑等学习场景模板，问完还能一键把对话导出成 Markdown 笔记。

本项目基于开源项目 [chatgpt-demo](https://github.com/anse-app/chatgpt-demo)（作者 Diu，MIT License）二次开发，保留了原项目的流式对话、Markdown / KaTeX / 代码高亮渲染等核心能力，并在此之上做了面向学习场景的改造。

## 功能

- **流式对话**：基于 OpenAI API 的流式输出，支持多轮上下文、消息重试与中断生成
- **学习场景预设模板（新增）**：代码讲解、英语翻译、作文润色、知识点出题、概念答疑，点一下即可带入提问模板，新建对话时展示
- **对话导出（新增）**：一键把当前对话导出为 Markdown 文件，方便整理成学习笔记
- **全中文界面（新增）**：品牌、按钮、提示文案全面中文化，更贴合国内学生使用习惯
- **助手角色设定**：可自定义系统提示词（助手角色），并调节随机性（Temperature）
- **渲染能力**：Markdown、KaTeX 数学公式、代码语法高亮、深色模式、移动端适配

## 技术栈

- [Astro](https://astro.new) + [SolidJS](https://www.solidjs.com) + TypeScript
- [UnoCSS](https://unocss.dev) 原子化样式
- OpenAI Chat Completions API（流式 SSE 转发）

## 快速开始

```bash
pnpm install
```

复制并配置环境变量（可写在 `.env` 中）：

| 变量 | 说明 |
| --- | --- |
| `OPENAI_API_KEY` | OpenAI API 密钥（必填） |
| `OPENAI_API_BASE_URL` | 自定义 API 地址（可选） |
| `SITE_PASSWORD` | 站点访问密码（可选，设置后需输入密码才能使用） |
| `PUBLIC_MAX_HISTORY_MESSAGES` | 携带的历史消息条数（可选，默认 9） |

```bash
pnpm dev      # 本地开发
pnpm build    # 构建生产版本
```

也可以用项目自带的 `Dockerfile` / `docker-compose.yml` 部署，或一键部署到 Vercel / Netlify。

## 二次开发说明

在原项目 [anse-app/chatgpt-demo](https://github.com/anse-app/chatgpt-demo) 基础上的主要改动：

1. 品牌与界面全面改造：更名为 StudyChat · AI 学习助手，页头、页脚、页面标题重新设计
2. 新增学习场景预设模板组件（`src/components/Generator.tsx` 中的 `studyPresets`），点击将提问模板带入输入框
3. 新增对话导出功能：将消息列表序列化为 Markdown 并触发浏览器下载
4. 界面文案全面中文化（含助手角色设置、随机性滑杆等）
5. 新增 `preset-chip` 样式快捷类（`unocss.config.ts`），统一预设按钮外观
6. 修复上游依赖兼容问题：原仓库锁定文件已与当前工具链不兼容，通过 `pnpm.overrides` 将 `solid-js` 升级到 1.8，恢复在现代 Node / pnpm 环境下的正常构建

## License

MIT License。原项目版权归原作者所有，详见 [LICENSE](./LICENSE)。
