---
judul: Wallet Zevrigo 0.3.1 dan aplikasi Explorer 0.1.0 untuk Windows dan Android
ringkasan: Rilis publik pertama aplikasi Zevrigo untuk jaringan demo regtest. Wallet dengan scan QR, pratinjau biaya, kirim semua saldo, dan kunci aplikasi, serta aplikasi explorer, masing-masing untuk Windows dan Android.
tanggal: 2026-11-21
kategori: Pengumuman
penulis: Badak Besi
---
> Catatan 28 November 2026: wallet 0.3.1 dan aplikasi Explorer 0.1.0 tidak tersambung lagi ke jaringan demo. Pasang versi terbaru dari [halaman Unduh](/unduh/).

Pada 21 November 2026 kami menerbitkan rilis publik pertama aplikasi Zevrigo: **wallet 0.3.1** dan **aplikasi Explorer 0.1.0**, masing-masing untuk Windows dan Android. Semuanya untuk jaringan demo regtest. Koin demo tidak bernilai, tidak bisa dijual, dan bisa hilang saat jaringan di-reset.

Berkas dan sidik SHA-256-nya ada di [halaman Unduh](/unduh/).

## Wallet 0.3.1

Rilis wallet ditunda sampai tujuh fitur dasar selesai. Semuanya sudah diuji di HP dan komputer pengembang:

- **Scan kode QR** di layar Kirim, memakai kamera HP atau webcam. Alamat dan jumlah terisi otomatis.
- **URI pembayaran** `zevrigo:` yang dibuat layar Terima bisa ditempel di layar Kirim.
- **Pratinjau biaya**: jumlah yang diterima, biaya, total keluar, dan kembalian tampil sebelum password diminta. Kalau saldo berubah di antara pratinjau dan pengiriman, wallet tidak menandatangani dan menampilkan angka baru.
- **Kirim semua**: tombol Semua mengirim seluruh saldo yang bisa dipakai, biaya dipotong dari jumlah itu, tanpa kembalian.
- **Tombol Explorer** membuka transaksi di explorer resmi.
- **Pesan galat lengkap** dengan detail teknis yang bisa disalin untuk dilaporkan.
- **Kunci aplikasi** dengan password wallet: saat aplikasi dibuka dan sesudah 1 menit di latar belakang. Bisa dimatikan di Pengaturan.

Versi 0.3.1 juga memperbaiki galat "Request rejected 429" pada wallet yang baru dipasang. Wallet membaca riwayat dari blok pertama, dan gerbang RPC demo membatasi jumlah permintaan per detik. Sekarang wallet menunggu lalu mencoba lagi bila dibatasi, menyimpan kemajuan pembacaan riwayat setiap 100 blok, dan tetap menampilkan saldo bila riwayat belum selesai dibaca.

APK Android berjalan di HP 64-bit dan 32-bit dengan Android 7.0 atau lebih baru, dan ditandatangani kunci rilis Zevrigo. Sidik sertifikatnya tercantum di halaman Unduh. Jangan memasang APK Zevrigo dari sumber lain.

## Aplikasi Explorer 0.1.0

Aplikasi Explorer membuka [explorer resmi](https://demo-explorer.zevrigo.online) di jendelanya sendiri: blok, transaksi, dan faucet jaringan demo. Aplikasi ini tidak menyimpan dan tidak mengirim data sendiri, tidak meminta izin kamera, dan hanya membuka halaman explorer resmi. Karena isinya dari explorer publik, aplikasi butuh internet.

## Yang belum

- Installer Windows belum ditandatangani, jadi Windows SmartScreen masih menampilkan peringatan. Periksa SHA-256 sebelum memasang.
- Belum ada buku alamat, detail lengkap transaksi, saldo per alamat, dan notifikasi koin masuk. Fitur-fitur itu direncanakan sesudah rilis ini.
- Jaringan demo berjalan di satu VPS dan satu komputer penambang, jadi bisa sesekali berhenti sebentar.

Belum pernah mencoba? Ikuti [panduan wallet dan faucet](/artikel/panduan-wallet-dan-faucet/).
