# GameW

GameW 现在按“素材生产主仓”组织，当前有效内容围绕一级素材生产工作区展开。

根目录的 `00-game-introduction.md` 是全项目定调文件：说明 GameW 要做什么游戏、素材生产应服务什么体验。

| 路径 | 用途 |
|---|---|
| `assets/` | 当前美术资产主仓，含章节地图、主视觉、地点概念、场景、战斗与生成记录。 |
| `character-production/` | 角色生产工作区，维护武侠幻想库、角色概念、构筑测试与 NPC / 队友 / 敌人复用素材。 |
| `canon/` | 当前唯一有效的世界观、地图、主线、阵营与主角基线。 |
| `showcase/` | 下游展示站点，包括内容源、生成脚本和静态站点。 |
| `tools/skills/` | 本地技能与相关脚本。 |
| `ops/` | 计划、运行记录和过程性工作文件。 |
| `history/` | 历史蓝本、探索材料、旧计划和归档，只读参考。 |

## 入口规则

- 当前设计冲突时，以 `canon/` 为准。
- 游戏整体调性、体验目标和低魔武侠边界先看 `00-game-introduction.md`。
- 角色、人设、构筑幻想和人物向素材生产先看 `character-production/`。
- 站点展示内容在 `showcase/`，但其设计依据仍来自 `canon/` 和 `assets/`。
- `history/` 只保存蓝本、旧流程和阶段材料；需要重新生效时，必须重写进 `canon/`。

## 迁移映射

| 旧路径 | 新路径 |
|---|---|
| `art-assets/` | `assets/` |
| `docs/design/00-game-introduction.md` | `00-game-introduction.md` |
| `docs/design/wuxia-fantasy-suite.md` | `character-production/wuxia-fantasy-suite.md` |
| `docs/ground-truth/` | `canon/` |
| `docs/reference/website-blueprint/` | `showcase/` |
| `local-skills/` | `tools/skills/` |
| `docs/plans/` | `ops/plans/` |
| `task_plan.md` | `ops/runs/task_plan.md` |
| `progress.md` | `ops/runs/progress.md` |
| `findings.md` | `ops/runs/findings.md` |
| `docs/reference/story-blueprints/` | `history/story-blueprints/` |
| `docs/reference/design-blueprints/` | 已拆分：游戏定调进 `00-game-introduction.md`，角色幻想库进 `character-production/`。 |
| `docs/reference/assets/` | `history/exploratory-assets/` |
| `docs/reference/archive/` | `history/archive/` |
| `docs/reference/plans/` | `history/plans/` |
| `docs/reference/narrative-pipeline/` | `history/narrative-pipeline/` |
