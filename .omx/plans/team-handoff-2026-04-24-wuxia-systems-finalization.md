# Team Handoff — Wuxia Systems Finalization Loop

Date: 2026-04-24
Status: finish-loop handoff
Current baseline: Phase 0 / 1 are frozen; main disciplines and inheritance draft content exist; side-study / refinement remains the largest open design gap.
Scope override from user: **all 24 inheritances must be finalized at equal blueprint depth**; do not retain the earlier 16-core / 8-reserve split.

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
- Redlines and decisions: `docs/working/conflict-redlines.md`, `docs/working/decision-log.md`

## Operating model
This finish pass uses **one canon writer and two pressure reviewers**.

Reviewer output is not just QA. Reviewer output becomes revision tickets that must feed back into canon rewrites before final compile.

```text
Canon Draft
-> Wuxia Fantasy Pressure
-> CRPG Systems Pressure
-> Gap Tickets
-> Targeted Canon Rewrite
-> Re-test Fantasy + CRPG
-> repeat until pass
-> Final Canon Compile
```

## Worker staffing map

| Worker | Primary lane | Owns / produces | Non-goals |
|---|---|---|---|
| worker-1 | Canon Systems Designer | Writes canon revisions across `01-main-disciplines.md`, `02-inheritances.md`, `03-side-studies-and-loadout.md`; resolves tickets without schema drift | Does not silently redefine schema; does not finalize loadout / slot counts |
| worker-2 | Wuxia Fantasy Reviewer | Writes fantasy pressure report and revision tickets for classic wuxia builds | Does not directly rewrite canon except by ticket; does not accept generic CRPG viability as a substitute for wuxia flavor |
| worker-3 | CRPG Systems Reviewer | Writes CRPG pressure report, encounter / counterplay / party-role tickets, and final compile checklist | Does not flatten wuxia identity into spreadsheet balance; does not directly rewrite canon except by ticket |

## File ownership and write rules

### worker-1 — Canon Systems Designer
May edit:
- `docs/design/01-main-disciplines.md`
- `docs/design/02-inheritances.md`
- `docs/design/03-side-studies-and-loadout.md`
- append-only entries in `docs/working/decision-log.md` when a ticket requires escalation

Primary tasks:
- complete all `TBD` content in `docs/design/03-side-studies-and-loadout.md`
- revise main-discipline and inheritance text only where reviewer tickets expose a concrete gap
- preserve `LOADOUT_INTERFACE_PENDING`, `MERIDIAN_SLOT_COUNT_PENDING`, and `SLOT_PRESSURE_ASSUMPTION_ONLY`
- keep all 24 inheritances at equal blueprint depth

### worker-2 — Wuxia Fantasy Reviewer
May edit:
- `docs/working/wuxia-fantasy-pressure-report.md`
- append-only ticket entries in `docs/working/revision-tickets.md`

Primary tasks:
- pressure-test whether iconic wuxia fantasies can be built without breaking low-magic rules
- identify missing fantasy anchors in 主修 / 旁修 / 精修 / 传承
- create targeted tickets that tell worker-1 exactly what to revise
- re-test tickets after worker-1 rewrites

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
- finish `03-side-studies-and-loadout.md`
- ensure each side-study ladder has 1-point entry, 2-point interface, and 3-point small loop
- ensure refinement rewards pure-main investment without becoming inheritance
- inspect `01-main-disciplines.md` and `02-inheritances.md` for obvious schema or depth mismatches

Gate:
- no `TBD` remains in `docs/design/03-side-studies-and-loadout.md`
- `02-inheritances.md` still contains exactly 24 inheritance sections

### Pass B — Dual pressure review
Leads: worker-2 and worker-3 in parallel

Tasks:
- worker-2 writes wuxia fantasy gap tickets
- worker-3 writes CRPG systems gap tickets
- each ticket must name impacted file / section, problem, expected revision, and pass condition

Gate:
- each required fantasy sample has pass / revise / block verdict
- each CRPG check has pass / revise / block verdict

### Pass C — Targeted rewrite
Lead: worker-1

Tasks:
- resolve tickets in canon files
- append decision-log entries only if a ticket requires changing frozen schema
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

## Launch hint

Recommended launch target:

```bash
omx team 3:executor "Execute .omx/plans/team-handoff-2026-04-24-wuxia-systems-finalization.md. Use the 1-writer + 2-reviewer finish loop: worker-1 is Canon Systems Designer, worker-2 is Wuxia Fantasy Reviewer, worker-3 is CRPG Systems Reviewer. Complete side-study/refinement, pressure-test wuxia fantasy builds and CRPG systems, create revision tickets, rewrite canon, re-test, and compile final canon evidence."
```

## Residual execution risks
1. `docs/design/03-side-studies-and-loadout.md` is still scaffold-level and must be completed before meaningful pressure review.
2. Reviewers must produce tickets, not free-form opinions; otherwise the loop cannot converge.
3. CRPG pressure must improve tactical design without erasing low-magic wuxia identity.
4. Wuxia fantasy pressure must create playable builds without forcing mandatory side-study taxes.
