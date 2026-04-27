# GameW

GameW 现在按“素材生产主仓”组织，当前有效内容只走六个一级工作区：

| 路径 | 用途 |
|---|---|
| `assets/` | 当前美术资产主仓，含章节地图、主视觉、地点概念、场景、战斗与生成记录。 |
| `canon/` | 当前唯一有效的世界观、地图、主线、阵营与主角基线。 |
| `showcase/` | 下游展示站点，包括内容源、生成脚本和静态站点。 |
| `tools/skills/` | 本地技能与相关脚本。 |
| `ops/` | 计划、运行记录和过程性工作文件。 |
| `history/` | 历史蓝本、探索材料、旧计划和归档，只读参考。 |

## 入口规则

- 当前设计冲突时，以 `canon/` 为准。
- 站点展示内容在 `showcase/`，但其设计依据仍来自 `canon/` 和 `assets/`。
- `history/` 只保存蓝本、旧流程和阶段材料；需要重新生效时，必须重写进 `canon/`。

## 迁移映射

| 旧路径 | 新路径 |
|---|---|
| `art-assets/` | `assets/` |
| `docs/ground-truth/` | `canon/` |
| `docs/reference/website-blueprint/` | `showcase/` |
| `local-skills/` | `tools/skills/` |
| `docs/plans/` | `ops/plans/` |
| `task_plan.md` | `ops/runs/task_plan.md` |
| `progress.md` | `ops/runs/progress.md` |
| `findings.md` | `ops/runs/findings.md` |
| `docs/reference/story-blueprints/` | `history/story-blueprints/` |
| `docs/reference/design-blueprints/` | `history/design-blueprints/` |
| `docs/reference/assets/` | `history/exploratory-assets/` |
| `docs/reference/archive/` | `history/archive/` |
| `docs/reference/plans/` | `history/plans/` |
| `docs/reference/narrative-pipeline/` | `history/narrative-pipeline/` |
