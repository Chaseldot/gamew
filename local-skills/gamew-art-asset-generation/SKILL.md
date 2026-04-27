---
name: gamew-art-asset-generation
description: Use when GameW needs to generate, log, review, refresh, classify, or validate art assets from scripts, ground truth, map design, chapter visuals, reference images, generation records, or art-assets folders.
---

# GameW Art Asset Generation

## Overview

Generate project-ready GameW art assets by mining scripts and ground truth for visual motifs, using chapter/reference images for style, calling the built-in `imagegen` skill, and filing final PNGs into `art-assets`.

Default to the built-in `imagegen` workflow. Do not require `OPENAI_API_KEY` unless the user explicitly asks for CLI/API fallback.

## Inputs To Read

Always read the narrowest source set needed:

| Need | Read |
|---|---|
| Official location list | `docs/ground-truth/03-map-design.md` |
| Chapter plot mood | `docs/ground-truth/05-mainline-quest-skeleton.md` |
| World tone | `docs/ground-truth/02-world-setting.md` |
| Representative scenes | `docs/reference/story-blueprints/` and script packets by `rg` |
| Current assets | `art-assets/README.md` and `find art-assets -maxdepth 3 -type f` |
| Style anchors | Each chapter `01-章节主视觉/` and relevant `00-风格探索/` images |
| Prior generation records | `art-assets/generation-log.md` when reviewing earlier prompts, references, or rejected candidates |

Do not treat `docs/reference/` as authority over current map/location names when ground truth conflicts.

## Asset Taxonomy

Use existing `art-assets` structure:

| Type | Folder | Rule |
|---|---|---|
| 章节地图 | `00-章节地图` | One chapter-region map. |
| 章节主视觉 | `01-章节主视觉` | One image that anchors chapter palette and mood. |
| 地点概念图 | `02-地点概念图` | Must strictly match map-design location names. |
| 场景图 | `03-场景图` | Script-grounded internal or representative scene. |
| 战斗图 | `04-战斗图` | Encounter, ambush, duel, siege, or combat setup. |
| 任务与副本图 | `05-任务与副本图` | Strong quest, dungeon, finale, or set-piece image. |
| 旧设参考 | `99-旧设参考` | Useful but not current ground truth. |

Naming:

```text
章节-资源类型-地点或画面说明.png
```

For location concept art, use exactly:

```text
第X章-地点概念-地点名.png
```

## Workflow

1. **Define the asset request.** Identify chapter, asset type, required count, target folder, target names, and whether existing assets should be moved to scene/battle/reference folders first.
2. **Mine motifs.** Use `rg` over ground truth and scripts for location descriptions, recurring props, weather, factions, conflicts, verbs, and representative moments. Extract visual nouns, not task labels.
3. **Choose reference images.** Use chapter main visual as primary style anchor; add style-exploration images only if they clarify material, lighting, or architecture.
4. **Write one prompt per asset.** Distinct locations/scenes need distinct `imagegen` calls. Use `references/prompt-patterns.md` when drafting.
5. **Generate with `imagegen`.** Call built-in image generation one asset at a time. Specify `3840x2160`, `4K landscape`, `high quality`, `stylized-concept`, no text/UI/watermark.
6. **Persist into workspace.** Built-in output appears under `$CODEX_HOME/generated_images/...`; copy the selected generated PNG into the target `art-assets` path. Leave the original generated file in place.
7. **Normalize dimensions.** If the generated PNG is not 3840x2160, upscale/crop with local tooling such as `sips -z 2160 3840 <target>` and verify with `file`.
8. **Log generation metadata.** Append one entry per `imagegen` call to `art-assets/generation-log.md`, including accepted and rejected candidates.
9. **Update indexes.** Keep `art-assets/README.md` consistent with the generated set and any moved assets.
10. **Validate.** Run the audit script for the relevant scope, then run targeted `find`/`file` checks.

## Motif Extraction

When mining scripts and ground truth, pull:

- place identity: river crossing, county town, plague village, desert inn, registry district;
- environmental mood: rain, fog, sand, dusk, lanterns, herb smoke, bronze machinery;
- architecture/materials: tiled roofs, docks, palisades, grottoes, canals, yamen walls;
- conflict residue: quarantine, sealed gates, old escort road, public assembly, hidden bureau;
- scale cues: tiny figures, boats, carts, banners, gates, towers.

Do not turn gameplay or production labels into image subjects. Replace labels like `证据交易`, `任务节点`, `boss arena`, or `encounter` with diegetic images: market under bridge, rain-dark yamen, tower fort, flooded sluice.

## Generation Log

Record every `imagegen` call, not only the final accepted assets. The log is for later manual review of strong images and prompt/reference learning.

Use `art-assets/generation-log.md` as the default log. Each entry must include:

- status: `accepted`, `candidate`, or `rejected`;
- generated PNG path under `$CODEX_HOME/generated_images/...`;
- final `art-assets/...` path when copied into the project;
- exact prompt used for that call;
- reference image paths and their role, such as primary style anchor or material/lighting reference;
- source motifs, such as ground-truth docs, script packets, or specific locations;
- generation settings and short notes on selection/rejection when useful.

Prefer the bundled logger after each generation:

```bash
python3 local-skills/gamew-art-asset-generation/scripts/log_image_generation.py \
  --repo . \
  --status accepted \
  --generated "$latest" \
  --asset "art-assets/<chapter>/<folder>/<target>.png" \
  --chapter "<chapter>" \
  --asset-type "<folder>" \
  --reference "art-assets/<chapter>/01-章节主视觉/<anchor>.png :: primary style anchor" \
  --motif-source "docs/ground-truth/03-map-design.md :: <location or region>" \
  --prompt-file /tmp/gamew-imagegen-prompt.md
```

For an unused generation, log it with `--status rejected` or `--status candidate` and omit `--asset`.

## Built-In `imagegen` Save Pattern

For project-bound assets:

1. Create a marker before each generation:
   ```bash
   touch /tmp/gamew-imagegen-marker
   ```
2. Save the exact prompt to `/tmp/gamew-imagegen-prompt.md`, then call `imagegen`.
3. Copy the newest PNG after the marker and log the call:
   ```bash
   latest=$(find ${CODEX_HOME:-$HOME/.codex}/generated_images -type f -newer /tmp/gamew-imagegen-marker -name '*.png' -print | xargs ls -t | head -1)
   cp "$latest" "art-assets/<chapter>/<folder>/<target>.png"
   sips -z 2160 3840 "art-assets/<chapter>/<folder>/<target>.png" >/dev/null
   file "art-assets/<chapter>/<folder>/<target>.png"
   python3 local-skills/gamew-art-asset-generation/scripts/log_image_generation.py \
     --repo . \
     --status accepted \
     --generated "$latest" \
     --asset "art-assets/<chapter>/<folder>/<target>.png" \
     --chapter "<chapter>" \
     --asset-type "<folder>" \
     --reference "<reference image path> :: <role>" \
     --motif-source "<source doc or script> :: <motif>" \
     --prompt-file /tmp/gamew-imagegen-prompt.md
   ```

Never overwrite an existing asset unless the user asked for replacement. If unsure, create a sibling `-v2.png`.

## Validation

Use the bundled script for location concept coverage:

```bash
python3 local-skills/gamew-art-asset-generation/scripts/audit_art_assets.py --repo .
```

For a quick shell check:

```bash
find art-assets -path '*/02-地点概念图/*' -type f | sort | wc -l
find art-assets -path '*/02-地点概念图/*' -type f -print0 | xargs -0 file | rg -v '3840 x 2160'
```

Expected current ground-truth location concept counts: 第一章 8, 第二章 8, 第三章 12, total 28.

## References

- Prompt templates: `references/prompt-patterns.md`.
