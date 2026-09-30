'use client';

import React from 'react';
import { SECTION_NAMES, useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function LaporanKeuanganPage() {
  const {
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
  const kepatuhanPersen =
    members.length > 0 ? Math.round((lunasCount / members.length) * 100) : 0;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="p-3 sm:p-6 flex flex-col gap-5 max-w-[1440px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            LAPORAN PERTANGGUNGJAWABAN (LPJ)
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
            Laporan Keuangan — Angkatan {activeAngkatan} (MB{activeAngkatan})
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Rekapitulasi resmi pemasukan, pengeluaran, dan kepatuhan iuran per seksi.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
            print
          </span>
          <span>Cetak / Simpan PDF</span>
        </button>
      </div>

      {/* Ringkasan Eksekutif Angkatan */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
            Saldo Kas Bersih
          </span>
          <p className="text-lg sm:text-2xl font-extrabold text-on-surface">
            {formatRupiah(saldoAkhir)}
          </p>
        </div>

        <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
            Total Pemasukan
          </span>
          <p className="text-lg sm:text-2xl font-extrabold text-emerald-600">
            {formatRupiah(totalPemasukan)}
          </p>
        </div>

        <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
            Total Pengeluaran
          </span>
          <p className="text-lg sm:text-2xl font-extrabold text-rose-600">
            {formatRupiah(totalPengeluaran)}
          </p>
        </div>

        <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
            Kepatuhan ({activeSessionId})
          </span>
          <p className="text-lg sm:text-2xl font-extrabold text-secondary">
            {kepatuhanPersen}% ({lunasCount}/{members.length})
          </p>
        </div>
      </div>

      {/* Rekapitulasi Per Seksi */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-outline-variant/40">
          <h2 className="text-base font-extrabold text-on-surface">
            Rekapitulasi Iuran per Seksi ({activeSessionId}) — Angkatan {activeAngkatan}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] border-b border-outline-variant/40">
              <tr>
                <th className="py-3 px-4">Seksi Resmi</th>
                <th className="py-3 px-4 text-center">Jumlah Siswa</th>
                <th className="py-3 px-4 text-center">Lunas</th>
                <th className="py-3 px-4 text-center">Belum</th>
                <th className="py-3 px-4 text-right">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {SECTION_NAMES.map((sec) => {
                const secMembers = members.filter(
                  (m) => m.section.toUpperCase() === sec
                );
                const secLunas = secMembers.filter((m) =>
                  (m.paidSessions || []).includes(activeSessionId)
                ).length;
                const secBelum = secMembers.length - secLunas;
                const pct =
                  secMembers.length > 0
                    ? Math.round((secLunas / secMembers.length) * 100)
                    : 0;
                return (
                  <tr key={sec} className="hover:bg-surface-container-low/50">
                    <td className="py-3 px-4 font-bold text-on-surface">{sec}</td>
                    <td className="py-3 px-4 text-center">{secMembers.length}</td>
                    <td className="py-3 px-4 text-center text-emerald-600 font-bold">
                      {secLunas}
                    </td>
                    <td className="py-3 px-4 text-center text-rose-600 font-bold">
                      {secBelum}
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-on-surface">
                      {pct}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ringkasan Jurnal Transaksi */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-outline-variant/40">
          <h2 className="text-base font-extrabold text-on-surface">
            Lampiran Mutasi Kas — Angkatan {activeAngkatan} ({transactions.length} Transaksi)
          </h2>
        </div>

        {transactions.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant text-xs sm:text-sm">
            Belum ada data transaksi untuk dilaporkan pada Angkatan {activeAngkatan}.
          </div>
        ) : (
          <div className="divide-y divide-outline-variant/20">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="p-3.5 sm:px-4 flex items-center justify-between gap-2"
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
  );
}
