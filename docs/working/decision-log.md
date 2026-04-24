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

### Rejected / superseded
1. **Keep 16 core inheritances + 8 reserve split**
   - Reason: superseded by current round override.

2. **Promote loadout assumptions into canon counts during inheritance phase**
   - Reason: violates deferred boundary and risks hidden dependency.

## Open escalation format
- Proposed change:
- Why current schema is insufficient:
- Impacted files / lanes:
- Safe fallback if rejected:

## Coordination rule
- 任何下游 lane 如需修改 Phase 0 / 1 冻结的术语、模板、占位符协议，必须先按上面的 escalation format 追加记录。
- 允许追加，不允许删除或静默改写既有 accepted / rejected 结论。
