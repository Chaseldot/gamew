# 2026-04-26 Structure Cleanup Archive

本归档保留本轮结构整理中移出 active 工作面的文件。原则是保留资产、不直接删除；active 目录只放当前会被阅读、生成或网站引用的内容。

## Contents

| 路径 | 内容 | 归档原因 |
|---|---|---|
| `duplicate-site-art/` | 英文旧名站点美术图 | 与 `site/assets/art/` 中文现名文件 SHA-256 完全一致，当前网站不再引用。 |
| `tmp-source-packages/gamew_story_bible_v0_3/` | v0.3 故事包输入快照 | 内容已经拆入 `docs/story/`、`content/12-website-assets/` 和 `site/`，不再留在顶层 `tmp/`。 |
| `tmp-source-packages/imagegen-new/` | 空的临时 imagegen 目录 | 无 active 内容，仅保留目录位置记录。 |
| `site-verification-snapshots/` | 旧截图、contact sheet、server log、pid | 属于一次性浏览器验收产物；`site/verification/v03-browser-report.json` 仍保留在 active 位置作为可读报告。 |
| `system-files/` | `.DS_Store`、swap、无根 `package-lock.json`、空 `tmp` 目录 | 系统/编辑器/运行遗留文件，不应位于 active 根面。 |

## Active Replacements

- 网站内容源：`content/12-website-assets/web_export.json`
- 网站生成脚本：`scripts/build-site-data.mjs`
- 当前站点引用图：`site/assets/art/` 下中文命名 JPEG
- 故事文档：`docs/story/00-story-bible.md`、`01-act1-fengjing.md`、`02-act1-branch-matrix.md`、`03-site-content-map.md`
