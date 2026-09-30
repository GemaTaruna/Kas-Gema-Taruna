'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ANGKATAN_LIST,
  formatMonthLabel,
  INDONESIAN_MONTHS,
  SECTION_NAMES,
  useAngkatan,
} from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

const YEAR_OPTIONS = ['2025', '2026', '2027', '2028'];

export default function TransparansiSiswaPage() {
  const router = useRouter();
  const {
    activeAngkatan,
    setActiveAngkatan,
    activeMonth,
    setActiveMonth,
    monthlySessionCount,
    members,
    transactions,
    sessions,
    activeSessionId,
    setActiveSessionId,
    totalPemasukan,
    totalPengeluaran,
    saldoAkhir,
    duesNominal,
    logout,
  } = useAngkatan();

  const [searchMember, setSearchMember] = useState('');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [activeView, setActiveView] = useState<'semua' | 'iuran' | 'mutasi'>('semua');

  const [selectedYear, selectedMonthNum] = (activeMonth || '2026-09').split('-');

  const handleMonthChange = (newYear: string, newMonthNum: string) => {
    setActiveMonth(`${newYear}-${newMonthNum}`);
  };

  const lunasCount = members.filter((m) =>
    (m.paidSessions || []).includes(activeSessionId)
  ).length;
  const belumCount = members.length - lunasCount;
  const kepatuhanPersen =
    members.length > 0 ? Math.round((lunasCount / members.length) * 100) : 0;

  const filteredMembers = members.filter((m) => {
    const matchName =
      m.fullName.toLowerCase().includes(searchMember.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(searchMember.toLowerCase()) ||
      (m.kelas || '').toLowerCase().includes(searchMember.toLowerCase());
    const matchSec =
      sectionFilter === 'ALL' || m.section.toUpperCase() === sectionFilter;
    return matchName && matchSec;
  });

  const handleExit = () => {
    logout();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header Responsif Web PC & Web Mobile */}
      <header className="sticky top-0 z-40 bg-[#131b2e] text-white border-b border-amber-500/30 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/logo.png"
              alt="Logo Gema Taruna"
              className="w-9 h-9 rounded-xl object-contain bg-white/10 p-1 border border-amber-400/30 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs sm:text-base font-extrabold tracking-tight text-white">
                  KAS GEMA TARUNA
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] sm:text-[11px] font-extrabold">
                  ANGKATAN {activeAngkatan}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate">
                Portal Cek Kas Siswa (Mode Hanya Membaca)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExit}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Keluar</span>
          </button>
        </div>

        {/* Bar Pemilih Angkatan (16 s.d. 21) */}
        <div className="bg-slate-900/90 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mr-1 shrink-0">
                Angkatan:
              </span>
              {ANGKATAN_LIST.map((angk) => {
                const active = activeAngkatan === angk;
                return (
                  <button
                    key={angk}
                    type="button"
                    onClick={() => setActiveAngkatan(angk)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition shrink-0 cursor-pointer ${
                      active
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    MB{angk}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveView('semua')}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                  activeView === 'semua'
                    ? 'bg-white text-slate-900'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setActiveView('iuran')}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                  activeView === 'iuran'
                    ? 'bg-white text-slate-900'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                Iuran ({members.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveView('mutasi')}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                  activeView === 'mutasi'
                    ? 'bg-white text-slate-900'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                Mutasi ({transactions.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-5 space-y-5 flex-1">
        {/* 4 Kartu Ringkasan Kas Angkatan */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase text-slate-500 block">
              Saldo Kas MB{activeAngkatan}
            </span>
            <p className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1">
              {formatRupiah(saldoAkhir)}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Iuran: {formatRupiah(duesNominal)}/pertemuan
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase text-slate-500 block">
              Kas Masuk MB{activeAngkatan}
            </span>
            <p className="text-lg sm:text-2xl font-extrabold text-emerald-600 mt-1">
              {formatRupiah(totalPemasukan)}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {transactions.filter((t) => t.type === 'pemasukan').length} bukti rekap/masuk
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase text-slate-500 block">
              Kas Keluar MB{activeAngkatan}
            </span>
            <p className="text-lg sm:text-2xl font-extrabold text-rose-600 mt-1">
              {formatRupiah(totalPengeluaran)}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {transactions.filter((t) => t.type === 'pengeluaran').length} transaksi
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase text-slate-500 block">
              Lunas ({activeSessionId} - {formatMonthLabel(activeMonth)})
            </span>
            <p className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1">
              {lunasCount} / {members.length} Siswa
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {kepatuhanPersen}% Lunas • {belumCount} Belum
            </p>
          </div>
        </div>

        {/* Bagian 1: Daftar Status Iuran Siswa per Pertemuan */}
        {(activeView === 'semua' || activeView === 'iuran') && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 space-y-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                    Status Iuran Siswa — {formatMonthLabel(activeMonth)} ({monthlySessionCount}x Pertemuan)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Kotak hijau menandakan pertemuan yang sudah lunas ({formatRupiah(duesNominal)} / pertemuan).
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Pemilih Bulan & Tahun */}
                  <select
                    value={selectedMonthNum}
                    onChange={(e) => handleMonthChange(selectedYear, e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold bg-slate-50 outline-none"
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
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold bg-slate-50 outline-none"
                  >
                    {YEAR_OPTIONS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                    placeholder="Cari nama / kelas..."
                    className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:border-slate-900"
                  />
                  <select
                    value={sectionFilter}
                    onChange={(e) => setSectionFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none bg-white"
                  >
                    <option value="ALL">Semua Seksi</option>
                    {SECTION_NAMES.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pemilih Pertemuan untuk melihat status spesifik */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {sessions.map((ses) => (
                  <button
                    key={ses.id}
                    type="button"
                    onClick={() => setActiveSessionId(ses.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 cursor-pointer ${
                      ses.id === activeSessionId
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {ses.id}
                  </button>
                ))}
              </div>
            </div>

            {filteredMembers.length === 0 ? (
              <div className="p-10 text-center text-slate-500">
                <p className="text-sm font-bold text-slate-700">
                  Belum ada data siswa di Angkatan {activeAngkatan}
                </p>
              </div>
            ) : (
              <>
                {/* Tampilan Mobile (Kartu Rapi Tanpa Geser Kanan) */}
                <div className="md:hidden divide-y divide-slate-100">
                  {filteredMembers.map((m, idx) => {
                    const paidCount = (m.paidSessions || []).length;
                    const arrearsList = m.arrears || [];
                    return (
                      <div key={m.id} className="p-3.5 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-mono font-bold text-slate-500">
                                {idx + 1}.
                              </span>
                              <span className="text-sm font-extrabold text-slate-900">
                                {m.fullName}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                                {m.kelas || '-'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">
                              {m.section} • {m.instrument}
                            </p>
                          </div>
                          <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg shrink-0">
                            {paidCount}/{monthlySessionCount} Lunas
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {sessions.map((ses) => {
                            const paid = (m.paidSessions || []).includes(ses.id);
                            return (
                              <span
                                key={ses.id}
                                className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                  paid
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-100 text-slate-400'
                                }`}
                              >
                                {ses.id} {paid ? '✓' : ''}
                              </span>
                            );
                          })}
                        </div>

                        {arrearsList.length > 0 && (
                          <div className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1">
                            ⚠️ Tunggakan Bulan Lalu:{' '}
                            {arrearsList.map((a) => a.shortLabel).join(', ')} (
                            {formatRupiah(arrearsList.length * duesNominal)})
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Tampilan Desktop */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">No</th>
                        <th className="py-3 px-4">Nama Siswa</th>
                        <th className="py-3 px-4">Kelas</th>
                        <th className="py-3 px-4">Seksi / Alat</th>
                        <th className="py-3 px-4">
                          Status Pertemuan ({formatMonthLabel(activeMonth)})
                        </th>
                        <th className="py-3 px-4 text-right">Total Terbayar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredMembers.map((m, idx) => {
                        const paidCount = (m.paidSessions || []).length;
                        const arrearsList = m.arrears || [];
                        return (
                          <tr key={m.id} className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-mono text-slate-500">
                              {idx + 1}
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-900">
                              {m.fullName}
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-700">
                              {m.kelas || '-'}
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              {m.section} • {m.instrument}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1">
                                {sessions.map((ses) => {
                                  const paid = (m.paidSessions || []).includes(
                                    ses.id
                                  );
                                  return (
                                    <span
                                      key={ses.id}
                                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                        paid
                                          ? 'bg-emerald-600 text-white'
                                          : 'bg-slate-100 text-slate-400'
                                      }`}
                                    >
                                      {ses.id}
                                    </span>
                                  );
                                })}
                              </div>
                              {arrearsList.length > 0 && (
                                <span className="inline-block mt-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-0.5">
                                  ⚠️ Tunggakan Bulan Lalu:{' '}
                                  {arrearsList.map((a) => a.shortLabel).join(', ')}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right font-extrabold text-emerald-700">
                              {formatRupiah(paidCount * duesNominal)} ({paidCount}/
                              {monthlySessionCount})
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* Bagian 2: Riwayat Mutasi Kas */}
        {(activeView === 'semua' || activeView === 'mutasi') && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                Riwayat Pemasukan & Pengeluaran Kas — Angkatan {activeAngkatan}
              </h2>
            </div>

            {transactions.length === 0 ? (
              <div className="p-10 text-center text-slate-500">
                <p className="text-sm font-bold text-slate-700">
                  Belum ada catatan transaksi di Angkatan {activeAngkatan}
                </p>
              </div>
            ) : (
              <>
                {/* Mobile Card List */}
                <div className="md:hidden divide-y divide-slate-100">
                  {transactions.map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-slate-500">
                          {t.transactionDate} • {t.referenceNo}
                        </span>
                        <p className="text-xs font-bold text-slate-900">
                          {t.description}
                        </p>
                        <span className="text-[10px] text-slate-500">
                          {t.category} • {t.vendor}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-extrabold shrink-0 ${
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

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Tanggal</th>
                        <th className="py-3 px-4">No. Bukti</th>
                        <th className="py-3 px-4">Kategori</th>
                        <th className="py-3 px-4">Uraian Transaksi</th>
                        <th className="py-3 px-4 text-right">Nominal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transactions.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                            {t.transactionDate}
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-slate-700 whitespace-nowrap">
                            {t.referenceNo}
                          </td>
                          <td className="py-3 px-4">{t.category}</td>
                          <td className="py-3 px-4 font-medium text-slate-900">
                            {t.description}
                          </td>
                          <td
                            className={`py-3 px-4 text-right font-extrabold whitespace-nowrap ${
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
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
