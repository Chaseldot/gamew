import {
  advanceObjective,
  createInitialState,
  createRng,
  deriveVariables,
  dialogueNodes,
  encounterMap,
  enemyTurn,
  performCheck,
  preludeFlags,
  resolveEnding,
  skills,
  useSkill,
} from './game-state.js';

const app = document.querySelector('#app');
const diceLayer = document.querySelector('#dice-layer');

const art = {
  hero: '../../assets/01-第一章-山水县境/05-任务与副本图/第一章-任务图-龙王庙水闸阵眼闸室.png',
  battle: '../../assets/01-第一章-山水县境/04-战斗图/第一章-战斗-龙王庙水闸救城断铃.png',
  chase: '../../assets/01-第一章-山水县境/05-任务与副本图/第一章-任务图-龙王庙水闸追凶夺钥.png',
  team: '../../assets/00-人物/01-队伍概念/人物-队伍概念-核心队友阵容.jpg',
  liu: '../../assets/00-人物/04-人物设定版/F-049-玉箫调心客-GameW风格.png',
  sang: '../../assets/00-人物/04-人物设定版/F-161-毒医圣手-GameW风格.png',
  tang: '../../assets/00-人物/04-人物设定版/F-150-鲁班锁匠客-GameW风格.png',
};

let state = null;
let selectedFlags = new Set();
let ending = null;
let rngSeed = 31;
let audioContext = null;

function nextRng() {
  rngSeed += 7;
  return createRng(rngSeed);
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return entities[char];
  });
}

function icon(name) {
  const icons = {
    check: '✓',
    dice: '◇',
    sword: '†',
    heal: '+',
    gear: '◎',
    music: '♪',
    water: '≋',
    key: '⌁',
    bell: '◌',
    reset: '↺',
  };
  return `<span class="icon" aria-hidden="true">${icons[name] ?? '•'}</span>`;
}

function playTone(type = 'click') {
  try {
    audioContext ??= new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const tones = {
      click: [220, 0.035, 'sine'],
      dice: [480, 0.08, 'triangle'],
      bell: [720, 0.16, 'sine'],
      hit: [160, 0.09, 'sawtooth'],
      heal: [560, 0.12, 'sine'],
      gear: [260, 0.12, 'square'],
    };
    const [frequency, duration, wave] = tones[type] ?? tones.click;
    oscillator.frequency.value = frequency;
    oscillator.type = wave;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.07, audioContext.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration + 0.02);
  } catch {
    // Audio is ornamental; browsers may block it until user interaction.
  }
}

function render() {
  if (!state) {
    renderPrelude();
    return;
  }

  if (state.phase === 'camp') renderCamp();
  if (state.phase === 'infiltration') renderInfiltration();
  if (state.phase === 'combat') renderCombat();
  if (state.phase === 'finale') renderFinale();
  if (state.phase === 'ending') renderEnding();
}

function renderPrelude() {
  const entries = Object.entries(preludeFlags);
  app.innerHTML = `
    <section class="slice-hero" style="--hero-image: url('${art.hero}')">
      <div class="hero-shade"></div>
      <div class="hero-panel">
        <p class="eyebrow">GameW Demo</p>
        <h1>龙王庙水闸</h1>
        <p class="hero-copy">今晚进闸前，你只能带走三份筹码。人情、图纸、曲调和账册都会在阵眼里还债。</p>
        <div class="flag-count">${selectedFlags.size}/3 已选择</div>
      </div>
    </section>
    <section class="setup-band">
      <div class="section-title">
        <p class="eyebrow">Prelude State</p>
        <h2>今晚你带着哪些筹码进闸？</h2>
      </div>
      <div class="choice-grid">
        ${entries.map(([id, flag]) => renderPreludeFlag(id, flag)).join('')}
      </div>
      <div class="sticky-command">
        <button class="primary-command" type="button" data-action="start" ${selectedFlags.size === 3 ? '' : 'disabled'}>
          ${icon('check')}进入战前营地
        </button>
      </div>
    </section>
  `;
}

function renderPreludeFlag(id, flag) {
  const selected = selectedFlags.has(id);
  const locked = selectedFlags.size >= 3 && !selected;
  return `
    <button class="choice-tile ${selected ? 'is-selected' : ''}" type="button" data-action="toggle-flag" data-flag="${id}" ${locked ? 'aria-disabled="true"' : ''}>
      <span class="tile-mark">${selected ? icon('check') : ''}</span>
      <strong>${escapeHTML(flag.title)}</strong>
      <span>${escapeHTML(flag.summary)}</span>
    </button>
  `;
}

function renderCamp() {
  app.innerHTML = `
    <section class="scene-layout camp-layout">
      <figure class="scene-media">
        <img src="${art.team}" alt="四人小队战前营地">
      </figure>
      <div class="scene-copy">
        <p class="eyebrow">Camp</p>
        <h1>破庙止雨</h1>
        <p class="scene-lead">水闸外的雨停了一刻。队友把今晚能承受的代价摆到你面前。</p>
        <div class="dialogue-stack">
          ${dialogueNodes.camp.map((node) => `
            <article class="dialogue-line">
              <strong>${escapeHTML(node.speaker)}</strong>
              <p>${escapeHTML(node.line)}</p>
            </article>
          `).join('')}
        </div>
        <div class="party-row">
          ${renderPartyPortrait('sang', art.sang)}
          ${renderPartyPortrait('tang', art.tang)}
          ${renderPartyPortrait('liu', art.liu)}
        </div>
        <div class="command-row">
          <button class="primary-command" type="button" data-action="enter-infiltration">${icon('water')}摸入水闸</button>
          <button class="ghost-command" type="button" data-action="restart">${icon('reset')}重选前置</button>
        </div>
      </div>
    </section>
  `;
}

function renderPartyPortrait(id, image) {
  const actor = state.actors[id];
  return `
    <article class="party-portrait">
      <img src="${image}" alt="${escapeHTML(actor.name)}">
      <div>
        <strong>${escapeHTML(actor.name)}</strong>
        <span>${escapeHTML(actor.role)}</span>
      </div>
    </article>
  `;
}

function renderInfiltration() {
  const checks = [
    {
      id: 'listenBell',
      actorId: 'liu',
      discipline: 'music',
      dc: 12,
      preludeFlag: 'heartTune',
      title: '听出戏台错拍',
      body: '成功：停铃目标先推进一格。失败：牒针压力上升。',
      icon: 'music',
      onSuccess: () => advanceObjective(state, 'bell', 1),
      onFailure: () => { state.pressure += 1; },
    },
    {
      id: 'readLedger',
      actorId: 'tav',
      discipline: 'evidence',
      dc: 12,
      preludeFlag: 'stoleLedger',
      title: '偏殿账册对质',
      body: '成功：证据暴露 +1，牒钥目标先推进一格。失败：白微尘警戒。',
      icon: 'dice',
      onSuccess: () => {
        state.variables.evidenceExposure += 1;
        advanceObjective(state, 'tieKey', 1);
      },
      onFailure: () => { state.pressure += 1; },
    },
    {
      id: 'markEscape',
      actorId: 'tav',
      discipline: 'pursuit',
      dc: 13,
      preludeFlag: 'trackedBai',
      title: '标出白微尘退路',
      body: '成功：追凶路线更短。失败：终局他更容易逃。',
      icon: 'key',
      onSuccess: () => advanceObjective(state, 'tieKey', 1),
      onFailure: () => { state.variables.whiteWeichenStatus = 'escaped'; },
    },
  ];

  app.innerHTML = `
    <section class="slice-screen">
      <div class="screen-header">
        <p class="eyebrow">Approach</p>
        <h1>水闸潜入</h1>
        <p>庙前戏台还没开锣，偏殿账页已经潮湿。先听铃、看账、标路，闸室里的代价会不同。</p>
      </div>
      <div class="approach-grid">
        ${checks.map((check) => `
          <button class="approach-option" type="button" data-action="run-check" data-check="${check.id}">
            ${icon(check.icon)}
            <strong>${escapeHTML(check.title)}</strong>
            <span>${escapeHTML(check.body)}</span>
          </button>
        `).join('')}
      </div>
      <aside class="status-rail">
        ${renderObjectiveMeters()}
        ${renderPressure()}
      </aside>
      <div class="command-row">
        <button class="primary-command" type="button" data-action="enter-combat">${icon('sword')}进入回合战斗</button>
      </div>
    </section>
  `;

  window.currentChecks = checks;
}

function renderCombat() {
  const completed = Object.values(state.objectives).filter((objective) => objective.complete).length;
  app.innerHTML = `
    <section class="combat-shell">
      <header class="combat-topbar">
        <div>
          <p class="eyebrow">Round ${state.round}</p>
          <h1>龙王庙水闸</h1>
        </div>
        <div class="topbar-actions">
          <button class="ghost-command" type="button" data-action="enemy-turn">${icon('bell')}结束本轮</button>
          <button class="primary-command" type="button" data-action="enter-finale" ${completed >= 2 || state.round >= 4 || state.pressure >= 7 ? '' : 'disabled'}>
            ${icon('key')}进入终局抉择
          </button>
        </div>
      </header>
      <div class="combat-grid">
        <section class="tactical-map" aria-label="水闸战术地图">
          <img src="${art.battle}" alt="">
          <div class="map-vignette"></div>
          ${Object.values(encounterMap).map(renderMapNode).join('')}
          ${Object.values(state.actors).map(renderActorToken).join('')}
          ${renderEnemyTokens()}
        </section>
        <aside class="combat-sidebar">
          ${renderObjectiveMeters()}
          ${renderPressure()}
          <section class="combat-log">
            <h2>战况</h2>
            ${state.log.slice(0, 6).map((item) => `<p>${escapeHTML(item)}</p>`).join('')}
          </section>
        </aside>
      </div>
      <section class="action-dock">
        ${Object.values(state.actors).map(renderActorActions).join('')}
      </section>
    </section>
  `;
}

function renderMapNode(node) {
  return `
    <button class="map-node" type="button" style="left:${node.x}%;top:${node.y}%;" title="${escapeHTML(node.note)}">
      <span>${escapeHTML(node.name)}</span>
    </button>
  `;
}

function renderActorToken(actor) {
  const node = encounterMap[actor.position] ?? encounterMap.stage;
  const offsets = { tav: [-4, 3], sang: [4, 5], tang: [1, -6], liu: [-7, -4] };
  const [dx, dy] = offsets[actor.id] ?? [0, 0];
  return `
    <div class="actor-token actor-${actor.id}" style="left:${node.x + dx}%;top:${node.y + dy}%;">
      <strong>${escapeHTML(actor.name.slice(0, 1))}</strong>
      <span>${actor.hp}/${actor.maxHp}</span>
    </div>
  `;
}

function renderEnemyTokens() {
  return `
    <div class="enemy-token enemy-bai" style="left:72%;top:50%;"><strong>白</strong><span>牒使</span></div>
    <div class="enemy-token" style="left:51%;top:57%;"><strong>铃</strong><span>阵眼</span></div>
    <div class="enemy-token" style="left:31%;top:69%;"><strong>水</strong><span>涨潮</span></div>
  `;
}

function renderActorActions(actor) {
  const actorSkills = Object.values(skills).filter((skill) => skill.actorId === actor.id);
  return `
    <article class="actor-panel">
      <header>
        <strong>${escapeHTML(actor.name)}</strong>
        <span>${escapeHTML(actor.role)}｜AP ${actor.ap}/${actor.maxAp}</span>
      </header>
      <div class="skill-row">
        ${actorSkills.map((skill) => `
          <button class="skill-button" type="button" data-action="use-skill" data-actor="${actor.id}" data-skill="${skill.id}" ${actor.ap >= skill.cost ? '' : 'disabled'}>
            ${icon(skillIcon(skill.discipline))}
            <span>${escapeHTML(skill.name)}</span>
            <small>DC ${skill.dc} / AP ${skill.cost}</small>
          </button>
        `).join('')}
      </div>
    </article>
  `;
}

function skillIcon(discipline) {
  return {
    medicine: 'heal',
    mechanism: 'gear',
    music: 'music',
    pursuit: 'key',
    evidence: 'dice',
    guard: 'sword',
  }[discipline] ?? 'dice';
}

function renderObjectiveMeters() {
  return `
    <section class="objective-stack">
      <h2>并行目标</h2>
      ${Object.values(state.objectives).map((objective) => `
        <article class="objective-meter ${objective.complete ? 'is-complete' : ''}">
          <div>
            <strong>${escapeHTML(objective.title)}</strong>
            <span>${objective.progress}/${objective.max}</span>
          </div>
          <meter min="0" max="${objective.max}" value="${objective.progress}"></meter>
        </article>
      `).join('')}
    </section>
  `;
}

function renderPressure() {
  return `
    <section class="pressure-box">
      <h2>牒针压力</h2>
      <div class="pressure-track" style="--pressure:${Math.min(state.pressure, 9)}">
        ${Array.from({ length: 9 }, (_, index) => `<span class="${index < state.pressure ? 'is-hot' : ''}"></span>`).join('')}
      </div>
      <p>${state.pressure >= 7 ? '铃阵逼近失控，终局会带着更高代价推进。' : '压力越高，水位和错铃越难收束。'}</p>
    </section>
  `;
}

function renderFinale() {
  app.innerHTML = `
    <section class="scene-layout finale-layout">
      <figure class="scene-media">
        <img src="${art.chase}" alt="水闸追凶夺钥">
      </figure>
      <div class="scene-copy">
        <p class="eyebrow">Final Choice</p>
        <h1>白微尘站在阵眼闸室</h1>
        <div class="dialogue-stack">
          ${dialogueNodes.baiWeichen.map((node) => `
            <article class="dialogue-line">
              <strong>${escapeHTML(node.speaker)}</strong>
              <p>${escapeHTML(node.line)}</p>
            </article>
          `).join('')}
        </div>
        <div class="final-choice-grid">
          <button type="button" data-action="final-choice" data-choice="save">${icon('water')}停铃救城</button>
          <button type="button" data-action="final-choice" data-choice="key">${icon('key')}追凶夺钥</button>
          <button type="button" data-action="final-choice" data-choice="expose">${icon('dice')}逼他公开账册</button>
          <button type="button" data-action="final-choice" data-choice="break">${icon('sword')}强行破阵逃离</button>
        </div>
      </div>
    </section>
  `;
}

function renderEnding() {
  const variables = ending.variables;
  app.innerHTML = `
    <section class="ending-screen">
      <div class="ending-hero">
        <p class="eyebrow">Outcome</p>
        <h1>${escapeHTML(ending.title)}</h1>
        <p>${escapeHTML(ending.subtitle)}</p>
      </div>
      <div class="ending-grid">
        <section class="ending-block">
          <h2>结算变量</h2>
          <dl class="variable-list">
            ${Object.entries(variables).map(([key, value]) => `
              <div>
                <dt>${escapeHTML(key)}</dt>
                <dd>${escapeHTML(String(value))}</dd>
              </div>
            `).join('')}
          </dl>
        </section>
        <section class="ending-block">
          <h2>队友反应</h2>
          ${ending.companionReactions.map((reaction) => `<p>${escapeHTML(reaction)}</p>`).join('')}
        </section>
        <section class="ending-block wide">
          <h2>第二章入口</h2>
          <p>${escapeHTML(ending.nextChapter)}</p>
          <div class="command-row">
            <button class="primary-command" type="button" data-action="restart">${icon('reset')}重开 demo</button>
          </div>
        </section>
      </div>
    </section>
  `;
}

async function showDice(result) {
  playTone('dice');
  diceLayer.hidden = false;
  diceLayer.innerHTML = `
    <div class="dice-modal">
      <p class="eyebrow">D20 Check</p>
      <div class="dice-face">${result.roll}</div>
      <p>${escapeHTML(result.actorName)}：${escapeHTML(result.discipline)} 检定 DC ${result.dc}</p>
      <div class="dice-formula">
        <span>d20 ${result.roll}</span>
        <span>能力 +${result.modifier}</span>
        <span>前置 +${result.preludeBonus}</span>
        <strong>= ${result.total}</strong>
      </div>
      <h2>${result.success ? '成功' : '失败推进'}</h2>
    </div>
  `;

  await new Promise((resolve) => setTimeout(resolve, 900));
  diceLayer.hidden = true;
}

async function handleRunCheck(checkId) {
  const check = window.currentChecks?.find((item) => item.id === checkId);
  if (!check) return;
  const result = performCheck(state, { ...check, rng: nextRng() });
  await showDice(result);
  if (result.success) {
    check.onSuccess();
    state.log.unshift(`${result.actorName} 完成检定：${check.title}`);
    playTone(check.icon === 'music' ? 'bell' : 'click');
  } else {
    check.onFailure();
    state.log.unshift(`${result.actorName} 检定失败，局势继续推进。`);
    playTone('hit');
  }
  render();
}

async function handleUseSkill(actorId, skillId) {
  const result = useSkill(state, { actorId, skillId, rng: nextRng() });
  if (!result.ok) return;
  await showDice(result.check);
  const tone = result.check.success ? skillTone(result.skill.discipline) : 'hit';
  playTone(tone);
  render();
}

function skillTone(discipline) {
  return {
    medicine: 'heal',
    mechanism: 'gear',
    music: 'bell',
  }[discipline] ?? 'click';
}

function applyFinalChoice(choice) {
  if (choice === 'save') {
    advanceObjective(state, 'bell', 3);
    advanceObjective(state, 'watergate', 4);
    state.variables.evidenceExposure += 1;
  }
  if (choice === 'key') {
    advanceObjective(state, 'tieKey', 3);
    state.variables.tieKeyState = 'obtained';
    state.variables.whiteWeichenStatus = 'captured';
    state.pressure += 1;
  }
  if (choice === 'expose') {
    state.variables.evidenceExposure += 2;
    advanceObjective(state, 'tieKey', 2);
    if (state.objectives.hostages.progress > 0) advanceObjective(state, 'hostages', 1);
  }
  if (choice === 'break') {
    state.pressure += 2;
    state.variables.whiteWeichenStatus = 'escaped';
  }

  state.variables = deriveVariables(state);
  ending = resolveEnding(state);
  state.phase = 'ending';
  playTone(choice === 'key' ? 'hit' : 'bell');
  render();
}

app.addEventListener('click', async (event) => {
  const control = event.target.closest('[data-action]');
  if (!control) return;
  const action = control.dataset.action;
  playTone('click');

  if (action === 'toggle-flag') {
    const flag = control.dataset.flag;
    if (selectedFlags.has(flag)) {
      selectedFlags.delete(flag);
    } else if (selectedFlags.size < 3) {
      selectedFlags.add(flag);
    }
    render();
  }

  if (action === 'start') {
    state = createInitialState([...selectedFlags]);
    render();
  }

  if (action === 'enter-infiltration') {
    state.phase = 'infiltration';
    render();
  }

  if (action === 'run-check') {
    await handleRunCheck(control.dataset.check);
  }

  if (action === 'enter-combat') {
    state.phase = 'combat';
    render();
  }

  if (action === 'use-skill') {
    await handleUseSkill(control.dataset.actor, control.dataset.skill);
  }

  if (action === 'enemy-turn') {
    const result = enemyTurn(state, nextRng());
    playTone(result.pressure >= 7 ? 'bell' : 'click');
    render();
  }

  if (action === 'enter-finale') {
    state.phase = 'finale';
    render();
  }

  if (action === 'final-choice') {
    applyFinalChoice(control.dataset.choice);
  }

  if (action === 'restart') {
    state = null;
    ending = null;
    selectedFlags = new Set();
    render();
  }
});

render();
