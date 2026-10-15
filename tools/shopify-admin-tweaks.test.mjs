import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const repositoryRoot = path.resolve(import.meta.dirname, '..');
const scriptPath = path.join(
  repositoryRoot,
  'scripts/shopify-admin/userscripts/shopify-admin-tweaks/shopify-admin-tweaks.user.js',
);

test('Shopify Admin Tweaks retains its narrow public contract', async () => {
  const source = await readFile(scriptPath, 'utf8');

  assert.match(source, /^\/\/ @version\s+0\.6\.0$/m);
  assert.match(source, /^\/\/ @match\s+https:\/\/admin\.shopify\.com\/\*$/m);
  assert.match(source, /^\/\/ @grant\s+none$/m);
  assert.match(source, /\[data-sidekick-field\]/);
  assert.match(source, /_GlobalRibbonContainer/);
  assert.match(source, /fac-shopify-admin-tweaks/);

  for (const networkPrimitive of [
    /\bfetch\s*\(/,
    /\bXMLHttpRequest\b/,
    /\bWebSocket\b/,
    /\bsendBeacon\s*\(/,
  ]) {
    assert.doesNotMatch(source, networkPrimitive);
  }
});
