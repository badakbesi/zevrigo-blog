/**
 * Berkas `_headers` Cloudflare Pages untuk hasil `next build` (TSK-M71, pencipta 21 November 2026: blog di Cloudflare Pages
 * terhubung GitHub). Dijalankan `npm run build` sesudah `next build`: `node scripts/headers.mjs [folder-out]`.
 *
 * Kepala keamanan sama dengan penyajian `zevrigo-demo web` (MOD-18, `src/site`) sebelumnya: `nosniff`, tanpa referrer, dan
 * kebijakan keamanan konten dengan hash SHA-256 (base64) setiap skrip inline halaman itu. Skrip inline dicari dengan aturan
 * yang sama persis dengan `inline_scripts` Rust (vektor uji yang sama di `lib/headers.spec.ts`).
 *
 * Aturan Cloudflare Pages: paling banyak 100 aturan, setiap baris paling panjang 2.000 karakter; kepala yang sama dari
 * beberapa aturan digabung dengan koma, jadi aturan halaman melepas (`! `) kebijakan umum `/*` lebih dulu. Halaman yang
 * tidak ada mendapat `404.html` dengan kebijakan dari aturan `/*` (hash skrip `404.html`).
 * Hanya pustaka bawaan Node.js; tanpa bilangan pecahan.
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Kebijakan dasar, sama dengan `CONTENT_SECURITY_POLICY` di `zevrigo-demo/src/site/mod.rs`. */
export const BASE_POLICY = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join('; ');

const SCRIPT_SELF = "script-src 'self'";
export const MAX_RULES = 100;
export const MAX_LINE = 2000;
const OPEN = Buffer.from('<script');
const CLOSE = Buffer.from('</script>');
const SRC = Buffer.from('src=');
const TAG_END = 0x3e;
// Spasi ASCII seperti `u8::is_ascii_whitespace` Rust: spasi, tab, baris baru, form feed, carriage return.
const WHITESPACE = new Set([0x20, 0x09, 0x0a, 0x0c, 0x0d]);

/** Isi setiap elemen `<script>` tanpa atribut `src`, sesuai urutan (aturan `inline_scripts` Rust). */
export function inlineScripts(html) {
  const buf = Buffer.from(html);
  const scripts = [];
  let pos = 0;
  for (;;) {
    const start = buf.indexOf(OPEN, pos);
    if (start < 0) break;
    const after = start + OPEN.length;
    const next = buf[after];
    if (next === undefined || !(next === TAG_END || WHITESPACE.has(next))) {
      pos = after;
      continue;
    }
    const tagEnd = buf.indexOf(TAG_END, after);
    if (tagEnd < 0) break;
    const body = tagEnd + 1;
    const end = buf.indexOf(CLOSE, body);
    if (end < 0) break;
    if (buf.subarray(after, tagEnd).indexOf(SRC) < 0) {
      scripts.push(buf.subarray(body, end));
    }
    pos = end + CLOSE.length;
  }
  return scripts;
}

/** Kebijakan halaman: [`BASE_POLICY`] dengan hash setiap skrip inline di `script-src`, urut dan tanpa duplikat. */
export function pagePolicy(html) {
  const sources = [];
  for (const script of inlineScripts(html)) {
    const source = `'sha256-${createHash('sha256').update(script).digest('base64')}'`;
    if (!sources.includes(source)) sources.push(source);
  }
  if (sources.length === 0) return BASE_POLICY;
  return BASE_POLICY.replace(SCRIPT_SELF, () => `${SCRIPT_SELF} ${sources.join(' ')}`);
}

/** Jalur URL halaman untuk berkas HTML relatif (`artikel/a/index.html` -> `/artikel/a/`); `404.html` -> `null`. */
export function routeFor(relative) {
  const rel = relative.split(path.sep).join('/');
  if (!rel.endsWith('.html')) throw new Error(`bukan berkas HTML: ${rel}`);
  if (rel === '404.html') return null;
  let route;
  if (rel === 'index.html') route = '/';
  else if (rel.endsWith('/index.html')) route = `/${rel.slice(0, rel.length - 'index.html'.length)}`;
  else route = `/${rel.slice(0, rel.length - '.html'.length)}`;
  // `:` (placeholder), `*` (splat), dan spasi punya arti khusus di `_headers`.
  if (/[:*\s]/.test(route)) throw new Error(`jalur tidak bisa dipakai di _headers: ${route}`);
  return route;
}

/** Berkas HTML di `outDir`, relatif dengan `/`, urut. */
export function htmlFiles(outDir) {
  const found = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.html')) found.push(path.relative(outDir, full).split(path.sep).join('/'));
    }
  };
  walk(outDir);
  return found.sort();
}

/** Isi `_headers` untuk folder `outDir`: `{ text, rules, pages }`. */
export function buildHeaders(outDir) {
  const notFound = path.join(outDir, '404.html');
  const fallback = fs.existsSync(notFound) ? pagePolicy(fs.readFileSync(notFound)) : BASE_POLICY;
  const blocks = [
    ['/*', ['X-Content-Type-Options: nosniff', 'Referrer-Policy: no-referrer', `Content-Security-Policy: ${fallback}`]],
    ['/_next/static/*', ['Cache-Control: public, max-age=31536000, immutable']],
    ['https://:project.pages.dev/*', ['X-Robots-Tag: noindex']],
  ];
  let pages = 0;
  for (const rel of htmlFiles(outDir)) {
    const route = routeFor(rel);
    if (route === null) continue;
    const policy = pagePolicy(fs.readFileSync(path.join(outDir, rel)));
    blocks.push([route, ['! Content-Security-Policy', `Content-Security-Policy: ${policy}`]]);
    pages += 1;
  }
  if (blocks.length > MAX_RULES) throw new Error(`_headers: ${blocks.length} aturan, paling banyak ${MAX_RULES}`);
  const lines = ['# Dibuat scripts/headers.mjs saat npm run build (TSK-M71). Jangan diedit.', ''];
  for (const [rule, headers] of blocks) {
    lines.push(rule);
    for (const header of headers) lines.push(`  ${header}`);
    lines.push('');
  }
  for (const line of lines) {
    if (line.length > MAX_LINE) throw new Error(`_headers: baris ${line.length} karakter, paling panjang ${MAX_LINE}`);
  }
  return { text: lines.join('\n'), rules: blocks.length, pages };
}

const isMain = Boolean(process.argv[1]) && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const outDir = path.resolve(process.argv[2] ?? 'out');
  const { text, rules, pages } = buildHeaders(outDir);
  fs.writeFileSync(path.join(outDir, '_headers'), text);
  console.log(`_headers: ${rules} aturan, ${pages} halaman (${path.join(outDir, '_headers')})`);
}
