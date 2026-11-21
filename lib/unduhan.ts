/**
 * Daftar unduhan untuk halaman `/unduh/` (TSK-M64, keputusan pencipta 15 November 2026): halaman di blog, berkasnya di
 * GitHub Releases proyek. Blog tidak menyajikan berkas besar sendiri.
 *
 * `sha256` disalin dari rilis yang sudah terbit (tabel catatan rilis dan `SHA256SUMS.txt` installer; APK ditandatangani
 * pencipta di PC dan diunggah bersama sidiknya), agar sidik berkas tampil di dua tempat: halaman ini dan halaman rilis.
 * Rilis pertama 21 November 2026: wallet 0.3.1 dan aplikasi explorer 0.1.0, masing-masing Windows dan Android.
 */

// Sejak DEC-39 dan pindah akun (DEC-08, 17 November 2026) rilis ada di repo aplikasi masing-masing akun badakbesi.
export const WALLET_RELEASES_URL = 'https://github.com/badakbesi/zevrigo-wallet/releases';
export const EXPLORER_RELEASES_URL = 'https://github.com/badakbesi/zevrigo-explorer/releases';

/** Sidik SHA-256 sertifikat kunci rilis APK Zevrigo (sama untuk wallet dan explorer, SUMBER_RESMI.md repo inti). */
export const SIDIK_SERTIFIKAT_APK = '1575be5a086d9242ec0661108cba4fd71276d0e94a40bca33749f991e9e30c1a';

export type Unduhan = {
  id: 'wallet-windows' | 'wallet-android' | 'explorer-windows' | 'explorer-android';
  aplikasi: 'Wallet' | 'Explorer';
  platform: 'Windows' | 'Android';
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

const WALLET_TAG = 'wallet-v0.3.1';
const EXPLORER_TAG = 'explorer-app-v0.1.0';

export const UNDUHAN: Unduhan[] = [
  {
    id: 'wallet-windows',
    aplikasi: 'Wallet',
    platform: 'Windows',
    syarat: 'Windows 10 atau 11, 64-bit',
    status: 'tersedia',
    versi: '0.3.1',
    tag: WALLET_TAG,
    rilisUrl: WALLET_RELEASES_URL,
    berkas: berkas(
      WALLET_RELEASES_URL,
      WALLET_TAG,
      'zevrigo-wallet-0.3.1-x64-setup.exe',
      '6491186f20544cf495cecadfe82df67c5207ccb8a044c95595b5c2096c013b92',
      '3,4 MB',
    ),
    catatan: [
      'Dibangun GitHub Actions dari kode sumber pada tag wallet-v0.3.1.',
      'Installer belum ditandatangani, jadi Windows SmartScreen menampilkan peringatan. Pilih Info selengkapnya lalu Tetap jalankan, hanya jika SHA-256 cocok.',
      'Langsung memakai jaringan demo regtest lewat gerbang zevrigo-rpc.ratuaurion.store.',
    ],
  },
  {
    id: 'wallet-android',
    aplikasi: 'Wallet',
    platform: 'Android',
    syarat: 'Android 7.0 atau lebih baru, HP 64-bit atau 32-bit',
    status: 'tersedia',
    versi: '0.3.1',
    tag: WALLET_TAG,
    rilisUrl: WALLET_RELEASES_URL,
    berkas: berkas(
      WALLET_RELEASES_URL,
      WALLET_TAG,
      'zevrigo-wallet-0.3.1-android.apk',
      '0106583306983a5b9092ed4e37501a714c089901fd8b1e73e803bc23972f358f',
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
    versi: '0.1.0',
    tag: EXPLORER_TAG,
    rilisUrl: EXPLORER_RELEASES_URL,
    berkas: berkas(
      EXPLORER_RELEASES_URL,
      EXPLORER_TAG,
      'zevrigo-explorer-0.1.0-x64-setup.exe',
      '5296427be3b195c1275298afb72cdde164fcd23010b941f745774d6ed194f1fe',
      '1,8 MB',
    ),
    catatan: [
      'Membuka explorer resmi zevrigo.ratuaurion.store di jendela aplikasinya sendiri.',
      'Installer belum ditandatangani; periksa SHA-256 sebelum memasang.',
    ],
  },
  {
    id: 'explorer-android',
    aplikasi: 'Explorer',
    platform: 'Android',
    syarat: 'Android 7.0 atau lebih baru, dengan internet',
    status: 'tersedia',
    versi: '0.1.0',
    tag: EXPLORER_TAG,
    rilisUrl: EXPLORER_RELEASES_URL,
    berkas: berkas(
      EXPLORER_RELEASES_URL,
      EXPLORER_TAG,
      'zevrigo-explorer-0.1.0-android.apk',
      '19e028c2a4e20a09628059bf8f908a7efd797fdfd214b0bef65bcd98eb0ba744',
      '16,8 MB',
    ),
    catatan: [
      'APK rilis bertanda tangan kunci rilis yang sama dengan wallet.',
      'Tanpa izin kamera; hanya membuka halaman explorer resmi.',
    ],
  },
];
