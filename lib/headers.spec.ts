import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { BASE_POLICY, MAX_LINE, buildHeaders, inlineScripts, pagePolicy, routeFor } from '../scripts/headers.mjs';

// Vektor yang sama dengan `page_policy_hashes_inline_scripts` di zevrigo-demo/src/site/tests.rs (TSK-M71).
const HTML = [
  '<script src="/_next/static/chunks/a1b2.js" async=""></script>',
  '<script>(self.__next_f=self.__next_f||[]).push([0])</script>',
  String.raw`<script>self.__next_f.push([1,"0:[\"$\",\"html\"]\n"])</script>`,
  '<script>(self.__next_f=self.__next_f||[]).push([0])</script>',
  '<scripts>bukan skrip</scripts><noscript>x</noscript>',
  '<script type="application/json" id="data"></script>',
].join('');

describe('headers', () => {
  it('uses the same base policy as zevrigo-demo web', () => {
    expect(BASE_POLICY).toBe(
      "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; " +
        "connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
    );
  });

  it('hashes inline scripts exactly like zevrigo-demo web', () => {
    expect(inlineScripts(HTML).map((script) => Buffer.from(script).toString())).toEqual([
      '(self.__next_f=self.__next_f||[]).push([0])',
      String.raw`self.__next_f.push([1,"0:[\"$\",\"html\"]\n"])`,
      '(self.__next_f=self.__next_f||[]).push([0])',
      '',
    ]);
    expect(pagePolicy(HTML)).toBe(
      BASE_POLICY.replace(
        "script-src 'self'",
        "script-src 'self' 'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' " +
          "'sha256-b69jhbvTdHmt2iNapvsv5zhrrf5ZpreAa5n1KUo5H9Y=' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='"
      )
    );
    expect(pagePolicy("<p>x</p><script>alert('Hello, world.');</script>")).toContain(
      "script-src 'self' 'sha256-qznLcsROx4GACP2dm0UCKCzCG+HiZ1guq6ZZDob/Tng=';"
    );
    expect(pagePolicy('<p>tanpa skrip</p>')).toBe(BASE_POLICY);
    expect(pagePolicy('<script>tanpa penutup')).toBe(BASE_POLICY);
  });

  it('maps exported pages to routes', () => {
    expect(routeFor('index.html')).toBe('/');
    expect(routeFor('unduh/index.html')).toBe('/unduh/');
    expect(routeFor('artikel/rilis-wallet-dan-explorer/index.html')).toBe('/artikel/rilis-wallet-dan-explorer/');
    expect(routeFor('_not-found/index.html')).toBe('/_not-found/');
    expect(routeFor('404.html')).toBeNull();
    expect(() => routeFor('robots.txt')).toThrow();
    expect(() => routeFor('a:b/index.html')).toThrow();
  });

  it('writes a general rule first and detaching page rules after it', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'zevrigo-headers-'));
    try {
      fs.mkdirSync(path.join(dir, 'artikel', 'a'), { recursive: true });
      fs.mkdirSync(path.join(dir, '_next', 'static'), { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), HTML);
      fs.writeFileSync(path.join(dir, 'artikel', 'a', 'index.html'), '<p>tanpa skrip</p>');
      fs.writeFileSync(path.join(dir, '404.html'), "<script>alert('Hello, world.');</script>");
      fs.writeFileSync(path.join(dir, '_next', 'static', 'x.js'), 'x');
      const { text, rules, pages } = buildHeaders(dir);
      expect(rules).toBe(5);
      expect(pages).toBe(2);
      const lines = text.split('\n');
      const rule = (name: string) => lines.indexOf(name);
      expect(rule('/*')).toBeGreaterThan(0);
      expect(rule('/_next/static/*')).toBeGreaterThan(rule('/*'));
      expect(rule('https://:project.pages.dev/*')).toBeGreaterThan(rule('/*'));
      expect(rule('/')).toBeGreaterThan(rule('/*'));
      expect(rule('/artikel/a/')).toBeGreaterThan(rule('/*'));
      expect(lines[rule('/*') + 3]).toContain("'sha256-qznLcsROx4GACP2dm0UCKCzCG+HiZ1guq6ZZDob/Tng='");
      expect(lines[rule('/') + 1]).toBe('  ! Content-Security-Policy');
      expect(lines[rule('/') + 2]).toBe(`  Content-Security-Policy: ${pagePolicy(HTML)}`);
      expect(lines[rule('/artikel/a/') + 2]).toBe(`  Content-Security-Policy: ${BASE_POLICY}`);
      expect(text.includes('404.html')).toBe(false);
      expect(Math.max(...lines.map((line) => line.length))).toBeLessThanOrEqual(MAX_LINE);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
