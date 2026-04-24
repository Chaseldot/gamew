# Conflict Redlines — Audit Operating Set

状态：Phase 4.5 / 5 redline 集已预埋，等待上游内容进入审计  
Owner：worker-6

## 使用规则
- 本文件记录 school coherence / build audit / compile 期间的高优先级红线。
- 若上游文档触发红线，worker-6 负责在审计结果中标记 **REVISE** 或 **BLOCK**，而不是直接改写别人的 canon 文本。
- 若红线表明 schema 本身不足，只能通过 `docs/working/decision-log.md` 提交升级请求；不得 silent edit 现有 schema。

## Severity vocabulary
- **P0 / BLOCK**：直接阻止 school 或 build 进入下一阶段。
- **P1 / REVISE**：主体可用，但必须返修后才能继续。
- **P2 / WATCH**：暂不阻塞，但需要在 build audit 中持续跟踪。

## Core redline matrix
| ID | Severity | 红线 | 触发信号 | 默认动作 |
|---|---|---|---|---|
| RL-01 | P0 / BLOCK | 低魔越界 | 出现仙侠飞升、法术轰炸、无代价瞬移、万能复活、全图精神控制 | Block 并退回 owning lane |
| RL-02 | P0 / BLOCK | 主修闭环依赖旁修 | 主修若无特定旁修就无法起手 / 推进 / 收束 | Block 并要求补主修本体 |
| RL-03 | P0 / BLOCK | 传承依赖未冻结槽位规则 | 某传承只有在具体槽位数成立时才自洽 | Block 并标记 `MERIDIAN_SLOT_COUNT_PENDING` 依赖 |
| RL-04 | P1 / REVISE | 精修伪装成第二传承 | 精修层给出了独立身份、独立副循环、独立招牌机制 | Revise，要求回归“练深” |
| RL-05 | P1 / REVISE | 旁修替代主修主体 | 旁修 3 点的小循环超过主修主体权重 | Revise，削回接口 / 小循环定位 |
| RL-06 | P1 / REVISE | 传承身份被偷 | 资源关系 / 动作结构 / 招牌机制三锚点中只剩 0–1 项 | Revise，重建 2/3 anchors |
| RL-07 | P1 / REVISE | 同门传承边界重叠 | 三个传承只换数值或伤害类型，不改战斗结构 | Revise，重写边界定义 |
| RL-08 | P1 / REVISE | mandatory tax pick | 某旁修 / 某接口成为 build 刚需 | Revise，补主修或削接口依赖 |
| RL-09 | P2 / WATCH | build 只在极宽松 loadout 假设下成立 | 结论偷用了未声明的 generous slot budget | Watch，并补 `SLOT_PRESSURE_ASSUMPTION_ONLY` |
| RL-10 | P2 / WATCH | fantasy 成立但家族感变弱 | 个别 build 好玩，但 school 读起来不像同门 | Watch，进入 coherence memo |

## School-specific watchpoints

### 游锋
- 不得吞掉破军的阵线控制身份。
- 不得吞掉影踪的潜入 / 脱战 / 伏击身份。
- 不得被写成“所有近战都能归到游锋”的总类。

### 破军
- 不得沦为“更笨重的游锋”。
- 不得只剩冲锋伤害，失去拦截 / 护线 / 阵线改变价值。
- 不得通过高魔式范围震荡解决身份问题。

### 拳掌
- 不得成为万能近战控制合集。
- 不得依赖玄幻化的隔空封脉 / 隔山打牛大法术来成立。
- 不得靠旁修补完贴身起手或控制链核心。

### 射艺
- 不得滑成西幻射手或法术炮台。
- 不得把“投射 / 投掷 / 远程触发”偷换成纯站桩输出。
- 不得必须绑奇门 / 影踪才有战术深度。

### 影踪
- 不得沦为纯工具人。
- 不得靠不可互动的超自然隐身成立。
- 不得把设伏 / 暗袭 / 伏杀写成同一条 burst 线的换皮。

### 药师
- 不得成为万能奶妈。
- 不得同时无成本包揽治疗、净化、控制、持续伤害全部顶级位。
- 不得把药 / 针 / 毒 / 蛊写成纯法术化效果。

### 音律
- 不得只剩 buff 工具功能。
- 不得把节拍 / 心神 / 士气写成法师吟唱系统。
- 不得只有组队时才成立，单人成立性也需审计。

### 奇门
- 不得滑向西幻法师。
- 不得成为泛用解题器，吞掉射艺、影踪、药师、音律的战术入口。
- 不得把阵法 / 机关 / 符禁写成三套表现不同、实则同一法术框架。

## Fantasy build watchpoints
| Build | 重点红线 |
|---|---|
| 扫地僧型 | 纯主修 / 精修必须独立成立，不能靠隐形副修补强 |
| 独臂剑侠型 | 游锋不能被写成万能近战拼图 |
| 琴魔型 | 音律不能靠高魔法术压迫成立 |
| 白衣琴医型 | 音律 × 药师必须有主次，不可双工具拼盘 |
| 黑衣刺客型 | 影踪不能靠无解隐身或其他主修代打 |
| 铁枪护法型 | 破军不能失去阵线控制，仅剩数值肉坦 |
| 毒医圣手型 | 药师不能同时顶级治疗 + 顶级输出 + 顶级控制且无代价 |
| 机关奇人型 | 奇门不能靠法术轰炸 / 召唤物海战术成立 |

## Audit escalation rules
- 同一 school 同时触发 2 个以上 P1 红线：至少 **REVISE**。
- 任一 school 触发 1 个 P0 红线：直接 **BLOCK**，不得进入 build audit。
- 任一 build 同时触发“mandatory tax pick + placeholder hidden dependency”：直接 **BLOCK**。
- 若 build 通过，但 school watchpoints 持续未解：可单 build **PASS**、整 school **REVISE**，不可越权放行 compile。
