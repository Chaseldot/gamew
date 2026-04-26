import {
  actOneBranches,
  actOneCompanionStates,
  actOneFactions,
  actOneMainQuests,
  actOneSceneSamples,
  actOneSideQuests,
  actThreeMainQuests,
  actTwoMainQuests,
  actTwoSideQuests,
  acts,
  branchNodes,
  branchVariableGroups,
  codexEntries,
  companionFinaleQuests,
  companionVariableRules,
  companions,
  darkOrigin,
  darkOriginVariables,
  disciplines,
  endings,
  factions,
  gallery,
  inheritances,
  keyNpcs,
  levelMilestones,
  levelRules,
  navPages,
  productionStatus,
  questSamples,
  regions,
  reputationScale,
  siteMeta,
  solutionTags,
  storyScenes,
} from './data.js';

const root = document.querySelector('#page-root');

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
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

function tokenList(items) {
  return `<div class="token-list">${items.map((item) => `<span class="token">${escapeHTML(item)}</span>`).join('')}</div>`;
}

function pageHero({ kicker, title, lead, image, actions = [] }) {
  const actionHTML = actions.length
    ? `<div class="hero-actions">${actions.map((action) => `<a href="${action.href}">${escapeHTML(action.label)}</a>`).join('')}</div>`
    : '';

  return `
    <section class="hero page-hero" aria-labelledby="page-title">
      <img class="hero-media" src="${image}" alt="">
      <div class="hero-scrim" aria-hidden="true"></div>
      <div class="hero-content">
        <p class="eyebrow">${escapeHTML(kicker)}</p>
        <h1 id="page-title">${escapeHTML(title)}</h1>
        <p class="hero-copy">${escapeHTML(lead)}</p>
        ${actionHTML}
      </div>
      <div class="hero-stats">
        ${productionStatus.map((item) => `<div class="hero-stat"><strong>${escapeHTML(item.value)}</strong><span>${escapeHTML(item.label)}</span></div>`).join('')}
      </div>
    </section>
  `;
}

function sectionHeader(kicker, title, lead = '') {
  return `
    <p class="eyebrow">${escapeHTML(kicker)}</p>
    <h2>${escapeHTML(title)}</h2>
    ${lead ? `<p class="section-lead">${escapeHTML(lead)}</p>` : ''}
  `;
}

function card({ label, title, body, tokens = [] }) {
  return `
    <article class="info-card">
      ${label ? `<span class="small-label">${escapeHTML(label)}</span>` : ''}
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(body)}</p>
      ${tokens.length ? tokenList(tokens) : ''}
    </article>
  `;
}

function renderHome() {
  root.innerHTML = `
    ${pageHero({
      kicker: siteMeta.kicker,
      title: '山水照影录',
      lead: siteMeta.summary,
      image: 'assets/art/第一章-主视觉-山水县封境.jpg',
      actions: [
        { href: './stories.html', label: '阅读故事' },
        { href: './regions.html', label: '查看地区' },
        { href: './art.html', label: '浏览美术' },
      ],
    })}
    <section class="band intro-band">
      <div class="section-inner">
        ${sectionHeader('当前完成切片', '从第一章样板开始滚雪球', '文本资产已经从大纲拆成章节、任务、阵营、队友、分支变量和网站映射；站点现在以子页面承载信息，不再把所有内容堆在首页。')}
        <div class="pillar-grid">
          ${siteMeta.pillars.map((pillar, index) => `<div class="pillar"><span>0${index + 1}</span><h3>${escapeHTML(pillar)}</h3></div>`).join('')}
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('页面入口', '按资料类型进入', '世界、系统、剧情、任务、队友、阵营和美术资源各自独立，后续章节可按同一结构追加。')}
        <div class="page-card-grid">
          ${navPages
            .filter((page) => page.page !== 'home')
            .map(
              (page) => `
                <a class="info-card link-card" href="./${page.href}">
                  <span class="small-label">${escapeHTML(page.href)}</span>
                  <h3>${escapeHTML(page.label)}</h3>
                  <p>${escapeHTML(pageSummaries[page.page] ?? '内容页')}</p>
                  ${tokenList(['子页面'])}
                </a>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

const pageSummaries = {
  world: '照影牒针、三章结构、低魔武侠规则和照影城总清算。',
  regions: '山水县境、黄沙古道、照影城的地点、视觉关键词、任务和后果。',
  factions: '八大阵营的公开诉求、隐藏阴影、代表人物和玩家关系。',
  characters: '八名战斗队友、起源角色、关键 NPC 与无名煞。',
  stories: '关键场景、短篇、漫画脚本和 galgame 化故事节点。',
  quests: '三章主线、重点支线、队友终局和多解标签。',
  branches: '章节变量、阵营声望、队友变量、无名煞变量和分支节点。',
  codex: '照影牒针、照影铃、牒录、牒钥、武籍、断因房和母局术语。',
  systems: '八大流派、九级构筑、十七传承、四人小队和营地规则。',
  'story-act1': '第一章《封境》的章节故事、任务节点、分支选择和剧本样段。',
  companions: '队友战斗定位、第一章入队状态、个人线和无名煞响应。',
  art: '4K 概念、场景、战斗展示和按需人物资源。',
};

function renderWorld() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'World Bible',
      title: '照影牒针把江湖写进册中',
      lead: '这不是神魔入侵，而是药、符、音、机和档案合成的低魔控制系统。每一章都在追问：谁有资格替天下武人预判命运。',
      image: 'assets/art/第三章-主视觉-照影城下城远景.jpg',
      actions: [{ href: './story-act1.html', label: '看第一章样板' }],
    })}
    <section class="band world-band">
      <div class="section-inner">
        ${sectionHeader('三章结构', '从封境到司命', '第一章建立牒针危机和队伍，第二章把局部危机扩大到江湖，第三章在照影城回收前两章所有选择。')}
        <div class="act-grid">${acts.map(renderActCard).join('')}</div>
        <div class="ending-strip">${endings.map((ending) => `<span class="token">${escapeHTML(ending)}</span>`).join('')}</div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('低魔规则', '牒针不是毒，也不是神术')}
        <div class="page-card-grid">
          ${[
            ['牒针', '植入腕脉、命门或玉枕，影响痛觉、记忆、梦境和杀意。'],
            ['影纹', '记录气机、招式习惯、情绪波动和人际牵连。'],
            ['照影铃', '远距离触发错拍、幻听、昏厥、狂乱或短暂共感。'],
            ['牒录', '把武人过往、救人、杀人、风险预判和可控等级写入册中。'],
          ]
            .map(([title, body]) => card({ label: '照影牒针结构', title, body }))
            .join('')}
        </div>
      </div>
    </section>
  `;
}

function renderActCard(act) {
  return `
    <article class="act-card">
      <img src="${act.image}" alt="${escapeHTML(act.title)}">
      <div class="act-card-body">
        <span class="small-label">${escapeHTML(act.location)}</span>
        <h3>${escapeHTML(act.title)}</h3>
        <p>${escapeHTML(act.theme)}</p>
        ${tokenList(act.goals)}
        ${tokenList(act.places)}
      </div>
    </article>
  `;
}

function renderRegions() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Regions',
      title: '三章地图从小沙盒推到城市总清算',
      lead: 'v0.3 把地区定义为剧情、任务、阵营、人物和美术资源的交叉索引。每个地区都要能说明视觉关键词、核心问题、地点结构和后续回收。',
      image: 'assets/art/第二章-主视觉-黄沙边关远景.jpg',
      actions: [{ href: './quests.html', label: '查看任务链' }],
    })}
    <section class="band world-band">
      <div class="section-inner">
        ${sectionHeader('章节地区', '山水县境、黄沙古道、照影城')}
        <div class="act-grid">${regions.map(renderRegionCard).join('')}</div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('地点索引', '地点不是背景，而是任务入口')}
        <div class="page-card-grid">
          ${regions
            .flatMap((region) => region.locations.map((location) => ({ region, location })))
            .map(({ region, location }) => card({ label: region.name, title: location, body: `${region.chapter} 的可探索节点。核心问题：${region.coreQuestion}`, tokens: region.quests.slice(0, 4) }))
            .join('')}
        </div>
      </div>
    </section>
  `;
}

function renderRegionCard(region) {
  return `
    <article class="act-card">
      <img src="${region.image}" alt="${escapeHTML(region.name)}">
      <div class="act-card-body">
        <span class="small-label">${escapeHTML(region.id)}｜${escapeHTML(region.chapter)}</span>
        <h3>${escapeHTML(region.name)}</h3>
        <p>${escapeHTML(region.summary)}</p>
        ${tokenList([region.visual, region.coreQuestion])}
        ${tokenList(region.locations)}
      </div>
    </article>
  `;
}

function renderSystems() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Systems',
      title: '八大流派支撑九级构筑',
      lead: '流派是能力领域，不是固定职业。玩家用主修、传承、旁修和队伍组合拼出毒医、琴魔、白衣剑神、铁枪护法等武侠幻想。',
      image: 'assets/art/第一章-战斗-林间山道伏击点.jpg',
    })}
    <section class="band systems-band">
      <div class="section-inner">
        ${sectionHeader('等级 / 流派 / 传承', '系统骨架')}
        <div class="system-layout">
          <div class="level-rail">
            ${levelMilestones.map((item) => `
              <article class="level-item">
                <strong>${item.level}</strong>
                <div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.reward)}</p></div>
              </article>
            `).join('')}
          </div>
          <div class="discipline-workbench">
            <div class="discipline-tabs" id="discipline-tabs" role="tablist" aria-label="流派"></div>
            <div class="discipline-detail" id="discipline-detail"></div>
            <div class="inheritance-grid" id="inheritance-grid"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('队伍规则', '四人出战，营地承载叙事')}
        <div class="page-card-grid">
          ${[
            ['四人小队', '自定义主角或起源主控 + 三名队友。未出战队友留营地，仍可触发对话、争执和支援。'],
            ['任务多解', '重要任务至少有武力路径、系统路径和角色路径。失败会推进成新局面。'],
            ['无名煞', '顺煞、压煞、引煞、换煞不是善恶按钮，而是短期利益和长期后果的交换。'],
          ].map(([title, body]) => card({ title, body, tokens: levelRules.slice(0, 4) })).join('')}
        </div>
      </div>
    </section>
  `;
  renderDiscipline();
}

function renderDiscipline(activeId = disciplines[0].id) {
  const tabs = document.querySelector('#discipline-tabs');
  if (!tabs) return;

  const active = disciplines.find((discipline) => discipline.id === activeId) ?? disciplines[0];
  document.documentElement.style.setProperty('--active-color', active.color);

  tabs.innerHTML = disciplines
    .map((discipline) => `<button class="tab-button" type="button" role="tab" aria-selected="${discipline.id === active.id}" data-discipline="${discipline.id}">${escapeHTML(discipline.name)}</button>`)
    .join('');

  document.querySelector('#discipline-detail').innerHTML = `
    <span class="small-label">核心资源：${escapeHTML(active.resource)}</span>
    <h3>${escapeHTML(active.name)}｜${escapeHTML(active.role)}</h3>
    <p>${escapeHTML(active.tone)}</p>
    ${tokenList(levelRules)}
  `;

  document.querySelector('#inheritance-grid').innerHTML = inheritances
    .filter((item) => item.discipline === active.name)
    .map((item) => card({ label: item.chassis, title: item.name, body: item.fantasy }))
    .join('');

  document.querySelectorAll('[data-discipline]').forEach((button) => {
    button.addEventListener('click', () => renderDiscipline(button.dataset.discipline));
  });
}

function renderStoryActOne() {
  root.innerHTML = `
    ${pageHero({
      kicker: '第一章：封境',
      title: '山水县境，水闸之前',
      lead: '玩家在清河渡醒来，腕上有照影牒针黑线。第一章用一个封闭县境承载官府、山寨、疫村、黑市、队友和照影局的多方冲突。',
      image: 'assets/art/第一章-主视觉-山水县封境.jpg',
      actions: [{ href: './quests.html', label: '查看任务矩阵' }],
    })}
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('章节地图', '七个节点拧成一个终局', '清河渡、县城、疫村、山神寨、龙王庙水闸、旧镖道、废书院各自提供一条进入终局的资源。')}
        <div class="timeline-grid">
          ${['清河渡', '山水县城', '疫村', '山神寨', '龙王庙水闸', '旧镖道', '废书院'].map((place, index) => card({ label: `节点 ${index + 1}`, title: place, body: placeDescriptions[place] })).join('')}
        </div>
      </div>
    </section>
    <section class="band quests-band">
      <div class="section-inner">
        ${sectionHeader('主线任务', 'A1-M01 到 A1-M04')}
        <div class="quest-list">${actOneMainQuests.map(renderDetailedQuest).join('')}</div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('剧本样段', '可直接作为网站故事页展示')}
        <div class="scene-grid">${actOneSceneSamples.map(renderSceneSample).join('')}</div>
      </div>
    </section>
  `;
}

const placeDescriptions = {
  清河渡: '开场翻车、第一场危机、牒针线索。',
  山水县城: '县衙、酒楼、医馆、牢城、黑市入口。',
  疫村: '药师线、牒针试验、桑芷招募。',
  山神寨: '江湖路线、山路出县、同尘盟前置。',
  龙王庙水闸: '第一章终局，铃阵、水患、牒钥和阵营清算。',
  旧镖道: '韩霜铁线、护送、尸车、缉武司旧案。',
  废书院: '牒录残页、音律 / 奇门谜题、无名煞旧记忆。',
};

function renderDetailedQuest(quest) {
  return `
    <article class="detail-panel">
      <span class="small-label">${escapeHTML(quest.code)}</span>
      <h3>${escapeHTML(quest.name)}</h3>
      <p>${escapeHTML(quest.objective)}</p>
      ${tokenList(quest.scenes)}
      ${tokenList(quest.paths)}
      <p><strong>失败推进：</strong>${escapeHTML(quest.failure)}</p>
    </article>
  `;
}

function renderSceneSample(sample) {
  return `
    <article class="scene-card">
      <span class="small-label">剧本样段</span>
      <h3>${escapeHTML(sample.title)}</h3>
      <p>${escapeHTML(sample.beat)}</p>
      ${tokenList(sample.choices)}
    </article>
  `;
}

function renderQuests() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Quest Index',
      title: '三章任务链把选择滚到终局',
      lead: 'v0.3 的任务设计要求每条主线至少有多入口、多解法、阵营影响、队友响应、变量记录和失败推进。任务页现在覆盖三章主线、重点支线和第三章队友终局。',
      image: 'assets/art/第三章-场景-官署审案堂与档案房.jpg',
    })}
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('多解标签', '任务解法覆盖战斗、系统和角色')}
        <div class="tag-ribbon">${solutionTags.map((tag) => `<span class="token">${escapeHTML(tag)}</span>`).join('')}</div>
        <div class="quest-list">
          ${actOneMainQuests.map(renderDetailedQuest).join('')}
          ${actTwoMainQuests.map(renderQuestIndexItem).join('')}
          ${actThreeMainQuests.map(renderQuestIndexItem).join('')}
        </div>
      </div>
    </section>
    <section class="band quests-band">
      <div class="section-inner">
        ${sectionHeader('支线与盒子任务', '第一章支线 + 黄沙客栈')}
        <div class="page-card-grid">
          ${actOneSideQuests.map((quest) => card({ label: `${quest.code}｜${quest.type}`, title: quest.name, body: quest.conflict, tokens: [quest.impact] })).join('')}
          ${actTwoSideQuests.map((quest) => card({ label: `${quest.code}｜${quest.type}`, title: quest.name, body: `${quest.objective} 真相：${quest.truth}`, tokens: quest.choices })).join('')}
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('队友终局任务', '第三章每名核心队友都有一次清算')}
        <div class="page-card-grid">
          ${companionFinaleQuests.map((quest) => card({ label: `${quest.code}｜${quest.companion}`, title: quest.name, body: quest.coreChoice })).join('')}
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('终局分支', '龙王庙水闸写入变量')}
        <div class="branch-grid">
          ${actOneBranches.map((branch) => card({ label: branch.variables.join(' / '), title: branch.name, body: branch.result })).join('')}
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('后续任务样例', '第二章和第三章先保留索引')}
        <div class="quest-grid">${questSamples.map(renderQuestCard).join('')}</div>
      </div>
    </section>
  `;
}

function renderQuestIndexItem(quest) {
  return `
    <article class="detail-panel">
      <span class="small-label">${escapeHTML(quest.code)}｜${escapeHTML(quest.type)}｜${escapeHTML(quest.location)}</span>
      <h3>${escapeHTML(quest.name)}</h3>
      <p>${escapeHTML(quest.objective)}</p>
      ${tokenList(quest.choices)}
    </article>
  `;
}

function renderQuestCard(quest) {
  return `
    <article class="quest-card">
      <img src="${quest.image}" alt="${escapeHTML(quest.name)}">
      <div class="quest-card-body">
        <span class="small-label">${escapeHTML(quest.code)}｜${escapeHTML(quest.act)}｜${escapeHTML(quest.kind)}</span>
        <h3>${escapeHTML(quest.name)}</h3>
        <p>${escapeHTML(quest.pitch)}</p>
        ${tokenList(quest.tags)}
      </div>
    </article>
  `;
}

function renderStories() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Stories',
      title: '故事页承载小说、漫画脚本和互动分支',
      lead: 'v0.3 已给出关键场景样例：开场、队友招募、水闸终局、黄沙客栈、千佛石窟、武籍大审、无名煞营地戏和最终母局对峙。',
      image: 'assets/art/第一章-场景-雨后县城客栈.jpg',
      actions: [{ href: './branches.html', label: '查看分支节点' }],
    })}
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('关键场景', '按剧透层级逐步公开')}
        <div class="scene-grid">${storyScenes.map(renderStoryScene).join('')}</div>
      </div>
    </section>
    <section class="band quests-band">
      <div class="section-inner">
        ${sectionHeader('首批扩写优先级', '从可展示的剧情体验开始')}
        <div class="page-card-grid">
          ${[
            ['雨夜醒牒', '开场短篇，展示牒针、失忆、押车兵和第一组选择。'],
            ['疫村医棚', '桑芷招募短篇或漫画，展示医者与牒针药引的冲突。'],
            ['龙王庙水闸', '互动分支，展示救城、追凶、队友方案和无名煞灭证。'],
            ['黄沙客栈', '盒子任务互动故事，展示查案、多阵营和密室假象。'],
            ['千佛无面窟', '图文短篇，展示照影局古老源头和断因判词。'],
            ['武籍大审', '审判互动分支，展示证据系统和第三章政治清算。'],
          ].map(([title, body]) => card({ label: '上线优先级', title, body })).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderStoryScene(scene) {
  return `
    <article class="scene-card">
      <span class="small-label">${escapeHTML(scene.id)}｜${escapeHTML(scene.chapter)}｜${escapeHTML(scene.quest)}｜${escapeHTML(scene.format)}</span>
      <h3>${escapeHTML(scene.title)}</h3>
      <p>${escapeHTML(scene.summary)}</p>
      ${tokenList(scene.choices)}
    </article>
  `;
}

function renderBranches() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Branches',
      title: '把选择、变量和回收直接展示出来',
      lead: '分支页兼作 galgame 路线说明、任务实现账本和 wiki 攻略底稿。它不把失败藏起来，而是显示失败如何转成更差、更暴力或更黑暗的后续局面。',
      image: 'assets/art/第三章-战斗-下城水道秘司暗门.jpg',
    })}
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('章节变量', '每个变量都要有首次写入和后续回收')}
        <div class="variable-stack">${branchVariableGroups.map(renderVariableGroup).join('')}</div>
      </div>
    </section>
    <section class="band quests-band">
      <div class="section-inner">
        ${sectionHeader('Galgame 节点样例', '场景、选项和变量写入')}
        <div class="page-card-grid">
          ${branchNodes.map((node) => card({ label: `${node.id}｜${node.quest}｜${node.scene}`, title: node.prompt, body: '选择后会写入变量，并跳转到后续剧情节点。', tokens: node.choices.flatMap((choice) => [choice.text, ...choice.sets]) })).join('')}
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('阵营声望与队友变量', '阵营、队友、无名煞分开记录')}
        <div class="page-card-grid">
          ${reputationScale.map(([value, meaning]) => card({ label: '阵营声望', title: value, body: meaning })).join('')}
          ${companionVariableRules.map((rule) => card({ label: '队友变量', title: rule.suffix, body: `${rule.values}｜${rule.note}` })).join('')}
          ${darkOriginVariables.map((variable) => card({ label: `${variable.type}｜${variable.values}`, title: variable.name, body: variable.note })).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderVariableGroup(group) {
  return `
    <article class="detail-panel">
      <span class="small-label">${escapeHTML(group.chapter)}</span>
      <h3>${escapeHTML(group.chapter)}变量账本</h3>
      <div class="variable-grid">
        ${group.variables
          .map(
            (variable) => `
              <div class="variable-row">
                <strong>${escapeHTML(variable.name)}</strong>
                <span>${escapeHTML(variable.type)}｜${escapeHTML(variable.values)}</span>
                <p>${escapeHTML(variable.firstWrite)} 写入，${escapeHTML(variable.recall)} 回收。${escapeHTML(variable.note)}</p>
              </div>
            `,
          )
          .join('')}
      </div>
    </article>
  `;
}

function renderCodex() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Codex',
      title: '图鉴把术语、物件和结局条件沉淀下来',
      lead: '这些条目后续可以拆成独立 wiki 页，也可以接入游戏内资料库。当前先以剧透等级和相关条目建立内容骨架。',
      image: 'assets/art/第二章-场景-千佛石窟古阵.jpg',
    })}
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('术语图鉴', '核心设定与剧透等级')}
        <div class="page-card-grid">
          ${codexEntries.map((entry) => card({ label: `${entry.category}｜spoiler:${entry.spoiler}`, title: entry.title, body: entry.summary, tokens: entry.related })).join('')}
        </div>
      </div>
    </section>
    <section class="band quests-band">
      <div class="section-inner">
        ${sectionHeader('世界结局', '母局归属决定天下走向')}
        <div class="ending-strip">${endings.map((ending) => `<span class="token">${escapeHTML(ending)}</span>`).join('')}</div>
      </div>
    </section>
  `;
}

function renderCharacters() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Characters',
      title: '人物页把队友、起源和关键 NPC 放在同一张关系网里',
      lead: '八名核心队友都是可战斗角色和起源角色候选；关键 NPC 则负责把阵营价值观、任务分支和第三章结局推到玩家面前。',
      image: 'assets/art/人物-核心队友阵容探索.jpg',
    })}
    <section class="band characters-band">
      <div class="section-inner">
        ${sectionHeader('八名核心队友', '起源角色候选')}
        <div class="companion-grid all-companions">
          ${companions.map((companion) => card({ label: companion.build, title: companion.name, body: `${companion.archetype}｜${companion.hook}` })).join('')}
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('第一章状态', '正式入队、临时协助和准队友分开处理')}
        <div class="page-card-grid">
          ${actOneCompanionStates.map((companion) => card({ label: companion.state, title: companion.name, body: `${companion.combat} ${companion.hook}`, tokens: [companion.gate] })).join('')}
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('关键 NPC', '阵营价值观的具象化')}
        <div class="page-card-grid">
          ${keyNpcs.map((npc) => card({ label: `${npc.id}｜${npc.faction}｜${npc.role}`, title: npc.name, body: `${npc.belief} 终局作用：${npc.finale}` })).join('')}
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('无名煞', '不是坏人按钮')}
        <div class="dark-origin">
          <span class="small-label">${escapeHTML(darkOrigin.label)}</span>
          <h3>${escapeHTML(darkOrigin.name)}</h3>
          <p>${escapeHTML(darkOrigin.premise)}</p>
          <div class="dark-choice-grid">
            ${darkOrigin.choices.map(([name, description]) => `<div class="dark-choice"><h3>${escapeHTML(name)}</h3><p>${escapeHTML(description)}</p></div>`).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCompanions() {
  renderCharacters();
}

function renderFactions() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Factions',
      title: '所有阵营都有理由，也都有阴影',
      lead: '阵营页面不只介绍设定，还要显示合作方式、背叛代价和后续回收。',
      image: 'assets/art/第三章-场景-官署审案堂与档案房.jpg',
    })}
    <section class="band factions-band">
      <div class="section-inner">
        ${sectionHeader('全局阵营', '三章长线势力')}
        <div class="faction-grid">${factions.map((faction) => card({ label: `${faction.id}｜${faction.figure}｜${faction.firstAppearance}`, title: faction.name, body: `${faction.motto} 价值：${faction.value}；阴影：${faction.shadow}` })).join('')}</div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('第一章阵营', '封境内的局部冲突')}
        <div class="page-card-grid">
          ${actOneFactions.map((faction) => card({ label: faction.publicNeed, title: faction.name, body: `${faction.hiddenNeed} 代价：${faction.cost}`, tokens: faction.play })).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderArt() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Art Direction',
      title: '4K 横版概念、场景与战斗展示',
      lead: '概念、场景、战斗展示统一为 3840x2160。人物形象、logo、阵营和 UI 资源按实际用途确定。',
      image: 'assets/art/第二章-主视觉-黄沙边关远景.jpg',
    })}
    <section class="band art-band">
      <div class="section-inner">
        ${sectionHeader('美术馆', '中文命名资源与筛选')}
        <div class="gallery-filters" id="gallery-filters" aria-label="艺术馆筛选"></div>
        <div class="gallery-grid" id="gallery-grid"></div>
      </div>
    </section>
  `;
  renderGallery();
}

function renderGallery(activeType = 'all') {
  const filters = [
    ['all', '全部'],
    ['concept', '概念'],
    ['scene', '场景'],
    ['combat', '战斗'],
    ['character', '人物'],
  ];
  const filtersRoot = document.querySelector('#gallery-filters');
  const grid = document.querySelector('#gallery-grid');
  if (!filtersRoot || !grid) return;

  filtersRoot.innerHTML = filters
    .map(([type, label]) => `<button class="filter-button" type="button" aria-pressed="${type === activeType}" data-gallery-filter="${type}">${label}</button>`)
    .join('');

  const items = activeType === 'all' ? gallery : gallery.filter((item) => item.type === activeType);
  grid.innerHTML = items
    .map(
      (item) => `
        <button class="gallery-item" type="button" data-gallery-src="${item.src}" data-gallery-title="${escapeHTML(item.title)}" data-gallery-mood="${escapeHTML(item.mood)}">
          <img src="${item.src}" alt="${escapeHTML(item.title)}">
          <span class="gallery-caption">
            <span class="small-label">${escapeHTML(item.chapter)}｜${escapeHTML(item.type)}</span>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.mood)}</p>
          </span>
        </button>
      `,
    )
    .join('');

  document.querySelectorAll('[data-gallery-filter]').forEach((button) => {
    button.addEventListener('click', () => renderGallery(button.dataset.galleryFilter));
  });
  document.querySelectorAll('[data-gallery-src]').forEach((button) => {
    button.addEventListener('click', () => openLightbox(button));
  });
}

function openLightbox(button) {
  const lightbox = document.querySelector('#lightbox');
  if (!lightbox) return;

  const image = document.querySelector('#lightbox-image');
  const caption = document.querySelector('#lightbox-caption');
  image.src = button.dataset.gallerySrc;
  image.alt = button.dataset.galleryTitle;
  caption.textContent = `${button.dataset.galleryTitle}｜${button.dataset.galleryMood}`;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.querySelector('#lightbox');
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

function bindGlobalEvents() {
  const currentPage = document.body.dataset.page;
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href')?.replace('./', '');
    const page = navPages.find((item) => item.href === href);
    if (page?.page === currentPage) link.setAttribute('aria-current', 'page');
  });

  document.querySelector('#lightbox-close')?.addEventListener('click', closeLightbox);
  document.querySelector('#lightbox')?.addEventListener('click', (event) => {
    if (event.target.id === 'lightbox') closeLightbox();
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });
}

const renderers = {
  home: renderHome,
  world: renderWorld,
  regions: renderRegions,
  factions: renderFactions,
  characters: renderCharacters,
  stories: renderStories,
  quests: renderQuests,
  branches: renderBranches,
  codex: renderCodex,
  systems: renderSystems,
  'story-act1': renderStoryActOne,
  companions: renderCompanions,
  art: renderArt,
};

bindGlobalEvents();
renderers[document.body.dataset.page || 'home']?.();
