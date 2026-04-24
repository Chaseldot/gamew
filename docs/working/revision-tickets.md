# Revision Tickets — Wuxia Systems Finish Loop

状态：open queue for finish-loop tickets

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

- ID: CRPG-01
- Source reviewer: worker-3
- Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md`（精修统一梯度；八门旁修 1 点 / 2 点 / 3 点）
- Problem: 当前仍有 27 个 `TBD`。在没有精修 1/2/3 与旁修 1/2/3 明确定义前，无法做 mixed-build identity、mandatory tax pick、placeholder hidden dependency 的真实 CRPG 审计。
- Expected revision: 按 `docs/design/00-rule-bible.md` 的统一语法补完精修与八门旁修全部梯度；每条只写入口 / 接口 / 小循环，不偷渡具体槽位数，并保留 `LOADOUT_INTERFACE_PENDING`、`MERIDIAN_SLOT_COUNT_PENDING`、`SLOT_PRESSURE_ASSUMPTION_ONLY`。
- Pass condition: `docs/design/03-side-studies-and-loadout.md` 不再出现 `TBD`；任一旁修 2 点都只影响主修资源流速、不改写资源规则；任一 3 点都没有越过主修主体权重。
- Status: open
- Resolution note:

- ID: CRPG-02
- Source reviewer: worker-3
- Impacted canon file / section: `docs/design/01-main-disciplines.md`（音律）；`docs/design/02-inheritances.md`（战鼓 / 清音 / 魔音）
- Problem: 音律主修在 01 中承诺“单人和组队两种语境下都独立成立”，但 02 的三传承目前更偏向队友呼应与群体节奏。缺少“没有队友即时跟拍时，本流派在回合 2-4 仍能如何自足成立”的明确表达，也缺少敌方可读的打断 / 拖拍 / 断拍窗口。
- Expected revision: 保留低魔音律 fantasy，不转成法师吟唱系统；但要在主修与三传承文本里补上单人成立的自足收益、短遭遇中的明确战术价值，以及敌方可互动的 counterplay 窗口。
- Pass condition: 读完 01 + 02 后，审计者能够明确说出音律在无队友即时配合时的起手、推进、收束与敌方反制点；且不需要新增 schema 或越界到高魔精神控制。
- Status: open
- Resolution note:

- ID: CRPG-03
- Source reviewer: worker-3
- Impacted canon file / section: `docs/design/01-main-disciplines.md`（奇门）；`docs/design/02-inheritances.md`（阵法 / 机关 / 符禁）
- Problem: 奇门现有文本已经立住“布置 → 诱发 → 改场”的 fantasy，但 CRPG 短遭遇里首回合价值与 setup tax 仍偏虚，且敌方如何识别、绕开、拆解其布置的 counterplay 表达不够具体，容易被读成模糊而强的场控总类。
- Expected revision: 为奇门主修与三传承补写“首回合就能提供的直接价值”“2-4 回合内的可验证收益”“敌方可读的互动 / 拆解窗口”；维持低魔、器具 / 阵眼 / 符印媒介，不滑向法术轰炸。
- Pass condition: 审计者能从文本直接看出奇门不是纯长 setup 税，也不是无解控场；每个分支都有自己的首回合价值与被针对方式。
- Status: open
- Resolution note:

- ID: CRPG-04
- Source reviewer: worker-3
- Impacted canon file / section: `docs/design/01-main-disciplines.md`（药师）；`docs/design/02-inheritances.md`（济世 / 针脉 / 蛊毒）
- Problem: 药师主修已经声明“不成为万能奶妈 / 万能控制 / 万能持续伤害”，但三传承目前仍缺少足够硬的机会成本表达，容易在 CRPG 队伍职责里同时占走救场、控制、侵蚀多个高价值位置。
- Expected revision: 强化三传承各自最擅长的 encounter role，并明确各自不包办什么；保留医毒双向 fantasy，但把队伍职责边界写得更硬，避免 omni-role 观感。
- Pass condition: 读完 01 + 02 后，审计者能明确区分济世 / 针脉 / 蛊毒各自最强的队伍职责、最核心的 2-4 回合价值，以及各自主动放弃的能力面；不再出现“一个传承同时包办治疗、控制、持续伤害顶配”的阅读结果。
- Status: open
- Resolution note:


- ID: WUX-001
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 精修统一梯度`
- Problem: 精修 1/2/3 当前全部 `TBD`，导致“纯主修练深成宗师”的经典幻想无从落地。扫地僧型与郭靖型都需要一个不靠旁修税、只靠主修深练也能成立的完成路径。
- Expected revision: 补完精修统一梯度，明确 1 点 = 起手 / 稳定性，2 点 = 主修核心动作强化，3 点 = 宗师技强化或体系完成奖励，并给出能支撑“返璞归真 / 朴拙雄浑”的描述口径，但不要把精修写成第二传承。
- Pass condition: 仅阅读主修 + 精修文本，就能说明“扫地僧型 / 郭靖型”为何可以纯主修成立，且不依赖 `LOADOUT_INTERFACE_PENDING` 之外的新增规则。
- Status: resolved
- Resolution note: Pass D retest against leader HEAD `3ce7e84`: `03-side-studies-and-loadout.md` 已补完精修 1/2/3，纯主修宗师路径可直接解释扫地僧型 / 郭靖型为何不依赖额外旁修税而成立。

- ID: WUX-002
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 药师旁修梯度` + `## 音律旁修梯度`
- Problem: 白衣琴医型当前只能看见“药师/济世”与“音律/清音”两个孤立主修，完全没有旁修接口说明音律如何辅助施治、药师如何借节拍稳场。
- Expected revision: 为药师↔音律补出 1/2/3 点接口：1 点给轻量稳拍 / 安神 / 节奏化施治入口，2 点给音律与药性 / 异常处理的结构连接，3 点给不吞主修的小循环（例如“以音稳场后接急救”或“以药理稳脉后续拍”）。
- Pass condition: 能在不把药师变成纯辅助、不把音律变成奶妈的前提下，写出白衣琴医型的可行 build 说明。
- Status: resolved
- Resolution note: Pass D retest against leader HEAD `3ce7e84`: 药师 / 音律旁修 1/2/3 已形成稳拍、节拍承接与小型医音回环，白衣琴医型在不吞主修的前提下可直接说明。

- ID: WUX-003
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 奇门旁修梯度` + `## 音律旁修梯度` + `## 药师旁修梯度`
- Problem: 黄药师型需要“音律 + 药理 + 奇门 / 机关”的杂学宗师拼图，但当前 side-study 完全空白，无法判断该幻想如何在 schema 内成立而不变成万能解题器。
- Expected revision: 为黄药师型至少补出可读的跨主修接口口径：奇门提供地形 / 器具 / 阵眼的轻接入，音律提供节拍 / 心神接口，药师提供药理 / 针毒接口，并明确这些都只能是入口 / 接口 / 小循环，不能吞掉主修闭环。
- Pass condition: 读者能看出“黄药师型可以成立”，同时也能看出它为何仍然受主修边界约束，不会变成全能高魔职业。
- Status: resolved
- Resolution note: Pass D retest against leader HEAD `3ce7e84`: 奇门 / 音律 / 药师三组旁修接口均已补完，黄药师型的杂学宗师拼图已能成立，且文本明确保留主修边界，未滑成万能解题器。

- ID: WUX-004
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/02-inheritances.md` / `## 游锋 -> ### 断势` + `### 藏锋`
- Problem: 断势 / 藏锋已有破招、反制、藏势框架，但还不够像“独臂剑侠型 / 令狐冲型”这种经典孤剑 archetype；当前更像抽象系统模板，缺少“残招应变 / 以少胜多 / 破招为尊”的明确 anchor。
- Expected revision: 在不改 schema 的前提下，强化断势或藏锋的代表动作 / 边界定义 / 核心幻想，使其更明确支持单臂 / 残招 / 浪子剑客 / 见招拆招式剑理表达，但不要把它写成影踪潜行刺客，也不要要求固定副修才能成立。
- Pass condition: 复测时可以直接用游锋主修 + 对应传承解释“独臂剑侠型 / 令狐冲型”为何成立，而且不需要引用额外 house rule。
- Status: open
- Resolution note: Pass D retest against leader HEAD `3ce7e84`: 游锋 `断势` / `藏锋` 的系统骨架仍在，但本轮未新增“残招应变 / 独臂孤剑 / 浪子剑客”的更硬人物锚点，因此维持 revise。

- ID: WUX-005
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/01-main-disciplines.md` / `## 拳掌` + `docs/design/02-inheritances.md` / `## 拳掌 -> ### 摧心`
- Problem: 拳掌当前三传承整体偏点穴、擒拿、迟发内伤，容易把拳掌主修读成“精密控制 / 阴劲伤身”一侧，缺少“雄浑正大、朴拙厚重”的掌路 anchor，郭靖型因此只成立了一半。
- Expected revision: 保留拳掌的经脉与贴身本质，但让主修终局或摧心分支明确容纳“重掌破势 / 正面雄浑掌劲”的表达，不要把其唯一高阶落点写成阴狠迟发内伤。
- Pass condition: 复测时能用现有拳掌 schema 合理解释“郭靖型”为何成立，并且不需要转借破军来替拳掌补身份。
- Status: open
- Resolution note: Pass D retest against leader HEAD `3ce7e84`: `WUX-001` 解决后纯主修练深已可成立，但拳掌主修与 `摧心` 仍未明确补上“雄浑正大掌劲”的代表性表达，因此维持 revise。

- ID: WUX-006
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 药师旁修梯度` + `## 影踪旁修梯度`; optional supporting rewrite in `docs/design/02-inheritances.md` / `## 药师 -> ### 针脉`
- Problem: 东方不败型需要“飞针 / 绣针式远近混压 + 极轻灵错位 + 高速压迫节奏”。当前针脉只给了精确针路，影踪只给了错位切入，但两者之间没有任何 side-study interface，因此只能看见零件，看不见 build。
- Expected revision: 补出药师↔影踪的 1/2/3 点接口，让飞针、步法、切入与节奏压迫能形成小循环；如有必要，再把针脉的代表动作稍微向“高速针压”方向写清，但仍保持低魔、可互动边界。
- Pass condition: 复测时可以在不诉诸超自然瞬移 / 妖术的前提下，说明东方不败型的核心手感如何成立。
- Status: resolved
- Resolution note: Pass D retest against leader HEAD `3ce7e84`: `针脉` 的飞针 / 连针骨架结合新版药师旁修与影踪旁修，已经足以在低魔边界内解释“高速针压 + 轻灵错位”的东方不败型 build。

## Resolved tickets

暂无。
