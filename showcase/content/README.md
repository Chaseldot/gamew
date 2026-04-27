# GameW Narrative Content Library

This directory is the structured source layer for the GameW narrative and website assets.

Current minimum pipeline:

- `12-website-assets/web_export.json` is the structured website export consumed by the generator.
- `../scripts/build-site-data.mjs` converts the JSON export into `../site/data.js`.
- `../site/data.js` is generated and should not be edited directly.

Planned expansion:

- Markdown remains the authoring format for long-form world, story, quest, and character text.
- YAML is the preferred format for planner-owned databases such as characters, factions, quests, flags, and items.
- JSON is the generated runtime / website format.
- CSV or XLSX can be added for bulk review indexes.

Recommended future folders:

```text
00_Project_Bible/
01_World_Bible/
02_Core_Content/
03_Main_Story/
04_Systems/
05_Characters/
06_Factions/
07_Regions/
08_Quests/
09_Branching_And_Choices/
10_Dialogue/
11_Codex_And_Lore/
12-website-assets/
```
