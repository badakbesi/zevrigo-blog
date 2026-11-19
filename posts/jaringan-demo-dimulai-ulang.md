---
judul: Jaringan demo Zevrigo dimulai ulang pada 19 November 2026
ringkasan: Semua blok, transaksi, dan saldo demo sebelum 19 November 2026 dihapus. Alamat seed baru, delapan kantong baru, dan penjelasan jujur tentang batas jaringan demo.
tanggal: 2026-11-19
kategori: Pengumuman
penulis: Badak Besi
sampul: /sampul/kisi-batu.jpg
unggulan: ya
---
**Jaringan demo regtest dimulai ulang pada 19 November 2026.** Semua blok, transaksi, dan saldo demo sebelum tanggal itu dihapus. Alamat seed baru:

```
/dns4/zevrigo-seed.ratuaurion.store/tcp/443/tls/sni/zevrigo-seed.ratuaurion.store/ws/p2p/12D3KooWABPBsu8gZWtL7bbeEPjg6gwRPDbp3GZidpTeUC95rRDo
```

Wallet lama tetap bisa dipakai dengan 24 kata yang sama, tetapi saldonya mulai dari nol. Wallet tidak perlu diganti dan tidak perlu dipasang ulang.

## Mengapa dimulai ulang

Sejak 18 November 2026 kode Zevrigo dipisah menjadi lima repo resmi, dan jaringan demo sekarang dibangun dari kode terbaru itu. Chain lama berisi data uji dari beberapa minggu percobaan. Daripada membawanya, kami memulai chain baru dari blok genesis, dengan kunci seed baru dan wallet operator baru.

Sesudah dimulai ulang, jaringan demo diuji dan diukur selama beberapa hari: waktu antarblok, ketersediaan layanan, sinkronisasi node baru, dan perilaku saat komputer penambang mati. Hasilnya dipakai untuk memperbaiki jaringan sebelum rilis wallet berikutnya.

## Batas yang perlu diketahui

Jaringan demo memakai Proof of Work regtest yang sangat murah. Siapa pun yang menjalankan node dan penambang bisa membuat chain lebih panjang dan menulis ulang riwayat jaringan demo. Itu disengaja agar siapa pun bisa mencoba menambang tanpa alat khusus. Koin demo tidak bernilai, tidak bisa dijual, dan bisa hilang saat reset atau saat chain ditulis ulang. Jangan menerima koin demo sebagai pembayaran apa pun.

Layanan publik (seed, explorer, gerbang RPC, faucet, dan blog ini) berjalan dari satu server. Penambang demo berjalan di komputer pengembang. Kalau komputer itu mati, tidak ada blok baru sampai dinyalakan lagi, tetapi explorer, faucet, dan gerbang RPC tetap bisa dibuka.

## Delapan kantong baru

Seperti peluncuran sebelumnya, alokasi genesis 10.000.000 ZVRG dibagi ke delapan kantong dalam satu transaksi upacara di blok 100, selagi jaringan masih tertutup. Kunci rahasia alokasi genesis regtest sengaja publik, jadi jaringan baru dibuka sesudah upacara selesai.

| Kantong | Jumlah (ZVRG) | Alamat |
|---|---|---|
| Pre-Seed | 1.000.000 | `rzvrg1qjdyrjv4zg5ykef5f7ww7vpysezk543yj6w50tmnwkmutjtjxcekqz5cp69` |
| Seed | 1.000.000 | `rzvrg1q77jghcm3xgk7s4zgu64p3ceyhdrppr8mm6sw7hh0gzr8aptx6vpsnlv4xv` |
| Private | 1.500.000 | `rzvrg1qh4m6ath4lnk0xhx9uhzgq4tt6at0sn4z4pm78pdzd00cmqlsvr0syf6597` |
| Genesis Contributors | 1.500.000 | `rzvrg1qgxq7hc5tschpg5g6kc2mvmamtdltx0j85h8j6fgdg7ty982c83fqu3j24w` |
| Likuiditas | 1.000.000 | `rzvrg1qpxpyvzf7fnasr5zmyyeqfhhtsy0acnvuynk7zm2nygx25exq8crqfw6797` |
| Operasional | 1.500.000 | `rzvrg1qwcqx6rnfgn5z7lwrusxc5xu9j8s39p8jwank64gm3mhcpyxg92hqt6a8c6` |
| Pencipta | 2.000.000 | `rzvrg1qtrsgx2q9fhh3qsssr54m0qw0vywrkkncxuvnlpers0jm8f7zm9fqs6lekf` |
| Faucet | 500.000 dikurangi biaya | `rzvrg1qu36h6gja0hwpwl0h5c27k26zat9cs982fg46vfezeplj5pgysn5qrrf2rg` |

Nama dan jumlah kantong ini adalah contoh demo. Porsi alokasi untuk mainnet belum diputuskan. Faucet diisi bertahap dari kantong Faucet.

## Memeriksa sendiri

Transaksi upacara ada di [blok 100 di explorer](https://zevrigo.ratuaurion.store/block/?id=100). Contoh di bawah memeriksa kantong Pencipta lewat gerbang RPC:

```bash
curl -s https://zevrigo-rpc.ratuaurion.store \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"scan_utxos","params":{"payloads":["58e08328054def1042101d2bb781cf611c3b5a7837193f872383e5b3a7c2d952"]}}'
```

Selama kantong itu belum dipakai, jawabannya berisi satu output dengan `amount` `2000000000000000000000000`, yaitu 2.000.000 ZVRG dalam quanta.

Sumber resmi jaringan, repo, dan rilis Zevrigo tercantum di [SUMBER_RESMI.md](https://github.com/badakbesi/zevrigo/blob/main/SUMBER_RESMI.md). Untuk mencoba wallet, ikuti [panduan mencoba wallet dan faucet](/artikel/panduan-wallet-dan-faucet/).
