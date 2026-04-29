import { nextCarouselIndex } from './carousel.js';
import { data } from './data/generated-data.js';

const root = document.querySelector('#page-root');
const page = document.body.dataset.page ?? 'home';

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return entities[char];
  });
}

function sectionIntro(kicker, title, deck = '') {
  return `
    <div class="section-intro">
      <p class="eyebrow">${escapeHTML(kicker)}</p>
      <h2>${escapeHTML(title)}</h2>
      ${deck ? `<p>${escapeHTML(deck)}</p>` : ''}
    </div>
  `;
}

function mediaButton(item, className = 'media-card') {
  return `
    <button class="${className}" type="button" data-media-src="${escapeHTML(item.previewPath ?? item.image)}" data-media-title="${escapeHTML(item.title)}" data-media-subtitle="${escapeHTML(item.deck ?? item.sourcePath ?? '')}">
      <img src="${escapeHTML(item.thumbPath ?? item.image)}" alt="${escapeHTML(item.title)}" loading="lazy">
      <span>
        ${item.label ? `<small>${escapeHTML(item.label)}</small>` : ''}
        <strong>${escapeHTML(item.title)}</strong>
      </span>
    </button>
  `;
}

function pageHero({ kicker, title, deck, image }) {
  return `
    <section class="page-hero">
      <img src="${escapeHTML(image)}" alt="">
      <div class="page-hero-shade"></div>
      <div class="page-hero-copy">
        <p class="eyebrow">${escapeHTML(kicker)}</p>
        <h1>${escapeHTML(title)}</h1>
        <p>${escapeHTML(deck)}</p>
      </div>
    </section>
  `;
}

function renderHome() {
  const slides = data.featuredSlides;
  const first = slides[0];
  root.innerHTML = `
    <section class="universe-carousel" aria-label="精选人物设定卡">
      <div class="side-preview side-preview-left"><img src="${escapeHTML(slides.at(-1).image)}" alt=""></div>
      <div class="hero-frame">
        <img class="hero-frame-image" src="${escapeHTML(first.image)}" alt="${escapeHTML(first.title)}">
        <button class="carousel-arrow carousel-prev" type="button" aria-label="上一张"><span class="carousel-arrow-mark" aria-hidden="true">‹</span></button>
        <button class="carousel-arrow carousel-next" type="button" aria-label="下一张"><span class="carousel-arrow-mark" aria-hidden="true">›</span></button>
      </div>
      <div class="side-preview side-preview-right"><img src="${escapeHTML(slides[1]?.image ?? first.image)}" alt=""></div>
      <article class="hero-plaque">
        <span class="plaque-emblem">◆</span>
        <p class="plaque-kicker">${escapeHTML(first.kicker)}</p>
        <h1>${escapeHTML(first.title)}</h1>
        <p>${escapeHTML(first.subtitle)}</p>
      </article>
      <div class="carousel-dots" aria-label="精选人物设定卡轮播位置">
        ${slides.map((slide, slideIndex) => `
          <button type="button" data-carousel-jump="${slideIndex}" aria-label="跳到 ${escapeHTML(slide.title)}" aria-pressed="${slideIndex === 0}"></button>
        `).join('')}
      </div>
    </section>
    <section class="band latest-band">
      ${sectionIntro('Latest', '最新内容更新', '人物设定卡、章节图、故事样章和构筑设定会在这里汇合。')}
      <div class="latest-grid">
        ${data.latestItems.map((item) => `
          <a class="latest-item" href="${escapeHTML(item.href)}">
            <img src="${escapeHTML(item.image)}" alt="">
            <span>${escapeHTML(item.label)}</span>
            <strong>${escapeHTML(item.title)}</strong>
            <p>${escapeHTML(item.deck)}</p>
          </a>
        `).join('')}
      </div>
    </section>
    <section class="band featured-gallery">
      ${sectionIntro('Selected Art', '章节精选图', '首页优先展示章节主视觉、地图和关键场景，让世界先站起来。')}
      <div class="featured-grid">
        ${data.featuredImages.slice(0, 9).map((item) => mediaButton(item)).join('')}
      </div>
    </section>
  `;
  bindCarousel();
  bindMediaButtons();
}

function bindCarousel() {
  const slides = data.featuredSlides;
  let index = 0;
  const image = document.querySelector('.hero-frame-image');
  const plaque = document.querySelector('.hero-plaque');
  const left = document.querySelector('.side-preview-left img');
  const right = document.querySelector('.side-preview-right img');
  const dots = [...document.querySelectorAll('[data-carousel-jump]')];

  function setIndex(nextIndex) {
    index = nextCarouselIndex(nextIndex, 0, slides.length);
    update();
  }

  function update() {
    const current = slides[index];
    const prev = slides[nextCarouselIndex(index, -1, slides.length)];
    const next = slides[nextCarouselIndex(index, 1, slides.length)];
    image.src = current.image;
    image.alt = current.title;
    left.src = prev.image;
    right.src = next.image;
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute('aria-pressed', String(dotIndex === index));
    });
    plaque.innerHTML = `
      <span class="plaque-emblem">◆</span>
      <p class="plaque-kicker">${escapeHTML(current.kicker)}</p>
      <h1>${escapeHTML(current.title)}</h1>
      <p>${escapeHTML(current.subtitle)}</p>
    `;
  }

  document.querySelector('.carousel-prev')?.addEventListener('click', () => {
    setIndex(index - 1);
  });
  document.querySelector('.carousel-next')?.addEventListener('click', () => {
    setIndex(index + 1);
  });
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      setIndex(Number(dot.dataset.carouselJump));
    });
  });
}

function renderSetting() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Systems',
      title: '八大流派支撑九级构筑',
      deck: 'GameW 的人物不是职业标签，而是从主修、旁修和传承里长出的江湖打法。',
      image: data.teamShots[0].previewPath,
    })}
    <section class="band">
      <div class="max">
        <div class="system-quote">
          <span aria-hidden="true"></span>
          <p>${escapeHTML(data.settingTagline)}</p>
          <span aria-hidden="true"></span>
        </div>
        <div class="discipline-spectrum">
          ${data.disciplines.map((discipline, index) => `
            <article class="discipline-node">
              <span class="discipline-rune">${String(index + 1).padStart(2, '0')}</span>
              <div class="discipline-content">
                <h3>${escapeHTML(discipline.name)}</h3>
                <dl>
                  <div>
                    <dt>要素</dt>
                    <dd>${escapeHTML(discipline.elements)}</dd>
                  </div>
                  <div>
                    <dt>代表能力</dt>
                    <dd>${escapeHTML(discipline.representativeAbility)}</dd>
                  </div>
                </dl>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
    <section class="band rules-band">
      ${sectionIntro('Build Rules', '九级构筑与旁修边界')}
      <div class="rule-list">
        ${data.levelRules.map((rule, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><p>${escapeHTML(rule)}</p></article>`).join('')}
      </div>
      <div class="side-cultivation-grid" aria-label="旁修成长阶段">
        ${data.sideCultivationRules.map((rule) => `
          <article class="side-cultivation-card">
            <span>${escapeHTML(rule.level)}</span>
            <strong>${escapeHTML(rule.name)}</strong>
            <p>${escapeHTML(rule.summary)}</p>
          </article>
        `).join('')}
      </div>
    </section>
    <section class="band team-shot-band">
      ${sectionIntro('Party Lens', '小队冒险与构筑落地', '三张队伍镜头负责把规则重新拉回人物、站位和旅途。')}
      <div class="team-shot-grid">
        ${data.teamShots.map((shot) => mediaButton(shot, 'team-shot')).join('')}
      </div>
    </section>
  `;
  bindMediaButtons();
}

function warriorOrderValue(warrior) {
  return warrior.generatedAtEpoch || Number(warrior.id?.replace(/^F-/, '') ?? 0);
}

function renderWarriors(active = '全部', sort = 'asc') {
  const filters = ['全部', ...data.disciplines.map((discipline) => discipline.name)];
  const warriors = (active === '全部' ? data.warriors : data.warriors.filter((warrior) => warrior.mainDiscipline === active))
    .toSorted((left, right) => {
      const direction = sort === 'desc' ? -1 : 1;
      const orderDiff = warriorOrderValue(left) - warriorOrderValue(right);
      if (orderDiff !== 0) return orderDiff * direction;
      return left.id.localeCompare(right.id, 'zh-Hans-CN') * direction;
    });
  root.innerHTML = `
    ${pageHero({
      kicker: 'Warriors',
      title: '武人设定卡',
      deck: '只展示已经入库的官网人物设定版，按主修分类阅读构筑、定位和角色幻想。',
      image: data.featuredSlides[0].image,
    })}
    <section class="band warrior-band">
      <div class="warrior-controls">
        <div class="warrior-control-bar">
          <div class="filter-row" aria-label="主修筛选">
            ${filters.map((filter) => `<button type="button" class="filter-button" data-warrior-filter="${escapeHTML(filter)}" aria-pressed="${filter === active}">${escapeHTML(filter)}</button>`).join('')}
          </div>
          <div class="sort-toggle" aria-label="排序">
            <button type="button" data-warrior-sort="asc" aria-pressed="${sort === 'asc'}"><span>正序</span></button>
            <button type="button" data-warrior-sort="desc" aria-pressed="${sort === 'desc'}"><span>倒序</span></button>
          </div>
        </div>
      </div>
      <div class="warrior-grid">
        ${warriors.map((warrior) => `
          <button class="warrior-card" type="button" data-media-src="${escapeHTML(warrior.previewPath)}" data-media-title="${escapeHTML(warrior.title)}" data-media-subtitle="${escapeHTML(`${warrior.build}｜${warrior.role}｜${warrior.coreFantasy}`)}">
            <img src="${escapeHTML(warrior.thumbPath)}" alt="${escapeHTML(warrior.title)}" loading="lazy">
            <span>${escapeHTML(warrior.mainDiscipline)} / ${escapeHTML(warrior.build)}</span>
            <strong>${escapeHTML(warrior.name)}</strong>
            <p>${escapeHTML(warrior.role)}</p>
            <small>${escapeHTML(warrior.coreFantasy)}</small>
          </button>
        `).join('')}
      </div>
    </section>
  `;
  document.querySelectorAll('[data-warrior-filter]').forEach((button) => {
    button.addEventListener('click', () => renderWarriors(button.dataset.warriorFilter, sort));
  });
  document.querySelectorAll('[data-warrior-sort]').forEach((button) => {
    button.addEventListener('click', () => renderWarriors(active, button.dataset.warriorSort));
  });
  bindMediaButtons();
}

function renderChapters(activeChapter = 'act1', activeType = '全部') {
  const types = ['全部', '章节地图', '章节主视觉', '地点概念', '场景图', '战斗图', '任务与副本图', '高质量参考'];
  const chapter = data.chapters.find((item) => item.key === activeChapter) ?? data.chapters[0];
  const images = data.chapterImages.filter((image) => image.chapterKey === chapter.key && (activeType === '全部' || image.type === activeType));
  root.innerHTML = `
    ${pageHero({
      kicker: 'Chapters',
      title: '图像档案',
      deck: '章节页承接全量成熟章节图片：先读章级问题，再按图片类型浏览。',
      image: chapter.heroImage,
    })}
    <section class="band chapter-overview">
      <div class="chapter-tabs">
        ${data.chapters.map((item) => `<button type="button" data-chapter="${item.key}" aria-pressed="${item.key === chapter.key}">${escapeHTML(item.name)}</button>`).join('')}
      </div>
      <article class="chapter-brief">
        <img src="${escapeHTML(chapter.heroImage)}" alt="">
        <div>
          <p class="eyebrow">${escapeHTML(chapter.region)}</p>
          <h2>${escapeHTML(chapter.name)}</h2>
          <strong>${escapeHTML(chapter.question)}</strong>
          <p>${escapeHTML(chapter.summary)}</p>
          <div class="location-ribbon">${chapter.locations.map((location) => `<span>${escapeHTML(location)}</span>`).join('')}</div>
        </div>
      </article>
    </section>
    <section class="band">
      <div class="filter-row">
        ${types.map((type) => `<button type="button" data-chapter-type="${escapeHTML(type)}" aria-pressed="${type === activeType}">${escapeHTML(type)}</button>`).join('')}
      </div>
      <div class="chapter-image-grid">
        ${images.map((image) => `
          <button class="chapter-image-card" type="button" data-media-src="${escapeHTML(image.previewPath)}" data-media-title="${escapeHTML(image.title)}" data-media-subtitle="${escapeHTML(`${image.type}｜${image.sourcePath}`)}">
            <img src="${escapeHTML(image.thumbPath)}" alt="${escapeHTML(image.title)}" loading="lazy">
            <span>${escapeHTML(image.type)}</span>
            <strong>${escapeHTML(image.title)}</strong>
          </button>
        `).join('')}
      </div>
    </section>
  `;
  document.querySelectorAll('[data-chapter]').forEach((button) => {
    button.addEventListener('click', () => renderChapters(button.dataset.chapter, '全部'));
  });
  document.querySelectorAll('[data-chapter-type]').forEach((button) => {
    button.addEventListener('click', () => renderChapters(chapter.key, button.dataset.chapterType));
  });
  bindMediaButtons();
}

function renderFactions() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Powers',
      title: '六方主势力与地方行动者',
      deck: '帮派页不把所有势力拉平成投靠列表；政治主轴、寄生暗线、中间势力和地方压力各有位置。',
      image: data.chapters[2].heroImage,
    })}
    <section class="band">
      ${sectionIntro('Primary Powers', '六方主势力')}
      <div class="faction-grid">
        ${data.primaryFactions.map((faction) => factionCard(faction)).join('')}
      </div>
    </section>
    <section class="band local-power-band">
      ${sectionIntro('Local Powers', '地方势力', '山神寨与边地部族进入官网展示，但不升级为独立政治终点。')}
      <div class="faction-grid local">
        ${data.localFactions.map((faction) => factionCard(faction)).join('')}
      </div>
    </section>
  `;
}

function factionCard(faction) {
  return `
    <article class="faction-card">
      <span>${escapeHTML(faction.type)}</span>
      <h2>${escapeHTML(faction.name)}</h2>
      <p class="figure">${escapeHTML(faction.figure)}</p>
      <p>${escapeHTML(faction.promise)}</p>
      <strong>${escapeHTML(faction.shadow)}</strong>
    </article>
  `;
}

function renderStories() {
  root.innerHTML = `
    ${pageHero({
      kicker: 'Stories',
      title: data.story.title,
      deck: data.story.deck,
      image: data.chapters[0].heroImage,
    })}
    <section class="band story-band">
      <aside class="story-index">
        ${data.story.sections.map((section, index) => `<a href="#${section.id}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHTML(section.heading.replace(/^\d+\.\s*/, ''))}</a>`).join('')}
      </aside>
      <div class="story-flow">
        ${data.story.sections.map((section, index) => `
          <article id="${escapeHTML(section.id)}" class="story-section">
            <span>明档线 ${String(index + 1).padStart(2, '0')}</span>
            <h2>${escapeHTML(section.heading)}</h2>
            ${renderMarkdown(section.body)}
          </article>
        `).join('')}
      </div>
    </section>
    <section class="band story-future">
      ${sectionIntro('Future Shelf', '后续故事形态', '这里预留小说、漫画和互动故事入口，首版先让明档线可读。')}
      <div class="future-grid">
        <article><h3>小说</h3><p>围绕主线流程和队友视角扩展。</p></article>
        <article><h3>漫画</h3><p>适合承载关键战斗、会面和转折。</p></article>
        <article><h3>互动故事</h3><p>保留分支选择和变量回收的空间。</p></article>
      </div>
    </section>
  `;
}

function renderMarkdown(markdown) {
  const blocks = [];
  const lines = markdown.split('\n');
  let paragraph = [];
  let table = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push(`<p>${escapeHTML(paragraph.join(' '))}</p>`);
    paragraph = [];
  }

  function flushTable() {
    if (!table.length) return;
    const rows = table
      .filter((line) => !/^\|\s*-+/.test(line))
      .map((line) => line.split('|').slice(1, -1).map((cell) => escapeHTML(cell.trim())));
    const [head, ...body] = rows;
    blocks.push(`
      <div class="table-wrap"><table>
        <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join('')}</tr></thead>
        <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>
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
      blocks.push(`<blockquote>${escapeHTML(line.replace(/^> /, ''))}</blockquote>`);
      continue;
    }
    paragraph.push(line.trim());
  }
  flushParagraph();
  flushTable();
  return blocks.join('');
}

function bindMediaButtons() {
  document.querySelectorAll('[data-media-src]').forEach((button) => {
    button.addEventListener('click', () => openDialog(button.dataset.mediaSrc, button.dataset.mediaTitle, button.dataset.mediaSubtitle));
  });
}

function openDialog(src, title, subtitle) {
  const dialog = document.querySelector('#media-dialog');
  const image = document.querySelector('#dialog-image');
  const caption = document.querySelector('#dialog-caption');
  if (!dialog || !image || !caption) return;
  image.src = src;
  image.alt = title;
  caption.innerHTML = `<strong>${escapeHTML(title)}</strong>${subtitle ? `<p>${escapeHTML(subtitle)}</p>` : ''}`;
  dialog.showModal();
}

function bindDialog() {
  const dialog = document.querySelector('#media-dialog');
  document.querySelector('.dialog-close')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

const renderers = {
  chapters: () => renderChapters(),
  factions: renderFactions,
  home: renderHome,
  setting: renderSetting,
  stories: renderStories,
  warriors: () => renderWarriors(),
};

bindDialog();
renderers[page]?.();
