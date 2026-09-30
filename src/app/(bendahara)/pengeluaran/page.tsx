'use client';

import React, { useState } from 'react';
import { useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function PengeluaranPage() {
  const {
    activeAngkatan,
    canEdit,
    transactions,
    totalPengeluaran,
    saldoAkhir,
    addTransaction,
    deleteTransaction,
  } = useAngkatan();

  const [category, setCategory] = useState('Perawatan Alat');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [vendor, setVendor] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Tunai Kas');
  const [transactionDate, setTransactionDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );

  const expenseList = transactions.filter((t) => t.type === 'pengeluaran');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numeric = Number(amount.replace(/[^0-9]/g, ''));
    if (!numeric || numeric <= 0) return;

    await addTransaction({
      type: 'pengeluaran',
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
        <span className="text-xs font-bold uppercase tracking-wider text-error">
          BUKU KAS KELUAR (BKK)
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
          Pengeluaran Kas — Angkatan {activeAngkatan} (MB{activeAngkatan})
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Pencatatan seluruh belanja & pengeluaran khusus untuk Buku Kas Angkatan {activeAngkatan}.
        </p>
      </div>

      {/* Ringkasan Pengeluaran */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Total Pengeluaran MB{activeAngkatan}
          </span>
          <p className="text-2xl font-extrabold text-rose-600">
            {formatRupiah(totalPengeluaran)}
          </p>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Jumlah Transaksi Keluar
          </span>
          <p className="text-2xl font-extrabold text-on-surface">
            {expenseList.length} Transaksi
          </p>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
          <span className="text-xs font-bold uppercase text-on-surface-variant block mb-1">
            Sisa Saldo Kas MB{activeAngkatan}
          </span>
          <p className="text-2xl font-extrabold text-secondary">
            {formatRupiah(saldoAkhir)}
          </p>
        </div>
      </div>

      {/* Grid Form & Tabel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {canEdit && (
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-xs">
            <h2 className="text-base font-extrabold text-on-surface mb-1">
              - Catat Pengeluaran Baru (MB{activeAngkatan})
            </h2>
            <p className="text-xs text-on-surface-variant mb-4">
              Data akan langsung mengurangi Saldo Kas Angkatan {activeAngkatan}.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Kategori Pengeluaran
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-outline-variant rounded-xl px-3 py-2.5 bg-white"
                >
                  <option value="Perawatan Alat">Perawatan Alat</option>
                  <option value="Konsumsi Latihan">Konsumsi Latihan</option>
                  <option value="Kostum & Seragam">Kostum & Seragam</option>
                  <option value="Transportasi & Logistik">Transportasi & Logistik</option>
                  <option value="ATK & Administrasi">ATK & Administrasi</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Nominal Pengeluaran (Rp)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Contoh: 75000"
                  className="w-full border border-outline-variant rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Uraian Keperluan Belanja
                </label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`Contoh: Pembelian Air Mineral Latihan MB${activeAngkatan}`}
                  className="w-full border border-outline-variant rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Toko / Penerima
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
                  Metode Pembayaran
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
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow transition cursor-pointer"
              >
                Simpan Pengeluaran MB{activeAngkatan}
              </button>
            </form>
          </div>
        )}

        {/* Tabel Riwayat Pengeluaran */}
        <div
          className={`${
            canEdit ? 'lg:col-span-8' : 'lg:col-span-12'
          } bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden`}
        >
          <div className="p-4 border-b border-outline-variant/40">
            <h2 className="text-base font-extrabold text-on-surface">
              Daftar Bukti Kas Keluar (BKK) — Angkatan {activeAngkatan}
            </h2>
          </div>

          {expenseList.length === 0 ? (
            <div className="p-10 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl opacity-40 block mb-2">
                north_east
              </span>
              <p className="text-sm font-bold text-on-surface">
                Belum ada catatan pengeluaran di Angkatan {activeAngkatan}
              </p>
              <p className="text-xs mt-1">
                Gunakan formulir untuk mencatat belanja / pengeluaran kas.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
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
                  {expenseList.map((t) => (
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
                          {t.category} • Toko/Penerima: {t.vendor}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-rose-600 whitespace-nowrap">
                        -{formatRupiah(t.amount)}
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
    </div>
  );
}
