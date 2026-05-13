export const preludeFlags = {
  savedVillage: {
    title: '救过疫村',
    summary: '桑芷信任上升，救宿主检定 +3。',
    bonuses: { medicine: 3 },
  },
  mechanismMap: {
    title: '取得机括图',
    summary: '唐小砚可以更快分洪，奇门检定 +3。',
    bonuses: { mechanism: 3 },
  },
  heartTune: {
    title: '学会护心调',
    summary: '柳听弦能压住错拍铃，音律检定 +3。',
    bonuses: { music: 3 },
  },
  stoleLedger: {
    title: '偷到无头账',
    summary: '可在香火偏殿揭穿县令交易，审案检定 +3。',
    bonuses: { evidence: 3 },
  },
  shanzhaiContact: {
    title: '联络山神寨',
    summary: '山寨援兵牵制闸外追兵，守线检定 +3。',
    bonuses: { guard: 3 },
  },
  trackedBai: {
    title: '追踪白微尘',
    summary: '提前掌握牒使退路，追凶检定 +3。',
    bonuses: { pursuit: 3 },
  },
};

export const actors = {
  tav: {
    id: 'tav',
    name: 'Tav',
    role: '游锋前排',
    maxHp: 18,
    maxAp: 2,
    hp: 18,
    ap: 2,
    position: 'stage',
    modifiers: { melee: 4, pursuit: 3, guard: 2, evidence: 1 },
  },
  sang: {
    id: 'sang',
    name: '桑芷',
    role: '药师: 济世',
    maxHp: 14,
    maxAp: 2,
    hp: 14,
    ap: 2,
    position: 'sideHall',
    modifiers: { medicine: 4, evidence: 2, guard: 1 },
  },
  tang: {
    id: 'tang',
    name: '唐小砚',
    role: '奇门: 机括',
    maxHp: 13,
    maxAp: 2,
    hp: 13,
    ap: 2,
    position: 'corridor',
    modifiers: { mechanism: 4, evidence: 1, guard: 1 },
  },
  liu: {
    id: 'liu',
    name: '柳听弦',
    role: '音律: 错律',
    maxHp: 12,
    maxAp: 2,
    hp: 12,
    ap: 2,
    position: 'stage',
    modifiers: { music: 4, pursuit: 1, evidence: 2 },
  },
};

export const encounterMap = {
  stage: {
    id: 'stage',
    name: '庙前戏台',
    x: 18,
    y: 28,
    note: '鼓点里藏着照影铃，先破拍可减轻牒针压力。',
  },
  sideHall: {
    id: 'sideHall',
    name: '香火偏殿',
    x: 56,
    y: 24,
    note: '县令与白微尘留下账册和密谈痕迹。',
  },
  corridor: {
    id: 'corridor',
    name: '水闸机关廊',
    x: 38,
    y: 55,
    note: '梁道、水廊、机关廊交错，唐小砚可改闸分洪。',
  },
  chamber: {
    id: 'chamber',
    name: '阵眼闸室',
    x: 67,
    y: 63,
    note: '宿主、铜铃和牒钥都在这里进入最终压力。',
  },
  spillway: {
    id: 'spillway',
    name: '泄洪水道',
    x: 23,
    y: 76,
    note: '水势上来后会吞没证人，也能切断追兵。',
  },
};

export const objectives = {
  bell: {
    id: 'bell',
    title: '停铃',
    max: 3,
    progress: 0,
    complete: false,
    variable: 'liuHeartTune',
  },
  watergate: {
    id: 'watergate',
    title: '稳闸 / 分洪',
    max: 4,
    progress: 0,
    complete: false,
    variable: 'tangWatergateFix',
  },
  hostages: {
    id: 'hostages',
    title: '救牒针宿主',
    max: 3,
    progress: 0,
    complete: false,
    variable: 'hostageRescueScore',
  },
  tieKey: {
    id: 'tieKey',
    title: '夺牒钥 / 拦白微尘',
    max: 3,
    progress: 0,
    complete: false,
    variable: 'tieKeyState',
  },
};

export const skills = {
  breakRhythm: {
    id: 'breakRhythm',
    actorId: 'liu',
    name: '错拍反制',
    discipline: 'music',
    dc: 12,
    cost: 1,
    targetObjective: 'bell',
    progress: 2,
    preludeFlag: 'heartTune',
    success: '柳听弦改掉戏台鼓点，铜铃错拍短暂失准。',
    failure: '琴弦被铃声压住，牒针压力升高。',
  },
  splitFlood: {
    id: 'splitFlood',
    actorId: 'tang',
    name: '机括分洪',
    discipline: 'mechanism',
    dc: 12,
    cost: 2,
    targetObjective: 'watergate',
    progress: 2,
    preludeFlag: 'mechanismMap',
    success: '唐小砚拆开旧水闸齿轮，把水势导向泄洪道。',
    failure: '机关齿轮咬死，水位继续上涨。',
  },
  stabilizeHosts: {
    id: 'stabilizeHosts',
    actorId: 'sang',
    name: '稳心救针',
    discipline: 'medicine',
    dc: 11,
    cost: 1,
    targetObjective: 'hostages',
    progress: 1,
    preludeFlag: 'savedVillage',
    success: '桑芷压住宿主黑线，保住一批证人。',
    failure: '药性被铃声冲乱，宿主开始昏厥。',
  },
  interceptBai: {
    id: 'interceptBai',
    actorId: 'tav',
    name: '截云追牒',
    discipline: 'pursuit',
    dc: 13,
    cost: 1,
    targetObjective: 'tieKey',
    progress: 1,
    preludeFlag: 'trackedBai',
    success: 'Tav 读出白微尘退路，逼他交出牒钥位置。',
    failure: '白微尘借水雾脱身，只留下一枚断铃。',
  },
  exposeLedger: {
    id: 'exposeLedger',
    actorId: 'tav',
    name: '账册对质',
    discipline: 'evidence',
    dc: 12,
    cost: 1,
    targetObjective: 'tieKey',
    progress: 1,
    preludeFlag: 'stoleLedger',
    success: '无头账把何其庸和白微尘的交易钉在偏殿。',
    failure: '账页被水汽浸坏，证据只能保留片段。',
  },
  holdLine: {
    id: 'holdLine',
    actorId: 'tav',
    name: '守线护阵',
    discipline: 'guard',
    dc: 11,
    cost: 1,
    targetObjective: 'watergate',
    progress: 1,
    preludeFlag: 'shanzhaiContact',
    success: '山寨援兵堵住闸外追兵，机关廊终于有了空隙。',
    failure: '追兵压到机关廊，唐小砚被迫后撤。',
  },
};

export const dialogueNodes = {
  camp: [
    {
      speaker: '桑芷',
      line: '水闸里不是一场病，是有人把病、铃和机关接到了一起。先救宿主，证词才会活着走到第二章。',
    },
    {
      speaker: '唐小砚',
      line: '只要给我两轮，我能把主闸改成分洪。问题是白微尘不会让我安静修机关。',
    },
    {
      speaker: '柳听弦',
      line: '戏台鼓点里藏着错拍。若我先破铃，牒针宿主还有醒过来的机会。',
    },
  ],
  baiWeichen: [
    {
      speaker: '白微尘',
      line: '你以为我在杀人？我是在让山水县少死一些人。名字不能阻止灾祸，记录可以。',
    },
    {
      speaker: '桑芷',
      line: '你连他们的名字都没问过。',
    },
    {
      speaker: '唐小砚',
      line: '你们把我的机关接到水闸上，让它决定哪条街先淹。',
    },
  ],
};

const variableDefaults = {
  countyState: 'unknown',
  tieKeyState: 'lost',
  whiteWeichenStatus: 'escaped',
  hostageRescueScore: 0,
  watergateStability: 0,
  sangTrust: 'mid',
  tangWatergateFix: false,
  liuHeartTune: false,
  evidenceExposure: 0,
};

export function createRng(seed = Date.now()) {
  let state = Math.abs(Math.trunc(seed)) % 20;
  return () => {
    state = (state * 3 + 4) % 20;
    return state / 20;
  };
}

export function rollD20(rng = Math.random) {
  return Math.floor(rng() * 20) + 1;
}

export function createInitialState(selectedFlags) {
  validatePreludeFlags(selectedFlags);

  return {
    phase: 'camp',
    round: 1,
    activeActorId: 'tav',
    pressure: 1,
    preludeFlags: [...selectedFlags],
    actors: clone(actors),
    objectives: clone(objectives),
    variables: {
      ...variableDefaults,
      sangTrust: selectedFlags.includes('savedVillage') ? 'high' : 'mid',
      liuHeartTune: selectedFlags.includes('heartTune'),
      evidenceExposure: selectedFlags.includes('stoleLedger') ? 1 : 0,
    },
    log: ['雨停在龙王庙外，水闸下面传来第一声空铃。'],
  };
}

export function validatePreludeFlags(selectedFlags) {
  if (!Array.isArray(selectedFlags) || selectedFlags.length !== 3) {
    throw new Error('The vertical slice requires exactly 3 prelude flags.');
  }

  const unique = new Set(selectedFlags);
  if (unique.size !== selectedFlags.length) {
    throw new Error('Prelude flags must be unique.');
  }

  const unknown = selectedFlags.find((flag) => !preludeFlags[flag]);
  if (unknown) {
    throw new Error(`Unknown prelude flag: ${unknown}`);
  }
}

export function performCheck(state, check) {
  const actor = state.actors[check.actorId];
  if (!actor) {
    throw new Error(`Unknown actor: ${check.actorId}`);
  }

  const roll = rollD20(check.rng);
  const modifier = actor.modifiers[check.discipline] ?? 0;
  const preludeBonus = getPreludeBonus(state, check.discipline, check.preludeFlag);
  const total = roll + modifier + preludeBonus;

  return {
    actorId: actor.id,
    actorName: actor.name,
    discipline: check.discipline,
    dc: check.dc,
    roll,
    modifier,
    preludeBonus,
    total,
    success: total >= check.dc,
  };
}

export function getPreludeBonus(state, discipline, explicitFlag) {
  const flags = explicitFlag ? [explicitFlag] : state.preludeFlags;
  return flags.reduce((bonus, flag) => {
    if (!state.preludeFlags.includes(flag)) return bonus;
    return bonus + (preludeFlags[flag]?.bonuses?.[discipline] ?? 0);
  }, 0);
}

export function useSkill(state, action) {
  const actor = state.actors[action.actorId];
  const skill = skills[action.skillId];

  if (!actor || !skill || skill.actorId !== actor.id) {
    return { ok: false, reason: 'invalid-action' };
  }

  if (actor.ap < skill.cost) {
    return { ok: false, reason: 'not-enough-ap' };
  }

  actor.ap -= skill.cost;
  const check = performCheck(state, {
    actorId: actor.id,
    discipline: skill.discipline,
    dc: skill.dc,
    preludeFlag: skill.preludeFlag,
    rng: action.rng,
  });

  const objective = state.objectives[skill.targetObjective];
  const amount = check.success ? skill.progress : Math.max(0, skill.progress - 1);
  if (amount > 0) {
    advanceObjective(state, objective.id, amount);
  }

  if (!check.success) {
    state.pressure += 1;
  }

  const message = check.success ? skill.success : skill.failure;
  state.log.unshift(`${actor.name}：${message}`);

  return {
    ok: true,
    skill,
    check,
    objective,
    message,
  };
}

export function advanceObjective(state, objectiveId, amount = 1) {
  const objective = state.objectives[objectiveId];
  if (!objective) {
    throw new Error(`Unknown objective: ${objectiveId}`);
  }

  objective.progress = Math.min(objective.max, objective.progress + amount);
  objective.complete = objective.progress >= objective.max;
  syncObjectiveVariables(state, objective);
  return objective;
}

export function enemyTurn(state, rng = Math.random) {
  const events = [];
  const roll = rollD20(rng);

  state.pressure += roll >= 12 ? 2 : 1;
  events.push(roll >= 12 ? '白微尘引响暗铃，所有宿主的黑线同时一紧。' : '水位上涨一格，闸室木梁开始发出裂声。');

  if (!state.objectives.bell.complete && state.pressure >= 4) {
    damageActor(state, 'liu', 1);
    events.push('柳听弦被错拍反噬，下一段琴声明显发涩。');
  }

  if (!state.objectives.watergate.complete && state.pressure >= 5) {
    state.variables.watergateStability = Math.max(0, state.variables.watergateStability - 1);
    events.push('机关廊被水汽吞没，分洪窗口变窄。');
  }

  resetRoundAp(state);
  state.round += 1;
  state.log.unshift(...events);

  return { events, pressure: state.pressure };
}

export function resetRoundAp(state) {
  for (const actor of Object.values(state.actors)) {
    actor.ap = actor.maxAp;
  }
}

export function damageActor(state, actorId, amount) {
  const actor = state.actors[actorId];
  if (!actor) return;
  actor.hp = Math.max(0, actor.hp - amount);
}

export function resolveEnding(state) {
  const completedCount = Object.values(state.objectives).filter((objective) => objective.complete).length;
  const variables = deriveVariables(state);

  if (state.objectives.watergate.complete && state.objectives.hostages.complete && state.objectives.bell.complete) {
    return endingRules.balancedMercy(variables, completedCount);
  }

  if (state.objectives.tieKey.complete || variables.tieKeyState === 'obtained') {
    return endingRules.chaseKey(variables, completedCount);
  }

  if (state.objectives.watergate.complete || variables.tangWatergateFix) {
    return endingRules.technicalMercy(variables, completedCount);
  }

  return endingRules.chaosEscape(variables, completedCount);
}

export function deriveVariables(state) {
  const variables = { ...state.variables };

  variables.hostageRescueScore = Math.max(variables.hostageRescueScore, state.objectives.hostages.progress);
  variables.watergateStability = Math.max(variables.watergateStability, state.objectives.watergate.progress);

  if (state.objectives.watergate.complete && state.objectives.hostages.complete) {
    variables.countyState = 'saved';
  } else if (state.pressure >= 7 || variables.watergateStability <= 1) {
    variables.countyState = 'flooded';
  } else {
    variables.countyState = 'scarred';
  }

  if (state.objectives.tieKey.complete) {
    variables.tieKeyState = 'obtained';
    variables.whiteWeichenStatus = variables.whiteWeichenStatus === 'captured' ? 'captured' : 'wounded';
  }

  if (state.objectives.bell.complete) {
    variables.liuHeartTune = true;
  }

  if (state.objectives.watergate.complete) {
    variables.tangWatergateFix = true;
  }

  if (state.objectives.hostages.complete && variables.sangTrust !== 'low') {
    variables.sangTrust = 'high';
  }

  return variables;
}

export const endingRules = {
  balancedMercy(variables, completedCount) {
    return {
      id: 'balancedMercy',
      title: '技术 / 医疗折中',
      subtitle: '水闸稳住，宿主多数活下，白微尘带着半枚牒钥遁入水雾。',
      variables: {
        ...variables,
        countyState: 'saved',
        tieKeyState: variables.tieKeyState === 'obtained' ? 'obtained' : 'lost',
      },
      companionReactions: [
        '桑芷：这些人能作证，也能继续活着。',
        '唐小砚：水闸不是杀人的机关，至少今晚不是。',
        '柳听弦：护心调还压不住所有铃，但够把他们带出闸室。',
      ],
      nextChapter: '第二章从龙门驿证人同行开局，百工坞和慈心医脉线提前增强。',
      completedCount,
    };
  },
  chaseKey(variables, completedCount) {
    return {
      id: 'chaseKey',
      title: '追凶夺钥',
      subtitle: '白微尘被截住，牒钥到手；水患和宿主伤亡成为第二章的第一笔债。',
      variables: {
        ...variables,
        countyState: variables.countyState === 'saved' ? 'scarred' : 'flooded',
        tieKeyState: 'obtained',
        whiteWeichenStatus: variables.whiteWeichenStatus === 'captured' ? 'captured' : 'wounded',
      },
      companionReactions: [
        '桑芷：钥匙在手，可有些人的脉再也接不回来了。',
        '唐小砚：如果再多半盏茶，我能让水少淹两条街。',
        '柳听弦：他逃不远，但今晚的铃声会跟着我们走。',
      ],
      nextChapter: '第二章可提前追踪照影楼坞，但山水县证词变弱，难民压力上升。',
      completedCount,
    };
  },
  technicalMercy(variables, completedCount) {
    return {
      id: 'technicalMercy',
      title: '救城留证',
      subtitle: '分洪成功，县城保住；白微尘逃走，留下账册和残铃作为证据。',
      variables: {
        ...variables,
        countyState: 'saved',
        tieKeyState: 'lost',
      },
      companionReactions: [
        '桑芷：人活着，证词就还有气。',
        '唐小砚：我会查清是谁把百工机关接进铃阵。',
        '柳听弦：错拍还没断根，白微尘会再响一次铃。',
      ],
      nextChapter: '第二章从证人同行开局，盟会更容易开启，但牒钥线索不足。',
      completedCount,
    };
  },
  chaosEscape(variables, completedCount) {
    return {
      id: 'chaosEscape',
      title: '混乱逃离',
      subtitle: '水闸失控，铃声撕开夜雨；小队活下来，但真相碎成几段。',
      variables: {
        ...variables,
        countyState: 'flooded',
        tieKeyState: variables.tieKeyState === 'obtained' ? 'obtained' : 'lost',
      },
      companionReactions: [
        '桑芷：没有证人，只有病人和尸体。',
        '唐小砚：机关廊塌了，百工坞会说这不是他们的错。',
        '柳听弦：我记住了那段铃，下一次不能再慢。',
      ],
      nextChapter: '第二章从破局逃离开局，玩家自主性高，但盟会门槛和城市压力都上升。',
      completedCount,
    };
  },
};

function syncObjectiveVariables(state, objective) {
  if (objective.id === 'bell') {
    state.variables.liuHeartTune = objective.complete;
  }
  if (objective.id === 'watergate') {
    state.variables.watergateStability = objective.progress;
    state.variables.tangWatergateFix = objective.complete;
  }
  if (objective.id === 'hostages') {
    state.variables.hostageRescueScore = objective.progress;
  }
  if (objective.id === 'tieKey' && objective.complete) {
    state.variables.tieKeyState = 'obtained';
    state.variables.whiteWeichenStatus = 'wounded';
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
