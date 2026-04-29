import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(__dirname, '..');

function cssRule(selector) {
  const css = readFileSync(resolve(siteRoot, 'src/styles.css'), 'utf8');
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escapedSelector}\\s*\\{[\\s\\S]*?\\}`));
  assert.ok(match, `${selector} rule should exist`);
  return match[0];
}

test('WUTOPIA UNIVERSE lettering keeps the supplied gold lockup style', () => {
  const rule = cssRule('.brand-title');

  assert.match(rule, /color:\s*#d8ad6a;/);
  assert.match(rule, /font-family:\s*"Avenir Next",\s*"Gill Sans",\s*ui-sans-serif,\s*system-ui,\s*sans-serif;/);
  assert.match(rule, /font-size:\s*0\.92rem;/);
  assert.match(rule, /font-weight:\s*500;/);
  assert.match(rule, /letter-spacing:\s*0;/);
  assert.match(rule, /word-spacing:\s*0\.16em;/);
  assert.match(rule, /line-height:\s*1;/);
  assert.doesNotMatch(rule, /background-clip|text-stroke|transform:/);
});
