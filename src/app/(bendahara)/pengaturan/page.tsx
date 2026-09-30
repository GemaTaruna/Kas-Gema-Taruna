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
  dues_amount bigint not null default 5000,
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
create policy "Public access kgt_transactions" on public.kgt_transactions for all using (true) with check (true);`;

export default function PengaturanPage() {
  const {
    activeAngkatan,
    cloudStatus,
    syncLocalToCloud,
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(nominalInput.replace(/[^0-9]/g, ''));
    if (num > 0) {
      setDuesNominal(num);
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
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
                  ? 'Database Cloud Supabase Aktif (Bisa Digunakan di Semua Perangkat)'
                  : 'Tabel Database Cloud Belum Diaktifkan di Supabase (Saat Ini Tersimpan di Cache Lokal)'}
              </h2>
            </div>
            <p className="text-xs mt-1 opacity-90">
              {cloudStatus === 'connected'
                ? 'Seluruh data siswa, pembayaran iuran, dan transaksi kas otomatis tersimpan ke server Supabase dan dapat dibuka dari HP maupun Laptop mana saja.'
                : 'Agar 77 siswa yang sudah Anda import di perangkat ini langsung muncul di HP dan perangkat lain, klik "Salin Kode SQL", tempel di menu SQL Editor pada Dashboard Supabase Anda, lalu klik Run (cukup 1x saja).'}
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
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer shadow-xs"
            >
              ☁️ Sinkronkan Data ke Cloud Sekarang
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

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pengaturan Tarif Iuran Per Pertemuan */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40 shadow-xs flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <h2 className="text-base font-extrabold text-on-surface">
              Tarif Iuran Per Pertemuan Latihan
            </h2>
            <p className="text-xs text-on-surface-variant">
              Tarif standar yang otomatis dicatat ke Pemasukan Kas setiap kali siswa ditandai <strong>Lunas</strong> pada sesi pertemuan latihan (default Rp 5.000 / pertemuan).
            </p>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Nominal Iuran per Pertemuan (Rp)
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
                • <strong>1x Pertemuan:</strong> {formatRupiah(Number(nominalInput) || 5000)}
              </p>
              <p>
                • <strong>1 Minggu (2x Pertemuan):</strong>{' '}
                {formatRupiah((Number(nominalInput) || 5000) * 2)}
              </p>
              <p>
                • <strong>1 Bulan (8x Pertemuan):</strong>{' '}
                {formatRupiah((Number(nominalInput) || 5000) * 8)}
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
