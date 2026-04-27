# Final Compile Checklist

状态：current mutable-layer iteration compile packet
Owner：worker-3 + leader

## Current loop snapshot
- 当前阶段：Round 1 worker-3 CRPG review complete for the currently visible cumulative packet；等待 worker-2 second rewrite / worker-1 final retest / human gate。
- 当前 CRPG gate：**PASS for currently visible packet**。
- 直接结论：`docs/design/01-main-disciplines.md`、`docs/design/02-inheritances.md`、`docs/design/03-side-studies-and-loadout.md`、`docs/design/04-build-examples-and-audit.md`、`docs/working/wuxia-fantasy-pressure-report.md`、`docs/working/crpg-systems-pressure-report.md`、`docs/working/revision-tickets.md` 已对齐。
- 当前版本含义：这是“流派固定、传承 / 旁修 / 角色形象可迭代、出身 / 身份 deferred”约束下的**human-gated iteration candidate**，不是永久冻结；若 worker-1/worker-2 后续新增幻想或 canon rewrite，本 checklist 需追加复测证据。

## Active compile constraints
- [x] 流派保持固定主修语法，不因 archetype 压力回退为职业根节点。
- [x] 传承 / 旁修 / 角色形象保留为当前版本可迭代层。
- [x] 出身 / 身份仍为 deferred，不承担本轮幻想闭环。
- [x] 角色名 / archetype 名称仅作为组合输出，不作为系统根类。

## Canon readiness
- [x] `docs/design/00-rule-bible.md` 仍是 schema authority。
- [x] `docs/design/01-main-disciplines.md` 保持 8/8 主修完整五字段。
- [x] `docs/design/02-inheritances.md` 保持 24/24 传承 section，且 blueprint depth 对齐。
- [x] `docs/design/03-side-studies-and-loadout.md` 已清空 `TBD`，并保留占位符协议。
- [x] `docs/design/05-identity-and-archetypes.md` 明确 archetype 是组合结果、出身 / 身份 deferred。
- [x] `docs/design/04-build-examples-and-audit.md` 已记录 school coherence、fantasy audit 与 compile intake verdict。

## Review convergence
- [x] `docs/working/revision-tickets.md` 无 open block ticket。
- [x] `docs/working/revision-tickets.md` 无 unresolved revise ticket 影响流派 / 传承 / 旁修 / 角色形象 coherence。
- [x] Wuxia fantasy pressure 已覆盖 required sample，最新轮次未产生新的 P0 / P1 层级冲突。
- [x] CRPG systems pressure 已关闭 `CRPG-01` ~ `CRPG-04`，并在 Round 1 refresh 中确认当前可见 packet 无 mandatory side-study tax、无 uncounterable burst loop、无 spreadsheet flattening。

## Verification gates
- [x] Placeholder boundary is preserved:
  - `LOADOUT_INTERFACE_PENDING`
  - `MERIDIAN_SLOT_COUNT_PENDING`
  - `SLOT_PRESSURE_ASSUMPTION_ONLY`
- [x] `docs/design/04-build-examples-and-audit.md` 的 8 个 fantasy build 当前 verdict 均为 PASS。
- [x] `docs/working/change-log.md` 已更新本轮 compile 记录。
- [x] `git diff --check` fresh run passes after WUX-007 resolution.
- [ ] Worker-2 second rewrite / no-op resolution 尚待完成或确认。
- [ ] Worker-1 final cumulative retest 尚待完成或确认。
- [ ] Leader / human acceptance（external to worker-3）尚待明确确认；当前仅确认 worker-3 CRPG packet 已可提交。

## Version evidence
- Worker-3 Round 1 CRPG packet refresh：2026-04-24。
- task-3 review baseline：`d749db5`。
- 当前 packet 依据文件：`docs/design/04-build-examples-and-audit.md`、`docs/working/crpg-systems-pressure-report.md`、`docs/working/revision-tickets.md`、`docs/working/final-compile-checklist.md`。
- 本清单的职责是给出 compile recommendation 与证据边界，不提前替代 leader acceptance。

## Compile recommendation
- Worker-3 recommendation：**allow worker-2 second rewrite to proceed as no-op / narrow polish unless new fantasy tickets land; keep human acceptance outside worker-3 scope**。
- 若后续再开 fantasy loop，优先通过 `revision-tickets.md` 反压 canon，不回退为职业根节点，也不在 `03-side-studies-and-loadout.md` 偷渡槽位定数。

## Round 2 CRPG reviewer addendum
- Review date：2026-04-25
- Scope delta：新增复核 `WUX-011` / `WUX-012` 的 writer first pass，不改 fixed canon verdict 结构。
- Current CRPG conclusion：**no mandatory Canon Writer second-pass rewrite required**；当前改法已把 hybrid visible prop ownership 与 puppet/minion boundary 压回可接受区间。
- What remains pending：这不是 worker-1 post-rewrite cumulative retest，也不是 human acceptance；它只说明 worker-3 未看到新的 P0/P1 CRPG blocker。
- Guardrails to preserve:
  - hybrid visible prop 继续停留在 `主修 ownership + archetype grammar` 两层，不上升为新传承 / 新旁修。
  - puppet 独立行动经济继续停留在 future minion / puppet system，不在当前 `奇门` 或 side-study 里补半套规则。
  - `LOADOUT_INTERFACE_PENDING` / `MERIDIAN_SLOT_COUNT_PENDING` / `SLOT_PRESSURE_ASSUMPTION_ONLY` 继续保持 compile 约束，不被 `铁伞` 或 `傀儡` 例外击穿。
