/**
 * Daftar unduhan untuk halaman `/unduh/` (TSK-M64, keputusan pencipta 15 November 2026): halaman di blog, berkasnya di
 * GitHub Releases proyek. Blog tidak menyajikan berkas besar sendiri.
 *
 * `sha256` disalin dari rilis yang sudah terbit (tabel catatan rilis dan `SHA256SUMS.txt` installer; APK ditandatangani
 * pencipta di PC dan diunggah bersama sidiknya), agar sidik berkas tampil di dua tempat: halaman ini dan halaman rilis.
 * Rilis pertama 21 November 2026: wallet 0.3.1 dan aplikasi explorer 0.1.0, masing-masing Windows dan Android. Sejak
 * 23 November 2026 wallet 0.3.2 dan aplikasi explorer 0.1.1 (domain resmi zevrigo.online, DEC-42), ditambah AppImage Linux
 * x86_64 di rilis yang sama (RENCANA_T14 bagian 5a, Q188; SHA-256 dari rilis dan `SHA256SUMS.txt`).
 */

// Sejak DEC-39 dan pindah akun (DEC-08, 17 November 2026) rilis ada di repo aplikasi masing-masing akun badakbesi.
export const WALLET_RELEASES_URL = 'https://github.com/badakbesi/zevrigo-wallet/releases';
export const EXPLORER_RELEASES_URL = 'https://github.com/badakbesi/zevrigo-explorer/releases';

/** Sidik SHA-256 sertifikat kunci rilis APK Zevrigo (sama untuk wallet dan explorer, SUMBER_RESMI.md repo inti). */
export const SIDIK_SERTIFIKAT_APK = '1575be5a086d9242ec0661108cba4fd71276d0e94a40bca33749f991e9e30c1a';

export type Unduhan = {
  id: 'wallet-windows' | 'wallet-linux' | 'wallet-android' | 'explorer-windows' | 'explorer-linux' | 'explorer-android';
  aplikasi: 'Wallet' | 'Explorer';
  platform: 'Windows' | 'Linux' | 'Android';
  syarat: string;
  status: 'tersedia' | 'segera';
  versi: string;
  /** Tag rilis GitHub, misalnya `wallet-v0.3.1`. */
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
];
