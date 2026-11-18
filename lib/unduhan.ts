/**
 * Daftar unduhan untuk halaman `/unduh/` (TSK-M64, keputusan pencipta 15 November 2026): halaman di blog, berkasnya di
 * GitHub Releases proyek. Blog tidak menyajikan berkas besar sendiri.
 *
 * `sha256` diisi sesudah rilis diterbitkan, dari `SHA256SUMS.txt` rilis itu (disalin pencipta), agar sidik berkas tampil di
 * dua tempat: halaman ini dan halaman rilis. Selama `null`, halaman meminta pengunjung membandingkan dengan `SHA256SUMS.txt`.
 */

// Sejak DEC-39 dan pindah akun (DEC-08, 17 November 2026) semua rilis wallet, termasuk 0.2.0 (berkas sama dengan rilis asli
// di repo lama), ada di repo zevrigo-wallet akun badakbesi. Repo inti zevrigo tidak menerbitkan rilis wallet.
export const RELEASES_URL = 'https://github.com/badakbesi/zevrigo-wallet/releases';

export type Unduhan = {
  id: 'windows' | 'android';
  platform: string;
  syarat: string;
  status: 'tersedia' | 'segera';
  versi: string;
  /** Hanya untuk status `tersedia`. */
  berkas?: {
    nama: string;
    url: string;
    halamanRilis: string;
    sha256Sums: string;
    sha256: string | null;
  };
  catatan: string[];
};

export const UNDUHAN: Unduhan[] = [
  {
    id: 'windows',
    platform: 'Windows',
    syarat: 'Windows 10 atau 11, 64-bit',
    status: 'tersedia',
    versi: '0.2.1',
    berkas: {
      nama: 'zevrigo-wallet-0.2.1-x64-setup.exe',
      url: `${RELEASES_URL}/download/wallet-v0.2.1/zevrigo-wallet-0.2.1-x64-setup.exe`,
      halamanRilis: `${RELEASES_URL}/tag/wallet-v0.2.1`,
      sha256Sums: `${RELEASES_URL}/download/wallet-v0.2.1/SHA256SUMS.txt`,
      // Diisi dari SHA256SUMS.txt sesudah rilis wallet-v0.2.1 terbit (0.2.0: bc22c6b9…, 16 November 2026).
      sha256: null,
    },
    catatan: [
      'Dibangun GitHub Actions dari kode sumber pada tag wallet-v0.2.1.',
      'Installer belum ditandatangani, jadi Windows SmartScreen menampilkan peringatan. Pilih Info selengkapnya lalu Tetap jalankan, hanya jika SHA-256 cocok.',
      'Langsung memakai jaringan demo regtest lewat gerbang zevrigo-rpc.ratuaurion.store.',
    ],
  },
  {
    id: 'android',
    platform: 'Android',
    syarat: 'Android 7.0 atau lebih baru, HP arm64',
    status: 'segera',
    versi: '0.2.1',
    catatan: [
      'APK uji sudah lolos uji di HP pengembang.',
      'Yang dibagikan nanti adalah APK rilis bertanda tangan kunci rilis, dengan sidik SHA-256 di halaman ini.',
      'Jangan memasang APK Zevrigo dari sumber lain.',
    ],
  },
];
