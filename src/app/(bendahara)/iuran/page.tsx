'use client';

import React, { useState } from 'react';
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
    activeSessionId,
    setActiveSessionId,
    toggleSessionDues,
    payMultipleSessionsDues,
  } = useAngkatan();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'ALL' | 'LUNAS' | 'BELUM BAYAR' | 'TUNGGAKAN'
  >('ALL');
  const [sectionFilter, setSectionFilter] = useState<string>('ALL');

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

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) ||
    sessions[0] || {
      id: 'P1',
      fullKey: `${activeMonth}:P1`,
      label: 'Pertemuan 1',
      date: '',
    };

  const filtered = members.filter((m) => {
    const matchSearch =
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.kelas || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.instrument.toLowerCase().includes(searchQuery.toLowerCase());

    const isPaidCurrent = m.paidSessions.includes(activeSessionId);
    const matchStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'LUNAS' && isPaidCurrent) ||
      (statusFilter === 'BELUM BAYAR' && !isPaidCurrent) ||
      (statusFilter === 'TUNGGAKAN' && (m.arrears?.length || 0) > 0);

    const matchSection = sectionFilter === 'ALL' || m.section === sectionFilter;
    return matchSearch && matchStatus && matchSection;
  });

  // Statistik pada Pertemuan Aktif di Bulan Ini
  const paidOnActiveSession = members.filter((m) =>
    m.paidSessions.includes(activeSessionId)
  ).length;
  const unpaidOnActiveSession = members.length - paidOnActiveSession;
  const membersWithArrearsCount = members.filter(
    (m) => (m.arrears?.length || 0) > 0
  ).length;

  // Total seluruh pembayaran pada Bulan Aktif
  const totalPaidOccurrencesInMonth = members.reduce(
    (acc, m) => acc + (m.paidSessions?.length || 0),
    0
  );
  const totalKasIuranBulanIni = totalPaidOccurrencesInMonth * duesNominal;

  // Cek 1 Baris Rekap Pemasukan Kas untuk Tanggal Latihan / Setor Hari Ini (activePaymentDate)
  const todayRecapRefNo = `REKAP-MB${activeAngkatan}-${activePaymentDate}`;
  const todayRecapTx = transactions.find((t) => t.referenceNo === todayRecapRefNo);

  const buildWaUrlForMember = (m: (typeof members)[number]) => {
    const isPaidActive = m.paidSessions.includes(activeSessionId);
    const arrearsList = m.arrears || [];

    const parts: string[] = [];
    let countUnpaid = 0;

    if (!isPaidActive) {
      parts.push(`${activeSession.id} (${formatMonthLabel(activeMonth)})`);
      countUnpaid += 1;
    }
    if (arrearsList.length > 0) {
      const arrearLabels = arrearsList.map((a) => a.shortLabel).join(', ');
      parts.push(`Tunggakan Bulan Lalu (${arrearLabels})`);
      countUnpaid += arrearsList.length;
    }

    if (parts.length === 0) {
      parts.push(`${activeSession.id} (${formatMonthLabel(activeMonth)})`);
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
            Seluruh siswa yang membayar pada hari yang sama otomatis digabung menjadi{' '}
            <strong className="text-on-surface">1 baris Rekap Total</strong> di Pemasukan Kas.
          </p>
        </div>
      </div>

      {/* BARIS KONTROL UTAMA: 1. Pilih Bulan, 2. Jumlah Latihan Bulan Ini, 3. Tanggal Setor Rekap BKM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 1. Pemilih Bulan (Opsi A - Tab Bulanan) */}
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

      {/* Bar Pilih Pertemuan Aktif (P1 - PN) */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
              PILIH PERTEMUAN LATIHAN — {formatMonthLabel(activeMonth).toUpperCase()}
            </span>
            <p className="text-xs text-slate-300">
              Klik pertemuan yang sedang berlangsung, atau klik langsung kotak{' '}
              <strong className="text-white">P1–P{monthlySessionCount}</strong> &amp;{' '}
              <strong className="text-amber-300">Tunggakan Bulan Lalu</strong> pada baris siswa.
            </p>
          </div>
          <div className="text-xs font-bold text-amber-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 shrink-0">
            Sedang Dibuka: {activeSession.id} ({paidOnActiveSession}/{members.length} Lunas)
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {sessions.map((s) => {
            const isSelected = s.id === activeSessionId;
            const paidCount = members.filter((m) =>
              m.paidSessions.includes(s.id)
            ).length;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSessionId(s.id)}
                className={`px-3.5 py-2 rounded-xl text-left transition shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-extrabold shadow'
                    : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold">{s.id}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                      isSelected
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {paidCount}/{members.length}
                  </span>
                </div>
                <p
                  className={`text-[10px] mt-0.5 truncate max-w-[135px] ${
                    isSelected ? 'text-slate-900 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Kartu Ringkasan */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
            Lunas ({activeSession.id} {formatMonthLabel(activeMonth)})
          </span>
          <p className="text-lg sm:text-2xl font-extrabold text-emerald-600">
            {paidOnActiveSession} Siswa
          </p>
          <span className="text-[11px] text-on-surface-variant">
            {formatRupiah(paidOnActiveSession * duesNominal)}
          </span>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block mb-1">
            Belum Bayar ({activeSession.id})
          </span>
          <p className="text-lg sm:text-2xl font-extrabold text-rose-600">
            {unpaidOnActiveSession} Siswa
          </p>
          <span className="text-[11px] text-on-surface-variant">
            Siap diingatkan via WA
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
            Total Iuran {formatMonthLabel(activeMonth)}
          </span>
          <p className="text-lg sm:text-2xl font-extrabold text-secondary">
            {formatRupiah(totalKasIuranBulanIni)}
          </p>
          <span className="text-[11px] text-on-surface-variant">
            {totalPaidOccurrencesInMonth}x pembayaran bulan ini
          </span>
        </div>
      </div>

      {/* Filter & Pencarian */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden">
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
              { id: 'ALL', label: `Semua (${members.length})` },
              {
                id: 'BELUM BAYAR',
                label: `Belum Lunas ${activeSession.id} (${unpaidOnActiveSession})`,
              },
              {
                id: 'LUNAS',
                label: `Sudah Lunas ${activeSession.id} (${paidOnActiveSession})`,
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
                    <th className="py-3 px-4">Anggota & Kelas</th>
                    <th className="py-3 px-4">Seksi / Alat</th>
                    <th className="py-3 px-4">
                      Checklist {formatMonthLabel(activeMonth)} (P1–P{monthlySessionCount})
                    </th>
                    <th className="py-3 px-4">Status {activeSession.id}</th>
                    <th className="py-3 px-4 text-right">Aksi & Pengingat WA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filtered.map((m) => {
                    const isPaidActive = m.paidSessions.includes(activeSessionId);
                    const arrearsList = m.arrears || [];
                    const waUrl = buildWaUrlForMember(m);

                    return (
                      <tr key={m.id} className="hover:bg-surface-container-low/50">
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
                                  className={`px-2 py-1 rounded-md text-[11px] font-extrabold border transition ${
                                    paid
                                      ? 'bg-emerald-600 text-white border-emerald-700'
                                      : 'bg-surface-container text-on-surface-variant border-outline-variant/50 hover:bg-surface-container-high'
                                  } ${
                                    s.id === activeSessionId
                                      ? 'ring-2 ring-amber-400'
                                      : ''
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
                            Bulan ini: {m.paidSessions.length}/{monthlySessionCount} pertemuan (
                            {formatRupiah(m.paidSessions.length * duesNominal)})
                          </span>

                          {/* Tampilan Langsung Tunggakan Bulan Lalu (Bisa Diklik Langsung di Bulan Berjalan!) */}
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
                                  title={`Klik untuk melunasi tunggakan ${arr.monthLabel} (${arr.sessionId}) pada setoran hari ini (${activePaymentDate})`}
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
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              isPaidActive
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isPaidActive
                              ? `● LUNAS (${activeSession.id})`
                              : `● BELUM (${activeSession.id})`}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center justify-end gap-2">
                            {canEdit && (
                              <button
                                type="button"
                                onClick={() =>
                                  toggleSessionDues(m.id, activeSessionId)
                                }
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                                  isPaidActive
                                    ? 'bg-slate-200 text-slate-700 hover:bg-rose-100 hover:text-rose-800'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                                }`}
                              >
                                {isPaidActive
                                  ? 'Batalkan Lunas'
                                  : `Tandai Lunas ${activeSession.id}`}
                              </button>
                            )}

                            {(!isPaidActive || arrearsList.length > 0) && (
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs shadow-xs transition"
                              >
                                <span className="material-symbols-outlined text-[15px]">
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
              {filtered.map((m) => {
                const isPaidActive = m.paidSessions.includes(activeSessionId);
                const arrearsList = m.arrears || [];
                const waUrl = buildWaUrlForMember(m);

                return (
                  <div key={m.id} className="p-4 flex flex-col gap-3">
                    {/* Baris Atas: Nama, Kelas, Seksi, dan Badge Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-extrabold text-sm text-on-surface">
                          {m.fullName}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          Kelas <strong>{m.kelas || '-'}</strong> • {m.section} (
                          {m.instrument})
                        </p>
                      </div>
                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                          isPaidActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isPaidActive
                          ? `LUNAS ${activeSession.id}`
                          : `BELUM ${activeSession.id}`}
                      </span>
                    </div>

                    {/* Baris Tengah: Kotak Pertemuan P1 - PN Bulan Ini */}
                    <div>
                      <span className="text-[11px] font-semibold text-on-surface-variant block mb-1.5">
                        Checklist {formatMonthLabel(activeMonth)} (Ketuk kotak untuk
                        Lunas / Batal):
                      </span>
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
                              } ${
                                s.id === activeSessionId
                                  ? 'ring-2 ring-amber-400'
                                  : ''
                              }`}
                            >
                              <span>{s.id}</span>
                              <span>{paid ? '✓' : ''}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Kotak Tunggakan Bulan Lalu di Mobile (Langsung Klik Tanpa Pindah Bulan!) */}
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

                    {/* Baris Bawah: Tombol Lunas & Tombol Ingatkan WA berdampingan penuh */}
                    <div className="flex items-center gap-2 pt-1">
                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => toggleSessionDues(m.id, activeSessionId)}
                          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                            isPaidActive
                              ? 'bg-slate-200 text-slate-800 hover:bg-rose-100 hover:text-rose-800'
                              : 'bg-emerald-600 text-white shadow-xs'
                          }`}
                        >
                          {isPaidActive
                            ? `Batalkan Lunas ${activeSession.id}`
                            : `✓ Tandai Lunas ${activeSession.id}`}
                        </button>
                      )}

                      {(!isPaidActive || arrearsList.length > 0) && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            chat
                          </span>
                          Ingatkan via WA
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
