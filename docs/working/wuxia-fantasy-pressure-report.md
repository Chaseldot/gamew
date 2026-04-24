# Wuxia Fantasy Pressure Report

状态：Round 1 baseline fantasy pressure test（pre worker-2 rewrite）
Owner：worker-1 / Senior Wuxia Fan

## Review rule
本文件不直接改 canon。所有问题必须先转成 `docs/working/revision-tickets.md` 中的 ticket；只有在 canon 返修完成后，才以本报告做复测与放行证据。

## Current loop status
- 本轮执行约束：`流派固定；传承 / 旁修 / 角色形象可迭代；出身 / 身份 deferred`。
- worker-1 已新增 5 个 worker-origin 幻想：`F-016` ~ `F-020`；未发现本轮 human-origin 新增幻想。
- 已按当前 canon 全量复测累计 suite：`F-001` ~ `F-020`。
- 结果：**17 pass / 2 revise / 1 block**。
- 旧样例 `F-001` ~ `F-015` 无回归：仍能解释成“流派主轴 + 传承倾向 + 旁修工具 + 表现标签”的结果。
- 新增 revise / block 已转为 `WUX-008`、`WUX-009`、`WUX-010`，等待 worker-2 canon rewrite。

## Verdict rule
- **Pass** = 现有主修 / 传承 / 旁修 / 表现标签已足以解释该 fantasy，且不需要回到职业根节点或出身/身份层。
- **Revise** = 底层构筑已经接近成立，但 canon 表述仍不够“拿来即懂”，会误导玩家把幻想理解成未定义子系统、身份绑定或职业根。
- **Block** = 当前层级里仍不存在必要构筑接口，或必须依赖 deferred / future-system 规则才能成立。

## Round 1 added fantasy samples
- 丐帮帮主型
- 飞刀浪子型
- 驭鹰孤侠型
- 红绫软兵女侠型
- 铁面缉凶型

## Verdict table

| Build | Intended fantasy | Current support | Gap | Ticket ID | Verdict |
|---|---|---|---|---|---|
| 扫地僧型 | 返璞归真、纯主修练深后压倒众人的宗师感 | 精修 1/2/3 与纯主修终局口径仍可承载 | 无新回归 | — | Pass |
| 独臂剑侠型 | 残缺之身仍以剑理、节奏与应变压人 | 游锋 `断势` / `藏锋` 支撑残式应变、少招高判、孤剑风骨 | 无新回归 | — | Pass |
| 琴魔型 | 以魔音扰心、错拍压魄、独奏也能压场 | 音律主修与 `魔音` 自足成立，低魔扰心边界清楚 | 无新回归 | — | Pass |
| 白衣琴医型 | 白衣医者兼琴者，以音稳场、以药救命 | 药师 / 音律旁修三层接口支撑稳场后急救的小回环 | 无新回归 | — | Pass |
| 黑衣刺客型 | 黑衣潜行、借阴影接敌、一击封喉后抽身 | 影踪主修与旁修梯度支撑潜入、接敌、抽身重开 | 无新回归 | — | Pass |
| 铁枪护法型 | 长兵护线、顶线反打、替队伍站住阵面 | 破军主修与守阵 / 震岳路线支撑护线与阵面威慑 | 无新回归 | — | Pass |
| 毒医圣手型 | 医与毒并存，能救人也能以险药制敌 | 药师主修、`济世 / 针脉 / 蛊毒` 的角色边界清楚 | 无新回归 | — | Pass |
| 机关奇人型 | 工巧百变、器具连锁、可回收再布置的怪才 | 奇门 / 机关与奇门旁修梯度解释工巧连锁、器具回收与低魔边界 | 无新回归 | — | Pass |
| 令狐冲型 | 洒脱孤剑、破招见高低、节奏不羁而剑理极高 | `断势` / `藏锋` 具备浪子剑客、残招应变、见招定输赢锚点 | 无新回归 | — | Pass |
| 黄药师型 | 音律、药理、机关 / 阵法兼修的邪门宗师 | 音律 / 药师 / 奇门旁修梯度足以拼出杂学宗师图像 | 无新回归 | — | Pass |
| 郭靖型 | 朴拙厚重、正大雄浑、靠扎实主功夫站住 | `拳掌` 主修与 `摧心` 支撑雄浑重掌与正面压势 | 无新回归 | — | Pass |
| 东方不败型 | 飞针、轻灵、妖异、高压迫节奏的针线 / 身法高手 | 药师 / 影踪接口支撑飞针先手、步法错位与再贴近压迫 | 无新回归 | — | Pass |
| 武僧型 | 清修、持戒、拳掌为骨、医理 / 护心为辅 | 角色形象层已写明由拳掌 + 传承倾向 + 药师/音律旁修 + 清修标签组合 | 无新回归 | WUX-007（closed） | Pass |
| 游侠型 | 行走江湖、机动应变、义气与探索感并重 | 游锋 + 断势/藏锋 + 影踪/射艺接口 + 江湖表现标签成立 | 无新回归 | WUX-007（closed） | Pass |
| 侠盗型 | 夜行劫富、出手利落又保有侠义标签 | 影踪或游锋 + 暗袭/设伏/藏锋 + 奇门/射艺接口 + 义盗/夜行标签成立 | 无新回归 | WUX-007（closed） | Pass |
| 丐帮帮主型 | 草莽领袖、掌棒并用、呼喝护众、正面压场 | 拳掌摧心 / 破军守阵 / 音律战鼓可支撑核心战斗感 | “丐帮 / 帮主 / 打狗棒”容易被误读成出身身份或新增棍法流派，需要 archetype 边界 | WUX-008 | Revise |
| 飞刀浪子型 | 一柄飞刀、一瞬定线、例不虚发又带浪子气 | 射艺穿杨 / 连珠支撑飞刀投射；影踪或游锋旁修补袖中出手、贴步转角 | 无 | — | Pass |
| 驭鹰孤侠型 | 孤侠与鹰同行，侦查、夹击、牵制或共同追猎 | 非战斗陪伴可作为表现标签；射艺猎踪可支撑“人自身追迹” | 若要求战斗兽伴行动经济，当前无 companion 资源 / counterplay / 主循环 | WUX-009 | Block |
| 红绫软兵女侠型 | 以红绫 / 软鞭缠卷牵拉、夺械换位、柔中带杀 | 游锋可支撑兵刃步法，奇门可支撑牵引表达，拳掌可支撑近身擒拿 | 软兵低魔动作语汇不足，容易滑向新职业或奇门法术 | WUX-010 | Revise |
| 铁面缉凶型 | 冷面追捕、查迹、制伏、以规则感压住恶徒 | 拳掌擒拿 + 射艺猎踪 / 影踪追迹可解释追捕制伏 | 不依赖捕快身份权限即可 pass | — | Pass |

## Ticket summary
- New open fantasy tickets: `WUX-008`, `WUX-009`, `WUX-010`.
- No old pass regression found.
- Highest-risk blocker: `WUX-009` companion boundary; recommendation is not to solve with current inheritance/side-study content, but to mark combat companion as deferred/future-system and preserve only presentation-level eagle fantasy this round.

## Round 1 fantasy checklist
- 20 个累计样例已全量复测。
- worker-1 本轮新增 5 个幻想，满足 3-5 quota。
- 未使用出身 / 身份作为 pass 条件。
- 未要求推翻固定流派。
- 新增问题均已转成可执行 ticket，并标注反压层级。

## Reviewer notes
1. 当前 canon 对“经典人型武侠幻想”覆盖较强；新缺口主要出现在帮派/称号误读、软兵器动作语汇、以及兽伴战斗系统边界。
2. `WUX-008` 与 `WUX-010` 适合 worker-2 通过角色形象示例、游锋/旁修文案边界补强解决。
3. `WUX-009` 不建议硬解；应清楚区分“鹰作为表现标签”与“鹰作为战斗单位”。后者需要未来 companion / party / action-economy 设计，不应污染本轮固定流派框架。
