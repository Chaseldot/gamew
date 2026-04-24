# Decision Log — Wuxia Systems Finalization

## 2026-04-24 — Baseline / Schema decisions

### Accepted
1. **24 inheritances at equal blueprint depth**
   - Reason: 最新 handoff 覆盖旧摘要中的“16 深挖 / 8 预留”。
   - Downstream impact: `docs/design/02-inheritances.md` 必须为全部 24 个传承建立同深度 section。

2. **Main discipline template remains 5 fields**
   - Reason: 访谈已冻结该结构；为避免 schema 漂移，不增字段。
   - Downstream impact: explicit non-goals 并入第 5 字段表达。

3. **Deferred loadout / meridian-slot boundary stays hard-deferred**
   - Reason: summary 与 workflow 均表明该层尚未进入定版。
   - Downstream impact: 所有下游引用必须使用占位符，不得给出槽位定数。

4. **Schema authority source is `docs/design/00-rule-bible.md`**
   - Reason: downstream lanes 需要单一规则入口。
   - Downstream impact: 若任何 lane 需要改 schema，先记 decision request，再由 leader 决断。

5. **This round writes directly into owned `docs/design/*` targets after Phase 0 / 1 gates**
   - Reason: 当前 team handoff 已为 Phase 2–5 明确分配 canon 文件 / section ownership；旧 workflow 草案中的“先 candidate、后 compile”仅保留为审计思想，不再作为写入路径。
   - Downstream impact: downstream workers 在各自拥有的 canon 文件内按冻结模板直写；worker-6 / leader 负责审计、compile intake 与 gate verdict，而不是再建并行草稿树。

6. **Finish loop uses 1 canon writer + 2 pressure reviewers**
   - Reason: Phase 0 / 1 已冻结，主修与传承已有草案；当前最大风险是旁修未完成、幻想未反压、CRPG 可玩性未复测。继续 6-worker 从零生产会增加并发噪音和 merge 风险。
   - Downstream impact: worker-1 成为唯一 canon writer；worker-2 负责武侠幻想压力；worker-3 负责 CRPG systems 压力与 compile checklist。Reviewer 通过 revision tickets 反向驱动 canon 修改。

### Rejected / superseded
1. **Keep 16 core inheritances + 8 reserve split**
   - Reason: superseded by current round override.

2. **Promote loadout assumptions into canon counts during inheritance phase**
   - Reason: violates deferred boundary and risks hidden dependency.

3. **Continue the 6-worker production split for the finish pass**
   - Reason: superseded by current progress; baseline/schema/main-discipline/inheritance scaffolding are no longer parallel production blockers.

## Open escalation format
- Proposed change:
- Why current schema is insufficient:
- Impacted files / lanes:
- Safe fallback if rejected:

## Coordination rule
- 任何下游 lane 如需修改 Phase 0 / 1 冻结的术语、模板、占位符协议，必须先按上面的 escalation format 追加记录。
- 允许追加，不允许删除或静默改写既有 accepted / rejected 结论。

## 2026-04-24 — Final compile closure

### Accepted
1. **All revision tickets resolved before terminal handoff**
   - Reason: worker-1 landed the final canon rewrite, and worker-2 / worker-3 both re-tested against the updated canon without introducing new blockers.
   - Downstream impact: final compile checklist can be marked complete, and the team may shut down cleanly after the closure record is committed.

2. **Lore-format finalization commit should summarize the closure state**
   - Reason: worker auto-checkpoints are useful during the loop, but the final user-facing record should be a single human-readable closure commit.
   - Downstream impact: preserve the worker checkpoints in history, but land one explicit Lore-formatted final commit that records the terminal decision.
