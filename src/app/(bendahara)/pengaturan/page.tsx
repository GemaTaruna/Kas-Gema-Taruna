'use client';

import React, { useState } from 'react';
import { DEFAULT_WA_TEMPLATE, useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function PengaturanPage() {
  const {
    activeAngkatan,
    duesNominal,
    setDuesNominal,
    waTemplate,
    setWaTemplate,
  } = useAngkatan();

  const [nominalInput, setNominalInput] = useState(String(duesNominal));
  const [waInput, setWaInput] = useState(waTemplate);
  const [savedToast, setSavedToast] = useState(false);

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

  return (
    <div className="p-3 sm:p-6 flex flex-col gap-5 max-w-[1440px] mx-auto w-full">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          PENGATURAN BUKU KAS
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
          Pengaturan Iuran & Template WhatsApp — Angkatan {activeAngkatan}
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Atur tarif iuran per pertemuan latihan dan format pesan pengingat WhatsApp.
        </p>
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
              Pesan ini otomatis terisi saat Anda menekan tombol <strong>💬 WA</strong> pada siswa yang belum membayar iuran pertemuan.
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
