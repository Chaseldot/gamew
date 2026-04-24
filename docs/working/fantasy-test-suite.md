# Fantasy Test Suite — Cumulative Wuxia Archetype Regression

状态：active cumulative suite  
Owner：worker-1 / Senior Wuxia Fan

## Rules
- 每轮 worker-1 必须新增 3-5 个 **worker-origin** 幻想。
- Human 新增幻想也加入本 suite，但不计入 worker-1 每轮 3-5 个新增 quota。
- 每轮测试必须覆盖全量累计幻想，不只测新增幻想。
- 幻想只能从角色形象层进入，再反推流派 / 传承 / 旁修。
- 出身 / 身份本轮 deferred，不得作为 pass 条件。

## Test item format
- ID:
- Name:
- Source: worker-1 / human
- Added round:
- Player fantasy:
- Core feel:
- Expected layer expression:
- Current support path:
- Status: pass / revise / block
- Last tested round:
- Notes:

## Seed suite

| ID | Name | Source | Added round | Status | Last tested round | Notes |
|---|---|---:|---:|---|---:|---|
| F-001 | 扫地僧型 | worker-1 | 0 | pass | 0 | 纯主修 / 精修宗师幻想。 |
| F-002 | 独臂剑侠型 | worker-1 | 0 | pass | 0 | 游锋断势 / 藏锋支撑残式孤剑。 |
| F-003 | 琴魔型 | worker-1 | 0 | pass | 0 | 音律魔音，低魔扰心压拍。 |
| F-004 | 白衣琴医型 | worker-1 | 0 | pass | 0 | 音律 ↔ 药师接口。 |
| F-005 | 黑衣刺客型 | worker-1 | 0 | pass | 0 | 影踪伏杀 / 暗袭 / 设伏。 |
| F-006 | 铁枪护法型 | worker-1 | 0 | pass | 0 | 破军守阵 / 震岳护线。 |
| F-007 | 毒医圣手型 | worker-1 | 0 | pass | 0 | 药师济世 / 针脉 / 蛊毒分化。 |
| F-008 | 机关奇人型 | worker-1 | 0 | pass | 0 | 奇门机关 / 阵法。 |
| F-009 | 令狐冲型 | worker-1 | 0 | pass | 0 | 游锋断势 / 藏锋，破招风骨。 |
| F-010 | 黄药师型 | worker-1 | 0 | pass | 0 | 音律 / 药师 / 奇门杂学宗师。 |
| F-011 | 郭靖型 | worker-1 | 0 | pass | 0 | 拳掌摧心，正大雄浑。 |
| F-012 | 东方不败型 | worker-1 | 0 | pass | 0 | 药师 / 影踪飞针压迫。 |
| F-013 | 武僧型 | worker-1 | 0 | pass | 0 | 拳掌 + 旁修接口 + 清修表现标签。 |
| F-014 | 游侠型 | worker-1 | 0 | pass | 0 | 游锋 + 影踪/射艺接口 + 江湖表现。 |
| F-015 | 侠盗型 | worker-1 | 0 | pass | 1 | 影踪或游锋 + 夜行/义盗表现。 |
| F-016 | 丐帮帮主型 | worker-1 | 1 | revise | 1 | 草莽领袖、棍棒 / 掌法 / 呼喝压场可由战斗层部分解释，但“帮主 / 丐帮”身份与棍法称谓需要回收到角色形象，不得要求新增流派。见 WUX-008。 |
| F-017 | 飞刀浪子型 | worker-1 | 1 | pass | 1 | 射艺穿杨 / 连珠 + 影踪或游锋旁修可解释“一镖定线、例不虚发”的低魔投射幻想。 |
| F-018 | 驭鹰孤侠型 | worker-1 | 1 | block | 1 | 若玩家期待战斗兽伴协同，当前层级没有 companion 主循环；只能作为表现标签 / 剧情陪伴暂存。见 WUX-009。 |
| F-019 | 红绫软兵女侠型 | worker-1 | 1 | revise | 1 | 游锋 / 奇门可解释换位与牵制，但软兵的缠、卷、牵、夺械动作语汇不足，需传承或旁修口径补强。见 WUX-010。 |
| F-020 | 铁面缉凶型 | worker-1 | 1 | pass | 1 | 拳掌擒拿 + 射艺猎踪 / 影踪追迹可解释缉凶、追捕、制伏；不借捕快身份权限作为战斗 pass 条件。 |

## Round 1 full baseline test — worker-1

- Baseline tested: current canon in this worktree before worker-2 rewrite.
- Coverage: F-001 ~ F-020 cumulative suite.
- Result: 17 pass / 2 revise / 1 block.
- Regressions from prior PASS: none. F-001 ~ F-015 remain pass under the fixed 流派 / mutable 传承、旁修、角色形象 / deferred 出身身份 rule.
- New worker-origin fantasies this round: F-016 ~ F-020 (5 items; no human-origin additions found in the handoff).
- New tickets opened: WUX-008, WUX-009, WUX-010.

### Round 1 item notes

- F-016 丐帮帮主型 — **revise**：拳掌摧心、破军守阵、音律战鼓 / 清音可支撑草莽号令、正面掌路和护众压场；但“丐帮 / 帮主 / 打狗棒”容易把身份、帮派和具体武器错读成职业根或新流派，需要 canon 明确它只是角色形象 / 表现标签。
- F-017 飞刀浪子型 — **pass**：射艺穿杨已支持“一镖一线、一发高价值”的投射处决；连珠支持飞刀不断的压制变体；影踪 / 游锋旁修可补出袖中出手、贴步转角与浪子气质。
- F-018 驭鹰孤侠型 — **block**：若只是“孤侠身边有鹰”的外观 / NPC 叙事，角色形象层可承载；若是玩家要鹰在 2-4 回合战斗中侦查、牵制、夹击、承伤或触发资源，当前 canon 没有 companion 资源、行动位或 counterplay，不能硬塞进射艺猎踪或影踪。
- F-019 红绫软兵女侠型 — **revise**：游锋能给步法与显锋，奇门能给牵引和局部规则，拳掌可给擒拿；但“红绫 / 软鞭 / 绳索”的缠卷、夺械、牵拉、借力回收不够可读，容易被误判为奇门法术或普通近战换皮。
- F-020 铁面缉凶型 — **pass**：拳掌擒拿负责制伏，射艺猎踪负责标迹追捕，影踪旁修负责潜查接敌；“铁面 / 缉凶”作为角色形象和行为标签成立，不依赖捕快身份权限。

## Round history
- Round 0：seed suite from previous archetype compile packet; 15/15 pass.
- Round 1 baseline pre-rewrite：20 cumulative fantasies; 17 pass / 2 revise / 1 block; no prior PASS regressions; opened WUX-008~WUX-010 for worker-2 canon rewrite.
