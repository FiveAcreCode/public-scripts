import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const repositoryRoot = path.resolve(import.meta.dirname, '..');
const scriptPath = path.join(
  repositoryRoot,
  'scripts/shopify-admin/userscripts/shopify-admin-tweaks/shopify-admin-tweaks.user.js',
);
const siteRoot = path.join(repositoryRoot, 'site');
const pages = [
  path.join(siteRoot, 'index.html'),
  path.join(siteRoot, 'shopify-admin-tweaks/index.html'),
];
const installUrl =
  'https://raw.githubusercontent.com/FiveAcreCode/public-scripts/main/' +
  'scripts/shopify-admin/userscripts/shopify-admin-tweaks/' +
  'shopify-admin-tweaks.user.js';

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function validateHtml(file, source) {
  const errors = [];
  const relativePath = path.relative(repositoryRoot, file).split(path.sep).join('/');

  if (!source.startsWith('<!doctype html>')) {
    errors.push(`${relativePath}: HTML must start with a doctype`);
  }
  if (source.includes('http://')) {
    errors.push(`${relativePath}: insecure http:// URL found`);
  }
  if (!source.includes('Content-Security-Policy')) {
    errors.push(`${relativePath}: Content Security Policy meta tag is required`);
  }
  if (!source.endsWith('\n')) {
    errors.push(`${relativePath}: file must end with a newline`);
  }

  const referencePattern = /(?:href|src)="([^"]+)"/g;
  for (const [, reference] of source.matchAll(referencePattern)) {
    if (
      reference.startsWith('https://') ||
      reference.startsWith('#') ||
      reference.startsWith('data:')
    ) {
      continue;
    }

    const localReference = reference.split(/[?#]/, 1)[0];
    const target = path.resolve(path.dirname(file), localReference);
    if (!(await exists(target))) {
      errors.push(`${relativePath}: missing local reference ${reference}`);
    }
  }

  return errors;
}

async function main() {
  const errors = [];
  const requiredFiles = [
    ...pages,
    path.join(siteRoot, '.nojekyll'),
    path.join(siteRoot, 'robots.txt'),
    path.join(siteRoot, 'sitemap.xml'),
    path.join(siteRoot, 'assets/five-acre-code-mark.svg'),
    path.join(siteRoot, 'assets/styles.css'),
    path.join(siteRoot, 'assets/site.js'),
  ];

  for (const file of requiredFiles) {
    if (!(await exists(file))) {
      errors.push(
        `${path.relative(repositoryRoot, file).split(path.sep).join('/')}: required site file is missing`,
      );
    }
  }

  const scriptSource = await readFile(scriptPath, 'utf8');
  const version = scriptSource.match(/^\/\/ @version\s+(.+)$/m)?.[1]?.trim();
  if (!version) {
    errors.push('Shopify Admin Tweaks: unable to read userscript version');
  }

  for (const page of pages) {
    if (!(await exists(page))) continue;
    const source = await readFile(page, 'utf8');
    errors.push(...(await validateHtml(page, source)));
  }

  const productPage = await readFile(pages[1], 'utf8');
  if (!productPage.includes(installUrl)) {
    errors.push('Shopify Admin Tweaks landing page: install URL is missing');
  }
  if (version && !productPage.includes(`Version ${version}`)) {
    errors.push(
      `Shopify Admin Tweaks landing page: expected visible Version ${version}`,
    );
  }

  if (errors.length > 0) {
    for (const error of errors) console.error(`ERROR ${error}`);
    console.error(`Site validation failed with ${errors.length} error(s).`);
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${pages.length} public site page(s) for version ${version}.`);
}

await main();
