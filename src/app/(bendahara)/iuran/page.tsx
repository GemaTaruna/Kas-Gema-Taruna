'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IuranPage() {
  const [activeMonth, setActiveMonth] = useState('September 2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{name: string, section: string, wa: string} | null>(null);
  
  const [showWaDrawer, setShowWaDrawer] = useState(false);

  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September 2026', 'Oktober', 'November', 'Desember'];

  const members = [
    { id: '01', initials: 'BA', name: 'Bagas Arya Santoso', section: 'Percussion (Snare Drum)', sectionCode: 'Percussion', icon: 'music_note', color: 'text-secondary', wa: '0812-3456-7890', amount: 'Rp 50.000', status: 'LUNAS', time: '24 Sep 2026, 14:20 WIB', bg: 'bg-surface-container' },
    { id: '02', initials: 'DW', name: 'Dimas Wahyu Pratama', section: 'Brass (Trumpet 1)', sectionCode: 'Brass', icon: 'graphic_eq', color: 'text-secondary', wa: '0813-8899-2211', amount: 'Rp 50.000', status: 'BELUM BAYAR', time: '-', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { id: '03', initials: 'SN', name: 'Siti Nurhaliza', section: 'Color Guard (Rifle)', sectionCode: 'Color Guard', icon: 'flag', color: 'text-tertiary-container', wa: '0819-0123-4567', amount: 'Rp 50.000', status: 'LUNAS', time: '20 Sep 2026, 09:15 WIB', bg: 'bg-surface-container' },
    { id: '04', initials: 'FM', name: 'Farhan Maulana', section: 'Brass (Mellophone)', sectionCode: 'Brass', icon: 'graphic_eq', color: 'text-secondary', wa: '0821-4567-8901', amount: 'Rp 50.000', status: 'BELUM BAYAR', time: '-', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { id: '05', initials: 'AP', name: 'Amanda Putri Lestari', section: 'Pit Instrument (Marimba)', sectionCode: 'Pit Instrument', icon: 'piano', color: 'text-[#4338CA]', wa: '0857-1122-3344', amount: 'Rp 50.000', status: 'LUNAS', time: '18 Sep 2026, 16:45 WIB', bg: 'bg-surface-container' },
    { id: '06', initials: 'RR', name: 'Rizky Ramadhan', section: 'Percussion (Bass Drum 4)', sectionCode: 'Percussion', icon: 'music_note', color: 'text-secondary', wa: '0878-9988-7766', amount: 'Rp 50.000', status: 'BELUM BAYAR', time: '-', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { id: '07', initials: 'NZ', name: 'Nabila Zahra', section: 'Color Guard (Flag Line)', sectionCode: 'Color Guard', icon: 'flag', color: 'text-tertiary-container', wa: '0812-9900-1122', amount: 'Rp 50.000', status: 'LUNAS', time: '15 Sep 2026, 11:30 WIB', bg: 'bg-surface-container' },
    { id: '08', initials: 'KA', name: 'Kevin Adiputra', section: 'Brass (Trombone)', sectionCode: 'Brass', icon: 'graphic_eq', color: 'text-secondary', wa: '0813-7766-5544', amount: 'Rp 50.000', status: 'BELUM BAYAR', time: '-', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
  ];

  const filteredMembers = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.wa.includes(searchQuery) || m.section.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSection = sectionFilter === 'ALL' || m.sectionCode === sectionFilter;
    const matchStatus = statusFilter === 'ALL' || m.status === statusFilter;
    return matchSearch && matchSection && matchStatus;
  });

  const openPayModal = (name: string, section: string, wa: string) => {
    setSelectedMember({ name, section, wa });
    setShowPayModal(true);
  };

  const closePayModal = () => {
    setShowPayModal(false);
    setSelectedMember(null);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sub-Navigation & Header Area */}
      <section className="px-gutter py-space-lg flex flex-col gap-space-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-secondary font-label-xs tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">payments</span>
              <span>MODUL KEUANGAN RUTIN</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Manajemen Pembayaran Iuran Anggota</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Pencatatan iuran wajib bulanan Rp 50.000/anggota Marching Band Gema Taruna.</p>
          </div>
          {/* Year Selector & Fast Metrics Badge */}
          <div className="flex items-center gap-space-sm self-start lg:self-center">
            <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container shadow-sm">
              <span className="material-symbols-outlined text-lg text-on-surface-variant">calendar_month</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Tahun Fiskal:</span>
              <select className="bg-transparent font-title-sm text-title-sm text-on-surface focus:outline-none cursor-pointer pr-1">
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <button onClick={() => setShowWaDrawer(true)} className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container font-label-md text-label-md transition-all shadow-sm">
              <span className="material-symbols-outlined text-lg text-[#25D366]">quick_phrases</span>
              <span>Template WA</span>
            </button>
          </div>
        </div>
        {/* Horizontal Month Pills Selector */}
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center gap-space-xs overflow-x-auto py-1 scrollbar-none">
            {months.map(m => (
              <button 
                key={m}
                onClick={() => setActiveMonth(m)}
                className={`px-space-md py-space-xs rounded-lg font-label-sm text-label-sm whitespace-nowrap transition-colors ${
                  activeMonth === m 
                  ? 'flex items-center gap-space-xs bg-primary-container text-on-primary font-label-md text-label-md shadow-md' 
                  : 'text-on-surface-variant hover:bg-surface-container'
                }`}>
                {activeMonth === m && <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>}
                <span>{m}</span>
                {activeMonth === m && <span className="font-label-xs text-label-xs px-1.5 py-0.5 rounded bg-surface-container-highest/20 text-on-primary ml-1">AKTIF</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Banner & Key Metrics Card Grid */}
      <section className="px-gutter pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Metric 1: Total Anggota & Target */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">TOTAL ANGGOTA RESMI</span>
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-high text-on-surface">
                <span className="material-symbols-outlined text-lg">groups</span>
              </span>
            </div>
            <div className="my-space-sm">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-metric-display text-metric-display text-on-surface">40</span>
                <span className="font-title-sm text-title-sm text-on-surface-variant">Personel</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Divisi Musik & Visual Terdaftar</p>
            </div>
            <div className="pt-space-xs flex items-center justify-between font-label-xs text-label-xs text-on-surface-variant">
              <span>Target Terkumpul:</span>
              <span className="font-title-sm text-label-sm text-on-surface">Rp 2.000.000</span>
            </div>
          </div>

          {/* Metric 2: Sudah Bayar (Lunas) */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">LUNAS BULAN INI</span>
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#ECFDF5] text-[#065F46]">
                <span className="material-symbols-outlined text-lg">verified</span>
              </span>
            </div>
            <div className="my-space-sm">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-metric-display text-metric-display text-[#065F46]">32</span>
                <span className="font-body-md text-body-md text-on-surface-variant">/ 40 Org</span>
              </div>
              <span className="font-title-sm text-title-sm text-on-surface">Rp 1.600.000</span>
            </div>
            <div className="flex items-center gap-space-xs font-label-xs text-label-xs text-[#065F46]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              <span>80% Realisasi Masuk Rekening Kas</span>
            </div>
          </div>

          {/* Metric 3: Belum Bayar */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">TUNGGAKAN TERSISA</span>
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#FEF2F2] text-[#991B1B]">
                <span className="material-symbols-outlined text-lg">pending_actions</span>
              </span>
            </div>
            <div className="my-space-sm">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-metric-display text-metric-display text-[#BA1A1A]">8</span>
                <span className="font-body-md text-body-md text-on-surface-variant">Anggota</span>
              </div>
              <span className="font-title-sm text-title-sm text-[#BA1A1A]">Rp 400.000</span>
            </div>
            <div className="flex items-center gap-space-xs font-label-xs text-label-xs text-error">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>Batas Waktu: 28 Sep 2026</span>
            </div>
          </div>

          {/* Metric 4: Progress Capaian & Cepat Aksi */}
          <div className="relative overflow-hidden rounded-xl bg-primary-container text-on-primary p-space-lg shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-primary-container">Progress Kas Masuk</span>
                <span className="font-title-sm text-title-sm text-secondary-container">80%</span>
              </div>
              <div className="w-full bg-surface-container-high/20 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary-container h-full rounded-full transition-all duration-700" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="mt-space-sm flex flex-col gap-space-xs">
              <span className="font-body-sm text-label-xs text-on-primary-container">Sisa Rp 400.000 untuk target operasional latihan akbar.</span>
              <div className="flex items-center gap-space-xs pt-space-xs">
                <button className="flex-1 py-1.5 px-2 rounded-lg bg-surface-container-highest/20 hover:bg-surface-container-highest/30 font-label-xs text-label-xs text-on-primary transition-colors text-center">
                  Detail Arus Kas
                </button>
                <button className="flex-1 py-1.5 px-2 rounded-lg bg-secondary-container hover:opacity-90 font-label-xs text-label-xs text-on-secondary-container transition-opacity text-center font-bold">
                  Kunci Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Bulk Action Bar & Filter Controls */}
      <section className="px-gutter pb-space-md">
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
          {/* Upper: Bulk Administrative Actions */}
          <div className="flex flex-wrap items-center justify-between gap-space-md pb-space-sm border-b border-surface-container">
            <div className="flex flex-wrap items-center gap-space-sm">
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-[#25D366] hover:bg-[#1fb355] text-white font-label-md text-label-md shadow-sm transition-all">
                <span className="material-symbols-outlined text-lg">chat</span>
                <span>WA Semua yang Belum Bayar (8)</span>
              </a>
              <button className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors">
                <span className="material-symbols-outlined text-lg text-secondary">checklist_rtl</span>
                <span>Tandai Lunas Terpilih</span>
              </button>
            </div>
            <div className="flex items-center gap-space-xs">
              <button className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
                <span className="material-symbols-outlined text-base text-secondary">table_view</span>
                <span>Export Excel</span>
              </button>
              <button className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
                <span className="material-symbols-outlined text-base text-error">picture_as_pdf</span>
                <span>Cetak Rekap PDF</span>
              </button>
            </div>
          </div>

          {/* Lower: Search and Filter Tabs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md pt-space-xs">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text" 
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none transition-all shadow-inner" 
                placeholder="Cari nama anggota, seksi atau nomor WhatsApp..." 
              />
            </div>
            <div className="flex flex-wrap items-center gap-space-sm">
              <div className="flex items-center gap-space-xs px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-base text-on-surface-variant">filter_alt</span>
                <select 
                  value={sectionFilter}
                  onChange={(e) => setSectionFilter(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer text-on-surface font-semibold"
                >
                  <option value="ALL">Semua Bagian</option>
                  <option value="Brass">Brass</option>
                  <option value="Percussion">Percussion</option>
                  <option value="Color Guard">Color Guard</option>
                  <option value="Pit Instrument">Pit Instrument</option>
                  <option value="Official">Official / Tim Kreatif</option>
                </select>
              </div>
              <div className="flex items-center p-1 rounded-lg bg-surface-container-low">
                <button onClick={() => setStatusFilter('ALL')} className={`filter-tab px-3 py-1 rounded-md font-label-xs text-label-xs shadow-sm font-semibold transition-colors ${statusFilter === 'ALL' ? 'bg-surface-container-lowest text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}>Semua (40)</button>
                <button onClick={() => setStatusFilter('LUNAS')} className={`filter-tab px-3 py-1 rounded-md font-label-xs text-label-xs transition-colors flex items-center gap-1 shadow-sm font-semibold ${statusFilter === 'LUNAS' ? 'bg-surface-container-lowest text-[#065F46]' : 'text-on-surface-variant hover:text-on-surface'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  <span>Lunas (32)</span>
                </button>
                <button onClick={() => setStatusFilter('BELUM BAYAR')} className={`filter-tab px-3 py-1 rounded-md font-label-xs text-label-xs transition-colors flex items-center gap-1 shadow-sm font-semibold ${statusFilter === 'BELUM BAYAR' ? 'bg-surface-container-lowest text-error' : 'text-on-surface-variant hover:text-on-surface'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  <span>Belum Bayar (8)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Member Payment Table */}
      <section className="px-gutter pb-space-xl">
        <div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">
                  <th className="py-space-md px-space-md text-center w-12"><input type="checkbox" className="rounded text-primary focus:ring-0 cursor-pointer" /></th>
                  <th className="py-space-md px-space-sm text-center w-12">No</th>
                  <th className="py-space-md px-space-md">Nama Lengkap & Bagian</th>
                  <th className="py-space-md px-space-md">No. WhatsApp</th>
                  <th className="py-space-md px-space-md text-right">Nominal</th>
                  <th className="py-space-md px-space-md text-center">Status Iuran</th>
                  <th className="py-space-md px-space-md">Tanggal Pembayaran</th>
                  <th className="py-space-md px-space-md text-center">Aksi Cepat</th>
                  <th className="py-space-md px-space-md text-center">Notifikasi WA</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md text-on-surface divide-y divide-surface-container">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className={`hover:bg-surface-container-low/50 transition-colors ${member.status === 'BELUM BAYAR' ? 'bg-error-container/20 hover:bg-error-container/30' : ''}`}>
                    <td className="py-space-md px-space-md text-center"><input type="checkbox" className="rounded text-primary focus:ring-0 cursor-pointer" /></td>
                    <td className="py-space-md px-space-sm text-center font-label-sm text-on-surface-variant">{member.id}</td>
                    <td className="py-space-md px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-label-sm ${member.bg}`}>
                          {member.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-title-sm text-title-sm text-on-surface font-semibold">{member.name}</span>
                          <span className={`inline-flex items-center gap-1 font-label-xs text-label-xs ${member.color}`}>
                            <span className={`material-symbols-outlined text-[12px] ${member.color === 'text-secondary' ? 'text-secondary' : 'text-tertiary-container'}`}>{member.icon}</span>
                            {member.section}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-space-md px-space-md">
                      <span className="font-mono text-label-sm text-on-surface-variant">{member.wa}</span>
                    </td>
                    <td className={`py-space-md px-space-md text-right font-semibold ${member.status === 'BELUM BAYAR' ? 'text-error' : ''}`}>
                      {member.amount}
                    </td>
                    <td className="py-space-md px-space-md text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-xs text-label-xs font-bold ${member.status === 'LUNAS' ? 'bg-[#ECFDF5] text-[#065F46]' : 'bg-[#FEF2F2] text-[#991B1B]'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'LUNAS' ? 'bg-[#10B981]' : 'bg-error'}`}></span>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-space-md px-space-md font-body-sm text-body-sm text-on-surface-variant">
                      {member.time}
                    </td>
                    <td className="py-space-md px-space-md text-center">
                      {member.status === 'LUNAS' ? (
                        <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container text-[#065F46] font-label-xs text-label-xs font-semibold cursor-default">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          <span>Sudah Lunas</span>
                        </button>
                      ) : (
                        <button onClick={() => openPayModal(member.name, member.section, member.wa)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white font-label-sm text-label-sm shadow-sm transition-all font-semibold">
                          <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                          <span>BAYAR SEKARANG</span>
                        </button>
                      )}
                    </td>
                    <td className="py-space-md px-space-md text-center">
                      {member.status === 'LUNAS' ? (
                        <a href={`https://wa.me/62${member.wa.replace(/\D/g, '').substring(1)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 font-label-xs text-label-xs transition-colors">
                          <span className="material-symbols-outlined text-sm text-[#25D366]">mark_chat_read</span>
                          <span>WA Lunas</span>
                        </a>
                      ) : (
                        <a href={`https://wa.me/62${member.wa.replace(/\D/g, '').substring(1)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366] hover:bg-[#128C7E] text-white font-label-xs text-label-xs font-semibold shadow-sm transition-all">
                          <span className="material-symbols-outlined text-sm">outgoing_mail</span>
                          <span>WA Pengingat</span>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Table Pagination */}
          <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
            <span>Menampilkan 8 dari 40 data anggota terdaftar</span>
            <div className="flex items-center gap-space-xs">
              <button className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high transition-colors disabled:opacity-50" disabled>Sebelumnya</button>
              <span className="px-3 py-1 rounded bg-primary-container text-on-primary font-bold">1</span>
              <button className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high transition-colors">2</button>
              <button className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high transition-colors">3</button>
              <button className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high transition-colors">Selanjutnya</button>
            </div>
          </div>
        </div>
      </section>

      {/* Pay Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-space-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-surface-container-lowest shadow-2xl overflow-hidden flex flex-col">
            <div className="px-space-lg py-space-md bg-surface-container flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-on-surface font-headline-md text-headline-md font-bold">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                <span>Konfirmasi Penerimaan Iuran</span>
              </div>
              <button onClick={closePayModal} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-high text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="p-space-lg flex flex-col gap-space-md">
              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Anggota Marching Band</span>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold">{selectedMember?.name}</span>
                  <span className="font-label-sm text-label-sm text-secondary">{selectedMember?.section}</span>
                </div>
                <div className="text-right">
                  <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Periode Tagihan</span>
                  <span className="block font-title-sm text-title-sm text-on-surface font-bold">September 2026</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Tarif: Rp 50.000</span>
                </div>
              </div>
              <div className="flex flex-col gap-space-sm">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Nominal Pembayaran Diterima</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-title-sm text-on-surface-variant font-bold">Rp</span>
                  <input type="text" value="50.000" readOnly className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-title-sm text-title-sm font-bold focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Metode Pembayaran</label>
                <div className="grid grid-cols-2 gap-space-sm">
                  <label className="flex items-center gap-space-xs p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer">
                    <input type="radio" name="payMethod" value="cash" className="text-primary focus:ring-0" defaultChecked />
                    <div className="flex items-center gap-1 font-label-md text-label-md text-on-surface">
                      <span className="material-symbols-outlined text-base">payments</span>
                      <span>Tunai (Cash)</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-space-xs p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer">
                    <input type="radio" name="payMethod" value="transfer" className="text-primary focus:ring-0" />
                    <div className="flex items-center gap-1 font-label-md text-label-md text-on-surface">
                      <span className="material-symbols-outlined text-base">account_balance</span>
                      <span>Transfer Bank / QRIS</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-[#ECFDF5] flex items-start gap-space-xs">
                <input type="checkbox" id="sendWaNotification" className="mt-1 text-[#10B981] focus:ring-0 rounded cursor-pointer" defaultChecked />
                <div className="flex flex-col">
                  <label htmlFor="sendWaNotification" className="font-label-sm text-label-sm text-[#065F46] font-bold cursor-pointer">Kirim Notifikasi WhatsApp Otomatis</label>
                  <span className="font-body-sm text-body-sm text-[#065F46]/80">Kuitansi tanda terima digital akan langsung dikirimkan ke nomor WhatsApp terdaftar anggota.</span>
                </div>
              </div>
            </div>
            <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-end gap-space-sm">
              <button onClick={closePayModal} className="px-space-md py-space-sm rounded-lg hover:bg-surface-container text-on-surface-variant font-label-md text-label-md transition-colors">
                Batal
              </button>
              <button onClick={closePayModal} className="flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-[#10B981] hover:bg-[#059669] text-white font-label-md text-label-md font-bold shadow-md transition-all">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Konfirmasi & Catat Masuk Kas</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WA Template Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-surface-container-lowest shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${showWaDrawer ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-space-lg bg-[#075E54] text-white flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-2xl text-[#25D366]">qr_code_2</span>
            <div className="flex flex-col">
              <span className="font-title-sm text-title-sm font-bold">Template Pesan WhatsApp</span>
              <span className="font-label-xs text-label-xs text-white/80">KAS GEMA TARUNA SYSTEM</span>
            </div>
          </div>
          <button onClick={() => setShowWaDrawer(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-space-lg overflow-y-auto flex-1 flex flex-col gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm font-bold text-on-surface">1. Template Pengingat Iuran Bulanan</span>
              <span className="px-2 py-0.5 rounded text-label-xs font-semibold bg-error-container text-on-error-container">Tunggakan</span>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm shadow-inner relative flex flex-col gap-2 leading-relaxed">
              <p className="font-mono text-label-xs text-secondary font-bold">Preview Teks:</p>
              <p>
                "Halo [Nama_Anggota] ([Bagian]),<br/><br/>
                Mengingatkan bahwa iuran kas wajib Marching Band Gema Taruna untuk periode <b>September 2026</b> sebesar <b>Rp 50.000</b> belum tercatat di bendahara.<br/><br/>
                Mohon lakukan penyelesaian ke Rekening Kas Mandiri: 137-00-1234567-8 a/n Marching Band Gema Taruna atau serahkan langsung ke Fahmi Pratama.<br/><br/>
                Terima kasih atas kedisiplinan dan kontribusinya! 🥁🎺"
              </p>
              <div className="flex justify-end pt-1">
                <button className="inline-flex items-center gap-1 font-label-xs text-label-xs text-secondary hover:underline">
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  <span>Salin Format Teks</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-space-xs pt-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm font-bold text-on-surface">2. Template Kuitansi Pembayaran Lunas</span>
              <span className="px-2 py-0.5 rounded text-label-xs font-semibold bg-[#ECFDF5] text-[#065F46]">Bukti Sah</span>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm shadow-inner relative flex flex-col gap-2 leading-relaxed">
              <p className="font-mono text-label-xs text-secondary font-bold">Preview Teks:</p>
              <p>
                "✅ <b>KAS GEMA TARUNA - TANDA TERIMA SAH</b><br/><br/>
                Telah diterima iuran kas rutin:<br/>
                Nama: [Nama_Anggota]<br/>
                Bagian: [Bagian]<br/>
                Bulan: September 2026<br/>
                Nominal: Rp 50.000 (LUNAS)<br/>
                Tanggal: [Tgl_Sekarang]<br/>
                Penerima: Fahmi Pratama (Bendahara Umum)<br/><br/>
                Terima kasih telah menunaikan kewajiban tepat waktu! Tetap solid & jaya selalu!"
              </p>
              <div className="flex justify-end pt-1">
                <button className="inline-flex items-center gap-1 font-label-xs text-label-xs text-secondary hover:underline">
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  <span>Salin Format Teks</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-auto p-space-md rounded-xl bg-surface-container flex items-start gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-lg">info</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Variabel dalam tanda kurung siku akan digantikan secara dinamis dengan nama dan bagian anggota saat tombol WhatsApp diklik langsung dari daftar tabel.</p>
          </div>
        </div>
      </div>
      
      {/* Backdrop for drawer */}
      {showWaDrawer && (
        <div onClick={() => setShowWaDrawer(false)} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"></div>
      )}
    </div>
  );
}
