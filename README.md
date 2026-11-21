# Blog resmi Zevrigo

Situs statis (DEC-37, TSK-M64): Next.js static export dari artikel Markdown di `posts/`, diterbitkan Cloudflare Pages
(TSK-M71) di `https://zevrigo-blog.ratuaurion.store` setiap kali `main` di-push. Tanpa kuki, analitik, font, atau skrip dari pihak
lain. Paket npm sama persis dengan antarmuka web repo `zevrigo-explorer` (`web/`) (package-lock identik kecuali nama dan versi).

## Menulis artikel

Buat `posts/<slug>.md` (huruf kecil, angka, tanda hubung):

```markdown
---
judul: Judul artikel
ringkasan: Satu atau dua kalimat untuk kartu dan mesin pencari.
tanggal: 2026-11-15
kategori: Pengumuman
penulis: Badak Besi
sampul: /sampul/kisi-batu.jpg
---
Isi artikel. Didukung: ## dan ### judul, paragraf, daftar - dan 1., blok kode berpagar, kutipan >, tabel, ---,
`kode`, **tebal**, dan [tautan](https://...).
```

Halaman `/unduh/` membaca `lib/unduhan.ts`: tautan ke GitHub Releases dan sidik SHA-256 (isi `sha256` dari `SHA256SUMS.txt` rilis yang sudah terbit).

`kategori`: Pengumuman, Panduan, Protokol, atau Tokenomik. `sampul` opsional (berkas di `public/sampul/`). `unggulan: ya`
menaruh artikel di atas halaman depan. Tulis hanya fakta yang bisa diperiksa; uji menolak frasa klaim investasi.

## Perintah

```bash
npm ci --ignore-scripts          # paket dari package-lock.json
npm run check                    # typecheck, uji (vitest), build -> out/
(di ../zevrigo-demo) cargo run -- web --web-dir ../zevrigo-blog/out   # pratinjau di http://127.0.0.1:28807/
```

`make blog-check`. `npm run build` juga menulis `out/_headers` (`scripts/headers.mjs`): kepala keamanan dan kebijakan
keamanan konten dengan hash skrip inline setiap halaman, aturan yang sama dengan `zevrigo-demo web`.

## Cloudflare Pages (TSK-M71)

Proyek Pages terhubung ke repo GitHub ini, cabang produksi `main`: setiap push membangun dan menerbitkan blog.

| Pengaturan | Nilai |
|---|---|
| Framework preset | None |
| Build command | `npm ci --ignore-scripts --no-audit --no-fund && npm run build` |
| Build output directory | `out` |
| Variabel lingkungan | `SKIP_DEPENDENCY_INSTALL` = `1` (paket hanya dari perintah build, tanpa skrip pasang) |
| Node.js | dari `.node-version` (sama dengan image Docker) |

Uji yang membaca repo `zevrigo-wallet` dan `zevrigo-explorer` di folder sebelah dilewati bila repo itu tidak ada. Blog juga
masih bisa disajikan `zevrigo-demo web` (image Docker) untuk pratinjau lokal.

Repo ini bagian dari **zevrigo_lab** (pemisahan repo 17 November 2026). Aturan proyek: [AGENTS.md](AGENTS.md).

Favicon dan ikon situs (`app/favicon.ico`, `icon.png`, `apple-icon.png`) adalah salinan logo resmi dari `merek/` repo
inti ([SUMBER_RESMI.md](https://github.com/badakbesi/zevrigo/blob/main/SUMBER_RESMI.md), DEC-40); jangan diganti di repo ini.
