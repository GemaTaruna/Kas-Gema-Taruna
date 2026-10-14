'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
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
  const [activeView, setActiveView] = useState<'iuran' | 'mutasi'>('iuran');
  const [mutasiFilter, setMutasiFilter] = useState<'all' | 'pemasukan' | 'pengeluaran'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const [selectedYear, selectedMonthNum] = (activeMonth || '2026-10').split('-');

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
      (m.kelas || '').toLowerCase().includes(searchMember.toLowerCase()) ||
      (m.instrument || '').toLowerCase().includes(searchMember.toLowerCase());
    const matchSec =
      sectionFilter === 'ALL' || m.section.toUpperCase() === sectionFilter;
    return matchName && matchSec;
  });

  // Reset pagination on filter or month change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchMember, sectionFilter, activeMonth]);

  const totalItems = filteredMembers.length;
  const totalPages = pageSize === -1 ? 1 : Math.ceil(totalItems / pageSize) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * (pageSize === -1 ? totalItems : pageSize);
  const endIndex = pageSize === -1 ? totalItems : Math.min(startIndex + pageSize, totalItems);
  const displayedMembers = pageSize === -1 ? filteredMembers : filteredMembers.slice(startIndex, endIndex);

  const filteredTransactions = transactions.filter((t) => {
    if (mutasiFilter === 'pemasukan') return t.type === 'pemasukan';
    if (mutasiFilter === 'pengeluaran') return t.type === 'pengeluaran';
    return true;
  });

  const handleExit = () => {
    logout();
    router.push('/login');
    router.refresh();
  };

  const getSectionBadge = (sec: string) => {
    const upper = (sec || '').toUpperCase();
    if (upper.includes('BRASS')) {
      return 'bg-blue-50 text-blue-700 border-blue-200/70';
    }
    if (upper.includes('PERCUSSION')) {
      return 'bg-amber-50 text-amber-800 border-amber-200/70';
    }
    if (upper.includes('COLOR') || upper.includes('GUARD')) {
      return 'bg-rose-50 text-rose-700 border-rose-200/70';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans">
      {/* Header Responsif Web PC & Mobile */}
      <header className="sticky top-0 z-40 bg-[#101726] text-white border-b border-amber-500/30 shadow-lg">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/logo.png"
              alt="Logo Gema Taruna"
              className="w-10 h-10 rounded-xl object-contain bg-white/10 p-1.5 border border-amber-400/40 shadow-inner shrink-0"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm sm:text-lg font-black tracking-tight text-white drop-shadow-xs">
                  KAS GEMA TARUNA
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[11px] sm:text-xs font-black shadow-xs tracking-wide">
                  ANGKATAN {activeAngkatan}
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate">
                Portal Transparansi Kas Siswa & Wali Murid (Mode Baca)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExit}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-rose-600/80 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 shadow-xs active:scale-95 border border-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>

        {/* Sub-bar: Info Angkatan & Navigasi Tab (HANYA Iuran & Mutasi) */}
        <div className="bg-[#0b101b] border-t border-white/10">
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 shrink-0">
                Unit Angkatan:
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-black bg-amber-500 text-slate-950 shadow-xs shrink-0 tracking-wider">
                MB{activeAngkatan}
              </span>
            </div>

            {/* TAB NAVIGASI: Hanya Iuran & Mutasi */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveView('iuran')}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeView === 'iuran'
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-1 ring-amber-300'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">fact_check</span>
                <span>Daftar Iuran</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    activeView === 'iuran'
                      ? 'bg-slate-950/20 text-slate-950'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {members.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('mutasi')}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeView === 'mutasi'
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-1 ring-amber-300'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">receipt_long</span>
                <span>Mutasi Kas</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    activeView === 'mutasi'
                      ? 'bg-slate-950/20 text-slate-950'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {transactions.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="max-w-7xl 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* 4 Kartu Ringkasan Eksekutif Kas (Berdampak Visual Tinggi / Greget) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Saldo Kas */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Saldo Kas MB{activeAngkatan}
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
              </div>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                {formatRupiah(saldoAkhir)}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-bold">
                  Kas: {formatRupiah(duesNominal)}/minggu
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Kas Masuk */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Kas Masuk MB{activeAngkatan}
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">trending_up</span>
              </div>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-black text-emerald-600 tracking-tight">
                {formatRupiah(totalPemasukan)}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
                  {transactions.filter((t) => t.type === 'pemasukan').length} bukti transaksi masuk
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Kas Keluar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-red-500" />
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Kas Keluar MB{activeAngkatan}
              </span>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">trending_down</span>
              </div>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-black text-rose-600 tracking-tight">
                {formatRupiah(totalPengeluaran)}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200/60">
                  {transactions.filter((t) => t.type === 'pengeluaran').length} transaksi keluar
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Kepatuhan Iuran */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500" />
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 truncate">
                Lunas {activeSessionId} ({formatMonthLabel(activeMonth)})
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">task_alt</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                  {lunasCount}
                </p>
                <span className="text-sm font-bold text-slate-500">
                  / {members.length} Siswa
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/60">
                  {kepatuhanPersen}% Lunas • {belumCount} Belum
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DAFTAR STATUS IURAN SISWA */}
        {/* ========================================================================= */}
        {activeView === 'iuran' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Toolbar Filter & Kontrol Pencarian */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-600 text-[24px]">fact_check</span>
                    <span>Status Iuran Siswa — {formatMonthLabel(activeMonth)}</span>
                    <span className="text-xs sm:text-sm font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                      {monthlySessionCount}x Pertemuan
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Kotak hijau menandakan minggu pembayaran yang sudah lunas (
                    <strong className="text-slate-700">{formatRupiah(duesNominal)}</strong> / minggu).
                  </p>
                </div>

                {/* Filter Controls: Bulan, Tahun, Pencarian, dan Seksi */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Pemilih Bulan & Tahun */}
                  <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-300 shadow-2xs">
                    <select
                      value={selectedMonthNum}
                      onChange={(e) => handleMonthChange(selectedYear, e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold bg-transparent text-slate-900 outline-none cursor-pointer"
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
                      className="px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold bg-transparent text-slate-900 outline-none cursor-pointer"
                    >
                      {YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filter Seksi */}
                  <select
                    value={sectionFilter}
                    onChange={(e) => setSectionFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold bg-white text-slate-800 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer shadow-2xs"
                  >
                    <option value="ALL">Semua Seksi</option>
                    {SECTION_NAMES.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>

                  {/* Input Pencarian */}
                  <div className="relative flex-1 sm:w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                      search
                    </span>
                    <input
                      type="text"
                      value={searchMember}
                      onChange={(e) => setSearchMember(e.target.value)}
                      placeholder="Cari nama, kelas, alat..."
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white outline-none focus:ring-2 focus:ring-amber-400 shadow-2xs placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Pemilih Pertemuan Aktif (P1, P2, P3, dst.) */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-200/80 overflow-x-auto pb-1">
                <span className="text-xs font-bold text-slate-500 shrink-0">
                  Sorot Pertemuan:
                </span>
                {sessions.map((ses) => {
                  const isActive = ses.id === activeSessionId;
                  return (
                    <button
                      key={ses.id}
                      type="button"
                      onClick={() => setActiveSessionId(ses.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black shrink-0 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-md scale-105 ring-2 ring-amber-400'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                      }`}
                    >
                      {ses.id}
                    </button>
                  );
                })}
                <span className="text-[11px] text-slate-400 ml-2 hidden sm:inline">
                  (Klik pertemuan untuk melihat siswa lunas di kartu atas)
                </span>
              </div>
            </div>

            {filteredMembers.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <span className="material-symbols-outlined text-[48px] text-slate-300 block mb-2">
                  person_search
                </span>
                <p className="text-base font-bold text-slate-700">
                  Tidak ada data siswa yang cocok dengan filter.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Coba ubah kata kunci pencarian atau pilih &quot;Semua Seksi&quot;.
                </p>
              </div>
            ) : (
              <>
                {/* Tampilan Mobile: Kartu Siswa Rapi */}
                <div className="md:hidden divide-y divide-slate-100">
                  {displayedMembers.map((m, idx) => {
                    const paidCount = (m.paidSessions || []).length;
                    const arrearsList = m.arrears || [];
                    const rowNumber = startIndex + idx + 1;
                    return (
                      <div key={m.id} className="p-4 space-y-2.5 hover:bg-slate-50/60 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xs font-mono font-bold text-slate-400 shrink-0">
                                #{rowNumber}
                              </span>
                              <span className="text-sm font-black text-slate-900 leading-snug">
                                {m.fullName}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                                {m.kelas || '-'}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                {m.memberCode}
                              </span>
                            </div>
                            <div className="mt-1.5 flex items-center gap-1.5">
                              <span className={`inline-block px-1.5 py-0.5 rounded border text-[10px] font-black ${getSectionBadge(m.section)}`}>
                                {m.section}
                              </span>
                              <span className="text-xs font-bold text-slate-700">
                                {m.instrument}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg shrink-0">
                            {paidCount}/{monthlySessionCount} Lunas
                          </span>
                        </div>

                        {/* Badges Pertemuan (Satu baris horizontal tidak turun ke bawah) */}
                        <div className="flex items-center flex-nowrap gap-1.5 overflow-x-auto pb-1">
                          {sessions.map((ses) => {
                            const paid = (m.paidSessions || []).includes(ses.id);
                            return (
                              <span
                                key={ses.id}
                                className={`px-2.5 py-1 rounded-lg text-xs font-black shrink-0 transition-colors ${
                                  paid
                                    ? 'bg-emerald-600 text-white shadow-2xs'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                                }`}
                              >
                                {ses.id} {paid ? '✓' : ''}
                              </span>
                            );
                          })}
                        </div>

                        {/* Tunggakan Bulan Lalu */}
                        {arrearsList.length > 0 && (
                          <div className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/80 rounded-lg px-3 py-1.5">
                            ⚠️ Tunggakan: {arrearsList.map((a) => a.shortLabel).join(', ')} (
                            {formatRupiah(arrearsList.length * duesNominal)})
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Tampilan Desktop PC: Tabel Elegan, Jelas, & Nyaman Dibaca */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-slate-100/90 text-slate-700 uppercase text-xs font-black tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4 text-center w-14 shrink-0">No</th>
                        <th className="py-3.5 px-5 w-[26%] min-w-[200px]">Nama Siswa & Kelas</th>
                        <th className="py-3.5 px-5 w-[18%] min-w-[150px]">Seksi & Alat</th>
                        <th className="py-3.5 px-5 text-center w-[38%] min-w-[320px]">
                          Status Pertemuan ({formatMonthLabel(activeMonth)})
                        </th>
                        <th className="py-3.5 px-5 text-right w-[18%] min-w-[150px]">Total Terbayar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {displayedMembers.map((m, idx) => {
                        const paidCount = (m.paidSessions || []).length;
                        const arrearsList = m.arrears || [];
                        const isEven = idx % 2 === 0;
                        const rowNumber = startIndex + idx + 1;
                        return (
                          <tr
                            key={m.id}
                            className={`transition-colors hover:bg-amber-50/40 ${
                              isEven ? 'bg-white' : 'bg-slate-50/30'
                            }`}
                          >
                            <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-400 text-xs">
                              {rowNumber}
                            </td>
                            <td className="py-3.5 px-5">
                              <div className="text-sm lg:text-base font-black text-slate-900 leading-snug">
                                {m.fullName}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 shrink-0">
                                  {m.kelas || '-'}
                                </span>
                                <span className="text-[11px] font-mono text-slate-400 font-semibold">
                                  {m.memberCode}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-5">
                              <div>
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-md border text-xs font-black tracking-wide ${getSectionBadge(
                                    m.section
                                  )}`}
                                >
                                  {m.section}
                                </span>
                              </div>
                              <p className="text-xs font-extrabold text-slate-700 mt-1 uppercase tracking-tight">
                                {m.instrument}
                              </p>
                            </td>
                            <td className="py-3.5 px-5 text-center">
                              {/* Satu baris penuh (flex-nowrap) sehingga P1-P5 tetap horizontal & proporsional */}
                              <div className="flex items-center justify-center flex-nowrap gap-1.5 whitespace-nowrap overflow-x-auto py-0.5">
                                {sessions.map((ses) => {
                                  const paid = (m.paidSessions || []).includes(ses.id);
                                  return (
                                    <span
                                      key={ses.id}
                                      className={`px-3 py-1 rounded-lg text-xs font-black shrink-0 transition-all ${
                                        paid
                                          ? 'bg-emerald-600 text-white shadow-2xs'
                                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                                      }`}
                                      title={paid ? `Lunas ${ses.id}` : `Belum Lunas ${ses.id}`}
                                    >
                                      {ses.id} {paid ? '✓' : ''}
                                    </span>
                                  );
                                })}
                              </div>
                              {arrearsList.length > 0 && (
                                <div className="mt-1.5 text-center">
                                  <span className="inline-block text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-2 py-0.5">
                                    ⚠️ Tunggakan: {arrearsList.map((a) => a.shortLabel).join(', ')}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-5 text-right whitespace-nowrap">
                              <span className="block text-sm lg:text-base font-black text-emerald-700">
                                {formatRupiah(paidCount * duesNominal)}
                              </span>
                              <span className="text-xs font-bold text-slate-500">
                                {paidCount} dari {monthlySessionCount} Minggu
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Kontrol Paginasi Siswa (Desktop & Mobile) */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-3">
                    <span>
                      Menampilkan{' '}
                      <span className="font-black text-slate-900">
                        {totalItems === 0 ? 0 : startIndex + 1} - {endIndex}
                      </span>{' '}
                      dari <span className="font-black text-slate-900">{totalItems}</span> siswa
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">|</span>
                      <label htmlFor="pageSizeSelect" className="text-slate-500 font-normal">
                        Per hal:
                      </label>
                      <select
                        id="pageSizeSelect"
                        value={pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-black text-slate-800 outline-none cursor-pointer focus:ring-1 focus:ring-amber-500"
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={-1}>Semua</option>
                      </select>
                    </div>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={safeCurrentPage <= 1}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-black cursor-pointer shadow-2xs"
                      >
                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        <span>Sebelumnya</span>
                      </button>

                      <div className="flex items-center gap-1 px-1">
                        {Array.from({ length: totalPages }).map((_, i) => {
                          const pageNum = i + 1;
                          if (
                            totalPages > 7 &&
                            Math.abs(pageNum - safeCurrentPage) > 2 &&
                            pageNum !== 1 &&
                            pageNum !== totalPages
                          ) {
                            if (Math.abs(pageNum - safeCurrentPage) === 3) {
                              return (
                                <span key={pageNum} className="text-slate-400 px-1">
                                  ...
                                </span>
                              );
                            }
                            return null;
                          }
                          const isCurrent = pageNum === safeCurrentPage;
                          return (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-7 h-7 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-slate-900 text-white shadow-xs'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={safeCurrentPage >= totalPages}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-black cursor-pointer shadow-2xs"
                      >
                        <span>Berikutnya</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: RIWAYAT MUTASI KAS */}
        {/* ========================================================================= */}
        {activeView === 'mutasi' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Toolbar Filter Mutasi */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-[24px]">receipt_long</span>
                  <span>Buku Kas Mutasi — Angkatan {activeAngkatan}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Catatan pembukuan seluruh arus kas masuk & pengeluaran yang terverifikasi.
                </p>
              </div>

              {/* Filter Tipe Transaksi */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-300 shadow-2xs shrink-0">
                <button
                  type="button"
                  onClick={() => setMutasiFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black cursor-pointer transition-colors ${
                    mutasiFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Semua ({transactions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setMutasiFilter('pemasukan')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black cursor-pointer transition-colors ${
                    mutasiFilter === 'pemasukan'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  Kas Masuk ({transactions.filter((t) => t.type === 'pemasukan').length})
                </button>
                <button
                  type="button"
                  onClick={() => setMutasiFilter('pengeluaran')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black cursor-pointer transition-colors ${
                    mutasiFilter === 'pengeluaran'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-rose-700 hover:bg-rose-50'
                  }`}
                >
                  Kas Keluar ({transactions.filter((t) => t.type === 'pengeluaran').length})
                </button>
              </div>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <span className="material-symbols-outlined text-[48px] text-slate-300 block mb-2">
                  receipt
                </span>
                <p className="text-base font-bold text-slate-700">
                  Belum ada catatan mutasi kas pada filter ini.
                </p>
              </div>
            ) : (
              <>
                {/* Mobile View: Kartu Transaksi */}
                <div className="md:hidden divide-y divide-slate-100">
                  {filteredTransactions.map((t) => {
                    const isIncome = t.type === 'pemasukan';
                    return (
                      <div
                        key={t.id}
                        className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                      >
                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                                isIncome
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {isIncome ? 'Masuk' : 'Keluar'}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-500">
                              {t.transactionDate}
                            </span>
                          </div>
                          <p className="text-sm font-black text-slate-900 leading-snug">
                            {t.description}
                          </p>
                          <p className="text-xs text-slate-500">
                            {t.category} • <span className="font-semibold text-slate-700">{t.vendor}</span>
                          </p>
                        </div>
                        <span
                          className={`text-sm sm:text-base font-black shrink-0 ${
                            isIncome ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {isIncome ? '+' : '-'}
                          {formatRupiah(t.amount)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop View: Buku Kas Ledger Profesional */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-slate-100/80 text-slate-600 uppercase text-xs font-black tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-5 w-32">Tanggal</th>
                        <th className="py-3.5 px-5 w-44">No. Bukti</th>
                        <th className="py-3.5 px-5 w-40">Kategori</th>
                        <th className="py-3.5 px-5">Uraian & Keterangan</th>
                        <th className="py-3.5 px-5 w-32">Metode</th>
                        <th className="py-3.5 px-5 text-right w-44">Nominal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTransactions.map((t, idx) => {
                        const isIncome = t.type === 'pemasukan';
                        const isEven = idx % 2 === 0;
                        return (
                          <tr
                            key={t.id}
                            className={`transition-colors hover:bg-amber-50/40 ${
                              isEven ? 'bg-white' : 'bg-slate-50/30'
                            }`}
                          >
                            <td className="py-4 px-5 text-slate-700 font-semibold whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-slate-400">
                                  calendar_today
                                </span>
                                <span>{t.transactionDate}</span>
                              </div>
                            </td>
                            <td className="py-4 px-5 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md bg-slate-100 font-mono text-xs font-bold text-slate-700 border border-slate-200">
                                {t.referenceNo}
                              </span>
                            </td>
                            <td className="py-4 px-5">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                  isIncome
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : 'bg-rose-50 text-rose-800 border-rose-200'
                                }`}
                              >
                                {t.category}
                              </span>
                            </td>
                            <td className="py-4 px-5">
                              <p className="font-extrabold text-slate-900 text-sm lg:text-base leading-snug">
                                {t.description}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Pihak / Sumber: <strong className="text-slate-700">{t.vendor}</strong>
                                {t.recordedBy ? ` • Dicatat oleh: ${t.recordedBy}` : ''}
                              </p>
                            </td>
                            <td className="py-4 px-5 text-slate-600 text-xs font-medium whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                                {t.paymentMethod || 'Tunai Kas'}
                              </span>
                            </td>
                            <td
                              className={`py-4 px-5 text-right font-black text-base lg:text-lg whitespace-nowrap ${
                                isIncome ? 'text-emerald-600' : 'text-rose-600'
                              }`}
                            >
                              {isIncome ? '+ ' : '- '}
                              {formatRupiah(t.amount)}
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
      </main>
    </div>
  );
}
