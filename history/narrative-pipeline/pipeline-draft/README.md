# GameW 叙事生产管线

状态：active draft
日期：2026-04-26
用途：为《山水照影录》建立一套可由人类主创和 AI 协作推进的 CRPG 叙事生产工作区。

## 目标

这个文件夹不直接替代 `docs/story/` 的剧情 canon。它负责回答一个更上游的问题：

> 对于多起源、多任务、高自由度、BG3-like 的低魔武侠 CRPG，怎样把故事从想法一步步推进到可写、可审、可制作、可回收的内容资产？

## 核心结论

GameW 不应以长篇小说作为剧情母版。小说可以用于语气样章、关键场景和宣传文本，但 CRPG 的母版应是：

1. 主题与世界压力；
2. 章节 checkpoint；
3. 任务网络；
4. 变量与后果回收；
5. 队友和起源角色视角；
6. 场景卡；
7. 对白和演出文本。

## 文件索引

| 文件 | 用途 |
|---|---|
| `00-production-principles.md` | 顶级作家、资深编剧、CRPG 从业者共同认可的生产原则。 |
| `01-layered-workflow.md` | 从主题到对白的分层工作流。 |
| `02-quest-packet-template.md` | 每个任务应如何拆解、提问和交付。 |
| `03-scene-card-template.md` | 每个可写场景如何落成可生成对白的场景卡。 |
| `04-ai-collaboration-protocol.md` | AI 在叙事管线中的角色、提示词、审稿规则和禁区。 |
| `examples/A1-M01-quest-packet.md` | A1-M01《雨夜醒牒》任务包样板。 |
| `examples/A1-M01-scene-cards.md` | A1-M01《雨夜醒牒》场景卡样板。 |
| `examples/A1-M01-ai-audit.md` | A1-M01《雨夜醒牒》AI / QA 审计样板。 |
| `ops/runs/task_plan.md` | 本工作区建设计划。 |
| `ops/runs/findings.md` | 关键发现与上下文记录。 |
| `ops/runs/progress.md` | 工作进度记录。 |

## 推荐使用顺序

1. 先读 `00-production-principles.md`，统一创作判断。
2. 按 `01-layered-workflow.md` 建立章节和任务骨架。
3. 对每个主线、大型支线、队友任务填写 `02-quest-packet-template.md`。
4. 对需要完整对白的节点填写 `03-scene-card-template.md`。
5. 使用 `04-ai-collaboration-protocol.md` 让 AI 扩展路径、生成变体、审计一致性。
6. 参考 `examples/` 下的 A1-M01 样板，先做任务包，再拆场景卡，最后做审计。

## 与现有文档的关系

- `docs/story/00-story-bible.md` 是当前剧情全局 canon。
- `docs/story/02-act1-branch-matrix.md` 是第一章变量和分支的 active draft。
- 本目录是叙事生产方法和模板。只有当内容被迁移到 `docs/story/` 并通过审稿后，才进入剧情 canon。
