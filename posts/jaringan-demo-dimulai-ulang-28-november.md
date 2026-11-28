---
judul: Jaringan demo Zevrigo dimulai ulang pada 28 November 2026
ringkasan: Semua blok, transaksi, dan saldo demo sebelum 28 November 2026 dihapus. Alamat seed baru, delapan kantong baru, satu server resmi, dan artinya bagi wallet dan Zevrigo Node.
tanggal: 2026-11-28
kategori: Pengumuman
penulis: Badak Besi
sampul: /sampul/kisi-batu.jpg
unggulan: ya
---
**Jaringan demo regtest dimulai ulang pada 28 November 2026.** Semua blok, transaksi, dan saldo demo sebelum tanggal itu dihapus. Alamat seed baru:

```
/dns4/demo-seed-p2p.zevrigo.online/tcp/443/tls/sni/demo-seed-p2p.zevrigo.online/ws/p2p/12D3KooWPdd2VH92LVRwJNrokxKQJCerctJNksErJn5PB53kbEsD
```

Nama alamatnya sama, tetapi kunci seed baru, jadi bagian akhirnya (PeerId) berganti. Selama dimulai ulang, explorer, faucet, dan gerbang RPC tidak bisa dibuka. Jaringan dibuka lagi sesudah upacara di blok 100 selesai.

## Apa artinya bagi Anda

- **Wallet** tetap bisa dipakai dengan 24 kata yang sama, tetapi saldonya mulai dari nol. Wallet tidak perlu diganti dan tidak perlu dipasang ulang. Sesudah jaringan dibuka, minta koin demo lagi dari [faucet](https://demo-explorer.zevrigo.online/faucet/).
- **Zevrigo Node (desktop dan Android) dan paket node yang sudah terpasang** masih mengenal alamat seed lama, jadi belum bisa tersambung sampai versi barunya terbit. Kabar rilisnya diumumkan di blog ini.
- **Node yang dijalankan sendiri dari baris perintah** bisa disambungkan dengan `--connect` dan alamat seed di atas.

## Mengapa dimulai ulang

Beberapa hari terakhir jaringan demo sempat dijalankan dari tiga server dengan alamat berbeda untuk tiap server. Susunan itu membingungkan: wallet dan aplikasi tetap hanya memakai satu set alamat, sedangkan server tambahan sulit dipasang dan dirawat. Kami membersihkan seluruh susunan lama sampai tuntas, lalu memulai lagi dari blok genesis dengan satu server resmi, kunci seed baru, dan wallet operator baru.

## Batas yang perlu diketahui

Jaringan demo memakai Proof of Work regtest yang sangat murah. Siapa pun yang menjalankan node dan penambang bisa membuat chain lebih panjang dan menulis ulang riwayat jaringan demo. Itu disengaja agar siapa pun bisa mencoba menambang tanpa alat khusus. Koin demo tidak bernilai, tidak bisa dijual, dan bisa hilang saat reset atau saat chain ditulis ulang. Jangan menerima koin demo sebagai pembayaran apa pun.

Layanan publik (seed, explorer, gerbang RPC, dan faucet) berjalan dari satu server. Penambang demo utama berjalan di komputer pengembang. Kalau komputer itu mati, server menambang satu blok setiap kali chain diam lima menit. Kalau server itu mati, layanan publik ikut berhenti sampai server hidup lagi.

## Delapan kantong baru

Seperti peluncuran sebelumnya, alokasi genesis 10.000.000 ZVRG dibagi ke delapan kantong dalam satu transaksi upacara di blok 100, selagi jaringan masih tertutup. Kunci rahasia alokasi genesis regtest sengaja publik, jadi jaringan baru dibuka sesudah upacara selesai.

| Kantong | Jumlah (ZVRG) | Alamat |
|---|---|---|
| Pre-Seed | 1.000.000 | `rzvrg1q3xsws2xnlrxkukg5nrthhraaawjdgl8nc0xw0af7cckc95fgzfgqfgr8ls` |
| Seed | 1.000.000 | `rzvrg1qnmfann4kh047l2jktuwxcmua62ektgptq6mc9tk7fs565pcaxyvqk2sphv` |
| Private | 1.500.000 | `rzvrg1q0va5prgn6qestlejax3sdhvh3t55j5dsczxxzpmqunlt72p5nt6sk2g9ea` |
| Genesis Contributors | 1.500.000 | `rzvrg1qmuesn6jgk388d0ktayvw9x3ndpw76aq3vl3xtyfty3a5j9ky2g5sn9pwdw` |
| Likuiditas | 1.000.000 | `rzvrg1qukqculdpws06t7ycr5px2tkvla0px2p06pfqhpf64y8p2vz0z89sdz8h33` |
| Operasional | 1.500.000 | `rzvrg1qsp0u9qsz5qrp9r2rs086w9lpp2lwa8dqvv7k0g9ceurd8v9wx8eqn7xgx4` |
| Pencipta | 2.000.000 | `rzvrg1qr80v4kj09ge4hk2t644rg2py7ck2cr7hmk6d5g5xy2nt73tatwcqvnz0tz` |
| Faucet | 500.000 dikurangi biaya | `rzvrg1q5tllh2wzy434aztzwwjd43gc6tp2krpmxnxam2de6ang4rfpfttqtrrtge` |

Nama dan jumlah kantong ini adalah contoh demo. Porsi alokasi untuk mainnet belum diputuskan. Faucet diisi bertahap dari kantong Faucet, dimulai dengan 50.000 ZVRG.

## Memeriksa sendiri

Sesudah jaringan dibuka, transaksi upacara ada di [blok 100 di explorer](https://demo-explorer.zevrigo.online/block/?id=100). Contoh di bawah memeriksa kantong Pencipta lewat gerbang RPC:

```bash
curl -s https://demo-gerbang-rpc.zevrigo.online \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"scan_utxos","params":{"payloads":["19decada4f2a335bd94bd56a342824f62cac0fd7ddb4da228622a6bf457d5bb0"]}}'
```

Selama kantong itu belum dipakai, jawabannya berisi satu output dengan `amount` `2000000000000000000000000`, yaitu 2.000.000 ZVRG dalam quanta.

Sumber resmi jaringan, repo, dan rilis Zevrigo tercantum di [SUMBER_RESMI.md](https://github.com/badakbesi/zevrigo/blob/main/SUMBER_RESMI.md). Untuk mencoba wallet, ikuti [panduan mencoba wallet dan faucet](/artikel/panduan-wallet-dan-faucet/).
