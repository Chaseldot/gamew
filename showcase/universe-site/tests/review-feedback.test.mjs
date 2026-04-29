import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { test } from 'node:test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(__dirname, '..');
const distDataPath = resolve(siteRoot, 'dist/data/generated-data.js');
const appSource = readFileSync(resolve(siteRoot, 'src/app.js'), 'utf8');
const cssSource = readFileSync(resolve(siteRoot, 'src/styles.css'), 'utf8');

function cssRule(selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = cssSource.match(new RegExp(`${escapedSelector}\\s*\\{[\\s\\S]*?\\}`));
  assert.ok(match, `${selector} rule should exist`);
  return match[0];
}

test('setting disciplines describe fixed fields without repeating the tagline copy', async () => {
  execFileSync(process.execPath, ['scripts/build-site.mjs'], {
    cwd: siteRoot,
    stdio: 'pipe',
  });
  const { data } = await import(`${pathToFileURL(distDataPath).href}?t=${Date.now()}`);
  const yufeng = data.disciplines.find((discipline) => discipline.name === '游锋');

  assert.ok(yufeng, '游锋 discipline should exist');
  assert.equal(yufeng.elements, '近身兵刃、读招、游斗');
  assert.equal(yufeng.representativeAbility, '应变、招式与反制');
  assert.ok(data.disciplines.every((discipline) => discipline.elements && discipline.representativeAbility));
  assert.doesNotMatch(appSource, /<span>\$\{escapeHTML\(discipline\.phrase\)\}<\/span>/);
});

test('reviewed page copy and warrior sort controls are present', () => {
  assert.match(appSource, /title:\s*'图像档案'/);
  assert.doesNotMatch(appSource, /title:\s*'三章图像档案'/);
  assert.match(appSource, /sectionIntro\('Local Powers', '地方势力'/);
  assert.doesNotMatch(appSource, /附属地方势力/);
  assert.match(appSource, /data-warrior-sort="asc"/);
  assert.match(appSource, /data-warrior-sort="desc"/);
  assert.match(appSource, /warrior\.generatedAtEpoch/);
});

test('warrior controls combine filters and ordering in one polished bar', () => {
  assert.match(appSource, /<div class="warrior-control-bar">/);
  assert.match(appSource, /<div class="sort-toggle" aria-label="排序">/);
  assert.doesNotMatch(appSource, /<div class="sort-row"/);
  assert.match(cssRule('.warrior-controls'), /display:\s*grid;/);
  assert.match(cssRule('.warrior-control-bar'), /grid-template-columns:\s*minmax\(0, 1fr\) auto;/);
  assert.match(cssRule('.sort-toggle'), /display:\s*inline-grid;/);
  assert.match(cssRule('.sort-toggle'), /grid-template-columns:\s*repeat\(2, minmax\(54px, auto\)\);/);
});

test('setting disciplines use a designed spectrum instead of a plain table', () => {
  assert.match(appSource, /<div class="system-quote">/);
  assert.match(appSource, /<div class="discipline-spectrum">/);
  assert.match(appSource, /<div class="side-cultivation-grid" aria-label="旁修成长阶段">/);
  assert.match(appSource, /class="discipline-rune"/);
  assert.match(appSource, /class="discipline-content"/);
  assert.doesNotMatch(appSource, /<table class="discipline-table">/);
  assert.match(cssRule('.system-quote'), /white-space:\s*nowrap;/);
  assert.match(cssRule('.discipline-spectrum'), /grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\);/);
  assert.match(cssRule('.discipline-spectrum'), /border:\s*1px solid var\(--line\);/);
  assert.match(cssRule('.side-cultivation-grid'), /grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\);/);
});

test('setting spectrum keeps a restrained black-gold palette', () => {
  assert.doesNotMatch(appSource, /style="--accent:/);
  assert.doesNotMatch(cssRule('.discipline-node'), /var\(--accent\)|color-mix/);
  assert.doesNotMatch(cssRule('.discipline-node::before'), /var\(--accent\)/);
  assert.match(cssRule('.discipline-node::before'), /rgba\(201, 151, 69,/);
  assert.match(cssRule('.discipline-rune'), /color:\s*var\(--gold-2\);/);
  assert.match(cssRule('.discipline-rune::after'), /rgba\(201, 151, 69,/);
});

test('carousel arrows and plaque layout stay stable and polished', () => {
  assert.match(appSource, /<span class="carousel-arrow-mark" aria-hidden="true">/);
  assert.match(cssRule('.carousel-arrow'), /display:\s*grid;/);
  assert.match(cssRule('.carousel-arrow'), /place-items:\s*center;/);
  assert.match(cssRule('.hero-plaque'), /height:\s*300px;/);
  assert.match(cssRule('.hero-plaque p:last-child'), /-webkit-line-clamp:\s*2;/);
  assert.match(cssRule('.carousel-dots'), /top:\s*calc\(min\(64vh, 700px\) \+ 360px\);/);
});
