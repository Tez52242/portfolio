/**
 * Проверка собранного сайта (запускается после `astro build` командой `npm run check`):
 *  - все внутренние ссылки, картинки, CSS и JS указывают на существующие файлы и содержат base;
 *  - у каждой страницы есть <title> и description;
 *  - предупреждает, если в сайте остались заглушки (USERNAME, example.com).
 * Ошибки завершают скрипт с кодом 1, предупреждения — нет.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import config from '../astro.config.mjs';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = (config.base ?? '/').replace(/\/$/, '');
const errors = [];
const warnings = new Set();

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function resolveInternal(url) {
  const path = decodeURIComponent(url.split(/[?#]/)[0]);
  if (base && !(path === base || path.startsWith(base + '/'))) return { ok: false, reason: `нет префикса ${base}` };
  const local = join(dist, path.slice(base.length));
  const candidates = path.endsWith('/') ? [join(local, 'index.html')] : [local, join(local, 'index.html')];
  return { ok: candidates.some((c) => existsSync(c) && statSync(c).isFile()), reason: 'файл не найден' };
}

const pages = walk(dist).filter((f) => f.endsWith('.html'));
for (const file of pages) {
  const page = '/' + relative(dist, file);
  const html = readFileSync(file, 'utf8');

  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${page}: нет <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${page}: нет meta description`);

  for (const [, attr, url] of html.matchAll(/\b(href|src)="([^"]*)"/g)) {
    if (!url || url.startsWith('#') || url.startsWith('data:')) continue;
    if (url.startsWith('mailto:')) {
      if (/example\.com/.test(url)) warnings.add(`Осталась заглушка почты: ${url}`);
      continue;
    }
    if (/^https?:\/\//.test(url)) {
      if (/USERNAME|example\.com/.test(url) && !url.includes('localhost')) warnings.add(`Осталась заглушка в ссылке: ${url}`);
      // абсолютные адреса собственного сайта (canonical и т. п.) пропускаем — их проверяет деплой
      continue;
    }
    if (url.startsWith('//')) continue;
    if (!url.startsWith('/')) { errors.push(`${page}: относительная ссылка ${attr}="${url}" (ожидается абсолютный путь с base)`); continue; }
    const r = resolveInternal(url);
    if (!r.ok) errors.push(`${page}: ${attr}="${url}" — ${r.reason}`);
  }
}

// Тяжёлые файлы замедляют загрузку: предупреждаем о картинках и прочем крупнее 300 КБ
for (const f of walk(dist)) {
  if (/\.(html|xml|txt|woff2?)$/.test(f)) continue;
  const kb = statSync(f).size / 1024;
  if (kb > 300) warnings.add(`Тяжёлый файл ${Math.round(kb)} КБ: /${relative(dist, f)} (сожмите или переместите в src/assets/images/)`);
}

console.log(`Проверено страниц: ${pages.length}, base: "${base || '/'}"`);
for (const w of warnings) console.warn(`⚠ ${w}`);
if (errors.length) {
  console.error(`\nОшибки (${errors.length}):`);
  for (const e of errors) console.error(`✗ ${e}`);
  process.exit(1);
}
console.log('✓ Внутренние ссылки, изображения, стили и скрипты в порядке.');
