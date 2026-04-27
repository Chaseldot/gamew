# Website Content Map

The current site exposes these content surfaces:

| Page | Source Key | Purpose |
|---|---|---|
| `index.html` | `siteMeta`, `navPages`, `productionStatus` | Portal and project pitch. |
| `world.html` | `acts`, `endings`, `codexEntries` | World premise and three-act frame. |
| `regions.html` | `regions` | Chapter regions and location index. |
| `factions.html` | `factions`, `actOneFactions` | Faction values, shadows, and local conflicts. |
| `characters.html` | `companions`, `keyNpcs`, `darkOrigin` | Companions, key NPCs, and special origin. |
| `stories.html` | `storyScenes` | Short story, comic, and interactive scene seeds. |
| `quests.html` | `actOneMainQuests`, `actTwoMainQuests`, `actThreeMainQuests`, `companionFinaleQuests` | Quest matrix. |
| `branches.html` | `branchVariableGroups`, `branchNodes`, `darkOriginVariables` | Branch variables and galgame nodes. |
| `codex.html` | `codexEntries`, `endings` | Lore terms and ending labels. |
| `systems.html` | `levelRules`, `levelMilestones`, `disciplines`, `inheritances` | Build and rules overview. |
| `art.html` | `gallery` | Visual asset gallery. |

The next content-library step is to split high-churn objects into upstream YAML files and generate `web_export.json` from them.
