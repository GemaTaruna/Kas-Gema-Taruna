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
    updateTransaction,
  } = useAngkatan();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'pemasukan' | 'pengeluaran'>('ALL');

  // State Edit Transaksi di Riwayat
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTxId, setEditingTxId] = useState<string | null>(null);
  const [editRefNo, setEditRefNo] = useState('');
  const [editType, setEditType] = useState<'pemasukan' | 'pengeluaran'>('pemasukan');
  const [editCategory, setEditCategory] = useState('Iuran Anggota');
  const [editAmount, setEditAmount] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editVendor, setEditVendor] = useState('');
  const [editPaymentMethod, setEditPaymentMethod] = useState('Tunai Kas');
  const [editTransactionDate, setEditTransactionDate] = useState('');

  const handleOpenEditModal = (t: (typeof transactions)[0]) => {
    setEditingTxId(t.id);
    setEditRefNo(t.referenceNo);
    setEditType(t.type);
    setEditCategory(t.category);
    setEditAmount(String(t.amount));
    setEditDescription(t.description);
    setEditVendor(t.vendor === '-' ? '' : t.vendor);
    setEditPaymentMethod(t.paymentMethod || 'Tunai Kas');
    setEditTransactionDate(t.transactionDate);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTxId) return;
    const numeric = Number(editAmount.replace(/[^0-9]/g, ''));
    if (!numeric || numeric <= 0) return;

    await updateTransaction(editingTxId, {
      category: editCategory,
      amount: numeric,
      description: editDescription.trim() || `${editCategory} Angkatan ${activeAngkatan}`,
      vendor: editVendor.trim() || '-',
      paymentMethod: editPaymentMethod,
      transactionDate: editTransactionDate,
    });

    setIsEditModalOpen(false);
    setEditingTxId(null);
  };

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
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
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
                          <div className="inline-flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(t)}
                              className="text-amber-600 hover:text-amber-800 font-bold text-xs cursor-pointer"
                            >
                              Edit
                            </button>
                            <span className="text-outline-variant/60">•</span>
                            <button
                              type="button"
                              onClick={() => deleteTransaction(t.id)}
                              className="text-rose-600 hover:text-rose-800 font-bold text-xs cursor-pointer"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List (Tanpa Geser Layar) */}
            <div className="md:hidden divide-y divide-outline-variant/30">
              {filtered.map((t) => (
                <div key={t.id} className="p-4 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            t.type === 'pemasukan'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {t.type === 'pemasukan' ? 'MASUK' : 'KELUAR'}
                        </span>
                        <span className="text-[11px] font-mono text-on-surface-variant">
                          {t.transactionDate} • {t.referenceNo}
                        </span>
                      </div>
                      <p className="font-extrabold text-sm text-on-surface">
                        {t.description}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {t.category} • Oleh: {t.recordedBy}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className={`font-extrabold text-sm block ${
                          t.type === 'pemasukan'
                            ? 'text-emerald-600'
                            : 'text-rose-600'
                        }`}
                      >
                        {t.type === 'pemasukan' ? '+' : '-'}
                        {formatRupiah(t.amount)}
                      </span>
                      {canEdit && (
                        <div className="flex items-center justify-end gap-1.5 mt-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(t)}
                            className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold text-[11px] cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTransaction(t.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[11px] cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal Edit Transaksi Riwayat */}
      {isEditModalOpen && canEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl my-auto">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      editType === 'pemasukan'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {editType === 'pemasukan' ? 'BUKTI KAS MASUK' : 'BUKTI KAS KELUAR'}
                  </span>
                  <span className="font-mono text-xs text-slate-500 font-bold">
                    {editRefNo}
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Edit Mutasi Transaksi
                </h2>
                <p className="text-xs text-slate-500">
                  Perbaiki kesalahan nominal, tanggal, kategori, atau uraian pembukuan.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer px-1.5 py-0.5 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategori Transaksi
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 bg-white font-medium"
                >
                  {(editType === 'pemasukan'
                    ? [
                        'Iuran Anggota',
                        'Donasi / Sponsorship',
                        'Dana Sekolah / Pembinaan',
                        'Kas Awal Angkatan',
                        'Lainnya',
                      ]
                    : [
                        'Perawatan Alat',
                        'Konsumsi Latihan',
                        'Kostum & Seragam',
                        'Transportasi & Logistik',
                        'ATK & Administrasi',
                        'Lainnya',
                      ]
                  ).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  {/* Fallback jika kategori custom di luar list standar */}
                  {![
                    'Iuran Anggota',
                    'Donasi / Sponsorship',
                    'Dana Sekolah / Pembinaan',
                    'Kas Awal Angkatan',
                    'Perawatan Alat',
                    'Konsumsi Latihan',
                    'Kostum & Seragam',
                    'Transportasi & Logistik',
                    'ATK & Administrasi',
                    'Lainnya',
                  ].includes(editCategory) && (
                    <option value={editCategory}>{editCategory}</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nominal Transaksi (Rp)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder="Contoh: 100000"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Uraian / Keterangan
                </label>
                <input
                  type="text"
                  required
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Contoh: Uraian transaksi"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {editType === 'pemasukan' ? 'Penyetor / Sumber' : 'Toko / Penerima'}
                  </label>
                  <input
                    type="text"
                    value={editVendor}
                    onChange={(e) => setEditVendor(e.target.value)}
                    placeholder="Opsional"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tanggal Transaksi
                  </label>
                  <input
                    type="date"
                    required
                    value={editTransactionDate}
                    onChange={(e) => setEditTransactionDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Metode Pembayaran
                </label>
                <select
                  value={editPaymentMethod}
                  onChange={(e) => setEditPaymentMethod(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-white font-medium"
                >
                  <option value="Tunai Kas">Tunai Kas</option>
                  <option value="Transfer / QRIS">Transfer / QRIS</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-200 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-xl text-white text-xs font-bold cursor-pointer shadow transition ${
                    editType === 'pemasukan'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
