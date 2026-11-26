import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { isSafeHref, parseInline, parseMarkdown, plainText, slugify } from './markdown';
import { CATEGORIES, formatDate, loadPosts, parseFrontMatter, parsePost, splitFeatured } from './posts';
import {
  DEMO_RELEASES_URL,
  NODE_ANDROID_TAG,
  NODE_TAG,
  PAKET_PESERTA,
  PAKET_TAG,
  SIDIK_SERTIFIKAT_APK,
  UNDUHAN,
} from './unduhan';

const POST = `---
judul: Contoh: judul dengan titik dua
ringkasan: Ringkasan contoh.
tanggal: 2026-11-15
kategori: Panduan
penulis: Badak Besi
---
Paragraf pertama
berlanjut di baris kedua.

## Judul Bagian
`;

describe('markdown', () => {
  it('parses headings, paragraphs, lists, code, quotes, tables, and rules', () => {
    const blocks = parseMarkdown(
      [
        '## Bagian Satu',
        'Baris satu',
        'baris dua dengan `kode` dan **tebal**.',
        '',
        '- satu',
        '- dua',
        '1. pertama',
        '2. kedua',
        '```bash',
        'echo hai',
        '  indentasi tetap',
        '```',
        '> kutipan',
        '> berlanjut',
        '| A | B |',
        '|---|---|',
        '| `x` | 2 |',
        '---',
        '### Bagian Satu',
        '## Bagian Satu',
      ].join('\n')
    );
    expect(blocks.map((block) => block.kind)).toEqual([
      'heading',
      'paragraph',
      'list',
      'list',
      'code',
      'quote',
      'table',
      'rule',
      'heading',
      'heading',
    ]);
    expect(blocks[0]).toEqual({ kind: 'heading', level: 2, id: 'bagian-satu', text: 'Bagian Satu' });
    expect(blocks[8]).toMatchObject({ level: 3, id: 'bagian-satu-2' });
    expect(blocks[9]).toMatchObject({ level: 2, id: 'bagian-satu-3' });
    expect(blocks[1]).toEqual({
      kind: 'paragraph',
      inline: [
        { kind: 'text', text: 'Baris satu baris dua dengan ' },
        { kind: 'code', text: 'kode' },
        { kind: 'text', text: ' dan ' },
        { kind: 'strong', text: 'tebal' },
        { kind: 'text', text: '.' },
      ],
    });
    expect(blocks[3]).toMatchObject({ kind: 'list', ordered: true });
    expect(blocks[4]).toEqual({ kind: 'code', language: 'bash', code: 'echo hai\n  indentasi tetap' });
    expect(blocks[5]).toEqual({ kind: 'quote', inline: [{ kind: 'text', text: 'kutipan berlanjut' }] });
    expect(blocks[6]).toEqual({
      kind: 'table',
      header: [[{ kind: 'text', text: 'A' }], [{ kind: 'text', text: 'B' }]],
      rows: [[[{ kind: 'code', text: 'x' }], [{ kind: 'text', text: '2' }]]],
    });
    expect(plainText(blocks)).toContain('kutipan berlanjut');
  });

  it('only renders safe links', () => {
    expect(parseInline('lihat [explorer](https://zevrigo.ratuaurion.store) atau [panduan](/artikel/a/)')).toEqual([
      { kind: 'text', text: 'lihat ' },
      { kind: 'link', href: 'https://zevrigo.ratuaurion.store', text: 'explorer' },
      { kind: 'text', text: ' atau ' },
      { kind: 'link', href: '/artikel/a/', text: 'panduan' },
    ]);
    for (const href of ['javascript:alert', 'http://contoh.test', '//contoh.test', 'data:text/html,x']) {
      expect(isSafeHref(href)).toBe(false);
      expect(parseInline(`[x](${href})`)).toEqual([{ kind: 'text', text: 'x' }]);
    }
    expect(isSafeHref('#bagian-satu')).toBe(true);
    expect(slugify('Mengapa RandomX? Él & UTXO')).toBe('mengapa-randomx-el-utxo');
  });
});

describe('posts', () => {
  it('parses front matter and validates posts', () => {
    const post = parsePost('contoh-artikel', POST);
    expect(post).toMatchObject({
      slug: 'contoh-artikel',
      title: 'Contoh: judul dengan titik dua',
      date: '2026-11-15',
      category: 'Panduan',
      author: 'Badak Besi',
      cover: null,
      featured: false,
      readingMinutes: 1,
    });
    expect(post.blocks[0]).toEqual({
      kind: 'paragraph',
      inline: [{ kind: 'text', text: 'Paragraf pertama berlanjut di baris kedua.' }],
    });
    expect(parseFrontMatter('---\njudul: a\n---\nisi').body).toBe('isi');
    expect(formatDate('2026-11-05')).toBe('5 November 2026');
    const bad: [string, string][] = [
      ['Bukan-Slug', POST],
      ['a', 'tanpa front matter'],
      ['a', POST.replace('kategori: Panduan', 'kategori: Lain')],
      ['a', POST.replace('tanggal: 2026-11-15', 'tanggal: 15-11-2026')],
      ['a', POST.replace('penulis: Badak Besi\n', '')],
      ['a', POST.replace('penulis: Badak Besi', 'penulis: Badak Besi\nharga: 1')],
      ['a', POST.replace('penulis: Badak Besi', 'penulis: Badak Besi\nsampul: https://contoh.test/a.jpg')],
      ['a', POST.replace('penulis: Badak Besi', 'penulis: Badak Besi\nunggulan: tidak')],
    ];
    for (const [slug, source] of bad) {
      expect(() => parsePost(slug, source)).toThrow();
    }
  });

  it('loads the published articles', () => {
    const posts = loadPosts();
    expect(posts.length).toBe(8);
    expect(new Set(posts.map((post) => post.slug)).size).toBe(posts.length);
    expect(posts.filter((post) => post.featured).map((post) => post.slug)).toEqual([
      'jaringan-demo-dimulai-ulang',
    ]);
    expect(splitFeatured(posts).featured?.slug).toBe('jaringan-demo-dimulai-ulang');
    for (const post of posts) {
      expect(CATEGORIES).toContain(post.category);
      expect(post.author).toBe('Badak Besi');
      if (post.cover) {
        expect(fs.existsSync(path.join(process.cwd(), 'public', post.cover))).toBe(true);
      }
      for (const block of post.blocks) {
        const inline =
          block.kind === 'paragraph' || block.kind === 'quote'
            ? [block.inline]
            : block.kind === 'list'
              ? block.items
              : block.kind === 'table'
                ? [...block.header, ...block.rows.flat()]
                : [];
        for (const items of inline) {
          for (const item of items) {
            if (item.kind === 'link' && item.href.startsWith('/artikel/')) {
              const target = item.href.replace(/^\/artikel\//, '').replace(/\/$/, '');
              expect(posts.map((other) => other.slug)).toContain(target);
            } else if (item.kind === 'link' && item.href.startsWith('/')) {
              expect(['/', '/unduh/']).toContain(item.href);
            }
          }
        }
      }
    }
  });

  it('keeps articles free of investment claims', () => {
    const forbidden = [
      'imbal hasil',
      'pasti untung',
      'keuntungan',
      'dijamin',
      'jaminan aset',
      'didukung aset',
      'harga zvrg',
      'apy',
      'investasi aman',
      'lindqvist',
      'vance-sterling',
    ];
    for (const post of loadPosts()) {
      const text = `${post.title} ${post.summary} ${plainText(post.blocks)}`.toLowerCase();
      for (const word of forbidden) {
        expect(text.includes(word), `${post.slug}: ${word}`).toBe(false);
      }
    }
  });
});

describe('unduhan', () => {
  it('points every file to the published GitHub releases', () => {
    expect(UNDUHAN.map((item) => item.id)).toEqual([
      'wallet-windows',
      'wallet-linux',
      'wallet-android',
      'explorer-windows',
      'explorer-linux',
      'explorer-android',
      'node-windows',
      'node-linux',
      'node-android',
    ]);
    const repo = { Wallet: 'zevrigo-wallet', Explorer: 'zevrigo-explorer', Node: 'zevrigo-demo' } as const;
    const akhiran = { Windows: '-x64-setup.exe', Linux: '-x86_64.AppImage', Android: '-android.apk' } as const;
    for (const item of UNDUHAN) {
      expect(item.versi).toMatch(/^\d+\.\d+\.\d+$/);
      if (item.aplikasi === 'Node') {
        expect(item.tag).toBe(item.platform === 'Android' ? NODE_ANDROID_TAG : NODE_TAG);
      } else {
        expect(item.tag.endsWith(`-v${item.versi}`)).toBe(true);
      }
      expect(item.rilisUrl).toBe(`https://github.com/badakbesi/${repo[item.aplikasi]}/releases`);
      expect(item.catatan.length).toBeGreaterThan(0);
      expect(item.status).toBe('tersedia');
      const file = item.berkas;
      expect(file).toBeDefined();
      if (!file) continue;
      expect(file.url).toBe(`${item.rilisUrl}/download/${item.tag}/${file.nama}`);
      expect(file.halamanRilis).toBe(`${item.rilisUrl}/tag/${item.tag}`);
      expect(file.nama).toContain(item.versi);
      expect(file.nama.endsWith(akhiran[item.platform])).toBe(true);
      expect(file.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(file.ukuran).toMatch(/^\d+,\d MB$/);
    }
    expect(new Set(UNDUHAN.map((item) => item.berkas?.sha256)).size).toBe(UNDUHAN.length);
    expect(SIDIK_SERTIFIKAT_APK).toMatch(/^[0-9a-f]{64}$/);
  });

  it('points the participant packages to the published zevrigo-demo release', () => {
    expect(PAKET_TAG).toBe('peserta-demo-zevrigo');
    expect(NODE_TAG).toBe('zevrigo-demo-gui');
    expect(PAKET_PESERTA.map((item) => item.id)).toEqual(['paket-linux', 'paket-windows']);
    const akhiran = { Linux: '-linux-x86_64.tar.gz', Windows: '-windows-x64.zip' } as const;
    for (const item of PAKET_PESERTA) {
      const file = item.berkas;
      expect(file.nama).toBe(`${PAKET_TAG}${akhiran[item.platform]}`);
      expect(file.url).toBe(`${DEMO_RELEASES_URL}/download/${PAKET_TAG}/${file.nama}`);
      expect(file.halamanRilis).toBe(`${DEMO_RELEASES_URL}/tag/${PAKET_TAG}`);
      expect(file.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(file.ukuran).toMatch(/^\d+,\d MB$/);
      expect(item.periksa).toContain(file.nama);
      expect(item.mulai.join(' ')).toContain('peserta-demo-zevrigo');
      expect(item.catatan.length).toBeGreaterThan(0);
    }
    const semua = [...UNDUHAN.map((item) => item.berkas?.sha256), ...PAKET_PESERTA.map((item) => item.berkas.sha256)];
    expect(new Set(semua).size).toBe(semua.length);
  });

  it('matches the app versions in the repos', () => {
    const versions: [string, string[]][] = [
      ['Wallet', ['zevrigo-wallet', 'src-tauri', 'tauri.conf.json']],
      ['Explorer', ['zevrigo-explorer', 'app', 'src-tauri', 'tauri.conf.json']],
      ['Node', ['zevrigo-demo', 'app', 'src-tauri', 'tauri.conf.json']],
    ];
    for (const [aplikasi, parts] of versions) {
      const conf = path.join(process.cwd(), '..', ...parts);
      if (!fs.existsSync(conf)) continue;
      const version = JSON.parse(fs.readFileSync(conf, 'utf8')).version;
      for (const item of UNDUHAN.filter((entry) => entry.aplikasi === aplikasi)) {
        expect(item.versi, item.id).toBe(version);
      }
    }
  });
});
