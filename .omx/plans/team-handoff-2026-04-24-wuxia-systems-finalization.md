# Team Handoff — Wuxia Systems Finalization (24 inheritances at equal depth)

Date: 2026-04-24
Status: execution-ready handoff
Scope override from user: **all 24 inheritances must be finalized at equal blueprint depth**; do not retain the earlier 16-core / 8-reserve split.

## Execution mode
- Recommended runtime: `omx team`
- Recommended worker role prompt: `executor`
- Recommended headcount: **6 workers**
- Leader: human/orchestrator in current pane

## Phase order
1. Phase 0 — Baseline Freeze
2. Phase 1 — Schema Lock
3. Parallel Window A:
   - Phase 2 — Main Discipline Pass
   - Phase 3 — Side-Study / Refinement Pass
4. Parallel Window B:
   - Phase 4 — Inheritance Cluster Pass (2 cluster lanes)
5. Phase 4.5 — School-Coherence Checkpoint
6. Phase 5 — Build Audit & Cross-System Stress Test
7. Phase 6 — Canon Compile

## Worker staffing map

| Worker | Primary lane | Reasoning | Owns / produces | Depends on |
|---|---|---:|---|---|
| worker-1 | Baseline + queue + schema support | high | `docs/working/baseline-snapshot.md`, `docs/working/agent-queue.md`, schema draft support, drift reconciliation notes | source docs only |
| worker-2 | Main discipline lane | high | `docs/design/01-main-disciplines.md` | Phase 1 |
| worker-3 | Side-study / refinement lane | high | `docs/design/03-side-studies-and-loadout.md` (loadout kept deferred by placeholders) | Phase 1 + Phase 2 interfaces |
| worker-4 | Inheritance cluster A | high | `docs/design/02-inheritances.md` sections for 游锋 / 破军 / 拳掌 / 射艺 | Phase 2 + 3 |
| worker-5 | Inheritance cluster B + coherence assist | high | `docs/design/02-inheritances.md` sections for 影踪 / 药师 / 音律 / 奇门; later `school-coherence` memos | Phase 2 + 3 |
| worker-6 | Audit / examples / compile prep | high | `docs/design/04-build-examples-and-audit.md`, `docs/working/conflict-redlines.md`, `docs/working/decision-log.md`, later compile prep notes | Phases 2–5 |

## File scaffold to create in Phase 0

### Canon docs
- `docs/design/00-rule-bible.md`
- `docs/design/01-main-disciplines.md`
- `docs/design/02-inheritances.md`
- `docs/design/03-side-studies-and-loadout.md`
- `docs/design/04-build-examples-and-audit.md`

### Working docs
- `docs/working/baseline-snapshot.md`
- `docs/working/agent-queue.md`
- `docs/working/decision-log.md`
- `docs/working/conflict-redlines.md`
- `docs/working/change-log.md`

## Phase-by-phase assignments

### Phase 0 — Baseline Freeze
**Lead:** worker-1  
**Support:** worker-6  
**Tasks:**
- reconcile source-of-truth drift across:
  - `docs/plans/2026-04-24-wuxia-crpg-flow-paths-summary.md`
  - `findings.md`
  - `progress.md`
- explicitly carry forward the user override: **24 inheritances, equal depth**
- explicitly preserve deferred boundary:
  - `LOADOUT_INTERFACE_PENDING`
  - `MERIDIAN_SLOT_COUNT_PENDING`
  - `SLOT_PRESSURE_ASSUMPTION_ONLY`
- scaffold `docs/design/*` and `docs/working/*`
- initialize queue + decision log + redlines

**Gate:** no other lane writes canon content before baseline snapshot exists.

### Phase 1 — Schema Lock
**Lead:** worker-1  
**Review pressure:** worker-6  
**Tasks:**
- lock definitions for 主修 / 精修 / 旁修 / 传承
- freeze 5-field main-discipline template
- freeze 7-field inheritance template
- freeze 1/2/3-point side-study grammar
- record deferred loadout contract and forbidden edits

**Gate:** downstream workers may fill templates, but may not redefine terms.

### Phase 2 — Main Discipline Pass
**Lead:** worker-2  
**Tasks:**
- fill 8 discipline entries
- ensure each discipline has:
  - core role
  - resource loop
  - 3-stage combat skeleton
  - pure-main endpoint
  - allowed side-study influence range
  - explicit non-goals

**Gate:** all 8 entries complete; no hidden dependency on slot counts.

### Phase 3 — Side-Study / Refinement Pass
**Lead:** worker-3  
**Tasks:**
- fill 8 side-study ladders (1/2/3)
- define refinement returns for pure-main investment
- use placeholders only for loadout/slot boundary
- write side-study redlines: what may influence vs may not replace

**Gate:** side-study cannot replace main-loop closure; refinement cannot act like disguised inheritance.

### Phase 4 — Inheritance Cluster Pass
#### Cluster A — worker-4
- 游锋 / 破军 / 拳掌 / 射艺

#### Cluster B — worker-5
- 影踪 / 药师 / 音律 / 奇门

**Tasks for both lanes:**
- finalize all assigned inheritances at **equal depth**
- each inheritance must include:
  - one-line role
  - core combat fantasy
  - core loop
  - resource relation
  - representative mechanics/actions
  - boundary definition
  - side-study influence envelope
- preserve at least 2/3 anchors:
  - resource relation
  - action structure
  - signature mechanic

**Gate:** no inheritance may depend on unresolved slot/loadout specifics.

### Phase 4.5 — School-Coherence Checkpoint
**Lead:** worker-5 + worker-6 with leader review  
**Tasks:**
- review one school at a time:
  - does it read like one martial family?
  - are the inheritances internally differentiated?
  - does side-study expression reinforce rather than erase identity?
- verdict per school: pass / revise / block

**Gate:** blocked schools do not enter build audit.

### Phase 5 — Build Audit & Cross-System Stress Test
**Lead:** worker-6  
**Support:** worker-2 / 3 / 4 / 5 for fixes  
**Required fantasy build checks:**
- 扫地僧型
- 独臂剑侠型
- 琴魔型
- 白衣琴医型
- 黑衣刺客型
- 铁枪护法型
- 毒医圣手型
- 机关奇人型

**Tasks:**
- check pure-main viability
- check mixed-build identity
- check low-magic boundary
- check no side-study tax pick becomes mandatory
- check no placeholder-based hidden dependency exists

### Phase 6 — Canon Compile
**Lead:** worker-6 + leader  
**Tasks:**
- compile only gate-passed material into canon docs
- update `change-log.md`
- freeze next baseline snapshot

## Required worker instructions
Each worker assignment must explicitly include:
- owned files only
- non-goals
- no redefining schema in downstream phases
- if a shared rule must change, escalate via decision log instead of silent edit
- do not upgrade deferred loadout placeholders into final rules

## Recommended serial/parallel structure
- Serial: Phase 0 -> Phase 1
- Parallel: Phase 2 + Phase 3
- Parallel: Phase 4 cluster lanes
- Serial: Phase 4.5 -> Phase 5 -> Phase 6

## Launch hint
Recommended launch target:
- `omx team 6:executor "Finalize the low-magic wuxia CRPG systems canon: freeze baseline, lock schema, finalize 8 main disciplines, finalize side-study/refinement, finalize all 24 inheritances at equal depth, run school coherence review, run build audit, then compile canon docs."`

## Residual execution risks
1. Baseline drift must be reconciled before drafting.
2. Deferred slot/loadout rules make some audit outcomes conditional.
3. Because worker role prompt is shared, reviewer behavior must be enforced by assignment text and gates.
