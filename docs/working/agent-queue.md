# Agent Queue — Wuxia Systems Iteration Loop

日期：2026-04-24  
状态：iteration-loop ready after layer hierarchy override
负责人：leader / 3-agent finish loop

## 全局规则
- 所有 lane 只写自己拥有的文件 / section。
- 下游不得重定义已锁定的层级边界；若需要改规则，只能先记入 `docs/working/decision-log.md`。
- **流派固定；传承、旁修、出身 / 身份、角色形象可迭代。**
- “职业名”只能作为组合结果，不得作为系统根节点。
- 不得把 `LOADOUT_INTERFACE_PENDING` / `MERIDIAN_SLOT_COUNT_PENDING` / `SLOT_PRESSURE_ASSUMPTION_ONLY` 升格为最终规则。
- 共享规则冲突先上报，不得 silent edit。
- 当前阶段采用 **1 writer + 2 reviewers loop**：一个 canon writer 负责改 canon；两个 reviewer 负责施压、开 ticket、复测。Reviewer 的意见必须转成可执行 ticket，不能直接漂移 canon。
- 武侠幻想 reviewer 可以不断提出幻想来反压设计，但必须受 loop exit 条件约束，不能无限扩张。

## Lane Map

### worker-1 — Canon Systems Designer
**Owned files**
- `docs/design/01-main-disciplines.md`
- `docs/design/02-inheritances.md`
- `docs/design/03-side-studies-and-loadout.md`
- `docs/design/05-identity-and-archetypes.md`
- append-only escalation entries in `docs/working/decision-log.md`

**Deliverables**
- 根据 reviewer ticket 定向修订主修 / 流派说明、传承、旁修、出身 / 身份、角色形象
- 维持流派固定、传承可迭代、低魔边界
- 保证“武僧 / 琴魔 / 毒医 / 侠盗”等是组合结果，不是职业根节点
- 维持当前版本保留传承的等深；若要改 24-set，先走 decision escalation

**Non-goals**
- 不静默改 schema
- 不定义最终 loadout / meridian slot 数量
- 不删除 reviewer 报告或 ticket 证据

### worker-2 — Wuxia Fantasy Reviewer
**Owned file**
- `docs/working/wuxia-fantasy-pressure-report.md`
- append-only ticket entries in `docs/working/revision-tickets.md`

**Deliverables**
- 经典武侠幻想 build 压测，并持续提出新幻想直到 exit condition 达成
- 反推流派 / 传承 / 旁修 / 出身身份 / 角色形象缺口
- ticket 化所有返修要求
- 复测返修后的幻想可成立性
- 区分“需要熟悉称谓”和“需要新增职业根节点”；默认用层级组合解决

**Non-goals**
- 不直接改 canon
- 不用泛 CRPG 可玩性替代武侠味
- 不要求高魔或超自然解释
- 不提出无止境愿望清单；每轮新增幻想必须能产生明确 ticket 或明确判定为重复 / 低优先级

### worker-3 — CRPG Systems Reviewer
**Owned files**
- `docs/working/crpg-systems-pressure-report.md`
- `docs/design/04-build-examples-and-audit.md`
- `docs/working/final-compile-checklist.md`
- append-only ticket entries in `docs/working/revision-tickets.md`

**Deliverables**
- CRPG 战术、资源、encounter、counterplay、队伍协同压测
- 将系统性问题写成 revision ticket
- 更新 build audit 与 final compile checklist

**Non-goals**
- 不重写主修或传承 canon 文本
- 不把武侠幻想压扁成纯数值效率
- 不接受无 counterplay 的爽感循环

## Phase gates
1. **Pass A canon alignment**：worker-1 先对齐流派 / 传承 / 旁修 / 出身身份 / 角色形象层级；不得把职业名写成系统根节点。
2. **Pass B dual pressure**：worker-2 / worker-3 并行输出 pressure report 与 revision tickets。
3. **Pass C targeted rewrite**：worker-1 只按 ticket 定向改 canon。
4. **Pass D re-test**：两个 reviewer 复测；未通过则回到 Pass C。
5. **Pass E versioned compile**：worker-3 更新 audit / checklist，leader 最终审阅。

## Shared-file coordination notes
- `docs/working/decision-log.md` 在 **Phase 0 / 1 由 worker-1 初始化并维护 schema 决策**。
- 当前 finish loop 中，decision log 仍采用“**追加、不得重写既有结论**”模式；如需推翻 Phase 0 / 1 规则，只能新增 escalation entry。
- `docs/working/revision-tickets.md` 是 loop 的任务中枢；reviewer 追加 ticket，worker-1 追加 resolution。
- `docs/working/conflict-redlines.md` 与 `docs/working/change-log.md` 保持现有结构；如需更新，由 worker-3 或 leader 处理。

## Ready signal for versioned compile
满足以下条件才可进入版本 compile：
1. `docs/design/00-rule-bible.md` 与 `docs/design/05-identity-and-archetypes.md` 对层级边界一致；
2. `docs/design/02-inheritances.md` 保持当前版本传承 section 等深；若修改 24-set，必须有 decision-log 记录；
3. `docs/working/revision-tickets.md` 无 open block / revise ticket；
4. 武侠幻想与 CRPG systems 两类压力测试均有 pass 证据；
5. 最近一轮武侠幻想提案没有产生新的 P0 / P1 ticket；
6. `git diff --check` 通过。

## Loop exit condition
当以下全部成立时停止幻想反压 loop：
1. 无 P0 / P1 层级冲突；
2. 无 open block ticket；
3. 最新幻想提案只产生重复项或低优先级润色；
4. CRPG reviewer 判定没有 mandatory tax、无 counterplay 爆发、身份压扁问题；
5. leader 接受当前版本作为下一开发阶段基线。
