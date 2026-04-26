# 工作流重启入口

日期：2026-04-25
状态：资源重构后的工作流重启入口

## 目标

基于已经重构出的 active 设计文档，设计一套用于完成 GameW 武侠 CRPG 构筑系统的后续工作流。

## 当前规则

archive 只作为备份。active 设计讨论应从 `docs/design/` 开始。

archive 中的内容不是 active canon，除非已经被明确重写进 active 文档。不要把只存在于 archive 中的旧报告、旧问题单或 worker 笔记当作当前规则。

## 工作问题

1. 下一套工作流应优先完成哪个 open system？
2. 哪些内容必须由人类拍板，哪些可以由工作流自主推进？
3. 一轮工作流结束时应产出什么 artifact？
4. 哪些检查能防止漂移、膨胀和重复返工？
5. 最小可用循环是什么？

## Active 文件

| 文件 | 用途 |
|---|---|
| `docs/workflow/00-start-here.md` | 工作流重启入口和约束。 |
| `docs/workflow/01-workflow-draft.md` | 新工作流草稿。 |
| `docs/design/00-build-system-overview.md` | active 构筑系统基线。 |
| `docs/design/01-disciplines-and-inheritances.md` | active 流派与传承资料。 |
| `docs/design/02-refinement-and-side-studies.md` | active 精修与旁修资料。 |
| `docs/design/03-fantasy-tests-and-boundaries.md` | active 幻想测试与边界资料。 |
| `docs/design/04-open-systems.md` | active 未完成系统队列。 |
| `task_plan.md` | 当前任务计划。 |
| `findings.md` | 当前发现与决策。 |
| `progress.md` | 当前进度记录。 |

## Archive 参考

旧资料位于 `docs/archive/2026-04-25-pre-workflow-reset/`。

使用规则：

- 只有 active 文档缺少必要上下文时才读取。
- 读取后应将有用内容重写进 active 文档，而不是长期链接回旧报告。
- 不恢复旧 worker 流程噪音。
