/**
 * Daftar unduhan untuk halaman `/unduh/` (TSK-M64, keputusan pencipta 15 November 2026): halaman di blog, berkasnya di
 * GitHub Releases proyek. Blog tidak menyajikan berkas besar sendiri.
 *
 * `sha256` disalin dari rilis yang sudah terbit (tabel catatan rilis dan `SHA256SUMS.txt` installer; APK ditandatangani
 * pencipta di PC dan diunggah bersama sidiknya), agar sidik berkas tampil di dua tempat: halaman ini dan halaman rilis.
 * Rilis pertama 21 November 2026: wallet 0.3.1 dan aplikasi explorer 0.1.0, masing-masing Windows dan Android. Sejak
 * 23 November 2026 wallet 0.3.2 dan aplikasi explorer 0.1.1 (domain resmi zevrigo.online, DEC-42), ditambah AppImage Linux
 * x86_64 di rilis yang sama (RENCANA_T14 bagian 5a, Q188; SHA-256 dari rilis dan `SHA256SUMS.txt`). Sejak 24 November 2026 juga
 * paket peserta (node, penambang, CLI, skrip awal) rilis `peserta-demo-zevrigo` di repo zevrigo-demo (RENCANA_T14 bagian 5b,
 * Q193/Q193b; SHA-256 dari rilis dan `SHA256SUMS.txt`, diuji menambang di Linux dan Windows). Sejak 24 November 2026 sore juga
 * aplikasi Zevrigo Node 0.1.0 (node dan penambang dengan antarmuka, DEC-44) rilis `zevrigo-demo-gui` di repo zevrigo-demo: installer
 * Windows dan AppImage Linux (RENCANA_T16, Q194d; SHA-256 dari rilis dan `SHA256SUMS.txt`, diuji menambang di kedua sistem). Sejak
 * 26 November 2026 juga Zevrigo Node untuk Android (mode VPS: memasang dan mengendalikan node di VPS milik pengguna lewat SSH,
 * DEC-46) rilis pre-release `demo-zevrigo-node-android` di repo zevrigo-demo (RENCANA_T17, Q199c/Q199d; APK ditandatangani pencipta,
 * diuji di HP ke VPS demo).
 */

// Sejak DEC-39 dan pindah akun (DEC-08, 17 November 2026) rilis ada di repo aplikasi masing-masing akun badakbesi.
export const WALLET_RELEASES_URL = 'https://github.com/badakbesi/zevrigo-wallet/releases';
export const EXPLORER_RELEASES_URL = 'https://github.com/badakbesi/zevrigo-explorer/releases';
export const DEMO_RELEASES_URL = 'https://github.com/badakbesi/zevrigo-demo/releases';

/** Sidik SHA-256 sertifikat kunci rilis APK Zevrigo (sama untuk wallet dan explorer, SUMBER_RESMI.md repo inti). */
export const SIDIK_SERTIFIKAT_APK = '1575be5a086d9242ec0661108cba4fd71276d0e94a40bca33749f991e9e30c1a';

export type Unduhan = {
  id:
    | 'wallet-windows'
    | 'wallet-linux'
    | 'wallet-android'
    | 'explorer-windows'
    | 'explorer-linux'
    | 'explorer-android'
    | 'node-windows'
    | 'node-linux'
    | 'node-android';
  aplikasi: 'Wallet' | 'Explorer' | 'Node';
  platform: 'Windows' | 'Linux' | 'Android';
  syarat: string;
  status: 'tersedia' | 'segera';
  versi: string;
  /**
   * Tag rilis GitHub, misalnya `wallet-v0.3.1`; Zevrigo Node memakai tag tanpa versi `zevrigo-demo-gui` (desktop) dan
   * `demo-zevrigo-node-android` (Android), nama dari pencipta.
   */
  tag: string;
  /** Halaman Releases repo aplikasi. */
  rilisUrl: string;
  /** Hanya untuk status `tersedia`. */
  berkas?: {
    nama: string;
    url: string;
    halamanRilis: string;
    sha256: string;
    /** Ukuran berkas untuk dibaca, misalnya `3,4 MB` (teks tetap, tanpa hitungan pecahan). */
    ukuran: string;
  };
  catatan: string[];
};

function berkas(rilisUrl: string, tag: string, nama: string, sha256: string, ukuran: string) {
  return {
    nama,
    url: `${rilisUrl}/download/${tag}/${nama}`,
    halamanRilis: `${rilisUrl}/tag/${tag}`,
    sha256,
    ukuran,
  };
}

const WALLET_TAG = 'wallet-v0.3.2';
const EXPLORER_TAG = 'explorer-app-v0.1.1';
/** Tag rilis aplikasi Zevrigo Node (pencipta 24 November 2026), tanpa nomor versi; versi ada di nama berkas. */
export const NODE_TAG = 'zevrigo-demo-gui';
/** Tag rilis Zevrigo Node untuk Android (pencipta 25 November 2026), tanpa nomor versi. */
export const NODE_ANDROID_TAG = 'demo-zevrigo-node-android';

export const UNDUHAN: Unduhan[] = [
  {
    id: 'wallet-windows',
    aplikasi: 'Wallet',
    platform: 'Windows',
    syarat: 'Windows 10 atau 11, 64-bit',
    status: 'tersedia',
    versi: '0.3.2',
    tag: WALLET_TAG,
    rilisUrl: WALLET_RELEASES_URL,
    berkas: berkas(
      WALLET_RELEASES_URL,
      WALLET_TAG,
      'zevrigo-wallet-0.3.2-x64-setup.exe',
      'e8de5eed972c51f722c46e18a45a53b41e1ff5dd710c06856ea15d995f80b2f9',
      '3,4 MB',
    ),
    catatan: [
      'Dibangun GitHub Actions dari kode sumber pada tag wallet-v0.3.2.',
      'Installer belum ditandatangani, jadi Windows SmartScreen menampilkan peringatan. Pilih Info selengkapnya lalu Tetap jalankan, hanya jika SHA-256 cocok.',
      'Langsung memakai jaringan demo regtest lewat gerbang demo-gerbang-rpc.zevrigo.online.',
    ],
  },
  {
    id: 'wallet-linux',
    aplikasi: 'Wallet',
    platform: 'Linux',
    syarat: 'Linux x86_64 dengan glibc 2.35 atau lebih baru, misalnya Ubuntu 22.04 atau Debian 12 ke atas',
    status: 'tersedia',
    versi: '0.3.2',
    tag: WALLET_TAG,
    rilisUrl: WALLET_RELEASES_URL,
    berkas: berkas(
      WALLET_RELEASES_URL,
      WALLET_TAG,
      'zevrigo-wallet-0.3.2-x86_64.AppImage',
      'a943ab7b9433c8a1bbfff9c61ee2f3aaa821c4c926fb697dc19568faa93e34f0',
      '80,8 MB',
    ),
    catatan: [
      'Dibangun GitHub Actions di ubuntu-22.04 dari kode sumber pada tag wallet-v0.3.2, sama dengan installer Windows.',
      'AppImage dijalankan langsung tanpa dipasang. Belum ditandatangani; jalankan hanya jika SHA-256 cocok.',
      'Langsung memakai jaringan demo regtest lewat gerbang demo-gerbang-rpc.zevrigo.online.',
    ],
  },
  {
    id: 'wallet-android',
    aplikasi: 'Wallet',
    platform: 'Android',
    syarat: 'Android 7.0 atau lebih baru, HP 64-bit atau 32-bit',
    status: 'tersedia',
    versi: '0.3.2',
    tag: WALLET_TAG,
    rilisUrl: WALLET_RELEASES_URL,
    berkas: berkas(
      WALLET_RELEASES_URL,
      WALLET_TAG,
      'zevrigo-wallet-0.3.2-android.apk',
      '21300e623870c922d7d008aa32d1cc46173b1ee6686895b93750762b725ab58b',
      '27,9 MB',
    ),
    catatan: [
      'APK rilis bertanda tangan kunci rilis Zevrigo. Android meminta izin memasang aplikasi dari sumber ini sekali.',
      'Kamera dipakai hanya saat Anda menekan Scan QR di layar Kirim.',
      'Jangan memasang APK Zevrigo dari sumber lain.',
    ],
  },
  {
    id: 'explorer-windows',
    aplikasi: 'Explorer',
    platform: 'Windows',
    syarat: 'Windows 10 atau 11, 64-bit, dengan internet',
    status: 'tersedia',
    versi: '0.1.1',
    tag: EXPLORER_TAG,
    rilisUrl: EXPLORER_RELEASES_URL,
    berkas: berkas(
      EXPLORER_RELEASES_URL,
      EXPLORER_TAG,
      'zevrigo-explorer-0.1.1-x64-setup.exe',
      '02357c3e4bfc326cf593c012c9fb872ee09bf1adf07d40b7ffe83fa26bb74074',
      '1,8 MB',
    ),
    catatan: [
      'Membuka explorer resmi demo-explorer.zevrigo.online di jendela aplikasinya sendiri.',
      'Installer belum ditandatangani; periksa SHA-256 sebelum memasang.',
    ],
  },
  {
    id: 'explorer-linux',
    aplikasi: 'Explorer',
    platform: 'Linux',
    syarat: 'Linux x86_64 dengan glibc 2.35 atau lebih baru, dengan internet',
    status: 'tersedia',
    versi: '0.1.1',
    tag: EXPLORER_TAG,
    rilisUrl: EXPLORER_RELEASES_URL,
    berkas: berkas(
      EXPLORER_RELEASES_URL,
      EXPLORER_TAG,
      'zevrigo-explorer-0.1.1-x86_64.AppImage',
      '3d527f0c8c5e6efd53993f5d96e9ca7f29903bc15b7b8f4b18bc014711157bbc',
      '77,8 MB',
    ),
    catatan: [
      'Membuka explorer resmi demo-explorer.zevrigo.online di jendela aplikasinya sendiri.',
      'AppImage dijalankan langsung tanpa dipasang. Belum ditandatangani; periksa SHA-256 sebelum menjalankan.',
    ],
  },
  {
    id: 'explorer-android',
    aplikasi: 'Explorer',
    platform: 'Android',
    syarat: 'Android 7.0 atau lebih baru, dengan internet',
    status: 'tersedia',
    versi: '0.1.1',
    tag: EXPLORER_TAG,
    rilisUrl: EXPLORER_RELEASES_URL,
    berkas: berkas(
      EXPLORER_RELEASES_URL,
      EXPLORER_TAG,
      'zevrigo-explorer-0.1.1-android.apk',
      '871f80517d67f0fd764d312af8ba6b96f6a4663dd68cf5c91f683c3be8d7b188',
      '16,8 MB',
    ),
    catatan: [
      'APK rilis bertanda tangan kunci rilis yang sama dengan wallet.',
      'Tanpa izin kamera; hanya membuka halaman explorer resmi.',
    ],
  },
  {
    id: 'node-windows',
    aplikasi: 'Node',
    platform: 'Windows',
    syarat: 'Windows 10 atau 11, 64-bit, dengan internet',
    status: 'tersedia',
    versi: '0.1.0',
    tag: NODE_TAG,
    rilisUrl: DEMO_RELEASES_URL,
    berkas: berkas(
      DEMO_RELEASES_URL,
      NODE_TAG,
      'zevrigo-node-0.1.0-x64-setup.exe',
      '559d3c7fcd8c20b30fa598a96803829b395607ac9f622c2cb6268452e1dbc734',
      '5,7 MB',
    ),
    catatan: [
      'Dibangun GitHub Actions dari kode sumber pada tag zevrigo-demo-gui; node dan penambang sama dengan paket peserta.',
      'Installer belum ditandatangani, jadi Windows SmartScreen menampilkan peringatan. Pilih Info selengkapnya lalu Tetap jalankan, hanya jika SHA-256 cocok.',
      'Klik Nyalakan node, tunggu Sinkron, tempel alamat penerimaan dari Zevrigo Wallet, lalu Mulai menambang. Aplikasi tidak membuat dan tidak menyimpan kunci rahasia.',
      'Data disimpan di %USERPROFILE%\\.zevrigo, sama dengan paket peserta; jangan jalankan keduanya bersamaan.',
    ],
  },
  {
    id: 'node-linux',
    aplikasi: 'Node',
    platform: 'Linux',
    syarat: 'Linux x86_64 dengan glibc 2.35 atau lebih baru, misalnya Ubuntu 22.04 atau Debian 12 ke atas',
    status: 'tersedia',
    versi: '0.1.0',
    tag: NODE_TAG,
    rilisUrl: DEMO_RELEASES_URL,
    berkas: berkas(
      DEMO_RELEASES_URL,
      NODE_TAG,
      'zevrigo-node-0.1.0-x86_64.AppImage',
      '8ebf8c9846d6cc4595fdaa3ecd0f71e8d79a5ade56e2f9a6e1eea938f9992f61',
      '86,8 MB',
    ),
    catatan: [
      'Dibangun GitHub Actions di ubuntu-22.04 dari kode sumber pada tag zevrigo-demo-gui, sama dengan installer Windows.',
      'AppImage dijalankan langsung tanpa dipasang. Belum ditandatangani; jalankan hanya jika SHA-256 cocok.',
      'Data disimpan di ~/.zevrigo, sama dengan paket peserta; jangan jalankan keduanya bersamaan.',
    ],
  },
  {
    id: 'node-android',
    aplikasi: 'Node',
    platform: 'Android',
    syarat: 'Android 7.0 atau lebih baru, HP 64-bit atau 32-bit, ditambah VPS Linux milik Anda',
    status: 'tersedia',
    versi: '0.1.0',
    tag: NODE_ANDROID_TAG,
    rilisUrl: DEMO_RELEASES_URL,
    berkas: berkas(
      DEMO_RELEASES_URL,
      NODE_ANDROID_TAG,
      'zevrigo-node-0.1.0-android.apk',
      'ed00b3db524276bfb9628000e5072d202ee8915191631e29f654566a6cd418d2',
      '25,2 MB',
    ),
    catatan: [
      'APK rilis bertanda tangan kunci rilis yang sama dengan Zevrigo Wallet dan Zevrigo Explorer.',
      'Node dan penambang berjalan di VPS Anda, bukan di HP, dan tetap berjalan walau HP mati. Syarat VPS: Linux x86_64, Ubuntu 22.04 atau lebih baru atau Debian 12 ke atas, akses root atau sudo, 1 vCPU, 1 GB RAM.',
      'Cukup alamat IP, nama pengguna, dan password VPS dari penyedia. Aplikasi memasang node resmi lewat SSH (paket demo-zevrigo-vps, SHA-256 diperiksa), lalu mematikan login password SSH.',
      'Kunci SSH VPS disimpan di HP, terenkripsi kata sandi aplikasi. Catat kata sandi itu; bila lupa, masuk lewat konsol web penyedia VPS lalu sambungkan ulang.',
    ],
  },
];

/** Tag rilis paket peserta (pencipta 23 November 2026), tanpa nomor versi. */
export const PAKET_TAG = 'peserta-demo-zevrigo';

/** Paket peserta jaringan demo: node, penambang, CLI, dan skrip awal dalam satu arsip per sistem. */
export type PaketPeserta = {
  id: 'paket-linux' | 'paket-windows';
  platform: 'Linux' | 'Windows';
  syarat: string;
  berkas: {
    nama: string;
    url: string;
    halamanRilis: string;
    sha256: string;
    /** Ukuran berkas untuk dibaca, misalnya `10,8 MB`. */
    ukuran: string;
  };
  /** Perintah periksa SHA-256. */
  periksa: string;
  /** Langkah mulai, satu baris per langkah. */
  mulai: string[];
  catatan: string[];
};

export const PAKET_PESERTA: PaketPeserta[] = [
  {
    id: 'paket-linux',
    platform: 'Linux',
    syarat: 'Linux x86_64 dengan glibc 2.35 atau lebih baru, misalnya Ubuntu 22.04 atau Debian 12 ke atas',
    berkas: berkas(
      DEMO_RELEASES_URL,
      PAKET_TAG,
      'peserta-demo-zevrigo-linux-x86_64.tar.gz',
      '8e981cafff7ef3086e40ae3e17bf05272e98147b3c4f1ed826dd977c889bdb6a',
      '10,8 MB',
    ),
    periksa: 'sha256sum peserta-demo-zevrigo-linux-x86_64.tar.gz',
    mulai: [
      'tar xzf peserta-demo-zevrigo-linux-x86_64.tar.gz',
      'cd peserta-demo-zevrigo',
      './peserta-demo-zevrigo.sh',
    ],
    catatan: [
      'Data disimpan di ~/.zevrigo. Hentikan dengan Ctrl-C; node ikut berhenti.',
      'Belum ditandatangani; jalankan hanya jika SHA-256 cocok.',
    ],
  },
  {
    id: 'paket-windows',
    platform: 'Windows',
    syarat: 'Windows 10 atau 11, 64-bit',
    berkas: berkas(
      DEMO_RELEASES_URL,
      PAKET_TAG,
      'peserta-demo-zevrigo-windows-x64.zip',
      'd49e0f3338b8f4ba346a816dcb3f3c7e5f6e901d30e19460c8f2451c049dfb79',
      '9,9 MB',
    ),
    periksa: 'Get-FileHash .\\peserta-demo-zevrigo-windows-x64.zip -Algorithm SHA256',
    mulai: [
      'Klik kanan berkas .zip, pilih Properties, centang Unblock, lalu OK',
      'Ekstrak, buka folder peserta-demo-zevrigo',
      'Klik dua kali peserta-demo-zevrigo.cmd (node menyala di jendela kedua; biarkan terbuka)',
    ],
    catatan: [
      'Data disimpan di %USERPROFILE%\\.zevrigo. Hentikan dengan Ctrl-C di kedua jendela.',
      'Belum ditandatangani; SmartScreen atau antivirus bisa bertanya. Izinkan hanya jika SHA-256 cocok.',
      'Bila muncul "VCRUNTIME140.dll tidak ditemukan", pasang Microsoft Visual C++ Redistributable x64 dari situs Microsoft.',
    ],
  },
];
