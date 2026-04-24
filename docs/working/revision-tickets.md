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

暂无。worker-2 / worker-3 在 Pass B 后追加。


- ID: WUX-001
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 精修统一梯度`
- Problem: 精修 1/2/3 当前全部 `TBD`，导致“纯主修练深成宗师”的经典幻想无从落地。扫地僧型与郭靖型都需要一个不靠旁修税、只靠主修深练也能成立的完成路径。
- Expected revision: 补完精修统一梯度，明确 1 点 = 起手 / 稳定性，2 点 = 主修核心动作强化，3 点 = 宗师技强化或体系完成奖励，并给出能支撑“返璞归真 / 朴拙雄浑”的描述口径，但不要把精修写成第二传承。
- Pass condition: 仅阅读主修 + 精修文本，就能说明“扫地僧型 / 郭靖型”为何可以纯主修成立，且不依赖 `LOADOUT_INTERFACE_PENDING` 之外的新增规则。
- Status: open
- Resolution note:

- ID: WUX-002
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 药师旁修梯度` + `## 音律旁修梯度`
- Problem: 白衣琴医型当前只能看见“药师/济世”与“音律/清音”两个孤立主修，完全没有旁修接口说明音律如何辅助施治、药师如何借节拍稳场。
- Expected revision: 为药师↔音律补出 1/2/3 点接口：1 点给轻量稳拍 / 安神 / 节奏化施治入口，2 点给音律与药性 / 异常处理的结构连接，3 点给不吞主修的小循环（例如“以音稳场后接急救”或“以药理稳脉后续拍”）。
- Pass condition: 能在不把药师变成纯辅助、不把音律变成奶妈的前提下，写出白衣琴医型的可行 build 说明。
- Status: open
- Resolution note:

- ID: WUX-003
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 奇门旁修梯度` + `## 音律旁修梯度` + `## 药师旁修梯度`
- Problem: 黄药师型需要“音律 + 药理 + 奇门 / 机关”的杂学宗师拼图，但当前 side-study 完全空白，无法判断该幻想如何在 schema 内成立而不变成万能解题器。
- Expected revision: 为黄药师型至少补出可读的跨主修接口口径：奇门提供地形 / 器具 / 阵眼的轻接入，音律提供节拍 / 心神接口，药师提供药理 / 针毒接口，并明确这些都只能是入口 / 接口 / 小循环，不能吞掉主修闭环。
- Pass condition: 读者能看出“黄药师型可以成立”，同时也能看出它为何仍然受主修边界约束，不会变成全能高魔职业。
- Status: open
- Resolution note:

- ID: WUX-004
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/02-inheritances.md` / `## 游锋 -> ### 断势` + `### 藏锋`
- Problem: 断势 / 藏锋已有破招、反制、藏势框架，但还不够像“独臂剑侠型 / 令狐冲型”这种经典孤剑 archetype；当前更像抽象系统模板，缺少“残招应变 / 以少胜多 / 破招为尊”的明确 anchor。
- Expected revision: 在不改 schema 的前提下，强化断势或藏锋的代表动作 / 边界定义 / 核心幻想，使其更明确支持单臂 / 残招 / 浪子剑客 / 见招拆招式剑理表达，但不要把它写成影踪潜行刺客，也不要要求固定副修才能成立。
- Pass condition: 复测时可以直接用游锋主修 + 对应传承解释“独臂剑侠型 / 令狐冲型”为何成立，而且不需要引用额外 house rule。
- Status: open
- Resolution note:

- ID: WUX-005
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/01-main-disciplines.md` / `## 拳掌` + `docs/design/02-inheritances.md` / `## 拳掌 -> ### 摧心`
- Problem: 拳掌当前三传承整体偏点穴、擒拿、迟发内伤，容易把拳掌主修读成“精密控制 / 阴劲伤身”一侧，缺少“雄浑正大、朴拙厚重”的掌路 anchor，郭靖型因此只成立了一半。
- Expected revision: 保留拳掌的经脉与贴身本质，但让主修终局或摧心分支明确容纳“重掌破势 / 正面雄浑掌劲”的表达，不要把其唯一高阶落点写成阴狠迟发内伤。
- Pass condition: 复测时能用现有拳掌 schema 合理解释“郭靖型”为何成立，并且不需要转借破军来替拳掌补身份。
- Status: open
- Resolution note:

- ID: WUX-006
- Source reviewer: worker-2 / Wuxia Fantasy Reviewer
- Impacted canon file / section: `docs/design/03-side-studies-and-loadout.md` / `## 药师旁修梯度` + `## 影踪旁修梯度`; optional supporting rewrite in `docs/design/02-inheritances.md` / `## 药师 -> ### 针脉`
- Problem: 东方不败型需要“飞针 / 绣针式远近混压 + 极轻灵错位 + 高速压迫节奏”。当前针脉只给了精确针路，影踪只给了错位切入，但两者之间没有任何 side-study interface，因此只能看见零件，看不见 build。
- Expected revision: 补出药师↔影踪的 1/2/3 点接口，让飞针、步法、切入与节奏压迫能形成小循环；如有必要，再把针脉的代表动作稍微向“高速针压”方向写清，但仍保持低魔、可互动边界。
- Pass condition: 复测时可以在不诉诸超自然瞬移 / 妖术的前提下，说明东方不败型的核心手感如何成立。
- Status: open
- Resolution note:

## Resolved tickets

暂无。
