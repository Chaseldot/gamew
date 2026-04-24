# Baseline Snapshot — Wuxia Systems Finalization

日期：2026-04-24  
轮次状态：Phase 0 / Phase 1 frozen input for downstream drafting  
负责人：worker-1

## 本轮唯一上游依据
- `docs/plans/2026-04-24-wuxia-crpg-flow-paths-summary.md`
- `findings.md`
- `progress.md`
- `.omx/plans/2026-04-24-wuxia-systems-finalization-workflow.md`
- `.omx/plans/team-handoff-2026-04-24-wuxia-systems-finalization.md`
- `.omx/plans/test-spec-2026-04-24-wuxia-systems-finalization-workflow.md`

规则：**若某条规则未写入本基线快照，则本轮下游阶段不得视其为已冻结 canon 输入。**

## 已冻结的顶层方向
- 项目类型：**低魔武侠 CRPG**。
- 本轮范围：只收敛 **主修 / 精修 / 旁修 / 传承 / 构筑审计**；**不进入剧情、章节锚点、势力细化**。
- 八大流派固定为：游锋、破军、拳掌、射艺、影踪、药师、音律、奇门。
- 成长框架固定为：12 级上限；1 级主修，3 级传承，4/8/10 级自由修习点，11-12 级传承终局 / 精修宗师技。
- 构筑哲学固定为：**主修主导型**。
- 纯主修、混修各有胜场；纯主修以稳定完整为主，兼具终局上限。
- 精修保留，且只强化主修本体，不绑定传承身份。
- 旁修定位固定为：**副武学**，提供入口 / 接口 / 小循环，但不得替代主修闭环。
- 传承定位固定为：主修循环的高阶分化，不是第二职业。
- 本轮用户覆盖性指令：**24 个传承全部按相同蓝图深度定版，不再保留旧的 16 核心 / 8 预留拆分。**

## 已冻结的系统基线

### 主修 / 精修 / 旁修 / 传承
- 只能有 1 个主修流派。
- 只能有 1 个传承。
- 总共 3 个自由修习点。
- 最多旁修 2 个流派。
- 单个旁修最多 3 点。
- 自由修习点可回投主修，形成精修路线。
- 允许 3 点全部回投主修，形成纯精修路线。

### 主修资源
| 流派 | 核心资源 |
|---|---|
| 游锋 | 锋势 |
| 破军 | 冲势 |
| 拳掌 | 经脉破绽 |
| 射艺 | 准星 |
| 影踪 | 藏机 |
| 药师 | 药性 |
| 音律 | 节拍 |
| 奇门 | 阵机 |

约束：
- 主修深度来自资源循环。
- 传承必须从资源循环分化。
- 旁修只能提供入口、接口、小循环，不能补主修缺陷。

### 纯主修 / 精修基线
- 纯主修最高阶能力采用“双层型”：**宗师技 + 体系完成奖励**。
- 体系完成奖励采用“双完成”：**资源循环完成 + 动作链条完成**。
- 精修只强化主修本体，不定义传承身份。
- 纯主修终局与传承关系：**主体独立、表现微调**。

### 旁修基线
- 1 点：入口。
- 2 点：接口。
- 3 点：小循环。
- 1/2/3 点定义的是“接入深度”，不是单纯数值强弱。
- 2 点接口可影响主修资源流速，但不能改写资源规则。
- 3 点小循环可有小收束，但不得超过主修收束，不得替代主修主体。

### 传承基线
- 每流派固定 3 个传承，共 24 个。
- **本轮 24 个全部同等深度完成。**
- 每个传承都必须有独立闭环。
- 同流派传承优先按功能职责与动作结构分化。
- 旁修会影响传承手感，但不能定义传承本体。
- 旁修影响上限偏向 B+：通常改变战术展开，少数组合可接近重塑，但不能抹掉传承本体。
- 传承身份红线：资源关系 / 动作结构 / 招牌机制三者中，至少保住两项。

## 漂移对账（reconciled drift）
1. **16 深挖 + 8 预留**：旧摘要仍保留该说法；本轮已被用户新指令覆盖。下游所有文档统一按 **24 equal-depth** 执行。
2. **主修模板项数**：访谈阶段已冻结为 5 字段；Phase 2 需要的 explicit non-goals 不另起新字段，统一写入第 5 字段“旁修影响范围 / 主修核心保留区 / 非目标”。
3. **经脉槽 / 运功位**：仍为待定边界，只能以占位接口表达，不能在任何下游文档中偷渡为正式规则。
4. **Loadout / Meridian boundary**：后续所有引用必须保留占位符，不得假定最终槽位数量。
5. **Workflow-plan compile path**：`docs/plans/2026-04-24-game-setting-multi-agent-workflow.md` 中“no output goes directly into `docs/design/*.md` / audit before compile”的旧流程，在本轮 team handoff 中被**文件直写 + gate 审核**取代；Phase 2–4 由各 worker 直接写入其拥有的 `docs/design/*` 目标文件或 section，audit 负责判定 pass / revise / block，而不是再创建一层平行 candidate 文稿。

## 本轮强制占位符（必须原样使用）
- `LOADOUT_INTERFACE_PENDING`
- `MERIDIAN_SLOT_COUNT_PENDING`
- `SLOT_PRESSURE_ASSUMPTION_ONLY`

## Deferred 边界（禁止在本轮定版）
- 第一章剧情 / 势力 / 章节结构
- 精确经脉槽数量
- 精确运功位数量
- 最终 loadout schema / equip matrix / slot unlock progression
- 任何要求特定槽位数量才能成立的传承或旁修
- 轻功、状态系统、投掷回收、内功/心法的完整规则层

## 下游写作红线
- 不得重定义主修 / 精修 / 旁修 / 传承四个术语。
- 不得在 Phase 2–4 私改模板结构；若 schema 必须变化，只能写入 `docs/working/decision-log.md` 请求升级。
- 不得让旁修补齐主修闭环。
- 不得让精修伪装成第二传承。
- 不得让传承依赖未冻结的槽位规则成立。
- 不得突破低魔边界（奇门 ≠ 西幻法师，音律 ≠ 法术职业，药师 ≠ 万能奶妈）。

## Phase 0 / 1 完成标准
- 基线快照存在且可单点引用。
- `docs/design/00-rule-bible.md` 已冻结 schema 与模板。
- `docs/working/agent-queue.md` 已定义 worker ownership / non-goals / phase gates。
- `docs/design/*` 与 `docs/working/*` scaffolds 已建立。

## Downstream kickoff packet
下游 lane 开工前，必须同时读取以下 3 份文件：
1. `docs/working/baseline-snapshot.md`
2. `docs/design/00-rule-bible.md`
3. `docs/working/agent-queue.md`

若任一内容与旧摘要、个人记忆或其他阶段草稿冲突，处理顺序固定为：
1. 本快照
2. `00-rule-bible.md`
3. `agent-queue.md`
4. 其余旧文档仅作背景，不得反向覆盖 Phase 0 / 1 冻结结果
