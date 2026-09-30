'use client';

import React, { useState } from 'react';
import { OFFICIAL_ACCOUNTS, useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function PengaturanPage() {
  const {
    role,
    activeAngkatan,
    duesNominal,
    setDuesNominal,
  } = useAngkatan();

  const [nominalInput, setNominalInput] = useState(String(duesNominal));
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(nominalInput.replace(/[^0-9]/g, ''));
    if (num > 0) {
      setDuesNominal(num);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    }
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          PENGATURAN SISTEM & HAK AKSES
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
          Pengaturan Buku Kas & Daftar Akun Angkatan
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Konfigurasi nominal iuran dan daftar hak akses per angkatan (MB16 s.d. MB21).
        </p>
      </div>

      {savedToast && (
        <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold">
          ✓ Pengaturan nominal iuran berhasil disimpan ({formatRupiah(duesNominal)}).
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Pengaturan Nominal Iuran */}
        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant/40 shadow-xs">
          <h2 className="text-base font-extrabold text-on-surface mb-1">
            Nominal Iuran Rutin Siswa
          </h2>
          <p className="text-xs text-on-surface-variant mb-4">
            Nominal default yang digunakan saat menambahkan siswa baru atau mencatat pembayaran iuran.
          </p>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Nominal Iuran (Rp)
              </label>
              <input
                type="number"
                required
                min="1000"
                value={nominalInput}
                onChange={(e) => setNominalInput(e.target.value)}
                className="w-full border border-outline-variant rounded-xl px-3.5 py-2.5 text-sm"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary text-xs font-bold shadow cursor-pointer"
            >
              Simpan Pengaturan
            </button>
          </form>
        </div>

        {/* Tabel Hak Akses Multi-Angkatan */}
        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant/40 shadow-xs">
          <h2 className="text-base font-extrabold text-on-surface mb-1">
            Struktur Hak Akses Sistem Multi-Angkatan
          </h2>
          <p className="text-xs text-on-surface-variant mb-4">
            Setiap angkatan memiliki akun pengelola tersendiri agar pembukuan tidak tercampur.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] border-b border-outline-variant/40">
                <tr>
                  <th className="py-2.5 px-3">Peran</th>
                  <th className="py-2.5 px-3">Akun</th>
                  <th className="py-2.5 px-3">Cakupan Buku Kas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {OFFICIAL_ACCOUNTS.map((acc) => (
                  <tr key={acc.username}>
                    <td className="py-2.5 px-3 font-bold text-on-surface">
                      {acc.displayName}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-secondary">
                      {acc.username}
                    </td>
                    <td className="py-2.5 px-3 text-on-surface-variant">
                      {acc.angkatan
                        ? `Khusus Angkatan ${acc.angkatan} (MB${acc.angkatan})`
                        : 'Seluruh Angkatan (MB16 – MB21)'}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">
                    Siswa / Anggota
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-700">
                    Tanpa Login (Tab Cek Kas Siswa)
                  </td>
                  <td className="py-2.5 px-3 text-on-surface-variant">
                    Mode Hanya Membaca (Pilih Angkatan 16–21)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {role === 'admin_angkatan' && (
            <p className="text-[11px] text-on-surface-variant mt-3">
              Saat ini Anda masuk pada cakupan khusus <strong>Angkatan {activeAngkatan}</strong>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
