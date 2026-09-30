'use client';

import React, { useState } from 'react';

export default function RiwayatTransaksiPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({ ref: '', desc: '', amount: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const openDeleteModal = (ref: string, desc: string, amount: string) => {
    setDeleteData({ ref, desc, amount });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteAction = () => {
    alert('Transaksi ' + deleteData.ref + ' berhasil dihapus dari Buku Kas Umum. Saldo telah disesuaikan kembali.');
    closeDeleteModal();
  };

  return (
    <main className="relative pt-16 bg-background min-h-screen">
      <div className="flex flex-col w-full">
        {/* Main Container */}
        <div className="px-gutter py-space-lg flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
          {/* Top Header & Action Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-2">
                <span className="font-label-xs text-label-xs px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider font-bold">
                  Buku Kas Umum • Jurnal Mutasi • Periode 2026
                </span>
                <span className="inline-flex items-center gap-1 font-label-xs text-label-xs text-on-surface-variant font-semibold">
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span> SHA-256 Ledger Verified
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold">
                Riwayat Transaksi Keuangan
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Catatan kronologis seluruh arus kas masuk (pemasukan) dan arus kas keluar (pengeluaran) Marching Band Gema Taruna secara transparan, realtime, dan terakuntabilitas.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-space-sm self-start lg:self-center">
              {/* Export Excel */}
              <button className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-colors" type="button">
                <span className="material-symbols-outlined text-lg text-secondary">table_view</span>
                <span>Export Excel (.xlsx)</span>
              </button>
              {/* Export PDF */}
              <button className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-colors" type="button">
                <span className="material-symbols-outlined text-lg text-error">picture_as_pdf</span>
                <span>Export PDF / Rekap</span>
              </button>
              {/* Primary Action */}
              <button className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:bg-surface-tint transition-all" type="button">
                <span className="material-symbols-outlined text-lg text-secondary-container">add_circle</span>
                <span>+ Entri Transaksi Baru</span>
              </button>
            </div>
          </div>

          {/* Summary Metric Cards (4 Bento Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
            {/* Card 1: Saldo Akhir */}
            <div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-container"></div>
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Saldo Akhir Kas Terkini</span>
                <span className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                </span>
              </div>
              <div className="my-space-xs">
                <span className="font-metric-display text-metric-display text-on-surface tracking-tight font-bold">Rp 12.450.000</span>
              </div>
              <div className="pt-space-xs flex flex-col gap-1">
                <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Kas Tunai Brankas Utama</span>
                  <span className="font-semibold text-on-surface font-label-sm">Rp 9.200.000</span>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Kas Kecil Dompet Lapangan</span>
                  <span className="font-semibold text-on-surface font-label-sm">Rp 3.250.000</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label-xs text-label-xs text-secondary font-bold">Status: Sehat &amp; Likuid</span>
                </div>
              </div>
            </div>

            {/* Card 2: Total Akumulasi Masuk */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Total Arus Masuk</span>
                <span className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-xl">arrow_downward</span>
                </span>
              </div>
              <div className="my-space-xs">
                <span className="font-metric-display text-metric-display text-on-surface tracking-tight font-bold text-secondary">+Rp 25.000.000</span>
              </div>
              <div className="pt-space-xs flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">48 Transaksi Penerimaan</span>
                <span className="inline-flex items-center gap-0.5 font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">
                  <span className="material-symbols-outlined text-xs">trending_up</span> +14.2% bln ini
                </span>
              </div>
            </div>

            {/* Card 3: Total Akumulasi Keluar */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Total Arus Keluar</span>
                <span className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-xl">arrow_upward</span>
                </span>
              </div>
              <div className="my-space-xs">
                <span className="font-metric-display text-metric-display text-on-surface tracking-tight font-bold text-error">-Rp 12.550.000</span>
              </div>
              <div className="pt-space-xs flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">31 Pos Pembukuan Belanja</span>
                <span className="inline-flex items-center gap-0.5 font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-semibold">
                  <span className="material-symbols-outlined text-xs">warning</span> Sesuai RAPB
                </span>
              </div>
            </div>

            {/* Card 4: Total Mutasi Terverifikasi */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Integritas Pembukuan</span>
                <span className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-xl">verified_user</span>
                </span>
              </div>
              <div className="my-space-xs flex items-baseline gap-2">
                <span className="font-metric-display text-metric-display text-on-surface tracking-tight font-bold">79</span>
                <span className="font-title-sm text-title-sm text-on-surface-variant">Mutasi Selesai</span>
              </div>
              <div className="pt-space-xs flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">100% Rekonsiliasi Bank</span>
                </div>
                <span className="font-label-xs text-label-xs text-secondary-container font-semibold">Bulan Aktif</span>
              </div>
            </div>
          </div>

          {/* Filter & Search Section */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
            {/* Search & Select Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-sm items-center">
              {/* Search Input */}
              <div className="lg:col-span-4 relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg">search</span>
                <input 
                  className="w-full pl-9 pr-3 py-2 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none transition-all placeholder:text-outline" 
                  id="searchInput" 
                  placeholder="Cari no bukti, uraian, toko, PIC..." 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* Filter Jenis Transaksi */}
              <div className="lg:col-span-2">
                <select className="w-full px-3 py-2 bg-surface-container-low text-on-surface rounded-lg font-label-md text-label-md focus:outline-none cursor-pointer" defaultValue="all">
                  <option value="all">Semua Aliran Kas</option>
                  <option value="in">Hanya Pemasukan (+)</option>
                  <option value="out">Hanya Pengeluaran (-)</option>
                </select>
              </div>
              {/* Filter Periode */}
              <div className="lg:col-span-2">
                <select className="w-full px-3 py-2 bg-surface-container-low text-on-surface rounded-lg font-label-md text-label-md focus:outline-none cursor-pointer" defaultValue="September 2026">
                  <option value="September 2026">September 2026</option>
                  <option value="Agustus 2026">Agustus 2026</option>
                  <option value="Juli 2026">Juli 2026</option>
                  <option value="Q3 2026 (Jul-Sep)">Q3 2026 (Jul-Sep)</option>
                  <option value="Tahun Fiskal 2026">Tahun Fiskal 2026</option>
                </select>
              </div>
              {/* Filter Kategori */}
              <div className="lg:col-span-2">
                <select className="w-full px-3 py-2 bg-surface-container-low text-on-surface rounded-lg font-label-md text-label-md focus:outline-none cursor-pointer" defaultValue="Semua Kategori">
                  <option value="Semua Kategori">Semua Kategori</option>
                  <option value="Iuran Anggota">Iuran Anggota</option>
                  <option value="Perawatan Alat">Perawatan Alat</option>
                  <option value="Donasi Alumni">Donasi Alumni</option>
                  <option value="Konsumsi Latihan">Konsumsi Latihan</option>
                  <option value="Seragam &amp; Guard">Seragam &amp; Guard</option>
                  <option value="Sponsorship">Sponsorship</option>
                  <option value="Transportasi">Transportasi</option>
                </select>
              </div>
              {/* Filter Rekening Kas */}
              <div className="lg:col-span-2">
                <select className="w-full px-3 py-2 bg-surface-container-low text-on-surface rounded-lg font-label-md text-label-md focus:outline-none cursor-pointer" defaultValue="Semua Rekening Kas">
                  <option value="Semua Rekening Kas">Semua Rekening Kas</option>
                  <option value="Kas Kecil Dompet Lapangan">Kas Kecil Dompet Lapangan</option>
                  <option value="Kas Tunai Brankas Utama">Kas Tunai Brankas Utama</option>
                </select>
              </div>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap items-center gap-space-xs pt-1">
              <span className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold mr-1">Filter Cepat:</span>
              <button className="px-3 py-1 rounded-full font-label-xs text-label-xs bg-primary-container text-on-primary font-bold shadow-xs" type="button">Semua (79)</button>
              <button className="px-3 py-1 rounded-full font-label-xs text-label-xs bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors" type="button">Pemasukan (+48)</button>
              <button className="px-3 py-1 rounded-full font-label-xs text-label-xs bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors" type="button">Pengeluaran (-31)</button>
              <button className="px-3 py-1 rounded-full font-label-xs text-label-xs bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors" type="button">Nominal &gt; Rp 1.000.000</button>
              <button className="px-3 py-1 rounded-full font-label-xs text-label-xs bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors flex items-center gap-1" type="button">
                <span className="material-symbols-outlined text-xs">attach_file</span>
                <span>Ada Lampiran Nota (74)</span>
              </button>
              <button className="px-3 py-1 rounded-full font-label-xs text-label-xs text-error hover:bg-error-container transition-colors ml-auto font-semibold" type="button">
                Reset Filter
              </button>
            </div>
          </div>

          {/* Main Mutation Ledger Table (Buku Kas Umum) */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
            {/* Table Header Bar / Count & Batch Action */}
            <div className="px-space-lg py-space-sm bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="font-headline-md text-title-sm font-bold text-on-surface">Jurnal Kas Umum Terbuka</span>
                <span className="font-label-xs text-label-xs px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-semibold">Menampilkan 8 dari 79 entri</span>
              </div>
              <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-sm text-secondary">sync</span>
                <span>Sinkronisasi otomatis dengan Rekening Koran terakhir 24 Sep 2026 14:35 WIB</span>
              </div>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left font-body-md text-body-md border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant uppercase font-label-xs text-label-xs tracking-wider">
                    <th className="py-3 px-4 w-10 text-center" scope="col">
                      <input className="rounded bg-surface-container-lowest text-secondary focus:ring-0 cursor-pointer" type="checkbox" />
                    </th>
                    <th className="py-3 px-4 w-36" scope="col">Waktu &amp; Tanggal</th>
                    <th className="py-3 px-4 w-36" scope="col">No. Bukti Kas</th>
                    <th className="py-3 px-4 w-44" scope="col">Jenis &amp; Kategori</th>
                    <th className="py-3 px-4" scope="col">Uraian / Keterangan Pembukuan</th>
                    <th className="py-3 px-4 text-right w-36" scope="col">Mutasi (Rp)</th>
                    <th className="py-3 px-4 text-right w-36" scope="col">Saldo Kas (Rp)</th>
                    <th className="py-3 px-4 w-36" scope="col">Kas / Bank</th>
                    <th className="py-3 px-4 w-28 text-center" scope="col">Bukti Nota</th>
                    <th className="py-3 px-4 text-center w-28" scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low text-on-surface font-body-md">
                  {/* Row 1: Pemasukan Iuran Bagas */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3.5 px-4 text-center">
                      <input className="rounded bg-surface-container-low text-secondary cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-md text-label-md font-semibold block text-on-surface">24 Sep 2026</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">14:20 WIB</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono font-semibold">BKM-2026-09-042</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold mb-1">
                        <span className="material-symbols-outlined text-xs">south_west</span> Masuk
                      </span>
                      <span className="block font-label-xs text-label-xs text-on-surface-variant font-medium">Iuran Anggota (Battery)</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold block text-on-surface">Iuran Kas September 2026 - Bagas Arya Santoso</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">person</span> Section: Snare Line (#MBGT-014) • PIC: Kak Fahmi
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-label-md text-label-md font-bold text-secondary font-mono">+50.000</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-on-surface">
                      12.450.000
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-semibold">
                        <span className="material-symbols-outlined text-xs text-secondary">payments</span> Kas Tunai
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-low text-secondary hover:bg-surface-container-high transition-colors font-medium" type="button">
                        <span className="material-symbols-outlined text-sm">receipt_long</span> Digital
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Lihat Rincian" type="button">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Edit Transaksi" type="button">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-error hover:bg-error-container" onClick={() => openDeleteModal('BKM-2026-09-042', 'Iuran Kas September 2026 - Bagas Arya Santoso', 'Rp 50.000')} title="Batalkan / Hapus" type="button">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Row 2: Pengeluaran Perawatan Stick Snare */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors bg-surface-container-lowest">
                    <td className="py-3.5 px-4 text-center">
                      <input className="rounded bg-surface-container-low text-secondary cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-md text-label-md font-semibold block text-on-surface">22 Sep 2026</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">16:40 WIB</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono font-semibold">BKK-2026-09-031</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold mb-1">
                        <span className="material-symbols-outlined text-xs">north_east</span> Keluar
                      </span>
                      <span className="block font-label-xs text-label-xs text-on-surface-variant font-medium">Perawatan Alat (Battery)</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold block text-on-surface">Pembelian Stick Snare Vic Firth &amp; Valve Oil Bach Brass</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">storefront</span> Toko: Toko Harmoni Nada Musik Kramat • PIC: Dimas (Seksi Logistik)
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-label-md text-label-md font-bold text-error font-mono">-350.000</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-on-surface">
                      12.400.000
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-semibold">
                        <span className="material-symbols-outlined text-xs text-secondary">payments</span> Kas Tunai
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-low text-secondary hover:bg-surface-container-high transition-colors font-medium" type="button">
                        <span className="material-symbols-outlined text-sm">image</span> Struk Fisik
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Lihat Rincian" type="button">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Edit Transaksi" type="button">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-error hover:bg-error-container" onClick={() => openDeleteModal('BKK-2026-09-031', 'Pembelian Stick Snare Vic Firth &amp; Valve Oil Bach', 'Rp 350.000')} title="Batalkan / Hapus" type="button">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 3: Pemasukan Donasi Alumni */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3.5 px-4 text-center">
                      <input className="rounded bg-surface-container-low text-secondary cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-md text-label-md font-semibold block text-on-surface">20 Sep 2026</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">11:05 WIB</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono font-semibold">BKM-2026-09-041</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold mb-1">
                        <span className="material-symbols-outlined text-xs">south_west</span> Masuk
                      </span>
                      <span className="block font-label-xs text-label-xs text-on-surface-variant font-medium">Donasi &amp; Hibah Alumni</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold block text-on-surface">Donasi Pengadaan Bell Lyra &amp; Chimes Baru</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">volunteer_activism</span> Donatur: Ikatan Alumni Gema Taruna Angkatan 15 • Donasi Tunai Langsung
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-label-md text-label-md font-bold text-secondary font-mono">+1.500.000</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-on-surface">
                      12.750.000
                    </td>
                    <td className="py-3.5 px-4"><span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-semibold"><span className="material-symbols-outlined text-xs text-secondary">payments</span> Kas Tunai Brankas</span></td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-low text-secondary hover:bg-surface-container-high transition-colors font-medium" type="button"><span className="material-symbols-outlined text-sm">receipt_long</span> Kuitansi Fisik</button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Lihat Rincian" type="button">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Edit Transaksi" type="button">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-error hover:bg-error-container" onClick={() => openDeleteModal('BKM-2026-09-041', 'Donasi Pengadaan Bell Lyra &amp; Chimes Baru', 'Rp 1.500.000')} title="Batalkan / Hapus" type="button">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 4: Pengeluaran Konsumsi */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors bg-surface-container-lowest">
                    <td className="py-3.5 px-4 text-center">
                      <input className="rounded bg-surface-container-low text-secondary cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-md text-label-md font-semibold block text-on-surface">18 Sep 2026</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">17:30 WIB</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono font-semibold">BKK-2026-09-029</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold mb-1">
                        <span className="material-symbols-outlined text-xs">north_east</span> Keluar
                      </span>
                      <span className="block font-label-xs text-label-xs text-on-surface-variant font-medium">Konsumsi &amp; Logistik</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold block text-on-surface">Air Mineral 5 Galon &amp; Snack Latihan Lapangan Terbuka</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">restaurant</span> Supplier: Depot Katering Barokah • Keperluan 45 Personel
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-label-md text-label-md font-bold text-error font-mono">-280.000</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-on-surface">
                      11.250.000
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-semibold">
                        <span className="material-symbols-outlined text-xs text-secondary">payments</span> Kas Tunai
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-low text-secondary hover:bg-surface-container-high transition-colors font-medium" type="button">
                        <span className="material-symbols-outlined text-sm">receipt</span> Nota Toko
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Lihat Rincian" type="button">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Edit Transaksi" type="button">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-error hover:bg-error-container" onClick={() => openDeleteModal('BKK-2026-09-029', 'Air Mineral 5 Galon &amp; Snack Latihan Lapangan Terbuka', 'Rp 280.000')} title="Batalkan / Hapus" type="button">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 5: Pemasukan Iuran Siti Guard */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3.5 px-4 text-center">
                      <input className="rounded bg-surface-container-low text-secondary cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-md text-label-md font-semibold block text-on-surface">15 Sep 2026</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">14:10 WIB</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono font-semibold">BKM-2026-09-039</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold mb-1">
                        <span className="material-symbols-outlined text-xs">south_west</span> Masuk
                      </span>
                      <span className="block font-label-xs text-label-xs text-on-surface-variant font-medium">Iuran Anggota (Guard)</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold block text-on-surface">Iuran Kas September 2026 - Siti Nurhaliza</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">person</span> Section: Color Guard Rifle (#MBGT-029)
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-label-md text-label-md font-bold text-secondary font-mono">+50.000</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-on-surface">
                      11.530.000
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-semibold">
                        <span className="material-symbols-outlined text-xs text-secondary">payments</span> Kas Tunai
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-low text-secondary hover:bg-surface-container-high transition-colors font-medium" type="button">
                        <span className="material-symbols-outlined text-sm">receipt_long</span> Kwitansi
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Lihat Rincian" type="button">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Edit Transaksi" type="button">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-error hover:bg-error-container" onClick={() => openDeleteModal('BKM-2026-09-039', 'Iuran Kas September 2026 - Siti Nurhaliza', 'Rp 50.000')} title="Batalkan / Hapus" type="button">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 6: Pengeluaran Kain Satin Guard */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors bg-surface-container-lowest">
                    <td className="py-3.5 px-4 text-center">
                      <input className="rounded bg-surface-container-low text-secondary cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-md text-label-md font-semibold block text-on-surface">12 Sep 2026</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">10:15 WIB</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono font-semibold">BKK-2026-09-026</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold mb-1">
                        <span className="material-symbols-outlined text-xs">north_east</span> Keluar
                      </span>
                      <span className="block font-label-xs text-label-xs text-on-surface-variant font-medium">Seragam &amp; Guard</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold block text-on-surface">Bahan Kain Satin &amp; Silk Bendera Guard Show 20 Pcs</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">storefront</span> Vendor: Pusat Tekstil Sinar Indah • Keperluan Kostum Display
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-label-md text-label-md font-bold text-error font-mono">-500.000</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-on-surface">
                      11.480.000
                    </td>
                    <td className="py-3.5 px-4"><span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-semibold"><span className="material-symbols-outlined text-xs text-secondary">payments</span> Kas Tunai Brankas</span></td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-low text-secondary hover:bg-surface-container-high transition-colors font-medium" type="button">
                        <span className="material-symbols-outlined text-sm">description</span> Faktur
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Lihat Rincian" type="button">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Edit Transaksi" type="button">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-error hover:bg-error-container" onClick={() => openDeleteModal('BKK-2026-09-026', 'Bahan Kain Satin &amp; Silk Bendera Guard Show', 'Rp 500.000')} title="Batalkan / Hapus" type="button">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 7: Pemasukan Sponsorship PT Gita Nada */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3.5 px-4 text-center">
                      <input className="rounded bg-surface-container-low text-secondary cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-md text-label-md font-semibold block text-on-surface">05 Sep 2026</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">16:30 WIB</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono font-semibold">BKM-2026-09-035</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold mb-1">
                        <span className="material-symbols-outlined text-xs">south_west</span> Masuk
                      </span>
                      <span className="block font-label-xs text-label-xs text-on-surface-variant font-medium">Sponsorship Mitra</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold block text-on-surface">Termin 1 Sponsorship Jersey Polo Latihan Marching Arts</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">apartment</span> Mitra: PT Gita Nada Pratama Musik Nusantara • SPK No. 04/GNP/2026
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-label-md text-label-md font-bold text-secondary font-mono">+2.000.000</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-on-surface">
                      11.980.000
                    </td>
                    <td className="py-3.5 px-4"><span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-semibold"><span className="material-symbols-outlined text-xs text-secondary">payments</span> Kas Tunai Brankas</span></td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-low text-secondary hover:bg-surface-container-high transition-colors font-medium" type="button">
                        <span className="material-symbols-outlined text-sm">receipt_long</span> Digital
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Lihat Rincian" type="button">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Edit Transaksi" type="button">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-error hover:bg-error-container" onClick={() => openDeleteModal('BKM-2026-09-035', 'Termin 1 Sponsorship Jersey Polo Latihan Marching Arts', 'Rp 2.000.000')} title="Batalkan / Hapus" type="button">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 8: Pengeluaran Transportasi Truk Box */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors bg-surface-container-lowest">
                    <td className="py-3.5 px-4 text-center">
                      <input className="rounded bg-surface-container-low text-secondary cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-md text-label-md font-semibold block text-on-surface">25 Agu 2026</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">08:30 WIB</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono font-semibold">BKK-2026-08-021</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold mb-1">
                        <span className="material-symbols-outlined text-xs">north_east</span> Keluar
                      </span>
                      <span className="block font-label-xs text-label-xs text-on-surface-variant font-medium">Transportasi &amp; Ekspedisi</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold block text-on-surface">Uang Muka Sewa 2 Unit Truk Box Ekspedisi Alat Pit &amp; Battery</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">local_shipping</span> Rekanan: PO Ekspedisi Lancar Jaya • Persiapan Konser Lapangan
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-label-md text-label-md font-bold text-error font-mono">-1.800.000</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-on-surface">
                      9.980.000
                    </td>
                    <td className="py-3.5 px-4"><span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface font-semibold"><span className="material-symbols-outlined text-xs text-secondary">payments</span> Kas Tunai Brankas</span></td>
                    <td className="py-3.5 px-4 text-center">
                      <button className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-low text-secondary hover:bg-surface-container-high transition-colors font-medium" type="button">
                        <span className="material-symbols-outlined text-sm">receipt_long</span> Kuitansi
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Lihat Rincian" type="button">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface" title="Edit Transaksi" type="button">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button className="w-7 h-7 rounded flex items-center justify-center text-error hover:bg-error-container" onClick={() => openDeleteModal('BKK-2026-08-021', 'Uang Muka Sewa 2 Unit Truk Box Ekspedisi', 'Rp 1.800.000')} title="Batalkan / Hapus" type="button">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination & Table Footer */}
            <div className="px-space-lg py-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                <span>Menampilkan 1-8 dari 79 transaksi</span>
                <span className="text-outline">•</span>
                <label className="flex items-center gap-1">
                  <span>Baris per halaman:</span>
                  <select className="bg-surface-container-lowest text-on-surface rounded px-2 py-0.5 font-label-xs text-label-xs focus:outline-none cursor-pointer" defaultValue="8">
                    <option value="8">8</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </label>
              </div>
              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container flex items-center justify-center disabled:opacity-40 transition-colors" disabled type="button">
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center shadow-xs" type="button">1</button>
                <button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center transition-colors" type="button">2</button>
                <button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center transition-colors" type="button">3</button>
                <span className="px-1 text-on-surface-variant font-label-xs">...</span>
                <button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-sm text-label-sm flex items-center justify-center transition-colors" type="button">10</button>
                <button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container flex items-center justify-center transition-colors" type="button">
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Contextual / Audit Ledger Footer */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-lg">security</span>
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm font-bold text-on-surface">Integritas Audit Pembukuan Kas</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Seluruh pencatatan terkunci dengan hash SHA-256 ledger internal Marching Band Gema Taruna untuk mencegah manipulasi data.</span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm text-on-surface-variant font-label-xs text-label-xs whitespace-nowrap">
              <span>Pengesahan: <strong>Bendahara Umum &amp; Pembina Satuan</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span>Revisi BKU Terakhir: <strong>Hari Ini, 14:20</strong></span>
            </div>
          </div>
        </div>

        {/* Interactive Confirmation Dialog / Modal (Hapus Transaksi) */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/60 backdrop-blur-xs" id="deleteModal">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xl max-w-lg w-full flex flex-col gap-space-md">
              {/* Modal Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">warning</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Konfirmasi Hapus Transaksi</h3>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Tindakan ini memerlukan otorisasi Bendahara</span>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center transition-colors" onClick={closeDeleteModal} type="button">
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs">
                <div className="flex justify-between items-center text-body-sm font-body-sm">
                  <span className="text-on-surface-variant">Nomor Bukti Kas:</span>
                  <span className="font-mono font-bold text-on-surface" id="modalRefCode">{deleteData.ref}</span>
                </div>
                <div className="flex justify-between items-center text-body-sm font-body-sm">
                  <span className="text-on-surface-variant">Nominal Transaksi:</span>
                  <span className="font-mono font-bold text-error" id="modalAmount">{deleteData.amount}</span>
                </div>
                <div className="flex justify-between items-start text-body-sm font-body-sm pt-1">
                  <span className="text-on-surface-variant">Keterangan:</span>
                  <span className="font-semibold text-on-surface text-right max-w-[240px]" id="modalDesc">{deleteData.desc}</span>
                </div>
              </div>
              
              {/* Warning Note */}
              <div className="flex items-start gap-2 p-space-sm rounded-lg bg-surface-container text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-secondary text-base mt-0.5">info</span>
                <span>Aksi ini akan otomatis mengembalikan saldo kas dan mencatat pembatalan mutasi pada log audit sistem. Bukti lampiran nota akan diarsipkan.</span>
              </div>
              
              {/* Reason Input */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface">Alasan Pembatalan / Penghapusan:</label>
                <input className="px-3 py-2 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none" placeholder="Misal: Salah input nominal / Nota ganda / Koreksi pos..." type="text" />
              </div>
              
              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-space-sm pt-space-xs">
                <button className="px-space-lg py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors font-semibold" onClick={closeDeleteModal} type="button">
                  Batalkan
                </button>
                <button className="px-space-lg py-2.5 rounded-lg bg-error text-on-error font-label-md text-label-md shadow-sm hover:opacity-90 transition-opacity font-bold flex items-center gap-1.5" onClick={confirmDeleteAction} type="button">
                  <span className="material-symbols-outlined text-lg">delete_forever</span>
                  <span>Ya, Hapus Transaksi</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
