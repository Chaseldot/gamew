# Agent Queue — Wuxia Systems Finalization

日期：2026-04-24  
状态：finish-loop ready after baseline + schema lock
负责人：leader / 3-agent finish loop

## 全局规则
- 所有 lane 只写自己拥有的文件 / section。
- 下游不得重定义 schema；若需要改规则，只能先记入 `docs/working/decision-log.md`。
- 不得把 `LOADOUT_INTERFACE_PENDING` / `MERIDIAN_SLOT_COUNT_PENDING` / `SLOT_PRESSURE_ASSUMPTION_ONLY` 升格为最终规则。
- 共享规则冲突先上报，不得 silent edit。
- 当前阶段采用 **1 writer + 2 reviewers loop**：一个 canon writer 负责改 canon；两个 reviewer 负责施压、开 ticket、复测。Reviewer 的意见必须转成可执行 ticket，不能直接漂移 canon。

## Lane Map

### worker-1 — Canon Systems Designer
**Owned files**
- `docs/design/01-main-disciplines.md`
- `docs/design/02-inheritances.md`
- `docs/design/03-side-studies-and-loadout.md`
- append-only escalation entries in `docs/working/decision-log.md`

**Deliverables**
- 补完 `03-side-studies-and-loadout.md` 中所有旁修 / 精修内容
- 根据 reviewer ticket 定向修订主修、传承、旁修
- 维持 24 传承等深与低魔边界

**Non-goals**
- 不静默改 schema
- 不定义最终 loadout / meridian slot 数量
- 不删除 reviewer 报告或 ticket 证据

### worker-2 — Wuxia Fantasy Reviewer
**Owned file**
- `docs/working/wuxia-fantasy-pressure-report.md`
- append-only ticket entries in `docs/working/revision-tickets.md`

**Deliverables**
- 经典武侠幻想 build 压测
- 反推主修 / 旁修 / 精修 / 传承缺口
- ticket 化所有返修要求
- 复测返修后的幻想可成立性

**Non-goals**
- 不直接改 canon
- 不用泛 CRPG 可玩性替代武侠味
- 不要求高魔或超自然解释

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
1. **Pass A canon completion**：worker-1 先补完旁修 / 精修；`03-side-studies-and-loadout.md` 不得残留 `TBD`。
2. **Pass B dual pressure**：worker-2 / worker-3 并行输出 pressure report 与 revision tickets。
3. **Pass C targeted rewrite**：worker-1 只按 ticket 定向改 canon。
4. **Pass D re-test**：两个 reviewer 复测；未通过则回到 Pass C。
5. **Pass E compile**：worker-3 更新 audit / checklist，leader 最终审阅。

## Shared-file coordination notes
- `docs/working/decision-log.md` 在 **Phase 0 / 1 由 worker-1 初始化并维护 schema 决策**。
- 当前 finish loop 中，decision log 仍采用“**追加、不得重写既有结论**”模式；如需推翻 Phase 0 / 1 规则，只能新增 escalation entry。
- `docs/working/revision-tickets.md` 是 loop 的任务中枢；reviewer 追加 ticket，worker-1 追加 resolution。
- `docs/working/conflict-redlines.md` 与 `docs/working/change-log.md` 保持现有结构；如需更新，由 worker-3 或 leader 处理。

## Ready signal for final compile
满足以下条件才可进入最终 compile：
1. `03-side-studies-and-loadout.md` 无 `TBD`；
2. `docs/design/02-inheritances.md` 保持 24 个传承 section，且 reviewer 判定等深；
3. `docs/working/revision-tickets.md` 无 open block / revise ticket；
4. 武侠幻想与 CRPG systems 两类压力测试均有 pass 证据；
5. `git diff --check` 通过。
