# Test Spec — Wuxia Systems Finalization Workflow

Date: 2026-04-24
Source plan: `.omx/plans/2026-04-24-wuxia-systems-finalization-workflow.md`

## Goal
Define how to verify the planning workflow is execution-ready and reusable.

## Phase checks

### Phase 0 — Baseline Freeze
- Verify `baseline-snapshot.md` exists and consolidates approved rules/templates/redlines/deferred items
- Verify `agent-queue.md` exists with bounded ownership and non-goals
- Verify no drafting phase starts before these artifacts exist

### Phase 1 — Schema Lock
- Verify canonical definitions exist for main-study, refinement, side-study, inheritance
- Verify templates are versioned/frozen for downstream use
- Verify deferred loadout boundary is explicit

### Phase 2 — Main Discipline Pass
- Verify all 8 disciplines fill the approved template
- Verify each discipline includes explicit non-goals and core-loop protections
- Verify no discipline depends on final slot counts

### Phase 3 — Side-Study / Refinement Pass
- Verify all boundary references use allowed placeholders
- Verify refinement does not mutate schema or become disguised inheritance
- Verify side-study does not replace main-loop closure

### Phase 4 — Inheritance Clusters
- Verify cluster ownership is disjoint
- Verify every inheritance conforms to schema and preserves 2/3 anchors
- Verify shared rule changes are escalated, not silently edited in-cluster

### Phase 4.5 — School-Coherence Checkpoint
- Verify every school receives pass / revise / block
- Verify overlaps, identity theft, and internal differentiation are logged
- Verify blocked schools cannot enter Phase 5

### Phase 5 — Build Audit
- Verify pure-main and mixed-build matrices are produced
- Verify no mandatory tax pick emerges from side-study/inheritance interactions
- Verify no hidden dependence on deferred slot/loadout rules
- Verify low-magic and cross-school conflict checks run

### Phase 6 — Compile
- Verify canon is composed only from gate-passed outputs
- Verify decision-log / redlines / change-log reconcile with compiled canon
- Verify rejected or revise-state material is excluded from canon

## Global checks
- Verify advisors are invoked only on trigger conditions and remain non-voting
- Verify orchestrator tie-break and user escalation rules are explicit
- Verify `ralph` fallback is used only when measurable triggers are hit
- Verify team lane map distinguishes parallel vs serial phases

## Residual-risk checks
- Reconcile 16-core-vs-24-equal-depth inheritance stance before drafting
- Reconcile deferred slot/loadout boundary wording across source docs before drafting
- Scaffold `docs/design/*` and `docs/working/*` cleanly before any content generation
