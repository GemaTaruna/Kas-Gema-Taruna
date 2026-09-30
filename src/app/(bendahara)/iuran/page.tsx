'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  formatWhatsAppLink,
  SECTION_NAMES,
  useAngkatan,
} from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function IuranPage() {
  const {
    activeAngkatan,
    canEdit,
    members,
    duesNominal,
    waTemplate,
    sessions,
    activeSessionId,
    setActiveSessionId,
    addCustomSession,
    toggleSessionDues,
  } = useAngkatan();

  const [searchQuery, setSearchQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [newSessionLabel, setNewSessionLabel] = useState('');
  const [newSessionDate, setNewSessionDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const lunasMembers = members.filter((m) =>
    (m.paidSessions || []).includes(activeSessionId)
  );
  const belumMembers = members.filter(
    (m) => !(m.paidSessions || []).includes(activeSessionId)
  );

  const terkumpulPertemuanIni = lunasMembers.length * duesNominal;
  const belumMasukPertemuanIni = belumMembers.length * duesNominal;

  const filtered = members.filter((m) => {
    const isPaidCurrent = (m.paidSessions || []).includes(activeSessionId);
    const statusStr = isPaidCurrent ? 'LUNAS' : 'BELUM BAYAR';
    const matchName =
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.kelas || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchSec =
      sectionFilter === 'ALL' || m.section.toUpperCase() === sectionFilter;
    const matchStat = statusFilter === 'ALL' || statusStr === statusFilter;
    return matchName && matchSec && matchStat;
  });

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomSession(newSessionLabel, newSessionDate);
    setNewSessionLabel('');
    setShowNewSessionModal(false);
  };

  return (
    <div className="p-3 sm:p-6 flex flex-col gap-5 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            CHECKLIST IURAN PER PERTEMUAN LATIHAN
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
            Pembayaran Iuran — Angkatan {activeAngkatan} (MB{activeAngkatan})
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Tarif <strong>{formatRupiah(duesNominal)} / pertemuan</strong> (2x pertemuan seminggu). Klik tombol Lunas untuk mencatat ke Pemasukan Kas, atau klik Batal Lunas untuk otomatis menghapusnya dari Pemasukan Kas.
          </p>
        </div>

        {canEdit && (
          <button
            type="button"
            onClick={() => setShowNewSessionModal(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-bold shadow-xs cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[17px] text-secondary-fixed">
              calendar_add_on
            </span>
            <span>+ Tambah Pertemuan Baru</span>
          </button>
        )}
      </div>

      {/* Bar Pemilih Pertemuan Latihan (P1 s.d. P8+) */}
      <div className="bg-surface-container-lowest rounded-2xl p-3.5 sm:p-4 border border-outline-variant/40 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-on-surface">
            Pilih Sesi / Pertemuan Latihan Aktif:
          </span>
          <span className="text-xs font-bold text-secondary">
            Aktif: {activeSession?.label}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {sessions.map((ses) => {
            const isSelected = ses.id === activeSessionId;
            const paidCount = members.filter((m) =>
              (m.paidSessions || []).includes(ses.id)
            ).length;
            return (
              <button
                key={ses.id}
                type="button"
                onClick={() => setActiveSessionId(ses.id)}
                className={`px-3 py-2 rounded-xl text-left border transition shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-primary-container text-on-primary border-primary-container shadow-sm'
                    : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold">{ses.id}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {paidCount}/{members.length}
                  </span>
                </div>
                <span
                  className={`text-[10px] block truncate max-w-[130px] mt-0.5 ${
                    isSelected ? 'text-slate-300' : 'text-on-surface-variant'
                  }`}
                >
                  {ses.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Kartu Ringkasan Pertemuan Aktif */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block">
            Pertemuan Aktif
          </span>
          <p className="text-base sm:text-lg font-extrabold text-on-surface mt-0.5 truncate">
            {activeSession?.id} — {formatRupiah(duesNominal)}
          </p>
          <p className="text-[11px] text-on-surface-variant truncate">
            {activeSession?.label}
          </p>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block">
            Sudah Lunas ({activeSession?.id})
          </span>
          <p className="text-lg sm:text-xl font-extrabold text-emerald-600 mt-0.5">
            {lunasMembers.length} / {members.length} Siswa
          </p>
          <p className="text-[11px] text-on-surface-variant">
            Masuk: {formatRupiah(terkumpulPertemuanIni)}
          </p>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block">
            Belum Bayar ({activeSession?.id})
          </span>
          <p className="text-lg sm:text-xl font-extrabold text-rose-600 mt-0.5">
            {belumMembers.length} Siswa
          </p>
          <p className="text-[11px] text-on-surface-variant">
            Kurang: {formatRupiah(belumMasukPertemuanIni)}
          </p>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block">
            Target 2x Seminggu
          </span>
          <p className="text-lg sm:text-xl font-extrabold text-secondary mt-0.5">
            {formatRupiah(duesNominal * 2)} / Minggu
          </p>
          <p className="text-[11px] text-on-surface-variant">
            {formatRupiah(duesNominal * 8)} / 8 Pertemuan
          </p>
        </div>
      </div>

      {/* Filter & Daftar Checklist Siswa */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Cari nama / kelas siswa MB${activeAngkatan}...`}
            className="px-3.5 py-2 rounded-xl border border-outline-variant text-xs sm:text-sm outline-none w-full md:w-72"
          />

          <div className="flex flex-wrap gap-2">
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-outline-variant text-xs font-semibold bg-white"
            >
              <option value="ALL">Semua Seksi</option>
              {SECTION_NAMES.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-outline-variant text-xs font-semibold bg-white"
            >
              <option value="ALL">Semua Status ({activeSession?.id})</option>
              <option value="LUNAS">Sudah Lunas ({activeSession?.id})</option>
              <option value="BELUM BAYAR">Belum Bayar ({activeSession?.id})</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl opacity-40 block mb-2">
              credit_card
            </span>
            <p className="text-sm font-bold text-on-surface">
              Belum ada siswa ditemukan di Angkatan {activeAngkatan}
            </p>
            <p className="text-xs mt-1 mb-4">
              Tambahkan atau Import Excel data siswa terlebih dahulu di menu <strong>Database Anggota</strong>.
            </p>
            <Link
              href="/anggota"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-on-primary text-xs font-bold"
            >
              <span>Ke Database Anggota MB{activeAngkatan}</span>
              <span>→</span>
            </Link>
          </div>
        ) : (
          <>
            {/* ==============================================================
                TAMPILAN MOBILE (KARTU RAPI — TANPA PERLU GESER KE KANAN!)
               ============================================================== */}
            <div className="md:hidden divide-y divide-outline-variant/30">
              {filtered.map((m, idx) => {
                const isPaidCurrent = (m.paidSessions || []).includes(activeSessionId);
                const waUrl = formatWhatsAppLink(m.phone, waTemplate, {
                  nama: m.fullName,
                  kelas: m.kelas || '-',
                  seksi: m.section,
                  angkatan: activeAngkatan,
                  pertemuan: activeSession?.label || activeSessionId,
                  nominal: formatRupiah(duesNominal),
                });

                return (
                  <div key={m.id} className="p-3.5 space-y-2.5">
                    {/* Baris 1: Nama, Kelas, Seksi & Badge Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-mono font-bold text-on-surface-variant">
                            {idx + 1}.
                          </span>
                          <span className="text-sm font-extrabold text-on-surface">
                            {m.fullName}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                            {m.kelas || '-'}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          {m.section} • {m.instrument}
                        </p>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                          isPaidCurrent
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {activeSessionId}: {isPaidCurrent ? 'LUNAS' : 'BELUM'}
                      </span>
                    </div>

                    {/* Baris 2: Kotak Cepat Pertemuan P1 - P8 */}
                    <div className="flex flex-wrap items-center gap-1">
                      {sessions.map((ses) => {
                        const paid = (m.paidSessions || []).includes(ses.id);
                        return (
                          <button
                            key={ses.id}
                            type="button"
                            disabled={!canEdit}
                            onClick={() => toggleSessionDues(m.id, ses.id)}
                            title={`${ses.label}: ${paid ? 'Lunas' : 'Belum Bayar'}`}
                            className={`px-2 py-1 rounded text-[10px] font-extrabold border transition cursor-pointer ${
                              paid
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : ses.id === activeSessionId
                                ? 'bg-amber-50 text-amber-900 border-amber-400'
                                : 'bg-surface-container-low text-on-surface-variant border-outline-variant/40'
                            }`}
                          >
                            {ses.id} {paid ? '✓' : ''}
                          </button>
                        );
                      })}
                    </div>

                    {/* Baris 3: Tombol Aksi Langsung (Lunas / Batal Lunas & Ingatkan WA) */}
                    {canEdit && (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => toggleSessionDues(m.id, activeSessionId)}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center justify-center gap-1 ${
                            isPaidCurrent
                              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                          }`}
                        >
                          {isPaidCurrent ? (
                            <>
                              <span className="material-symbols-outlined text-[16px]">
                                undo
                              </span>
                              <span>Batalkan Lunas ({activeSessionId})</span>
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-[16px]">
                                check_circle
                              </span>
                              <span>
                                Tandai Lunas {activeSessionId} ({formatRupiah(duesNominal)})
                              </span>
                            </>
                          )}
                        </button>

                        {!isPaidCurrent && (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-xl bg-[#25D366] hover:opacity-95 text-white text-xs font-extrabold flex items-center justify-center gap-1 shrink-0 shadow-xs"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              chat
                            </span>
                            <span>Ingatkan WA</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ==============================================================
                TAMPILAN DESKTOP (TABEL LENGKAP DENGAN KOTAK PERTEMUAN & WA)
               ============================================================== */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] border-b border-outline-variant/40">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Nama & Kelas</th>
                    <th className="py-3 px-4">Seksi / Alat</th>
                    <th className="py-3 px-4">Rekap Pertemuan (Klik Kotak)</th>
                    <th className="py-3 px-4 text-center">
                      Status {activeSession?.id}
                    </th>
                    {canEdit && <th className="py-3 px-4 text-right">Aksi Cepat</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filtered.map((m, idx) => {
                    const isPaidCurrent = (m.paidSessions || []).includes(
                      activeSessionId
                    );
                    const waUrl = formatWhatsAppLink(m.phone, waTemplate, {
                      nama: m.fullName,
                      kelas: m.kelas || '-',
                      seksi: m.section,
                      angkatan: activeAngkatan,
                      pertemuan: activeSession?.label || activeSessionId,
                      nominal: formatRupiah(duesNominal),
                    });

                    return (
                      <tr key={m.id} className="hover:bg-surface-container-low/50">
                        <td className="py-3 px-4 font-mono font-semibold text-on-surface-variant">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-on-surface block">
                            {m.fullName}
                          </span>
                          <span className="text-xs text-on-surface-variant">
                            Kelas: <strong>{m.kelas || '-'}</strong> • {m.memberCode}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-on-surface block">
                            {m.section}
                          </span>
                          <span className="text-xs text-on-surface-variant">
                            {m.instrument}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap items-center gap-1">
                            {sessions.map((ses) => {
                              const paid = (m.paidSessions || []).includes(ses.id);
                              return (
                                <button
                                  key={ses.id}
                                  type="button"
                                  disabled={!canEdit}
                                  onClick={() => toggleSessionDues(m.id, ses.id)}
                                  title={`${ses.label}: ${
                                    paid ? 'Lunas' : 'Belum Bayar'
                                  }`}
                                  className={`px-2 py-1 rounded text-[10px] font-extrabold border transition cursor-pointer ${
                                    paid
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : ses.id === activeSessionId
                                      ? 'bg-amber-50 text-amber-900 border-amber-400'
                                      : 'bg-surface-container-low text-on-surface-variant border-outline-variant/40 hover:bg-surface-container'
                                  }`}
                                >
                                  {ses.id}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              isPaidCurrent
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isPaidCurrent ? 'LUNAS' : 'BELUM BAYAR'}
                          </span>
                        </td>
                        {canEdit && (
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  toggleSessionDues(m.id, activeSessionId)
                                }
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                  isPaidCurrent
                                    ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                              >
                                {isPaidCurrent
                                  ? 'Batalkan Lunas'
                                  : `✓ Lunas (${formatRupiah(duesNominal)})`}
                              </button>

                              {!isPaidCurrent && (
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Ingatkan via WhatsApp"
                                  className="px-2.5 py-1.5 rounded-lg bg-[#25D366] hover:opacity-90 text-white text-xs font-bold inline-flex items-center gap-1"
                                >
                                  <span className="material-symbols-outlined text-[15px]">
                                    chat
                                  </span>
                                  <span>WA</span>
                                </a>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Modal Tambah Pertemuan Baru */}
      {showNewSessionModal && canEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-extrabold mb-1">
              Tambah Pertemuan Latihan Baru
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Menambahkan sesi pertemuan baru untuk checklist iuran Angkatan {activeAngkatan}.
            </p>
            <form onSubmit={handleCreateSession} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Pertemuan
                </label>
                <input
                  type="text"
                  required
                  value={newSessionLabel}
                  onChange={(e) => setNewSessionLabel(e.target.value)}
                  placeholder={`Contoh: Pertemuan ${sessions.length + 1} (Latihan Gabungan)`}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tanggal Latihan
                </label>
                <input
                  type="date"
                  value={newSessionDate}
                  onChange={(e) => setNewSessionDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewSessionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
                >
                  Tambah Pertemuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
