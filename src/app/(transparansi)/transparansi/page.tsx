'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ANGKATAN_LIST, useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function TransparansiSiswaPage() {
  const router = useRouter();
  const {
    activeAngkatan,
    setActiveAngkatan,
    members,
    transactions,
    totalPemasukan,
    totalPengeluaran,
    saldoAkhir,
    duesNominal,
    logout,
  } = useAngkatan();

  const [searchMember, setSearchMember] = useState('');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [activeView, setActiveView] = useState<'semua' | 'iuran' | 'mutasi'>('semua');

  const lunasCount = members.filter((m) => m.duesStatus === 'LUNAS').length;
  const belumCount = members.length - lunasCount;
  const kepatuhanPersen =
    members.length > 0 ? Math.round((lunasCount / members.length) * 100) : 0;

  const filteredMembers = members.filter((m) => {
    const matchName =
      m.fullName.toLowerCase().includes(searchMember.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(searchMember.toLowerCase());
    const matchSec = sectionFilter === 'ALL' || m.section === sectionFilter;
    return matchName && matchSec;
  });

  const handleExit = () => {
    logout();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Header Responsif Web PC & Web Mobile (Tanpa Nama Dummy) */}
      <header className="sticky top-0 z-40 bg-[#131b2e] text-white border-b border-amber-500/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/logo.png"
              alt="Logo Gema Taruna"
              className="w-10 h-10 rounded-xl object-contain bg-white/10 p-1 border border-amber-400/30 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold tracking-tight text-white">
                  KAS GEMA TARUNA
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-extrabold">
                  ANGKATAN {activeAngkatan} (MB{activeAngkatan})
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-semibold">
                  🔒 Mode Hanya Membaca
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate">
                Portal Transparansi Kas Siswa & Anggota — Tanpa Login
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExit}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Keluar / Menu Login</span>
            </button>
          </div>
        </div>

        {/* Bar Pemilih Angkatan (16 s.d. 21) */}
        <div className="bg-slate-900/90 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mr-1 shrink-0">
                Pilih Angkatan:
              </span>
              {ANGKATAN_LIST.map((angk) => {
                const active = activeAngkatan === angk;
                return (
                  <button
                    key={angk}
                    type="button"
                    onClick={() => setActiveAngkatan(angk)}
                    className={`px-3 py-1 rounded-lg text-xs font-extrabold transition shrink-0 cursor-pointer ${
                      active
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Angkatan {angk}
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
                Status Iuran ({members.length})
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
                Mutasi Kas ({transactions.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6 flex-1">
        {/* Banner Informasi Angkatan */}
        <div className="rounded-2xl bg-gradient-to-r from-[#131b2e] to-[#1e293b] text-white p-5 sm:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
              <span>📊 Transparansi Kas Siswa — Angkatan {activeAngkatan}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold">
              Buku Kas Terbuka Angkatan {activeAngkatan} (MB{activeAngkatan})
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Halaman ini menampilkan data pembukuan asli untuk Angkatan {activeAngkatan} dalam mode khusus <strong>Hanya Membaca</strong>. Siswa dapat mengecek status pembayaran iuran dan rincian pemasukan/pengeluaran kas angkatan secara transparan.
            </p>
          </div>
          <div className="bg-white/10 border border-white/15 rounded-xl p-4 shrink-0 min-w-[210px]">
            <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
              Iuran Rutin Angkatan {activeAngkatan}
            </span>
            <span className="text-lg font-extrabold text-white block mt-0.5">
              {formatRupiah(duesNominal)}
            </span>
            <span className="text-[11px] text-slate-300 block mt-0.5">
              Terpisah per angkatan
            </span>
          </div>
        </div>

        {/* 4 Kartu Ringkasan Kas Angkatan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-slate-500">
                Saldo Kas Angkatan {activeAngkatan}
              </span>
              <span className="material-symbols-outlined text-amber-600">
                account_balance_wallet
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900">
              {formatRupiah(saldoAkhir)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Saldo bersih kas MB{activeAngkatan} saat ini
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-slate-500">
                Total Pemasukan (MB{activeAngkatan})
              </span>
              <span className="material-symbols-outlined text-emerald-600">
                south_west
              </span>
            </div>
            <p className="text-2xl font-extrabold text-emerald-600">
              {formatRupiah(totalPemasukan)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {transactions.filter((t) => t.type === 'pemasukan').length} transaksi kas masuk
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-slate-500">
                Total Pengeluaran (MB{activeAngkatan})
              </span>
              <span className="material-symbols-outlined text-rose-600">
                north_east
              </span>
            </div>
            <p className="text-2xl font-extrabold text-rose-600">
              {formatRupiah(totalPengeluaran)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {transactions.filter((t) => t.type === 'pengeluaran').length} transaksi kas keluar
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-slate-500">
                Kepatuhan Iuran (MB{activeAngkatan})
              </span>
              <span className="material-symbols-outlined text-sky-600">
                groups
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900">
              {lunasCount} / {members.length} Siswa
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {kepatuhanPersen}% Lunas • {belumCount} Belum Bayar
            </p>
          </div>
        </div>

        {/* Bagian 1: Tabel Status Iuran Siswa Angkatan */}
        {(activeView === 'semua' || activeView === 'iuran') && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Daftar Status Iuran Siswa — Angkatan {activeAngkatan}
                </h2>
                <p className="text-xs text-slate-500">
                  Ketik nama Anda pada kolom pencarian untuk melihat status pembayaran iuran.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={searchMember}
                  onChange={(e) => setSearchMember(e.target.value)}
                  placeholder="Cari nama siswa..."
                  className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:border-slate-900"
                />
                <select
                  value={sectionFilter}
                  onChange={(e) => setSectionFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none bg-white"
                >
                  <option value="ALL">Semua Seksi</option>
                  <option value="Brass">Brass</option>
                  <option value="Percussion">Percussion</option>
                  <option value="Color Guard">Color Guard</option>
                  <option value="Pit Instrument">Pit Instrument</option>
                </select>
              </div>
            </div>

            {filteredMembers.length === 0 ? (
              <div className="p-10 text-center text-slate-500">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2 block">
                  group_off
                </span>
                <p className="text-sm font-bold text-slate-700">
                  Belum ada data siswa di Angkatan {activeAngkatan}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Data siswa akan tampil di sini setelah diinput oleh Admin Angkatan {activeAngkatan} (MB{activeAngkatan}) atau Super Admin (Pembina).
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Kode</th>
                      <th className="py-3 px-4">Nama Siswa</th>
                      <th className="py-3 px-4">Seksi / Instrumen</th>
                      <th className="py-3 px-4 text-right">Nominal Iuran</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4">Tanggal Bayar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-semibold text-slate-600">
                          {m.memberCode}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {m.fullName}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {m.section} • {m.instrument}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-slate-900">
                          {formatRupiah(m.duesAmount)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              m.duesStatus === 'LUNAS'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {m.duesStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-xs">
                          {m.paidAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Bagian 2: Tabel Riwayat Mutasi Kas Masuk & Keluar Angkatan */}
        {(activeView === 'semua' || activeView === 'mutasi') && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                Riwayat Pemasukan & Pengeluaran Kas — Angkatan {activeAngkatan}
              </h2>
              <p className="text-xs text-slate-500">
                Catatan transparan seluruh kas masuk dan keluar untuk Angkatan {activeAngkatan} (MB{activeAngkatan}).
              </p>
            </div>

            {transactions.length === 0 ? (
              <div className="p-10 text-center text-slate-500">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2 block">
                  receipt_long
                </span>
                <p className="text-sm font-bold text-slate-700">
                  Belum ada catatan transaksi di Angkatan {activeAngkatan}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Transaksi pemasukan dan pengeluaran yang dicatat oleh Admin MB{activeAngkatan} atau Super Admin akan otomatis muncul di sini.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Tanggal</th>
                      <th className="py-3 px-4">No. Bukti</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Uraian Transaksi</th>
                      <th className="py-3 px-4">Dicatat Oleh</th>
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
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              t.type === 'pemasukan'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {t.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {t.description}
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-xs">
                          {t.recordedBy}
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
            )}
          </div>
        )}
      </main>
    </div>
  );
}
