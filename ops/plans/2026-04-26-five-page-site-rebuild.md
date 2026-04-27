# Five Page Site Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the old multi-child-page website with a real five-page showcase where Story carries the classic route work and Art carries the new asset library.

**Architecture:** Keep the static site under `showcase/site`, but replace the old data-driven child-page renderer with a compact five-page renderer. Keep generated `data.js` for canonical arrays and gallery data, add story content exported from `classic-route-showcase.md`, and convert old child pages into redirects.

**Tech Stack:** Static HTML, CSS, ES modules, Node test runner, Python static server.

---

### Task 1: Write Failing Site Architecture Tests

**Files:**
- Modify: `showcase/site/tests/site-content.test.mjs`

**Steps:**
1. Assert only five canonical pages are content pages: `index.html`, `world.html`, `stories.html`, `systems.html`, `art.html`.
2. Assert old pages contain a meta refresh or script redirect to the approved new page.
3. Assert `stories.html` renders from `classic-route-showcase.md` through exported story sections.
4. Run tests with bundled Node and verify they fail against the current site.

### Task 2: Export Classic Route Story Data

**Files:**
- Modify: `showcase/scripts/build-site-data.mjs`
- Modify generated: `showcase/site/data.js`

**Steps:**
1. Add `classicRouteStory` to the generated exports.
2. Parse headings and body blocks from `content/03_Main_Story/classic-route-showcase.md`.
3. Attach selected art image paths to major story sections.
4. Regenerate `site/data.js`.

### Task 3: Rewrite Five-Page Renderer

**Files:**
- Replace major sections in: `showcase/site/app.js`
- Modify: `showcase/site/styles.css`

**Steps:**
1. Keep shared helpers and lightbox.
2. Replace old render functions with five page renderers.
3. Home uses five-entry navigation and highlight bands only.
4. World consolidates regions, factions, and characters.
5. Story renders `classicRouteStory` and story art.
6. Systems consolidates disciplines, milestones, and codex.
7. Art keeps the expanded gallery.

### Task 4: Convert Old Pages Into Redirects

**Files:**
- Replace: `regions.html`, `factions.html`, `characters.html`, `quests.html`, `branches.html`, `story-act1.html`, `companions.html`, `codex.html`

**Steps:**
1. Generate minimal HTML redirect pages with canonical destination links.
2. Preserve stylesheet reference for a readable fallback.
3. Run tests to verify old navigation no longer appears.

### Task 5: Verify

**Files:**
- No source changes expected.

**Steps:**
1. Run `node --test tests/*.test.mjs` with bundled Node.
2. Start `python3 -m http.server 5173 --directory .`.
3. Check HTTP `200` for five main pages and selected art assets.
4. Confirm old pages redirect target text with `curl`.

