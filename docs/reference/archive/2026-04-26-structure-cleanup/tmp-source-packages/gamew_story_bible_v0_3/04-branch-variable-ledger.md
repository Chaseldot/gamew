---
title: 分支变量与结局账本
project: GameW / 山水照影录
version: v0.3
status: working_canon
tags: [variables, branching, endings, implementation]
---

# 分支变量与结局账本

本文记录《山水照影录》的关键分支变量、取值、首次写入位置、回收位置和结局判定。它可用于任务实现、网站互动剧情、galgame 路线控制和 wiki 分支说明。

---

# 1. 变量设计原则

1. **变量要少而有用**：只记录会改变任务、对话、场景或结局的状态。
2. **每个章节变量至少回收一次**：否则不应成为全局变量。
3. **失败也记录**：失败不是没有内容，而是进入另一路线。
4. **队友变量独立于阵营变量**：玩家支持某阵营，不代表队友一定认同。
5. **无名煞变量独立记录**：它既影响剧情，也影响队友、阵营和结局。

---

# 2. 第一章变量

| 变量 | 类型 | 取值 | 首次写入 | 回收位置 | 说明 |
|---|---|---|---|---|---|
| `A1_SURVIVORS_SAVED` | bool | true / false | A1-M01 | A3-M03 | 开场幸存者是否存活。 |
| `A1_TIE_RECORD_FRAGMENT` | enum | none / obtained / destroyed | A1-M01 | A2-M02 | 牒录残片状态。 |
| `A1_SHANSHUI_STATE` | enum | saved / flooded_partial / occupied / abandoned | A1-M04 | A3-M01, A3-M03 | 山水县终局状态。 |
| `A1_MAGISTRATE_STATUS` | enum | alive / exposed / allied / dead | A1-M04 | A3-M01, A3-M03 | 县令何其庸状态。 |
| `A1_BANDIT_ALLIANCE` | enum | none / allied / betrayed / destroyed | A1-M03/A1-M04 | A3-M04 | 山神寨关系。 |
| `A1_FIRST_TIE_KEY` | enum | none / obtained / lost / destroyed | A1-M04 | A3-M02 | 第一枚牒钥状态。 |
| `A1_TANG_WATERGATE_FIX` | bool | true / false | A1-M04 | A3-C03, A3-M05 | 唐小砚是否成功改闸。 |
| `A1_EXIT_ROUTE` | enum | official / river / mountain / chaos | A1-M03 | A2-M01 | 离开山水县方式。 |

---

# 3. 第二章变量

| 变量 | 类型 | 取值 | 首次写入 | 回收位置 | 说明 |
|---|---|---|---|---|---|
| `A2_FACTION_ALIGNMENT` | enum | official / jianghu / independent / ghost_market / hidden_order | A2-M01 | A3-M01 | 第二章主要阵营倾向。 |
| `A2_MIRROR_ARCHIVE` | enum | public / stolen / burned / sealed / official | A2-M02 | A3-M03 | 镜湖失卷状态。 |
| `A2_WORKSHOP_STATE` | enum | allied / exposed / destroyed / controlled_by_official / controlled_by_tang | A2-M03 | A3-C03, A3-M05 | 百工坞状态。 |
| `A2_STONE_CAVE_TRUTH` | enum | hidden / partial / public / destroyed / given_border | A2-M04 | A3-M03, Ending | 石窟真相状态。 |
| `A2_MARTIAL_ASSEMBLY` | enum | saved / massacred / suppressed / radicalized / collapsed | A2-M05 | A3-M01, A3-M03 | 武林盟会结果。 |
| `A2_HOSTS_RESCUED` | enum | low / mid / high | A2-M06 | A3-M03, Ending | 牒针宿主救出数量。 |
| `A2_HUO_TRIBE_STATE` | enum | rescued / betrayed / occupied / autonomous_seed | A2-S03/A2-M04 | A3-C09, Ending | 霍青鸢族人状态。 |
| `A2_LOUWU_STATE` | enum | burned / captured / handed_official / handed_rebel / controlled_by_player | A2-M06 | A3-M02, A3-M05 | 照影楼坞状态。 |
| `A2_LOUWU_RECORDS` | enum | none / obtained / destroyed / handed_official / handed_rebel | A2-M06 | A3-M03 | 楼坞牒录状态。 |
| `A2_INN_SCROLL_OBTAINED` | bool | true / false | A2-S06 | A3-M03 | 黄沙客栈牒录拓本。 |
| `A2_INN_MONK_SAVED` | bool | true / false | A2-S06 | A2-M04, A3-M03 | 失明画僧是否存活。 |

---

# 4. 第三章变量

| 变量 | 类型 | 取值 | 首次写入 | 回收位置 | 说明 |
|---|---|---|---|---|---|
| `A3_CITY_ENTRY` | enum | legal / sewer / rebel / machine / caravan / assault / dark_order | A3-M01 | A3-M02, A3-M04 | 入城方式。 |
| `A3_KEY_TIE` | bool | true / false | A3-M02 | A3-M05 | 是否取得牒钥。 |
| `A3_KEY_ARRAY` | bool | true / false | A3-M02 | A3-M05 | 是否取得阵钥。 |
| `A3_KEY_HEART` | bool | true / false | A3-M02/A3-M03 | A3-M05 | 是否取得心钥。 |
| `A3_TRIAL_OUTCOME` | enum | official_win / player_win / riot / assassination / truth_public / collapsed | A3-M03 | A3-M04, Ending | 武籍大审结果。 |
| `A3_CITY_STATE` | enum | stable / martial_law / uprising / chaos / liberated | A3-M03 | A3-M04, Ending | 城市状态。 |
| `A3_MOTHER_BUREAU_ACCESS` | enum | full / partial / forced / dark_order | A3-M04 | A3-M05 | 进入母局方式。 |
| `A3_FINAL_AUTHORITY` | enum | destroyed / official / rebel / public / stolen / player / medical / dark | A3-M05 | Ending | 母局最终归属。 |

---

# 5. 阵营声望变量

建议使用 -3 到 +3 的整数声望区间：

| 数值 | 含义 |
|---:|---|
| -3 | 死敌，主动追杀。 |
| -2 | 敌对，拒绝交易和入场。 |
| -1 | 不信任，有额外代价。 |
| 0 | 中立。 |
| +1 | 可交易，可获得基础帮助。 |
| +2 | 盟友，提供任务资源。 |
| +3 | 核心盟友，提供终局支援。 |

| 变量 | 阵营 |
|---|---|
| `FACTION_JIWUSI_REP` | 缉武司 |
| `FACTION_TONGCHEN_REP` | 同尘盟 |
| `FACTION_ZHAOYING_REP` | 照影局隐藏认可度，不应直接展示给玩家。 |
| `FACTION_CIXIN_REP` | 慈心医脉 |
| `FACTION_BAIGONG_REP` | 百工坞 |
| `FACTION_GHOST_MARKET_REP` | 鬼市 |
| `FACTION_MOUNTAIN_FORT_REP` | 山神寨 |
| `FACTION_BORDER_TRIBES_REP` | 边地部族 |

---

# 6. 队友变量

## 6.1 通用队友变量

每名队友建议记录以下变量：

| 变量后缀 | 取值 | 说明 |
|---|---|---|
| `_TRUST` | -3 到 +3 | 信任值。 |
| `_ARC` | unresolved / bright / dark / tragic / left / dead | 个人线状态。 |
| `_ROMANCE` | none / started / committed / broken | 若后续需要情感线。 |
| `_FINAL_READY` | true / false | 是否解锁终局方案。 |

## 6.2 队友变量表

| 队友 | 信任变量 | 个人线变量 | 终局方案变量 |
|---|---|---|---|
| 谢停云 | `COMP_XIE_TRUST` | `COMP_XIE_ARC` | `COMP_XIE_FINAL_READY` |
| 桑芷 | `COMP_SANG_TRUST` | `COMP_SANG_ARC` | `COMP_SANG_FINAL_READY` |
| 唐小砚 | `COMP_TANG_TRUST` | `COMP_TANG_ARC` | `COMP_TANG_FINAL_READY` |
| 任无踪 | `COMP_REN_TRUST` | `COMP_REN_ARC` | `COMP_REN_FINAL_READY` |
| 柳听弦 | `COMP_LIU_TRUST` | `COMP_LIU_ARC` | `COMP_LIU_FINAL_READY` |
| 韩霜铁 | `COMP_HAN_TRUST` | `COMP_HAN_ARC` | `COMP_HAN_FINAL_READY` |
| 裴照 | `COMP_PEI_TRUST` | `COMP_PEI_ARC` | `COMP_PEI_FINAL_READY` |
| 霍青鸢 | `COMP_HUO_TRUST` | `COMP_HUO_ARC` | `COMP_HUO_FINAL_READY` |

## 6.3 队友离队/冲突规则

| 条件 | 可能后果 |
|---|---|
| 玩家无名煞连续顺煞且杀害无辜 | 桑芷、裴照、霍青鸢可能离队。 |
| 玩家支持缉武司高压入册 | 任无踪、陆行舟相关队友线恶化。 |
| 玩家支持同尘盟屠杀 | 裴照、桑芷、谢停云信任下降。 |
| 玩家摧毁百工坞 | 唐小砚视前置选择可能离队或黑化。 |
| 玩家隐瞒慈心医脉罪证 | 桑芷暗终或信任下降。 |

---

# 7. 无名煞变量

| 变量 | 类型 | 取值 | 说明 |
|---|---|---|---|
| `DARK_AWAKENING` | enum | dormant / stirred / revealed / embraced | 无名煞觉醒程度。 |
| `DARK_BODYCOUNT` | int | 0+ | 顺煞杀戮次数，尤其是关键 NPC。 |
| `DARK_RESISTANCE` | int | 0+ | 压煞成功次数。 |
| `DARK_ORDER_CONTACT` | bool | true / false | 断因房是否主动接触。 |
| `DARK_OLD_NAME_FOUND` | bool | true / false | 是否发现断因七号身份。 |
| `DARK_COMPANION_FEAR` | int | 0+ | 队友对玩家恐惧累计。 |
| `DARK_FINAL` | enum | inherit / sever / relapse / judged / sacrifice / false_heir | 无名煞终局。 |

## 7.1 无名煞路线阈值建议

| 条件 | 解锁内容 |
|---|---|
| `DARK_BODYCOUNT >= 3` | 断因房提前接触。 |
| `DARK_RESISTANCE >= 3` | 可在第三章斩断旧编号。 |
| `DARK_AWAKENING = embraced` 且 `DARK_BODYCOUNT >= 5` | 少司命继承路线。 |
| `DARK_RESISTANCE >= 5` 且关键队友信任高 | 自审/救赎路线。 |
| `DARK_COMPANION_FEAR >= 4` | 队友可能在终局前对峙玩家。 |

---

# 8. 结局判定

## 8.1 世界结局变量

`ENDING_WORLD` 取值：

| 取值 | 结局名 | 判定条件概述 |
|---|---|---|
| `jianghu_severed` | 江湖断牒 | 母局被摧毁。 |
| `registry_order` | 武籍天下 | 母局交给缉武司，沈照微或继任者掌权。 |
| `tongchen_fire` | 同尘烈火 | 母局交给同尘盟或缉武司被暴力推翻。 |
| `cixin_remnant` | 慈心残卷 | 桑芷/阮清辞线完成，保留治疗功能。 |
| `baigong_archive` | 百工明档 | 唐小砚终局完成，母局改成公开只读档案。 |
| `stolen_fire` | 盗火无踪 | 任无踪偷走核心牒钥。 |
| `new_siming` | 新司命 | 玩家接管母局。 |
| `dark_star_city` | 煞星照城 | 无名煞继承断因房并高杀戮。 |
| `border_autonomy` | 黄沙自治 | 霍青鸢线完成，边地控制节点被毁，石窟证据公开。 |

## 8.2 队友结局判定

| 队友 | 善终条件 | 暗终条件 | 悲剧条件 |
|---|---|---|---|
| 谢停云 | 信任高，旧案真相公开，拒绝冷血决斗 | 复仇决斗胜出但不悔 | 信任低，被仇家逼回杀戮循环 |
| 桑芷 | 医脉罪证公开，宿主救援高 | 隐瞒罪证，只救“值得救的人” | 为救宿主牺牲 |
| 唐小砚 | 接管或重建自由工坊 | 成为机关军火商 | 百工旧派夺权或工坊被毁 |
| 任无踪 | 救水巷孩子，偷核心不私吞 | 成为鬼市新主 | 为玩家挡断因刺客而死 |
| 柳听弦 | 放下复仇，创护心曲 | 杀尽仇门 | 入魔失听或被琴音反噬 |
| 韩霜铁 | 守九门不死，重开镖路 | 成为缉武司铁壁 | 摘星楼门前殉死 |
| 裴照 | 重建独立捕门 | 成为缉武司继任者 | 公开罪证被处决 |
| 霍青鸢 | 边地自治 | 夺取边军话语权 | 护族撤离战死 |

---

# 9. 网站/galgame 分支显示建议

## 9.1 分支节点格式

```yaml
node_id: A2_S06_LOCKED_INN_MURDER
chapter: ACT_2_YELLOW_ROAD
quest: A2-S06 黄沙客栈
requires:
  - A2_INN_STARTED = true
choices:
  - id: inspect_body
    text: 【药师】验尸
    sets:
      A2_INN_CAUSE_OF_DEATH: tie_needle_burst
  - id: accuse_guard
    text: 指控缉武司校尉
    sets:
      A2_INN_FRAMED_FACTION: jiwusi
  - id: expose_agent
    text: 揭穿照影牒使
    requires:
      A2_INN_CAUSE_OF_DEATH: tie_needle_burst
      A2_INN_MECHANISM_FOUND: true
    sets:
      A2_INN_EXPOSED_TIE_AGENT: true
```

## 9.2 分支页面展示层级

- 第一层：章节；
- 第二层：任务；
- 第三层：关键选择；
- 第四层：变量后果；
- 第五层：后续回收。

这样既能作为 galgame 互动路线，也能作为 wiki 任务攻略。
