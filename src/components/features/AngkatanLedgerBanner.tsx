'use client';

import React, { useState } from 'react';
import { ANGKATAN_LIST, AngkatanId, useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function AngkatanLedgerBanner() {
  const {
    role,
    username,
    displayName,
    lockedAngkatan,
    activeAngkatan,
    canEdit,
    setActiveAngkatan,
    members,
    transactions,
    totalPemasukan,
    totalPengeluaran,
    saldoAkhir,
    addTransaction,
    deleteTransaction,
    addMember,
    toggleMemberDues,
  } = useAngkatan();

  const [showTxModal, setShowTxModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showLedgerDrawer, setShowLedgerDrawer] = useState(false);

  // Form states for Transaction
  const [txType, setTxType] = useState<'pemasukan' | 'pengeluaran'>('pemasukan');
  const [txCategory, setTxCategory] = useState('Iuran Anggota');
  const [txDesc, setTxDesc] = useState('');
  const [txVendor, setTxVendor] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txDate, setTxDate] = useState(() => new Date().toISOString().slice(0, 10));

  // Form states for Member
  const [mName, setMName] = useState('');
  const [mSection, setMSection] = useState('Brass');
  const [mInstrument, setMInstrument] = useState('Trumpet');
  const [mPhone, setMPhone] = useState('');

  const lunasCount = members.filter((m) => m.duesStatus === 'LUNAS').length;
  const kepatuhanPersen = members.length > 0 ? Math.round((lunasCount / members.length) * 100) : 0;

  const handleAddTx = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = Number(txAmount.replace(/[^0-9]/g, ''));
    if (!numericAmount || numericAmount <= 0) return;

    await addTransaction({
      type: txType,
      category: txCategory,
      description: txDesc || `${txCategory} Angkatan ${activeAngkatan}`,
      vendor: txVendor || username,
      amount: numericAmount,
      paymentMethod: 'Tunai Kas',
      transactionDate: txDate,
    });

    setTxDesc('');
    setTxVendor('');
    setTxAmount('');
    setShowTxModal(false);
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mName.trim()) return;
    const seq = String(members.length + 1).padStart(2, '0');
    await addMember({
      memberCode: `MB${activeAngkatan}-${seq}`,
      fullName: mName.trim(),
      section: mSection,
      instrument: mInstrument || '-',
      phone: mPhone || '-',
      status: 'Aktif',
      duesStatus: 'BELUM BAYAR',
      paidAt: '-',
      duesAmount: 50000,
    });
    setMName('');
    setMPhone('');
    setShowMemberModal(false);
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#0f172a] via-[#131b2e] to-[#1e293b] text-white border-b border-amber-500/30 shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3.5 flex flex-col gap-3">
        {/* Top Row: Role Info & Angkatan Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo Gema Taruna"
              className="w-10 h-10 rounded-xl object-contain bg-white/10 p-1 border border-amber-400/30 shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950">
                  BUKU KAS ANGKATAN {activeAngkatan}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/15">
                  {displayName}
                </span>
                {role === 'siswa' ? (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    🔒 Mode Hanya Membaca (Tanpa Sandi)
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    ✏️ Mode Kelola & Edit Aktif
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {role === 'superadmin'
                  ? 'Super Admin (Pembina): Anda dapat memilih, mengisi, dan mengedit pembukuan seluruh Angkatan 16 s.d. 21.'
                  : role === 'admin_angkatan'
                  ? `Pembukuan khusus Angkatan ${activeAngkatan} (terpisah dari angkatan lain).`
                  : `Menampilkan pembukuan transparan khusus Angkatan ${activeAngkatan}.`}
              </p>
            </div>
          </div>

          {/* Pemilih Angkatan (Aktif untuk Super Admin Pembina & Siswa) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {role === 'superadmin' || role === 'siswa' ? (
              <>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mr-1">
                  Pilih Angkatan:
                </span>
                {ANGKATAN_LIST.map((angk) => {
                  const isSelected = activeAngkatan === angk;
                  return (
                    <button
                      key={angk}
                      type="button"
                      onClick={() => setActiveAngkatan(angk)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                          : 'bg-white/10 text-slate-200 hover:bg-white/20'
                      }`}
                    >
                      MB {angk}
                    </button>
                  );
                })}
              </>
            ) : (
              <div className="px-3 py-1.5 rounded-lg bg-white/10 border border-amber-400/30 text-xs font-semibold text-amber-200">
                🔒 Terkunci pada Angkatan {lockedAngkatan} (Akun {username})
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row: Live Summary Metrics per Angkatan + Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 pt-2 border-t border-white/10 items-center">
          <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
              Saldo Kas Angkatan {activeAngkatan}
            </span>
            <span className="text-sm sm:text-base font-extrabold text-amber-400">
              {formatRupiah(saldoAkhir)}
            </span>
          </div>
          <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
              Kas Masuk (MB{activeAngkatan})
            </span>
            <span className="text-sm sm:text-base font-bold text-emerald-400">
              +{formatRupiah(totalPemasukan)}
            </span>
          </div>
          <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
              Kas Keluar (MB{activeAngkatan})
            </span>
            <span className="text-sm sm:text-base font-bold text-rose-400">
              -{formatRupiah(totalPengeluaran)}
            </span>
          </div>
          <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
              Iuran Lunas (MB{activeAngkatan})
            </span>
            <span className="text-sm sm:text-base font-bold text-white">
              {lunasCount}/{members.length} Siswa ({kepatuhanPersen}%)
            </span>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-wrap items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => setShowLedgerDrawer((prev) => !prev)}
              className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>{showLedgerDrawer ? 'Tutup Buku Kas' : `Buka Buku Kas MB${activeAngkatan}`}</span>
            </button>
            {canEdit && (
              <button
                type="button"
                onClick={() => setShowTxModal(true)}
                className="px-2.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow cursor-pointer transition"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                <span>+ Transaksi</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Collapsible Ledger Panel for Selected Angkatan */}
        {showLedgerDrawer && (
          <div className="mt-2 bg-white text-slate-800 rounded-xl p-4 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  📊 Pembukuan Terpisah — Angkatan {activeAngkatan} (MB{activeAngkatan})
                </h3>
                <p className="text-xs text-slate-500">
                  Data di bawah ini khusus milik Angkatan {activeAngkatan} dan tidak tercampur dengan angkatan lainnya.
                </p>
              </div>
              {canEdit && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowMemberModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                  >
                    + Tambah Siswa MB{activeAngkatan}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTxModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
                  >
                    + Input Kas Masuk/Keluar MB{activeAngkatan}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Tabel Anggota & Status Iuran per Angkatan */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-3.5 py-2.5 font-bold text-xs text-slate-800 flex items-center justify-between">
                  <span>Daftar Siswa & Status Iuran — Angkatan {activeAngkatan}</span>
                  <span className="text-[11px] text-slate-500">{members.length} Personel</span>
                </div>
                <div className="overflow-x-auto max-h-64">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">Kode</th>
                        <th className="py-2 px-3">Nama Siswa</th>
                        <th className="py-2 px-3">Seksi</th>
                        <th className="py-2 px-3">Status Iuran</th>
                        {canEdit && <th className="py-2 px-3 text-right">Aksi</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {members.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-mono font-semibold text-slate-600">{m.memberCode}</td>
                          <td className="py-2 px-3 font-semibold text-slate-900">{m.fullName}</td>
                          <td className="py-2 px-3 text-slate-600">{m.section} ({m.instrument})</td>
                          <td className="py-2 px-3">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                m.duesStatus === 'LUNAS'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {m.duesStatus}
                            </span>
                          </td>
                          {canEdit && (
                            <td className="py-2 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => toggleMemberDues(m.id)}
                                className="px-2 py-1 rounded bg-slate-900 text-white text-[10px] font-semibold hover:bg-slate-700 cursor-pointer"
                              >
                                {m.duesStatus === 'LUNAS' ? 'Set Belum Bayar' : 'Tandai Lunas'}
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tabel Mutasi Kas Masuk & Keluar per Angkatan */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-3.5 py-2.5 font-bold text-xs text-slate-800 flex items-center justify-between">
                  <span>Jurnal Transaksi Kas — Angkatan {activeAngkatan}</span>
                  <span className="text-[11px] text-slate-500">{transactions.length} Transaksi</span>
                </div>
                <div className="overflow-x-auto max-h-64">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">No. Bukti</th>
                        <th className="py-2 px-3">Uraian</th>
                        <th className="py-2 px-3 text-right">Nominal</th>
                        {canEdit && <th className="py-2 px-3 text-right">Hapus</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transactions.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-mono font-semibold text-slate-600">
                            {t.referenceNo}
                            <span className="block text-[10px] font-normal text-slate-400">{t.transactionDate}</span>
                          </td>
                          <td className="py-2 px-3">
                            <span className="font-semibold text-slate-900 block">{t.description}</span>
                            <span className="text-[10px] text-slate-500">{t.category} • Oleh: {t.recordedBy}</span>
                          </td>
                          <td
                            className={`py-2 px-3 text-right font-bold ${
                              t.type === 'pemasukan' ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {t.type === 'pemasukan' ? '+' : '-'}
                            {formatRupiah(t.amount)}
                          </td>
                          {canEdit && (
                            <td className="py-2 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => deleteTransaction(t.id)}
                                className="text-rose-600 hover:text-rose-800 font-bold text-[11px] cursor-pointer"
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
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Tambah Transaksi Angkatan */}
      {showTxModal && canEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-extrabold mb-1">
              Catat Transaksi Kas — Angkatan {activeAngkatan}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Dicatat oleh: <strong>{displayName}</strong> ke Buku Kas MB{activeAngkatan}
            </p>
            <form onSubmit={handleAddTx} className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTxType('pemasukan');
                    setTxCategory('Iuran Anggota');
                  }}
                  className={`py-2 rounded-lg font-bold text-xs border ${
                    txType === 'pemasukan'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  + Pemasukan Kas (BKM)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTxType('pengeluaran');
                    setTxCategory('Perawatan Alat');
                  }}
                  className={`py-2 rounded-lg font-bold text-xs border ${
                    txType === 'pengeluaran'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  - Pengeluaran Kas (BKK)
                </button>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                <input
                  type="text"
                  required
                  value={txCategory}
                  onChange={(e) => setTxCategory(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nominal (Rp)</label>
                <input
                  type="number"
                  required
                  placeholder="Contoh: 150000"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Uraian / Keterangan</label>
                <input
                  type="text"
                  required
                  placeholder={`Contoh: Setoran Kas Angkatan ${activeAngkatan}`}
                  value={txDesc}
                  onChange={(e) => setTxDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Penyetor / Toko</label>
                  <input
                    type="text"
                    placeholder="Opsional"
                    value={txVendor}
                    onChange={(e) => setTxVendor(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={txDate}
                    onChange={(e) => setTxDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowTxModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"
                >
                  Simpan ke Angkatan {activeAngkatan}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Anggota Angkatan */}
      {showMemberModal && canEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-extrabold mb-1">
              Tambah Siswa Baru — Angkatan {activeAngkatan}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Siswa ini akan terdaftar khusus di database Angkatan {activeAngkatan} (MB{activeAngkatan}).
            </p>
            <form onSubmit={handleAddMember} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Aditya Pratama"
                  value={mName}
                  onChange={(e) => setMName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Seksi</label>
                  <select
                    value={mSection}
                    onChange={(e) => setMSection(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Brass">Brass</option>
                    <option value="Percussion">Percussion</option>
                    <option value="Color Guard">Color Guard</option>
                    <option value="Pit Instrument">Pit Instrument</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alat / Instrumen</label>
                  <input
                    type="text"
                    value={mInstrument}
                    onChange={(e) => setMInstrument(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">No. WhatsApp</label>
                <input
                  type="text"
                  placeholder="0812xxxxxxxx"
                  value={mPhone}
                  onChange={(e) => setMPhone(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"
                >
                  Simpan Siswa MB{activeAngkatan}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
