'use client';

import React from 'react';
import Link from 'next/link';
import { SECTION_NAMES, useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function DashboardPage() {
  const {
    role,
    displayName,
    activeAngkatan,
    activeSessionId,
    members,
    transactions,
    totalPemasukan,
    totalPengeluaran,
    saldoAkhir,
  } = useAngkatan();

  const lunasCount = members.filter((m) =>
    (m.paidSessions || []).includes(activeSessionId)
  ).length;
  const belumCount = members.length - lunasCount;
  const kepatuhanPersen =
    members.length > 0 ? Math.round((lunasCount / members.length) * 100) : 0;

  return (
    <div className="p-3 sm:p-6 flex flex-col gap-5 max-w-[1440px] mx-auto w-full">
      {/* Greeting Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-4 sm:p-6 shadow-sm border border-outline-variant/40">
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
            <h1 className="text-lg sm:text-2xl font-extrabold text-on-surface tracking-tight">
              Dashboard Pembukuan Kas — Angkatan {activeAngkatan}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              {role === 'superadmin'
                ? `Anda masuk sebagai Super Admin (Pembina). Saat ini menampilkan Buku Kas Angkatan ${activeAngkatan}.`
                : `Menampilkan ringkasan keuangan, checklist iuran pertemuan, dan mutasi kas khusus Angkatan ${activeAngkatan}.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href="/iuran"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition text-xs font-bold shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">
                fact_check
              </span>
              <span>Checklist Iuran</span>
            </Link>
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
          </div>
        </div>
      </div>

      {/* 4 Kartu Statistik Utama Angkatan */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-surface-container-lowest p-4 sm:p-5 shadow-xs border border-outline-variant/40 flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant">
            Saldo Kas MB{activeAngkatan}
          </span>
          <div className="text-lg sm:text-2xl font-extrabold text-on-surface tracking-tight my-1">
            {formatRupiah(saldoAkhir)}
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Saldo bersih saat ini
          </p>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-4 sm:p-5 shadow-xs border border-outline-variant/40 flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant">
            Total Pemasukan
          </span>
          <div className="text-lg sm:text-2xl font-extrabold text-emerald-600 tracking-tight my-1">
            {formatRupiah(totalPemasukan)}
          </div>
          <p className="text-[11px] text-on-surface-variant">
            {transactions.filter((t) => t.type === 'pemasukan').length} kas masuk
          </p>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-4 sm:p-5 shadow-xs border border-outline-variant/40 flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant">
            Total Pengeluaran
          </span>
          <div className="text-lg sm:text-2xl font-extrabold text-rose-600 tracking-tight my-1">
            {formatRupiah(totalPengeluaran)}
          </div>
          <p className="text-[11px] text-on-surface-variant">
            {transactions.filter((t) => t.type === 'pengeluaran').length} kas keluar
          </p>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-4 sm:p-5 shadow-xs border border-outline-variant/40 flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant">
            Iuran ({activeSessionId})
          </span>
          <div className="text-lg sm:text-2xl font-extrabold text-on-surface tracking-tight my-1">
            {lunasCount} / {members.length} Siswa
          </div>
          <p className="text-[11px] text-on-surface-variant">
            {kepatuhanPersen}% Lunas • {belumCount} Belum
          </p>
        </div>
      </div>

      {/* Ringkasan Seksi & Transaksi Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 rounded-2xl bg-surface-container-lowest p-4 sm:p-5 shadow-xs border border-outline-variant/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-on-surface">
                  Kepatuhan Iuran per Seksi ({activeSessionId})
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Berdasarkan 5 Seksi Resmi Gema Taruna
                </p>
              </div>
              <Link
                href="/iuran"
                className="text-xs font-bold text-secondary hover:underline"
              >
                Kelola →
              </Link>
            </div>

            <div className="space-y-3">
              {SECTION_NAMES.map((sec) => {
                const secMembers = members.filter(
                  (m) => m.section.toUpperCase() === sec
                );
                const secLunas = secMembers.filter((m) =>
                  (m.paidSessions || []).includes(activeSessionId)
                ).length;
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
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
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

          <div className="mt-5 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant">
            <span>Total Siswa MB{activeAngkatan}:</span>
            <span className="font-extrabold text-on-surface">
              {members.length} Siswa
            </span>
          </div>
        </div>

        {/* Transaksi Terbaru */}
        <div className="lg:col-span-7 rounded-2xl bg-surface-container-lowest p-4 sm:p-5 shadow-xs border border-outline-variant/40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-on-surface">
                Transaksi Kas Terbaru — Angkatan {activeAngkatan}
              </h2>
              <p className="text-xs text-on-surface-variant">
                Catatan pemasukan & pengeluaran terakhir
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
              <p className="text-sm font-bold text-on-surface">
                Belum ada transaksi di Angkatan {activeAngkatan}
              </p>
              <p className="text-xs mt-1">
                Mulai tandai lunas iuran pertemuan atau catat pemasukan/pengeluaran kas.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/20">
              {transactions.slice(0, 6).map((t) => (
                <div
                  key={t.id}
                  className="py-2.5 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-on-surface-variant">
                      {t.transactionDate} • {t.referenceNo}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-on-surface truncate">
                      {t.description}
                    </p>
                    <span className="text-[11px] text-on-surface-variant">
                      {t.category}
                    </span>
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-extrabold shrink-0 ${
                      t.type === 'pemasukan'
                        ? 'text-emerald-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {t.type === 'pemasukan' ? '+' : '-'}
                    {formatRupiah(t.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
