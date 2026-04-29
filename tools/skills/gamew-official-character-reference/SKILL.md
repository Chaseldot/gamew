---
name: gamew-official-character-reference
description: Use when generating, rerunning, saving, recording, or auditing GameW official website character reference sheets / 人物设定版 under the GameW repo, especially 4K 3840x2160 GameW-style sheets with F-206 layout, character turnarounds, props, method boards, action panels, direct official filenames, suffix variants, and generation-records.jsonl.
---

# GameW 官方人物设定版批产

## Core Rule

Use the lightweight direct-output pipeline. Generate images, then move the selected PNG directly into:

`/Users/bytedance/coco/gamew/assets/00-人物/04-人物设定版/`

Do not create `_candidates`, per-image prompt files, `/tmp` marker files, or manual approval gates. Save prompt and metadata in:

`assets/00-人物/04-人物设定版/generation-records.jsonl`

## Preflight

Work from:

```bash
cd /Users/bytedance/coco/gamew
```

Use the built-in `image_gen` path. Before generating, load the current layout reference into context:

```text
/Users/bytedance/coco/gamew/assets/00-人物/04-人物设定版/F-206-药傀毒师-GameW风格.png
```

Treat it as layout reference only unless generating F-206.

## Plan A Batch

For the next missing roles:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 tools/skills/gamew-art-asset-generation/scripts/plan_character_reference_batch.py --repo . --limit <count>
```

For explicit IDs or reruns:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 tools/skills/gamew-art-asset-generation/scripts/plan_character_reference_batch.py --repo . --id F-002 --id F-003
```

Always use the returned `asset_path`. If a role already exists, the planner returns `-v2`, `-v3`, etc. Never overwrite unless the user explicitly asks.

## Prompt Requirements

Each prompt must include:

- exact `3840x2160`, `4K PNG`, `16:9`, `high quality`, `stylized-concept`;
- official GameW 人物设定版 for website display;
- F-206 layout reference only;
- central main illustration as the largest focal point;
- upper-left front/side/back turnaround;
- lower-left prop breakdown;
- upper-right weapon / method / medium / mechanism board;
- lower-right 2-4 action vignette panels;
- role-specific silhouette, posture, costume layers, tools, scene, and combat temperament;
- role-specific age range, face shape, facial features, body build, proportions, posture, and temperament; explicitly prevent influencer-pretty faces, same-face outputs, generic handsome/beautiful wuxia faces, and reused body templates;
- no readable text, letters, labels, UI, watermark, logo, or signature.

Avoid topic contamination: do not copy F-206 poison doctor props, puppet, medicine smoke, colors, or costume into other roles.

## Character Identity Diversity

Every character prompt must make the person visibly different before clothing or props are considered. Spell out concrete physical identity details:

- age range and life-stage read, such as late teen, weathered middle-aged, elderly, or ageless but grounded;
- face structure and features, such as square jaw, narrow cheeks, flat nose, heavy brow, tired eyes, scars, beard, burn marks, missing tooth, or soft youthful face;
- body type and proportions, such as short and stocky, tall and bony, barrel-chested, wiry, broad-shouldered, long-legged, slight, elderly stooped, or heavy working-class build;
- posture and movement quality, such as crouched, forward-driving, loose-shouldered, careful, rigid, swaggering, guarded, or exhausted;
- temperament in the face and hands, such as stern, mischievous, nervous, serene, feral, scholarly, brutal, gentle, or wary.

Do not rely on costume, hairstyle, props, or color palette alone to differentiate roles. Add a negative line when useful: not a generic attractive hero, not a refined pretty swordsman unless that is the role, not a same-face model, not a standard slim idol body.

## Fast Production Loop

For each planned role:

1. Draft the exact prompt in memory.
2. Record the prompt and planned output path in JSONL before generation. For long prompts, pipe stdin directly; do not write a prompt file:
   ```bash
   PYTHONDONTWRITEBYTECODE=1 python3 tools/skills/gamew-art-asset-generation/scripts/record_character_reference_generation.py \
     --repo . \
     --id <ID> \
     --name <人物原型> \
     --asset "<asset_path>" \
     --status prompt_ready \
     --notes "prompt recorded before imagegen" \
     --prompt "<exact prompt>"
   ```
3. Call built-in `image_gen` once for that role.
4. Use the path returned by `image_gen` when available. If it does not return a path, immediately take the newest PNG under the generated-images folder:
   ```bash
   latest=$(find ${CODEX_HOME:-$HOME/.codex}/generated_images -type f -name '*.png' -print0 | xargs -0 ls -t | head -1)
   ```
5. Move the generated PNG to the planner `asset_path`:
   ```bash
   asset="<asset_path>"
   mkdir -p "$(dirname "$asset")"
   mv "$latest" "$asset"
   ```
6. If dimensions need normalization, run:
   ```bash
   sips -z 2160 3840 "$asset" >/dev/null
   ```
7. Update the same JSONL record after the move. The script reuses the stored prompt, so do not pass `--prompt-file`:
   ```bash
   PYTHONDONTWRITEBYTECODE=1 python3 tools/skills/gamew-art-asset-generation/scripts/record_character_reference_generation.py \
     --repo . \
     --id <ID> \
     --name <人物原型> \
     --asset "$asset" \
     --generated "$latest" \
     --status generated \
     --notes "direct official output"
   ```
8. Optionally append to `assets/generation-log.md` with `log_image_generation.py` only when the user wants full global generation history, not as a blocker.

## Minimal Verification

At the end of the batch, run the audit only if the user asks for verification or this is a final handoff:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 tools/skills/gamew-art-asset-generation/scripts/audit_character_reference_assets.py --repo .
```

Audit checks naming, 3840x2160 PNG dimensions, archetype ID/name matching, and generation-record completeness. It does not judge visual quality.

Do not run unit tests during pure image batches. Run tests only after changing scripts, docs, or workflow code and when the user asks for verification:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tools/skills/gamew-art-asset-generation/tests
```

## Speed Rules

- Generate prompt, write JSONL, generate image, move PNG, update JSONL.
- Do not create `/tmp` prompt files, marker files, `_candidates`, or per-image manifests.
- Do not repeatedly inspect git status during pure image generation.
- Do not keep scanning for `.DS_Store` unless final audit or file listing surfaces it.
- Keep batches small: 2-4 images is the practical review size.
- Return saved paths promptly so the user can inspect images.

## Best Practice For Reruns

When a user dislikes a result, rerun the same ID with `--id`. Keep the old image and let the planner assign `-vN`. Compare variants by opening the images and reading their `generation-records.jsonl` prompt entries.
