# GameW Showcase Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:verification-before-completion before claiming this work is complete.

**Goal:** Build a polished static showcase site for GameW that combines an immersive game homepage with a structured systems, story, character, quest, and art-resource database.

**Architecture:** Implement a dependency-light static site under `site/`. Keep content in `site/data.js`, render interactive sections with `site/app.js`, and validate data plus image dimensions with Node's built-in test runner.

**Tech Stack:** Static HTML, CSS, vanilla ES modules, Node built-in `node:test`, local `sips` for image resizing, optional `gpt-image` CLI only when `OPENAI_API_KEY` is available.

---

### Task 1: Add Failing Validation Test

**Files:**
- Create: `site/tests/site-content.test.mjs`

**Step 1: Write the failing test**

Create tests that assert:

- `site/data.js` exports 8 disciplines.
- `site/data.js` exports 17 inheritances.
- `site/data.js` exports 9 level milestones.
- Every gallery item tagged `concept`, `scene`, or `combat` points to an image that exists and is exactly `3840x2160`.
- `site/index.html` exists and references `styles.css`, `data.js`, and `app.js`.

**Step 2: Run test to verify it fails**

Run: `node --test site/tests/site-content.test.mjs`

Expected: FAIL because the site files and data module do not exist yet.

### Task 2: Build Data and Asset Manifest

**Files:**
- Create: `site/data.js`
- Create: `site/package.json`

**Step 1: Implement site data**

Add structured arrays for:

- site meta;
- level rules;
- 8 disciplines;
- 17 inheritances;
- 3 acts;
- 6 factions;
- 8 companions;
- quest samples and solution tags;
- art gallery records.

**Step 2: Add scripts**

Add package scripts:

```json
{
  "scripts": {
    "test": "node --test tests/*.test.mjs",
    "serve": "python3 -m http.server 5173 --directory ."
  }
}
```

**Step 3: Run test**

Run: `node --test site/tests/site-content.test.mjs`

Expected: still FAIL because images and HTML are not present.

### Task 3: Prepare 4K Art Assets

**Files:**
- Create images under: `site/assets/art/`

**Step 1: Generate browser assets from script scenes**

Use image generation prompts derived from `script.md` to create new concept, scene, and combat images. Existing exploration images may inform style only; do not use them as final site images. Convert final strict gallery files to `3840x2160` JPEG at high quality.

**Step 2: Keep non-4K assets scoped**

Use smaller or original-size files only for character exploration or brand/UI assets, where 4K is not required by the user.

**Step 3: Run test**

Run: `node --test site/tests/site-content.test.mjs`

Expected: FAIL until HTML and app files are created; image dimension assertions should pass once assets exist.

### Task 4: Build Static Site

**Files:**
- Create: `site/index.html`
- Create: `site/styles.css`
- Create: `site/app.js`
- Create: `site/assets/brand/gamew-mark.svg`
- Create: `site/README.md`

**Step 1: Implement HTML shell**

Add semantic sections:

- `hero`;
- `systems`;
- `world`;
- `characters`;
- `factions`;
- `quests`;
- `art`;
- `production`.

**Step 2: Implement rendering**

Use `site/data.js` in `site/app.js` to render tabs, cards, timelines, matrices, gallery filters, and lightbox.

**Step 3: Implement responsive CSS**

Use full-width bands, constrained content, stable grid dimensions, no nested UI cards, and no text-overlapping layouts.

**Step 4: Run test**

Run: `cd site && npm test`

Expected: PASS.

### Task 5: Browser and Visual Verification

**Files:**
- No required file edits unless verification exposes issues.

**Step 1: Start local static server**

Run: `cd site && python3 -m http.server 5173 --directory .`

Expected: server listens on `http://localhost:5173`.

**Step 2: Inspect in browser**

Open `http://localhost:5173` in the in-app browser.

Verify:

- desktop viewport loads with nonblank hero image;
- mobile viewport does not overflow or overlap;
- tabs and gallery filters work;
- lightbox opens and closes;
- 4K images render.

**Step 3: Final verification**

Run:

- `cd site && npm test`
- `find site/assets/art -type f`
- browser screenshot check

Expected: all checks pass.
