# 00 Rule Bible — Iteration Schema for Wuxia Build Layers

日期：2026-04-24  
状态：layer hierarchy locked; inheritance content remains iterative
负责人：leader / canon systems designer

## Scope
本文件是本轮下游写作的 schema authority。若与旧摘要冲突，以本文件为准。

最新用户约束覆盖此前“最终定版传承”的表述：
- **流派** 是当前唯一固定层。
- **传承、旁修、角色形象** 都可以在 pressure loop 中按需修改。
- **出身 / 身份层暂不纳入本轮设计取舍**，避免把玩家幻想误导回职业 / 背景绑定。
- 系统不得被“职业名”绑死；职业感应当从层级组合中自然涌现。

## Authority order
当多个文档同时涉及规则解释时，以下顺序高于其他设计草稿：
1. 本文件
2. `docs/working/baseline-snapshot.md`
3. `docs/working/agent-queue.md`

旧摘要、访谈记录、个人草稿只能补背景，不得反向改写本文件已经锁定的层级边界。

## System layer hierarchy

### 流派
固定的主修武学语法，例如游锋、破军、拳掌等。

约束：
- 流派是角色 build 的主轴，不是职业名。
- 流派提供核心资源循环、动作骨架与战斗职责。
- 当前轮次不再推翻流派列表与基础定位；只允许修正文案边界、动作解释或与其他层的接口。

### 传承
主修内的专精路线。

约束：
- 传承不是最终版本，当前所有传承内容都可以被武侠幻想 / CRPG 压测 ticket 反向修改。
- 传承必须从所属流派的资源循环与动作结构中长出来，不能靠旁修或角色形象成立。
- 传承命名可以承载武侠味，但不得变成“职业选择”。

### 旁修
横向构筑工具。

约束：
- 旁修提供入口、接口、小循环或表达工具。
- 旁修可以帮助玩家拼出熟悉幻想，但不能篡夺主修 / 传承的身份权重。

### 出身 / 身份
暂缓层。叙事、社会关系、开局资源与世界交互层，例如僧人、捕快、医谷、杀手楼、门派弟子。

约束：
- 本轮 agent team 不设计、不压测、不用它解决玩家幻想。
- 出身 / 身份不是战斗职业。
- 出身 / 身份可以影响对话、声望、NPC 反应、初始资源或剧情钩子。
- 出身 / 身份不得强行锁死流派或传承；可以提供推荐组合，但不能替代 build 选择。

### 角色形象（捏脸及 NPC）
玩家与 NPC 的可识别武侠幻想外观 / 叙事 archetype，例如武僧、游侠、毒医、机关师、琴魔、侠盗。

约束：
- 角色形象是玩家幻想输入层，也是武侠迷 reviewer 主要施压对象。
- 同一角色形象可以由不同流派 / 传承 / 旁修组合达成。
- 角色形象可用于捏脸预设、NPC 模板、推荐 build、剧情标签，但不得反向绑定唯一职业。
- 角色形象提出“玩家想成为谁”；资深游戏设计 / CRPG reviewer 负责判断该幻想应如何在传承与旁修之间取舍。

### 职业名处理原则
“武僧、琴魔、毒医、侠盗”等名字只能作为玩家理解与幻想包装，不能作为系统第一层分类。
规则设计必须先回答“由哪些流派、传承、旁修、角色形象组合出来”，再决定是否给它一个熟悉的武侠称谓。

## Canonical definitions

### 主修 / 流派
角色唯一的核心武学体系，提供：
1. 基础职责
2. 核心资源循环
3. 基础动作骨架
4. 纯主修终局落点

约束：主修 / 流派必须独立成立，不依赖旁修或角色形象补完核心闭环。

### 精修
将自由修习点回投主修，以强化主修本体纵深。

约束：
- 精修只强化主修本体。
- 精修不能定义传承身份。
- 精修不能伪装成第二传承。
- 纯主修最高阶体验 = 宗师技 + 体系完成奖励。

### 旁修
把自由修习点投向非主修流派形成的副武学接入层。

约束：
- 旁修只提供入口 / 接口 / 小循环。
- 旁修可以改变战术展开，但不能替代主修闭环。
- 旁修可影响资源流速，不可改写资源规则。

### 传承
主修循环的高阶分化层，是主修内部的专精路线，不是第二职业。

约束：
- 传承必须从主修资源循环分化。
- 每个传承都要有独立闭环。
- 旁修影响传承手感，但不能成为传承成立前提。
- 传承身份必须保住至少 2/3 anchors：资源关系 / 动作结构 / 招牌机制。
- 当前传承文本不是最终版本；review loop 可以通过 ticket 修改、合并、拆分或重命名传承，只要不推翻已固定的流派主轴。

## Frozen templates

### 主修模板（5 字段）
1. **基础职责一句话**
2. **主资源循环**
3. **三段式动作骨架**（起手 → 推进 → 收束）
4. **纯主修终局落点**
5. **旁修影响范围 / 主修核心保留区 / 非目标**

填写要求：
- 第 5 字段必须同时说明“允许旁修影响什么”、“绝不能改写什么”、“该流派不追求什么”。
- 不得引用最终槽位数。

### 传承模板（7 字段）
1. **定位一句话**
2. **核心战斗幻想**
3. **核心循环**
4. **资源关系**
5. **代表动作 / 机制**
6. **边界定义**
7. **旁修影响面**

填写要求：
- 当前版本中保留的 24 个传承全部使用同一深度与同一字段顺序；若 loop 决定调整传承集合，必须先记录 decision / ticket。
- 不得把旁修或 loadout 条件写成传承前提。
- `边界定义` 必须说明它不是什么、不会吞掉谁。

### 旁修统一语法（1 / 2 / 3 点）
- **1 点：入口**
  - 提供轻量战斗接入、基础熟练、基础触发或探索接入。
- **2 点：接口**
  - 让主修动作与旁修收益出现结构连接。
  - 可影响主修资源流速，但不可改写主修资源定义。
- **3 点：小循环**
  - 提供副套路 / 副节奏 / 小收束。
  - 规模、决定性、身份权重不得超过主修主体。

### 精修统一语法
- **精修 1**：资源上限、回收稳定性、起手顺滑度
- **精修 2**：主修核心动作强化、循环容错增强
- **精修 3**：宗师技强化或体系完成奖励补完

约束：精修表达的是“练深”，不是“另开副套路”。

## Deferred loadout contract
任何跨到装备 / 槽位边界的文句都必须使用以下占位符：
- `LOADOUT_INTERFACE_PENDING`
- `MERIDIAN_SLOT_COUNT_PENDING`
- `SLOT_PRESSURE_ASSUMPTION_ONLY`

### Allowed statements
- 可以写“该表达依赖 `LOADOUT_INTERFACE_PENDING` 的后续落地”。
- 可以写“当前仅在 `SLOT_PRESSURE_ASSUMPTION_ONLY` 下验证不崩”。
- 可以写“旁修会占用未来的 meridian / loadout 预算，但本轮不定义具体数量”。

### Forbidden edits
- 不给出最终槽位数量。
- 不给出最终 equip matrix。
- 不把未定 loadout 规则写成 inheritance / side-study 的生效前提。
- 不在 build audit 前默认宽松或严苛槽位预算却不声明 `SLOT_PRESSURE_ASSUMPTION_ONLY`。

## Section ownership hints for downstream docs
- `01-main-disciplines.md`：canon systems designer
- `02-inheritances.md`：canon systems designer, driven by reviewer tickets
- `03-side-studies-and-loadout.md`：canon systems designer
- `04-build-examples-and-audit.md`：CRPG systems reviewer
- `05-identity-and-archetypes.md`：本轮只启用角色形象 / archetype 部分；出身身份部分 deferred

## Loop exit note
下游 worker 的职责是**围绕已锁定层级迭代内容**。若发现层级边界不足以表达内容，先在 `docs/working/decision-log.md` 追加 escalation，再等待 leader / phase owner 决断。

武侠幻想 reviewer 可以持续提出幻想反压设计，但 loop 必须有出口：
1. 无 P0 / P1 层级冲突；
2. 无 open block ticket；
3. 最近一轮新增幻想只产生低优先级润色项；
4. CRPG reviewer 判定没有 mandatory tax、无 counterplay 爆发或角色形象压扁问题；
5. leader 接受当前版本作为下一开发阶段基线。
