---
judul: Panduan: mencoba wallet Zevrigo dan faucet demo
ringkasan: Pasang wallet Zevrigo di Windows atau Android, simpan 24 kata pemulihan, minta 100 ZVRG demo dari faucet, lalu kirim transaksi pertama Anda. Sekitar 10 menit.
tanggal: 2026-11-15
kategori: Panduan
penulis: Badak Besi
---
Panduan ini untuk siapa saja yang ingin mencoba Zevrigo tanpa menjalankan node sendiri. Yang dibutuhkan hanya komputer Windows atau HP Android, dan koneksi internet. Semua koin di panduan ini adalah koin demo regtest yang tidak bernilai.

## 1. Pasang wallet

Buka [halaman Unduh](/unduh/), lalu unduh installer Windows `zevrigo-wallet-0.3.1-x64-setup.exe` atau APK Android `zevrigo-wallet-0.3.1-android.apk`. Berkasnya disimpan di halaman rilis GitHub proyek, bersama sidik SHA-256-nya. Sebelum memasang, cocokkan sidik berkasnya, misalnya di PowerShell:

```powershell
Get-FileHash .\zevrigo-wallet-0.3.1-x64-setup.exe -Algorithm SHA256
```

Angka yang keluar harus sama persis dengan sidik SHA-256 di halaman Unduh dan di halaman rilis. Kalau berbeda, jangan dipasang.

Installer Windows belum ditandatangani, jadi Windows SmartScreen akan menampilkan peringatan. Pilih **Info selengkapnya**, lalu **Tetap jalankan**. Sebelum memasang, installer menampilkan kebijakan privasi dan lisensi. Di Android, izinkan pemasangan dari browser atau aplikasi berkas yang Anda pakai, sekali saja.

## 2. Buat wallet dan simpan 24 kata

1. Buka Zevrigo Wallet, pilih **Wallet baru**, lalu **Buat frasa pemulihan**.
2. Tulis 24 kata yang muncul di kertas, dengan urutan yang benar. Jangan memotret layar dan jangan menyimpannya di chat.
3. Isi beberapa kata yang diminta dari catatan Anda, lalu buat password minimal 8 karakter.
4. Tekan **Simpan wallet**.

24 kata itu adalah satu-satunya cadangan wallet Anda. Siapa pun yang memegangnya bisa memakai koin Anda. Jangan pernah membagikannya, termasuk kepada orang yang mengaku dari tim Zevrigo.

Password mengunci frasa di perangkat ini, dan juga dipakai membuka wallet setiap kali aplikasi dibuka atau sesudah 1 menit di latar belakang. Kunci aplikasi ini bisa dimatikan di **Pengaturan**. Kalau password lupa, wallet bisa dipulihkan dengan 24 kata lewat **Pulihkan dari frasa**.

## 3. Pastikan wallet terhubung

Wallet 0.3 langsung memakai jaringan **Regtest**, dengan node bawaan gerbang demo `https://zevrigo-rpc.ratuaurion.store`. Di bar status atas harus tertulis **Terhubung** beserta tinggi blok. Pita kuning REGTEST mengingatkan bahwa ini jaringan demo.

## 4. Minta koin demo dari faucet

1. Buka menu **Terima**, lalu salin alamat Anda atau tunjukkan kode QR-nya. Alamat regtest selalu diawali `rzvrg1q`.
2. Buka [halaman faucet](https://demo-explorer.zevrigo.online/faucet/), tempel alamatnya, lalu tekan **Kirim koin**.
3. Tunggu sekitar 2 menit sampai transaksinya masuk blok. Saldo di **Ringkasan** akan bertambah 100 ZVRG.

Batas faucet: 100 ZVRG per permintaan. Satu alamat bisa meminta sekali setiap 24 jam, dan satu pengunjung paling banyak 5 kali setiap 24 jam. Untuk semua pengunjung bersama, paling banyak 100 permintaan per hari, diisi ulang setiap pukul 00.00 UTC, atau 07.00 WIB.

## 5. Kirim transaksi pertama

1. Buka menu **Kirim**, isi alamat tujuan (atau tekan **Scan QR**) dan jumlah. Tombol **Semua** mengirim seluruh saldo yang bisa dipakai.
2. Tekan **Periksa dan tanda tangani**. Layar konfirmasi menampilkan jumlah yang diterima, biaya, total keluar, dan kembalian sebelum password diminta. Biaya bawaan 1 quanta per byte, sekitar 190 quanta untuk transaksi biasa; angka itu sangat kecil, karena 1 ZVRG sama dengan 10^18 quanta.
3. Masukkan password, lalu kirim.
4. Transaksi masuk blok dalam sekitar 2 menit, dan bisa dilihat di **Riwayat**. Tombol **Explorer** membuka transaksinya di explorer.

## Soal privasi

Gerbang RPC melihat alamat yang dicek wallet Anda, karena dari situlah wallet membaca saldo. Gerbang dan faucet tidak menyimpan alamat IP. Faucet menyimpan alamat penerima selama 24 jam, untuk menegakkan batas satu kali per alamat. Wallet tidak memakai analitik.

Kalau ingin tidak bergantung pada gerbang, Anda bisa menjalankan node sendiri lalu mengganti alamat node di **Pengaturan**.

Isi rilis wallet 0.3.1 dan aplikasi explorer ada di [artikel rilis](/artikel/rilis-wallet-dan-explorer/).
