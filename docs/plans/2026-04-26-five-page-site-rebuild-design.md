# Five Page Site Rebuild Design

## Goal

Rebuild the showcase site around five real pages: `首页`, `世界`, `故事`, `系统`, and `美术`. The site should no longer expose the old detailed-page information architecture after a user clicks into any top-level section.

## Approved Direction

The old pages are demoted to compatibility redirects:

- `regions.html`, `factions.html`, `characters.html` redirect to `world.html`.
- `quests.html`, `branches.html`, `story-act1.html`, `companions.html` redirect to `stories.html`.
- `codex.html` redirects to `systems.html`.

The `stories.html` page becomes the long-form story showcase. It mounts `docs/reference/website-blueprint/content/03_Main_Story/classic-route-showcase.md` as the core "明档线" work and embeds selected `art-assets` images into the story flow.

## Page Model

- **Home:** Editorial landing page for the project promise, five-section navigation, story/art highlights, and no old child-page card grid.
- **World:** Consolidated world page for regions, factions, characters, and core setting stakes.
- **Story:** Long-form route showcase from `classic-route-showcase.md`, with chapter navigation and image breaks.
- **Systems:** Consolidated systems and codex page for disciplines, build rules, terminology, and consequences.
- **Art:** Complete `art-assets` gallery with type filters.

## Implementation Notes

The fastest robust route is to rewrite the current static site shell rather than keep extending the old renderer. Keep the static hosting setup, shared CSS, shared JS, and existing asset paths, but replace the old per-topic render functions with a five-page renderer and redirect pages.

