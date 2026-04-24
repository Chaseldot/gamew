# CRPG Systems Pressure Report

状态：Round 1 worker-3 CRPG review complete，no P0/P1 blocker
Owner：worker-3

## Review rule
本文件不直接改 canon。所有问题必须转成 `docs/working/revision-tickets.md` 中的 ticket，并在 worker-1 返修后复测。

## Current round review basis
- Review date：2026-04-24
- Review scope：human-gated fantasy iteration loop after current canon/fantasy packet in this worktree
- 已审阅：`docs/working/fantasy-test-suite.md`
- 已审阅：`docs/working/wuxia-fantasy-pressure-report.md`
- 已审阅：`docs/working/revision-tickets.md`
- 已审阅：`docs/working/baseline-snapshot.md`
- 已审阅：`docs/design/00-rule-bible.md`
- 已审阅：`docs/design/01-main-disciplines.md`
- 已审阅：`docs/design/02-inheritances.md`
- 已审阅：`docs/design/03-side-studies-and-loadout.md`
- 已审阅：`docs/design/04-build-examples-and-audit.md`
- Round 1 复测目标：确认 fixed 流派下的 传承 / 旁修 / 角色形象改写没有制造 CRPG mandatory tax、无反制 burst 或 2-4 回合空转。

## Gate snapshot
- `docs/working/fantasy-test-suite.md`：当前 worktree 为 15 个累计样例，全部 pass；若 worker-1 后续新增 3-5 个幻想，本报告需追加复测段。
- `docs/design/01-main-disciplines.md`：8/8 主修维持完整 5 字段。
- `docs/design/02-inheritances.md`：24/24 传承 section 仍齐，且药师 / 音律 / 奇门已按 ticket 方向做定向返修。
- `docs/design/03-side-studies-and-loadout.md`：八门旁修 1/2/3 与精修 1/2/3 已补完，`TBD = 0`。
- 占位符协议仍在：`LOADOUT_INTERFACE_PENDING`、`MERIDIAN_SLOT_COUNT_PENDING`、`SLOT_PRESSURE_ASSUMPTION_ONLY`。
- 结论：当前已审样例未发现新的 CRPG P0/P1；`CRPG-01` ~ `CRPG-04` 继续保持关闭。worker-2 二次 rewrite 可走 no-op / polish 路线，除非 worker-1 新增幻想产生新票。

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
| action economy | 03 已补完旁修 / 精修接口，mixed-build 行动线可读 | 音律与奇门的主动回合价值已在 2-4 回合内写清 | CRPG-02, CRPG-03 | PASS |
| 2-4 turn tactical rhythm | 多数主修与传承已具备清晰 2-4 回合循环；药师已明显改善 | 音律与奇门已补齐自足收益、首拍价值与反制窗口 | CRPG-02, CRPG-03 | PASS |
| resource pressure | 八大主资源 + 精修 / 旁修梯度已同时存在，可检查接口是否偷资源 | 音律 / 奇门的短战节奏与资源流速已可读 | CRPG-02, CRPG-03 | PASS |
| encounter value | 游锋 / 破军 / 拳掌 / 射艺 / 影踪 / 药师 / 音律 / 奇门都能支撑短遭遇价值 | 奇门首回合价值已落地，音律单人成立性已补齐 | CRPG-02, CRPG-03 | PASS |
| counterplay readability | 药师已明确非目标；大多数传承边界清楚 | 音律与奇门已补入更具体的敌方互动 / 打断 / 拆解窗口 | CRPG-02, CRPG-03 | PASS |
| party role and synergy | 破军、射艺、影踪、药师职责更清晰；白衣琴医接口已在 03 立住 | 音律主次与奇门场域价值已转成队伍决策点 | CRPG-02, CRPG-03 | PASS |
| pure-main viability | 01 + 02 + 精修 1/2/3 已能支撑纯主修 / 纯精修阅读 | 音律、奇门的无队友 / 无额外 setup 收益已补足 | CRPG-02, CRPG-03 | PASS |
| mixed-build identity | 03 的 1 / 2 / 3 点语法已让 mixed-build 主次关系可审 | 音律 × 药师与音律 / 奇门相关 build 均已可读 | CRPG-02, CRPG-03 | PASS |
| mandatory tax pick risk | 当前 03 没有出现单一必绑旁修；接口分配较均衡 | 无新的单点刚需风险 | — | PASS |
| placeholder hidden dependency risk | 03 明确保留三项占位符，且未偷渡具体槽位定数 | 协议未破，仍可继续作为 compile 约束 | CRPG-01 | PASS |

## Key findings
1. **CRPG-01 — PASS / resolved**
   `docs/design/03-side-studies-and-loadout.md` 已完成精修 1/2/3 与八门旁修 1 / 2 / 3 梯度，`TBD = 0`，且占位符协议保留。mixed-build identity、mandatory tax pick、placeholder dependency 已进入真实审计。
2. **CRPG-02 — PASS / resolved**
   `战鼓 / 清音 / 魔音` 已补足单人成立、自稳产拍与断拍窗口；音律不再依赖队友即时跟拍才能说明 2-4 回合价值。
3. **CRPG-03 — PASS / resolved**
   `阵法 / 机关 / 符禁` 已补足首回合价值、迁阵收益与拆阵 / 绕阵 / 破器具窗口，setup tax 风险解除。
4. **CRPG-04 — PASS / resolved**
   药师三传承现在已能区分为“救场储备”“针路精控”“病灶侵蚀”三类队伍职责，且边界定义明确了各自不包办什么。omni-role 风险已从 revise 降到可接受范围。

## Required fantasy builds — CRPG snapshot
| Build | Current read | Evidence note |
|---|---|---|
| 扫地僧型 | PASS | 精修 1/2/3 已补完，纯主修 / 纯精修宗师路线可直接成立。 |
| 独臂剑侠型 | PASS | 游锋主修与三传承已有明确近身节奏与收束，且 03 不再构成 tax blocker。 |
| 琴魔型 | PASS | 音律压迫感、单人局价值与 counterplay 已补齐。 |
| 白衣琴医型 | PASS | 药师 / 音律在 03 已有清晰接口与小循环，build 主次关系可读。 |
| 黑衣刺客型 | PASS | 影踪三传承的接敌、收割、脱离链完整，且 03 提供的旁修接口没有偷主循环。 |
| 铁枪护法型 | PASS | 破军三传承的阵线职责分化清楚，守阵具备可读的护线 / 反推价值。 |
| 毒医圣手型 | PASS | 药师 fantasy 已通过复测；三传承职责分化与机会成本已足够清楚。 |
| 机关奇人型 | PASS | 奇门局部改场 fantasy、首回合收益与敌方 counterplay 已补齐。 |

## Round 1 actionable advice for worker-2 second rewrite
- **No P0/P1 mandatory canon rewrite is required from the currently visible packet.** Do not churn fixed `流派` names or re-open resolved CRPG tickets without a new fantasy failure.
- If worker-1 adds new fantasies before the final retest, map each demand to exactly one primary layer first：传承 for main-loop differentiation, 旁修 for horizontal interface / small loop, 角色形象 for presentation-only labels.
- Preserve explicit counterplay windows already added for 音律 and 奇门（断拍、抢拍、绕阵、拆阵、破器具、脱离听闻范围）; do not turn them into always-on aura/control.
- Keep 药师 opportunity cost visible：济世 / 针脉 / 蛊毒 can cooperate through 药性 but must not collapse into top healing + top control + top DOT at no tradeoff.
- Keep every mixed-build statement under `LOADOUT_INTERFACE_PENDING` / `SLOT_PRESSURE_ASSUMPTION_ONLY`; do not imply a concrete slot budget or mandatory side-study pick.

## Pass D retest focus to carry into next rewrite
- 音律三传承与奇门三传承的 CRPG 复测已通过。
- 后续 compile 仍需保留 `SLOT_PRESSURE_ASSUMPTION_ONLY` 作为约束，但它已不再是当前 blocker。
- 如再开新构筑轮，优先复用本轮的接口语法，不再回到 open ticket 状态。

## Version evidence
- task-3 文档整理基线：`d749db5`（worker-3 当前 worktree review 起点）。
- 本轮结论边界：worker-3 已完成当前可见 packet 的 CRPG review；若 worker-1/worker-2 后续提交新幻想或 canon rewrite，需要在同一累计 suite 上追加复测，不由本段提前代替 leader / human 接受。
- fresh evidence 约束：占位符协议仍保留，且 compile 结论继续受 `LOADOUT_INTERFACE_PENDING`、`MERIDIAN_SLOT_COUNT_PENDING`、`SLOT_PRESSURE_ASSUMPTION_ONLY` 限制。
