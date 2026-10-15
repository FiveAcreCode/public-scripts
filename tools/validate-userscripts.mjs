import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const repositoryRoot = path.resolve(import.meta.dirname, '..');
const scriptsRoot = path.join(repositoryRoot, 'scripts');
const namespace = 'https://github.com/hansoncorellc/public-scripts';
const rawBase =
  'https://raw.githubusercontent.com/hansoncorellc/public-scripts/main/';
const requiredOnce = [
  'name',
  'namespace',
  'version',
  'description',
  'author',
  'license',
  'downloadURL',
  'updateURL',
];
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\bshp(?:at|ca|pa|ss)_[A-Za-z0-9]{20,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
];

async function findUserscripts(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findUserscripts(entryPath)));
    } else if (entry.isFile() && entry.name.endsWith('.user.js')) {
      files.push(entryPath);
    }
  }

  return files;
}

export function parseMetadata(source, relativePath) {
  const match = source.match(
    /^\/\/ ==UserScript==\r?\n([\s\S]*?)\r?\n\/\/ ==\/UserScript==/,
  );
  if (!match) {
    return { metadata: new Map(), errors: [`${relativePath}: invalid or missing metadata block at the start of the file`] };
  }

  const metadata = new Map();
  const errors = [];
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^\/\/\s+@([^\s]+)\s+(.+?)\s*$/);
    if (!field) {
      if (line.trim()) errors.push(`${relativePath}: malformed metadata line: ${line}`);
      continue;
    }
    const [, key, value] = field;
    metadata.set(key, [...(metadata.get(key) ?? []), value]);
  }

  return { metadata, errors };
}

export function validateMetadata(metadata, relativePath) {
  const errors = [];
  const values = (key) => metadata.get(key) ?? [];

  for (const key of requiredOnce) {
    if (values(key).length !== 1) {
      errors.push(`${relativePath}: @${key} must appear exactly once`);
    }
  }

  if (values('match').length === 0) {
    errors.push(`${relativePath}: at least one narrow @match is required`);
  }
  if (values('grant').length === 0) {
    errors.push(`${relativePath}: at least one explicit @grant is required (use "none" when appropriate)`);
  }
  for (const match of values('match')) {
    if (match === '*://*/*' || match === '<all_urls>') {
      errors.push(`${relativePath}: overly broad @match is not allowed: ${match}`);
    }
  }

  if (values('namespace')[0] !== namespace) {
    errors.push(`${relativePath}: @namespace must be ${namespace}`);
  }
  if (values('license')[0] !== 'MIT') {
    errors.push(`${relativePath}: @license must be MIT unless the repository license decision is updated`);
  }
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(values('version')[0] ?? '')) {
    errors.push(`${relativePath}: @version must use semantic versioning`);
  }

  const expectedRawUrl = `${rawBase}${relativePath}`;
  for (const key of ['downloadURL', 'updateURL']) {
    if (values(key)[0] !== expectedRawUrl) {
      errors.push(`${relativePath}: @${key} must be ${expectedRawUrl}`);
    }
  }

  if (values('require').length > 0) {
    errors.push(`${relativePath}: external @require dependencies need a documented security decision before use`);
  }

  return errors;
}

export function validateSource(source, relativePath) {
  const errors = [];
  const parsed = parseMetadata(source, relativePath);
  errors.push(...parsed.errors, ...validateMetadata(parsed.metadata, relativePath));

  if (!source.endsWith('\n')) {
    errors.push(`${relativePath}: file must end with a newline`);
  }
  for (const pattern of secretPatterns) {
    if (pattern.test(source)) {
      errors.push(`${relativePath}: content resembles a credential or private key`);
    }
  }

  return errors;
}

export async function validateRepository(directory = scriptsRoot) {
  const files = await findUserscripts(directory);
  const errors = [];

  for (const file of files) {
    const relativePath = path.relative(repositoryRoot, file).split(path.sep).join('/');
    const source = await readFile(file, 'utf8');
    errors.push(...validateSource(source, relativePath));
  }

  return { errors, fileCount: files.length };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { errors, fileCount } = await validateRepository();

  if (errors.length > 0) {
    for (const error of errors) console.error(`ERROR ${error}`);
    console.error(`Validation failed with ${errors.length} error(s).`);
    process.exitCode = 1;
  } else if (fileCount === 0) {
    console.log('No published userscripts found; repository structure is valid.');
  } else {
    console.log(`Validated ${fileCount} published userscript(s).`);
  }
}
