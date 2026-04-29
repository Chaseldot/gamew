# GameW 人物设定版记录恢复审计

恢复时间：2026-04-29

## 恢复依据

- `assets/00-人物/04-人物设定版/generation-records.jsonl`
- `assets/00-人物/04-人物设定版/*.png`
- `character-production/wuxia-character-archetypes.md`
- `~/.codex/generated_images/**`
- Codex sessions:
  - `019dcd99-6c93-7362-92c7-f2eafe94e185`
  - `019dce6c-72c6-7a51-ba6e-7323bc8d3f61`
  - `019dce66-4f19-7892-af30-5ff4a8fda8f1`
  - `019dd031-34dd-7bb1-960f-fa6ea201a82e`
  - `019dd239-40cb-7913-93f8-9b7ca7c0a724`
  - `019dd338-1184-7de3-b8b0-4b9e5ac609dc`
  - `019dd4d3-ccaf-7f52-bb22-434772f4b700`
  - `019dd71d-1ea6-7763-84f3-80731bdfe938`

## 已恢复内容

- `character-production/wuxia-character-archetypes.md` 已补齐到 `F-261`，共 261 条原型行。
- 其中 `F-226` 至 `F-261` 从会话日志中的七列表格行恢复。
- `F-242` 至 `F-247` 仅恢复人物原型行；没有对应 PNG 和 `generation-records.jsonl` 记录，判断为未进入设定图生成批次。
- `generation-records.jsonl` 保持 96 条生成记录，对每条补入 `archetype` 和 `recovery` 字段。
- `F-249` 保留两条记录：原图和 `-v2` 重跑图。

## 关键修正

| ID | 修正 |
|---|---|
| F-178 | 从 `独臂雕剑客` 恢复为后续站点会话中使用的 `神雕重剑客`；图片文件也恢复为 `F-178-神雕重剑客-GameW风格-v2.png`。原始 prompt 名称保留在 prompt 文本中，记录字段 `recovered_original_name` 保留改名前名称。 |
| F-188 | 定位和关键爽点恢复为 `远射指挥支援` / `用远射和伏线指令牵动敌军，把追击变成被合围`。 |
| F-222 | 从 `小鬼搬运术士` 恢复为生成图和会话记录一致的 `控鬼术士`。 |
| F-225 | 参考人物恢复为 `-`，与 2026-04-29 10:41 会话里的主表一致。 |

## 校验结果

| 项 | 结果 |
|---|---:|
| PNG 文件 | 96 |
| JSONL 生成记录 | 96 |
| 人物原型行 | 261 |
| `F-001` 至 `F-261` 缺失 ID | 0 |
| 记录拥有 `archetype` | 96 |
| 记录对应 PNG 存在 | 96 |
| 记录对应 `.codex/generated_images` 源图存在 | 96 |
| 记录文件名与 ID / 名称一致 | 96 |
| 记录名称与原型表一致 | 96 |

