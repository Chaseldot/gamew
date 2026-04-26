# Agent Workflow Preserved Notes

Date: 2026-04-25
Status: preserved from prior tool-specific planning notes; safe to use without any external orchestration runtime.

## Purpose

This note keeps the useful workflow decisions from the earlier agent-planning artifacts while removing dependency on the old orchestration files, commands, and directory layout. It should be treated as project guidance, not as executable runtime configuration.

## Stable Workflow Principles

1. Freeze upstream rules before any broad drafting pass.
2. Organize contributors by artifact ownership and review gate, not by taste persona.
3. Keep one round-specific baseline source of truth.
4. Use explicit issue tickets, decision logs, and redlines to prevent silent rule drift.
5. Audit at two levels: first within each school / discipline family, then across builds and systems.
6. Advisors can redline and recommend, but they do not co-own canon.
7. Human acceptance remains the final gate for freezing a version.

## Core Artifacts

| Artifact | Purpose |
|---|---|
| `docs/working/baseline-snapshot.md` | Frozen round-specific source of truth: approved rules, templates, redlines, deferred items, and entry assumptions. |
| `docs/working/agent-queue.md` | Stage assignments, file ownership, inputs, outputs, non-goals, and gate targets. |
| `docs/working/decision-log.md` | Accepted and rejected choices, rationale, downstream impact, and escalation notes. |
| `docs/working/revision-tickets.md` | Actionable problems found by fantasy testing or CRPG review, plus resolution notes. |
| `docs/working/conflict-redlines.md` | Identity drift, low-magic violations, role overlap, interface breaks, and school conflicts. |
| `docs/working/change-log.md` | Canon deltas, re-audit requirements, and baseline carry-forward notes. |

## Staged Production Flow

### Phase 0: Baseline Freeze

Owner: Orchestrator

Inputs:
- Existing design summary
- Current findings and progress notes
- Current working docs

Outputs:
- Updated baseline snapshot
- Active redlines
- Open questions list
- Agent queue

Exit criteria:
- Every downstream phase can point to one frozen source of truth.
- Deferred loadout / slot boundaries are recorded.
- Current round scope excludes plot and chapter anchors unless explicitly reopened.

### Phase 1: System Schema Lock

Owner: Rule Schema role or orchestrator

Outputs:
- Canonical definitions for main-study, refinement, side-study, and inheritance.
- Template checklist.
- Identity redlines.
- Scope note for deferred loadout / slot interface.

Exit criteria:
- Downstream writers can fill templates without redefining terms.
- No unresolved term ambiguity remains.

### Phase 2: Main Discipline Pass

Owner: Main discipline writer

Outputs:
- Eight discipline entries with role, resource loop, combat skeleton, pure-main endpoint, and allowed side-study influence range.

Verification:
- Cross-discipline uniqueness pass.
- CRPG viability review.
- Wuxia identity review.

### Phase 3: Side-Study / Refinement Pass

Owner: Side-study and refinement writer

Outputs:
- Side-study ladder per discipline.
- Refinement return-on-investment rules.
- Interface redlines.

Verification:
- Side-study cannot replace main-loop closure.
- Refinement strengthens the main body without becoming a disguised inheritance layer.
- Any loadout-boundary statement stays under the existing placeholder protocol.

### Phase 4: Inheritance Cluster Pass

Owner: Inheritance cluster writers

Outputs:
- Inheritance blueprints with combat fantasy, loop, resource relation, signature mechanics, boundaries, and side-study effect envelope.

Verification:
- Each inheritance preserves at least two of three anchors: resource relation, action structure, signature mechanic.
- Shared rule changes are escalated instead of silently edited.

### Phase 4.5: School-Coherence Checkpoint

Owner: School-coherence reviewer or orchestrator

Outputs:
- Coherence memo per school / discipline family.
- Internal differentiation notes.
- Forbidden overlap notes.
- Unresolved tensions.

Outcomes:
- Pass: may enter build audit.
- Revise: return affected lane with explicit redlines.
- Block: cannot enter build audit until resolved or escalated.

### Phase 5: Build Audit And Cross-System Stress Test

Owner: CRPG / build audit reviewer

Outputs:
- Pure-main versus mixed-build examples.
- Overlap report.
- Rule conflicts.
- Low-magic violations.
- Exploit and identity-drift list.

Checks:
- Pure-main builds remain functional and rewarding.
- Mixed builds add tactical identity without replacing main closure.
- Side-study interfaces create options, not mandatory tax picks.
- No hidden dependency on deferred loadout / slot rules.

### Phase 6: Canon Compile

Owner: Orchestrator / compile role

Outputs:
- Merged canon docs.
- Change log.
- Next baseline snapshot.

Exit criteria:
- Only gate-passed material enters canon.
- Rejected or revise-state material stays outside canon.
- Next round starts from the newly frozen baseline.

## Human-Gated Fantasy Iteration Loop

Use this loop when the canon is mechanically plausible but player fantasy still needs pressure testing.

Sequence:
1. Fantasy tester adds 3-5 new wuxia / player fantasies.
2. Fantasy tester tests the cumulative suite and opens actionable tickets.
3. Canon writer resolves high-priority tickets in the design docs.
4. CRPG reviewer checks action economy, encounter value, counterplay, party synergy, and layer placement.
5. Canon writer applies or rejects review advice with reasons.
6. Fantasy tester reruns the cumulative suite.
7. Orchestrator produces a round report for human acceptance or another round.

Rules:
- The fantasy test suite is cumulative.
- Human-added fantasies do not count toward the tester's 3-5 new fantasy quota.
- The canon writer is the only role that edits canon during the loop.
- Reviewers write tickets and advice; they do not directly rewrite canon.
- Stop only when the human accepts the current version as the next baseline.

## Preserved Scope Boundaries

Current round boundaries:
- Fixed: main discipline layer.
- Mutable: inheritance, side-study, and role-image / archetype expression.
- Deferred: origin / identity layer for this round.
- Out of scope: plot, chapter anchors, exact loadout counts, exact meridian-slot counts, final equip matrices.

Required placeholder protocol remains:
- `LOADOUT_INTERFACE_PENDING`
- `MERIDIAN_SLOT_COUNT_PENDING`
- `SLOT_PRESSURE_ASSUMPTION_ONLY`

## Residual Risks

1. Persona-style contributors can blur authorship if they directly write canon instead of reviewing.
2. Cumulative fantasy testing can grow expensive, but skipping old tests risks regressions.
3. Loadout and meridian-slot uncertainty means some build conclusions remain conditional.
4. School-level conflicts should be caught before global build audit.
5. A single troubled lane should be isolated and iterated locally instead of reopening the full system.
