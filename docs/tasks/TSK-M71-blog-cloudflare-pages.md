# TSK-M71 · Blog di Cloudflare Pages · 🟡 · Prioritas: Sedang
- **Jenis:** task repo · **Repo:** zevrigo-blog · **Bergantung pada:** TSK-M64 (blog), Q179 (halaman unduh rilis)
- **Ditulis:** Quick, 21 November 2026 (pencipta 16.03: "zevrigo blog bisa di pasang langsung di cloudflare"; 16.04: Pages
  terhubung ke GitHub)

## Alasan
Blog statis tidak butuh VPS. Di VPS blog ikut mati bila VPS atau tunnel bermasalah, dan setiap pembaruan butuh skrip SSH.
Cloudflare Pages membangun dan menerbitkan blog dari GitHub setiap push ke `main`.

## Isi
| Hal | Keputusan |
|---|---|
| Kepala keamanan | `scripts/headers.mjs` menulis `out/_headers` saat `npm run build`: `/*` (nosniff, tanpa referrer, kebijakan keamanan konten dengan hash skrip `404.html`), `/_next/static/*` cache immutable, `*.pages.dev` noindex, lalu satu aturan per halaman yang melepas kebijakan umum dan memasang kebijakan dengan hash skrip inline halaman itu. Aturan dan vektor uji sama dengan `zevrigo-demo web` (MOD-18 `src/site`) |
| Build | `SKIP_DEPENDENCY_INSTALL=1`, perintah `npm ci --ignore-scripts --no-audit --no-fund && npm run build`, keluaran `out`, Node dari `.node-version` (24.22.0, sama dengan image Docker) |
| Domain | `zevrigo.online` dan `www.zevrigo.online` di proyek Pages (CNAME dibuat Cloudflare); rute tunnel blog dihapus |
| Sesudahnya | Layanan `blog` di VPS (compose `zevrigo-demo`) dihapus pada langkah terpisah, sesudah Pages terbukti jalan |

Tanpa dependensi baru (hanya pustaka bawaan Node.js); `package-lock.json` tetap. Batas Pages: 100 aturan `_headers`, 2.000
karakter per baris; blog sekarang 14 aturan, baris terpanjang sekitar 400 karakter.

## Uji
- `lib/headers.spec.ts`: kebijakan dasar sama dengan MOD-18, hash skrip inline dengan vektor MOD-18 (termasuk contoh CSP
  Level 3), jalur halaman, urutan aturan dan pelepasan kebijakan umum, panjang baris.
- `make blog-check`; `out/_headers` dicocokkan dengan pemeriksa Python terpisah (Q180).
- Sesudah terbit: semua halaman 200 dengan satu kebijakan yang memuat hash skrip halaman itu, 404 untuk halaman tidak ada,
  `*.pages.dev` noindex (Q180 `q180_cek.py`).
