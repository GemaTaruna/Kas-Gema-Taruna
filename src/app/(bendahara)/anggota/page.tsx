'use client';

import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  SECTION_NAMES,
  SECTION_OPTIONS,
  useAngkatan,
} from '@/context/AngkatanContext';

export default function AnggotaPage() {
  const {
    activeAngkatan,
    canEdit,
    members,
    duesNominal,
    addMember,
    importMembersBulk,
    deleteMember,
  } = useAngkatan();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [importMsg, setImportMsg] = useState('');

  // Form tambah anggota
  const [noUrut, setNoUrut] = useState('');
  const [fullName, setFullName] = useState('');
  const [kelas, setKelas] = useState('');
  const [section, setSection] = useState<string>('BRASS');
  const [instrument, setInstrument] = useState<string>('Terompet');
  const [phone, setPhone] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSectionChange = (newSec: string) => {
    setSection(newSec);
    const firstInstrument = SECTION_OPTIONS[newSec]?.[0] || '';
    setInstrument(firstInstrument);
  };

  const filteredMembers = members.filter((m) => {
    const matchName =
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(search.toLowerCase()) ||
      (m.kelas || '').toLowerCase().includes(search.toLowerCase());
    const matchSection =
      sectionFilter === 'ALL' || m.section.toUpperCase() === sectionFilter;
    return matchName && matchSection;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    const seq = noUrut.trim() || String(members.length + 1).padStart(2, '0');
    const code = seq.toUpperCase().startsWith('MB')
      ? seq
      : `MB${activeAngkatan}-${seq.padStart(2, '0')}`;

    await addMember({
      memberCode: code,
      fullName: fullName.trim(),
      kelas: kelas.trim() || '-',
      section,
      instrument: instrument.trim() || '-',
      phone: phone.trim() || '-',
      status: 'Aktif',
      duesAmount: duesNominal,
    });

    setNoUrut('');
    setFullName('');
    setKelas('');
    setPhone('');
    setIsModalOpen(false);
  };

  // Download Template Excel (No, Nama, Kelas, Seksi, Alat, No WA)
  const handleDownloadTemplate = () => {
    const templateRows = [
      {
        No: '1',
        Nama: 'Contoh Nama Siswa',
        Kelas: 'X-1',
        Seksi: 'BRASS',
        Alat: 'Terompet',
        'No WA': '081234567890',
      },
    ];
    const ws = XLSX.utils.json_to_sheet(templateRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Template_MB${activeAngkatan}`);
    XLSX.writeFile(wb, `Template_Anggota_MB${activeAngkatan}.xlsx`);
  };

  // Import file Excel (.xlsx, .xls, .csv)
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
        defval: '',
      });

      const parsedRows = rawRows
        .map((r) => {
          // Cari kolom secara case-insensitive
          const getCol = (keys: string[]) => {
            for (const k of Object.keys(r)) {
              const cleanK = k.trim().toLowerCase();
              if (keys.includes(cleanK)) return String(r[k] ?? '').trim();
            }
            return '';
          };

          const no = getCol(['no', 'nomor', 'kode']);
          const nama = getCol(['nama', 'nama lengkap', 'nama siswa']);
          const kls = getCol(['kelas', 'kls']);
          const seksi = getCol(['seksi', 'section', 'divisi']);
          const alat = getCol(['alat', 'instrumen', 'instrument']);
          const wa = getCol(['no wa', 'nowa', 'wa', 'whatsapp', 'no hp', 'telepon']);

          return {
            no,
            nama,
            kelas: kls || '-',
            seksi: seksi || 'BRASS',
            alat: alat || 'Terompet',
            phone: wa || '-',
          };
        })
        .filter((item) => item.nama.length > 0);

      if (parsedRows.length === 0) {
        alert(
          'Format kolom tidak ditemukan. Pastikan kolom Excel memiliki judul: No, Nama, Kelas, Seksi, Alat, No WA'
        );
        return;
      }

      const count = await importMembersBulk(parsedRows);
      setImportMsg(
        `Berhasil mengimpor ${count} siswa ke Angkatan ${activeAngkatan} (MB${activeAngkatan})!`
      );
      setTimeout(() => setImportMsg(''), 5000);
    } catch {
      alert('Gagal membaca file Excel. Pastikan file berformat .xlsx, .xls, atau .csv.');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-3 sm:p-6 flex flex-col gap-5 max-w-[1440px] mx-auto w-full">
      {/* Header & Tombol Aksi */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            DATABASE ANGGOTA SKUAD
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">
            Daftar Siswa — Angkatan {activeAngkatan} (MB{activeAngkatan})
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Kelola anggota per seksi atau impor langsung dari file Excel (No, Nama, Kelas, Seksi, Alat, No WA).
          </p>
        </div>

        {canEdit && (
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleExcelUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">download</span>
              <span>Template Excel</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">upload_file</span>
              <span>Import Excel (.xlsx)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-on-primary font-bold text-xs shadow-xs hover:opacity-95 transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px] text-secondary-fixed">
                person_add
              </span>
              <span>+ Tambah Siswa</span>
            </button>
          </div>
        )}
      </div>

      {importMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold">
          ✓ {importMsg}
        </div>
      )}

      {/* Ringkasan Jumlah per Seksi Resmi */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/40">
          <span className="text-[10px] font-bold uppercase text-on-surface-variant block">
            TOTAL MB{activeAngkatan}
          </span>
          <span className="text-lg font-extrabold text-on-surface">
            {members.length} Siswa
          </span>
        </div>
        {SECTION_NAMES.map((sec) => (
          <div
            key={sec}
            className="bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/40"
          >
            <span className="text-[10px] font-bold uppercase text-on-surface-variant block truncate">
              {sec}
            </span>
            <span className="text-lg font-extrabold text-on-surface">
              {members.filter((m) => m.section.toUpperCase() === sec).length} Siswa
            </span>
          </div>
        ))}
      </div>

      {/* Filter & Daftar Anggota */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Cari nama / kelas / kode siswa MB${activeAngkatan}...`}
            className="px-3.5 py-2 rounded-xl border border-outline-variant text-xs sm:text-sm outline-none focus:border-primary-container w-full md:w-72"
          />
          <div className="flex flex-wrap gap-1.5">
            {['ALL', ...SECTION_NAMES].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setSectionFilter(sec)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  sectionFilter === sec
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {sec === 'ALL' ? 'Semua' : sec}
              </button>
            ))}
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
              Klik <strong>+ Tambah Siswa</strong> atau <strong>Import Excel (.xlsx)</strong> untuk menambahkan data.
            </p>
          </div>
        ) : (
          <>
            {/* TAMPILAN MOBILE (KARTU RAPI TANPA PERLU GESER KANAN) */}
            <div className="md:hidden divide-y divide-outline-variant/30">
              {filteredMembers.map((m, idx) => (
                <div key={m.id} className="p-3.5 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                          {idx + 1}. {m.memberCode}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                          Kelas {m.kelas || '-'}
                        </span>
                      </div>
                      <p className="text-sm font-extrabold text-on-surface mt-1">
                        {m.fullName}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {m.section} — <strong className="text-on-surface">{m.instrument}</strong>
                      </p>
                      {m.phone && m.phone !== '-' && (
                        <p className="text-[11px] text-on-surface-variant mt-0.5">
                          📱 WA: {m.phone}
                        </p>
                      )}
                    </div>

                    {canEdit && (
                      <button
                        type="button"
                        onClick={() => deleteMember(m.id)}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs shrink-0 cursor-pointer"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* TAMPILAN DESKTOP (TABEL LENGKAP) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] border-b border-outline-variant/40">
                  <tr>
                    <th className="py-3 px-4">No / Kode</th>
                    <th className="py-3 px-4">Nama Lengkap</th>
                    <th className="py-3 px-4">Kelas</th>
                    <th className="py-3 px-4">Seksi</th>
                    <th className="py-3 px-4">Alat / Instrumen</th>
                    <th className="py-3 px-4">No. WA</th>
                    {canEdit && <th className="py-3 px-4 text-right">Aksi</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredMembers.map((m, idx) => (
                    <tr key={m.id} className="hover:bg-surface-container-low/50">
                      <td className="py-3 px-4 font-mono font-semibold text-on-surface-variant">
                        {idx + 1}. {m.memberCode}
                      </td>
                      <td className="py-3 px-4 font-bold text-on-surface">
                        {m.fullName}
                      </td>
                      <td className="py-3 px-4 font-semibold text-on-surface">
                        {m.kelas || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-surface-container font-bold text-xs text-on-surface">
                          {m.section}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-on-surface-variant font-medium">
                        {m.instrument}
                      </td>
                      <td className="py-3 px-4 text-on-surface-variant">
                        {m.phone || '-'}
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
          </>
        )}
      </div>

      {/* Modal Tambah Anggota dengan Dropdown Sesuai Panduan Section Gema Taruna */}
      {isModalOpen && canEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl my-auto">
            <h2 className="text-lg font-extrabold mb-1">
              Tambah Siswa Baru — Angkatan {activeAngkatan}
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Pilih Seksi dan Alat sesuai Panduan Section Gema Taruna.
            </p>

            {/* Kotak Panduan Section Gema Taruna */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 text-[11px] text-slate-700 space-y-1">
              <p className="font-extrabold text-slate-900 uppercase tracking-wider">
                PANDUAN SECTION GEMA TARUNA:
              </p>
              <p><strong>BRASS:</strong> TEROMPET, BARITON</p>
              <p><strong>PERCUSSION:</strong> BASS DRUM, SNARE DRUM, TENOR, SIMBAL</p>
              <p><strong>PIT INSTRUMENT:</strong> BELIRA (DAN INSTRUMEN STATIS LAINNYA)</p>
              <p><strong>COLOR GUARD:</strong> BENDERA & VISUAL PERFORMANCE</p>
              <p><strong>LEADERSHIP:</strong> FIELD COMMANDER, STICKMASTER TARUNA/I</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    No. Urut
                  </label>
                  <input
                    type="text"
                    value={noUrut}
                    onChange={(e) => setNoUrut(e.target.value)}
                    placeholder={`${members.length + 1}`}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kelas
                  </label>
                  <input
                    type="text"
                    required
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    placeholder="Contoh: X-1 / XI-2"
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                  />
                </div>
              </div>

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
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Seksi (Section)
                  </label>
                  <select
                    value={section}
                    onChange={(e) => handleSectionChange(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white font-semibold"
                  >
                    {SECTION_NAMES.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Alat / Instrumen
                  </label>
                  <select
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white font-semibold"
                  >
                    {(SECTION_OPTIONS[section] || []).map((alat) => (
                      <option key={alat} value={alat}>
                        {alat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  No. WhatsApp Siswa
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm"
                />
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
