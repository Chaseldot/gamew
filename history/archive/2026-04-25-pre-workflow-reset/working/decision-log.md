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

## 2026-04-24 — Layer hierarchy override

### Accepted
1. **流派 is the fixed primary layer; inheritance content is iterative**
   - Reason: 最新用户约束明确“除了流派是确定的，其他层级都可以按需修改”，因此此前“传承最终定版”的语言必须降级为“当前版本草案 / 可迭代基线”。
   - Downstream impact: `docs/design/02-inheritances.md` 的 24 传承仍需保持当前版本等深，但可以被 pressure ticket 修改、合并、拆分或重命名；若改动传承集合，先记录 escalation。

2. **职业名 becomes an output label, not a system root**
   - Reason: 玩家需要熟悉武侠幻想，但系统不能被“武僧 / 琴魔 / 侠盗”等职业名绑死。
   - Downstream impact: `docs/design/05-identity-and-archetypes.md` 本轮只承载角色形象。所有幻想样例必须从角色形象反推到流派、传承、旁修的组合。

3. **Wuxia fantasy pressure remains a loop with explicit exit conditions**
   - Reason: 武侠迷 agent 需要不断提出幻想来反向指导设计，但无出口会导致 scope creep。
   - Downstream impact: reviewer 每轮新幻想必须转成 ticket / duplicate / low-priority polish，并在无 P0/P1 冲突、无 block ticket、CRPG 通过、leader 接受版本时停止。

### Rejected / superseded
1. **Treat the current inheritance set as terminal final canon**
   - Reason: superseded by the latest user constraint.

2. **Introduce class-name roots for familiar wuxia archetypes**
   - Reason: would bind the system to occupations and collapse build freedom.

3. **Use 出身 / 身份 to solve current player fantasy pressure**
   - Reason: latest user correction defers this layer; current fantasy pressure belongs to 角色形象.

## 2026-04-24 — Final compile closure

### Accepted
1. **All revision tickets resolved before terminal handoff**
   - Reason: worker-1 landed the final canon rewrite, and worker-2 / worker-3 both re-tested against the updated canon without introducing new blockers.
   - Downstream impact: final compile checklist can be marked complete, and the team may shut down cleanly after the closure record is committed.

2. **Lore-format finalization commit should summarize the closure state**
   - Reason: worker auto-checkpoints are useful during the loop, but the final user-facing record should be a single human-readable closure commit.
   - Downstream impact: preserve the worker checkpoints in history, but land one explicit Lore-formatted final commit that records the terminal decision.
