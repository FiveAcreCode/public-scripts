import assert from 'node:assert/strict';
import test from 'node:test';

import { validatePath, validateSource } from './validate-userscripts.mjs';

const relativePath =
  'scripts/example-product/userscripts/example-helper/example-helper.user.js';
const rawUrl =
  'https://raw.githubusercontent.com/FiveAcreCode/public-scripts/main/' +
  relativePath;

function sourceWith(overrides = '') {
  return `// ==UserScript==
// @name         Example helper
// @namespace    https://fiveacrecode.com/
// @version      1.0.0
// @description  Demonstrates valid repository metadata.
// @author       Five Acre Code
// @license      MIT
// @homepageURL  https://fiveacrecode.github.io/public-scripts/example-helper/
// @supportURL   https://github.com/FiveAcreCode/public-scripts/issues
// @match        https://example.com/account/*
// @grant        none
// @downloadURL  ${rawUrl}
// @updateURL    ${rawUrl}
${overrides}// ==/UserScript==

(() => {
  'use strict';
})();
`;
}

test('accepts a narrowly scoped, self-hosted userscript', () => {
  assert.deepEqual(validateSource(sourceWith(), relativePath), []);
});

test('requires the product-first userscript hierarchy', () => {
  const errors = validatePath('scripts/example/example.user.js');

  assert.ok(errors.some((error) => error.includes('userscript path must match')));
});

test('requires the artifact name to match its script directory', () => {
  const errors = validatePath(
    'scripts/example-product/userscripts/example-helper/different.user.js',
  );

  assert.ok(errors.some((error) => error.includes('filename must be')));
});

test('rejects an all-sites match and external runtime dependency', () => {
  const source = sourceWith('// @match        *://*/*\n// @require      https://cdn.example.com/helper.js\n');
  const errors = validateSource(source, relativePath);

  assert.ok(errors.some((error) => error.includes('overly broad @match')));
  assert.ok(errors.some((error) => error.includes('external @require')));
});

test('rejects a metadata block that does not start the file', () => {
  const errors = validateSource(`/* banner */\n${sourceWith()}`, relativePath);

  assert.ok(errors.some((error) => error.includes('metadata block at the start')));
});

test('rejects content that resembles a private key', () => {
  const privateKeyMarker = '-----BEGIN ' + 'PRIVATE KEY-----';
  const source = sourceWith().replace(
    "  'use strict';",
    `  'use strict';\n  // ${privateKeyMarker}`,
  );
  const errors = validateSource(source, relativePath);

  assert.ok(errors.some((error) => error.includes('credential or private key')));
});

test('rejects invalid JavaScript syntax', () => {
  const source = sourceWith().replace('})();', '(()');
  const errors = validateSource(source, relativePath);

  assert.ok(errors.some((error) => error.includes('JavaScript syntax error')));
});
