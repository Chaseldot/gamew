import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(__dirname, '..');
const dataPath = resolve(siteRoot, 'data.js');
const indexPath = resolve(siteRoot, 'index.html');
const expectedPages = [
  'index.html',
  'world.html',
  'regions.html',
  'factions.html',
  'characters.html',
  'stories.html',
  'quests.html',
  'branches.html',
  'codex.html',
  'systems.html',
  'story-act1.html',
  'art.html',
];

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
  assert.equal(data.navPages.length, expectedPages.length, 'expected one nav item per site page');
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

test('concept, scene, and combat gallery images are 4K landscape', async () => {
  const data = await loadData();
  const strictTypes = new Set(['concept', 'scene', 'combat']);
  const strictItems = data.gallery.filter((item) => strictTypes.has(item.type));

  assert.ok(strictItems.length >= 12, 'expected at least 12 strict 4K gallery items');

  for (const item of strictItems) {
    const filePath = resolve(siteRoot, item.src);
    assert.ok(existsSync(filePath), `${item.title} image should exist at ${item.src}`);
    assert.match(basename(item.src), /[\u3400-\u9fff]/, `${item.title} filename should use Chinese naming`);

    const size = imageSize(filePath);
    assert.deepEqual(size, { width: 3840, height: 2160 }, `${item.title} should be 3840x2160`);
  }
});

test('site is split into child pages with shared assets', async () => {
  const data = await loadData();
  const navHrefs = data.navPages.map((page) => page.href);
  assert.deepEqual(navHrefs, expectedPages, 'navPages should define the expected child pages');

  for (const page of expectedPages) {
    const pagePath = resolve(siteRoot, page);
    assert.ok(existsSync(pagePath), `${page} should exist`);

    const html = readFileSync(pagePath, 'utf8');
    for (const required of ['styles.css', 'data.js', 'app.js']) {
      assert.match(html, new RegExp(required.replace('.', '\\.')), `${page} should reference ${required}`);
    }

    for (const href of expectedPages) {
      assert.match(html, new RegExp(`href="\\./${href}"`), `${page} nav should link to ${href}`);
    }

    const topbar = html.match(/<header class="topbar"[\s\S]*?<\/header>/)?.[0] ?? '';
    assert.doesNotMatch(topbar, /href="#/, `${page} top navigation should use child pages, not in-page anchors`);
  }
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
