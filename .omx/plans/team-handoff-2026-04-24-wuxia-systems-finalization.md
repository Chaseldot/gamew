# Team Handoff — Wuxia Human-Gated Fantasy Iteration Loop

Date: 2026-04-24
Status: human-gated cumulative fantasy loop
Current baseline: previous 3-worker pass produced a mutable-layer compile packet. The next workflow is no longer a parallel finish pass; it is a sequential creative-design loop with a growing fantasy regression suite and a human gate.
Scope override from user: **流派 is fixed; 传承 / 旁修 / 角色形象 remain mutable iteration surfaces; 出身 / 身份 is deferred for this round**. The system must not be bound by class names, while still delivering familiar wuxia fantasies.

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
- Cumulative fantasy suite: `docs/working/fantasy-test-suite.md`
- Round report: `docs/working/round-report-latest.md`
- Redlines and decisions: `docs/working/conflict-redlines.md`, `docs/working/decision-log.md`

## Locked layer hierarchy

```text
流派：固定主修武学语法，例如游锋、破军、拳掌……
传承：主修内的专精路线；当前不是最终版，可由 loop 持续优化。
旁修：横向构筑工具；提供入口、接口、小循环和表现工具。
角色形象：武僧、游侠、毒医、机关师、琴魔、侠盗等捏脸 / NPC / 推荐 build 标签。
出身 / 身份：本轮 deferred，不作为幻想解决手段。
```

Design rule: familiar names such as “武僧 / 琴魔 / 侠盗” are **outputs of layer composition**, not root classes.

## Operating model
This workflow uses a sequential **1 -> 2 -> 3 -> 2 -> Human** loop.

The fantasy test suite is cumulative. Every round must retest all previous fantasies plus new worker-1 fantasies plus any human-added fantasies.

```text
Round N
-> worker-1 adds 3-5 new wuxia/player fantasies
-> worker-1 full-tests cumulative fantasy suite
-> worker-2 rewrites canon from failing/high-priority tickets
-> worker-3 reviews CRPG/design tradeoffs and writes actionable advice
-> worker-2 performs second rewrite from worker-3 advice
-> worker-1 full-retests cumulative fantasy suite
-> round report for Human
-> Human accepts baseline or adds opinions/fantasies for next round
```

## Worker staffing map

| Worker | Primary lane | Owns / produces | Non-goals |
|---|---|---|---|
| worker-1 | Senior Wuxia Fan / Fantasy Tester | Adds 3-5 new fantasies each round, maintains `fantasy-test-suite.md`, full-tests cumulative suite, writes fantasy tickets and retest evidence | Does not rewrite canon; does not count human-added fantasies toward its 3-5 new fantasies |
| worker-2 | Canon Systems Designer | Sole canon writer; applies fantasy tickets, then applies worker-3 design advice; updates canon and ticket resolutions | Does not silently redefine fixed 流派; does not finalize loadout / slot counts; does not bypass reviewer evidence |
| worker-3 | Senior CRPG / Game Designer | Reviews worker-2 changes for gameplay tradeoffs, mandatory-tax risk, counterplay, 2-4 turn value, and layer placement; writes actionable advice | Does not directly rewrite canon except via ticket/advice; does not flatten wuxia identity into spreadsheet balance |

## File ownership and write rules

### worker-1 — Senior Wuxia Fan / Fantasy Tester
May edit:
- `docs/working/fantasy-test-suite.md`
- `docs/working/wuxia-fantasy-pressure-report.md`
- append-only ticket entries in `docs/working/revision-tickets.md`
- `docs/working/round-report-latest.md` fantasy sections

Primary tasks:
- add **3-5 new worker-origin fantasies every round**
- incorporate human-added fantasies from prior round without counting them toward the 3-5 quota
- full-test the cumulative fantasy suite before and after canon rewrites
- mark regressions where an old PASS falls to revise/block
- create targeted tickets with impacted layer, expected revision, pass condition, and priority

### worker-2 — Canon Systems Designer
May edit:
- `docs/design/01-main-disciplines.md`
- `docs/design/02-inheritances.md`
- `docs/design/03-side-studies-and-loadout.md`
- `docs/design/05-identity-and-archetypes.md`
- append-only resolution entries in `docs/working/revision-tickets.md`
- append-only escalation entries in `docs/working/decision-log.md`
- `docs/working/round-report-latest.md` canon sections

Primary tasks:
- resolve P0/P1 tickets first; P2 only when cheap or human-prioritized; P3 usually defer
- apply canon rewrite after worker-1 fantasy test
- apply second canon rewrite after worker-3 design review
- preserve fixed 流派, low-magic boundary, placeholder protocol, and current 24-inheritance equal-depth unless explicitly escalated

### worker-3 — Senior CRPG / Game Designer
May edit:
- `docs/working/crpg-systems-pressure-report.md`
- `docs/design/04-build-examples-and-audit.md`
- append-only ticket entries in `docs/working/revision-tickets.md`
- `docs/working/final-compile-checklist.md`
- `docs/working/round-report-latest.md` design-review sections

Primary tasks:
- review worker-2 canon changes for action economy, encounter value, counterplay, party synergy, and readability
- decide whether each fantasy demand belongs in inheritance, side-study, or presentation-only archetype space
- reject mandatory tax picks, uncounterable burst loops, or fantasies with no tactical decision point
- write actionable advice for worker-2 second rewrite

## Loop protocol

### Step 1 — worker-1 fantasy expansion and full baseline test
Lead: worker-1

Tasks:
- add 3-5 worker-origin fantasies to `docs/working/fantasy-test-suite.md`
- add any human-origin fantasies from the previous human gate
- full-test the entire cumulative suite
- open tickets for revise/block/P0/P1 issues

Gate:
- suite count is updated
- every fantasy has pass/revise/block for this round
- tickets are actionable

### Step 2 — worker-2 first canon rewrite
Lead: worker-2

Tasks:
- resolve high-priority tickets in canon
- record tradeoffs and rejected alternatives in ticket resolution
- update round report

Gate:
- no silent schema drift
- canon changes cite tickets

### Step 3 — worker-3 CRPG/game-design review
Lead: worker-3

Tasks:
- review worker-2 changes
- decide inheritance vs side-study vs presentation-label placement
- open design-review tickets/advice for worker-2
- update CRPG report and round report

Gate:
- no unaddressed P0/P1 design blocker
- advice is actionable, not generic opinion

### Step 4 — worker-2 second canon rewrite
Lead: worker-2

Tasks:
- apply worker-3 advice
- resolve/reject/escalate CRPG tickets with reasons
- update canon docs and round report

Gate:
- every worker-3 P0/P1 item is resolved, rejected with reason, or escalated

### Step 5 — worker-1 full regression retest
Lead: worker-1

Tasks:
- retest cumulative fantasy suite after both worker-2 rewrites
- record regressions and new pass/fail counts
- update round report

Gate:
- all P0/P1 fantasy regressions are ticketed
- round report is ready for human review

### Step 6 — Human gate
Lead: human / leader

Human response options:
- accept current version as the next baseline and stop loop
- add human fantasies / objections / taste corrections for the next round
- require another round on specific failure areas

## Loop exit conditions

Stop only when Human accepts the current version. The agents may recommend stopping when:

1. No P0 / P1 layer-boundary conflict remains.
2. No open block ticket remains.
3. No old fantasy regresses from PASS to revise/block.
4. Latest worker-1 fantasies do not expose new system-layer gaps.
5. worker-3 confirms no mandatory side-study tax, no uncounterable burst loop, and no spreadsheet flattening of wuxia identity.
6. Human explicitly accepts the version.

## Launch hint

Recommended launch target:

```bash
OMX_TEAM_WORKER_LAUNCH_ARGS='--model gpt-5.5 -c model_reasoning_effort=medium' omx team 3:executor "Run one human-gated wuxia fantasy iteration round from .omx/plans/team-handoff-2026-04-24-wuxia-systems-finalization.md. Follow sequence worker1 fantasy suite then worker2 canon rewrite then worker3 CRPG review then worker2 second rewrite then worker1 full retest then human report. Use cumulative fantasy-test-suite. Worker1 adds 3-5 new fantasies excluding human additions. Fixed liupai. Mutable inheritance side-study role-image. Defer origin identity."
```

## Residual execution risks
1. worker-1 must add 3-5 new worker-origin fantasies every round; human fantasies do not count toward that quota.
2. Cumulative suite growth can become expensive; still retest all prior fantasies each round.
3. worker-2 is the only canon writer; worker-1/3 must use tickets/advice.
4. GPT-5.5 may hit quota/backend limits; if so, preserve state and report exact pane evidence.
