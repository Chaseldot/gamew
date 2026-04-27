# Art Assets Showcase Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the website around the new `art-assets/` library and simplify the global navigation.

**Architecture:** Keep the static website architecture. Update structured content in `content/12-website-assets/web_export.json`, regenerate `site/data.js`, copy selected art assets into `site/assets/art/`, and update rendering/tests to reflect the new nav and gallery taxonomy.

**Tech Stack:** Static HTML, CSS, ES modules, Node test runner, Python static server.

---

### Task 1: Lock Navigation Behavior With Tests

**Files:**
- Modify: `docs/reference/website-blueprint/site/tests/site-content.test.mjs`

**Step 1: Write the failing test**

Change expected navigation to:

```js
const expectedTopNavPages = [
  'index.html',
  'world.html',
  'stories.html',
  'systems.html',
  'art.html',
];
```

Assert `data.navPages.map((page) => page.href)` equals those five pages, while all HTML child pages still exist and reference shared assets.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/site-content.test.mjs`

Expected: FAIL because `navPages` still contains 12 entries.

### Task 2: Add Art Library Metadata

**Files:**
- Modify: `docs/reference/website-blueprint/content/12-website-assets/web_export.json`
- Modify: `docs/reference/website-blueprint/scripts/build-site-data.mjs`
- Generate: `docs/reference/website-blueprint/site/data.js`

**Step 1: Update the source export**

Set `navPages` to the five approved top-level pages. Add gallery records for chapter maps, chapter key art, location concepts, scenes, combat images, and character exploration based on `art-assets/`.

**Step 2: Regenerate data**

Run: `npm run build:data`

Expected: `site/data.js` reflects the source export.

### Task 3: Copy Web Art Assets

**Files:**
- Add/modify files in: `docs/reference/website-blueprint/site/assets/art/`

**Step 1: Copy selected art assets**

Copy web-facing images from `art-assets/` into `site/assets/art/`, preserving Chinese filenames and avoiding `.DS_Store`.

**Step 2: Verify dimensions**

Run: `npm test -- tests/site-content.test.mjs`

Expected: any strict concept/scene/combat images referenced by the gallery exist and are 3840x2160.

### Task 4: Update Art Page Rendering

**Files:**
- Modify: `docs/reference/website-blueprint/site/app.js`
- Modify: `docs/reference/website-blueprint/site/styles.css`

**Step 1: Render new filters**

Update gallery filters to match the new types: all, map, key art, location concept, scene, combat, character.

**Step 2: Add art-library summary**

Show a compact summary of asset categories on the art page before the gallery grid.

**Step 3: Run tests**

Run: `npm test`

Expected: all site tests pass.

### Task 5: Verify In Browser

**Files:**
- No source changes expected.

**Step 1: Start the static server**

Run: `npm run serve`

**Step 2: Inspect pages**

Open `http://127.0.0.1:5173` and verify the nav has five items, the art page loads images, filters work, and the lightbox opens images.

