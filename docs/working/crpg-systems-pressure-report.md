# CRPG Systems Pressure Report

状态：Pass B 初审完成，等待 canon 返修与复测
Owner：worker-3

## Review rule
本文件不直接改 canon。所有问题必须转成 `docs/working/revision-tickets.md` 中的 ticket，并在 worker-1 返修后复测。

## Review basis
- 已审阅：`docs/working/baseline-snapshot.md`
- 已审阅：`docs/design/00-rule-bible.md`
- 已审阅：`docs/design/01-main-disciplines.md`
- 已审阅：`docs/design/02-inheritances.md`
- 已审阅：`docs/design/03-side-studies-and-loadout.md`
- 已审阅：`docs/design/04-build-examples-and-audit.md`

## Gate snapshot
- `docs/design/01-main-disciplines.md`：8/8 主修已按 5 字段填写，可做主修级 CRPG 压力审阅。
- `docs/design/02-inheritances.md`：24/24 传承 section 已齐，可做同门分化、回合结构、职责边界审阅。
- `docs/design/03-side-studies-and-loadout.md`：仍有 27 个 `TBD`，精修与旁修 1/2/3 梯度尚未定稿。
- 结论：本轮可先产出 **school / inheritance 级** CRPG tickets；凡依赖旁修接口、精修终局或 mixed-build tax 判断的结论，一律只能给 **BLOCK / provisional**，不得假装已过审。

## Required checks
- action economy
- 2-4 turn tactical rhythm
- resource pressure
- encounter value
- counterplay readability
- party role and synergy
- pure-main viability
- mixed-build identity
- mandatory tax pick risk
- placeholder hidden dependency risk

## Verdict table

| Check | Current support | Risk | Ticket ID | Verdict |
|---|---|---|---|---|
| action economy | 8 个主修与 24 个传承都已有起手 / 推进 / 收束描述 | 旁修 / 精修接口缺失，混修行动线无法做真实回合验证 | CRPG-01 | BLOCK |
| 2-4 turn tactical rhythm | 大多数主修已具备可读循环 | 音律三传承过度倚赖队友呼应，单人或低配队回合 2-4 的自足收益不够明确 | CRPG-02 | REVISE |
| resource pressure | 八大主资源都已定义 | 没有 03 的旁修 / 精修梯度，无法判断副修是否偷走资源压力或变成隐形税点 | CRPG-01 | BLOCK |
| encounter value | 游锋 / 破军 / 拳掌 / 射艺 / 影踪现有文本已能支撑短遭遇价值 | 奇门三传承首回合价值与短战收益表达偏弱，容易变成 setup tax | CRPG-03 | REVISE |
| counterplay readability | 多数传承已写出自我边界 | 音律与奇门缺少更明确的敌方互动窗口，容易被读成不可对抗的 aura / control | CRPG-02, CRPG-03 | REVISE |
| party role and synergy | 破军、射艺、影踪的队伍职责较清晰 | 药师三传承目前仍有“治疗 / 控制 / 侵蚀全都强拿”的观感风险 | CRPG-04 | REVISE |
| pure-main viability | 01 已明确纯主修终局落点，02 大多跟上 | 音律、奇门、药师部分分支仍需补足“不靠混修也成立”的明确回合收益 | CRPG-02, CRPG-03, CRPG-04 | REVISE |
| mixed-build identity | 当前只能审框架，不能审 build | 03 未定稿前，无法验证混修主次、接口深度与 fantasy 完整性 | CRPG-01 | BLOCK |
| mandatory tax pick risk | 00 / baseline 已声明禁止 tax pick | 03 未定稿前无法证明“没有某旁修就玩不了”的风险已经解除 | CRPG-01 | BLOCK |
| placeholder hidden dependency risk | 01 / 02 目前仍遵守占位符边界 | 若在 03 未完成时提前放行 audit，就会把 slot / loadout 假设偷渡进 build 结论 | CRPG-01 | BLOCK |

## Key findings
1. **P0 gate blocker — side-study / refinement 仍是空架子**
   `docs/design/03-side-studies-and-loadout.md` 还未提供八门旁修的 1 点入口 / 2 点接口 / 3 点小循环，也未提供精修 1/2/3。任何 mixed-build、tax-pick、placeholder dependency 结论现在都不可信。
2. **P1 revise — 音律需要更清楚的单人成立与反制窗口**
   `战鼓 / 清音 / 魔音` 目前有强烈团队幻想，但 CRPG 文本还应写明：没有队友立即跟拍时，本流派在回合 2-4 依然能靠自身节拍做出稳定收益，同时敌方可以通过哪些可读手段打断或拖拍。
3. **P1 revise — 奇门需要更强的首回合价值与敌方读解性**
   `阵法 / 机关 / 符禁` 的中盘想象已经存在，但短战与遭遇战中“先布后赚”的成本偏高；需要把“首回合就能提供什么”和“敌人如何识别 / 绕开 / 拆解”写得更落地。
4. **P1 revise — 药师需要更硬的机会成本来守住队伍职责边界**
   `济世 / 针脉 / 蛊毒` 已经有方向差异，但仍要进一步写清：各分支最擅长什么、明确不包办什么，否则容易在队伍生态里同时抢治疗、控制、侵蚀三个高价值位。

## Required fantasy builds — CRPG snapshot
| Build | Current read | Evidence note |
|---|---|---|
| 扫地僧型 | BLOCK | 精修 1/2/3 仍是 `TBD`，无法验证纯主修 / 纯精修宗师路线。 |
| 独臂剑侠型 | PASS（provisional） | 游锋主修与三传承都已有明确近身节奏与收束；待 03 定稿后复查 tax pick 风险。 |
| 琴魔型 | REVISE | 音律压迫感成立，但单人局与少队友局的自足战术价值仍需补写。 |
| 白衣琴医型 | BLOCK | 音律 × 药师的主次接口依赖 03 的旁修梯度，当前不能假装 build 已自洽。 |
| 黑衣刺客型 | PASS（provisional） | 影踪三传承的接敌、收割、脱离链已较完整，且反制窗口仍落在低魔范围。 |
| 铁枪护法型 | PASS（provisional） | 破军三传承的阵线职责分化清楚，守阵具备可读的护线 / 反推价值。 |
| 毒医圣手型 | REVISE | 药师 fantasy 已立住，但仍需补足机会成本，避免变成 omni-role。 |
| 机关奇人型 | REVISE | 奇门局部改场 fantasy 成立，但首回合收益与敌方 counterplay 仍偏虚。 |

## Retest focus after canon rewrite
- `03-side-studies-and-loadout.md` 是否已把八门旁修 1/2/3 与精修 1/2/3 全部写满，并保持占位符协议。
- 音律三传承是否明确写出“无队友即时配合时”的自足收益与可读反制。
- 奇门三传承是否明确写出首回合价值、短遭遇收益、敌方拆解窗口。
- 药师三传承是否补足“不会包办什么”的硬边界与队伍职责代价。
