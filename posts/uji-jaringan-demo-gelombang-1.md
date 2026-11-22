---
judul: Ikut menguji jaringan demo Zevrigo, gelombang 1
ringkasan: Kami mengundang 5 sampai 10 orang untuk mencoba wallet Zevrigo di Windows atau Android selama seminggu: ambil koin demo dari faucet, saling kirim, lalu ceritakan apa yang tidak jalan.
tanggal: 2026-11-22
kategori: Pengumuman
penulis: Badak Besi
---
Kami membuka uji gelombang 1 jaringan demo Zevrigo untuk 5 sampai 10 orang yang diundang langsung, selama satu minggu sejak
undangan dikirim. Tujuannya sederhana: melihat apakah orang yang belum pernah memakai Zevrigo bisa memasang wallet, mendapat
koin demo, dan mengirim transaksi tanpa bantuan, dan menemukan masalah yang belum terlihat dari perangkat kami sendiri.

## Ini jaringan demo

Jaringan ini memakai mode **regtest**. Koin ZVRG di sini adalah koin demo: tidak bernilai, tidak dijual, dan tidak akan ditukar
ke testnet atau mainnet. Chain demo bisa direset, dan karena Proof of Work regtest sangat murah, siapa pun yang menambang bisa
menulis ulang riwayatnya. Jangan menerima koin demo sebagai pembayaran apa pun. Uji ini bukan investasi dan tidak ada hadiah.

## Yang kami minta dicoba

1. Pasang wallet 0.3.1 dari [halaman Unduh](/unduh/), untuk Windows atau Android, dan cocokkan sidik SHA-256-nya.
2. Buat wallet baru dan tulis 24 kata pemulihan di kertas.
3. Minta 100 ZVRG demo dari [faucet](https://zevrigo.ratuaurion.store/faucet/).
4. Kirim sebagian koin ke peserta lain, dengan menempel alamat atau scan QR. Coba juga tombol **Semua**.
5. Buka transaksinya di explorer, di peramban, di aplikasi Explorer, atau di HP.
6. Coba kunci aplikasi: tinggalkan wallet di latar belakang lebih dari 1 menit, lalu buka lagi dengan password.

Langkah lengkapnya ada di [panduan wallet dan faucet](/artikel/panduan-wallet-dan-faucet/). Menjalankan node sendiri dan
menambang belum termasuk gelombang ini; keduanya direncanakan untuk gelombang berikutnya.

## Batas faucet

100 ZVRG per permintaan. Satu alamat bisa meminta sekali setiap 24 jam, dan satu pengunjung paling banyak 5 kali setiap 24 jam.
Untuk semua pengunjung bersama, paling banyak 100 permintaan per hari, diisi ulang pukul 00.00 UTC (07.00 WIB).

## Keamanan

- Unduh wallet hanya dari halaman Unduh blog ini atau halaman rilis GitHub `badakbesi/zevrigo-wallet`. APK resmi ditandatangani
  sertifikat dengan sidik SHA-256 `1575be5a086d9242ec0661108cba4fd71276d0e94a40bca33749f991e9e30c1a`.
- Installer Windows belum bertanda tangan kode, jadi Windows SmartScreen menampilkan peringatan. Jalankan hanya bila SHA-256
  cocok.
- 24 kata pemulihan dan password tidak pernah diminta siapa pun, termasuk kami. Siapa pun yang memintanya bukan dari tim
  Zevrigo.

## Cara melapor

Ada dua jalur:

- **Grup chat peserta**, untuk bertanya dan bercerita. Tautannya ada di pesan undangan.
- **[GitHub Issues](https://github.com/badakbesi/zevrigo/issues)**, untuk masalah yang perlu diperbaiki. Pilih templat
  **Laporan uji jaringan demo**. Laporan di sana publik. Kalau Anda tidak punya akun GitHub, cukup tulis di grup; kami yang
  memindahkannya.

Yang paling membantu dalam laporan:

- perangkat dan versi sistem (misalnya Windows 11, atau Android 14 di HP merek apa);
- versi wallet (lihat **Pengaturan**);
- apa yang Anda lakukan, langkah demi langkah;
- apa yang terjadi, dan apa yang Anda harapkan;
- tangkapan layar, **tanpa** 24 kata dan tanpa password.

Hal kecil juga berguna: teks yang membingungkan, tombol yang sulit ditemukan, atau tampilan yang terpotong di HP.

## Yang belum ada

Buku alamat, detail lengkap transaksi, saldo per alamat, dan notifikasi koin masuk belum ada di wallet 0.3.1. Fitur-fitur itu
direncanakan sesudah rilis ini.

## Privasi

Gerbang RPC melihat alamat yang dicek wallet Anda, karena dari situlah wallet membaca saldo. Gerbang dan faucet tidak menyimpan
alamat IP. Faucet menyimpan alamat penerima selama 24 jam untuk batas satu kali per alamat. Wallet tidak memakai analitik.

Sesudah gelombang ini selesai, kami akan menulis ringkasan temuan dan perbaikannya di blog ini.
