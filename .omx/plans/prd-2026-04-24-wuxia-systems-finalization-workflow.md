# PRD — Wuxia Systems Finalization Workflow

Date: 2026-04-24
Source plan: `.omx/plans/2026-04-24-wuxia-systems-finalization-workflow.md`

## Objective
Create a reusable multi-agent workflow that can produce the final design for the low-magic wuxia CRPG's main disciplines, inheritances, main-study / refinement / side-study systems without rule drift, style drift, or cross-document conflicts.

## Problem
The user's initial roster (orchestrator, CRPG reference, wuxia reference, game design, wuxia superfan) is good for ideation but weak for repeatable production because it is persona-centered rather than artifact-centered. That makes ownership blurry, audit weak, and future reuse difficult.

## Users / Consumers
- Current design-finalization round
- Future system-design rounds
- Later execution lanes that need stable source-of-truth docs

## Decision
Use an artifact/stage-based core workflow with advisory lenses:
- Core owners: Orchestrator, Rule Schema, Main Discipline, Side-Study & Refinement, Inheritance Clusters, School-Coherence Reviewer, Build/Audit, Compile
- Advisors only: CRPG Systems Reviewer, Wuxia Reference Reviewer, optional Fantasy Pressure Reviewer
- Default execution mode: `team`
- Single troubled lane fallback: `ralph`

## Why this approach
- Existing combat/build philosophy is already heavily constrained
- The main risk is governance drift, not lack of ideas
- Reusability requires fixed inputs/outputs, gates, and control artifacts

## Required control artifacts
- `docs/working/baseline-snapshot.md`
- `docs/working/agent-queue.md`
- `docs/working/decision-log.md`
- `docs/working/conflict-redlines.md`
- `docs/working/change-log.md`

## Scope
In scope:
- workflow structure
- phase ordering
- decision rights
- audit/verification model
- staffing guidance

Out of scope for this round:
- exact loadout / meridian-slot counts
- final equip schema
- plot / chapter anchors

## Phases
0. Baseline Freeze
1. System Schema Lock
2. Main Discipline Pass
3. Side-Study / Refinement Pass
4. Inheritance Cluster Pass
4.5 School-Coherence Checkpoint
5. Build Audit & Cross-System Stress Test
6. Canon Compile

## Acceptance criteria
- One frozen baseline source of truth exists before drafting
- Every phase has clear owner, inputs, outputs, gates, and verification
- Advisors are bounded to review/redline rather than co-author canon
- Deferred loadout scope is enforced by placeholders and audit checks
- School coherence is checked before global build audit
- Team execution can run in parallel after schema lock with explicit serial gates

## Risks
- Source-of-truth drift across summary / findings / progress must be reconciled in Phase 0
- Deferred slot/loadout rules make some build conclusions conditional
- Missing doc scaffolds can weaken later audit unless created cleanly in the first pass

## ADR
Decision: artifact/stage-based workflow with advisory lenses and team-default execution.
Drivers: heavy existing constraints, drift risk, reuse needs.
Alternatives considered:
- persona-based roster as primary structure — rejected for weak reproducibility
- loadout-first sequencing — rejected because slot rules remain unresolved
- fully parallel school development before schema lock — rejected for drift risk
- advisors as voting peers — rejected for accountability blur
Consequences:
- more orchestration overhead
- better auditability, replayability, and downstream reuse
