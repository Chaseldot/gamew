# Revision Tickets — Wuxia Systems Iteration Loop

状态：open queue for layer-hierarchy iteration tickets

## Ticket format
- ID:
- Source reviewer:
- Impacted canon file / section:
- Problem:
- Expected revision:
- Pass condition:
- Status: open / resolved / rejected / escalated
- Resolution note:

## Open tickets

- ID: WUX-007
  Source reviewer: worker-2 / Wuxia Fantasy Reviewer
  Impacted canon file / section: `docs/design/05-identity-and-archetypes.md` / `## Archetype build grammar` 示例表
  Problem: `武僧 / 游侠 / 侠盗` 三个 archetype 示例仍混入未定义系统词（`心法`、`轻功`、`暗器`、`轻身主轴`），并把可成立的底层组合写得过于含糊，容易让读者误以为角色形象仍依赖隐藏职业 / 子系统。
  Expected revision: 用当前 canon 已存在的层级词重写相关示例，明确这些 archetype 由现有流派 / 传承 / 旁修 / 表现标签组合得出；至少把 `武僧`、`游侠`、`侠盗` 改写成可直接映射到现有系统文档的组合方向。
  Pass condition: 读者只读当前 canon，就能在不诉诸 `出身 / 身份`、不假设额外 `心法 / 轻功 / 暗器` 子系统的前提下，解释 `武僧 / 游侠 / 侠盗` 如何成立。
  Status: resolved
  Resolution note: 已将武僧 / 游侠 / 侠盗示例改为现有流派、传承、旁修接口与表现标签组合，移除 `心法`、`轻功`、`暗器`、`轻身主轴` 等未定义子系统依赖；见 `docs/design/05-identity-and-archetypes.md`。


- ID: WUX-008
  Source reviewer: worker-1 / Senior Wuxia Fan
  Impacted canon file / section: `docs/design/05-identity-and-archetypes.md` / `## Archetype build grammar`
  Problem: `丐帮帮主型` 能由拳掌、破军、音律和角色形象拼出“草莽领袖、掌棒并用、呼喝护众”的幻想，但“丐帮 / 帮主 / 打狗棒”极易被读成出身 / 身份、帮派权限或新增棍法流派；当前 archetype 示例没有明确这类帮派称谓如何在 deferred 身份下暂存。
  Expected revision: 增加或改写 archetype 口径，说明草莽帮主 / 丐帮式幻想应先由拳掌或破军主轴、摧心 / 守阵 / 战鼓等倾向、音律或游锋旁修接口、草莽 / 号令 / 护众表现标签成立；帮派身份与具体江湖称号仅作为 deferred 包装，不可倒逼新增流派。
  Pass condition: 读者不借 `出身 / 身份`、不新增 `棍法` 流派，也能解释丐帮帮主型的战斗层；同时不会把“帮主”当作职业根节点。
  Priority: P1
  Status: resolved
  Resolution note: 已在 `docs/design/05-identity-and-archetypes.md` 增加丐帮帮主示例和帮派称谓边界：草莽领袖 / 掌棒 / 号令 / 护众由拳掌、破军、音律、游锋等既有层级解释；丐帮、帮主、打狗棒仅作为表现或 future identity 包装暂存，不新增棍法流派。

- ID: WUX-009
  Source reviewer: worker-1 / Senior Wuxia Fan
  Impacted canon file / section: `docs/design/05-identity-and-archetypes.md` / 角色形象边界；possible future companion escalation
  Problem: `驭鹰孤侠型` 暴露 companion 边界：射艺猎踪明确“不默认携带兽伴”，但角色形象层尚未说明“鹰 / 犬 / 灵兽”等同伴何时只是外观叙事，何时会要求独立战斗系统。若把战斗兽伴硬塞进射艺、影踪或奇门，会制造隐藏行动经济、不可读 counterplay 和新职业根。
  Expected revision: 在角色形象层增加边界说明：非战斗陪伴、侦查氛围、NPC 叙事可作为表现标签暂存；任何能在战斗中独立侦查、夹击、承伤、触发资源或占用行动经济的兽伴都必须 deferred / escalated 到 future companion system，不能由本轮传承或旁修偷渡解决。
  Pass condition: `驭鹰孤侠型` 被明确判为“表现标签可 pass，战斗 companion 版本 block/defer”，且不会污染射艺猎踪或影踪主循环。
  Priority: P1
  Status: rejected / escalated
  Resolution note: 已在 `docs/design/05-identity-and-archetypes.md` 增加 companion 边界和驭鹰孤侠示例：非战斗鹰伴可作为表现 / 侦查氛围 / 剧情陪伴；任何独立参战、夹击、承伤、触发资源或占用行动经济的兽伴都 deferred / escalated 到 future companion system，本轮不偷渡进射艺、影踪或奇门。

- ID: WUX-010
  Source reviewer: worker-1 / Senior Wuxia Fan
  Impacted canon file / section: `docs/design/01-main-disciplines.md` / `## 游锋`; `docs/design/02-inheritances.md` / 游锋相关传承; `docs/design/03-side-studies-and-loadout.md` / 游锋或奇门旁修接口
  Problem: `红绫软兵女侠型` 需要软兵 / 绳索 / 红绫的缠、卷、牵、夺械、借力回收手感。当前游锋强调兵刃贴身与锋势，奇门强调布置 / 符器，但两者都没有足够明确的低魔软兵动作语汇；玩家可能误以为必须新增“软兵职业”或把红绫写成高魔法术。
  Expected revision: 在不新增流派、不定义最终 loadout 槽位的前提下，为游锋或相关旁修补充“软兵作为兵刃表现”的口径：可用于换位、牵拉、夺械、短控入口或显锋 / 断势窗口，但不能变成奇门法术、远程硬控或 mandatory side-study tax。
  Pass condition: 读者能用现有流派层级解释红绫 / 软鞭 / 绳索女侠，并清楚其战术作用、边界和 counterplay，而不需要新职业根或高魔解释。
  Priority: P1
  Status: resolved
  Resolution note: 已在 `docs/design/01-main-disciplines.md`、`docs/design/02-inheritances.md`、`docs/design/03-side-studies-and-loadout.md` 和 `docs/design/05-identity-and-archetypes.md` 补充软兵 / 红绫口径：软兵作为游锋兵刃表现与旁修接口，提供缠卷、牵拉、夺械、换位、显锋 / 断势窗口；明确不新增软兵职业、不滑向奇门法术或无反制远程硬控。

新 ticket 必须说明它反压的是哪一层：
- 流派边界；
- 传承专精；
- 旁修横向工具；
- 角色形象；
- CRPG 玩法 / counterplay。

## Resolved tickets

- ID: WUX-001
  Source reviewer: worker-2 / Wuxia Fantasy Reviewer
  Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 精修统一梯度`
  Problem: 精修 1/2/3 仍为 `TBD`，纯主修宗师路线无法落地。
  Expected revision: 补完精修统一梯度，明确 1 点 = 起手 / 稳定性，2 点 = 主修核心动作强化，3 点 = 宗师技强化或体系完成奖励，并保留“练深”而非第二传承的口径。
  Pass condition: 仅阅读主修 + 精修文本即可说明纯主修宗师路线成立。
  Status: resolved
  Resolution note: 已补写精修 1/2/3，强调资源经营、核心动作容错与宗师级完成奖励；见 `docs/design/03-side-studies-and-loadout.md:14-17`。

- ID: WUX-002
  Source reviewer: worker-2 / Wuxia Fantasy Reviewer
  Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 药师旁修梯度` + `## 音律旁修梯度`
  Problem: 白衣琴医型缺少音律 ↔ 药师的结构接口。
  Expected revision: 为药师↔音律补出 1/2/3 点接口，支持稳拍、安神、节奏化施治与小循环回环。
  Pass condition: 能在不把药师变成纯辅助、不把音律变成奶妈的前提下解释白衣琴医型。
  Status: resolved
  Resolution note: 已补药师 / 音律旁修三层接口，新增安神稳脉、针药稳场、以音稳场后接急救的回环；见 `docs/design/03-side-studies-and-loadout.md:44-52`。

- ID: WUX-003
  Source reviewer: worker-2 / Wuxia Fantasy Reviewer
  Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 奇门旁修梯度` + `## 音律旁修梯度` + `## 药师旁修梯度`
  Problem: 黄药师型所需的杂学拼图缺少可读接口。
  Expected revision: 为奇门、音律、药师补出杂学接口口径，让地形 / 节拍 / 药理能拼成 build，但仍从属于主修主体。
  Pass condition: 读者能看出黄药师型成立且不滑成全能解题器。
  Status: resolved
  Resolution note: 已补奇门 / 音律 / 药师的杂学接入层，明确地形、节拍、药理只能作为入口 / 接口 / 小循环；见 `docs/design/03-side-studies-and-loadout.md:44-57`。

- ID: WUX-004
  Source reviewer: worker-2 / Wuxia Fantasy Reviewer
  Impacted canon file / section: `docs/design/02-inheritances.md` / `## 游锋 -> ### 断势` + `### 藏锋`
  Problem: 断势 / 藏锋 缺少独臂剑侠 / 令狐冲式残招孤剑锚点。
  Expected revision: 强化核心幻想、代表动作与边界定义，使其支持残招应变、以少胜多、破招为尊的表达。
  Pass condition: 可直接用游锋主修 + 对应传承解释经典孤剑 archetype。
  Status: resolved
  Resolution note: 已补断势 / 藏锋的残式应变、少招高判与孤剑路线表达；见 `docs/design/02-inheritances.md:19-35`。

- ID: WUX-005
  Source reviewer: worker-2 / Wuxia Fantasy Reviewer
  Impacted canon file / section: `docs/design/01-main-disciplines.md` / `## 拳掌` + `docs/design/02-inheritances.md` / `## 拳掌 -> ### 摧心`
  Problem: 拳掌缺少“雄浑正大、朴拙厚重”的掌路 anchor。
  Expected revision: 保留经脉与贴身本质，同时明确重掌破势、正面压垮对手的高阶落点。
  Pass condition: 可合理解释郭靖型成立，而不需借破军补身份。
  Status: resolved
  Resolution note: 已在拳掌主修与摧心传承中加入雄浑重掌、破势重掌与正面压垮表达；见 `docs/design/01-main-disciplines.md:23-28`、`docs/design/02-inheritances.md:84-90`。

- ID: WUX-006
  Source reviewer: worker-2 / Wuxia Fantasy Reviewer
  Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 药师旁修梯度` + `## 影踪旁修梯度`
  Problem: 东方不败型缺少飞针 / 绣针式高速压迫的结构接口。
  Expected revision: 补出药师↔影踪接口，让飞针、步法、切入与节奏压迫能形成小循环。
  Pass condition: 能在不诉诸超自然瞬移 / 妖术的前提下说明手感成立。
  Status: resolved
  Resolution note: 已补药师 / 影踪的针药、飞针先手与匿踪回转接口；见 `docs/design/03-side-studies-and-loadout.md:39-47`。

- ID: CRPG-01
  Source reviewer: worker-3 / CRPG Systems Reviewer
  Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 精修统一梯度` + `## 八门旁修梯度`
  Problem: `TBD` 仍然存在，无法进行 mixed-build identity 与 placeholder hidden dependency 审计。
  Expected revision: 补完精修与八门旁修 1/2/3 梯度，保持 `LOADOUT_INTERFACE_PENDING`、`MERIDIAN_SLOT_COUNT_PENDING`、`SLOT_PRESSURE_ASSUMPTION_ONLY`。
  Pass condition: `03-side-studies-and-loadout.md` 不再出现 `TBD`。
  Status: resolved
  Resolution note: 已清空 `TBD`，补完全部精修与旁修三层接口；见 `docs/design/03-side-studies-and-loadout.md:14-57`。

- ID: CRPG-02
  Source reviewer: worker-3 / CRPG Systems Reviewer
  Impacted canon file / section: `docs/design/01-main-disciplines.md`（音律）；`docs/design/02-inheritances.md`（战鼓 / 清音 / 魔音）
  Problem: 音律缺少单人成立、2-4 回合节奏价值与敌方反制窗口。
  Expected revision: 为主修与三传承补足自足收益、短遭遇价值与可读 counterplay。
  Pass condition: 无队友即时跟拍时，音律的起手 / 推进 / 收束 / 反制点仍清楚可读。
  Status: resolved
  Resolution note: 已在音律主修与三传承中补足自稳产拍、断拍窗口与单人短遭遇价值；见 `docs/design/01-main-disciplines.md:55-63`、`docs/design/02-inheritances.md:177-203`。

- ID: CRPG-03
  Source reviewer: worker-3 / CRPG Systems Reviewer
  Impacted canon file / section: `docs/design/01-main-disciplines.md`（奇门）；`docs/design/02-inheritances.md`（阵法 / 机关 / 符禁）
  Problem: 奇门首回合价值与拆解 counterplay 不够具体。
  Expected revision: 补写首拍直接价值、2-4 回合收益与敌方可读拆解窗口。
  Pass condition: 奇门不是纯长 setup 税，也不是无解控场总类。
  Status: resolved
  Resolution note: 已在奇门主修与三传承中补入首回合价值、迁阵收益与拆阵 / 绕阵 / 破器具窗口；见 `docs/design/01-main-disciplines.md:62-63`、`docs/design/02-inheritances.md:213-231`。

- ID: CRPG-04
  Source reviewer: worker-3 / CRPG Systems Reviewer
  Impacted canon file / section: `docs/design/01-main-disciplines.md`（药师）；`docs/design/02-inheritances.md`（济世 / 针脉 / 蛊毒）
  Problem: 药师 / 传承容易被读成 omni-role。
  Expected revision: 强化三传承的 encounter role 与明确不包办内容。
  Pass condition: 可明确区分各自队伍职责与主动放弃面。
  Status: resolved
  Resolution note: 已在药师主修与三传承中写硬角色边界与 2-4 回合价值；见 `docs/design/01-main-disciplines.md:48-49`、`docs/design/02-inheritances.md:149-175`。

## Worker-2 canon resolution entries — Round 1

- ID: W2-R1-001
  Source reviewer: worker-2 / Canon Systems Designer
  Impacted canon file / section: `docs/design/05-identity-and-archetypes.md` / `## Archetype build grammar` 示例表与当前 round guardrails
  Problem: 当前 loop 要求“流派固定，传承 / 旁修 / 角色形象可变，出身 / 身份 deferred”，但角色形象页缺少一段直接指导 canon rewrite 如何在三种可变层之间分流幻想压力的规则。
  Expected revision: 增加当前 round rewrite guardrails，并补充能覆盖累计幻想 suite 中扫地僧、黄药师、东方不败的角色形象组合样例。
  Pass condition: 读者可以不用出身 / 身份、不新增职业根节点，就把这些幻想映射到主修、传承、旁修和表现标签。
  Status: resolved
  Resolution note: 已新增三类可变层分流规则，并补充扫地僧 / 黄药师 / 东方不败示例；同时更正 canon 文档 stale owner metadata 为 worker-2。
