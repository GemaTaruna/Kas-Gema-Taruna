'use client';

import React, { useState } from 'react';
import { useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function RiwayatTransaksiPage() {
  const {
    activeAngkatan,
    canEdit,
    transactions,
    totalPemasukan,
    totalPengeluaran,
    saldoAkhir,
    deleteTransaction,
  } = useAngkatan();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'pemasukan' | 'pengeluaran'>('ALL');

  const filtered = transactions.filter((t) => {
    const matchSearch =
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.referenceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = typeFilter === 'ALL' || t.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          BUKU KAS UMUM (BKU)
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
          Riwayat Transaksi Keuangan — Angkatan {activeAngkatan} (MB{activeAngkatan})
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Seluruh mutasi kas masuk dan keluar khusus untuk Buku Kas Angkatan {activeAngkatan}.
        </p>
      </div>

      {/* 4 Kartu Ringkasan BKU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Saldo Akhir MB{activeAngkatan}
          </span>
          <p className="text-2xl font-extrabold text-on-surface">
            {formatRupiah(saldoAkhir)}
          </p>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Total Kas Masuk
          </span>
          <p className="text-2xl font-extrabold text-emerald-600">
            +{formatRupiah(totalPemasukan)}
          </p>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Total Kas Keluar
          </span>
          <p className="text-2xl font-extrabold text-rose-600">
            -{formatRupiah(totalPengeluaran)}
          </p>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Total Mutasi Tercatat
          </span>
          <p className="text-2xl font-extrabold text-secondary">
            {transactions.length} Bukti
          </p>
        </div>
      </div>

      {/* Filter & Tabel BKU */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nomor bukti / uraian transaksi..."
            className="px-3.5 py-2 rounded-xl border border-outline-variant text-xs sm:text-sm outline-none w-full sm:w-72"
          />

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'ALL', label: 'Semua Mutasi' },
              { id: 'pemasukan', label: 'Kas Masuk (BKM)' },
              { id: 'pengeluaran', label: 'Kas Keluar (BKK)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTypeFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  typeFilter === tab.id
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
              history
            </span>
            <p className="text-sm font-bold text-on-surface">
              Belum ada riwayat transaksi di Angkatan {activeAngkatan}
            </p>
            <p className="text-xs mt-1">
              Transaksi yang Anda catat di menu Pemasukan atau Pengeluaran akan otomatis tercatat di sini.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] border-b border-outline-variant/40">
                <tr>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">No. Bukti</th>
                  <th className="py-3 px-4">Jenis</th>
                  <th className="py-3 px-4">Kategori & Uraian</th>
                  <th className="py-3 px-4">Dicatat Oleh</th>
                  <th className="py-3 px-4 text-right">Nominal</th>
                  {canEdit && <th className="py-3 px-4 text-right">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-surface-container-low/50">
                    <td className="py-3 px-4 whitespace-nowrap text-on-surface-variant">
                      {t.transactionDate}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-on-surface whitespace-nowrap">
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
                        {t.type === 'pemasukan' ? 'MASUK' : 'KELUAR'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-on-surface block">
                        {t.description}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {t.category} • {t.vendor}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-on-surface-variant">
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
                    {canEdit && (
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => deleteTransaction(t.id)}
                          className="text-rose-600 hover:text-rose-800 font-bold text-xs cursor-pointer"
                        >
                          Hapus
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
