# Agent Queue — Human-Gated Wuxia Fantasy Iteration Loop

日期：2026-04-24
状态：ready for local 1→2→3→2→human cumulative loop
负责人：orchestrator / sequential human-gated loop

## Runtime note
- 后续只使用主线程顺序调度。若需要子代理，只能使用 Codex native subagents，并且必须按阶段启动、阶段完成后再进入下一阶段。
- 不允许一次性并行跑完整流程；仍保持严格顺序：幻想测试 -> 设定撰写 -> CRPG 评审 -> 设定二改 -> 全量回归 -> human gate。
- 面向 human 的报告必须使用清晰中文和表格，减少内部黑话；首次出现必要术语时必须解释。

## Plain-language role names
| 旧名 | 后续报告名 | 职责 |
|---|---|---|
| worker-1 | 幻想测试员 | 新增 3-5 个武侠角色形象幻想，维护累计测试集，只提问题，不改设定。 |
| worker-2 | 设定撰写员 | 唯一可以修改 `docs/design/*.md` 的阶段，处理问题单，记录取舍。 |
| worker-3 | CRPG 评审 | 审查构筑取舍、反制、行动经济、强制税，只给建议，不直接改设定。 |
| human / leader | Human gate | 决定接受、继续，或追加幻想 / 修正意见。 |

## 全局规则
- 所有 lane 只写自己拥有的文件 / section。
- 下游不得重定义已锁定的层级边界；若需要改规则，只能先记入 `docs/working/decision-log.md`。
- **流派固定；传承、旁修、角色形象可迭代；出身 / 身份本轮 deferred。**
- “职业名”只能作为组合结果，不得作为系统根节点。
- 不得把 `LOADOUT_INTERFACE_PENDING` / `MERIDIAN_SLOT_COUNT_PENDING` / `SLOT_PRESSURE_ASSUMPTION_ONLY` 升格为最终规则。
- 共享规则冲突先上报，不得 silent edit。
- 当前阶段采用 **1→2→3→2→human loop**：幻想测试员负责新增幻想与累计测试；设定撰写员是唯一设定修改者；CRPG 评审负责资深 CRPG / 游戏设计取舍；最后交给 human gate。
- 幻想测试员每轮必须自行新增 **3-5 个幻想**；human 新增幻想不计入这个数量。
- 每轮都必须全量复测累计幻想测试集，测试集只增不减，除非 human 明确删除。
- 每轮报告必须包含表格化的完整设计总览：流派、传承、精修、旁修、角色形象测试结果、改动文件、问题单、CRPG 评审结论、剩余风险、human gate 选项。

## Lane Map

### 幻想测试员 — Senior Wuxia Fan / Fantasy Tester
**Owned files**
- `docs/working/fantasy-test-suite.md`
- `docs/working/wuxia-fantasy-pressure-report.md`
- append-only ticket entries in `docs/working/revision-tickets.md`
- fantasy sections in `docs/working/round-report-latest.md`

**Deliverables**
- 每轮新增 3-5 个系统新增幻想
- 把 human 上轮新增幻想加入累计测试集
- 全量测试累计幻想测试集
- 对需修正 / 需推迟 / 高风险问题创建可执行问题单
- 二次返修后再次全量复测

**Non-goals**
- 不直接改设定正文
- 不把 human 幻想计入 3-5 个新增幻想 quota
- 不用泛 CRPG 可玩性替代武侠味

### 设定撰写员 — Canon Systems Designer
**Owned files**
- `docs/design/01-main-disciplines.md`
- `docs/design/02-inheritances.md`
- `docs/design/03-side-studies-and-loadout.md`
- `docs/design/05-identity-and-archetypes.md`
- append-only ticket resolutions in `docs/working/revision-tickets.md`
- canon sections in `docs/working/round-report-latest.md`

**Deliverables**
- 根据幻想测试员的问题单做第一次设定修改
- 根据 CRPG 评审建议做第二次设定修改
- 记录接受 / 拒绝 / 推迟的取舍
- 保持流派固定、传承 / 旁修 / 角色形象可迭代、出身身份 deferred

**Non-goals**
- 不静默改 schema
- 不定义最终 loadout / meridian slot 数量
- 不删除评审报告或问题单证据

### CRPG 评审 — Senior CRPG Systems Designer / Reviewer
**Owned files**
- `docs/working/crpg-systems-pressure-report.md`
- `docs/design/04-build-examples-and-audit.md`
- `docs/working/final-compile-checklist.md`
- append-only ticket entries in `docs/working/revision-tickets.md`

**Deliverables**
- CRPG 战术、资源、encounter、counterplay、队伍协同压测
- 对玩家幻想、传承、旁修做综合取舍，判断幻想应落在哪一层
- 将系统性问题写成修订问题单
- 更新 build audit 与 final compile checklist

**Non-goals**
- 不重写主修或传承 canon 文本
- 不把武侠幻想压扁成纯数值效率
- 不接受无 counterplay 的爽感循环

## Phase gates
1. **阶段 1：幻想扩展 + 全量测试**：幻想测试员新增 3-5 个幻想，合并 human 幻想，全量测试累计测试集。
2. **阶段 2：第一次设定修改**：设定撰写员按问题单修改设定正文。
3. **阶段 3：CRPG 设计评审**：CRPG 评审检查取舍、玩法、反制，并给设定撰写员可执行建议。
4. **阶段 4：第二次设定修改**：设定撰写员按 CRPG 评审建议二次修改，或记录不修改的保留理由。
5. **阶段 5：全量回归测试**：幻想测试员全量复测累计测试集。
6. **阶段 6：human gate**：输出表格化报告，等待 human 接受或新增幻想 / 意见。

## Shared-file coordination notes
- `docs/working/decision-log.md` 在早期阶段由幻想测试员初始化并维护层级决策。
- 当前 finish loop 中，decision log 仍采用“**追加、不得重写既有结论**”模式；如需推翻 Phase 0 / 1 规则，只能新增 escalation entry。
- `docs/working/revision-tickets.md` 是问题单中枢；测试员和评审追加问题单，设定撰写员追加处理结果。
- `docs/working/conflict-redlines.md` 与 `docs/working/change-log.md` 保持现有结构；如需更新，由 CRPG 评审或 orchestrator 处理。

## Ready signal for versioned compile
满足以下条件才可进入版本 compile：
1. `docs/design/00-rule-bible.md` 与 `docs/design/05-identity-and-archetypes.md` 对层级边界一致，且出身 / 身份保持 deferred；
2. `docs/design/02-inheritances.md` 保持当前版本传承 section 等深；若修改 24-set，必须有 decision-log 记录；
3. `docs/working/revision-tickets.md` 无 open block / revise ticket；
4. 武侠幻想与 CRPG systems 两类压力测试均有 pass 证据；
5. 最近一轮武侠幻想提案没有产生新的 P0 / P1 ticket；
6. `git diff --check` 通过。

## Loop exit condition
当以下全部成立时建议停止幻想反压 loop：
1. 无 P0 / P1 层级冲突；
2. 无 open block ticket；
3. 旧幻想没有从 PASS 回退为 revise/block；
4. CRPG 评审判定没有强制旁修税、无不可反制爆发、角色形象压扁问题；
5. human 接受当前版本作为下一开发阶段基线。
