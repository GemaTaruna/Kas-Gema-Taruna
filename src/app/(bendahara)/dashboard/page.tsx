'use client';

import React from 'react';
import Link from 'next/link';
import { useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function DashboardPage() {
  const {
    role,
    displayName,
    activeAngkatan,
    members,
    transactions,
    totalPemasukan,
    totalPengeluaran,
    saldoAkhir,
  } = useAngkatan();

  const lunasCount = members.filter((m) => m.duesStatus === 'LUNAS').length;
  const belumCount = members.length - lunasCount;
  const kepatuhanPersen =
    members.length > 0 ? Math.round((lunasCount / members.length) * 100) : 0;

  const sections = ['Brass', 'Percussion', 'Color Guard', 'Pit Instrument'];

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* Greeting Banner Tanpa Nama Dummy */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 sm:p-6 shadow-sm border border-outline-variant/40">
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-secondary to-secondary-container" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary-container text-secondary-fixed">
                Angkatan {activeAngkatan} (MB{activeAngkatan})
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">
                {displayName}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Dashboard Pembukuan Kas — Angkatan {activeAngkatan}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              {role === 'superadmin'
                ? `Anda masuk sebagai Super Admin (Pembina). Saat ini menampilkan dan mengelola Buku Kas Angkatan ${activeAngkatan}. Gunakan pemilih angkatan di atas untuk beralih ke angkatan lain.`
                : `Menampilkan ringkasan keuangan, status iuran siswa, dan mutasi kas khusus Angkatan ${activeAngkatan}.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href="/pemasukan"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-primary-container text-on-primary hover:opacity-95 transition text-xs font-bold shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
                add_circle
              </span>
              <span>Catat Pemasukan</span>
            </Link>
            <Link
              href="/pengeluaran"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition text-xs font-bold shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px] text-error">
                remove_circle
              </span>
              <span>Catat Pengeluaran</span>
            </Link>
            <Link
              href="/anggota"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-secondary text-on-secondary hover:opacity-95 transition text-xs font-bold shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">
                person_add
              </span>
              <span>Kelola Siswa</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Kartu Statistik Utama Angkatan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-xs border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-on-surface-variant">
              Saldo Kas Angkatan {activeAngkatan}
            </span>
            <div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined text-xl">
                account_balance_wallet
              </span>
            </div>
          </div>
          <div className="text-2xl font-extrabold text-on-surface tracking-tight my-1">
            {formatRupiah(saldoAkhir)}
          </div>
          <p className="text-xs text-on-surface-variant">
            Saldo bersih kas MB{activeAngkatan}
          </p>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-xs border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-on-surface-variant">
              Total Pemasukan (MB{activeAngkatan})
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <span className="material-symbols-outlined text-xl">south_west</span>
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 tracking-tight my-1">
            {formatRupiah(totalPemasukan)}
          </div>
          <p className="text-xs text-on-surface-variant">
            {transactions.filter((t) => t.type === 'pemasukan').length} transaksi pemasukan
          </p>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-xs border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-on-surface-variant">
              Total Pengeluaran (MB{activeAngkatan})
            </span>
            <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
              <span className="material-symbols-outlined text-xl">north_east</span>
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-600 tracking-tight my-1">
            {formatRupiah(totalPengeluaran)}
          </div>
          <p className="text-xs text-on-surface-variant">
            {transactions.filter((t) => t.type === 'pengeluaran').length} transaksi pengeluaran
          </p>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-xs border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-on-surface-variant">
              Status Iuran (MB{activeAngkatan})
            </span>
            <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-xl">groups</span>
            </div>
          </div>
          <div className="text-2xl font-extrabold text-on-surface tracking-tight my-1">
            {lunasCount} / {members.length} Siswa
          </div>
          <p className="text-xs text-on-surface-variant">
            {kepatuhanPersen}% Lunas • {belumCount} Belum Bayar
          </p>
        </div>
      </div>

      {/* Ringkasan Seksi & Transaksi Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Status Iuran per Seksi */}
        <div className="lg:col-span-5 rounded-2xl bg-surface-container-lowest p-5 shadow-xs border border-outline-variant/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-extrabold text-on-surface">
                  Kepatuhan Iuran per Seksi (MB{activeAngkatan})
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Progres kelunasan berdasarkan data siswa Angkatan {activeAngkatan}
                </p>
              </div>
              <Link
                href="/iuran"
                className="text-xs font-bold text-secondary hover:underline"
              >
                Kelola Iuran →
              </Link>
            </div>

            <div className="space-y-3.5">
              {sections.map((sec) => {
                const secMembers = members.filter((m) => m.section === sec);
                const secLunas = secMembers.filter((m) => m.duesStatus === 'LUNAS').length;
                const pct =
                  secMembers.length > 0
                    ? Math.round((secLunas / secMembers.length) * 100)
                    : 0;
                return (
                  <div key={sec} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-on-surface">{sec}</span>
                      <span className="text-on-surface-variant font-semibold">
                        {secLunas}/{secMembers.length} Siswa ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
            <span>Total Siswa Terdaftar (MB{activeAngkatan}):</span>
            <span className="font-extrabold text-on-surface">{members.length} Siswa</span>
          </div>
        </div>

        {/* Tabel 5 Transaksi Terbaru */}
        <div className="lg:col-span-7 rounded-2xl bg-surface-container-lowest p-5 shadow-xs border border-outline-variant/40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-extrabold text-on-surface">
                Transaksi Kas Terbaru — Angkatan {activeAngkatan}
              </h2>
              <p className="text-xs text-on-surface-variant">
                Catatan mutasi pemasukan & pengeluaran terakhir di Buku Kas MB{activeAngkatan}
              </p>
            </div>
            <Link
              href="/riwayat"
              className="text-xs font-bold text-secondary hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          {transactions.length === 0 ? (
            <div className="py-10 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl opacity-40 block mb-2">
                receipt_long
              </span>
              <p className="text-sm font-bold text-on-surface">
                Belum ada transaksi di Angkatan {activeAngkatan}
              </p>
              <p className="text-xs mt-1">
                Silakan klik tombol <strong>Catat Pemasukan</strong> atau <strong>Catat Pengeluaran</strong> untuk mulai mencatat buku kas Angkatan {activeAngkatan}.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] border-b border-outline-variant/40">
                  <tr>
                    <th className="py-2.5 px-3">Tanggal</th>
                    <th className="py-2.5 px-3">No. Bukti</th>
                    <th className="py-2.5 px-3">Uraian</th>
                    <th className="py-2.5 px-3 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {transactions.slice(0, 6).map((t) => (
                    <tr key={t.id} className="hover:bg-surface-container-low/50">
                      <td className="py-2.5 px-3 whitespace-nowrap text-on-surface-variant">
                        {t.transactionDate}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-on-surface whitespace-nowrap">
                        {t.referenceNo}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-on-surface block">
                          {t.description}
                        </span>
                        <span className="text-[11px] text-on-surface-variant">
                          {t.category} • Oleh: {t.recordedBy}
                        </span>
                      </td>
                      <td
                        className={`py-2.5 px-3 text-right font-extrabold whitespace-nowrap ${
                          t.type === 'pemasukan'
                            ? 'text-emerald-600'
                            : 'text-rose-600'
                        }`}
                      >
                        {t.type === 'pemasukan' ? '+' : '-'}
                        {formatRupiah(t.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
