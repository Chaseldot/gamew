# Wuxia Systems Finalization Workflow

Date: 2026-04-24
Scope: main disciplines, inheritances, main-study / refinement / side-study systems for the low-magic wuxia CRPG.
Grounding: `docs/plans/2026-04-24-wuxia-crpg-flow-paths-summary.md`, `docs/plans/2026-04-24-game-setting-multi-agent-workflow.md`, `findings.md`, `progress.md`.

## Compact RALPLAN-DR

### Principles
1. Freeze upstream rules before parallel generation.
2. Organize agents by artifact and gate, not by taste/persona.
3. Preserve identity through templates, redlines, and explicit workflow control artifacts.
4. Audit at two levels: school coherence first, cross-build/system coherence second.

### Decision Drivers
1. Many top-level combat/build constraints are already frozen, so this workflow must converge rather than ideate.
2. The main failure mode is drift across artifacts: main discipline -> side-study/refinement -> inheritances -> builds/loadout assumptions.
3. Reusability depends on stable ownership, explicit handoff artifacts, and swappable advisory lenses.

### Viable Options
#### Option A — Keep identity-based roster
- Pros: quick to start; high flavor pressure; useful for early ideation.
- Cons: weak ownership boundaries; hard to reproduce; invites authority conflicts and aesthetic drift; poor auditability.

#### Option B — Pure artifact/stage pipeline
- Pros: reusable; clear gates; outputs are diffable/auditable; strongest governance.
- Cons: can miss local school-level synthesis unless an intermediate checkpoint is added.

#### Option C — Artifact/stage core roster with advisory lenses and school-coherence checkpoint
- Pros: reusable; preserves governance; keeps CRPG/wuxia validation; captures best part of school-pod synthesis without making pods primary owners.
- Cons: slightly more orchestration overhead.

## Recommendation
Choose Option C. Keep the core roster artifact/stage-based, use CRPG-systems and wuxia-reference experts as advisory review lenses, and add an explicit school-coherence checkpoint before central build audit.

## Workflow Control Artifacts

1. `docs/working/baseline-snapshot.md`
   - Owner: Orchestrator
   - Definition: the frozen, round-specific source of truth containing approved rules, approved templates, approved redlines, unresolved-but-deferred items, and current phase entry assumptions.
   - Rule: if it is not in the baseline snapshot, it is not canon input for the round.
2. `docs/working/agent-queue.md`
   - Owner: Orchestrator
   - Purpose: bounded assignments, file ownership, inputs/outputs, non-goals, gate targets
3. `docs/working/decision-log.md`
   - Owner: Orchestrator, with append rights for owning stage agent
   - Purpose: accepted/rejected options, rationale, downstream impact, escalation notes
4. `docs/working/conflict-redlines.md`
   - Owner: Build/Audit Agent
   - Purpose: identity drift, low-magic violations, role overlap, interface breaks, school conflicts
5. `docs/working/change-log.md`
   - Owner: Compile Agent
   - Purpose: canon deltas, re-audit requirements, baseline carry-forward notes

## Decision Rights / Escalation Path
- **Stage owner decides** within the scope of that phase if the decision does not violate the baseline snapshot or phase gate.
- **Orchestrator breaks ties** across phases, across schools, or across advisor comments.
- **Build/Audit Agent can block compile** on unresolved rule conflicts, identity drift, low-magic violations, or hidden dependency on deferred loadout/slot assumptions.
- **School-Coherence Reviewer can block a school from entering central build audit** if Phase 4.5 fails.
- **Advisors may redline and recommend** but are not voting peers and do not approve/deny canon by themselves.
- **User escalation is required only when**: a requested change would reopen already-frozen top-level combat/build philosophy; a decision materially changes scope to include deferred loadout/meridian-slot design; or two viable options remain with different product priorities and no baseline rule resolves the tie.

## Advisor Trigger Conditions
- **CRPG Systems Reference Reviewer** is invoked when a phase proposes resource loops, progression interfaces, build incentives, role protection, or cross-system coupling that could affect system clarity or CRPG viability.
- **Wuxia Reference Reviewer** is invoked when a phase proposes school identity, inheritance fantasy, low-magic boundary interpretation, martial semantics, or Jianghu-style differentiation.
- **Fantasy Pressure Reviewer** is invoked only in Phase 5 when outputs are mechanically valid but may lack compelling player fantasy or aspirational build appeal.
- Advisors review after draft completion and before phase exit, except when the Orchestrator requests an early redline on a likely-risky lane.
- Advisors are **advisory reviewers only**: they annotate, redline, and recommend; they do not own artifacts, vote, or break ties.

## Scope Boundary: Deferred Loadout / Meridian-Slot Scope

Recommendation: keep loadout / meridian-slot numbers and full equip rules **out of scope for this round**, with a hard interface contract.

### Required placeholders
Every artifact that touches the boundary must use these placeholders exactly:
- `LOADOUT_INTERFACE_PENDING`
- `MERIDIAN_SLOT_COUNT_PENDING`
- `SLOT_PRESSURE_ASSUMPTION_ONLY`

### Allowed statements
- Main disciplines may state only **allowed influence range** and **core protections**.
- Side-study/refinement work may state only **slot pressure assumptions**, not final slot counts or unlock tables.
- Inheritances may reference loadout/slot assumptions only as conditional notes, never as defining requirements.
- Build audit may test whether an artifact remains valid under multiple plausible slot-count futures.

### Forbidden edits / non-goals
- No exact meridian-slot counts.
- No final loadout schema, equip matrices, or slot unlock progression.
- No inheritance or side-study that requires a specific slot count to function.
- No hidden balancing by assuming generous or tight slot budgets without declaring `SLOT_PRESSURE_ASSUMPTION_ONLY`.

### Enforcement checks
- Orchestrator checks placeholders are present where boundary references exist.
- School-Coherence and Build/Audit explicitly flag any artifact that turns a placeholder into a de facto final rule.
- Compile rejects any artifact containing final slot counts or unresolved hidden dependencies.

If later brought into scope, assign a dedicated **Loadout Interface Agent** after schema lock and before inheritance work.

## Recommended Workflow

### Phase 0 — Baseline Freeze
**Owner:** Orchestrator  
**Inputs:** summary doc, findings, progress, prior workflow draft  
**Outputs:** updated baseline snapshot; active redlines; open-questions list; agent queue  
**Control artifacts touched:** baseline snapshot, agent queue  
**Entry criteria:** source docs read; current frozen combat/build decisions identified; current round scope excludes plot/chapter anchors  
**Exit criteria:** baseline snapshot lists approved rules/templates/redlines/deferred items; agent queue assigns bounded ownership and non-goals  
**Acceptance criteria:** every downstream phase can point to one frozen source of truth; deferred loadout/slot boundary is explicitly recorded  
**Verification:** Orchestrator checklist against summary/findings/progress; confirm each frozen rule appears once in baseline snapshot  

### Phase 1 — System Schema Lock
**Owner:** Rule Schema Agent  
**Inputs:** frozen baseline  
**Outputs:** canonical definitions for main-study, refinement, side-study, inheritance; template checklist; identity redlines; scope note for deferred loadout/slot interface  
**Control artifacts touched:** decision log, baseline snapshot  
**Entry criteria:** baseline snapshot frozen; templates and unresolved boundaries visible  
**Exit criteria:** all four terms have canonical definitions; templates are stable; no unresolved term ambiguity remains for downstream phases  
**Acceptance criteria:** downstream agents can fill templates without redefining terms; loadout/slot scope remains explicitly deferred  
**Verification:** schema review against baseline snapshot; CRPG/Wuxia advisors triggered if definitions affect system clarity or wuxia semantics  

### Phase 2 — Main Discipline Pass
**Owner:** Main Discipline Agent  
**Advisory reviewers:** CRPG Systems Reviewer, Wuxia Authenticity Reviewer  
**Inputs:** schema lock; 5-field main-discipline template  
**Outputs:** 8 discipline entries with role, resource loop, combat skeleton, pure-main endpoint, allowed side-study influence range  
**Control artifacts touched:** decision log  
**Entry criteria:** schema lock passed; template fixed; discipline list fixed  
**Exit criteria:** all 8 disciplines drafted and reviewed; each has identity anchors and explicit non-goals  
**Acceptance criteria:** each discipline has a distinct combat identity, explicit protection of its core loop, and no hidden dependency on deferred loadout/slot details  
**Verification:** cross-discipline uniqueness pass; advisor redline pass on CRPG viability and wuxia fit  

### Phase 3 — Side-Study / Refinement Pass
**Owner:** Side-Study & Refinement Agent  
**Advisory reviewers:** CRPG Systems Reviewer, Wuxia Authenticity Reviewer  
**Inputs:** schema lock; discipline outputs; 1/2/3-point side-study grammar; frozen refinement philosophy  
**Outputs:** side-study ladder per discipline; refinement return-on-investment rules; interface redlines  
**Control artifacts touched:** decision log  
**Entry criteria:** main discipline outputs approved; side-study grammar and refinement philosophy frozen  
**Exit criteria:** all disciplines have side-study/refinement expressions and boundary notes  
**Acceptance criteria:** side-study cannot replace the main loop; refinement strengthens the main body without inheriting transmission identity; all boundary references use required placeholders  
**Verification:** interface audit against deferred loadout contract; advisor pass on build clarity and wuxia plausibility  

### Phase 4 — Inheritance Cluster Pass
**Owner:** Inheritance Cluster Agents (parallel)  
**Advisory reviewers:** CRPG Systems Reviewer, Wuxia Authenticity Reviewer  
**Inputs:** schema lock; approved discipline outputs; approved side-study/refinement boundaries; 7-field inheritance template  
**Outputs:** inheritance blueprints with combat fantasy, loop, resource relation, signature mechanics, boundaries, side-study effect envelope  
**Control artifacts touched:** decision log  
**Partition rule:** split by stable school clusters with no overlapping write ownership; each inheritance belongs to exactly one cluster; shared template/rule changes are forbidden in this phase and must escalate to Orchestrator  
**Merge rule:** cluster outputs merge only after passing local completeness check and schema conformance check; merge order is irrelevant because shared files are append-by-assigned-section only  
**Entry criteria:** Phases 1–3 passed; cluster ownership assigned in agent queue  
**Exit criteria:** every inheritance drafted; cluster-local conflicts logged; outputs schema-conformant  
**Acceptance criteria:** each inheritance preserves at least 2 of 3 anchors (resource relation / action structure / signature mechanic) and does not require unresolved loadout/slot rules  
**Verification:** cluster-local self-check + advisor review on identity and system shape  

### Phase 4.5 — School-Coherence Checkpoint
**Owner:** School-Coherence Reviewer or small school pod led by Orchestrator  
**Inputs:** one school's main-discipline entry + side-study/refinement entry + all inheritances for that school  
**Outputs:** school coherence memo per school: internal differentiation, shared identity anchors, forbidden overlaps, unresolved tensions  
**Control artifacts touched:** conflict redlines, decision log  
**Entry criteria:** all inheritance drafts for the school exist and passed Phase 4 local checks  
**Outcomes:**
- **Pass:** school may enter Phase 5
- **Revise:** return only the affected school lane to the owning phase/cluster with explicit redlines
- **Block:** school cannot enter Phase 5 until Orchestrator resolves structural conflict or escalates to user if baseline/scope must change
**Exit criteria:** every school is marked pass, revise, or block  
**Acceptance criteria:** each school reads as one family with differentiated branches; no inheritance steals another lane; no side-study expression erases school identity  
**Verification:** memo checklist against anchors, overlaps, and redlines; blocked/revise outcomes recorded in decision log  

### Phase 5 — Build Audit & Cross-System Stress Test
**Owner:** Build/Audit Agent  
**Advisory reviewer:** optional Fantasy Pressure Reviewer for aspiration gaps only  
**Inputs:** all school-coherence-passed artifacts  
**Outputs:** pure-main vs mixed-build examples; overlap report; rule conflicts; low-magic violations; exploit / identity drift list  
**Control artifacts touched:** conflict redlines, decision log  
**Entry criteria:** all schools either passed Phase 4.5 or have been explicitly removed from round scope  
**What build audit validates:**
- pure-main builds are functional, rewarding, and not dominated by mixed builds
- mixed builds have real tactical identities without replacing main-discipline closure
- side-study interfaces create options, not mandatory tax picks
- refinement rewards depth without becoming a disguised inheritance layer
- no low-magic boundary breaks
- no cross-school ecosystem collapse or exploit loops
- no hidden dependency on deferred loadout/slot rules
**Exit criteria:** all material conflicts are resolved, returned, or explicitly blocked from compile  
**Acceptance criteria:** no inheritance or side-study becomes mandatory to make a discipline functional; no unresolved placeholder carries hidden balance weight  
**Verification:** scenario-based build matrix, redline sweep, and optional Fantasy reviewer pass if mechanics are sound but fantasy is flat  

### Phase 6 — Canon Compile
**Owner:** Orchestrator / Compile Agent  
**Inputs:** only gate-passed artifacts  
**Outputs:** merged canon docs + change log + next-round baseline snapshot  
**Control artifacts touched:** change log, baseline snapshot  
**Entry criteria:** prior phases passed or intentionally scoped out; no outstanding blocks  
**Exit criteria:** canon docs updated; change log written; next baseline snapshot frozen from accepted outputs only  
**Acceptance criteria:** rejected/revise items remain outside canon; next round starts only from newly frozen baseline snapshot  
**Verification:** compile checklist against decision log, conflict redlines, and accepted phase outputs  

## Recommended Agent Roster

### Core reusable roster
1. Orchestrator
2. Rule Schema Agent
3. Main Discipline Agent
4. Side-Study & Refinement Agent
5. Inheritance Cluster Agent(s)
6. School-Coherence Reviewer
7. Build/Audit Agent
8. Compile Agent

### Reusable advisory lenses (non-owning)
- CRPG Systems Reference Reviewer
- Wuxia Reference Reviewer
- Optional Fantasy Pressure Reviewer

## Ownership Notes
- The Orchestrator owns workflow state and all control artifacts except `conflict-redlines.md` and `change-log.md`.
- School-level synthesis is a checkpoint, not a replacement for stage governance.
- Advisory reviewers validate, challenge, and redline; they do not co-own canon artifacts.

## Ralph vs Team
Recommendation: use `team` for future execution.

Why:
- The work has natural parallel lanes after schema lock (main disciplines, side-study/refinement, inheritance clusters).
- The school-coherence checkpoint plus central audit/compile gates fit a staged team pipeline better than a single persistent owner loop.
- `ralph` is better for one troubled artifact that repeatedly fails review; this task is mainly structured multi-artifact convergence with bounded handoffs.

### Objective triggers for switching one lane to `ralph`
Switch exactly one lane to `ralph` if any of the following occur:
1. The same lane receives **2 consecutive revise outcomes** at Phase 4.5.
2. The same lane is **blocked once** at Phase 4.5 for a structural conflict that can be solved without reopening top-level philosophy.
3. A lane accumulates **3+ unresolved redlines** across two adjacent phases.
4. A lane repeatedly passes local checks but fails central build audit for the **same root cause twice**.

Use `ralph` only for that lane, with the baseline snapshot and redlines frozen as its local contract.

## Risks If Identity-Based Roster Is Kept As-Is
1. Persona overlap: game design agent and wuxia-superfan fantasy agent will both try to shape canon rather than review it.
2. Non-reproducible output: future rounds depend on which personality is present, not on stable templates and gates.
3. Weak accountability: no single owner is clearly responsible for schema consistency, deferred-interface discipline, and cross-stage handoff quality.
4. Drift toward ideation: reference experts may start generating content instead of validating against frozen constraints.
5. School-level conflicts may be noticed too late because no explicit coherence checkpoint sits between inheritance generation and central build audit.
6. Audit quality drops because disagreements become taste debates instead of artifact diffs against decision log and redlines.

## Rejected Alternatives
1. **Loadout-first / systems-first sequencing**
   - Rejected because loadout/meridian-slot rules remain unresolved and would force premature concretion into currently stable discipline/inheritance work.
2. **Full parallel school development without schema lock**
   - Rejected because it maximizes terminology drift, duplicate rule invention, and later reconciliation cost.
3. **Advisors as voting peers**
   - Rejected because it blurs ownership, weakens tie-breaking, and turns review into committee canon-writing.

## ADR-Style Summary

### Decision
Adopt an artifact/stage-based multi-agent workflow with explicit workflow control artifacts, a hard deferred loadout/meridian-slot interface contract, a school-coherence checkpoint before central build audit, and `team` as the default execution mode.

### Drivers
- Combat/build philosophy is already substantially frozen.
- Finalization risk is governance drift, not lack of ideas.
- The workflow must be reusable for future systems rounds, not tied to a one-off cast of personas.

### Alternatives considered
- Identity-based expert roster as primary structure: rejected for weak reproducibility and ownership drift.
- Loadout-first / systems-first sequencing: rejected for premature concretion around unresolved slot rules.
- Full parallel school development without schema lock: rejected for terminology and rule drift.
- Advisors as voting peers: rejected for accountability blur.

### Why chosen
It preserves the strongest part of the prior draft—artifact/stage governance and explicit gates—while adding phase criteria, decision rights, reviewer triggers, deferred-interface enforcement, school-level coherence absorption, and objective lane-escalation rules.

### Consequences
- Slightly more orchestration overhead.
- Stronger auditability, replayability, and future reuse.
- Better fit for team-mode execution and later extension into adjacent systems.

### Follow-ups
- If loadout/meridian-slot design becomes urgent, add a dedicated Loadout Interface Agent in a later round.
- If one school repeatedly fails coherence review, spin that lane into a temporary `ralph` sub-loop.
