import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Download } from 'lucide-react';
import {
  DEMO_RELEASES_URL,
  EXPLORER_RELEASES_URL,
  PAKET_PESERTA,
  SIDIK_SERTIFIKAT_APK,
  UNDUHAN,
  WALLET_RELEASES_URL,
  type PaketPeserta,
  type Unduhan,
} from '@/lib/unduhan';

export const metadata: Metadata = {
  title: 'Unduh aplikasi',
  description:
    'Unduh wallet, aplikasi explorer, aplikasi Zevrigo Node, dan paket node + penambang Zevrigo untuk jaringan demo regtest: Windows, Linux, dan Android dari GitHub Releases, dengan cara memeriksa SHA-256.',
};

const MUTED = 'text-[#52525B] dark:text-[#A1A1AA]';
const BORDER = 'border-[#E4E4E7] dark:border-[#27272A]';
const LINK = 'text-[#0F766E] dark:text-[#2DD4BF] underline underline-offset-4 decoration-[#0F766E]/40 dark:decoration-[#2DD4BF]/40';

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto bg-[#18181B] dark:bg-[#0D0D10] text-[#FAF9F6] p-4 text-xs md:text-[13px] font-mono leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

function Card({ item }: { item: Unduhan }) {
  const file = item.berkas;
  return (
    <section className={`border ${BORDER} bg-[#FAF9F6] dark:bg-[#121215] p-6 md:p-8 space-y-5`}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold">
          {item.platform} <span className={`font-sans text-sm font-normal ${MUTED}`}>versi {item.versi}</span>
        </h3>
        <span
          className={`text-xs font-semibold ${
            item.status === 'tersedia' ? 'text-[#0F766E] dark:text-[#2DD4BF]' : 'text-amber-700 dark:text-amber-400'
          }`}
        >
          {item.status === 'tersedia' ? 'Tersedia' : 'Segera'}
        </span>
      </div>
      <p className={`text-sm ${MUTED}`}>{item.syarat}</p>
      {file && (
        <div className="space-y-4">
          <a
            href={file.url}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0F766E] hover:bg-[#115E59] dark:bg-[#2DD4BF] dark:hover:bg-[#5EEAD4] text-[#FAF9F6] dark:text-[#09090B] px-5 py-3 text-sm font-semibold break-all"
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
            Unduh {file.nama} ({file.ukuran})
          </a>
          <div className="space-y-2 text-sm">
            <div className="font-semibold">Sidik SHA-256</div>
            <code className="block break-all bg-[#F4F3EE] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] px-3 py-2 font-mono text-xs">
              {file.sha256}
            </code>
          </div>
          <div className="space-y-2 text-sm">
            <div className="font-semibold">
              {item.platform === 'Linux'
                ? 'Periksa berkas sebelum menjalankan (terminal Linux)'
                : 'Periksa berkas sebelum memasang (PowerShell di komputer)'}
            </div>
            <Code>{item.platform === 'Linux' ? `sha256sum ${file.nama}` : `Get-FileHash .\\${file.nama} -Algorithm SHA256`}</Code>
            <p className={MUTED}>
              Angka yang keluar harus sama persis. Kalau berbeda, hapus berkasnya dan jangan dipasang.
              {item.platform === 'Android' &&
                ' Di HP, pakai aplikasi pemeriksa sidik berkas, atau unduh di komputer dulu lalu salin ke HP.'}
            </p>
          </div>
          {item.platform === 'Linux' && (
            <div className="space-y-2 text-sm">
              <div className="font-semibold">Jalankan</div>
              <Code>{`chmod +x ${file.nama}\n./${file.nama}`}</Code>
              <p className={MUTED}>
                AppImage butuh FUSE 2. Di Ubuntu 22.04 pasang <code className="font-mono">libfuse2</code>, di Ubuntu 24.04 ke atas{' '}
                <code className="font-mono">libfuse2t64</code> (<code className="font-mono">sudo apt install</code> nama paketnya). Tanpa
                FUSE, jalankan dengan tambahan <code className="font-mono">--appimage-extract-and-run</code>.
              </p>
            </div>
          )}
          {item.platform === 'Android' && (
            <div className="space-y-2 text-sm">
              <div className="font-semibold">Sidik sertifikat tanda tangan APK</div>
              <code className="block break-all bg-[#F4F3EE] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] px-3 py-2 font-mono text-xs">
                {SIDIK_SERTIFIKAT_APK}
              </code>
              <p className={MUTED}>Semua APK Zevrigo resmi ditandatangani sertifikat ini.</p>
            </div>
          )}
          <a href={file.halamanRilis} rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-sm ${LINK}`}>
            Halaman rilis di GitHub
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      )}
      <ul className={`list-disc pl-5 space-y-1.5 text-sm leading-relaxed ${MUTED}`}>
        {item.catatan.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

function PaketCard({ item }: { item: PaketPeserta }) {
  const file = item.berkas;
  return (
    <section className={`border ${BORDER} bg-[#FAF9F6] dark:bg-[#121215] p-6 md:p-8 space-y-5`}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-serif text-2xl font-semibold">{item.platform}</h3>
        <span className="text-xs font-semibold text-[#0F766E] dark:text-[#2DD4BF]">Tersedia</span>
      </div>
      <p className={`text-sm ${MUTED}`}>{item.syarat}</p>
      <div className="space-y-4">
        <a
          href={file.url}
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0F766E] hover:bg-[#115E59] dark:bg-[#2DD4BF] dark:hover:bg-[#5EEAD4] text-[#FAF9F6] dark:text-[#09090B] px-5 py-3 text-sm font-semibold break-all"
        >
          <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
          Unduh {file.nama} ({file.ukuran})
        </a>
        <div className="space-y-2 text-sm">
          <div className="font-semibold">Sidik SHA-256</div>
          <code className="block break-all bg-[#F4F3EE] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] px-3 py-2 font-mono text-xs">
            {file.sha256}
          </code>
        </div>
        <div className="space-y-2 text-sm">
          <div className="font-semibold">
            {item.platform === 'Linux' ? 'Periksa berkas (terminal Linux)' : 'Periksa berkas (PowerShell)'}
          </div>
          <Code>{item.periksa}</Code>
          <p className={MUTED}>Angka yang keluar harus sama persis. Kalau berbeda, hapus berkasnya.</p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="font-semibold">Mulai</div>
          {item.platform === 'Linux' ? (
            <Code>{item.mulai.join('\n')}</Code>
          ) : (
            <ol className={`list-decimal pl-5 space-y-1 ${MUTED}`}>
              {item.mulai.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          )}
        </div>
        <a href={file.halamanRilis} rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-sm ${LINK}`}>
          Halaman rilis di GitHub
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
      <ul className={`list-disc pl-5 space-y-1.5 text-sm leading-relaxed ${MUTED}`}>
        {item.catatan.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

function Group({ aplikasi, judul, ringkas }: { aplikasi: Unduhan['aplikasi']; judul: string; ringkas: string }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold">{judul}</h2>
        <p className={`text-sm leading-relaxed ${MUTED}`}>{ringkas}</p>
      </div>
      {UNDUHAN.filter((item) => item.aplikasi === aplikasi).map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default function DownloadPage() {
  return (
    <div className="pt-10 md:pt-14 mx-auto max-w-3xl space-y-10">
      <header className="space-y-4">
        <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-tight tracking-tight">Unduh aplikasi Zevrigo</h1>
        <p className={`text-base md:text-lg leading-relaxed ${MUTED}`}>
          Aplikasi untuk jaringan demo regtest. Berkasnya disimpan di GitHub Releases proyek Zevrigo (
          <a href={WALLET_RELEASES_URL} rel="noopener noreferrer" className={LINK}>
            wallet
          </a>{' '}
          dan{' '}
          <a href={EXPLORER_RELEASES_URL} rel="noopener noreferrer" className={LINK}>
            explorer
          </a>
          ,{' '}
          <a href={DEMO_RELEASES_URL} rel="noopener noreferrer" className={LINK}>
            Zevrigo Node dan paket peserta
          </a>
          ) dan dibangun dari kode sumber yang terbuka. Unduh hanya dari halaman ini atau dari GitHub badakbesi.
        </p>
      </header>
      <Group
        aplikasi="Wallet"
        judul="Wallet"
        ringkas="Simpan, terima, dan kirim ZVRG demo. Scan kode QR, pratinjau biaya sebelum password, kirim semua saldo, dan kunci aplikasi."
      />
      <Group
        aplikasi="Explorer"
        judul="Explorer"
        ringkas="Lihat blok, transaksi, dan faucet jaringan demo dari aplikasi, tanpa membuka browser."
      />
      <Group
        aplikasi="Node"
        judul="Zevrigo Node"
        ringkas="Ikut menjalankan jaringan demo dengan aplikasi, tanpa terminal: nyalakan node (tersambung sendiri ke seed resmi), lihat status sinkron, lalu tambang satu blok setiap 1, 2, atau 5 menit dengan hadiah ke alamat Zevrigo Wallet Anda. Versi Android memasang dan mengendalikan node di VPS milik Anda, sehingga node tetap berjalan walau HP mati. Koin jaringan demo tidak bernilai."
      />
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold">Node dan penambang (paket peserta)</h2>
          <p className={`text-sm leading-relaxed ${MUTED}`}>
            Ikut menjalankan jaringan demo dari komputer sendiri. Satu arsip berisi node, penambang, dan CLI wallet, dengan
            skrip awal yang menyalakan node (tersambung sendiri ke seed resmi), membuat wallet bila belum ada, lalu menambang
            satu blok setiap 2 menit dengan hadiah ke wallet itu. Catat 24 kata wallet di kertas; jangan dibagikan ke siapa pun.
            Koin jaringan demo tidak bernilai.
          </p>
        </div>
        {PAKET_PESERTA.map((item) => (
          <PaketCard key={item.id} item={item} />
        ))}
      </div>
      <p className={`text-sm leading-relaxed ${MUTED}`}>
        Baru pertama kali? Ikuti{' '}
        <Link href="/artikel/panduan-wallet-dan-faucet/" className={LINK}>
          panduan mencoba wallet dan faucet
        </Link>
        . Isi rilis ini ada di{' '}
        <Link href="/artikel/rilis-wallet-dan-explorer/" className={LINK}>
          artikel rilis wallet dan explorer
        </Link>
        .
      </p>
    </div>
  );
}
