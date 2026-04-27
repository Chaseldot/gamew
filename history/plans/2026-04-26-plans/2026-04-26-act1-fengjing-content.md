# 第一章《封境》文本资产 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 `script.md` 中第一章《封境》扩写成可用于后续剧本、任务设计、网站子页面和美术生成的完整文本样板。

**Architecture:** 先建立全局故事圣经，再建立第一章章节文档、选择后果矩阵和站点内容映射。所有新增内容保持 Markdown 文档资产，不在本切片重构网站或生成图片。

**Tech Stack:** Markdown 文档、现有 `script.md` canon、`docs/design/*.md` 设计文档、shell/rg 文本一致性检查。

---

### Task 1: Update Active Planning Files

**Files:**
- Modify: `ops/runs/task_plan.md`
- Modify: `ops/runs/findings.md`
- Modify: `ops/runs/progress.md`

**Step 1: Replace active task context**

Update the root planning files so the current task is “第一章《封境》文本资产样板”, not the already completed showcase site.

**Step 2: Preserve completed site status**

Keep the completed site work referenced as prior context, but move active checklists to the new text-first content task.

**Step 3: Verify**

Run:

```bash
sed -n '1,220p' ops/runs/task_plan.md
sed -n '1,220p' ops/runs/findings.md
sed -n '1,220p' ops/runs/progress.md
```

Expected: all three files describe the current Act 1 text-first task.

### Task 2: Create Global Story Bible

**Files:**
- Create: `docs/story/00-story-bible.md`

**Step 1: Write global rules**

Create sections for:

- project premise and three-act structure;
- BG3-style structural references translated into original wuxia rules;
- four-person active party and camp/bench rules;
- origin character and 无名煞 rules;
- task multi-solution standard;
- long-term consequence and variable naming rules;
- image/site sequencing rule: text first, site second, image last.

**Step 2: Verify against existing canon**

Run:

```bash
rg -n "四人|无名煞|照影牒针|三章|任务多解|图片" docs/story/00-story-bible.md
```

Expected: all global requirements are present in the new story bible.

### Task 3: Create Act 1 Chapter Bible

**Files:**
- Create: `docs/story/01-act1-fengjing.md`

**Step 1: Define chapter frame**

Create sections for:

- chapter theme, player objective, start state and end state;
- 山水县境 location map;
- chapter factions;
- companion and key NPC state;
- main quest table A1-M01 to A1-M04;
- side quest table A1-S01 to A1-S06.

**Step 2: Expand main quests**

For each main quest, include:

- trigger;
- objective;
- primary scenes;
- minimum three solution paths;
- relevant companion hooks;
- 无名煞 hook when appropriate;
- failure-forward outcome;
- variable writes.

**Step 3: Expand side quests**

For each side quest, include:

- purpose;
- encounter structure;
- solution paths;
- reward/consequence;
- connection to the watergate finale or later chapters.

**Step 4: Add story samples**

Add brief but usable scene text for:

- A1-M01 rain-night awakening;
- A1-M02 clinic diagnosis;
- A1-M04 watergate confrontation;
- one camp scene that demonstrates companion response to 无名煞.

**Step 5: Verify**

Run:

```bash
rg -n "A1-M0[1-4]|A1-S0[1-6]|桑芷|唐小砚|柳听弦|韩霜铁|谢停云|裴照|白微尘|何其庸|楚横山|无名煞" docs/story/01-act1-fengjing.md
```

Expected: all Act 1 tasks and major characters are present.

### Task 4: Create Branch Matrix

**Files:**
- Create: `docs/story/02-act1-branch-matrix.md`

**Step 1: Define variable registry**

List all first-chapter variables, including:

- `A1_SHANSHUI_STATE`
- `A1_MAGISTRATE_STATUS`
- `A1_BANDIT_ALLIANCE`
- `A1_SANG_TRUST`
- `A1_TANG_WATERGATE_FIX`
- `A1_FIRST_TIE_KEY`
- `A1_DARK_ORIGIN_WITNESSES`

**Step 2: Map choices to consequences**

Create matrices for:

- opening rescue / abandonment / murder witness choices;
- clinic diagnosis and evidence choices;
- three route choices out of the county;
- watergate finale outcomes;
- companion recruitment and trust gates;
- second- and third-act callbacks.

**Step 3: Verify**

Run:

```bash
rg -n "A1_SHANSHUI_STATE|A1_MAGISTRATE_STATUS|A1_BANDIT_ALLIANCE|A1_SANG_TRUST|A1_TANG_WATERGATE_FIX|A1_FIRST_TIE_KEY|A1_DARK_ORIGIN_WITNESSES" docs/story/02-act1-branch-matrix.md
```

Expected: every required variable is present with choice and consequence data.

### Task 5: Create Site Content Map

**Files:**
- Create: `docs/story/03-site-content-map.md`

**Step 1: Define future pages**

Specify how the site should split into child pages:

- `index.html`
- `world.html`
- `systems.html`
- `story-act1.html`
- `quests.html`
- `companions.html`
- `factions.html`
- `art.html`

**Step 2: Map content sources**

For each page, list the source docs, content blocks, expected interaction pattern and image requirements.

**Step 3: Defer images**

Record that all new image prompt and filename work happens only after text content is accepted. Concept/scene/combat images must be 3840x2160 high quality; other assets use fit-for-purpose dimensions.

**Step 4: Verify**

Run:

```bash
rg -n "index.html|world.html|systems.html|story-act1.html|quests.html|companions.html|factions.html|art.html|3840x2160" docs/story/03-site-content-map.md
```

Expected: every child page and image rule is present.

### Task 6: Consistency Review

**Files:**
- Read: `script.md`
- Read: `docs/design/01-game-design-milestone.md`
- Read: `docs/story/*.md`
- Modify: `ops/runs/findings.md`
- Modify: `ops/runs/progress.md`

**Step 1: Search for core terms**

Run:

```bash
rg -n "照影牒针|缉武司|同尘盟|照影局|无名煞|四人|桑芷|唐小砚|龙王庙水闸" docs/story script.md docs/design/01-game-design-milestone.md
```

**Step 2: Check contradictions**

Confirm:

- first chapter does not contradict the existing three-act outline;
- companions are combat-capable and map to disciplines;
- all key tasks have at least three solution paths or a clear reason for fewer;
- failures forward into new states;
- site work remains text-first, with image generation deferred.

**Step 3: Record result**

Update `ops/runs/findings.md` and `ops/runs/progress.md` with completed files and any remaining risks.

**Step 4: Final verification**

Run:

```bash
find docs/story -maxdepth 1 -type f -name '*.md' -print | sort
wc -l docs/story/*.md
```

Expected: four story docs exist with enough text mass to drive the next site slice.
