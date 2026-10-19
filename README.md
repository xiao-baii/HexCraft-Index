# HexCraft

个人主页。

## 运行

```bash
npm install
npm run start
```

访问 `http://localhost:4321`。

## 构建

```bash
npm run build
```

## 决策笔记检查

使用项目现有 Node.js 环境，无需额外依赖：

```bash
npm run verify-notes
```

笔记位于 `.agents/notes/`，校验脚本复用自 `write-notes-like-deepseek` 技能，
以 JavaScript 形式保存，检查目录、格式与归档封印。首页采用静态 Astro 内容，GitHub 与备案地址维护在
`src/lib/config.ts`；首页内容和装饰文字位于 `src/components/Home.astro`。404 仅提供返回首页入口。
