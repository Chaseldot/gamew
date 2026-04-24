# CRPG Systems Pressure Report

状态：Pass D 复测完成，等待定向 canon 返修
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
- Pass D 复测目标：worker-1 canon rewrite（worktree HEAD `fa446c5`；leader mailbox 指向 rewrite 已落地）

## Gate snapshot
- `docs/design/01-main-disciplines.md`：8/8 主修维持完整 5 字段。
- `docs/design/02-inheritances.md`：24/24 传承 section 仍齐，且药师 / 音律 / 奇门已按 ticket 方向做定向返修。
- `docs/design/03-side-studies-and-loadout.md`：八门旁修 1/2/3 与精修 1/2/3 已补完，`TBD = 0`。
- 占位符协议仍在：`LOADOUT_INTERFACE_PENDING`、`MERIDIAN_SLOT_COUNT_PENDING`、`SLOT_PRESSURE_ASSUMPTION_ONLY`。
- 结论：`CRPG-01` 已从 **BLOCK** 解除；当前 Pass D 剩余问题收敛为 `CRPG-02` 与 `CRPG-03` 两个 **REVISE** 票。

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
| action economy | 03 已补完旁修 / 精修接口，mixed-build 行动线终于可读 | 音律与奇门在短遭遇中的主动回合价值仍偏虚 | CRPG-02, CRPG-03 | REVISE |
| 2-4 turn tactical rhythm | 多数主修与传承已具备清晰 2-4 回合循环；药师已明显改善 | 音律三传承仍偏队友呼应；奇门三传承仍偏“先布后赚” | CRPG-02, CRPG-03 | REVISE |
| resource pressure | 八大主资源 + 精修 / 旁修梯度已同时存在，可检查接口是否偷资源 | 音律 / 奇门仍需更清楚说明短战中何时赚、何时花、敌人如何拖节奏 | CRPG-02, CRPG-03 | REVISE |
| encounter value | 游锋 / 破军 / 拳掌 / 射艺 / 影踪 / 药师当前文本都能支撑短遭遇价值 | 奇门首回合价值仍不够落地 | CRPG-03 | REVISE |
| counterplay readability | 药师已明确非目标；大多数传承边界清楚 | 音律与奇门仍缺少更具体的敌方互动 / 打断 / 拆解窗口 | CRPG-02, CRPG-03 | REVISE |
| party role and synergy | 破军、射艺、影踪、药师职责更清晰；白衣琴医接口已在 03 立住 | 音律主次与奇门场域价值仍需更清楚地转成队伍决策点 | CRPG-02, CRPG-03 | REVISE |
| pure-main viability | 01 + 02 + 精修 1/2/3 已能支撑纯主修 / 纯精修阅读 | 音律、奇门仍需更明确写出“无队友 / 无额外 setup 时”的自足收益 | CRPG-02, CRPG-03 | REVISE |
| mixed-build identity | 03 的 1 / 2 / 3 点语法已让 mixed-build 主次关系可审 | 音律 × 药师已可读，但音律 / 奇门相关 build 仍有局部表达偏虚 | CRPG-02, CRPG-03 | REVISE |
| mandatory tax pick risk | 当前 03 没有出现单一必绑旁修；接口分配较均衡 | 需在后续 build audit 中继续验证个别 fantasy 是否会出现隐性优选，但已非 P0 问题 | — | PASS |
| placeholder hidden dependency risk | 03 明确保留三项占位符，且未偷渡具体槽位定数 | 个别射艺 / 奇门表达仍需在 build 审计中继续盯 `SLOT_PRESSURE_ASSUMPTION_ONLY`，但协议未破 | CRPG-01 | PASS |

## Key findings
1. **CRPG-01 — PASS / resolved**
   `docs/design/03-side-studies-and-loadout.md` 已完成精修 1/2/3 与八门旁修 1 / 2 / 3 梯度，`TBD = 0`，且占位符协议保留。mixed-build identity、mandatory tax pick、placeholder dependency 终于可以进入真实审计，不再是 P0 blocker。
2. **CRPG-02 — REVISE / still open**
   `战鼓 / 清音 / 魔音` 仍然更擅长描述“队友响应后会怎样”，但没有充分写清：若队友不即时跟拍，音律自己在回合 2-4 怎样稳定赚拍、保拍、转拍；敌方也缺少更具体的打断 / 拖拍 / 压制窗口。
3. **CRPG-03 — REVISE / still open**
   `阵法 / 机关 / 符禁` 已守住低魔与媒介边界，但短遭遇的首回合价值、2-4 回合的直接收益、以及敌方怎样识别 / 绕开 / 拆解这些布置，仍然不够具体，setup tax 感仍在。
4. **CRPG-04 — PASS / resolved**
   药师三传承现在已能区分为“救场储备”“针路精控”“病灶侵蚀”三类队伍职责，且边界定义明确了各自不包办什么。omni-role 风险已从 revise 降到可接受范围。

## Required fantasy builds — CRPG snapshot
| Build | Current read | Evidence note |
|---|---|---|
| 扫地僧型 | PASS（provisional） | 精修 1/2/3 已补完，纯主修 / 纯精修宗师路线现在可读；仍待 build audit 细化到具体主修。 |
| 独臂剑侠型 | PASS（provisional） | 游锋主修与三传承都已有明确近身节奏与收束，且 03 不再构成 tax blocker。 |
| 琴魔型 | REVISE | 音律压迫感成立，但单人局与少队友局的自足战术价值仍需补写。 |
| 白衣琴医型 | PASS（provisional） | 药师 / 音律在 03 已有清晰接口与小循环，build 主次关系终于可读；仍待音律单人成立性补强。 |
| 黑衣刺客型 | PASS（provisional） | 影踪三传承的接敌、收割、脱离链完整，且 03 提供的旁修接口没有偷主循环。 |
| 铁枪护法型 | PASS（provisional） | 破军三传承的阵线职责分化清楚，守阵具备可读的护线 / 反推价值。 |
| 毒医圣手型 | PASS（provisional） | 药师 fantasy 已通过复测；三传承职责分化与机会成本已足够清楚。 |
| 机关奇人型 | REVISE | 奇门局部改场 fantasy 成立，但首回合收益与敌方 counterplay 仍偏虚。 |

## Pass D retest focus to carry into next rewrite
- 音律三传承需要补清“无队友即时配合时”的自足收益、赚拍方式与敌方打断窗口。
- 奇门三传承需要补清首回合价值、2-4 回合直接收益、敌方识别 / 绕开 / 拆解方式。
- 后续 build audit 继续追踪 `SLOT_PRESSURE_ASSUMPTION_ONLY`，但它已不再是当前最主要 blocker。
