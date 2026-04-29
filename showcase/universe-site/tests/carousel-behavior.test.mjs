import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(__dirname, '..');

test('carousel index wraps in both directions', async () => {
  const { nextCarouselIndex } = await import('../src/carousel.js');

  assert.equal(nextCarouselIndex(0, -1, 5), 4);
  assert.equal(nextCarouselIndex(4, 1, 5), 0);
  assert.equal(nextCarouselIndex(1, 7, 5), 3);
  assert.equal(nextCarouselIndex(1, -7, 5), 4);
});

test('carousel preview layers cannot block arrow clicks', () => {
  const css = readFileSync(resolve(siteRoot, 'src/styles.css'), 'utf8');

  assert.match(css, /\.side-preview\s*\{[\s\S]*?pointer-events:\s*none;/);
  assert.match(css, /\.hero-frame\s*\{[\s\S]*?z-index:\s*2;/);
  assert.match(css, /\.carousel-arrow\s*\{[\s\S]*?z-index:\s*4;/);
});
