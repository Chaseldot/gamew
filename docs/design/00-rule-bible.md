# 00 Rule Bible — Frozen Schema for This Round

日期：2026-04-24  
状态：Phase 1 locked  
负责人：worker-1

## Scope
本文件是本轮下游写作的 schema authority。若与旧摘要冲突，以本文件 + `docs/working/baseline-snapshot.md` 为准。

## Authority order
当多个文档同时涉及规则解释时，以下顺序高于其他设计草稿：
1. `docs/working/baseline-snapshot.md`
2. 本文件
3. `docs/working/agent-queue.md`

旧摘要、访谈记录、个人草稿只能补背景，不得反向改写本文件已经冻结的 schema。

## Canonical definitions

### 主修
角色唯一的核心武学体系，提供：
1. 基础职责
2. 核心资源循环
3. 基础动作骨架
4. 纯主修终局落点

约束：主修必须独立成立，不依赖旁修补完核心闭环。

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
主修循环的高阶分化层，是主修内部的玩法蓝图，不是第二职业。

约束：
- 传承必须从主修资源循环分化。
- 每个传承都要有独立闭环。
- 旁修影响传承手感，但不能成为传承成立前提。
- 传承身份必须保住至少 2/3 anchors：资源关系 / 动作结构 / 招牌机制。

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
- 24 个传承全部使用同一深度与同一字段顺序。
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
- `01-main-disciplines.md`：worker-2
- `02-inheritances.md`：worker-4 / worker-5 分 section
- `03-side-studies-and-loadout.md`：worker-3
- `04-build-examples-and-audit.md`：worker-6

## Phase 1 exit note
从本文件锁定起，下游 worker 的职责是**填模板，不是改模板**。若发现模板不足以表达内容，先在 `docs/working/decision-log.md` 追加 escalation，再等待 leader / phase owner 决断。
