# Team Handoff — Wuxia Systems Iteration Loop

Date: 2026-04-24
Status: iteration-loop handoff after prior finish pass
Current baseline: previous 3-worker finish loop resolved all known tickets and produced a compile PASS, but the latest user constraint supersedes "inheritances are final".
Scope override from user: **流派 is fixed; 传承 / 旁修 / 出身身份 / 角色形象 remain mutable iteration surfaces**. The system must not be bound by class names, while still delivering familiar wuxia fantasies.

## Execution mode
- Recommended runtime: `omx team`
- Recommended worker role prompt: `executor`
- Recommended headcount: **3 workers**
- Leader: human/orchestrator in current pane

## Current resource map
- Schema and authority: `docs/design/00-rule-bible.md`
- Baseline snapshot: `docs/working/baseline-snapshot.md`
- Main disciplines draft: `docs/design/01-main-disciplines.md`
- Inheritance draft: `docs/design/02-inheritances.md`
- Side-study / refinement scaffold: `docs/design/03-side-studies-and-loadout.md`
- Build audit framework: `docs/design/04-build-examples-and-audit.md`
- Identity / archetype layer: `docs/design/05-identity-and-archetypes.md`
- Redlines and decisions: `docs/working/conflict-redlines.md`, `docs/working/decision-log.md`

## Locked layer hierarchy

```text
流派：固定主修武学语法，例如游锋、破军、拳掌……
传承：主修内的专精路线；当前不是最终版，可由 loop 持续优化。
旁修：横向构筑工具；提供入口、接口、小循环和表现工具。
出身 / 身份：僧人、捕快、医谷、杀手楼、门派弟子等社会 / 叙事层。
角色形象：武僧、游侠、毒医、机关师、琴魔、侠盗等捏脸 / NPC / 推荐 build 标签。
```

Design rule: familiar names such as “武僧 / 琴魔 / 侠盗” are **outputs of layer composition**, not root classes.

## Operating model
This iteration pass uses **one canon writer and two pressure reviewers**.

Reviewer output is not just QA. Reviewer output becomes revision tickets that must feed back into canon rewrites before a versioned compile.

```text
Canon Draft
-> Wuxia Fantasy Pressure (including new fantasy proposals)
-> CRPG Systems Pressure
-> Gap Tickets
-> Targeted Canon Rewrite
-> Re-test Fantasy + CRPG
-> repeat until exit condition
-> Versioned Canon Compile
```

## Worker staffing map

| Worker | Primary lane | Owns / produces | Non-goals |
|---|---|---|---|
| worker-1 | Canon Systems Designer | Writes canon revisions across `01-main-disciplines.md`, `02-inheritances.md`, `03-side-studies-and-loadout.md`, `05-identity-and-archetypes.md`; resolves tickets without layer drift | Does not silently redefine fixed 流派; does not finalize loadout / slot counts |
| worker-2 | Wuxia Fantasy Reviewer | Continuously proposes iconic wuxia fantasies, pressure-tests whether layer composition can build them, and writes revision tickets | Does not directly rewrite canon except by ticket; does not demand class-name roots |
| worker-3 | CRPG Systems Reviewer | Writes CRPG pressure report, encounter / counterplay / party-role tickets, and final compile checklist | Does not flatten wuxia identity into spreadsheet balance; does not directly rewrite canon except by ticket |

## File ownership and write rules

### worker-1 — Canon Systems Designer
May edit:
- `docs/design/01-main-disciplines.md`
- `docs/design/02-inheritances.md`
- `docs/design/03-side-studies-and-loadout.md`
- `docs/design/05-identity-and-archetypes.md`
- append-only entries in `docs/working/decision-log.md` when a ticket requires escalation

Primary tasks:
- revise main-discipline, inheritance, side-study, identity, and archetype text where reviewer tickets expose a concrete gap
- preserve the fixed 流派 layer while treating 传承 as mutable draft content
- ensure archetypes are composition outputs, not class roots
- preserve `LOADOUT_INTERFACE_PENDING`, `MERIDIAN_SLOT_COUNT_PENDING`, and `SLOT_PRESSURE_ASSUMPTION_ONLY`
- keep retained inheritances at equal blueprint depth; if the loop proposes changing the 24-set, escalate via decision-log before rewriting the set

### worker-2 — Wuxia Fantasy Reviewer
May edit:
- `docs/working/wuxia-fantasy-pressure-report.md`
- append-only ticket entries in `docs/working/revision-tickets.md`

Primary tasks:
- continuously propose iconic wuxia fantasies and pressure-test whether they can be built without breaking low-magic rules
- identify missing fantasy anchors in 流派 / 传承 / 旁修 / 出身身份 / 角色形象
- create targeted tickets that tell worker-1 exactly what to revise
- re-test tickets after worker-1 rewrites
- stop proposing new fantasies once loop exit conditions are met

Required fantasy samples:
- 扫地僧型
- 独臂剑侠型
- 琴魔型
- 白衣琴医型
- 黑衣刺客型
- 铁枪护法型
- 毒医圣手型
- 机关奇人型
- 令狐冲型
- 黄药师型
- 郭靖型
- 东方不败型
- 武僧型
- 游侠型
- 侠盗型

### worker-3 — CRPG Systems Reviewer
May edit:
- `docs/working/crpg-systems-pressure-report.md`
- `docs/design/04-build-examples-and-audit.md`
- append-only ticket entries in `docs/working/revision-tickets.md`
- `docs/working/final-compile-checklist.md`

Primary tasks:
- pressure-test action economy, encounter value, counterplay, party synergy, and readability
- reject designs that are flavorful but have no tactical decision point
- reject designs that create mandatory tax picks or uncounterable burst loops
- maintain the compile checklist and mark pass / revise / block per loop

## Loop protocol

### Pass A — Canon completion
Lead: worker-1

Tasks:
- align `00-rule-bible.md`, `03-side-studies-and-loadout.md`, and `05-identity-and-archetypes.md` to the locked layer hierarchy
- ensure each side-study ladder remains a horizontal tool, not a class
- ensure refinement rewards pure-main investment without becoming inheritance
- mark inheritance content as current-version draft, not terminal canon
- inspect `01-main-disciplines.md` and `02-inheritances.md` for obvious schema or depth mismatches

Gate:
- no contradiction remains between system hierarchy and canon files
- `02-inheritances.md` still contains exactly 24 inheritance sections unless an explicit decision-log escalation changes that target

### Pass B — Dual pressure review
Leads: worker-2 and worker-3 in parallel

Tasks:
- worker-2 writes wuxia fantasy gap tickets
- worker-3 writes CRPG systems gap tickets
- each ticket must name impacted file / section, problem, expected revision, and pass condition
- worker-2 must distinguish “needs class name” from “needs better layer composition”; the latter is preferred

Gate:
- each required fantasy sample has pass / revise / block verdict
- each CRPG check has pass / revise / block verdict

### Pass C — Targeted rewrite
Lead: worker-1

Tasks:
- resolve tickets in canon files
- append decision-log entries only if a ticket requires changing locked layer boundaries
- keep reviewer reports as evidence, not canon

Gate:
- every ticket is resolved, rejected with reason, or escalated

### Pass D — Re-test
Leads: worker-2 and worker-3

Tasks:
- re-test the revised sections
- close tickets only when pass conditions are met
- if any block remains, return to Pass C

Gate:
- no open block tickets
- no unresolved revise tickets that affect final canon

### Pass E — Canon compile
Lead: worker-3 with leader review

Tasks:
- update `docs/design/04-build-examples-and-audit.md` with final verdicts
- update `docs/working/change-log.md`
- write `docs/working/final-compile-checklist.md`

Gate:
- canon docs are internally consistent
- `git diff --check` passes
- final checklist confirms main discipline, side-study, inheritance, fantasy, and CRPG checks

## Loop exit conditions

The Wuxia Fantasy Reviewer should keep generating fantasies only until the loop has useful pressure. Stop the loop when all conditions are true:

1. No P0 / P1 layer-boundary conflict remains.
2. No open block ticket remains.
3. No unresolved revise ticket affects 流派 / 传承 / 旁修 / 出身身份 / 角色形象 coherence.
4. The latest fantasy-proposal round only creates low-priority polish items or duplicate requests.
5. CRPG reviewer confirms no mandatory side-study tax, no uncounterable burst loop, and no spreadsheet flattening of wuxia identity.
6. Leader accepts the version as the next development baseline.

## Launch hint

Recommended launch target:

```bash
omx team 3:executor "Execute .omx/plans/team-handoff-2026-04-24-wuxia-systems-finalization.md. Use the 1-writer + 2-reviewer iteration loop: worker-1 is Canon Systems Designer, worker-2 is Wuxia Fantasy Reviewer, worker-3 is CRPG Systems Reviewer. Treat 流派 as fixed, treat 传承/旁修/出身身份/角色形象 as mutable. Let wuxia fantasy proposals create tickets that反向修改 canon, CRPG-review each rewrite, stop only when loop exit conditions pass, then compile versioned canon evidence."
```

## Residual execution risks
1. Reviewers must produce tickets, not free-form opinions; otherwise the loop cannot converge.
2. Wuxia fantasy pressure can expand without bound; enforce the exit conditions.
3. CRPG pressure must improve tactical design without erasing low-magic wuxia identity.
4. Wuxia fantasy pressure must create playable builds without forcing mandatory side-study taxes.
5. GPT-5.5 medium workers previously hit ChatGPT backend 403 / TLS errors; do not relaunch under that model until connectivity / quota is stable.
