'use client';

import React, { useEffect, useState } from 'react';
import {
  formatMonthLabel,
  formatWhatsAppLink,
  INDONESIAN_MONTHS,
  SECTION_NAMES,
  useAngkatan,
} from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

const YEAR_OPTIONS = ['2025', '2026', '2027', '2028'];

export default function PembayaranIuranPage() {
  const {
    activeAngkatan,
    canEdit,
    members,
    transactions,
    duesNominal,
    waTemplate,
    activeMonth,
    setActiveMonth,
    activePaymentDate,
    setActivePaymentDate,
    monthlySessionCount,
    setMonthlySessionCount,
    sessions,
    toggleSessionDues,
    payMultipleSessionsDues,
    clearMemberMonthDues,
    markAllMembersSessionDues,
    clearAllMembersSessionDues,
  } = useAngkatan();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'ALL' | 'BELUM_PENUH' | 'LUNAS_PENUH' | 'TUNGGAKAN'
  >('ALL');
  const [sectionFilter, setSectionFilter] = useState<string>('ALL');
  const [bulkTargetSession, setBulkTargetSession] = useState<string>('P1');

  const [selectedYear, selectedMonthNum] = (activeMonth || '2026-09').split('-');

  const handleMonthChange = (newYear: string, newMonthNum: string) => {
    setActiveMonth(`${newYear}-${newMonthNum}`);
  };

  const handleStepMonth = (delta: number) => {
    const y = Number(selectedYear) || 2026;
    const m = Number(selectedMonthNum) || 1;
    const d = new Date(y, m - 1 + delta, 1);
    const nextY = String(d.getFullYear());
    const nextM = String(d.getMonth() + 1).padStart(2, '0');
    setActiveMonth(`${nextY}-${nextM}`);
  };

  const filtered = members.filter((m) => {
    const matchSearch =
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.kelas || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.instrument.toLowerCase().includes(searchQuery.toLowerCase());

    const isFullPaid = m.paidSessions.length >= monthlySessionCount;
    const matchStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'LUNAS_PENUH' && isFullPaid) ||
      (statusFilter === 'BELUM_PENUH' && !isFullPaid) ||
      (statusFilter === 'TUNGGAKAN' && (m.arrears?.length || 0) > 0);

    const matchSection = sectionFilter === 'ALL' || m.section === sectionFilter;
    return matchSearch && matchStatus && matchSection;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(20);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sectionFilter, activeMonth, activeAngkatan]);

  const totalItems = filtered.length;
  const totalPages = pageSize === -1 ? 1 : Math.ceil(totalItems / pageSize) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * (pageSize === -1 ? totalItems : pageSize);
  const endIndex = pageSize === -1 ? totalItems : Math.min(startIndex + pageSize, totalItems);
  const displayed = pageSize === -1 ? filtered : filtered.slice(startIndex, endIndex);

  // Statistik Bulan Aktif
  const fullPaidCount = members.filter(
    (m) => m.paidSessions.length >= monthlySessionCount
  ).length;
  const notFullPaidCount = members.length - fullPaidCount;
  const membersWithArrearsCount = members.filter(
    (m) => (m.arrears?.length || 0) > 0
  ).length;

  const totalPaidOccurrencesInMonth = members.reduce(
    (acc, m) => acc + (m.paidSessions?.length || 0),
    0
  );
  const totalKasIuranBulanIni = totalPaidOccurrencesInMonth * duesNominal;

  // Cek 1 Baris Rekap Pemasukan Kas untuk Tanggal Latihan / Setor Hari Ini (activePaymentDate)
  const todayRecapRefNo = `REKAP-MB${activeAngkatan}-${activePaymentDate}`;
  const todayRecapTx = transactions.find((t) => t.referenceNo === todayRecapRefNo);

  const buildWaUrlForMember = (m: (typeof members)[number]) => {
    const unpaidCurrentSessions = sessions
      .filter((s) => !m.paidSessions.includes(s.id))
      .map((s) => s.id);
    const arrearsList = m.arrears || [];

    const parts: string[] = [];
    let countUnpaid = 0;

    if (unpaidCurrentSessions.length > 0) {
      parts.push(
        `${unpaidCurrentSessions.join(', ')} (${formatMonthLabel(activeMonth)})`
      );
      countUnpaid += unpaidCurrentSessions.length;
    }
    if (arrearsList.length > 0) {
      const arrearLabels = arrearsList.map((a) => a.shortLabel).join(', ');
      parts.push(`Tunggakan Bulan Lalu (${arrearLabels})`);
      countUnpaid += arrearsList.length;
    }

    if (parts.length === 0) {
      parts.push(`Iuran ${formatMonthLabel(activeMonth)}`);
      countUnpaid = 1;
    }

    return formatWhatsAppLink(m.phone, waTemplate, {
      nama: m.fullName,
      kelas: m.kelas,
      seksi: `${m.section} - ${m.instrument}`,
      angkatan: `MB${activeAngkatan}`,
      pertemuan: parts.join(' + '),
      nominal: formatRupiah(countUnpaid * duesNominal),
    });
  };

  const handleBulkCheckAll = async () => {
    const targetIds = filtered.map((m) => m.id);
    if (targetIds.length === 0) return;
    const label =
      bulkTargetSession === 'ALL'
        ? `SELURUH Pertemuan (P1–P${monthlySessionCount})`
        : `Pertemuan ${bulkTargetSession}`;
    if (
      !window.confirm(
        `Tandai LUNAS ${label} untuk ${targetIds.length} siswa yang tampil saat ini pada tanggal terima ${activePaymentDate}?`
      )
    ) {
      return;
    }
    await markAllMembersSessionDues(bulkTargetSession, targetIds);
  };

  const handleBulkClearAll = async () => {
    const targetIds = filtered.map((m) => m.id);
    if (targetIds.length === 0) return;
    const label =
      bulkTargetSession === 'ALL'
        ? `SELURUH Pertemuan (P1–P${monthlySessionCount})`
        : `Pertemuan ${bulkTargetSession}`;
    if (
      !window.confirm(
        `Hapus / Batalkan status lunas ${label} untuk ${targetIds.length} siswa yang tampil saat ini? (Rekap di Pemasukan Kas juga akan otomatis dikurangi/dihapus).`
      )
    ) {
      return;
    }
    await clearAllMembersSessionDues(bulkTargetSession, targetIds);
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-5 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            SISTEM IURAN PER PERTEMUAN ({formatRupiah(duesNominal)} / LATIHAN)
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
            Pembayaran Iuran — Angkatan {activeAngkatan} (MB{activeAngkatan})
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Klik langsung kotak <strong>P1–P{monthlySessionCount}</strong> pada nama siswa, atau gunakan tombol{' '}
            <strong>Ceklis Semua / Hapus Semua</strong>. Seluruh pembayaran di tanggal yang sama otomatis menjadi{' '}
            <strong className="text-on-surface">1 baris Rekap Total</strong> di Pemasukan Kas.
          </p>
        </div>
      </div>

      {/* BARIS KONTROL UTAMA: 1. Pilih Bulan, 2. Jumlah Latihan Bulan Ini, 3. Tanggal Setor Rekap BKM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 1. Pemilih Bulan */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-xs flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              1. Periode Bulan Kas
            </span>
            <span className="text-[11px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              {formatMonthLabel(activeMonth)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleStepMonth(-1)}
              className="px-2.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs cursor-pointer"
              title="Bulan Sebelumnya"
            >
              ◀
            </button>
            <select
              value={selectedMonthNum}
              onChange={(e) => handleMonthChange(selectedYear, e.target.value)}
              className="flex-1 px-2.5 py-2 rounded-xl border border-outline-variant bg-white text-xs sm:text-sm font-bold text-on-surface outline-none"
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
              className="w-24 px-2.5 py-2 rounded-xl border border-outline-variant bg-white text-xs sm:text-sm font-bold text-on-surface outline-none"
            >
              {YEAR_OPTIONS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleStepMonth(1)}
              className="px-2.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs cursor-pointer"
              title="Bulan Berikutnya"
            >
              ▶
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Ganti bulan kapan saja. Tunggakan bulan lalu otomatis tampil di bulan berjalan.
          </p>
        </div>

        {/* 2. Pengaturan Jumlah Latihan / Pertemuan Bulan Ini */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-xs flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              2. Jumlah Latihan ({formatMonthLabel(activeMonth)})
            </span>
            <span className="text-[11px] font-extrabold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
              {monthlySessionCount}x Pertemuan
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!canEdit || monthlySessionCount <= 1}
              onClick={() => setMonthlySessionCount(monthlySessionCount - 1)}
              className="w-10 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high disabled:opacity-40 font-extrabold text-base text-on-surface cursor-pointer"
              title="Kurangi 1 Pertemuan"
            >
              −
            </button>
            <select
              disabled={!canEdit}
              value={monthlySessionCount}
              onChange={(e) => setMonthlySessionCount(Number(e.target.value))}
              className="flex-1 px-3 py-2 rounded-xl border border-outline-variant bg-white text-xs sm:text-sm font-extrabold text-center text-on-surface outline-none"
            >
              {Array.from({ length: 16 }, (_, i) => i + 1).map((cnt) => (
                <option key={cnt} value={cnt}>
                  {cnt} Pertemuan (P1 s/d P{cnt})
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={!canEdit || monthlySessionCount >= 24}
              onClick={() => setMonthlySessionCount(monthlySessionCount + 1)}
              className="w-10 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high disabled:opacity-40 font-extrabold text-base text-on-surface cursor-pointer"
              title="Tambah 1 Pertemuan"
            >
              +
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Sesuaikan jumlah pertemuan jika bulan ini ada libur atau latihan tambahan.
          </p>
        </div>

        {/* 3. Tanggal Setor Hari Latihan (Rekap 1 Baris Pemasukan Kas) */}
        <div className="lg:col-span-4 bg-emerald-950 text-white rounded-2xl p-4 border border-emerald-800 shadow-xs flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              3. Tanggal Terima Uang (Rekap BKM)
            </span>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Otomatis 1 Baris BKM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={activePaymentDate}
              onChange={(e) => setActivePaymentDate(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-emerald-900/90 border border-emerald-700 text-white font-bold text-xs sm:text-sm outline-none"
            />
            <div className="flex-1 text-right">
              <span className="text-[10px] text-emerald-300 block">
                Total Diterima ({activePaymentDate}):
              </span>
              <span className="text-sm sm:text-base font-extrabold text-amber-400">
                {formatRupiah(todayRecapTx ? todayRecapTx.amount : 0)}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-emerald-200/90 truncate">
            {todayRecapTx
              ? `✓ ${todayRecapTx.description}`
              : 'Belum ada setoran iuran pada tanggal ini.'}
          </p>
        </div>
      </div>

      {/* 4 Kartu Ringkasan */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
            Total Pembayaran ({formatMonthLabel(activeMonth)})
          </span>
          <p className="text-lg sm:text-2xl font-extrabold text-emerald-600">
            {totalPaidOccurrencesInMonth}x Bayar
          </p>
          <span className="text-[11px] text-on-surface-variant">
            Dari {members.length} siswa aktif
          </span>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
            Lunas Penuh (P1–P{monthlySessionCount})
          </span>
          <p className="text-lg sm:text-2xl font-extrabold text-on-surface">
            {fullPaidCount} / {members.length} Siswa
          </p>
          <span className="text-[11px] text-on-surface-variant">
            {notFullPaidCount} siswa belum penuh
          </span>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
            Ada Tunggakan Bulan Lalu
          </span>
          <p className="text-lg sm:text-2xl font-extrabold text-amber-600">
            {membersWithArrearsCount} Siswa
          </p>
          <span className="text-[11px] text-on-surface-variant">
            Bisa langsung dilunasi di bawah
          </span>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
            Total Kas Iuran {formatMonthLabel(activeMonth)}
          </span>
          <p className="text-lg sm:text-2xl font-extrabold text-secondary">
            {formatRupiah(totalKasIuranBulanIni)}
          </p>
          <span className="text-[11px] text-on-surface-variant">
            @{formatRupiah(duesNominal)} / pertemuan
          </span>
        </div>
      </div>

      {/* Filter, Aksi Massal (Ceklis Semua / Hapus Semua), & Tabel */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden">
        {/* Baris 1: Pencarian & Filter */}
        <div className="p-4 border-b border-outline-variant/40 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, kelas, seksi, atau alat..."
              className="px-3.5 py-2 rounded-xl border border-outline-variant text-xs sm:text-sm outline-none w-full sm:w-64"
            />
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-outline-variant text-xs sm:text-sm bg-white outline-none"
            >
              <option value="ALL">Semua Seksi</option>
              {SECTION_NAMES.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'ALL', label: `Semua Siswa (${members.length})` },
              {
                id: 'BELUM_PENUH',
                label: `Belum Penuh (${notFullPaidCount})`,
              },
              {
                id: 'LUNAS_PENUH',
                label: `Lunas Penuh (${fullPaidCount})`,
              },
              {
                id: 'TUNGGAKAN',
                label: `Tunggakan Bulan Lalu (${membersWithArrearsCount})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Baris 2: Aksi Cepat Massal (Ceklis Semua / Hapus Semua) */}
        {canEdit && members.length > 0 && (
          <div className="px-4 py-3 bg-slate-50 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-extrabold text-slate-800">
                ⚡ Aksi Cepat Massal ({filtered.length} Siswa):
              </span>
              <select
                value={bulkTargetSession}
                onChange={(e) => setBulkTargetSession(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-slate-900 text-xs outline-none"
              >
                {sessions.map((s) => {
                  const cnt = members.filter((m) =>
                    m.paidSessions.includes(s.id)
                  ).length;
                  return (
                    <option key={s.id} value={s.id}>
                      Pertemuan {s.id} ({cnt}/{members.length} Lunas)
                    </option>
                  );
                })}
                <option value="ALL">
                  Semua Pertemuan Bulan Ini (P1 s/d P{monthlySessionCount})
                </option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleBulkCheckAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-2xs transition cursor-pointer"
              >
                <span>✓ Ceklis Semua (Bayar Semua)</span>
              </button>
              <button
                type="button"
                onClick={handleBulkClearAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold text-xs transition cursor-pointer"
              >
                <span>✕ Hapus Semua Ceklis</span>
              </button>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="p-10 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl opacity-40 block mb-2">
              payments
            </span>
            <p className="text-sm font-bold text-on-surface">
              Tidak ada data anggota yang sesuai filter
            </p>
            <p className="text-xs mt-1">
              Tambahkan atau Import Excel data anggota terlebih dahulu di menu{' '}
              <strong>Database Anggota</strong>.
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE (Layar >= md) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] border-b border-outline-variant/40">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Anggota &amp; Kelas</th>
                    <th className="py-3 px-4">Seksi / Alat</th>
                    <th className="py-3 px-4">
                      Checklist {formatMonthLabel(activeMonth)} (P1–P{monthlySessionCount})
                    </th>
                    <th className="py-3 px-4 text-right">Aksi Cepat &amp; WA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {displayed.map((m, idx) => {
                    const paidCount = m.paidSessions.length;
                    const isFullPaid = paidCount >= monthlySessionCount;
                    const arrearsList = m.arrears || [];
                    const waUrl = buildWaUrlForMember(m);

                    return (
                      <tr key={m.id} className="hover:bg-surface-container-low/50">
                        <td className="py-3 px-4 font-mono text-on-surface-variant">
                          {startIndex + idx + 1}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-on-surface block">
                            {m.fullName}
                          </span>
                          <span className="text-xs text-on-surface-variant">
                            Kelas: <strong>{m.kelas || '-'}</strong>
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
                          <div className="flex flex-wrap gap-1">
                            {sessions.map((s) => {
                              const paid = m.paidSessions.includes(s.id);
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  disabled={!canEdit}
                                  onClick={() => toggleSessionDues(m.id, s.id)}
                                  title={`${s.label}: ${
                                    paid
                                      ? 'Sudah Lunas (Klik untuk Batalkan)'
                                      : 'Belum Bayar (Klik untuk Lunas)'
                                  }`}
                                  className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold border transition ${
                                    paid
                                      ? 'bg-emerald-600 text-white border-emerald-700'
                                      : 'bg-surface-container text-on-surface-variant border-outline-variant/50 hover:bg-surface-container-high'
                                  } ${
                                    canEdit ? 'cursor-pointer' : 'cursor-default'
                                  }`}
                                >
                                  {s.id} {paid ? '✓' : ''}
                                </button>
                              );
                            })}
                          </div>
                          <span className="text-[11px] text-on-surface-variant mt-1 block">
                            Terbayar: <strong>{paidCount}/{monthlySessionCount}</strong> pertemuan (
                            {formatRupiah(paidCount * duesNominal)})
                          </span>

                          {/* Tampilan Langsung Tunggakan Bulan Lalu */}
                          {arrearsList.length > 0 && (
                            <div className="mt-2 p-2 rounded-xl bg-amber-50 border border-amber-300/80 flex flex-wrap items-center gap-1.5">
                              <span className="text-[11px] font-extrabold text-amber-900">
                                ⚠️ Tunggakan Bulan Lalu (
                                {formatRupiah(arrearsList.length * duesNominal)}):
                              </span>
                              {arrearsList.map((arr) => (
                                <button
                                  key={arr.fullKey}
                                  type="button"
                                  disabled={!canEdit}
                                  onClick={() => toggleSessionDues(m.id, arr.fullKey)}
                                  className="px-2 py-0.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[10px] shadow-2xs cursor-pointer transition"
                                >
                                  + Bayar {arr.shortLabel}
                                </button>
                              ))}
                              {canEdit && arrearsList.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    payMultipleSessionsDues(
                                      m.id,
                                      arrearsList.map((a) => a.fullKey)
                                    )
                                  }
                                  className="px-2 py-0.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-[10px] cursor-pointer"
                                >
                                  ✓ Lunasi Semua ({arrearsList.length}x)
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex flex-wrap items-center justify-end gap-1.5">
                            {canEdit && !isFullPaid && (
                              <button
                                type="button"
                                onClick={() =>
                                  payMultipleSessionsDues(
                                    m.id,
                                    sessions.map((s) => s.id)
                                  )
                                }
                                className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-2xs cursor-pointer"
                                title="Ceklis lunas seluruh pertemuan bulan ini untuk siswa ini"
                              >
                                ✓ Bayar Semua
                              </button>
                            )}

                            {canEdit && paidCount > 0 && (
                              <button
                                type="button"
                                onClick={() => clearMemberMonthDues(m.id)}
                                className="px-2.5 py-1.5 rounded-xl bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-800 font-bold text-[11px] cursor-pointer"
                                title="Hapus semua ceklis bulan ini untuk siswa ini"
                              >
                                ✕ Reset
                              </button>
                            )}

                            {(!isFullPaid || arrearsList.length > 0) && (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-[11px] shadow-2xs transition"
                              >
                                <span className="material-symbols-outlined text-[14px]">
                                  chat
                                </span>
                                Ingatkan WA
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD LIST (Layar < md) — TANPA PERLU GESER LAYAR KE KANAN */}
            <div className="md:hidden divide-y divide-outline-variant/30">
              {displayed.map((m, idx) => {
                const paidCount = m.paidSessions.length;
                const isFullPaid = paidCount >= monthlySessionCount;
                const arrearsList = m.arrears || [];
                const waUrl = buildWaUrlForMember(m);

                return (
                  <div key={m.id} className="p-4 flex flex-col gap-3">
                    {/* Baris Atas: Nama, Kelas, Seksi, dan Progress */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-extrabold text-sm text-on-surface">
                          {startIndex + idx + 1}. {m.fullName}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          Kelas <strong>{m.kelas || '-'}</strong> • {m.section} (
                          {m.instrument})
                        </p>
                      </div>
                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                          isFullPaid
                            ? 'bg-emerald-100 text-emerald-800'
                            : paidCount > 0
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {paidCount}/{monthlySessionCount} Lunas
                      </span>
                    </div>

                    {/* Baris Tengah: Kotak Pertemuan P1 - PN Bulan Ini */}
                    <div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {sessions.map((s) => {
                          const paid = m.paidSessions.includes(s.id);
                          return (
                            <button
                              key={s.id}
                              type="button"
                              disabled={!canEdit}
                              onClick={() => toggleSessionDues(m.id, s.id)}
                              className={`py-1.5 px-2 rounded-lg text-xs font-extrabold border flex items-center justify-center gap-1 transition ${
                                paid
                                  ? 'bg-emerald-600 text-white border-emerald-700'
                                  : 'bg-surface-container text-on-surface-variant border-outline-variant/60'
                              }`}
                            >
                              <span>{s.id}</span>
                              <span>{paid ? '✓' : ''}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Kotak Tunggakan Bulan Lalu di Mobile */}
                    {arrearsList.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-extrabold text-amber-900">
                            ⚠️ Tunggakan Bulan Lalu ({arrearsList.length}x ={' '}
                            {formatRupiah(arrearsList.length * duesNominal)})
                          </span>
                          {canEdit && arrearsList.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                payMultipleSessionsDues(
                                  m.id,
                                  arrearsList.map((a) => a.fullKey)
                                )
                              }
                              className="px-2 py-0.5 rounded-md bg-emerald-700 text-white font-extrabold text-[10px] cursor-pointer"
                            >
                              Lunasi Semua
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {arrearsList.map((arr) => (
                            <button
                              key={arr.fullKey}
                              type="button"
                              disabled={!canEdit}
                              onClick={() => toggleSessionDues(m.id, arr.fullKey)}
                              className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-extrabold text-xs shadow-2xs cursor-pointer"
                            >
                              + Bayar {arr.shortLabel}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Baris Bawah: Tombol Bayar Semua, Reset, & Ingatkan WA */}
                    <div className="flex items-center gap-2 pt-1">
                      {canEdit && !isFullPaid && (
                        <button
                          type="button"
                          onClick={() =>
                            payMultipleSessionsDues(
                              m.id,
                              sessions.map((s) => s.id)
                            )
                          }
                          className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-xs cursor-pointer"
                        >
                          ✓ Bayar Semua
                        </button>
                      )}

                      {canEdit && paidCount > 0 && (
                        <button
                          type="button"
                          onClick={() => clearMemberMonthDues(m.id)}
                          className="py-2 px-3 rounded-xl bg-slate-200 text-slate-800 font-extrabold text-xs cursor-pointer"
                        >
                          ✕ Reset
                        </button>
                      )}

                      {(!isFullPaid || arrearsList.length > 0) && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-2.5 rounded-xl bg-[#25D366] text-white font-extrabold text-xs flex items-center justify-center gap-1 shadow-xs"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            chat
                          </span>
                          Ingatkan WA
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Kontrol Paginasi Siswa (Desktop & Mobile) */}
            <div className="p-3 sm:p-4 bg-surface-container-low border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-on-surface-variant">
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5">
                <span>
                  Menampilkan{' '}
                  <span className="font-black text-on-surface">
                    {totalItems === 0 ? 0 : startIndex + 1} - {endIndex}
                  </span>{' '}
                  dari <span className="font-black text-on-surface">{totalItems}</span> siswa
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-outline-variant/60">|</span>
                  <label htmlFor="pageSizeSelectIuran" className="text-on-surface-variant font-normal">
                    Per hal:
                  </label>
                  <select
                    id="pageSizeSelectIuran"
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-surface-container border border-outline-variant/60 rounded-lg px-2 py-1 text-xs font-black text-on-surface outline-none cursor-pointer focus:ring-1 focus:ring-amber-500"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={-1}>Semua</option>
                  </select>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-1 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safeCurrentPage <= 1}
                    className="px-2 sm:px-2.5 py-1.5 rounded-lg border border-outline-variant/60 bg-surface text-on-surface disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-colors flex items-center gap-1 text-xs font-black cursor-pointer shadow-2xs"
                    title="Halaman Sebelumnya"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </button>

                  <div className="flex items-center gap-1 px-0.5">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      if (
                        totalPages > 5 &&
                        Math.abs(pageNum - safeCurrentPage) > 1 &&
                        pageNum !== 1 &&
                        pageNum !== totalPages
                      ) {
                        if (Math.abs(pageNum - safeCurrentPage) === 2) {
                          return (
                            <span key={pageNum} className="text-outline-variant px-0.5">
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
                              ? 'bg-primary text-on-primary shadow-xs'
                              : 'bg-surface text-on-surface border border-outline-variant/50 hover:bg-surface-container'
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
                    className="px-2 sm:px-2.5 py-1.5 rounded-lg border border-outline-variant/60 bg-surface text-on-surface disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-colors flex items-center gap-1 text-xs font-black cursor-pointer shadow-2xs"
                    title="Halaman Berikutnya"
                  >
                    <span className="hidden sm:inline">Berikutnya</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
