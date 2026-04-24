# Wuxia Fantasy Pressure Report

状态：Pass D 角色形象复测（candidate compile baseline: worker HEAD `d749db5`）
Owner：worker-2

## Review rule
本文件不直接改 canon。所有问题必须先转成 `docs/working/revision-tickets.md` 中的 ticket；只有在 canon 返修完成后，才以本报告做复测与放行证据。

## Current loop status
- 本轮基于当前 canon `d749db5` 复测：旧票 `WUX-001` ~ `WUX-007` 均已不再构成 fantasy lane 阻塞。
- `流派固定；传承 / 旁修 / 角色形象可迭代；出身 / 身份 deferred` 的层级边界在 `00-rule-bible.md`、`03-side-studies-and-loadout.md` 与 `05-identity-and-archetypes.md` 中保持一致。
- `05-identity-and-archetypes.md` 已把 `武僧 / 游侠 / 侠盗` 的 archetype 示例改写回现有 canon 术语，不再依赖未定义的隐藏职业、额外轻功子系统或 deferred 身份层。
- 本轮 fantasy reviewer 结论：**当前 15 个必测样例都已能被解释成“流派主轴 + 传承倾向 + 旁修工具 + 表现标签”的结果**；剩余风险只在后续 build audit / loadout budget，而不在角色形象 grammar。

## Verdict rule
- **Pass** = 现有主修 / 传承 / 旁修 / 表现标签已足以解释该 fantasy，且不需要回到职业根节点或出身/身份层。
- **Revise** = 底层构筑已经接近成立，但角色形象层的 canon 表述仍不够“拿来即懂”，会误导玩家把幻想理解成未定义子系统或背景绑定。
- **Block** = 当前层级里仍不存在必要构筑接口，或必须依赖 deferred 规则才能成立。

## Required fantasy samples
- 扫地僧型
- 独臂剑侠型
- 琴魔型
- 白衣琴医型
- 黑衣刺客型
- 铁枪护法型
- 毒医圣手型
- 机关奇人型
- 令狐冲型
- 黄药师型
- 郭靖型
- 东方不败型
- 武僧型
- 游侠型
- 侠盗型

## Verdict table

| Build | Intended fantasy | Current support | Gap | Ticket ID | Verdict |
|---|---|---|---|---|---|
| 扫地僧型 | 返璞归真、纯主修练深后压倒众人的宗师感 | `03-side-studies-and-loadout.md` 的精修 1/2/3 已能直接承载“练深到宗师”的纯主修路线，且不需要第二职业 | 仅剩后续 loadout 审计风险，不属于角色形象层缺口 | — | Pass |
| 独臂剑侠型 | 残缺之身仍以剑理、节奏与应变压人 | `02-inheritances.md` 的 `断势` / `藏锋` 已提供残式应变、少招高判、孤剑风骨与后发破先手锚点 | 无 | — | Pass |
| 琴魔型 | 以魔音扰心、错拍压魄、独奏也能压场的邪魅高手 | 音律主修与 `魔音` 传承已能自足成立，角色形象层也明确“魔”来自表现与代价，不靠高魔解释 | 无 | — | Pass |
| 白衣琴医型 | 白衣医者兼琴者，以音稳场、以药救命 | 药师 / 音律旁修三层接口已能解释“以音稳场后接急救”的小回环 | 仅剩后续 loadout 审计风险，不属于角色形象层缺口 | — | Pass |
| 黑衣刺客型 | 黑衣潜行、借阴影接敌、一击封喉后抽身 | 影踪主修与旁修梯度稳定支撑潜入、接敌、抽身重开 | 无 | — | Pass |
| 铁枪护法型 | 长兵护线、顶线反打、替队伍站住阵面 | 破军主修与守阵 / 震岳路线仍可稳定解释护线与阵面威慑 | 无 | — | Pass |
| 毒医圣手型 | 医与毒并存，能救人也能以险药制敌 | 药师主修、`济世 / 针脉 / 蛊毒` 的角色边界与 2-4 回合价值已清楚 | 无 | — | Pass |
| 机关奇人型 | 工巧百变、器具连锁、可回收再布置的怪才 | 奇门 / 机关与奇门旁修梯度已能解释工巧连锁、器具回收与低魔边界 | 无 | — | Pass |
| 令狐冲型 | 洒脱孤剑、破招见高低、节奏不羁而剑理极高 | `断势` / `藏锋` 现已具备浪子剑客、残招应变、见招定输赢的直观锚点 | 无 | — | Pass |
| 黄药师型 | 音律、药理、机关 / 阵法兼修的邪门宗师 | 音律 / 药师 / 奇门的旁修梯度足以拼出“杂而不乱”的杂学宗师图像 | 仅剩后续 loadout 审计风险，不属于角色形象层缺口 | — | Pass |
| 郭靖型 | 朴拙厚重、正大雄浑、靠扎实主功夫站住的正派大侠 | `拳掌` 主修与 `摧心` 已补上正面雄掌破势、厚重掌路与里外同伤表达 | 无 | — | Pass |
| 东方不败型 | 飞针、轻灵、妖异、极高压迫节奏的针线 / 身法高手 | 药师 / 影踪接口已足够解释飞针先手、步法错位与再贴近压迫 | 仅剩后续 loadout 审计风险，不属于角色形象层缺口 | — | Pass |
| 武僧型 | 清修、持戒、拳掌为骨、医理 / 护心为辅的修行武者 | `05-identity-and-archetypes.md` 已明确“武僧是结果不是职业”，并把构筑改写为拳掌主轴 + 点穴/擒拿/摧心倾向 + 药师或音律旁修接口 + 清修表现标签 | 无 | WUX-007（closed） | Pass |
| 游侠型 | 行走江湖、机动应变、义气与探索感并重的浪客 | `05-identity-and-archetypes.md` 已改写为游锋主轴 + 断势/藏锋倾向 + 影踪或射艺旁修接口 + 江湖行走表现标签 | 无 | WUX-007（closed） | Pass |
| 侠盗型 | 轻灵潜行、夜行劫富、出手利落又保有侠义标签的江湖盗客 | `05-identity-and-archetypes.md` 已改写为游锋或影踪主轴 + 藏锋/暗袭/设伏倾向 + 奇门或射艺旁修接口 + 义盗/夜行表现标签 | 无 | WUX-007（closed） | Pass |

## Ticket summary
- `WUX-001` ~ `WUX-006`：持续通过。
- `WUX-007`：已由 archetype 示例改写解决，复测通过。
- 本轮 fantasy lane **无新增 revise / block ticket**。

## Pass D checklist
- 15 个必测样例全部通过；无样例要求新增职业根节点。
- 武僧 / 游侠 / 侠盗现已完全回收到现有流派、传承、旁修与表现标签语法。
- 本轮没有发现必须借 `出身 / 身份` 才能成立的核心幻想。
- 本轮没有发现会把某个旁修写成 mandatory tax 的角色形象表达。

## Reviewer notes
1. 当前 canon 已能把熟悉武侠幻想稳定解释成“流派主轴 + 传承倾向 + 旁修工具 + 表现标签”的结果，而不是职业根节点。
2. fantasy lane 的开放风险已经从“层级不够表达”收缩为“未来 loadout budget 是否允许这些组合以足够顺手的成本落地”；这属于 compile / audit 阶段，不属于当前 archetype grammar 阻塞。
3. 就角色形象层而言，本轮可放行进入 compile evidence 汇总。
