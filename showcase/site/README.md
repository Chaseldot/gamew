# GameW 展示站

静态多页面展示站，入口为 `site/index.html`。需要通过 HTTP 服务访问，不建议直接打开 `file://`，因为站点使用 ES modules 加载数据。

## 内容管线

站点数据由 `../content/12-website-assets/web_export.json` 生成：

```bash
cd site
npm run build:data
npm run check:data
```

`data.js` 带有生成标记，不应手写编辑。后续人物、阵营、任务和变量可继续拆到上游 Markdown / YAML，再汇总生成 `web_export.json`。

## 页面

- `index.html`：门户首页。
- `world.html`：世界观、照影牒针和三章结构。
- `regions.html`：山水县境、黄沙古道、照影城的地区和地点索引。
- `factions.html`：八大阵营、代表人物、价值和阴影。
- `characters.html`：八名战斗队友、起源角色、关键 NPC 和无名煞。
- `stories.html`：关键剧情样段、小说 / 漫画 / 互动故事入口。
- `quests.html`：三章主线、重点支线和第三章队友终局。
- `branches.html`：分支变量、阵营声望、队友变量和 galgame 节点。
- `codex.html`：照影牒针、照影铃、牒录、武籍、断因房等图鉴。
- `systems.html`：八大流派、九级构筑、传承、四人小队和任务多解。
- `story-act1.html`：第一章《封境》故事样板。
- `art.html`：美术馆和资源筛选。

`companions.html` 保留为旧入口兼容页，当前渲染同人物页。

## 本地运行

```bash
cd site
python3 -m http.server 5173 --directory .
```

浏览器打开 `http://localhost:5173`。

如果本机 `node` 因 Homebrew 动态库问题不能运行，可以用 Codex bundled Node 执行测试：

```bash
/Users/chaselyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/*.test.mjs
```

## 资源规则

- 概念设计、场景展示、战斗展示：`3840x2160` 横版 JPEG。
- 人物探索、logo、UI 小图：按页面用途控制规格。
- `site/assets/art/` 中站点引用资源使用中文命名；旧英文重复图已归档到 `../docs/archive/2026-04-26-structure-cleanup/duplicate-site-art/`。
- 当前环境未设置 `OPENAI_API_KEY`，本版使用内置 imagegen 按 `script.md` 重新生成站点资源；现有探索图只作为风格参照。
- 后续如需重生关键图，可使用 `$gpt-image` 的 `--size 3840x2160 --quality high`。
