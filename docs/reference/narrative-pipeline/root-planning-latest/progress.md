# 进度记录：项目结构整理与资产归档

## Session: 2026-04-26 结构整理

### 当前状态

- 用户要求重构项目文件结构与排布、优化文件名，保留目前资产，把不重要或重复内容归档。
- 已使用 `planning-with-files` 和 `project-overview` 盘点工作区。
- 当前策略：不删除资产；把重复、临时、系统或旧验证产物移入 `docs/archive/2026-04-26-structure-cleanup/`。

### 本轮已执行动作

- 运行 planning session catchup。
- 读取当前 planning 文件、目录列表、git 状态、active README、内容 README、站点 app 和 gallery prompt。
- 检查 asset SHA-256，确认 `site/assets/art/` 有英文旧名和中文现名完全重复的文件。
- 检查引用，确认网站实际数据源和 app 主要引用中文资产名，英文资产名只剩 prompt 文档引用。
- 更新根部 planning 文件，记录本轮整理目标与阶段。

### 本轮待执行

- [x] 移动/改名内容目录与 story 文档。
- [x] 归档重复资产、临时包、系统文件和旧验证产物。
- [x] 同步脚本、测试、README 和 prompt 文档引用。
- [x] 运行内容管线与站点测试。

### 本轮验收命令记录

```bash
/Users/chaselyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/build-site-data.mjs --check
/Users/chaselyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/*.test.mjs
```

结果：内容生成同步检查通过；站点测试 5 个全部通过。

### 最终结构检查

- Active 内容源为 `content/12-website-assets/`。
- Active story 文档为 `docs/story/00-story-bible.md` 到 `docs/story/03-site-content-map.md`。
- Active 站点美术保留 18 张中文命名 JPEG。
- Active 验证目录只保留 `site/verification/v03-browser-report.json`。
- 本轮归档入口为 `docs/archive/2026-04-26-structure-cleanup/README.md`。

## 历史记录

# 进度记录：叙事资产库与网站导出管线

## Session: 2026-04-26

### 当前状态

- 用户确认根据分享页拆分继续实现。
- 当前目标切换为：建立最小结构化叙事资产库和网站导出管线。
- 设计决策：先以 `content/12-website-assets/web_export.json` 为网站内容源，用 `scripts/build-site-data.mjs` 生成 `site/data.js`；后续再把人物、阵营、地区、任务逐步拆到 Markdown/YAML。

### 本轮已执行动作

- 阅读并使用相关流程：
  - `superpowers:brainstorming`
  - `planning-with-files`
  - `superpowers:test-driven-development`
  - `superpowers:verification-before-completion`
- 运行 planning session catchup。
- 读取当前 planning 文件、站点测试、站点数据、站点包配置和 git 状态。
- 更新根部 planning 文件，把任务切换到资产管线实现。

### 本轮待执行

- [ ] 新增内容管线测试并观察失败。
- [x] 新增 `site/tests/content-pipeline.test.mjs`。
- [x] 运行测试，预期失败在 `content/12-website-assets/web_export.json should exist`。
- [x] 实现 `content/12-website-assets/web_export.json`。
- [x] 实现 `scripts/build-site-data.mjs`，支持生成和 `--check` 同步验证。
- [x] 更新 `site/package.json`、`site/README.md`、`content/README.md` 和网站内容地图。
- [x] 运行回归验收。

### 本轮验收命令记录

```bash
/Users/chaselyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/*.test.mjs
/Users/chaselyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/build-site-data.mjs --check
```

结果：5 个自动测试全部通过；导出脚本 `--check` 退出码 0。

浏览器 smoke：

```bash
/Users/chaselyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --input-type=module <playwright smoke>
```

结果：12 个页面在 `1280x800` 下全部加载，`failures=0`。

## 前序 Session: 2026-04-26 v0.3 网站优化

### 前序状态

- 用户要求根据 `docs/archive/2026-04-26-structure-cleanup/tmp-source-packages/gamew_story_bible_v0_3/` 优化网站，并授权自主 review、执行、评测、优化到最终目标。
- 已读取 v0.3 目录结构，确认它是新的剧情资产权威源。
- 已发现当前站点仍偏第一章样板，缺少 v0.3 要求的地区、人物总览、故事、分支和图鉴页面。
- 当前进入测试驱动实现阶段。

### 前序已执行动作

- 阅读并使用相关流程：
  - `superpowers:brainstorming`
  - `planning-with-files`
  - `superpowers:test-driven-development`
  - `superpowers:verification-before-completion`
- 检查 `docs/archive/2026-04-26-structure-cleanup/tmp-source-packages/gamew_story_bible_v0_3/` 文件清单与体量。
- 读取现有 planning 文件、站点文件列表和 git 工作区状态。
- 更新根部 `task_plan.md`、`findings.md`、`progress.md`，把当前目标切换为 v0.3 网站优化。

### 前序待执行

- [ ] 更新站点测试，使其覆盖 v0.3 新栏目和核心内容。
- [x] 更新站点测试，使其覆盖 v0.3 新栏目和核心内容。
- [x] 先运行测试，失败点为导航仍是旧 8 页、全局阵营仍是 6 个。
- [x] 扩展 `site/data.js` 与 `site/app.js`。
- [x] 新增 `regions.html`、`characters.html`、`stories.html`、`branches.html`、`codex.html` 并保留 `companions.html` 兼容入口。
- [x] 运行 bundled Node 自动测试，4 个测试全部通过。
- [x] 运行浏览器验收：12 个页面在桌面 `1440x900` 和移动 `390x844` 下均无控制台 error、无空 root、无横向溢出、无图片加载失败；报告写入 `site/verification/v03-browser-report.json`。
- [x] in-app browser 已切换到 `http://127.0.0.1:5173/index.html`，不再使用 `file://` 入口。

### 本轮验收命令记录

```bash
/Users/chaselyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/*.test.mjs
/Users/chaselyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node -e "const r=require('./verification/v03-browser-report.json'); if(r.failures.length){console.error(r.failures); process.exit(1)} console.log(JSON.stringify({failures:r.failures.length, checked:r.results.length}))"
```

结果：4 个自动测试全部通过；浏览器报告 `failures=0`，共检查 24 个页面 / 视口组合。

## 前序 Session: 2026-04-26

### 前序状态

- 用户已确认先做第一章《封境》文本样板。
- 已写入设计文档和实施计划。
- 已把根部 planning 文件从“展示站收口”切换到“第一章文本资产”。
- 已完成 `docs/story/` 下第一章文本资产样板与首轮一致性检查。
- 已完成网站多子页面重构、中文命名美术资源引用、自动测试和浏览器验收。
- 下一步可继续扩写第二章《黄沙照影》，或在现有多页面站点上继续做更精细的视觉与图片生成。

### 已执行动作

- 阅读并使用相关流程：
  - `superpowers:brainstorming`
  - `planning-with-files`
  - `superpowers:writing-plans`
- 运行 planning session catchup，无额外输出。
- 复查仓库结构、`script.md`、`task_plan.md`、`findings.md`、`progress.md`。
- 创建：
  - `docs/plans/2026-04-26-act1-fengjing-content-design.md`
  - `docs/plans/2026-04-26-act1-fengjing-content.md`
- 更新：
  - `task_plan.md`
  - `findings.md`
  - `progress.md`
- 创建剧情资产：
  - `docs/story/00-story-bible.md`
  - `docs/story/01-act1-fengjing.md`
  - `docs/story/02-act1-branch-matrix.md`
  - `docs/story/03-site-content-map.md`
- 重构站点：
  - `site/index.html`
  - `site/world.html`
  - `site/systems.html`
  - `site/story-act1.html`
  - `site/quests.html`
  - `site/companions.html`
  - `site/factions.html`
  - `site/art.html`
  - `site/app.js`
  - `site/data.js`
  - `site/styles.css`
  - `site/tests/site-content.test.mjs`
- 复制中文命名美术资源到 `site/assets/art/`，并更新站点引用。
- 更新 `site/README.md`，说明 HTTP 访问、多页面结构和 bundled Node 测试命令。
- 完成第一轮文本检索验收：
  - 全局故事圣经可检索到 `四人`、`无名煞`、`照影牒针`、`三章`、`任务多解`、`图片`。
  - 第一章章节圣经可检索到 A1-M01 至 A1-M04、A1-S01 至 A1-S06、主要队友、白微尘、何其庸、楚横山和无名煞。
  - 分支矩阵可检索到所有第一章核心变量。
  - 网站映射可检索到所有目标子页面和 `3840x2160` 图片规则。

### 前序成果保留

- `site/` 单页展示站已完成并通过此前验证。
- `site/assets/art/` 已有一批按 `script.md` 生成的临时展示资源。
- 后续若重构网站，需要从单页改为多子页面；本轮先不改页面和图片。

### 待验证

- [x] `docs/story/00-story-bible.md` 是否覆盖全局叙事规则。
- [x] `docs/story/01-act1-fengjing.md` 是否覆盖第一章章节、阵营、人物、主线、支线和样段。
- [x] `docs/story/02-act1-branch-matrix.md` 是否覆盖第一章变量与后果。
- [x] `docs/story/03-site-content-map.md` 是否覆盖未来站点子页面结构。
- [x] 新增文本是否与 `script.md` 和既有 design canon 一致。

### 验收命令记录

```bash
rg -n "四人|无名煞|照影牒针|三章|任务多解|图片" docs/story/00-story-bible.md
rg -n "A1-M0[1-4]|A1-S0[1-6]|桑芷|唐小砚|柳听弦|韩霜铁|谢停云|裴照|白微尘|何其庸|楚横山|无名煞" docs/story/01-act1-fengjing.md
rg -n "A1_SHANSHUI_STATE|A1_MAGISTRATE_STATUS|A1_BANDIT_ALLIANCE|A1_SANG_TRUST|A1_TANG_WATERGATE_FIX|A1_FIRST_TIE_KEY|A1_DARK_ORIGIN_WITNESSES" docs/story/02-act1-branch-matrix.md
rg -n "index.html|world.html|systems.html|story-act1.html|quests.html|companions.html|factions.html|art.html|3840x2160" docs/story/03-site-content-map.md
find docs/story -maxdepth 1 -type f -name '*.md' -print | sort
wc -l docs/story/*.md docs/plans/2026-04-26-act1-fengjing-content*.md
```

结果：四个 story 文档已创建；剧情与计划文档共 1431 行。

### 站点验收命令记录

```bash
/Users/chaselyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/*.test.mjs
```

结果：4 个测试全部通过。

浏览器验收：

- 本地服务：`http://127.0.0.1:5173/index.html`
- in-app browser 验证：8 个子页面均能加载，控制台无 error，艺术馆筛选和 lightbox 可用。
- Playwright 验证：桌面 `1440x900` 与移动 `390x844` 下 8 个页面均无横向溢出、无空 root、无图片加载失败。
- 截图输出：
  - `site/verification/desktop-home-latest.png`
  - `site/verification/desktop-art-combat-latest.png`
  - `site/verification/mobile-story-act1-latest.png`
