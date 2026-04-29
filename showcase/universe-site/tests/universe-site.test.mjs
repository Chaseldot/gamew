import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { test } from 'node:test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(__dirname, '..');
const repoRoot = resolve(siteRoot, '../..');
const distRoot = resolve(siteRoot, 'dist');
const generatedDataPath = resolve(distRoot, 'data/generated-data.js');
const extractedLogoPath = resolve(distRoot, 'assets/ui/wutopia-emblem.png');
let dataPromise;

const expectedPages = [
  'index.html',
  'setting.html',
  'warriors.html',
  'chapters.html',
  'factions.html',
  'stories.html',
];

const newOfficialWarriorIds = [
  'F-033',
  'F-034',
  'F-035',
  'F-036',
  'F-037',
  'F-038',
  'F-039',
  'F-040',
  'F-238',
  'F-239',
  'F-240',
  'F-241',
  'F-248',
  'F-249',
  'F-250',
  'F-251',
  'F-252',
  'F-253',
  'F-254',
  'F-255',
  'F-256',
  'F-257',
  'F-258',
  'F-260',
  'F-261',
];

async function buildAndLoadData() {
  if (dataPromise) return dataPromise;
  execFileSync(process.execPath, ['scripts/build-site.mjs'], {
    cwd: siteRoot,
    stdio: 'pipe',
  });
  assert.ok(existsSync(generatedDataPath), 'build should emit dist/data/generated-data.js');
  dataPromise = import(`${pathToFileURL(generatedDataPath).href}?t=${Date.now()}`).then((module) => module.data);
  return dataPromise;
}

test('build emits the six GameW universe pages', async () => {
  await buildAndLoadData();

  for (const page of expectedPages) {
    const pagePath = resolve(distRoot, page);
    assert.ok(existsSync(pagePath), `${page} should exist in dist`);
    const html = readFileSync(pagePath, 'utf8');
    assert.match(html, /GameW 宇宙/, `${page} should carry the new site brand`);
    assert.match(html, /class="brand-logo-image"/, `${page} should render the extracted WUTOPIA emblem image`);
    assert.match(html, /assets\/ui\/wutopia-emblem\.png/, `${page} should use the image-based WUTOPIA logo asset`);
    assert.match(html, /WUTOPIA UNIVERSE/, `${page} should render the confirmed universe label`);
    assert.doesNotMatch(html, /<svg class="brand-emblem"/, `${page} should not use the approximate inline SVG logo`);
    assert.match(html, /styles\.css/, `${page} should reference shared styles`);
    assert.match(html, /app\.js/, `${page} should reference shared app module`);
    for (const href of expectedPages) {
      assert.match(html, new RegExp(`href="\\./${href}"`), `${page} nav should link to ${href}`);
    }
  }
  assert.ok(existsSync(extractedLogoPath), 'build should copy the extracted WUTOPIA emblem');
});

test('setting page data covers disciplines, build rules, and team shots', async () => {
  const data = await buildAndLoadData();
  const disciplineNames = data.disciplines.map((discipline) => discipline.name);

  assert.deepEqual(disciplineNames, ['游锋', '破军', '拳掌', '射艺', '影踪', '药师', '音律', '奇门']);
  assert.match(data.settingTagline, /游锋应变于招，破军承压于线，拳掌制衡于身/);
  assert.ok(data.levelRules.some((rule) => rule.includes('等级上限')));
  assert.ok(data.levelRules.some((rule) => rule.includes('旁修')));
  assert.deepEqual(
    data.sideCultivationRules.map((rule) => rule.name),
    ['入门', '大成', '通达'],
  );
  assert.match(data.sideCultivationRules[0].summary, /基础技能包/);
  assert.match(data.sideCultivationRules[2].summary, /不取得高级技或传承身份/);
  assert.equal(data.teamShots.length, 3, 'setting page should use the three team-shot images');
  for (const shot of data.teamShots) {
    assert.match(shot.sourcePath, /^assets\/00-人物\/02-队伍镜头\//);
  }
});

test('home carousel uses the approved featured warrior order', async () => {
  const data = await buildAndLoadData();

  assert.deepEqual(
    data.featuredSlides.map((slide) => slide.id),
    ['F-178', 'F-228', 'F-004', 'F-117', 'F-164', 'F-125', 'F-183', 'F-203', 'F-144', 'F-196', 'F-157', 'F-229'],
  );
});

test('warrior data only uses official character sheets and supports main-discipline filters', async () => {
  const data = await buildAndLoadData();
  const disciplines = new Set(data.warriors.map((warrior) => warrior.mainDiscipline));

  assert.ok(data.warriors.length >= 60, 'expected many official character sheets');
  for (const discipline of ['游锋', '破军', '拳掌', '射艺', '影踪', '药师', '音律', '奇门']) {
    assert.ok(disciplines.has(discipline), `warriors should include ${discipline}`);
  }
  for (const warrior of data.warriors) {
    assert.match(warrior.sourcePath, /^assets\/00-人物\/04-人物设定版\//);
    assert.doesNotMatch(warrior.sourcePath, /废案|03-人物概念探索|00-风格探索/);
    assert.ok(warrior.build, `${warrior.id} should include build`);
    assert.ok(warrior.role, `${warrior.id} should include role`);
    assert.ok(warrior.coreFantasy, `${warrior.id} should include core fantasy`);
    assert.ok(warrior.generatedAt, `${warrior.id} should include actual generation time`);
    assert.ok(warrior.generatedAtEpoch > 0, `${warrior.id} should include sortable generation time`);
  }
});

test('home latest character card uses the newest generated warrior sheet', async () => {
  const data = await buildAndLoadData();
  const latestWarrior = data.warriors.toSorted((left, right) => right.generatedAtEpoch - left.generatedAtEpoch)[0];

  assert.deepEqual(data.latestItems.map((item) => item.label), ['人物设定', '章节图', '故事', '设定']);
  assert.equal(data.latestItems[0].title, latestWarrior.title);
  assert.match(data.latestItems[1].href, /chapters\.html$/);
  assert.match(data.latestItems[2].href, /stories\.html$/);
  assert.match(data.latestItems[3].href, /setting\.html$/);
});

test('warrior data includes newly added official sheets without duplicate ids', async () => {
  const data = await buildAndLoadData();
  const ids = data.warriors.map((warrior) => warrior.id);
  const uniqueIds = new Set(ids);

  for (const id of newOfficialWarriorIds) {
    assert.ok(uniqueIds.has(id), `${id} should be included in the warriors page data`);
  }

  assert.equal(ids.length, uniqueIds.size, 'warriors should include only one card per character id');
  assert.equal(
    data.warriors.find((warrior) => warrior.id === 'F-249')?.sourcePath,
    'assets/00-人物/04-人物设定版/F-249-白蜡枪挑线客-GameW风格-v2.png',
    'F-249 should prefer the newest v2 official sheet',
  );
});

test('chapter data includes mature chapter art and excludes style exploration', async () => {
  const data = await buildAndLoadData();

  assert.deepEqual(
    data.chapters.map((chapter) => chapter.name),
    ['第一章《封境》', '第二章《黄沙照影》', '第三章《司命》'],
  );
  assert.ok(data.chapterImages.length >= 120, 'chapter page should carry the mature chapter image library');
  assert.ok(data.chapterImages.some((image) => image.type === '章节地图'));
  assert.ok(data.chapterImages.some((image) => image.type === '任务与副本图'));
  for (const image of data.chapterImages) {
    assert.match(image.sourcePath, /^assets\/0[1-3]-/);
    assert.doesNotMatch(image.sourcePath, /00-风格探索|00-人物|废案|_candidates/);
  }
});

test('faction data includes six primary powers and two local powers', async () => {
  const data = await buildAndLoadData();
  const appSource = readFileSync(resolve(siteRoot, 'src/app.js'), 'utf8');
  const factions = [...data.primaryFactions, ...data.localFactions];

  assert.deepEqual(
    data.primaryFactions.map((faction) => faction.name),
    ['缉武司', '同尘盟', '照影局', '慈心医脉', '百工坞', '鬼市'],
  );
  assert.deepEqual(
    data.localFactions.map((faction) => faction.name),
    ['山神寨', '边地部族'],
  );
  assert.ok(factions.every((faction) => faction.motto), 'every faction should carry its classic motto');
  assert.equal(
    data.primaryFactions.find((faction) => faction.name === '百工坞')?.motto,
    '机关无善恶，看谁扣机簧。',
  );
  assert.equal(
    data.localFactions.find((faction) => faction.name === '山神寨')?.motto,
    '官道不容人，山路自有路。',
  );
  assert.match(appSource, /class="faction-motto"/);
  assert.match(appSource, /faction\.motto/);
});

test('story page mounts the classic route showcase rather than design notes', async () => {
  const data = await buildAndLoadData();

  assert.equal(data.story.title, '《山水照影录》官网展示样章：明档线');
  assert.ok(data.story.sections.length >= 8);
  assert.ok(data.story.sections.some((section) => section.heading.includes('清河渡')));
  assert.equal(data.story.source, 'showcase/content/03_Main_Story/classic-route-showcase.md');
  assert.doesNotMatch(data.story.sections.map((section) => section.heading).join('\n'), /核心设计目标|BG3式结构拖底层/);
});

test('canon documents local powers without making them primary political endings', () => {
  const canon = readFileSync(resolve(repoRoot, 'canon/04-political-faction-restructure.md'), 'utf8');

  assert.match(canon, /山神寨/);
  assert.match(canon, /边地部族/);
  assert.match(canon, /地方势力/);
  assert.match(canon, /不升级为独立政治终点/);
});
