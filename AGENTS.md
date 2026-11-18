# AGENTS.md: Blog resmi Zevrigo (DEC-37)

Situs statis Next.js (static export) dengan artikel Markdown di `posts/`. Disajikan `zevrigo-demo web` di container `blog`,
hostname `zevrigo-blog.ratuaurion.store`. Bukan crate Rust.

## Hubungan dengan repo inti
Repo ini bagian dari **zevrigo_lab** (pemisahan repo 17 November 2026, AGENDA P1). Repo inti `zevrigo` di folder sebelah
(`../zevrigo`) adalah sumber kebenaran: parameter protokol, aturan konsensus, larangan mutlak, pembagian peran (DEC-16),
keputusan (`docs/decisions`), peta modul, dan penomoran DEC/MOD/TSK. **Baca `../zevrigo/AGENTS.md` dulu; semua aturannya
berlaku di sini.** Bila aturan di file ini dan di repo inti bertentangan, ikuti repo inti dan laporkan.

## Larangan mutlak (ringkas, rincian di repo inti)
- Tanpa `unsafe` dan tanpa floating point di kode proyek, termasuk test. `make check-forbidden` memeriksanya.
- Jumlah koin selalu `u128` quanta di Rust; di TypeScript `bigint` atau `string`, tidak pernah `number`.
- Aturan konsensus hanya di crate `zevrigo-consensus` repo inti. Repo ini tidak menulis aturan konsensus.
- Menambah atau mengubah versi dependensi wajib minta izin pencipta.

## Git
- Conventional Commits. Jangan `git push`, jangan force, jangan mengubah riwayat, remote, identitas, atau `git config`.
  Push dilakukan pencipta (DEC-32). Jangan memakai GitHub CLI atau akun online tanpa izin tertulis.
- Status sekarang: **belum repo git** (keputusan git menunggu pencipta).

## Perintah
```bash
make blog-check   # npm ci, typecheck, vitest (uji artikel), next build ke out/
```

## Khusus repo ini
- Isi artikel hanya dari fakta repo. Uji `lib/blog.spec.ts` menolak frasa klaim investasi dan penulis rekaan. Penulis: Badak Besi.
- Halaman `/unduh/` (`lib/unduhan.ts`): berkas di GitHub Releases, `sha256` dari `SHA256SUMS.txt` rilis yang terbit.
- Paket npm sama persis dengan antarmuka web explorer (package-lock identik kecuali nama dan versi).

## Berhenti dan tanya bila
- Ada parameter protokol yang tampak salah, atau tugas butuh dependensi baru, `sudo`, atau perubahan di luar repo ini.
- Perlu mengubah crate di repo inti `zevrigo` (itu tugas terpisah di repo inti).
