# Game Setting Multi-Agent Workflow Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:dispatching-parallel-agents when 2+ work domains are independent.

**Goal:** Build a stable multi-agent workflow to iteratively refine the wuxia CRPG setting without rule drift, identity drift, or cross-document conflict.

**Architecture:** One human/lead editor maintains a single frozen baseline and dispatches specialized agents into bounded work domains. Agents never free-write final canon; they fill fixed templates, produce decision sheets, and pass through audit before merge. The workflow is intentionally “baseline first, parallel second, audit before compile.”

**Tech Stack:** Markdown docs, Codex subagents, fixed content templates, frozen baseline snapshots, audit checklist.

---

## 1. Recommended File Layout

### Canon / Draft Targets
- Create: `docs/design/00-rule-bible.md`
- Create: `docs/design/01-main-disciplines.md`
- Create: `docs/design/02-inheritances.md`
- Create: `docs/design/03-side-studies-and-loadout.md`
- Create: `docs/design/04-build-examples-and-audit.md`

### Workflow Control Files
- Create: `docs/working/decision-log.md`
- Create: `docs/working/baseline-snapshot.md`
- Create: `docs/working/conflict-redlines.md`
- Create: `docs/working/change-log.md`
- Create: `docs/working/agent-queue.md`

### Source Inputs
- Read: `docs/plans/2026-04-24-wuxia-crpg-flow-paths-summary.md`
- Read: `ops/runs/task_plan.md`
- Read: `ops/runs/findings.md`
- Read: `ops/runs/progress.md`

---

## 2. Non-Negotiable Workflow Rules

1. **Single baseline source**
   - Every agent reads from `docs/working/baseline-snapshot.md` first.
   - If it is not in the latest baseline snapshot, treat it as non-canon.

2. **Fixed templates only**
   - Main-discipline work must use the approved 5-field template.
   - Inheritance work must use the approved 7-field template.
   - Side-study work must use the approved 1/2/3-point template.
   - Agents do not submit freeform essays as canon candidates.

3. **Audit before compile**
   - No output goes directly into `docs/design/*.md`.
   - Every candidate goes through redline/audit review first.

4. **Conflict priority**
   - Approved top-level rules > approved templates > local creativity.

5. **No reverse definition**
   - Inheritances may not redefine the main discipline.
   - Side-studies may not redefine the inheritance.

---

## 3. Agent Roster and Ownership

### Agent 0: Lead Editor / Orchestrator
**Owns:** `docs/working/baseline-snapshot.md`, `docs/working/agent-queue.md`, final approvals

**Responsibilities:**
- Freeze baseline before each round
- Assign bounded tasks
- Reject scope creep
- Resolve conflicts
- Decide what enters canon

### Agent 1: Rule Bible Agent
**Owns:** `docs/design/00-rule-bible.md`

**Responsibilities:**
- Normalize terms and naming
- Maintain low-magic redlines
- Keep top-level definitions of main study / refinement / side study / inheritance aligned

### Agent 2: Main Discipline Agent
**Owns:** `docs/design/01-main-disciplines.md`

**Responsibilities:**
- Fill the 5-field template for all 8 disciplines
- Define core role, resource loop, 3-stage combat skeleton, pure-main endpoint, side-study influence range

### Agent 3: Inheritance Agent Cluster
**Owns:** `docs/design/02-inheritances.md`

**Recommended parallel split:**
- Agent 3A: 游锋 / 破军 / 拳掌
- Agent 3B: 射艺 / 影踪
- Agent 3C: 药师 / 音律 / 奇门

**Responsibilities:**
- Fill the 7-field template for all 24 inheritances
- Preserve inheritance identity anchors
- Differentiate same-school inheritances without MMO-role flattening

### Agent 4: Side Study / Loadout Agent
**Owns:** `docs/design/03-side-studies-and-loadout.md`

**Responsibilities:**
- Define side-study 1/2/3-point expressions per school
- Define loadout / meridian-slot / practice-slot assumptions when needed
- Define where side studies can influence vs cannot overreach

### Agent 5: Build & Audit Agent
**Owns:** `docs/design/04-build-examples-and-audit.md`, `docs/working/conflict-redlines.md`

**Responsibilities:**
- Validate pure-main vs mixed-build win conditions
- Produce sample builds
- Catch identity drift, ecosystem overlap, low-magic violations, rule conflicts

### Agent 6: Compile Agent
**Owns:** final merge into `docs/design/*.md`

**Responsibilities:**
- Compile only approved material
- Never invent new canon
- Update change log and baseline snapshot after merge

---

## 4. Required Round Artifacts

Every round must produce all of the following:

### A. Decision Sheet
**File:** `docs/working/decision-log.md`

Columns:
- Topic
- Candidate options
- Final decision
- Reason
- Impacted files
- Follow-up required?

### B. Template Fill Table
- Main discipline candidates: 5 fields each
- Inheritance candidates: 7 fields each
- Side-study candidates: 1/2/3-point progression table

### C. Conflict / Redline Table
**File:** `docs/working/conflict-redlines.md`

Checks:
- Low-magic boundary broken?
- Main loop overwritten?
- Inheritance identity drifted?
- Neighboring school ecosystem invaded?
- Existing approved rule contradicted?

### D. Change Log
**File:** `docs/working/change-log.md`

Fields:
- What changed
- Why
- Which canon docs changed
- Whether re-audit is required

### E. Frozen Baseline Snapshot
**File:** `docs/working/baseline-snapshot.md`

Contains:
- Latest approved top-level rules
- Latest approved templates
- Latest approved school / inheritance summaries
- Open questions explicitly marked as unresolved

---

## 5. Dependency Graph

### Serial dependencies
1. **Rule Bible** must stabilize before other domains write canon candidates.
2. **Main Disciplines** must stabilize before **Inheritances**.
3. **Main Disciplines + Inheritances + Side Studies** must all stabilize before **Build & Audit**.
4. **Audit** must pass before **Compile**.

### Safe parallel windows
- **Main Disciplines** and **Side Studies / Loadout** can run in parallel after the rule bible is frozen.
- **Inheritances** can run in parallel by school cluster after the corresponding main-discipline entries are frozen.
- **Build & Audit** should remain mostly centralized, not widely parallelized.

---

## 6. One Full Round (Operational Sequence)

### Task 1: Freeze the baseline
**Files:**
- Modify: `docs/working/baseline-snapshot.md`
- Modify: `docs/working/agent-queue.md`

**Step 1:** Copy all approved decisions from `ops/runs/findings.md` and current canon docs into `baseline-snapshot.md`.

**Step 2:** Write this round’s queue into `agent-queue.md` using bounded scopes only.

**Step 3:** Mark unresolved questions explicitly so agents do not silently “solve” them.

### Task 2: Dispatch independent agents in parallel
**Files:**
- Read: `docs/working/baseline-snapshot.md`
- Read: `docs/working/agent-queue.md`
- Modify: candidate draft files under `docs/design/` or `docs/working/`

**Step 1:** Dispatch one agent per independent domain.

**Step 2:** Give each agent:
- exact file ownership
- exact template to fill
- explicit non-goals
- explicit redlines

**Step 3:** Do not allow overlapping write ownership in the same round.

### Task 3: Run audit pass
**Files:**
- Modify: `docs/working/conflict-redlines.md`
- Modify: `docs/working/decision-log.md`

**Step 1:** Audit every candidate against top-level rules.

**Step 2:** Reject or return anything that:
- overwrites a main loop
- breaks low-magic boundaries
- blurs inheritance identity
- consumes another school’s ecosystem

**Step 3:** Record accepted/rejected decisions in `decision-log.md`.

### Task 4: Compile approved material
**Files:**
- Modify: `docs/design/*.md`
- Modify: `docs/working/change-log.md`
- Modify: `docs/working/baseline-snapshot.md`

**Step 1:** Compile only approved material into canon docs.

**Step 2:** Update `change-log.md`.

**Step 3:** Freeze a new baseline snapshot for the next round.

---

## 7. Recommended Agent Prompts

### Prompt A: Main Discipline Agent
Fill the approved 5-field template for the assigned schools only.
Do not create inheritances.
Do not redefine top-level rules.
Do not solve loadout systems unless the baseline explicitly asks for it.
Return only candidate entries plus any redline concerns.

### Prompt B: Inheritance Agent
Fill the approved 7-field template for the assigned inheritances only.
Treat the corresponding main-discipline entry as immutable input.
Do not invent new top-level mechanics.
For every inheritance, preserve at least two identity anchors: resource relation, action structure, signature mechanic.
Return only candidate entries plus boundary notes.

### Prompt C: Side Study Agent
Fill the 1/2/3-point side-study table for the assigned schools.
1 point = entry, 2 points = interface, 3 points = mini-loop.
You may affect resource flow, but you may not rewrite resource rules.
Return only candidate entries plus overreach warnings.

### Prompt D: Audit Agent
Do not write new setting content.
Only check for contradictions, drift, ecosystem theft, low-magic violations, and template incompleteness.
Return a pass/fail matrix with required revisions.

---

## 8. Acceptance Checklist for the Orchestrator

A round is not complete unless all are true:

- [ ] Every output used the correct fixed template
- [ ] No unresolved contradiction remains hidden inside prose
- [ ] Each main discipline still reads as itself
- [ ] Each inheritance still preserves at least 2 identity anchors
- [ ] Side studies enhance but do not replace the main loop
- [ ] Pure-main and mixed builds still have different win conditions
- [ ] Low-magic tone remains intact
- [ ] Neighboring schools do not collapse into each other
- [ ] Canon docs contain only approved material
- [ ] New baseline snapshot is frozen for the next round

---

## 9. Recommended First Execution Order for This Project

### Round 0: Establish workflow control files
Create:
- `docs/working/decision-log.md`
- `docs/working/baseline-snapshot.md`
- `docs/working/conflict-redlines.md`
- `docs/working/change-log.md`
- `docs/working/agent-queue.md`

### Round 1: Freeze rule bible
Target:
- `docs/design/00-rule-bible.md`

### Round 2: Parallelize main disciplines + side studies/loadout
Targets:
- `docs/design/01-main-disciplines.md`
- `docs/design/03-side-studies-and-loadout.md`

### Round 3: Parallelize inheritances by school cluster
Target:
- `docs/design/02-inheritances.md`

### Round 4: Build examples + audit
Target:
- `docs/design/04-build-examples-and-audit.md`

### Round 5: Compile and freeze v1 canon
Targets:
- all `docs/design/*.md`
- `docs/working/baseline-snapshot.md`

---

## 10. What Not to Parallelize

Do **not** parallelize these decisions without a single owner:
- top-level terminology changes
- low-magic boundary changes
- changes to pure-main vs mixed-build philosophy
- changes to side-study redlines
- changes to inheritance identity rules

These should always go through the lead editor first.

---

## 11. Recommended Team Size

For this project, the best practical shape is:
- **1 lead editor/orchestrator**
- **2-4 content agents**
- **1 audit agent**
- **optional 1 compile agent**

That is usually better than 7 fully active writers at once.
Too many simultaneous writers will increase canon drift faster than throughput.

---

## 12. Suggested Immediate Next Move

If you want to start immediately, use this exact launch order:

1. Create workflow control files
2. Freeze `00-rule-bible.md`
3. Dispatch in parallel:
   - Main Discipline Agent
   - Side Study / Loadout Agent
4. After both pass audit, dispatch 3 inheritance-cluster agents
5. Run one centralized audit pass
6. Compile and freeze baseline v1
