import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const sourcePath = resolve(repoRoot, 'content/12-website-assets/web_export.json');
const classicRoutePath = resolve(repoRoot, 'content/03_Main_Story/classic-route-showcase.md');
const initialScriptPath = resolve(repoRoot, '../story-blueprints/script.md');
const targetPath = resolve(repoRoot, 'site/data.js');

const exportNames = [
  'siteMeta',
  'navPages',
  'productionStatus',
  'levelRules',
  'levelMilestones',
  'disciplines',
  'inheritances',
  'acts',
  'regions',
  'factions',
  'companions',
  'keyNpcs',
  'darkOrigin',
  'solutionTags',
  'actOneFactions',
  'actOneCompanionStates',
  'actOneMainQuests',
  'actOneSideQuests',
  'actOneBranches',
  'actTwoMainQuests',
  'actTwoSideQuests',
  'actThreeMainQuests',
  'companionFinaleQuests',
  'branchVariableGroups',
  'reputationScale',
  'companionVariableRules',
  'darkOriginVariables',
  'branchNodes',
  'storyScenes',
  'actOneSceneSamples',
  'questSamples',
  'endings',
  'codexEntries',
  'gallery',
  'classicRouteStory',
  'initialScript',
];

const storyImages = [
  'assets/art/art-assets/01-第一章-山水县境/02-地点概念图/第一章-地点概念-清河渡.png',
  'assets/art/art-assets/01-第一章-山水县境/02-地点概念图/第一章-地点概念-山水县城.png',
  'assets/art/art-assets/01-第一章-山水县境/02-地点概念图/第一章-地点概念-龙王庙水闸.png',
  'assets/art/art-assets/02-第二章-槐安古道/02-地点概念图/第二章-地点概念-龙门驿.png',
  'assets/art/art-assets/02-第二章-槐安古道/03-场景图/第二章-场景-龙门驿边关驿站-风格.jpg',
  'assets/art/art-assets/02-第二章-槐安古道/02-地点概念图/第二章-地点概念-千佛石窟.png',
  'assets/art/art-assets/02-第二章-槐安古道/02-地点概念图/第二章-地点概念-武林盟会.png',
  'assets/art/art-assets/03-第三章-照影城/00-章节地图/第三章-章节地图-照影城下城总览.jpg',
  'assets/art/art-assets/03-第三章-照影城/02-地点概念图/第三章-地点概念-摘星楼.png',
  'assets/art/art-assets/03-第三章-照影城/03-场景图/第三章-场景-官署审案堂与档案房-风格.jpg',
  'assets/art/art-assets/03-第三章-照影城/03-场景图/第三章-场景-皇城外朝禁苑大殿门前-风格.jpg',
  'assets/art/art-assets/03-第三章-照影城/02-地点概念图/第三章-地点概念-地下照影母局.png',
  'assets/art/art-assets/03-第三章-照影城/01-章节主视觉/第三章-章节主视觉-照影城宫城下城远景.png',
  'assets/art/art-assets/00-人物探索/人物-队伍概念-核心队友阵容.jpg',
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertUnique(items, getKey, label) {
  const seen = new Set();
  for (const item of items) {
    const key = getKey(item);
    assert(key, `${label} contains an item without an id/key`);
    assert(!seen.has(key), `${label} contains duplicate key: ${key}`);
    seen.add(key);
  }
}

function validate(data) {
  for (const name of exportNames) {
    assert(Object.hasOwn(data, name), `web export missing "${name}"`);
  }

  assert(data.siteMeta?.title, 'siteMeta.title is required');
  assert(Array.isArray(data.navPages) && data.navPages.length === 7, 'navPages must contain the top-level pages');
  assert(Array.isArray(data.regions) && data.regions.length === 3, 'regions must contain the three chapter regions');
  assert(Array.isArray(data.factions) && data.factions.length === 8, 'factions must contain the v0.3 eight factions');
  assert(Array.isArray(data.companions) && data.companions.length === 8, 'companions must contain eight companions');
  assert(Array.isArray(data.gallery) && data.gallery.length > 0, 'gallery must contain visible assets');
  assert(data.classicRouteStory?.title, 'classicRouteStory.title is required');
  assert(Array.isArray(data.classicRouteStory.sections) && data.classicRouteStory.sections.length >= 8, 'classicRouteStory.sections must contain story sections');
  assert(data.initialScript?.title, 'initialScript.title is required');
  assert(Array.isArray(data.initialScript.sections) && data.initialScript.sections.length >= 8, 'initialScript.sections must contain design sections');

  assertUnique(data.navPages, (page) => page.href, 'navPages');
  assertUnique(data.regions, (region) => region.id, 'regions');
  assertUnique(data.factions, (faction) => faction.id, 'factions');
  assertUnique(data.keyNpcs, (npc) => npc.id, 'keyNpcs');
  assertUnique(data.storyScenes, (scene) => scene.id, 'storyScenes');
  assertUnique(data.codexEntries, (entry) => entry.title, 'codexEntries');
}

function parseInitialScript(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const firstHeadingIndex = lines.findIndex((line) => line.trim() === '# GameW 战役圣经 v0.1');
  const title = 'GameW 战役圣经 v0.1';
  const subtitle = lines.slice(firstHeadingIndex + 1).find((line) => /^##\s+/.test(line))?.replace(/^##\s+/, '').trim() ?? '《山水照影录》';
  const deck = lines
    .slice(0, firstHeadingIndex)
    .join('\n')
    .trim()
    .replace(/\s+/g, ' ');
  const sections = [];
  let current = null;

  for (const line of lines.slice(firstHeadingIndex + 1)) {
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const heading = headingMatch[2].trim();
      if (heading === title || heading === subtitle) continue;
      if (current) sections.push(current);
      current = {
        body: [],
        heading,
        id: heading
          .replace(/^\d+(\.\d+)?\s*/, '')
          .replace(/[^\u3400-\u9fffA-Za-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .toLowerCase(),
      };
      continue;
    }

    if (current) current.body.push(line);
  }

  if (current) sections.push(current);

  return {
    deck,
    sections: sections.map((section) => ({
      ...section,
      body: section.body.join('\n').trim(),
    })),
    source: '../story-blueprints/script.md',
    subtitle,
    title,
  };
}

function parseClassicRouteStory(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const title = lines.find((line) => line.startsWith('# '))?.replace(/^# /, '').trim();
  const sections = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      const heading = line.replace(/^# /, '').trim();
      if (heading === title) continue;
      if (current) sections.push(current);
      current = {
        body: [],
        heading,
        id: heading
          .replace(/^\d+\.\s*/, '')
          .replace(/[^\u3400-\u9fffA-Za-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .toLowerCase(),
      };
      continue;
    }

    if (current) current.body.push(line);
  }

  if (current) sections.push(current);

  return {
    deck: '自定义主角 / Tav 基线，第一章救城留证，第二章独立持证并公开质询，第三章走“公开改造”结局。',
    source: 'content/03_Main_Story/classic-route-showcase.md',
    sections: sections.map((section, index) => ({
      ...section,
      body: section.body.join('\n').trim(),
      image: storyImages[index % storyImages.length],
    })),
    title,
  };
}

function formatExport(name, value) {
  return `export const ${name} = ${JSON.stringify(value, null, 2)};\n`;
}

function renderDataModule(data) {
  const parts = [
    '// Generated by scripts/build-site-data.mjs from content/12-website-assets/web_export.json.',
    '// Do not edit this file directly; update the structured content source and rerun the generator.',
    '',
  ];

  for (const name of exportNames) {
    parts.push(formatExport(name, data[name]));
  }

  return `${parts.join('\n')}\n`;
}

async function main() {
  const isCheck = process.argv.includes('--check');
  const raw = await readFile(sourcePath, 'utf8');
  const data = JSON.parse(raw);
  const classicRouteMarkdown = await readFile(classicRoutePath, 'utf8');
  const initialScriptMarkdown = await readFile(initialScriptPath, 'utf8');
  data.classicRouteStory = parseClassicRouteStory(classicRouteMarkdown);
  data.initialScript = parseInitialScript(initialScriptMarkdown);
  validate(data);

  const next = renderDataModule(data);
  if (isCheck) {
    const current = await readFile(targetPath, 'utf8');
    if (current !== next) {
      console.error('site/data.js is out of sync with content/12-website-assets/web_export.json');
      process.exit(1);
    }
    return;
  }

  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(targetPath, next);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
