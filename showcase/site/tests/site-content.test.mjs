import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(__dirname, '..');
const dataPath = resolve(siteRoot, 'data.js');
const contentPages = [
  'index.html',
  'world.html',
  'factions-characters.html',
  'stories.html',
  'initial-script.html',
  'systems.html',
  'art.html',
];
const expectedTopNavPages = ['index.html', 'world.html', 'factions-characters.html', 'stories.html', 'initial-script.html', 'systems.html', 'art.html'];
const redirectedPages = {
  'regions.html': 'world.html',
  'factions.html': 'factions-characters.html',
  'characters.html': 'factions-characters.html',
  'quests.html': 'stories.html',
  'branches.html': 'stories.html',
  'story-act1.html': 'stories.html',
  'companions.html': 'factions-characters.html',
  'codex.html': 'systems.html',
};

async function loadData() {
  assert.ok(existsSync(dataPath), 'site/data.js should exist');
  return import(`${pathToFileURL(dataPath).href}?t=${Date.now()}`);
}

function imageSize(filePath) {
  const buffer = readFileSync(filePath);

  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xc3) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      offset += 2 + length;
    }
  }

  throw new Error(`Unsupported or unreadable image dimensions: ${filePath}`);
}

test('canon systems data is complete', async () => {
  const data = await loadData();

  assert.equal(data.disciplines.length, 8, 'expected 8 disciplines');
  assert.equal(data.inheritances.length, 17, 'expected 17 inheritances');
  assert.equal(data.levelMilestones.length, 9, 'expected 9 level milestones');
  assert.equal(data.companions.length, 8, 'expected 8 companions');
  assert.equal(data.factions.length, 8, 'expected 8 factions from v0.3 canon');
  assert.equal(data.navPages.length, expectedTopNavPages.length, 'expected top navigation with complete script');
  assert.equal(data.actOneMainQuests.length, 4, 'expected 4 Act 1 main quests');
  assert.equal(data.actOneSideQuests.length, 6, 'expected 6 Act 1 side quests');
  assert.ok(data.actOneBranches.length >= 7, 'expected Act 1 branch endings');
  assert.equal(data.regions.length, 3, 'expected 3 chapter regions');
  assert.ok(data.regions.some((region) => region.name === '黄沙古道' && region.locations.includes('黄沙客栈')));
  assert.ok(data.regions.some((region) => region.name === '照影城' && region.locations.includes('地下照影母局')));
  assert.equal(data.keyNpcs.length, 8, 'expected 8 key NPC records');
  assert.ok(data.keyNpcs.some((npc) => npc.name === '司命' && npc.role.includes('当代主人')));
  assert.ok(data.actTwoMainQuests.some((quest) => quest.code === 'A2-M06' && quest.name === '照影楼坞'));
  assert.ok(data.actThreeMainQuests.some((quest) => quest.code === 'A3-M05' && quest.name === '照影母局'));
  assert.equal(data.companionFinaleQuests.length, 9, 'expected 9 third-act companion finale quests');
  assert.ok(data.branchVariableGroups.some((group) => group.chapter === '第二章' && group.variables.some((item) => item.name === 'A2_INN_SCROLL_OBTAINED')));
  assert.ok(data.darkOriginVariables.some((item) => item.name === 'DARK_FINAL'));
  assert.ok(data.storyScenes.some((scene) => scene.id === 'SCENE_A3_M03_004'));
  assert.ok(data.codexEntries.some((entry) => entry.title === '照影牒针'));
});

test('map, location, scene, and combat gallery images are 4K landscape', async () => {
  const data = await loadData();
  const strictTypes = new Set(['map', 'location', 'scene', 'combat']);
  const strictItems = data.gallery.filter((item) => strictTypes.has(item.type) && item.resolution === '3840x2160');

  assert.ok(strictItems.length >= 36, 'expected at least 36 strict 4K gallery items');

  for (const item of data.gallery) {
    const filePath = resolve(siteRoot, item.src);
    assert.ok(existsSync(filePath), `${item.title} image should exist at ${item.src}`);
    assert.match(basename(item.src), /[\u3400-\u9fff]/, `${item.title} filename should use Chinese naming`);
  }

  for (const item of strictItems) {
    const filePath = resolve(siteRoot, item.src);
    const size = imageSize(filePath);
    assert.deepEqual(size, { width: 3840, height: 2160 }, `${item.title} should be 3840x2160`);
  }
});

test('site exposes exactly five real content pages', async () => {
  const data = await loadData();
  const navHrefs = data.navPages.map((page) => page.href);
  assert.deepEqual(navHrefs, expectedTopNavPages, 'navPages should include the complete script in the top navigation');

  for (const page of contentPages) {
    const pagePath = resolve(siteRoot, page);
    assert.ok(existsSync(pagePath), `${page} should exist`);

    const html = readFileSync(pagePath, 'utf8');
    for (const required of ['styles.css', 'data.js', 'app.js']) {
      assert.match(html, new RegExp(required.replace('.', '\\.')), `${page} should reference ${required}`);
    }

    for (const href of expectedTopNavPages) {
      assert.match(html, new RegExp(`href="\\./${href}"`), `${page} nav should link to ${href}`);
    }

    const topbar = html.match(/<header class="topbar"[\s\S]*?<\/header>/)?.[0] ?? '';
    assert.doesNotMatch(topbar, /href="#/, `${page} top navigation should use child pages, not in-page anchors`);

    for (const href of Object.keys(redirectedPages)) {
      assert.doesNotMatch(topbar, new RegExp(`href="\\./${href}"`), `${page} top navigation should not link to ${href}`);
    }
  }
});

test('old child pages redirect into the five page architecture', () => {
  for (const [page, target] of Object.entries(redirectedPages)) {
    const pagePath = resolve(siteRoot, page);
    assert.ok(existsSync(pagePath), `${page} compatibility page should exist`);

    const html = readFileSync(pagePath, 'utf8');
    assert.match(html, new RegExp(`url=\\./${target}`), `${page} should meta-refresh to ${target}`);
    assert.match(html, new RegExp(`href="\\./${target}"`), `${page} should provide a manual ${target} link`);
    assert.doesNotMatch(html, /<main id="page-root">/, `${page} should not mount the old app renderer`);
    assert.doesNotMatch(html, /data-page="(regions|factions|characters|quests|branches|codex|story-act1|companions)"/, `${page} should not keep the old page identity`);
  }
});

test('factions and characters child page shows old faction and people content', () => {
  const html = readFileSync(resolve(siteRoot, 'factions-characters.html'), 'utf8');
  assert.match(html, /data-page="factions-characters"/, 'factions and characters page should mount its renderer');
  assert.match(html, /app\.js/, 'factions and characters page should use the current app renderer');

  const appSource = readFileSync(resolve(siteRoot, 'app.js'), 'utf8');
  assert.match(appSource, /href: '\.\/factions-characters\.html'/, 'world renderer should link to the child page');
});

test('app renderer includes faction, companion, and key NPC sections', () => {
  const appSource = readFileSync(resolve(siteRoot, 'app.js'), 'utf8');
  assert.match(appSource, /function renderFactionsCharacters\(\)/, 'app should render the child page');
  assert.match(appSource, /actOneFactions/, 'child page should carry first-act faction content');
  assert.match(appSource, /actOneCompanionStates/, 'child page should carry first-act companion content');
  assert.match(appSource, /keyNpcs/, 'child page should carry key NPC content');
});

test('stories page mounts classic route showcase content and story artwork', async () => {
  const data = await loadData();

  assert.ok(data.classicRouteStory, 'classicRouteStory should be exported');
  assert.equal(data.classicRouteStory.title, '《山水照影录》官网展示样章：明档线');
  assert.ok(data.classicRouteStory.sections.length >= 8, 'classic route should include long-form story sections');
  assert.ok(data.classicRouteStory.sections.some((section) => section.heading.includes('清河渡')));
  assert.ok(data.classicRouteStory.sections.some((section) => section.heading.includes('龙王庙水闸')));
  assert.ok(data.classicRouteStory.sections.some((section) => section.image?.includes('assets/art/library/01-第一章-山水县境')));

  const html = readFileSync(resolve(siteRoot, 'stories.html'), 'utf8');
  assert.match(html, /data-page="stories"/, 'stories page should mount the Story renderer');
});

test('initial script page shows the earliest campaign concept', async () => {
  const data = await loadData();

  assert.ok(data.initialScript, 'initialScript should be exported');
  assert.equal(data.initialScript.title, 'GameW 战役圣经 v0.1');
  assert.ok(data.initialScript.subtitle.includes('山水照影录'));
  assert.ok(data.initialScript.sections.some((section) => section.heading.includes('核心设计目标')));
  assert.ok(data.initialScript.sections.some((section) => section.heading.includes('BG3式结构拖底层')));

  const html = readFileSync(resolve(siteRoot, 'initial-script.html'), 'utf8');
  assert.match(html, /data-page="initial-script"/, 'initial script page should mount its renderer');
  assert.ok(data.navPages.some((page) => page.href === 'initial-script.html' && page.label === '完整剧本'));

  const appSource = readFileSync(resolve(siteRoot, 'app.js'), 'utf8');
  assert.match(appSource, /href: '\.\/initial-script\.html'/, 'stories renderer should link to the initial script page');
  assert.match(appSource, /function renderInitialScript\(\)/, 'app should render the initial script page');
});

test('art gallery exposes the new assets taxonomy', async () => {
  const data = await loadData();
  const galleryTypes = new Set(data.gallery.map((item) => item.type));

  for (const type of ['map', 'key-art', 'location', 'scene', 'combat', 'character']) {
    assert.ok(galleryTypes.has(type), `gallery should include ${type} assets`);
  }

  assert.ok(data.gallery.length >= 40, 'gallery should expose the expanded assets library');
  assert.ok(data.gallery.some((item) => item.title === '清河渡' && item.type === 'location'));
  assert.ok(data.gallery.some((item) => item.title === '照影城下城总览' && item.type === 'map'));
});

test('Act 1 page data carries quests, choices, and character hooks', async () => {
  const data = await loadData();

  assert.deepEqual(
    data.actOneMainQuests.map((quest) => quest.code),
    ['A1-M01', 'A1-M02', 'A1-M03', 'A1-M04'],
  );
  assert.deepEqual(
    data.actOneSideQuests.map((quest) => quest.code),
    ['A1-S01', 'A1-S02', 'A1-S03', 'A1-S04', 'A1-S05', 'A1-S06'],
  );
  assert.ok(data.actOneSceneSamples.some((sample) => sample.title.includes('龙王庙水闸')));
  assert.ok(data.actOneCompanionStates.some((companion) => companion.name === '桑芷' && companion.combat.includes('药师')));
  assert.ok(data.actOneCompanionStates.some((companion) => companion.name === '唐小砚' && companion.combat.includes('奇门')));
});
