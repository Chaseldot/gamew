---
title: 官网、Wiki 与 Galgame 内容模型
project: GameW / 山水照影录
version: v0.3
status: working_canon
tags: [website, wiki, galgame, content_model, markdown]
---

# 官网、Wiki 与 Galgame 内容模型

本文用于把《山水照影录》的剧情资产转化为网站内容。目标形态包括：

- 类宇宙官网的世界观展示；
- 人物、阵营、地区、任务 wiki；
- 小说/漫画故事页；
- 可交互的 galgame 分支剧情页；
- 后续可接 CMS、静态站点生成器或游戏内资料库。

---

# 1. 网站信息架构

## 1.1 顶层栏目

| 栏目 | URL 建议 | 内容 |
|---|---|---|
| 世界 | `/world` | 大雍、江湖、牒针、照影局历史、低魔规则。 |
| 地区 | `/regions` | 山水县、黄沙古道、千佛石窟、照影城。 |
| 阵营 | `/factions` | 缉武司、同尘盟、照影局、慈心医脉、百工坞、鬼市等。 |
| 人物 | `/characters` | 队友、起源角色、关键 NPC、反派。 |
| 故事 | `/stories` | 小说、漫画脚本、短篇、营地戏。 |
| 任务 | `/quests` | 主线、支线、队友任务、分支树。 |
| 分支 | `/branches` | galgame 式可选剧情节点。 |
| 图鉴 | `/codex` | 牒针、照影铃、牒录、武籍、术语、物件。 |

---

# 2. 页面类型与 Markdown 模板

## 2.1 地区页模板

```md
---
type: region
id: REGION_SHANSHUI
name: 山水县境
chapter: ACT_1_SHANSHUI
status: canon
summary: 水患、疫病、封境与牒针试验交织的第一章舞台。
tags: [act1, region, shanshui]
related_quests: [A1-M01, A1-M02, A1-M03, A1-M04]
related_factions: [FACTION_JIWUSI, FACTION_MOUNTAIN_FORT, FACTION_ZHAOYING]
related_characters: [COMP_SANG_ZHI, COMP_TANG_XIAOYAN, NPC_BAI_WEICHEN]
---

# 山水县境

## 简介

## 视觉关键词

## 历史

## 当前局势

## 主要地点

## 相关任务

## 分支后果

## 可扩写故事
```

## 2.2 阵营页模板

```md
---
type: faction
id: FACTION_JIWUSI
name: 缉武司
status: canon
motto: 武人入册，天下止戈。
alignment_axis: order_control
first_appearance: ACT_1_SHANSHUI
representatives: [NPC_SHEN_ZHAOWEI, COMP_PEI_ZHAO]
related_quests: [A1-M03, A2-M01, A3-M03]
---

# 缉武司

## 简介

## 公开目标

## 隐秘问题

## 组织结构

## 代表人物

## 玩家关系

## 关键分支

## 结局影响
```

## 2.3 人物页模板

```md
---
type: character
id: COMP_SANG_ZHI
name: 桑芷
role: companion
origin_playable: true
school: 药师
legacy: 济世
archetype: 侠医少女 / 毒医圣手
first_appearance: A1-M02
faction: FACTION_CIXIN
status: canon
related_quests: [A1-M02, A1-S01, A3-C02]
---

# 桑芷

## 一句话

想救所有人的年轻医者，却发现自己的师门参与制造了控制人的禁术。

## 人物简介

## 外在目标

## 内在矛盾

## 与玩家关系

## 个人任务线

## 关键选择

## 可能结局

## 代表台词
```

## 2.4 任务页模板

```md
---
type: quest
id: A2-S06
name: 黄沙客栈
chapter: ACT_2_YELLOW_ROAD
quest_type: side_box
location: REGION_YELLOW_ROAD / 黄沙客栈
status: canon
entry_conditions:
  - 到达龙门驿后
  - 触发风沙封路
solution_tags: [COMBAT, STEALTH, SOCIAL, INVESTIGATION, MEDICINE, MECHANISM, MUSIC, DARK_ORIGIN]
related_characters: [COMP_HUO_QINGYUAN, NPC_YAN_SANGENG]
sets_variables: [A2_INN_SCROLL_OBTAINED, A2_INN_MONK_SAVED]
---

# 黄沙客栈

## 简介

## 背景

## 入口

## 关键人物

## 事件流程

## 可选解法

## 关键选择

## 后果变量

## 后续回收

## 剧本片段
```

## 2.5 故事页模板

```md
---
type: story
id: STORY_RAIN_NIGHT_TIE
name: 雨夜醒牒
format: short_story
chapter: ACT_1_SHANSHUI
spoiler_level: low
related_quest: A1-M01
tags: [opening, tie_needle, shanshui]
---

# 雨夜醒牒

正文小说。

## 作者注 / 展开方向

## 相关角色

## 相关任务
```

## 2.6 Galgame 分支节点模板

```md
---
type: branch_node
id: NODE_A1_M01_SOLDIER_CHOICE
quest: A1-M01
scene: SCENE_A1_M01_001
chapter: ACT_1_SHANSHUI
speaker: 押车兵
background: bg_qinghe_ferry_rain
music: rain_low_drum
requires: []
sets: []
---

# 雨夜清河渡：押车兵

## 场景文本

## 选项

### 选项 1：先止血

- 文本：我不知道这是什么。先止血。
- 需求：无
- 设置：`A1_SURVIVORS_SAVED = true`
- 跳转：`NODE_A1_M01_SOLDIER_SAVED`

### 选项 2：【无名煞】灭口

- 文本：你忽然知道，只要割开他的喉咙，就没人知道你醒过。
- 需求：`ORIGIN_DARK_NAMELESS_SHA = true`
- 设置：`DARK_BODYCOUNT += 1`, `A1_SURVIVORS_SAVED = false`
- 跳转：`NODE_A1_M01_DARK_KILL`
```

---

# 3. 推荐内容目录结构

```text
content/
  world/
    da-yong.md
    low-magic-rules.md
    tie-needle.md
    zhaoying-history.md
  regions/
    shanshui.md
    yellow-sand-road.md
    thousand-buddha-caves.md
    zhaoying-city.md
  factions/
    jiwusi.md
    tongchen-league.md
    zhaoying-bureau.md
    cixin-medical-lineage.md
    baigong-workshop.md
    ghost-market.md
  characters/
    companions/
      xie-tingyun.md
      sang-zhi.md
      tang-xiaoyan.md
      ren-wuzong.md
      liu-tingxian.md
      han-shuangtie.md
      pei-zhao.md
      huo-qingyuan.md
    npcs/
      shen-zhaowei.md
      lu-xingzhou.md
      siming.md
      ruan-qingci.md
      bai-weichen.md
  quests/
    act1/
    act2/
    act3/
  stories/
    short-stories/
    camp-scenes/
    comics/
  branches/
    act1/
    act2/
    act3/
  codex/
    objects/
    terms/
    endings/
```

---

# 4. 官网首批上线内容建议

## 4.1 第一批：世界观核心

| 页面 | 目的 |
|---|---|
| 《什么是照影牒针》 | 解释核心危机。 |
| 《山水县境》 | 展示第一章舞台。 |
| 《黄沙古道》 | 展示第二章视觉差异。 |
| 《照影城》 | 展示第三章目标。 |
| 《缉武司》 | 展示秩序阵营。 |
| 《同尘盟》 | 展示江湖阵营。 |
| 《照影局》 | 展示主线神秘感，但保留剧透。 |

## 4.2 第二批：人物页

首批人物页建议上线八名队友：

1. 谢停云；
2. 桑芷；
3. 唐小砚；
4. 任无踪；
5. 柳听弦；
6. 韩霜铁；
7. 裴照；
8. 霍青鸢。

每个队友页使用“短简介 + 代表台词 + 起源角色钩子 + 不剧透个人线”的形式。

## 4.3 第三批：故事页

建议优先上线以下短篇或漫画脚本：

| 故事 | 格式 | 目的 |
|---|---|---|
| 雨夜醒牒 | 短篇小说 | 展示开场气氛。 |
| 疫村医棚 | 短篇/漫画 | 展示桑芷和牒针。 |
| 龙王庙水闸 | 漫画/互动分支 | 展示高自由度选择。 |
| 黄沙客栈 | 互动故事 | 展示第二章盒子任务。 |
| 千佛无面窟 | 短篇/图文 | 展示照影局古老源头。 |
| 武籍大审 | 互动分支 | 展示第三章政治清算。 |

---

# 5. Galgame 展示模式

## 5.1 展示层级

每个互动故事可拆成：

1. **场景背景**：背景图、音乐、环境音。
2. **对白推进**：角色头像、表情、立绘位置。
3. **玩家选择**：普通选项、流派选项、队友选项、无名煞选项。
4. **变量显示**：可隐藏，也可在 debug/wiki 模式显示。
5. **路线回放**：展示“你选择了什么，因此谁活了/死了/离开了”。

## 5.2 节点字段建议

| 字段 | 说明 |
|---|---|
| `node_id` | 节点唯一 ID。 |
| `scene_id` | 所属场景。 |
| `background` | 背景图资源名。 |
| `music` | 音乐资源名。 |
| `speaker` | 当前说话人。 |
| `portrait` | 立绘资源名。 |
| `text` | 台词或旁白。 |
| `choices` | 玩家选项数组。 |
| `requires` | 显示条件。 |
| `sets` | 选择后写入变量。 |
| `goto` | 跳转节点。 |

## 5.3 示例节点 YAML

```yaml
node_id: NODE_A3_TRIAL_SANG_CONFESSION
scene_id: SCENE_A3_M03_004
background: bg_wuji_trial_platform
music: trial_low_strings
speaker: 桑芷
portrait: sang_zhi_serious
text: 牒针的第一味药引，来自慈心医脉。
choices:
  - id: support_sang
    text: “说下去。今日该还债的不止缉武司。”
    requires:
      COMP_SANG_TRUST: ">=2"
    sets:
      A3_TRIAL_CIXIN_CONFESSION: true
      COMP_SANG_TRUST: +1
    goto: NODE_A3_TRIAL_CIXIN_EVIDENCE
  - id: silence_sang
    text: “现在不是说这个的时候。”
    sets:
      A3_TRIAL_CIXIN_CONFESSION: false
      COMP_SANG_TRUST: -2
    goto: NODE_A3_TRIAL_OFFICIAL_ATTACK
```

---

# 6. Wiki 剧透等级

为了适配官网和 wiki，可设置剧透等级：

| 等级 | 说明 | 示例 |
|---|---|---|
| `spoiler_level: none` | 不含主线剧透 | 阵营公开介绍、人物初登场简介。 |
| `spoiler_level: low` | 第一章内轻微剧透 | 牒针名词、山水县封境。 |
| `spoiler_level: medium` | 第二章关键设定 | 石窟揭示照影局古老源头。 |
| `spoiler_level: high` | 第三章和结局 | 司命、母局、无名煞身份。 |

---

# 7. 内容扩写路线

## 7.1 下一阶段应产出的 Markdown

| 文件 | 用途 |
|---|---|
| `characters/companions/*.md` | 每名队友独立人物页。 |
| `factions/*.md` | 每个阵营独立 wiki 页。 |
| `quests/act1/*.md` | 第一章任务逐个展开。 |
| `stories/short-stories/rain-night-tie.md` | 开场短篇小说。 |
| `branches/act1/a1-m01.md` | 开场 galgame 分支节点。 |

## 7.2 第一优先级扩写对象

1. 桑芷人物页；
2. 无名煞起源页；
3. 第一章开场互动剧情；
4. 龙王庙水闸任务完整分支；
5. 黄沙客栈盒子任务完整分支；
6. 武籍大审证据系统。

---

# 8. 资源命名建议

## 8.1 背景图命名

```text
bg_{region}_{location}_{time}_{state}
```

示例：

- `bg_shanshui_qinghe_ferry_night_rain`
- `bg_yellowroad_inn_night_sandstorm`
- `bg_cave_faceless_shrine_dark`
- `bg_zhaoying_trial_platform_day`

## 8.2 角色立绘命名

```text
char_{character_id}_{emotion}_{variant}
```

示例：

- `char_sang_zhi_serious_muddy`
- `char_liu_tingxian_cold_stage`
- `char_siming_calm_dark`

## 8.3 音乐命名

```text
music_{chapter}_{mood}_{motif}
```

示例：

- `music_act1_rain_low_drum`
- `music_act2_sand_bell_distant`
- `music_act3_trial_low_strings`
- `music_final_mother_bureau_bells`

---

# 9. 正式内容语气指南

## 9.1 世界观页面

语气：简洁、可信、像史料和江湖传闻结合。

示例：

> 照影局从不承认自己存在。江湖人只知道，每逢大案之前，总有人收到一枚无名牒牌。牒牌上不写罪，只写一个字：断。

## 9.2 人物页面

语气：人物钩子优先，不提前剧透结局。

示例：

> 桑芷相信药是用来救人的。直到她看见有人把药做成锁，把病人写进账本。

## 9.3 任务页面

语气：清晰、结构化，可作为设计文档和攻略底稿。

## 9.4 小说页面

语气：更重感官与情绪，少解释系统名词，让读者从场景中理解设定。

---

# 10. 首屏宣传文案草案

## 10.1 官网首页短文案

> 雨夜醒来，你腕上多了一道黑线。
> 它记录你的伤、你的梦、你尚未犯下的罪。
> 从山水县境到黄沙古道，从千佛石窟到照影城，所有人都想替江湖写下结局。
> 现在，笔在你手里。

## 10.2 世界观栏目文案

> 江湖曾经相信，快意恩仇自有公道。
> 朝廷后来相信，武人入册天下止戈。
> 照影局相信，人心可以被提前照见，灾祸可以被提前斩断。
> 你相信什么？

## 10.3 无名煞栏目文案

> 你没有名字。
> 但你的手记得许多人的死法。
> 每一次杀意到来，都像一条已经走过的路。
> 你要沿着它走下去，还是把路斩断？
