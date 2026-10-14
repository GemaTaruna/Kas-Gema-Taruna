'use client';

import React, { useState } from 'react';
import { DEFAULT_WA_TEMPLATE, useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

const SUPABASE_INIT_SQL = `create extension if not exists "uuid-ossp";

create table if not exists public.kgt_members (
  id uuid default uuid_generate_v4() primary key,
  angkatan text not null check (angkatan in ('16', '17', '18', '19', '20', '21')),
  member_code text not null,
  full_name text not null,
  section text not null default 'BRASS',
  instrument text default 'Terompet',
  phone text default '',
  status text not null default 'Aktif',
  dues_status text not null default 'BELUM BAYAR',
  paid_at text default '[]',
  dues_amount bigint not null default 10000,
  created_at timestamptz not null default now()
);

create table if not exists public.kgt_transactions (
  id uuid default uuid_generate_v4() primary key,
  angkatan text not null check (angkatan in ('16', '17', '18', '19', '20', '21')),
  reference_no text not null,
  type text not null check (type in ('pemasukan', 'pengeluaran')),
  category text not null,
  description text not null,
  vendor text default '-',
  amount bigint not null check (amount >= 0),
  payment_method text default 'Tunai Kas',
  recorded_by text not null default 'Bendahara',
  transaction_date date not null default current_date,
  created_at timestamptz not null default now()
);

alter table public.kgt_members enable row level security;
alter table public.kgt_transactions enable row level security;

drop policy if exists "Public access kgt_members" on public.kgt_members;
create policy "Public access kgt_members" on public.kgt_members for all using (true) with check (true);

drop policy if exists "Public access kgt_transactions" on public.kgt_transactions;
create policy "Public access kgt_transactions" on public.kgt_transactions for all using (true) with check (true);

-- Aktifkan Realtime otomatis agar setiap perubahan langsung sinkron di semua perangkat tanpa refresh
alter publication supabase_realtime add table public.kgt_members, public.kgt_transactions;`;

export default function PengaturanPage() {
  const {
    activeAngkatan,
    canEdit,
    cloudStatus,
    syncLocalToCloud,
    refreshFromCloud,
    members,
    recalculateAllRecapTransactions,
    clearTransactions,
    duesNominal,
    setDuesNominal,
    waTemplate,
    setWaTemplate,
  } = useAngkatan();

  const [nominalInput, setNominalInput] = useState(String(duesNominal));
  const [waInput, setWaInput] = useState(waTemplate);
  const [savedToast, setSavedToast] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [cashActionLoading, setCashActionLoading] = useState(false);

  const handleRecalculateRecaps = async () => {
    setCashActionLoading(true);
    await recalculateAllRecapTransactions(activeAngkatan);
    setCashActionLoading(false);
    setSyncMessage(`✓ Berhasil menghitung ulang & menyinkronkan seluruh rekap pemasukan iuran sesuai ${members.length} siswa MB${activeAngkatan}!`);
    setTimeout(() => setSyncMessage(''), 6000);
  };

  const handleClearExpenses = async () => {
    if (!window.confirm(`Hapus SEMUA data pengeluaran kas MB${activeAngkatan}? Seluruh catatan belanja lama akan dibersihkan dari perangkat dan database Cloud.`)) {
      return;
    }
    setCashActionLoading(true);
    await clearTransactions('pengeluaran');
    setCashActionLoading(false);
    setSyncMessage(`✓ Seluruh catatan pengeluaran kas MB${activeAngkatan} berhasil dibersihkan!`);
    setTimeout(() => setSyncMessage(''), 6000);
  };

  const handleResetCashbook = async () => {
    if (!window.confirm(`PERINGATAN: Apakah Anda yakin ingin mereset seluruh mutasi kas MB${activeAngkatan}? Seluruh pengeluaran dummy akan dihapus dan rekap pemasukan iuran akan dihitung ulang murni dari data ${members.length} siswa saat ini.`)) {
      return;
    }
    setCashActionLoading(true);
    await clearTransactions('all');
    setCashActionLoading(false);
    setSyncMessage(`✓ Buku kas MB${activeAngkatan} berhasil direset dan direkap ulang bersih dari data ${members.length} siswa!`);
    setTimeout(() => setSyncMessage(''), 6000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(nominalInput.replace(/[^0-9]/g, ''));
    if (num > 0) {
      await setDuesNominal(num);
    }
    if (waInput.trim()) {
      setWaTemplate(waInput.trim());
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(SUPABASE_INIT_SQL);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleManualSync = async () => {
    const res = await syncLocalToCloud();
    setSyncMessage(res.message);
    setTimeout(() => setSyncMessage(''), 6000);
  };

  const handleRefreshCloud = async () => {
    await refreshFromCloud();
    setSyncMessage('Berhasil mengambil data terbaru dari server Cloud Supabase!');
    setTimeout(() => setSyncMessage(''), 6000);
  };

  return (
    <div className="p-3 sm:p-6 flex flex-col gap-5 max-w-[1440px] mx-auto w-full">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          PENGATURAN BUKU KAS &amp; SINKRONISASI CLOUD
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
          Pengaturan Iuran &amp; Database Multi-Perangkat — Angkatan {activeAngkatan}
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Atur tarif iuran per pertemuan, format pesan WhatsApp, dan status sinkronisasi database antar perangkat.
        </p>
      </div>

      {/* Panel Status Database Cloud Multi-Perangkat */}
      <div
        className={`p-5 rounded-2xl border shadow-xs flex flex-col gap-3 ${
          cloudStatus === 'connected'
            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full ${
                  cloudStatus === 'connected'
                    ? 'bg-emerald-600'
                    : 'bg-amber-600 animate-pulse'
                }`}
              />
              <h2 className="text-sm sm:text-base font-extrabold">
                {cloudStatus === 'connected'
                  ? `Database Cloud Supabase Aktif (${members.length} Siswa Terdaftar)`
                  : 'Tabel Database Cloud Belum Diaktifkan di Supabase (Saat Ini Tersimpan di Cache Lokal)'}
              </h2>
            </div>
            <p className="text-xs mt-1 opacity-90">
              {cloudStatus === 'connected'
                ? `Data di perangkat ini saat ini mencatat ${members.length} siswa. Klik "Unggah Data Perangkat Ini ke Cloud" untuk memastikan seluruh data di perangkat ini tersimpan permanen di cloud.`
                : 'Agar data siswa yang ada di perangkat ini langsung muncul di HP dan perangkat lain, klik "Salin Kode SQL", tempel di menu SQL Editor pada Dashboard Supabase Anda, lalu klik Run.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {cloudStatus !== 'connected' && (
              <button
                type="button"
                onClick={handleCopySql}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs cursor-pointer shadow-xs"
              >
                {copiedSql ? '✓ Kode SQL Tersalin!' : '📋 Salin Kode SQL Supabase'}
              </button>
            )}
            <button
              type="button"
              onClick={handleManualSync}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer shadow-xs transition"
            >
              ☁️ Unggah Data Perangkat Ini ke Cloud ({members.length} Siswa)
            </button>
            <button
              type="button"
              onClick={handleRefreshCloud}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs cursor-pointer shadow-xs transition"
            >
              📥 Ambil Data Terbaru dari Cloud
            </button>
          </div>
        </div>

        {syncMessage && (
          <div className="p-3 rounded-xl bg-white/90 border border-slate-300 text-xs font-bold text-slate-900">
            {syncMessage}
          </div>
        )}
      </div>

      {savedToast && (
        <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold">
          ✓ Pengaturan berhasil disimpan!
        </div>
      )}

      {/* Panel Pengelolaan Cache & Buku Kas Angkatan */}
      {canEdit && (
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">account_balance_wallet</span>
                Kelola Transaksi &amp; Sinkronisasi Kas MB{activeAngkatan}
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Gunakan opsi ini jika Anda baru saja memperbarui database ({members.length} siswa) dan ingin memastikan rekap iuran dan pengeluaran kas lama bersih serta akurat.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                disabled={cashActionLoading}
                onClick={handleRecalculateRecaps}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer shadow-xs transition flex items-center gap-1.5"
              >
                <span className={`material-symbols-outlined text-sm ${cashActionLoading ? 'animate-spin' : ''}`}>sync</span>
                {cashActionLoading ? 'Memproses...' : `Hitung Ulang Rekap (${members.length} Siswa)`}
              </button>

              <button
                type="button"
                disabled={cashActionLoading}
                onClick={handleClearExpenses}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs cursor-pointer shadow-xs transition flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
                Hapus Semua Pengeluaran Lama
              </button>

              <button
                type="button"
                disabled={cashActionLoading}
                onClick={handleResetCashbook}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs cursor-pointer shadow-xs transition flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                Reset Kas &amp; Rekap Ulang
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pengaturan Tarif Iuran Per Minggu */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40 shadow-xs flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <h2 className="text-base font-extrabold text-on-surface">
              Tarif Iuran Per Minggu Latihan
            </h2>
            <p className="text-xs text-on-surface-variant">
              Tarif iuran yang dibayarkan <strong>setiap minggu</strong> oleh setiap siswa (default Rp 10.000 / minggu). Setiap kali siswa ditandai <strong>Lunas</strong> pada 1 sesi minggu, jumlah ini dicatat ke Pemasukan Kas.
            </p>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Nominal Iuran per Minggu (Rp)
              </label>
              <input
                type="number"
                required
                min="500"
                value={nominalInput}
                onChange={(e) => setNominalInput(e.target.value)}
                className="w-full border border-outline-variant rounded-xl px-3.5 py-2.5 text-sm font-bold"
              />
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low text-xs text-on-surface-variant space-y-1">
              <p>
                • <strong>1 Minggu:</strong> {formatRupiah(Number(nominalInput) || 10000)}
              </p>
              <p>
                • <strong>4 Minggu (1 Bulan):</strong>{' '}
                {formatRupiah((Number(nominalInput) || 10000) * 4)}
              </p>
              <p>
                • <strong>5 Minggu (Bulan padat):</strong>{' '}
                {formatRupiah((Number(nominalInput) || 10000) * 5)}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-bold shadow cursor-pointer"
            >
              Simpan Pengaturan
            </button>
          </div>
        </div>

        {/* Pengaturan Template Pesan Pengingat WhatsApp */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40 shadow-xs flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-on-surface">
                Template Pesan Pengingat WhatsApp
              </h2>
              <button
                type="button"
                onClick={() => setWaInput(DEFAULT_WA_TEMPLATE)}
                className="text-xs font-bold text-secondary hover:underline cursor-pointer"
              >
                Reset Default
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">
              Pesan ini otomatis terisi saat Anda menekan tombol <strong>Ingatkan WA</strong> pada siswa yang belum membayar iuran pertemuan.
            </p>

            <div>
              <textarea
                rows={4}
                value={waInput}
                onChange={(e) => setWaInput(e.target.value)}
                className="w-full border border-outline-variant rounded-xl p-3 text-xs sm:text-sm"
              />
            </div>

            <div className="text-[11px] text-on-surface-variant bg-surface-container-low p-3 rounded-xl">
              <strong>Variabel otomatis yang dapat digunakan:</strong>{' '}
              <code>{'{nama}'}</code>, <code>{'{kelas}'}</code>,{' '}
              <code>{'{seksi}'}</code>, <code>{'{angkatan}'}</code>,{' '}
              <code>{'{pertemuan}'}</code>, <code>{'{nominal}'}</code>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow cursor-pointer"
            >
              Simpan Template WA
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
