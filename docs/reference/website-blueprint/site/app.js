import {
  actOneCompanionStates,
  actOneFactions,
  acts,
  classicRouteStory,
  codexEntries,
  companions,
  darkOrigin,
  disciplines,
  factions,
  gallery,
  inheritances,
  initialScript,
  keyNpcs,
  levelMilestones,
  navPages,
  productionStatus,
  regions,
  siteMeta,
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
  const storyLead = classicRouteStory.sections[0];
  root.innerHTML = `
    ${pageHero({
      kicker: siteMeta.kicker,
      title: '山水照影录',
      lead: siteMeta.summary,
      image: 'assets/art/art-assets/01-第一章-山水县境/00-章节地图/第一章-章节地图-山水县境封境总览.jpg',
      actions: [
        { href: './stories.html', label: '阅读明档线' },
        { href: './art.html', label: '浏览作品库' },
      ],
    })}
    <section class="band intro-band">
      <div class="section-inner">
        ${sectionHeader('Five Page Showcase', '站点只保留五个真实入口', '首页负责建立项目第一印象；世界、故事、系统、美术分别承载设定、长篇样章、玩法骨架和作品库。')}
        <div class="page-card-grid primary-entry-grid">
          ${navPages
            .filter((page) => page.page !== 'home')
            .map((page) => `<a class="info-card link-card" href="./${page.href}"><span class="small-label">${escapeHTML(page.href)}</span><h3>${escapeHTML(page.label)}</h3><p>${escapeHTML(pageSummary(page.page))}</p></a>`)
            .join('')}
        </div>
      </div>
    </section>
    <section class="band story-preview-band">
      <div class="section-inner feature-split">
        <figure class="wide-figure">
          <img src="${storyLead.image}" alt="${escapeHTML(storyLead.heading)}">
          <figcaption>${escapeHTML(storyLead.heading)}</figcaption>
        </figure>
        <div>
          ${sectionHeader('Story Feature', classicRouteStory.title, classicRouteStory.deck)}
          <p class="section-lead">${escapeHTML(firstParagraph(storyLead.body))}</p>
          <div class="hero-actions inline-actions"><a href="./stories.html">进入故事页</a></div>
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('Production Pillars', '内容、玩法、美术合在同一条展示线上')}
        <div class="pillar-grid">
          ${siteMeta.pillars.map((pillar, index) => `<div class="pillar"><span>0${index + 1}</span><h3>${escapeHTML(pillar)}</h3></div>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function pageSummary(page) {
  const summaries = {
    art: '完整 art-assets 作品库，按地图、地点、场景、战斗和人物筛选。',
    stories: '明档线长篇样章，展示第一章到公开改造结局的完整路线。',
    systems: '八大流派、九级构筑、术语图鉴和系统表达。',
    world: '三章地图、阵营、队友和核心制度危机整合展示。',
  };
  return summaries[page] ?? '内容页';
}

function renderWorld() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'World',
      title: '一根牒针牵出整座江湖',
      lead: '世界页不再拆成地区、阵营、人物子页，而是把三章地图、长线势力和队友群像放在同一套制度危机里阅读。',
      image: 'assets/art/art-assets/03-第三章-照影城/00-章节地图/第三章-章节地图-照影城下城总览.jpg',
      actions: [
        { href: './factions-characters.html', label: '帮派及人物' },
        { href: './stories.html', label: '看它如何进入故事' },
      ],
    })}
    <section class="band world-band">
      <div class="section-inner">
        ${sectionHeader('三章地图', '从封境到司命', '山水县境、槐安古道、照影城不是旧导航里的三个资料夹，而是同一套控制制度逐步显影的三层舞台。')}
        <div class="act-grid">${regions.map(renderRegionCard).join('')}</div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('长线势力', '所有阵营都有理由，也都有阴影')}
        <div class="faction-grid">${factions.map((faction) => card({ label: `${faction.figure}｜${faction.firstAppearance}`, title: faction.name, body: `${faction.motto} 价值：${faction.value}；阴影：${faction.shadow}` })).join('')}</div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner feature-split">
        <figure class="wide-figure">
          <img src="assets/art/art-assets/00-人物探索/人物-队伍概念-核心队友阵容.jpg" alt="队伍阵容探索">
          <figcaption>队友不是功能单位，而是用个人旧债提出不同终局方案。</figcaption>
        </figure>
        <div>
          ${sectionHeader('队友群像', '八名队友把玩法职责变成世界立场')}
          <div class="compact-list">
            ${companions.map((companion) => `<article><strong>${escapeHTML(companion.name)}</strong><span>${escapeHTML(companion.build)}｜${escapeHTML(companion.hook)}</span></article>`).join('')}
          </div>
          <div class="hero-actions inline-actions"><a href="./factions-characters.html">查看完整帮派及人物</a></div>
        </div>
      </div>
    </section>
  `;
}

function renderFactionsCharacters() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Factions & Characters',
      title: '帮派及人物',
      lead: '旧阵营页、人物页和队友页的内容合并到这个子页面。这里集中展示长线帮派、第一章局部势力、八名队友、关键 NPC 和特殊起源。',
      image: 'assets/art/art-assets/00-人物探索/人物-队伍概念-核心队友阵容.jpg',
      actions: [{ href: './world.html', label: '返回世界' }],
    })}
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('长线帮派', '八方势力都不是善恶标签', '每个帮派都有公开价值，也有会在终局反噬玩家的阴影。')}
        <div class="faction-grid">${factions.map(renderFactionCard).join('')}</div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('第一章局部势力', '封境里的小局就是整座江湖的预演')}
        <div class="page-card-grid">
          ${actOneFactions.map((faction) => card({ label: faction.publicNeed, title: faction.name, body: `${faction.hiddenNeed} 代价：${faction.cost}`, tokens: faction.play })).join('')}
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner feature-split">
        <figure class="wide-figure">
          <img src="assets/art/art-assets/00-人物探索/人物-队伍镜头-雨夜客栈.jpg" alt="雨夜客栈队伍镜头">
          <figcaption>队友线把构筑职责、个人旧债和终局方案绑在一起。</figcaption>
        </figure>
        <div>
          ${sectionHeader('队友', '八名可同行角色')}
          <div class="compact-list">
            ${companions.map((companion) => `<article><strong>${escapeHTML(companion.name)}</strong><span>${escapeHTML(companion.build)}｜${escapeHTML(companion.archetype)}｜${escapeHTML(companion.hook)}</span></article>`).join('')}
          </div>
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('第一章入队状态', '早期关系如何进入后续章节')}
        <div class="page-card-grid">
          ${actOneCompanionStates.map((companion) => card({ label: companion.state, title: companion.name, body: `${companion.combat} ${companion.hook}`, tokens: [companion.gate] })).join('')}
        </div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('关键 NPC', '长线冲突的代表人物')}
        <div class="page-card-grid">${keyNpcs.map((npc) => card({ label: `${npc.faction}｜${npc.role}`, title: npc.name, body: `${npc.belief} 终局：${npc.finale}` })).join('')}</div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner dark-origin">
        ${sectionHeader('特殊起源', darkOrigin.name, darkOrigin.premise)}
        <div class="dark-choice-grid">
          ${darkOrigin.choices.map(([title, body]) => `<article class="dark-choice"><h3>${escapeHTML(title)}</h3><p>${escapeHTML(body)}</p></article>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderFactionCard(faction) {
  return `
    <article class="faction-card">
      <span class="small-label">${escapeHTML(faction.id)}｜${escapeHTML(faction.firstAppearance)}</span>
      <h3>${escapeHTML(faction.name)}</h3>
      <p>${escapeHTML(faction.motto)}</p>
      ${tokenList([`代表：${faction.figure}`, `价值：${faction.value}`, `阴影：${faction.shadow}`])}
    </article>
  `;
}

function renderRegionCard(region) {
  return `
    <article class="act-card">
      <img src="${region.image}" alt="${escapeHTML(region.name)}">
      <div class="act-card-body">
        <span class="small-label">${escapeHTML(region.chapter)}｜${escapeHTML(region.id)}</span>
        <h3>${escapeHTML(region.name)}</h3>
        <p>${escapeHTML(region.summary)}</p>
        ${tokenList([region.visual, region.coreQuestion])}
      </div>
    </article>
  `;
}

function renderStories() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Classic Route Showcase',
      title: classicRouteStory.title,
      lead: classicRouteStory.deck,
      image: classicRouteStory.sections[0].image,
      actions: [
        { href: '#story-sections', label: '阅读正文' },
        { href: './initial-script.html', label: '查看初版构想' },
      ],
    })}
    <section class="band story-index-band">
      <div class="section-inner">
        ${sectionHeader('Route Index', '明档线章节')}
        <div class="story-index">
          ${classicRouteStory.sections.map((section, index) => `<a href="#${section.id}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHTML(section.heading.replace(/^\d+\.\s*/, ''))}</a>`).join('')}
        </div>
      </div>
    </section>
    <section class="band story-longform-band" id="story-sections">
      <div class="story-layout">
        ${classicRouteStory.sections.map(renderStorySection).join('')}
      </div>
    </section>
  `;
}

function renderStorySection(section, index) {
  return `
    <article class="story-section" id="${escapeHTML(section.id)}">
      <figure class="story-art">
        <img src="${escapeHTML(section.image)}" alt="${escapeHTML(section.heading)}" loading="lazy">
      </figure>
      <div class="story-copy">
        <span class="small-label">明档线 ${String(index + 1).padStart(2, '0')}</span>
        <h2>${escapeHTML(section.heading)}</h2>
        ${renderMarkdown(section.body)}
      </div>
    </article>
  `;
}

function renderInitialScript() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Original Concept',
      title: initialScript.title,
      lead: `${initialScript.subtitle}。${initialScript.deck}`,
      image: 'assets/art/art-assets/00-风格探索/世界基调/风格探索-边关驿站山口.png',
      actions: [{ href: './stories.html', label: '返回故事' }],
    })}
    <section class="band story-index-band">
      <div class="section-inner">
        ${sectionHeader('Concept Index', '最开始的构想目录', '这份初版剧本保留了项目早期的核心判断：BG3 式结构拖底、低魔武侠 CRPG、三幕推进、队友线和无名煞特殊主角。')}
        <div class="story-index">
          ${initialScript.sections.map((section, index) => `<a href="#${section.id}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHTML(section.heading)}</a>`).join('')}
        </div>
      </div>
    </section>
    <section class="band story-longform-band">
      <div class="story-layout initial-script-layout">
        ${initialScript.sections.map(renderInitialScriptSection).join('')}
      </div>
    </section>
  `;
}

function renderInitialScriptSection(section, index) {
  return `
    <article class="story-section initial-script-section" id="${escapeHTML(section.id)}">
      <div class="story-copy">
        <span class="small-label">初版构想 ${String(index + 1).padStart(2, '0')}</span>
        <h2>${escapeHTML(section.heading)}</h2>
        ${renderMarkdown(section.body)}
      </div>
    </article>
  `;
}

function renderMarkdown(markdown) {
  const blocks = [];
  const lines = markdown.split('\n');
  let paragraph = [];
  let table = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  }

  function flushTable() {
    if (!table.length) return;
    const rows = table
      .filter((line) => !/^\|\s*-+/.test(line))
      .map((line) => line.split('|').slice(1, -1).map((cell) => inlineMarkdown(cell.trim())));
    const [head, ...body] = rows;
    blocks.push(`
      <div class="story-table-wrap">
        <table class="story-table">
          <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join('')}</tr></thead>
          <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
    `);
    table = [];
  }

  for (const line of lines) {
    if (line.startsWith('|')) {
      flushParagraph();
      table.push(line);
      continue;
    }
    flushTable();

    if (!line.trim()) {
      flushParagraph();
      continue;
    }
    if (line.startsWith('> ')) {
      flushParagraph();
      blocks.push(`<blockquote>${inlineMarkdown(line.replace(/^> /, ''))}</blockquote>`);
      continue;
    }
    if (/^\*\*.+\*\*:?$/.test(line.trim())) {
      flushParagraph();
      blocks.push(`<p class="dialogue-speaker">${inlineMarkdown(line.replace(/:$/, ''))}</p>`);
      continue;
    }
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushTable();
  return blocks.join('');
}

function inlineMarkdown(value) {
  return escapeHTML(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function firstParagraph(markdown) {
  return markdown
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('|') && !line.startsWith('>') && !line.startsWith('**')) ?? '';
}

function renderSystems() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Systems',
      title: '八大流派支撑九级构筑',
      lead: '系统页合并旧系统页和图鉴页：先看构筑骨架，再看牒针、牒录、照影铃等术语如何进入玩法。',
      image: 'assets/art/art-assets/01-第一章-山水县境/04-战斗图/第一章-战斗-旧镖道林间伏击点.png',
    })}
    <section class="band systems-band">
      <div class="section-inner">
        ${sectionHeader('等级节奏', '九级构筑与传承立身')}
        <div class="timeline-grid">${levelMilestones.map((item) => `<article class="level-item"><strong>${item.level}</strong><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.reward)}</p></article>`).join('')}</div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('八大流派', '能力领域不是固定职业')}
        <div class="page-card-grid">${disciplines.map((discipline) => card({ label: discipline.resource, title: discipline.name, body: `${discipline.role}。${discipline.tone}`, tokens: inheritances.filter((item) => item.discipline === discipline.name).map((item) => item.name) })).join('')}</div>
      </div>
    </section>
    <section class="band">
      <div class="section-inner">
        ${sectionHeader('术语图鉴', '制度危机的可玩对象')}
        <div class="page-card-grid">${codexEntries.map((entry) => card({ label: `${entry.category}｜${entry.spoiler}`, title: entry.title, body: entry.summary, tokens: entry.related })).join('')}</div>
      </div>
    </section>
  `;
}

function renderArt() {
  const counts = gallery.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + 1;
    return acc;
  }, {});
  const summaryTypes = ['map', 'key-art', 'location', 'scene', 'combat', 'character', 'reference'];

  root.innerHTML = `
    ${pageHero({
      kicker: 'Art Direction',
      title: 'art-assets 作品库',
      lead: '章节地图、主视觉、地点概念、场景、战斗、人物探索和风格参考统一挂入站点。故事页使用这些作品建立章节气氛，美术页负责完整浏览。',
      image: 'assets/art/art-assets/02-第二章-槐安古道/00-章节地图/第二章-章节地图-槐安古道黄沙边关总览.jpg',
    })}
    <section class="band art-overview-band">
      <div class="section-inner">
        ${sectionHeader('Library Summary', '按资源库口径浏览')}
        <div class="art-summary-grid">
          ${summaryTypes
            .filter((type) => counts[type])
            .map((type) => `<article class="art-summary-item"><strong>${counts[type]}</strong><span>${escapeHTML(galleryTypeLabel(type))}</span></article>`)
            .join('')}
        </div>
      </div>
    </section>
    <section class="band art-band">
      <div class="section-inner">
        ${sectionHeader('Gallery', '筛选作品')}
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
    ['map', '地图'],
    ['key-art', '主视觉'],
    ['location', '地点'],
    ['scene', '场景'],
    ['combat', '战斗'],
    ['character', '人物'],
    ['reference', '参考'],
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
        <button class="gallery-item" type="button" data-gallery-src="${escapeHTML(item.src)}" data-gallery-title="${escapeHTML(item.title)}" data-gallery-mood="${escapeHTML(item.mood)}">
          <img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.title)}" loading="lazy">
          <span class="gallery-caption">
            <span class="small-label">${escapeHTML(item.chapter)}｜${escapeHTML(galleryTypeLabel(item.type))}</span>
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

function galleryTypeLabel(type) {
  const labels = {
    map: '章节地图',
    'key-art': '章节主视觉',
    location: '地点概念',
    scene: '场景图',
    combat: '战斗图',
    character: '人物探索',
    reference: '风格参考',
  };
  return labels[type] ?? type;
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
  art: renderArt,
  'factions-characters': renderFactionsCharacters,
  home: renderHome,
  'initial-script': renderInitialScript,
  stories: renderStories,
  systems: renderSystems,
  world: renderWorld,
};

bindGlobalEvents();
renderers[document.body.dataset.page || 'home']?.();
