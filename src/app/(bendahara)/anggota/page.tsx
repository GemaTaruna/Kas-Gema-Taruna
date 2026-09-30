'use client';

import React, { useState } from 'react';
import { useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function AnggotaPage() {
  const {
    activeAngkatan,
    canEdit,
    members,
    duesNominal,
    addMember,
    deleteMember,
  } = useAngkatan();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState('ALL');

  const [fullName, setFullName] = useState('');
  const [section, setSection] = useState('Brass');
  const [instrument, setInstrument] = useState('Trumpet');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('Aktif');

  const filteredMembers = members.filter((m) => {
    const matchName =
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(search.toLowerCase());
    const matchSection = sectionFilter === 'ALL' || m.section === sectionFilter;
    return matchName && matchSection;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    const seq = String(members.length + 1).padStart(2, '0');
    await addMember({
      memberCode: `MB${activeAngkatan}-${seq}`,
      fullName: fullName.trim(),
      section,
      instrument: instrument.trim() || '-',
      phone: phone.trim() || '-',
      status,
      duesStatus: 'BELUM BAYAR',
      paidAt: '-',
      duesAmount: duesNominal,
    });
    setFullName('');
    setPhone('');
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            DATABASE ANGGOTA SKUAD
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
            Daftar Siswa — Angkatan {activeAngkatan} (MB{activeAngkatan})
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Data anggota ini khusus untuk Angkatan {activeAngkatan} dan terpisah dari angkatan lainnya.
          </p>
        </div>

        {canEdit && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow hover:opacity-95 transition cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
              person_add
            </span>
            <span>+ Tambah Siswa MB{activeAngkatan}</span>
          </button>
        )}
      </div>

      {/* Ringkasan Jumlah per Seksi */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40">
          <span className="text-[11px] font-bold uppercase text-on-surface-variant block">
            Total Siswa MB{activeAngkatan}
          </span>
          <span className="text-xl font-extrabold text-on-surface">
            {members.length} Siswa
          </span>
        </div>
        {['Brass', 'Percussion', 'Color Guard', 'Pit Instrument'].map((sec) => (
          <div
            key={sec}
            className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40"
          >
            <span className="text-[11px] font-bold uppercase text-on-surface-variant block">
              {sec}
            </span>
            <span className="text-xl font-extrabold text-on-surface">
              {members.filter((m) => m.section === sec).length} Siswa
            </span>
          </div>
        ))}
      </div>

      {/* Filter & Tabel Anggota */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Cari nama / kode siswa Angkatan ${activeAngkatan}...`}
            className="px-3.5 py-2 rounded-xl border border-outline-variant text-xs sm:text-sm outline-none focus:border-primary-container w-full sm:w-72"
          />
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'Brass', 'Percussion', 'Color Guard', 'Pit Instrument'].map(
              (sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setSectionFilter(sec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    sectionFilter === sec
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {sec === 'ALL' ? 'Semua' : sec}
                </button>
              )
            )}
          </div>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="p-10 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl opacity-40 block mb-2">
              groups
            </span>
            <p className="text-sm font-bold text-on-surface">
              Belum ada siswa terdaftar di Angkatan {activeAngkatan}
            </p>
            <p className="text-xs mt-1">
              Klik tombol <strong>+ Tambah Siswa MB{activeAngkatan}</strong> di kanan atas untuk menambahkan anggota.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] border-b border-outline-variant/40">
                <tr>
                  <th className="py-3 px-4">Kode</th>
                  <th className="py-3 px-4">Nama Lengkap</th>
                  <th className="py-3 px-4">Seksi / Instrumen</th>
                  <th className="py-3 px-4">No. WhatsApp</th>
                  <th className="py-3 px-4">Status Iuran</th>
                  {canEdit && <th className="py-3 px-4 text-right">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-surface-container-low/50">
                    <td className="py-3 px-4 font-mono font-semibold text-on-surface-variant">
                      {m.memberCode}
                    </td>
                    <td className="py-3 px-4 font-bold text-on-surface">
                      {m.fullName}
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">
                      {m.section} ({m.instrument})
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">
                      {m.phone}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          m.duesStatus === 'LUNAS'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {m.duesStatus} ({formatRupiah(m.duesAmount)})
                      </span>
                    </td>
                    {canEdit && (
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => deleteMember(m.id)}
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

      {/* Modal Tambah Anggota */}
      {isModalOpen && canEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-lg font-extrabold mb-1">
              Tambah Siswa Baru — Angkatan {activeAngkatan}
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Data siswa ini akan disimpan ke buku kas Angkatan {activeAngkatan} (MB{activeAngkatan}).
            </p>
            <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Siswa
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Masukkan nama lengkap siswa"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Seksi
                  </label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white"
                  >
                    <option value="Brass">Brass</option>
                    <option value="Percussion">Percussion</option>
                    <option value="Color Guard">Color Guard</option>
                    <option value="Pit Instrument">Pit Instrument</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Instrumen / Alat
                  </label>
                  <input
                    type="text"
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                    placeholder="Contoh: Trumpet"
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    No. WhatsApp (Opsional)
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812xxxxxxxx"
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Status Keanggotaan
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Cadangan">Cadangan</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
