'use client';

import React, { useState } from 'react';
import { useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function PemasukanPage() {
  const {
    activeAngkatan,
    canEdit,
    transactions,
    totalPemasukan,
    saldoAkhir,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  } = useAngkatan();

  const [category, setCategory] = useState('Iuran Anggota');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [vendor, setVendor] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Tunai Kas');
  const [transactionDate, setTransactionDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );

  // State Edit Pemasukan
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTxId, setEditingTxId] = useState<string | null>(null);
  const [editRefNo, setEditRefNo] = useState('');
  const [editCategory, setEditCategory] = useState('Iuran Anggota');
  const [editAmount, setEditAmount] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editVendor, setEditVendor] = useState('');
  const [editPaymentMethod, setEditPaymentMethod] = useState('Tunai Kas');
  const [editTransactionDate, setEditTransactionDate] = useState('');

  const incomeList = transactions.filter((t) => t.type === 'pemasukan');

  const handleOpenEditModal = (t: (typeof transactions)[0]) => {
    setEditingTxId(t.id);
    setEditRefNo(t.referenceNo);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numeric = Number(amount.replace(/[^0-9]/g, ''));
    if (!numeric || numeric <= 0) return;

    await addTransaction({
      type: 'pemasukan',
      category,
      description: description.trim() || `${category} Angkatan ${activeAngkatan}`,
      vendor: vendor.trim() || '-',
      amount: numeric,
      paymentMethod,
      transactionDate,
    });

    setAmount('');
    setDescription('');
    setVendor('');
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          BUKU KAS MASUK (BKM)
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
          Pemasukan Kas — Angkatan {activeAngkatan} (MB{activeAngkatan})
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Pencatatan seluruh dana masuk khusus untuk Buku Kas Angkatan {activeAngkatan}.
        </p>
      </div>

      {/* Ringkasan Pemasukan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Total Pemasukan MB{activeAngkatan}
          </span>
          <p className="text-2xl font-extrabold text-emerald-600">
            {formatRupiah(totalPemasukan)}
          </p>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Jumlah Transaksi Masuk
          </span>
          <p className="text-2xl font-extrabold text-on-surface">
            {incomeList.length} Transaksi
          </p>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Saldo Kas Aktif MB{activeAngkatan}
          </span>
          <p className="text-2xl font-extrabold text-secondary">
            {formatRupiah(saldoAkhir)}
          </p>
        </div>
      </div>

      {/* Grid Tabel & Form Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Input Pemasukan */}
        {canEdit && (
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-xs">
            <h2 className="text-base font-extrabold text-on-surface mb-1">
              + Catat Pemasukan Baru (MB{activeAngkatan})
            </h2>
            <p className="text-xs text-on-surface-variant mb-4">
              Data akan langsung menambah Saldo Kas Angkatan {activeAngkatan}.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Kategori Pemasukan
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-outline-variant rounded-xl px-3 py-2.5 bg-white"
                >
                  <option value="Iuran Anggota">Iuran Anggota</option>
                  <option value="Donasi / Sponsorship">Donasi / Sponsorship</option>
                  <option value="Dana Sekolah / Pembinaan">Dana Sekolah / Pembinaan</option>
                  <option value="Kas Awal Angkatan">Kas Awal Angkatan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Nominal Pemasukan (Rp)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Contoh: 150000"
                  className="w-full border border-outline-variant rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Uraian / Keterangan
                </label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`Contoh: Setoran Iuran Latihan MB${activeAngkatan}`}
                  className="w-full border border-outline-variant rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Penyetor / Sumber
                  </label>
                  <input
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    placeholder="Opsional"
                    className="w-full border border-outline-variant rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                    className="w-full border border-outline-variant rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Metode Penerimaan
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-outline-variant rounded-xl px-3 py-2 bg-white"
                >
                  <option value="Tunai Kas">Tunai Kas</option>
                  <option value="Transfer / QRIS">Transfer / QRIS</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow transition cursor-pointer"
              >
                Simpan Pemasukan MB{activeAngkatan}
              </button>
            </form>
          </div>
        )}

        {/* Tabel Riwayat Pemasukan */}
        <div
          className={`${
            canEdit ? 'lg:col-span-8' : 'lg:col-span-12'
          } bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden`}
        >
          <div className="p-4 border-b border-outline-variant/40">
            <h2 className="text-base font-extrabold text-on-surface">
              Daftar Bukti Kas Masuk (BKM) — Angkatan {activeAngkatan}
            </h2>
          </div>

          {incomeList.length === 0 ? (
            <div className="p-10 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl opacity-40 block mb-2">
                south_west
              </span>
              <p className="text-sm font-bold text-on-surface">
                Belum ada catatan pemasukan di Angkatan {activeAngkatan}
              </p>
              <p className="text-xs mt-1">
                Gunakan formulir untuk mencatat pemasukan kas baru.
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
                      <th className="py-3 px-4">Uraian & Kategori</th>
                      <th className="py-3 px-4 text-right">Nominal</th>
                      {canEdit && <th className="py-3 px-4 text-right">Aksi</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {incomeList.map((t) => (
                      <tr key={t.id} className="hover:bg-surface-container-low/50">
                        <td className="py-3 px-4 whitespace-nowrap text-on-surface-variant">
                          {t.transactionDate}
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-on-surface whitespace-nowrap">
                          {t.referenceNo}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-on-surface block">
                            {t.description}
                          </span>
                          <span className="text-xs text-on-surface-variant">
                            {t.category} • Penyetor: {t.vendor}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-extrabold text-emerald-600 whitespace-nowrap">
                          +{formatRupiah(t.amount)}
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
                {incomeList.map((t) => (
                  <div key={t.id} className="p-4 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[11px] font-mono text-on-surface-variant block">
                          {t.transactionDate} • {t.referenceNo}
                        </span>
                        <p className="font-extrabold text-sm text-on-surface">
                          {t.description}
                        </p>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          {t.category} • Penyetor: {t.vendor}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-extrabold text-sm text-emerald-600 block">
                          +{formatRupiah(t.amount)}
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
      </div>

      {/* Modal Edit Pemasukan */}
      {isEditModalOpen && canEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl my-auto">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Edit Pemasukan Kas — {editRefNo}
                </h2>
                <p className="text-xs text-slate-500">
                  Sesuaikan nominal, kategori, uraian, atau tanggal jika terdapat kekeliruan pencatatan.
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
                  Kategori Pemasukan
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 bg-white font-medium"
                >
                  <option value="Iuran Anggota">Iuran Anggota</option>
                  <option value="Donasi / Sponsorship">Donasi / Sponsorship</option>
                  <option value="Dana Sekolah / Pembinaan">Dana Sekolah / Pembinaan</option>
                  <option value="Kas Awal Angkatan">Kas Awal Angkatan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nominal Pemasukan (Rp)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder="Contoh: 150000"
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
                  placeholder="Contoh: Setoran Iuran Latihan"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Penyetor / Sumber
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
                    Tanggal
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
                  Metode Penerimaan
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
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow transition"
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
