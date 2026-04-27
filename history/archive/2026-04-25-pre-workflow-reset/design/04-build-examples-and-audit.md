# 04 Build Examples and Audit

状态：Round 1 CRPG audit refreshed for human-gated loop
Owner：worker-3
Schema source：`docs/design/00-rule-bible.md`

> 本文件只定义 school coherence / build audit / compile intake 的执行框架与示例构筑审计模板。除“已冻结基线”外，任何具体主修 / 旁修 / 传承组合都仅是**审计假设**，不构成 canon 定版。

## Entry gate（进入本文件执行前必须满足）
1. `docs/design/01-main-disciplines.md` 已完成 8 个主修的 5 字段填写。
2. `docs/design/03-side-studies-and-loadout.md` 已完成 8 个流派旁修 1/2/3 与精修统一回报。
3. `docs/design/02-inheritances.md` 已完成全部 24 个传承的 7 字段填写。
4. 所有 school coherence 输入都仍遵守：
   - `LOADOUT_INTERFACE_PENDING`
   - `MERIDIAN_SLOT_COUNT_PENDING`
   - `SLOT_PRESSURE_ASSUMPTION_ONLY`
5. 任一 school 若拿不出“主修 + 旁修/精修 + 3 个传承”的完整组合视图，不得进入 Phase 4.5 / 5。

## Current upstream status
- `01-main-disciplines.md`：8/8 主修已按 5 字段填写，可做主修级 CRPG / school coherence 初审。
- `02-inheritances.md`：24/24 传承 section 已建立并补全 7 字段，可做同门分化与战斗结构初审。
- `03-side-studies-and-loadout.md`：八门旁修 1/2/3 与精修 1/2/3 已补完，`TBD = 0`。
- 结论：**school / inheritance / build audit 现在都已可读，mixed-build / compile 可以放行。**

## Current review snapshot（Round 1 / worker-3）
- 当前 CRPG gate：**PASS for currently visible cumulative suite**
- 直接 blocker：无；`docs/design/03-side-studies-and-loadout.md`、`docs/design/01-main-disciplines.md`、`docs/design/02-inheritances.md` 与 working 侧 tickets 已互相对齐。
- 已开 CRPG tickets：无新增；既有 `CRPG-01` ~ `CRPG-04` 保持 resolved。
- 二次 rewrite 建议：不做无票据的大改；仅在 worker-1 新增幻想或复测票据出现时，按“传承 / 旁修 / 角色形象”归位后再改 canon。
- 证据文件：
  - `docs/working/crpg-systems-pressure-report.md`
  - `docs/working/revision-tickets.md`
  - `docs/working/final-compile-checklist.md`

## Audit assumptions（冻结前提）
- 审计以“低魔武侠 CRPG”边界为最高约束。
- 审计默认构筑哲学为 **主修主导型**。
- 审计必须同时覆盖：纯主修可行性、混修身份完整性、低魔边界、mandatory tax pick、placeholder hidden dependency。
- 任何涉及槽位 / 运功位 / loadout 的判断，都只能写成：
  - `LOADOUT_INTERFACE_PENDING`
  - `MERIDIAN_SLOT_COUNT_PENDING`
  - `SLOT_PRESSURE_ASSUMPTION_ONLY`
- 若某 build 的成立需要具体槽位数量，默认判为 **BLOCK**，返回上游修正。

## School coherence checkpoint（Phase 4.5）

### 审核问题（每校都必须回答）
1. 这门主修是否先天成立，不靠旁修补闭环？
2. 三个传承是否读起来像同门分支，而不是三个互不相干的职业？
3. 三个传承彼此是否通过**功能职责 / 动作结构 / 资源关系 / 招牌机制**形成清晰边界？
4. 旁修表达是否强化该 school 的打法展开，而不是偷走身份？
5. 精修是否只是在“练深”，而不是伪装成第二传承？
6. 是否存在任何低魔越界或对未冻结 loadout 规则的隐藏依赖？

### Verdict vocabulary
- **PASS**：school 身份清晰，可进入 Build Audit。
- **REVISE**：school 主体可用，但存在可修正的边界重叠 / 表达漂移。
- **BLOCK**：school 结构冲突严重，进入 Build Audit 会放大错误。

### School coherence worksheet
| School | 家族感检查 | 传承分化检查 | 旁修侵蚀检查 | 低魔边界检查 | 当前状态 |
|---|---|---|---|---|---|
| 游锋 | 家族感清晰，仍是近身兵刃节奏 / 游斗 / 反击家族 | 连锋 / 断势 / 藏锋 已形成节奏分化 | 旁修侵蚀已通过审计 | 未见超自然瞬移式表达 | PASS |
| 破军 | 家族感清晰，仍是冲阵 / 阵线改写家族 | 冲阵 / 守阵 / 震岳 按阵线职责分化清楚 | 旁修侵蚀已通过审计 | 未见超规格高魔范围压制 | PASS |
| 拳掌 | 仍是贴身控制 / 经脉干预家族 | 点穴 / 擒拿 / 摧心 控制方式分化成立 | 旁修侵蚀已通过审计 | 未见玄幻式隔空封脉 | PASS |
| 射艺 | 仍是视野 / 距离 / 投射家族 | 穿杨 / 连珠 / 猎踪 射击节奏与标记方式分化明确 | 旁修侵蚀已通过审计 | 未见法术炮台化表达 | PASS |
| 影踪 | 隐蔽 / 伏击 / 脱战家族感清晰 | 伏杀 / 暗袭 / 设伏 的接敌与收网结构分化明确 | 旁修侵蚀已通过审计 | 未见高魔忍术化表达 | PASS |
| 药师 | 家族感成立，医 / 针 / 毒 / 蛊边界清楚 | 济世 / 针脉 / 蛊毒 已分化，机会成本表达已收紧 | 无 omni-role 风险 | 未见法术治愈越界 | PASS |
| 音律 | 节拍 / 心神 / 士气家族感成立 | 战鼓 / 清音 / 魔音 分化成立，单人成立性已补足 | 无纯 buff 工具化风险 | 未越界为法师吟唱系统 | PASS |
| 奇门 | 阵法 / 机关 / 符禁 家族感成立 | 三传承已分化，短遭遇价值已写清 | 无泛用解题器风险 | 仍守低魔 | PASS | |

> 注：上述 school verdict 现在已与 `03-side-studies-and-loadout.md`、`docs/working/revision-tickets.md` 和两份 pressure report 对齐，可作为 compile intake 基线。

## Build audit protocol（Phase 5）

### Required checks（每个 build 都跑）
1. **纯主修可行性**：同主修不靠旁修也能完成核心回合与终局收益。
2. **混修身份完整性**：旁修/精修改变打法，但不替代主修主体。
3. **低魔边界**：演出与机制仍落在低魔武侠范围。
4. **mandatory tax pick**：不存在“没拿某旁修就玩不了”的单点刚需。
5. **placeholder hidden dependency**：不需要具体 `MERIDIAN_SLOT_COUNT_PENDING` 才能证明成立。

### Outcome vocabulary
- **PASS**：fantasy 可达成，且不触犯红线。
- **REVISE**：fantasy 基本成立，但存在边界漂移 / 强绑旁修 / 低魔风险。
- **BLOCK**：fantasy 依赖未冻结规则或直接破坏主修主导哲学。

## Required fantasy builds（审计样本）

### 1. 扫地僧型
- 审计目标：验证“纯主修 / 纯精修”也能形成完整宗师路线。
- 候选主修假设：拳掌 / 药师 / 音律（以最终主修定稿为准）。
- 必须证明：
  - 不靠多门旁修也能稳定完成资源循环。
  - 精修回报体现“练深”而非额外副职业。
  - 终局强度来自宗师技 + 体系完成奖励，而不是隐形副修。
- 典型失败信号：必须带某旁修入口才能起手；精修 3 实际上在扮演传承。

### 2. 独臂剑侠型
- 审计目标：验证游锋系纯主修 / 少量旁修也能支撑残缺而凌厉的武侠幻想。
- 候选主修假设：游锋。
- 必须证明：
  - 主修本体能独立成立，不靠额外副修补连段。
  - 传承分化不会把“独臂感”偷换成数值补丁。
  - 旁修若介入，只能放大节奏或身法，不可取代兵刃核心循环。
- 典型失败信号：必须借拳掌或影踪闭环；游锋被写成万能近战总类。

### 3. 琴魔型
- 审计目标：验证音律可走压迫 / 扰心 / 节奏控制路线，而不沦为单纯 buff 职。
- 候选主修假设：音律。
- 必须证明：
  - 核心压力来自节拍 / 心神 / 群体节奏，不是法术轰炸。
  - 魔音 / 战鼓 / 清音 分化后仍是一门“音律武学”。
  - 混修不会把音律本体降格为战斗外增益器。
- 典型失败信号：靠高魔精神法术成立；只在队友存在时才有价值。

### 4. 白衣琴医型
- 审计目标：验证音律 × 药师混修能形成鲜明幻想，但主次分明。
- 候选表达假设：音律主修 + 药师旁修，或药师主修 + 音律旁修。
- 必须证明：
  - 两门体系存在结构接口，但主修主体不被另一门替代。
  - 治疗 / 稳定 / 节奏表达仍在低魔边界内。
  - 任何成立条件都不依赖未定 loadout 预算。
- 典型失败信号：两门都只提供工具效果；没有主次，变成拼盘 support。

### 5. 黑衣刺客型
- 审计目标：验证影踪能支撑完整刺客 fantasy，而不是单点功能插件。
- 候选主修假设：影踪。
- 必须证明：
  - 伏杀 / 暗袭 / 设伏 都能独立成立且差异明确。
  - 影踪不靠游锋或射艺才能完成爆发与脱离。
  - 潜行 / 烟雾 / 视线博弈仍属低魔武侠手段。
- 典型失败信号：影踪只能服务别的主修；出现超自然消失或长时间无解隐身。

### 6. 铁枪护法型
- 审计目标：验证破军可走护阵 / 拦截 / 稳线 fantasy，而非只剩冲锋输出。
- 候选主修假设：破军。
- 必须证明：
  - 守阵 / 冲阵 / 震岳 通过阵线职责明显分化。
  - 纯主修能形成可靠的拦截、护线、位移干预闭环。
  - 旁修介入后仍不丢失“阵线改变者”身份。
- 典型失败信号：破军必须借拳掌控制或游锋机动才能成立；被写成泛用重战士。

### 7. 毒医圣手型
- 审计目标：验证药师既能救人也能害人，但不会塌成万能奶妈或万能 debuff 机。
- 候选主修假设：药师。
- 必须证明：
  - 济世 / 针脉 / 蛊毒 的分化来自药性与施治/施毒方式，而非单纯数值方向。
  - 治疗、解毒、施毒三者可形成闭环，但不能覆盖一切队伍职责。
  - 混修不会让药师必绑音律或影踪才能成立。
- 典型失败信号：药师能同时成为顶级治疗、顶级控制、顶级持续伤害且无代价。

### 8. 机关奇人型
- 审计目标：验证奇门能改写局部战场规则，但不滑向高魔法师。
- 候选主修假设：奇门。
- 必须证明：
  - 阵法 / 机关 / 符禁 是三种不同的战场改写路径。
  - 奇门的强度来自布置、触发、诱导，而非无成本法术轰炸。
  - 与任何旁修组合都不应要求具体槽位数量才能解释成立。
- 典型失败信号：奇门可直接替代射艺、影踪、药师等多门主修；出现西幻施法词汇或表现。

## Build audit worksheet（执行模板）
| Build | 主修 | 传承 | 旁修 / 精修假设 | 纯主修可行性 | 混修身份完整性 | 低魔边界 | mandatory tax pick | placeholder dependency | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| 扫地僧型 | 拳掌 / 药师 / 音律 | 已定 | 精修 1/2/3 已完成 | PASS | PASS | PASS | PASS | PASS | PASS |
| 独臂剑侠型 | 游锋 | 断势 / 藏锋 | 纯主修优先；少量身法型旁修可选 | PASS | PASS | PASS | PASS | PASS | PASS |
| 琴魔型 | 音律 | 魔音 | 纯主修优先；旁修接口可选 | PASS | PASS | PASS | PASS | PASS | PASS |
| 白衣琴医型 | 音律 / 药师 | 已定主次 | 音律 × 药师 接口已补完 | PASS | PASS | PASS | PASS | PASS | PASS |
| 黑衣刺客型 | 影踪 | 伏杀 / 暗袭 / 设伏 | 纯主修优先；少量补入口旁修可选 | PASS | PASS | PASS | PASS | PASS | PASS |
| 铁枪护法型 | 破军 | 守阵 | 纯主修优先；护线旁修可选 | PASS | PASS | PASS | PASS | PASS | PASS |
| 毒医圣手型 | 药师 | 蛊毒 | 纯主修或少量接口混修可选 | PASS | PASS | PASS | PASS | PASS | PASS |
| 机关奇人型 | 奇门 | 阵法 / 机关 / 符禁 | 纯主修优先；任何旁修接口可选 | PASS | PASS | PASS | PASS | PASS | PASS |

## Cross-system stress checks
- **Pure-main pressure test**：每个主修都至少有一条不依赖旁修的可玩 build。
- **Mixed-build pressure test**：至少验证 1 个“单旁修 3 点”与 1 个“双旁修 1+2 / 2+1”表达，但不得越权写死 loadout 数量。
- **Identity theft sweep**：检查游锋↔破军、游锋↔影踪、药师↔音律、奇门↔全体的生态位吞并。
- **Low-magic sweep**：禁止出现仙侠飞剑雨、范围法术轰炸、无代价瞬移、万能复活、全图精神控制。
- **Deferred-interface sweep**：若某审计结论依赖具体槽位数，必须回写 `SLOT_PRESSURE_ASSUMPTION_ONLY` 并标记为 revise/block。

## Compile intake（Phase 6 handoff to compile）
本轮 compile intake 已完成；当前 verdict 全部为 PASS。Round 1 worker-3 refresh 未发现新的 P0/P1 CRPG blocker。

1. 每个 school 的 coherence verdict（PASS / REVISE / BLOCK）已收束为 PASS。
2. 8 个 fantasy build 的审计 verdict 已收束为 PASS，且触发原因均已记录到压力报告 / 修订票。
3. 所有触发过的 redline 编号已在 `docs/working/revision-tickets.md` 关闭。
4. `LOADOUT_INTERFACE_PENDING`、`MERIDIAN_SLOT_COUNT_PENDING`、`SLOT_PRESSURE_ASSUMPTION_ONLY` 仍作为 compile 约束保留，但不再阻断当前 intake。
5. **canon compile 可以放行。**

> 注：此处“可以放行”表示 worker-3 的 compile intake verdict 已整理完毕，可进入 leader review；最终是否接受为下一开发基线，仍由 leader 在 compile handoff 外层确认。

## Round 2 addendum — hybrid props and puppet boundary

### Snapshot
- Review basis：`WUX-011`、`WUX-012` resolved in current canon diff; no new `03-side-studies-and-loadout.md` tax text was added.
- CRPG verdict：**PASS with no mandatory rewrite required**. Current changes preserve build diversity and counterplay while keeping independent puppet action economy outside the round.
- Compile meaning：Round 2 adds two new audit guardrails, not a new school / inheritance / side-study expansion.

### Round 2 audit notes
- `铁伞 / 铁扇 / 手杖藏器` 这类 hybrid visible prop 现在可按两条合法 build read 审计：
  - `游锋` 主修：把道具读作近身兵刃表现，检查它是否真的回到贴近、断招、缠压、藏锋与锋势收束。
  - `奇门` 主修：把道具读作器具 / 载体表现，检查它是否真的回到布置、诱敌、挂符、触发与阵机回收。
- 审计时不得允许同一道具同时领取 `护身兵刃 + 连发容器 + 布置媒介 + 双主轴闭环`。一旦出现这种读法，直接判为 ownership failure，而不是继续在 `03` 里找补丁。
- `傀儡 / 机关偶 / 牵丝木人` 当前只允许两类结果：
  - 作为可见诱饵、假身、器具载体、一次性陷阱媒介或剧情 / NPC 演出：可继续按奇门器具 / 角色形象审计。
  - 作为独立移动、占格、夹击、承伤、relay 的战斗单位：直接判为 future minion / puppet system，当前 round `BLOCK / DEFERRED`。

### Extra fantasy audit rows to carry forward
| Build | 主修 | 传承 | 旁修 / 精修假设 | 纯主修可行性 | 混修身份完整性 | 低魔边界 | mandatory tax pick | placeholder dependency | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| 铁伞书生型 | 游锋 / 奇门 | 断势 / 藏锋 或 机关 | 射艺 / 影踪只作接口，不作主闭环 | PASS | PASS | PASS | PASS | PASS | PASS |
| 牵丝傀儡师型（器具 / 诱饵版） | 奇门 | 机关 | 可带射艺 / 影踪接口，但不获得独立单位行动线 | PASS | PASS | PASS | PASS | PASS | PASS |
| 牵丝傀儡师型（独立战斗 puppet 版） | future system | N/A | 当前 round 不立项 | BLOCK | BLOCK | BLOCK | BLOCK | BLOCK | BLOCK / DEFERRED |

### Round 2 reviewer advice
- No Canon Writer second-pass rewrite is required unless a new fantasy proves that one of the two legal hybrid reads still lacks a main-loop.
- Do not add dedicated `伞法` / `扇法` / `傀儡术` schools, and do not backdoor them through `03-side-studies-and-loadout.md`.
- Keep these cases as audit examples precisely because they are tempting edge cases: they test ownership discipline, counterplay readability, and action-economy boundaries better than they test raw power.
