# Agent Queue — Human-Gated Wuxia Fantasy Iteration Loop

日期：2026-04-24  
状态：ready for 1→2→3→2→human cumulative loop
负责人：leader / 3-agent human-gated loop

## 全局规则
- 所有 lane 只写自己拥有的文件 / section。
- 下游不得重定义已锁定的层级边界；若需要改规则，只能先记入 `docs/working/decision-log.md`。
- **流派固定；传承、旁修、角色形象可迭代；出身 / 身份本轮 deferred。**
- “职业名”只能作为组合结果，不得作为系统根节点。
- 不得把 `LOADOUT_INTERFACE_PENDING` / `MERIDIAN_SLOT_COUNT_PENDING` / `SLOT_PRESSURE_ASSUMPTION_ONLY` 升格为最终规则。
- 共享规则冲突先上报，不得 silent edit。
- 当前阶段采用 **1→2→3→2→human loop**：worker-1 负责新增幻想与累计测试；worker-2 是唯一 canon writer；worker-3 负责资深 CRPG / 游戏设计取舍；最后交给 human gate。
- worker-1 每轮必须自行新增 **3-5 个幻想**；human 新增幻想不计入这个数量。
- 每轮都必须全量复测累计幻想测试集，测试集只增不减，除非 human 明确删除。

## Lane Map

### worker-1 — Senior Wuxia Fan / Fantasy Tester
**Owned files**
- `docs/working/fantasy-test-suite.md`
- `docs/working/wuxia-fantasy-pressure-report.md`
- append-only ticket entries in `docs/working/revision-tickets.md`
- fantasy sections in `docs/working/round-report-latest.md`

**Deliverables**
- 每轮新增 3-5 个 worker-origin 幻想
- 把 human 上轮新增幻想加入累计测试集
- 全量测试累计幻想测试集
- 对 revise/block/P0/P1 创建可执行 ticket
- 二次返修后再次全量复测

**Non-goals**
- 不直接改 canon
- 不把 human 幻想计入 3-5 个新增幻想 quota
- 不用泛 CRPG 可玩性替代武侠味

### worker-2 — Canon Systems Designer
**Owned files**
- `docs/design/01-main-disciplines.md`
- `docs/design/02-inheritances.md`
- `docs/design/03-side-studies-and-loadout.md`
- `docs/design/05-identity-and-archetypes.md`
- append-only ticket resolutions in `docs/working/revision-tickets.md`
- canon sections in `docs/working/round-report-latest.md`

**Deliverables**
- 根据 worker-1 ticket 做第一次 canon rewrite
- 根据 worker-3 设计建议做第二次 canon rewrite
- 记录接受 / 拒绝 / 推迟的取舍
- 保持流派固定、传承 / 旁修 / 角色形象可迭代、出身身份 deferred

**Non-goals**
- 不静默改 schema
- 不定义最终 loadout / meridian slot 数量
- 不删除 reviewer 报告或 ticket 证据

### worker-3 — Senior CRPG Systems Designer / Reviewer
**Owned files**
- `docs/working/crpg-systems-pressure-report.md`
- `docs/design/04-build-examples-and-audit.md`
- `docs/working/final-compile-checklist.md`
- append-only ticket entries in `docs/working/revision-tickets.md`

**Deliverables**
- CRPG 战术、资源、encounter、counterplay、队伍协同压测
- 对玩家幻想、传承、旁修做综合取舍，判断幻想应落在哪一层
- 将系统性问题写成 revision ticket
- 更新 build audit 与 final compile checklist

**Non-goals**
- 不重写主修或传承 canon 文本
- 不把武侠幻想压扁成纯数值效率
- 不接受无 counterplay 的爽感循环

## Phase gates
1. **Step 1 fantasy expansion + full test**：worker-1 新增 3-5 个幻想，合并 human 幻想，全量测试累计 suite。
2. **Step 2 first canon rewrite**：worker-2 按 fantasy ticket 修改 canon。
3. **Step 3 senior design review**：worker-3 评审取舍、玩法、counterplay，给 worker-2 可执行建议。
4. **Step 4 second canon rewrite**：worker-2 按 worker-3 建议二次修改。
5. **Step 5 full regression retest**：worker-1 全量复测累计 suite。
6. **Step 6 human gate**：输出 round report，等待 human 接受或新增幻想 / 意见。

## Shared-file coordination notes
- `docs/working/decision-log.md` 在 **Phase 0 / 1 由 worker-1 初始化并维护 schema 决策**。
- 当前 finish loop 中，decision log 仍采用“**追加、不得重写既有结论**”模式；如需推翻 Phase 0 / 1 规则，只能新增 escalation entry。
- `docs/working/revision-tickets.md` 是 loop 的任务中枢；reviewer 追加 ticket，worker-1 追加 resolution。
- `docs/working/conflict-redlines.md` 与 `docs/working/change-log.md` 保持现有结构；如需更新，由 worker-3 或 leader 处理。

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
4. worker-3 判定没有 mandatory tax、无 counterplay 爆发、角色形象压扁问题；
5. human 接受当前版本作为下一开发阶段基线。
