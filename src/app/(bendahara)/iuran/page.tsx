'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function IuranPage() {
  const {
    activeAngkatan,
    canEdit,
    members,
    duesNominal,
    toggleMemberDues,
  } = useAngkatan();

  const [searchQuery, setSearchQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [autoRecordCash, setAutoRecordCash] = useState(true);

  const lunasMembers = members.filter((m) => m.duesStatus === 'LUNAS');
  const belumMembers = members.filter((m) => m.duesStatus === 'BELUM BAYAR');
  const totalTerkumpul = lunasMembers.reduce((sum, m) => sum + (m.duesAmount || duesNominal), 0);
  const totalTunggakan = belumMembers.reduce((sum, m) => sum + (m.duesAmount || duesNominal), 0);

  const filtered = members.filter((m) => {
    const matchName =
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSec = sectionFilter === 'ALL' || m.section === sectionFilter;
    const matchStat = statusFilter === 'ALL' || m.duesStatus === statusFilter;
    return matchName && matchSec && matchStat;
  });

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            MODUL PEMBAYARAN IURAN
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
            Checklist Iuran Siswa — Angkatan {activeAngkatan} (MB{activeAngkatan})
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Pencatatan iuran rutin ({formatRupiah(duesNominal)}/siswa) khusus untuk Angkatan {activeAngkatan}.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 bg-surface-container-lowest px-3.5 py-2 rounded-xl border border-outline-variant/50 text-xs font-semibold text-on-surface cursor-pointer">
          <input
            type="checkbox"
            checked={autoRecordCash}
            onChange={(e) => setAutoRecordCash(e.target.checked)}
            className="w-4 h-4 rounded accent-amber-500"
          />
          <span>Otomatis catat ke Pemasukan Kas saat ditandai Lunas</span>
        </label>
      </div>

      {/* 4 Kartu Ringkasan Iuran */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Total Siswa MB{activeAngkatan}
          </span>
          <p className="text-2xl font-extrabold text-on-surface">
            {members.length} Siswa
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            Terdaftar di Angkatan {activeAngkatan}
          </p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Sudah Lunas
          </span>
          <p className="text-2xl font-extrabold text-emerald-600">
            {lunasMembers.length} Siswa
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            Terkumpul: {formatRupiah(totalTerkumpul)}
          </p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Belum Bayar
          </span>
          <p className="text-2xl font-extrabold text-rose-600">
            {belumMembers.length} Siswa
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            Belum masuk: {formatRupiah(totalTunggakan)}
          </p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Tarif Iuran
          </span>
          <p className="text-2xl font-extrabold text-secondary">
            {formatRupiah(duesNominal)}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            Dapat diatur di menu Pengaturan
          </p>
        </div>
      </div>

      {/* Filter & Tabel Iuran */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Cari nama siswa Angkatan ${activeAngkatan}...`}
            className="px-3.5 py-2 rounded-xl border border-outline-variant text-xs sm:text-sm outline-none w-full md:w-72"
          />

          <div className="flex flex-wrap gap-2">
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-outline-variant text-xs font-semibold bg-white"
            >
              <option value="ALL">Semua Seksi</option>
              <option value="Brass">Brass</option>
              <option value="Percussion">Percussion</option>
              <option value="Color Guard">Color Guard</option>
              <option value="Pit Instrument">Pit Instrument</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-outline-variant text-xs font-semibold bg-white"
            >
              <option value="ALL">Semua Status</option>
              <option value="LUNAS">Sudah Lunas</option>
              <option value="BELUM BAYAR">Belum Bayar</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl opacity-40 block mb-2">
              credit_card
            </span>
            <p className="text-sm font-bold text-on-surface">
              Belum ada daftar siswa di Angkatan {activeAngkatan}
            </p>
            <p className="text-xs mt-1 mb-4">
              Tambahkan siswa terlebih dahulu pada menu <strong>Database Anggota</strong>.
            </p>
            <Link
              href="/anggota"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-bold"
            >
              <span>Buka Database Anggota MB{activeAngkatan}</span>
              <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] border-b border-outline-variant/40">
                <tr>
                  <th className="py-3 px-4">Kode</th>
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">Seksi</th>
                  <th className="py-3 px-4 text-right">Nominal</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4">Waktu Bayar</th>
                  {canEdit && <th className="py-3 px-4 text-right">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-surface-container-low/50">
                    <td className="py-3 px-4 font-mono font-semibold text-on-surface-variant">
                      {m.memberCode}
                    </td>
                    <td className="py-3 px-4 font-bold text-on-surface">
                      {m.fullName}
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">
                      {m.section} ({m.instrument})
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-on-surface">
                      {formatRupiah(m.duesAmount || duesNominal)}
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
                    <td className="py-3 px-4 text-xs text-on-surface-variant">
                      {m.paidAt}
                    </td>
                    {canEdit && (
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => toggleMemberDues(m.id, autoRecordCash)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            m.duesStatus === 'LUNAS'
                              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {m.duesStatus === 'LUNAS' ? 'Batalkan Lunas' : '✓ Tandai Lunas'}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
