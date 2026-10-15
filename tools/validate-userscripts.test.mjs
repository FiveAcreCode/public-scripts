import assert from 'node:assert/strict';
import test from 'node:test';

import { validateSource } from './validate-userscripts.mjs';

const relativePath = 'scripts/example/example.user.js';
const rawUrl =
  'https://raw.githubusercontent.com/hansoncorellc/public-scripts/main/' +
  relativePath;

function sourceWith(overrides = '') {
  return `// ==UserScript==
// @name         Example helper
// @namespace    https://github.com/hansoncorellc/public-scripts
// @version      1.0.0
// @description  Demonstrates valid repository metadata.
// @author       Hanson Core LLC
// @license      MIT
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
