# Agent Queue — Wuxia Systems Finalization

日期：2026-04-24  
状态：Phase 0 / 1 ready after baseline + schema lock  
负责人：worker-1 初始化

## 全局规则
- 所有 lane 只写自己拥有的文件 / section。
- 下游不得重定义 schema；若需要改规则，只能先记入 `docs/working/decision-log.md`。
- 不得把 `LOADOUT_INTERFACE_PENDING` / `MERIDIAN_SLOT_COUNT_PENDING` / `SLOT_PRESSURE_ASSUMPTION_ONLY` 升格为最终规则。
- 共享规则冲突先上报，不得 silent edit。

## Lane Map

### worker-1 — Baseline / Queue / Schema Support
**Owned files**
- `docs/working/baseline-snapshot.md`
- `docs/working/agent-queue.md`
- `docs/working/decision-log.md`
- `docs/design/00-rule-bible.md`
- scaffolding only for other `docs/design/*` / `docs/working/*`

**Deliverables**
- baseline freeze
- schema lock
- drift reconciliation notes
- file scaffolds for downstream lanes

**Non-goals**
- 不代写 8 个主修定稿
- 不代写 24 个传承定稿
- 不推进 build audit 内容

### worker-2 — Main Discipline Lane
**Owned file**
- `docs/design/01-main-disciplines.md`

**Deliverables**
- 八大流派主修本体定版
- 每个流派按 5 字段模板填写

**Non-goals**
- 不修改 schema
- 不写旁修 1/2/3 梯度细则
- 不写传承细化

### worker-3 — Side-Study / Refinement Lane
**Owned file**
- `docs/design/03-side-studies-and-loadout.md`

**Deliverables**
- 8 个流派旁修 1/2/3 点梯度
- 精修回报结构
- loadout boundary placeholders

**Non-goals**
- 不定义最终槽位数量
- 不写传承正文
- 不改主修模板

### worker-4 — Inheritance Cluster A
**Owned sections in file**
- `docs/design/02-inheritances.md`：游锋 / 破军 / 拳掌 / 射艺

**Deliverables**
- 12 个传承（4 校 * 3）等深蓝图定稿

**Non-goals**
- 不改 schema
- 不写 cluster B 学派
- 不引入槽位依赖

### worker-5 — Inheritance Cluster B + Coherence Assist
**Owned sections in file**
- `docs/design/02-inheritances.md`：影踪 / 药师 / 音律 / 奇门
- later coherence memos if assigned by leader

**Deliverables**
- 12 个传承（4 校 * 3）等深蓝图定稿
- school coherence assist when requested

**Non-goals**
- 不改 schema
- 不写 cluster A 学派
- 不把旁修写成传承前置

### worker-6 — Audit / Examples / Compile Prep
**Owned files**
- `docs/design/04-build-examples-and-audit.md`
- `docs/working/conflict-redlines.md`
- `docs/working/change-log.md`
- compile prep notes when assigned

**Deliverables**
- build audit matrix
- conflict redlines
- change log / compile prep

**Non-goals**
- 不重写主修或传承 canon 文本
- 不偷渡新顶层哲学

## Phase gates
1. **Phase 0 gate**：`baseline-snapshot.md` 与 `agent-queue.md` 存在后，其他 lane 才能开始写 canon 内容。
2. **Phase 1 gate**：`00-rule-bible.md` 冻结后，下游只能填模板，不能改模板。
3. **Phase 2 / 3 parallel**：主修与旁修可并行，但必须引用同一套 schema。
4. **Phase 4 parallel**：inheritance clusters 分 section 并行，不得交叉改对方 section。
5. **Phase 4.5+**：school coherence / build audit / compile 必须串行。
