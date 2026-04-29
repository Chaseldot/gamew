import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(__dirname, '..');
const repoRoot = resolve(siteRoot, '../..');
const assetsRoot = resolve(repoRoot, 'assets');
const distRoot = resolve(siteRoot, 'dist');
const srcRoot = resolve(siteRoot, 'src');

const pages = [
  { file: 'index.html', key: 'home', label: '首页', en: 'Featured' },
  { file: 'setting.html', key: 'setting', label: '设定', en: 'Systems' },
  { file: 'warriors.html', key: 'warriors', label: '武人', en: 'Warriors' },
  { file: 'chapters.html', key: 'chapters', label: '章节', en: 'Chapters' },
  { file: 'factions.html', key: 'factions', label: '帮派', en: 'Powers' },
  { file: 'stories.html', key: 'stories', label: '故事', en: 'Stories' },
];

const disciplines = [
  { name: '游锋', phrase: '应变于招', role: '近身兵刃、读招、游斗', elements: '近身兵刃、读招、游斗', representativeAbility: '应变、招式与反制', color: '#d59a4b' },
  { name: '破军', phrase: '承压于线', role: '阵线、冲阵、护卫、重压', elements: '阵线、冲阵、护卫、重压', representativeAbility: '承压、阵线与推进', color: '#b86848' },
  { name: '拳掌', phrase: '制衡于身', role: '贴身制身、擒拿、身体破绽', elements: '贴身制身、擒拿、身体破绽', representativeAbility: '控制、身体与行动', color: '#c5a15f' },
  { name: '射艺', phrase: '制距于远', role: '投射、射线、标记、追击', elements: '投射、射线、标记、追击', representativeAbility: '制距、距离与射线', color: '#8fa65a' },
  { name: '影踪', phrase: '通隐于见', role: '藏形、潜入、暗袭、脱战', elements: '藏形、潜入、暗袭、脱战', representativeAbility: '通隐、视线与敏捷', color: '#7a8fae' },
  { name: '药师', phrase: '调命于伤病', role: '医毒、药性、救急、侵蚀', elements: '医毒、药性、救急、侵蚀', representativeAbility: '药性、伤病与调命', color: '#86a57d' },
  { name: '音律', phrase: '调心于节奏', role: '节奏、鼓舞、稳心、扰拍', elements: '节奏、鼓舞、稳心、扰拍', representativeAbility: '控场、节奏与意志', color: '#9b83b7' },
  { name: '奇门', phrase: '改局于场域', role: '布局、阵法、机关、符禁', elements: '布局、阵法、机关、符禁', representativeAbility: '创意、场域与规则', color: '#6ea39a' },
];

const settingTagline = '游锋应变于招，破军承压于线，拳掌制衡于身，射艺制距于远，影踪通隐于见，药师调命于伤病，音律调心于节奏，奇门改局于场域。';

const levelRules = [
  '等级上限为 9 级，1-3 级必须投入主修。',
  '主修 3 级选择传承，传承决定流派内部的成长路线。',
  '4-9 级可继续主修，也可旁修；满级主修不得低于 6 级。',
  '最多旁修 2 个流派，单个旁修最高 3 级。',
  '旁修只获得低阶接入，不获得另一套完整主身份。',
];

const sideCultivationRules = [
  { level: '旁修 1', name: '入门', summary: '获得该流派基础技能包，并接入流派初级技池。' },
  { level: '旁修 2', name: '大成', summary: '继续拓宽初级 / 中级技池，形成稳定副手段。' },
  { level: '旁修 3', name: '通达', summary: '达到单旁修上限，只通达流派中级接口，不取得高级技或传承身份。' },
];

const chapters = [
  {
    key: 'act1',
    name: '第一章《封境》',
    region: '山水县境',
    question: '局部崩坏时，谁有权决定牺牲？',
    summary: '封闭县境里的牺牲实验。玩家从清河渡醒来，以为自己只是在查疫、求生和离境，最后发现县境灾变被照影局写成筛选样本。',
    locations: ['清河渡', '山水县城', '疫村', '山神寨', '旧镖道', '废书院', '清河黑市', '龙王庙水闸'],
  },
  {
    key: 'act2',
    name: '第二章《黄沙照影》',
    region: '槐安古道',
    question: '真相出现后，谁有权解释真相？',
    summary: '开放证据网。玩家带着证人与牒钥进入古道，在客栈、书院、鬼市、百工坞和盟会之间决定真相归属。',
    locations: ['龙门驿', '黄沙客栈', '镜湖书院', '百工坞', '鬼市', '千佛石窟', '武林盟会', '照影楼坞'],
  },
  {
    key: 'act3',
    name: '第三章《司命》',
    region: '照影城',
    question: '掌握母局后，谁有权书写未来？',
    summary: '反应式城市沙盒。前两章的证据、债务、身份和队友选择进入照影城，最终指向三钥、大审与母局裁决。',
    locations: ['九门', '外郭', '下坊', '水巷', '武籍区', '官署', '慈心总馆', '百工坊', '皇城外朝', '摘星楼', '断因房', '地下照影母局'],
  },
];

const primaryFactions = [
  { name: '缉武司', type: '公开政治轴', figure: '裴照 / 沈照微', promise: '公开律法、武人入册、封境救灾和可追责审案。', shadow: '风险治理扩大后，会把可能作乱提前写成准罪名。' },
  { name: '同尘盟', type: '公开政治轴', figure: '楚横山 / 陆行舟', promise: '江湖自治、护乡护路、证人保护和民间动员。', shadow: '复仇和清算可能压倒证据程序，制造新的沉默。' },
  { name: '照影局', type: '寄生暗线', figure: '白微尘 / 司命', promise: '预测灾祸、提前处置、用母局权限维持所谓大局。', shadow: '把人压缩成档案和风险概率，提前裁决武人命运。' },
  { name: '慈心医脉', type: '关键中间势力', figure: '桑芷 / 阮清辞', promise: '救治宿主、识别药性、保留治疗权。', shadow: '治疗接口也可能成为暗植种针的伪装。' },
  { name: '百工坞', type: '关键中间势力', figure: '唐小砚 / 唐叙白', promise: '机关图、阵钥、铃阵反制和母局改造可能。', shadow: '技术中立会让控制系统变得可执行。' },
  { name: '鬼市', type: '关键中间势力', figure: '任无踪 / 阎三更', promise: '身份、证词、牒录交易、地下入口和无路者藏身处。', shadow: '真相、人命和身份都可能被拍卖或反卖。' },
];

const localFactions = [
  { name: '山神寨', type: '地方势力', figure: '楚横山', promise: '收留山民、逃亡武人和官道不容之人。', shadow: '路税、走私、藏匿重犯与侠义混在一起。' },
  { name: '边地部族', type: '地方势力', figure: '霍青鸢', promise: '保护族人不被边军、江湖和武籍系统吞没。', shadow: '夹在商路、边军、缉武司和江湖旧怨之间求生。' },
];

const selectedHeroIds = ['F-178', 'F-228', 'F-004', 'F-117', 'F-164', 'F-125', 'F-183', 'F-203', 'F-144', 'F-196', 'F-157', 'F-229'];

function toPosix(path) {
  return path.split('\\').join('/');
}

function repoRelative(absPath) {
  return toPosix(relative(repoRoot, absPath));
}

function hashPath(value) {
  return createHash('sha1').update(value).digest('hex').slice(0, 12);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return entities[char];
  });
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function isImage(filePath) {
  return /\.(png|jpe?g|webp)$/i.test(filePath);
}

function cleanTitle(filePath) {
  return basename(filePath, extname(filePath))
    .replace(/^F-\d+-/, '')
    .replace(/-GameW风格(?:-v\d+)?$/, '')
    .replace(/^人物-队伍镜头-/, '')
    .replace(/^人物-剧情过场-/, '')
    .replace(/^第一章-/, '')
    .replace(/^第二章-/, '')
    .replace(/^第三章-/, '');
}

function imageTypeFromPath(filePath) {
  const parts = repoRelative(filePath).split('/');
  const dir = parts.at(-2) ?? '';
  const map = {
    '00-章节地图': '章节地图',
    '01-章节主视觉': '章节主视觉',
    '02-地点概念图': '地点概念',
    '03-场景图': '场景图',
    '04-战斗图': '战斗图',
    '05-任务与副本图': '任务与副本图',
    '99-高质量参考': '高质量参考',
  };
  return map[dir] ?? '章节图';
}

function chapterKeyFromPath(filePath) {
  const rel = repoRelative(filePath);
  if (rel.startsWith('assets/01-')) return 'act1';
  if (rel.startsWith('assets/02-')) return 'act2';
  if (rel.startsWith('assets/03-')) return 'act3';
  return 'unknown';
}

function parseMarkdownTable(markdown) {
  const rows = [];
  for (const line of markdown.split('\n')) {
    if (!line.startsWith('|')) continue;
    if (/^\|\s*-+/.test(line)) continue;
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    if (cells.length >= 6 && /^F-\d+/.test(cells[0])) rows.push(cells);
  }
  return rows;
}

async function loadArchetypes() {
  const markdown = await readFile(resolve(repoRoot, 'character-production/wuxia-character-archetypes.md'), 'utf8');
  const rows = parseMarkdownTable(markdown);
  const byId = new Map();
  for (const [id, name, build, role, coreFantasy, classicScene] of rows) {
    byId.set(id, { id, name, build, role, coreFantasy, classicScene });
  }
  return byId;
}

function mainDiscipline(build) {
  const match = build.match(/\d+([\u3400-\u9fff]+)/);
  return match?.[1] ?? '未分类';
}

function generationTimestamp(record) {
  const value = record?.created_at ?? record?.updated_at ?? '';
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

async function loadGenerationRecords() {
  const jsonlPath = resolve(assetsRoot, '00-人物/04-人物设定版/generation-records.jsonl');
  const byAssetPath = new Map();
  const byId = new Map();
  const content = await readFile(jsonlPath, 'utf8');

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let record;
    try {
      record = JSON.parse(trimmed);
    } catch {
      continue;
    }

    const timestamp = generationTimestamp(record);
    const normalized = {
      id: record.id,
      assetPath: record.asset_path,
      generatedAt: record.created_at ?? record.updated_at ?? null,
      generatedAtEpoch: timestamp,
    };

    if (normalized.assetPath) byAssetPath.set(normalized.assetPath, normalized);
    if (normalized.id) {
      const current = byId.get(normalized.id);
      if (!current || normalized.generatedAtEpoch > current.generatedAtEpoch) byId.set(normalized.id, normalized);
    }
  }

  return { byAssetPath, byId };
}

async function mediaVariant(sourceAbs, kind, label, maxSize) {
  const rel = repoRelative(sourceAbs);
  const outRel = `assets/media/${kind}/${hashPath(`${label}:${rel}`)}-${label}.jpg`;
  const outAbs = resolve(distRoot, outRel);
  await mkdir(dirname(outAbs), { recursive: true });
  try {
    const [sourceInfo, outputInfo] = await Promise.all([stat(sourceAbs), stat(outAbs)]);
    if (outputInfo.mtimeMs >= sourceInfo.mtimeMs) return outRel;
  } catch {
    // Missing or unreadable cached media is regenerated below.
  }
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '78', '-Z', String(maxSize), sourceAbs, '--out', outAbs], {
    stdio: 'ignore',
  });
  return outRel;
}

async function makeMedia(sourceAbs, kind) {
  return {
    previewPath: await mediaVariant(sourceAbs, kind, 'preview', 1600),
    thumbPath: await mediaVariant(sourceAbs, kind, 'thumb', 520),
  };
}

function sheetVariantRank(file) {
  return Number(basename(file).match(/-v(\d+)\.[^.]+$/i)?.[1] ?? 1);
}

function officialSheetId(file) {
  return basename(file).match(/^(F-\d+)/)?.[1];
}

function preferOfficialSheet(candidate, current) {
  if (!current) return candidate;
  const rankDiff = sheetVariantRank(candidate) - sheetVariantRank(current);
  if (rankDiff !== 0) return rankDiff > 0 ? candidate : current;
  return repoRelative(candidate).localeCompare(repoRelative(current), 'zh-Hans-CN') < 0 ? candidate : current;
}

function dedupeOfficialSheets(files) {
  const byId = new Map();
  for (const file of files) {
    const id = officialSheetId(file);
    if (!id) continue;
    byId.set(id, preferOfficialSheet(file, byId.get(id)));
  }
  return [...byId.values()].sort((a, b) => repoRelative(a).localeCompare(repoRelative(b), 'zh-Hans-CN'));
}

async function buildWarriors() {
  const archetypes = await loadArchetypes();
  const generationRecords = await loadGenerationRecords();
  const sheetDir = resolve(assetsRoot, '00-人物/04-人物设定版');
  const files = (await walk(sheetDir))
    .filter(isImage)
    .filter((file) => !repoRelative(file).includes('/废案/'))
    .sort((a, b) => repoRelative(a).localeCompare(repoRelative(b), 'zh-Hans-CN'));
  const warriors = [];

  for (const file of dedupeOfficialSheets(files)) {
    const id = officialSheetId(file);
    if (!id) continue;
    const archetype = archetypes.get(id);
    if (!archetype) continue;
    const media = await makeMedia(file, 'warriors');
    const sourcePath = repoRelative(file);
    const generationRecord = generationRecords.byAssetPath.get(sourcePath) ?? generationRecords.byId.get(id);
    warriors.push({
      ...archetype,
      mainDiscipline: mainDiscipline(archetype.build),
      sourcePath,
      title: `${id} ${archetype.name}`,
      generatedAt: generationRecord?.generatedAt ?? null,
      generatedAtEpoch: generationRecord?.generatedAtEpoch ?? 0,
      ...media,
    });
  }
  return warriors;
}

async function buildTeamShots() {
  const dir = resolve(assetsRoot, '00-人物/02-队伍镜头');
  const files = (await walk(dir)).filter(isImage).sort((a, b) => repoRelative(a).localeCompare(repoRelative(b), 'zh-Hans-CN'));
  const shots = [];
  for (const file of files) {
    const media = await makeMedia(file, 'team');
    shots.push({ title: cleanTitle(file), sourcePath: repoRelative(file), ...media });
  }
  return shots;
}

async function buildChapterImages() {
  const roots = ['01-第一章-山水县境', '02-第二章-槐安古道', '03-第三章-照影城'].map((name) => resolve(assetsRoot, name));
  const allFiles = [];
  for (const root of roots) {
    allFiles.push(...await walk(root));
  }
  const files = allFiles
    .filter(isImage)
    .filter((file) => !/00-风格探索|00-人物|废案|_candidates/.test(repoRelative(file)))
    .sort((a, b) => repoRelative(a).localeCompare(repoRelative(b), 'zh-Hans-CN'));
  const images = [];

  for (const file of files) {
    const media = await makeMedia(file, 'chapters');
    images.push({
      id: hashPath(repoRelative(file)),
      title: cleanTitle(file),
      chapterKey: chapterKeyFromPath(file),
      type: imageTypeFromPath(file),
      sourcePath: repoRelative(file),
      ...media,
    });
  }
  return images;
}

function parseStory(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const title = lines.find((line) => line.startsWith('# '))?.replace(/^# /, '').trim() ?? '《山水照影录》官网展示样章：明档线';
  const sections = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      const heading = line.replace(/^# /, '').trim();
      if (heading === title) continue;
      if (current) sections.push(current);
      current = { heading, body: [] };
      continue;
    }
    if (current) current.body.push(line);
  }
  if (current) sections.push(current);
  return {
    title,
    source: 'showcase/content/03_Main_Story/classic-route-showcase.md',
    deck: '自定义主角明档线，从清河渡醒牒到照影母局裁决的一条官网可读样章。',
    sections: sections.map((section, index) => ({
      id: `story-${String(index + 1).padStart(2, '0')}`,
      heading: section.heading,
      body: section.body.join('\n').trim(),
    })),
  };
}

async function buildStory() {
  const markdown = await readFile(resolve(repoRoot, 'showcase/content/03_Main_Story/classic-route-showcase.md'), 'utf8');
  return parseStory(markdown);
}

function mediaBySource(items) {
  return new Map(items.map((item) => [item.sourcePath, item]));
}

function firstImageByType(chapterImages, chapterKey, type) {
  return chapterImages.find((image) => image.chapterKey === chapterKey && image.type === type) ?? chapterImages.find((image) => image.chapterKey === chapterKey);
}

async function buildData() {
  const [warriors, teamShots, chapterImages, story] = await Promise.all([
    buildWarriors(),
    buildTeamShots(),
    buildChapterImages(),
    buildStory(),
  ]);
  const warriorById = new Map(warriors.map((warrior) => [warrior.id, warrior]));
  const selectedWarriors = selectedHeroIds.map((id) => warriorById.get(id)).filter(Boolean);
  const latestWarrior = warriors.toSorted((left, right) => {
    const timeDiff = (right.generatedAtEpoch ?? 0) - (left.generatedAtEpoch ?? 0);
    if (timeDiff !== 0) return timeDiff;
    return left.id.localeCompare(right.id, 'zh-Hans-CN');
  })[0];

  const featuredSlides = selectedWarriors.map((warrior) => ({
    id: warrior.id,
    title: warrior.name,
    subtitle: warrior.coreFantasy,
    kicker: `${warrior.mainDiscipline} / ${warrior.build}`,
    image: warrior.previewPath,
    thumb: warrior.thumbPath,
    href: './warriors.html',
  }));

  const chapterMedia = mediaBySource(chapterImages);
  const chapterHeroImages = chapters.map((chapter) => firstImageByType(chapterImages, chapter.key, '章节主视觉') ?? firstImageByType(chapterImages, chapter.key, '章节地图')).filter(Boolean);

  const latestItems = [
    latestWarrior && { label: '人物设定', title: latestWarrior.title, deck: latestWarrior.role, image: latestWarrior.thumbPath, href: './warriors.html' },
    chapterHeroImages[2] && { label: '章节图', title: chapterHeroImages[2].title, deck: '照影城与第三章《司命》的视觉入口。', image: chapterHeroImages[2].thumbPath, href: './chapters.html' },
    { label: '故事', title: story.title, deck: story.deck, image: chapterHeroImages[0]?.thumbPath ?? selectedWarriors[1]?.thumbPath, href: './stories.html' },
    { label: '设定', title: '八大流派构筑语法', deck: settingTagline, image: teamShots[0]?.thumbPath, href: './setting.html' },
  ].filter(Boolean);

  const featuredImages = [
    ...chapterHeroImages,
    firstImageByType(chapterImages, 'act1', '章节地图'),
    firstImageByType(chapterImages, 'act2', '章节地图'),
    firstImageByType(chapterImages, 'act3', '章节地图'),
    firstImageByType(chapterImages, 'act1', '场景图'),
    firstImageByType(chapterImages, 'act2', '场景图'),
    firstImageByType(chapterImages, 'act3', '场景图'),
  ].filter(Boolean);

  return {
    pages,
    siteMeta: {
      title: 'GameW 宇宙',
      subtitle: '山水照影录官方资料站',
      deck: '低魔武侠 CRPG 的人物设定、构筑规则、章节图像与故事样章。',
    },
    settingTagline,
    disciplines,
    levelRules,
    sideCultivationRules,
    teamShots,
    warriors,
    chapters: chapters.map((chapter) => ({
      ...chapter,
      heroImage: firstImageByType(chapterImages, chapter.key, '章节主视觉')?.previewPath ?? firstImageByType(chapterImages, chapter.key, '章节地图')?.previewPath,
    })),
    chapterImages,
    primaryFactions,
    localFactions,
    story,
    featuredSlides,
    latestItems,
    featuredImages,
  };
}

function pageHTML(page) {
  const nav = pages.map((item) => `
        <a href="./${item.file}" ${item.key === page.key ? 'aria-current="page"' : ''}>
          <span>${escapeHTML(item.label)}</span>
          <small>${escapeHTML(item.en)}</small>
        </a>`).join('');
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${page.label} | GameW 宇宙</title>
    <meta name="description" content="GameW 宇宙官方资料站：${page.label}">
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body data-page="${page.key}">
    <header class="topbar" aria-label="主导航">
      <a class="brand" href="./index.html" aria-label="GameW 宇宙首页">
        <span class="brand-logo-frame"><img class="brand-logo-image" src="./assets/ui/wutopia-emblem.png" alt=""></span>
        <span class="brand-separator" aria-hidden="true"></span>
        <span class="brand-title" aria-label="WUTOPIA UNIVERSE">W U T O P I A&nbsp;&nbsp;U N I V E R S E</span>
      </a>
      <nav class="nav-links" aria-label="站点页面">${nav}
      </nav>
    </header>
    <main id="page-root"></main>
    <dialog class="media-dialog" id="media-dialog">
      <button class="dialog-close" type="button" aria-label="关闭">×</button>
      <img src="" alt="" id="dialog-image">
      <div id="dialog-caption"></div>
    </dialog>
    <script type="module" src="./app.js"></script>
  </body>
</html>
`;
}

async function copyStatic() {
  await mkdir(resolve(distRoot, 'assets/ui'), { recursive: true });
  await rm(resolve(distRoot, 'assets/ui/wutopia-mark.svg'), { force: true });
  await copyFile(resolve(srcRoot, 'assets/wutopia-emblem.png'), resolve(distRoot, 'assets/ui/wutopia-emblem.png'));
  await writeFile(resolve(distRoot, 'carousel.js'), await readFile(resolve(srcRoot, 'carousel.js'), 'utf8'));
  await writeFile(resolve(distRoot, 'app.js'), await readFile(resolve(srcRoot, 'app.js'), 'utf8'));
  await writeFile(resolve(distRoot, 'styles.css'), await readFile(resolve(srcRoot, 'styles.css'), 'utf8'));
}

async function main() {
  await mkdir(distRoot, { recursive: true });
  await rm(resolve(distRoot, 'data'), { recursive: true, force: true });
  await mkdir(resolve(distRoot, 'data'), { recursive: true });
  const data = await buildData();
  await writeFile(resolve(distRoot, 'data/generated-data.js'), `// Generated by scripts/build-site.mjs. Do not edit directly.\nexport const data = ${JSON.stringify(data, null, 2)};\n`);
  await copyStatic();
  for (const page of pages) {
    await writeFile(resolve(distRoot, page.file), pageHTML(page));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
