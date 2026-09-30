'use client';

import React from 'react';
import {
  formatMonthLabel,
  INDONESIAN_MONTHS,
  SECTION_NAMES,
  useAngkatan,
} from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

const YEAR_OPTIONS = ['2025', '2026', '2027', '2028'];

export default function LaporanKeuanganPage() {
  const {
    activeAngkatan,
    displayName,
    activeMonth,
    setActiveMonth,
    monthlySessionCount,
    sessions,
    activeSessionId,
    setActiveSessionId,
    duesNominal,
    members,
    transactions,
    totalPemasukan,
    totalPengeluaran,
    saldoAkhir,
  } = useAngkatan();

  const [selectedYear, selectedMonthNum] = (activeMonth || '2026-09').split('-');

  const handleMonthChange = (newYear: string, newMonthNum: string) => {
    setActiveMonth(`${newYear}-${newMonthNum}`);
  };

  const lunasCount = members.filter((m) =>
    (m.paidSessions || []).includes(activeSessionId)
  ).length;
  const kepatuhanPersen =
    members.length > 0 ? Math.round((lunasCount / members.length) * 100) : 0;

  const totalPaidOccurrencesInMonth = members.reduce(
    (acc, m) => acc + (m.paidSessions?.length || 0),
    0
  );
  const totalIuranBulanIni = totalPaidOccurrencesInMonth * duesNominal;

  const formattedPrintDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="p-3 sm:p-6 print:p-0 flex flex-col gap-5 max-w-[1100px] mx-auto w-full">
      {/* Bar Kontrol Layar (OTOMATIS DISEMBUNYIKAN SAAT CETAK PDF) */}
      <div className="print:hidden bg-surface-container-lowest p-4 sm:p-5 rounded-2xl border border-outline-variant/40 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            LAPORAN PERTANGGUNGJAWABAN (LPJ) RESMI
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-on-surface">
            Cetak Laporan Keuangan — Angkatan {activeAngkatan} (MB{activeAngkatan})
          </h1>
          <p className="text-xs text-on-surface-variant">
            Tampilan di bawah adalah pratinjau dokumen resmi A4. Menu navigasi &amp; tombol otomatis disembunyikan saat dicetak ke PDF.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedMonthNum}
            onChange={(e) => handleMonthChange(selectedYear, e.target.value)}
            className="px-3 py-2 rounded-xl border border-outline-variant bg-white text-xs font-bold text-on-surface outline-none"
          >
            {INDONESIAN_MONTHS.map((m) => (
              <option key={m.num} value={m.num}>
                {m.name}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => handleMonthChange(e.target.value, selectedMonthNum)}
            className="px-3 py-2 rounded-xl border border-outline-variant bg-white text-xs font-bold text-on-surface outline-none"
          >
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={activeSessionId}
            onChange={(e) => setActiveSessionId(e.target.value)}
            className="px-3 py-2 rounded-xl border border-outline-variant bg-white text-xs font-bold text-on-surface outline-none"
          >
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                Evaluasi {s.id}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container hover:bg-slate-800 text-on-primary font-extrabold text-xs sm:text-sm shadow cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px] text-amber-400">
              print
            </span>
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          LEMBAR DOKUMEN RESMI LPJ (TAMPIL DI PRATINJAU & DICETAK BERSIH KE PDF)
      ===================================================================== */}
      <div className="bg-white text-slate-900 rounded-2xl print:rounded-none border border-slate-300 print:border-none shadow-md print:shadow-none p-5 sm:p-10 print:p-2 space-y-6">
        {/* 1. KOP SURAT RESMI MARCHING BAND GEMA TARUNA */}
        <div className="border-b-4 border-double border-slate-900 pb-4 flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Logo Marching Band Gema Taruna"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0"
          />
          <div className="flex-1 text-center sm:pr-12">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-700">
              ORGANISASI EKSTRAKURIKULER MARCHING BAND
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 uppercase">
              MARCHING BAND GEMA TARUNA
            </h2>
            <p className="text-xs sm:text-sm font-bold text-amber-700 italic mt-0.5">
              &ldquo;Satu Tekad, Satu Semangat, Marching Hebat!&rdquo;
            </p>
            <p className="text-[11px] font-semibold text-slate-600 mt-1">
              LAPORAN PERTANGGUNGJAWABAN (LPJ) KEUANGAN KAS — ANGKATAN {activeAngkatan} (MB{activeAngkatan})
            </p>
          </div>
        </div>

        {/* 2. METADATA LAPORAN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs border border-slate-300 rounded-lg p-3 bg-slate-50/70">
          <div className="space-y-1">
            <div className="flex">
              <span className="w-36 font-semibold text-slate-600">Buku Kas Unit</span>
              <span className="font-bold text-slate-900">
                : Angkatan {activeAngkatan} (MB{activeAngkatan})
              </span>
            </div>
            <div className="flex">
              <span className="w-36 font-semibold text-slate-600">Periode Bulan Iuran</span>
              <span className="font-bold text-slate-900">
                : {formatMonthLabel(activeMonth)} ({monthlySessionCount}x Pertemuan)
              </span>
            </div>
            <div className="flex">
              <span className="w-36 font-semibold text-slate-600">Nominal Iuran</span>
              <span className="font-bold text-slate-900">
                : {formatRupiah(duesNominal)} / Pertemuan
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex">
              <span className="w-36 font-semibold text-slate-600">Tanggal Cetak</span>
              <span className="font-bold text-slate-900">: {formattedPrintDate}</span>
            </div>
            <div className="flex">
              <span className="w-36 font-semibold text-slate-600">Jumlah Anggota</span>
              <span className="font-bold text-slate-900">
                : {members.length} Siswa Aktif
              </span>
            </div>
            <div className="flex">
              <span className="w-36 font-semibold text-slate-600">Dicetak Oleh</span>
              <span className="font-bold text-slate-900">: {displayName}</span>
            </div>
          </div>
        </div>

        {/* 3. BAGIAN I: RINGKASAN NERACA KAS */}
        <div>
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-2">
            I. Ringkasan Posisi Keuangan Kas (MB{activeAngkatan})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="border border-slate-300 rounded-lg p-3 bg-white">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">
                Total Kas Masuk (BKM)
              </span>
              <p className="text-base sm:text-lg font-extrabold text-emerald-700 mt-0.5">
                {formatRupiah(totalPemasukan)}
              </p>
            </div>
            <div className="border border-slate-300 rounded-lg p-3 bg-white">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">
                Total Kas Keluar (BKK)
              </span>
              <p className="text-base sm:text-lg font-extrabold text-rose-700 mt-0.5">
                {formatRupiah(totalPengeluaran)}
              </p>
            </div>
            <div className="border border-slate-400 rounded-lg p-3 bg-slate-50">
              <span className="text-[10px] font-bold uppercase text-slate-700 block">
                Saldo Akhir Kas Bersih
              </span>
              <p className="text-base sm:text-lg font-black text-slate-950 mt-0.5">
                {formatRupiah(saldoAkhir)}
              </p>
            </div>
            <div className="border border-slate-300 rounded-lg p-3 bg-white">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">
                Iuran {formatMonthLabel(activeMonth)}
              </span>
              <p className="text-base sm:text-lg font-extrabold text-amber-800 mt-0.5">
                {formatRupiah(totalIuranBulanIni)}
              </p>
              <span className="text-[10px] text-slate-500 block">
                {totalPaidOccurrencesInMonth}x pembayaran • {activeSessionId}: {kepatuhanPersen}%
              </span>
            </div>
          </div>
        </div>

        {/* 4. BAGIAN II: REKAPITULASI IURAN PER SEKSI RESMI */}
        <div>
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-2">
            II. Rekapitulasi Iuran Anggota per Seksi — {formatMonthLabel(activeMonth)}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800 uppercase text-[11px]">
                  <th className="border border-slate-400 py-2 px-2.5 text-center w-10">
                    No
                  </th>
                  <th className="border border-slate-400 py-2 px-3 text-left">
                    Seksi Resmi
                  </th>
                  <th className="border border-slate-400 py-2 px-2.5 text-center">
                    Jml Siswa
                  </th>
                  <th className="border border-slate-400 py-2 px-2.5 text-center">
                    Lunas ({activeSessionId})
                  </th>
                  <th className="border border-slate-400 py-2 px-2.5 text-center">
                    Belum ({activeSessionId})
                  </th>
                  <th className="border border-slate-400 py-2 px-2.5 text-center">
                    Total Bayar (P1–P{monthlySessionCount})
                  </th>
                  <th className="border border-slate-400 py-2 px-3 text-right">
                    Dana Terkumpul
                  </th>
                </tr>
              </thead>
              <tbody>
                {SECTION_NAMES.map((sec, idx) => {
                  const secMembers = members.filter(
                    (m) => m.section.toUpperCase() === sec
                  );
                  const secLunas = secMembers.filter((m) =>
                    (m.paidSessions || []).includes(activeSessionId)
                  ).length;
                  const secBelum = secMembers.length - secLunas;
                  const secTotalPaidSessions = secMembers.reduce(
                    (acc, m) => acc + (m.paidSessions?.length || 0),
                    0
                  );
                  const secTotalRupiah = secTotalPaidSessions * duesNominal;

                  return (
                    <tr key={sec}>
                      <td className="border border-slate-400 py-1.5 px-2.5 text-center font-mono">
                        {idx + 1}
                      </td>
                      <td className="border border-slate-400 py-1.5 px-3 font-bold text-slate-900">
                        {sec}
                      </td>
                      <td className="border border-slate-400 py-1.5 px-2.5 text-center">
                        {secMembers.length}
                      </td>
                      <td className="border border-slate-400 py-1.5 px-2.5 text-center font-bold text-emerald-700">
                        {secLunas}
                      </td>
                      <td className="border border-slate-400 py-1.5 px-2.5 text-center font-bold text-rose-700">
                        {secBelum}
                      </td>
                      <td className="border border-slate-400 py-1.5 px-2.5 text-center font-semibold">
                        {secTotalPaidSessions}x bayar
                      </td>
                      <td className="border border-slate-400 py-1.5 px-3 text-right font-bold text-slate-900">
                        {formatRupiah(secTotalRupiah)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-extrabold text-slate-900">
                  <td
                    colSpan={2}
                    className="border border-slate-400 py-2 px-3 text-right uppercase"
                  >
                    Total Keseluruhan
                  </td>
                  <td className="border border-slate-400 py-2 px-2.5 text-center">
                    {members.length}
                  </td>
                  <td className="border border-slate-400 py-2 px-2.5 text-center text-emerald-700">
                    {lunasCount}
                  </td>
                  <td className="border border-slate-400 py-2 px-2.5 text-center text-rose-700">
                    {members.length - lunasCount}
                  </td>
                  <td className="border border-slate-400 py-2 px-2.5 text-center">
                    {totalPaidOccurrencesInMonth}x bayar
                  </td>
                  <td className="border border-slate-400 py-2 px-3 text-right">
                    {formatRupiah(totalIuranBulanIni)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* 5. BAGIAN III: RINCIAN MUTASI BUKU KAS UMUM (BKU) */}
        <div>
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-2">
            III. Rincian Mutasi Buku Kas Umum (BKU) — Angkatan {activeAngkatan} ({transactions.length} Transaksi)
          </h3>

          {transactions.length === 0 ? (
            <div className="border border-slate-400 p-6 text-center text-xs text-slate-600">
              Belum ada catatan mutasi pemasukan maupun pengeluaran pada Angkatan {activeAngkatan}.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-400 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 uppercase text-[11px]">
                    <th className="border border-slate-400 py-2 px-2 text-center w-10">
                      No
                    </th>
                    <th className="border border-slate-400 py-2 px-2.5 text-left">
                      Tanggal
                    </th>
                    <th className="border border-slate-400 py-2 px-2.5 text-left">
                      No. Bukti
                    </th>
                    <th className="border border-slate-400 py-2 px-2.5 text-left">
                      Kategori
                    </th>
                    <th className="border border-slate-400 py-2 px-3 text-left">
                      Uraian Transaksi
                    </th>
                    <th className="border border-slate-400 py-2 px-2.5 text-right">
                      Pemasukan (Rp)
                    </th>
                    <th className="border border-slate-400 py-2 px-2.5 text-right">
                      Pengeluaran (Rp)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, idx) => (
                    <tr key={t.id}>
                      <td className="border border-slate-400 py-1.5 px-2 text-center font-mono">
                        {idx + 1}
                      </td>
                      <td className="border border-slate-400 py-1.5 px-2.5 whitespace-nowrap">
                        {t.transactionDate}
                      </td>
                      <td className="border border-slate-400 py-1.5 px-2.5 font-mono text-[11px] whitespace-nowrap">
                        {t.referenceNo}
                      </td>
                      <td className="border border-slate-400 py-1.5 px-2.5">
                        {t.category}
                      </td>
                      <td className="border border-slate-400 py-1.5 px-3">
                        <span className="font-semibold text-slate-900 block">
                          {t.description}
                        </span>
                        {t.vendor && t.vendor !== '-' && (
                          <span className="text-[10px] text-slate-500">
                            Ket/Pihak: {t.vendor}
                          </span>
                        )}
                      </td>
                      <td className="border border-slate-400 py-1.5 px-2.5 text-right font-bold text-emerald-700 whitespace-nowrap">
                        {t.type === 'pemasukan' ? formatRupiah(t.amount) : '-'}
                      </td>
                      <td className="border border-slate-400 py-1.5 px-2.5 text-right font-bold text-rose-700 whitespace-nowrap">
                        {t.type === 'pengeluaran' ? formatRupiah(t.amount) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-extrabold text-slate-900">
                    <td
                      colSpan={5}
                      className="border border-slate-400 py-2 px-3 text-right uppercase"
                    >
                      Total Mutasi Kas
                    </td>
                    <td className="border border-slate-400 py-2 px-2.5 text-right text-emerald-700 whitespace-nowrap">
                      {formatRupiah(totalPemasukan)}
                    </td>
                    <td className="border border-slate-400 py-2 px-2.5 text-right text-rose-700 whitespace-nowrap">
                      {formatRupiah(totalPengeluaran)}
                    </td>
                  </tr>
                  <tr className="bg-slate-200/80 font-black text-slate-950">
                    <td
                      colSpan={5}
                      className="border border-slate-400 py-2 px-3 text-right uppercase"
                    >
                      Saldo Akhir Kas Bersih (MB{activeAngkatan})
                    </td>
                    <td
                      colSpan={2}
                      className="border border-slate-400 py-2 px-3 text-right text-sm whitespace-nowrap"
                    >
                      {formatRupiah(saldoAkhir)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* 6. LEMBAR PENGESAHAN / TANDA TANGAN RESMI */}
        <div className="pt-6 break-inside-avoid">
          <div className="grid grid-cols-2 gap-8 text-center text-xs">
            <div className="flex flex-col items-center">
              <p className="text-slate-600">Mengetahui,</p>
              <p className="font-bold text-slate-900">
                Pembina Marching Band Gema Taruna
              </p>
              <div className="h-20"></div>
              <p className="font-bold text-slate-900 underline underline-offset-4">
                ( .................................................... )
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-slate-600">{formattedPrintDate}</p>
              <p className="font-bold text-slate-900">
                Bendahara / Admin Angkatan {activeAngkatan} (MB{activeAngkatan})
              </p>
              <div className="h-20"></div>
              <p className="font-bold text-slate-900 underline underline-offset-4">
                ( .................................................... )
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
