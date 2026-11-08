#!/usr/bin/env node
// Verifies the generated site before it is published.
//  1. every page exists (index.html + <slug>/privacy.html + <slug>/impressum.html for each app in apps.config.json)
//  2. no external resources (no script/link/img/iframe/media tags, no src/srcset, no CSS url() or @import)
//  3. every internal link resolves (file, directory index, and #fragment ids); external links use https
//  4. no {{APP_NAME}} token in published slugs or index.html, and each named app's pages carry its name
// TODO(owner) comments are listed as warnings; they do not fail the check.
// Usage: node tools/check.mjs   (exit code 1 on any failure)

import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(readFileSync(join(ROOT, 'apps.config.json'), 'utf8'));
const TOKEN = '{{APP_NAME}}';

const fails = [];
const warns = [];
const pages = ['index.html'];
for (const slug of Object.keys(cfg.apps)) pages.push(`${slug}/privacy.html`, `${slug}/impressum.html`);

const cache = new Map();
const read = (abs) => {
  if (!cache.has(abs)) cache.set(abs, readFileSync(abs, 'utf8'));
  return cache.get(abs);
};
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

for (const rel of pages) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) { fails.push(`${rel}: missing`); continue; }
  const html = read(abs);

  // 2. external resources
  const tag = html.match(/<(script|link|img|iframe|source|video|audio|object|embed|picture)\b[^>]*>/i);
  if (tag) fails.push(`${rel}: resource tag ${tag[0]}`);
  if (/\s(src|srcset)\s*=/i.test(html)) fails.push(`${rel}: src/srcset attribute`);
  if (/url\s*\(|@import/i.test(html)) fails.push(`${rel}: CSS url()/@import`);

  // 3. links
  for (const [, href] of html.matchAll(/\shref="([^"]*)"/g)) {
    if (/^(mailto|tel):/.test(href)) continue;
    if (/^http:/.test(href)) { fails.push(`${rel}: insecure link ${href}`); continue; }
    if (/^https:/.test(href)) continue;
    if (/^[a-z]+:/i.test(href) || href.startsWith('//')) { fails.push(`${rel}: unexpected link ${href}`); continue; }
    const [path, frag] = href.split('#');
    let target = path === '' ? abs : resolve(dirname(abs), path);
    if (!target.startsWith(ROOT)) { fails.push(`${rel}: link leaves the site ${href}`); continue; }
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
    if (!existsSync(target)) { fails.push(`${rel}: broken link ${href}`); continue; }
    if (frag && target.endsWith('.html') && !ids(read(target)).has(frag)) fails.push(`${rel}: missing #${frag} in ${relative(ROOT, target)}`);
  }

  // 4. app name token
  const slug = rel.includes('/') ? rel.split('/')[0] : null;
  const app = slug ? cfg.apps[slug] : null;
  if ((!slug || app.published) && html.includes(TOKEN)) fails.push(`${rel}: ${TOKEN} left in a published page`);
  if (app?.published && !app.name) fails.push(`${rel}: published but apps.config.json has no name`);
  if (app?.name && !(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '').includes(app.name)) fails.push(`${rel}: <title> lacks "${app.name}" (run node tools/build.mjs)`);

  for (const [, t] of html.matchAll(/<!--\s*TODO\(owner\):\s*([\s\S]*?)-->/g)) warns.push(`${rel}: ${t.trim().slice(0, 110)}`);
}

for (const w of warns) console.log(`warn  ${w}`);
for (const f of fails) console.log(`FAIL  ${f}`);
const drafts = Object.entries(cfg.apps).filter(([, v]) => !v.published).map(([k]) => k);
console.log(`${pages.length} pages checked, ${fails.length} failures, ${warns.length} TODO(owner) warnings; drafts (token allowed): ${drafts.join(', ') || 'none'}`);
process.exit(fails.length ? 1 : 0);
