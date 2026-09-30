'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState('panel-iuran')

  return (
    <div className="flex flex-col w-full">
      {/* Top Command Banner */}
      <div className="px-gutter py-space-md bg-surface-container-lowest shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider font-bold">
              ADMINISTRASI SISTEM • KONFIGURASI FISKAL MBGT
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>Status Sistem: Sinkron & SHA-256 Valid</span>
            </div>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Pengaturan Sistem & Hak Akses</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-3xl">
            Kelola parameter iuran bulanan, batas otorisasi belanja lapangan, integrasi WhatsApp Gateway, manajemen izin peran multi-level, serta pencadangan berkas ledger akuntansi MB Gema Taruna.
          </p>
        </div>
        <div className="flex items-center gap-space-sm self-start md:self-center">
          <button className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container transition-all font-label-md text-label-md" type="button">
            <span className="material-symbols-outlined text-lg">find_replace</span>
            <span>Reset Default</span>
          </button>
          <button className="flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-all shadow-sm font-label-md text-label-md" type="button">
            <span className="material-symbols-outlined text-lg text-secondary-container">check_circle</span>
            <span>Simpan Semua Perubahan</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="px-gutter py-space-lg flex flex-col gap-space-lg max-w-[1440px] w-full mx-auto">
        {/* Horizontal Tabs */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-1.5 shadow-sm overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max" id="settings-tab-bar">
            <button 
              className={cn(
                "flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-sm text-label-sm transition-all",
                activeTab === 'panel-iuran' ? "bg-primary-container text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              )} 
              onClick={() => setActiveTab('panel-iuran')}
            >
              <span className="material-symbols-outlined text-sm">payments</span>
              <span>1. Kebijakan Kas & Iuran</span>
            </button>
            <button 
              className={cn(
                "flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-sm text-label-sm transition-all",
                activeTab === 'panel-otorisasi' ? "bg-primary-container text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              )} 
              onClick={() => setActiveTab('panel-otorisasi')}
            >
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>2. Otorisasi Belanja Lapangan</span>
            </button>
            <button 
              className={cn(
                "flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-sm text-label-sm transition-all",
                activeTab === 'panel-rbac' ? "bg-primary-container text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              )} 
              onClick={() => setActiveTab('panel-rbac')}
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              <span>3. Hak Akses & Kewenangan Peran</span>
            </button>
            <button 
              className={cn(
                "flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-sm text-label-sm transition-all",
                activeTab === 'panel-wa' ? "bg-primary-container text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              )} 
              onClick={() => setActiveTab('panel-wa')}
            >
              <span className="material-symbols-outlined text-sm">send_and_archive</span>
              <span>4. Integrasi WhatsApp Gateway</span>
            </button>
            <button 
              className={cn(
                "flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-sm text-label-sm transition-all",
                activeTab === 'panel-backup' ? "bg-primary-container text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              )} 
              onClick={() => setActiveTab('panel-backup')}
            >
              <span className="material-symbols-outlined text-sm">security_update_good</span>
              <span>5. Backup & Keamanan Ledger</span>
            </button>
          </div>
        </div>

        {/* Quick Status Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Iuran Bulanan Aktif</span>
              <span className="font-headline-md text-headline-md text-on-surface truncate">Rp 50.000 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/ taruna</span></span>
              <span className="font-label-xs text-label-xs text-secondary-fixed-dim">Target 40 Personel Skuad</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-2xl">shield_locked</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Plafon Belanja Mandiri</span>
              <span className="font-headline-md text-headline-md text-on-surface truncate">&lt; Rp 500.000</span>
              <span className="font-label-xs text-label-xs text-on-surface-variant">Otorisasi Pembina di atas ambang</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-2xl">wifi_tethering</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">WhatsApp Gateway API</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-headline-md text-title-sm text-on-surface">Online 99.98%</span>
              </div>
              <span className="font-label-xs text-label-xs text-on-surface-variant">Fonnte Node v3.4.1</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-2xl">cloud_sync</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Cadangan Terakhir</span>
              <span className="font-headline-md text-title-sm text-on-surface">Hari Ini 04:30 WIB</span>
              <span className="font-label-xs text-label-xs text-on-surface-variant">Encrypted GDrive Sync OK</span>
            </div>
          </div>
        </div>

        {/* TAB 1: Kebijakan Kas & Iuran Skuad */}
        <div className={cn("flex flex-col gap-space-md", activeTab === 'panel-iuran' ? "block" : "hidden")} id="panel-iuran">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
            {/* Kolom Form Kebijakan Iuran */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="w-1.5 h-5 rounded-full bg-secondary-container"></span>
                  <h2 className="font-headline-md text-title-sm text-on-surface font-bold">Parameter Iuran Bulanan Skuad</h2>
                </div>
                <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant">Musim Kompetisi 2026/2027</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* Besaran Iuran */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center justify-between">
                    <span>Nominal Iuran Wajib Bulanan</span>
                    <span className="font-label-xs text-label-xs text-on-surface-variant">Per Anggota</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 font-label-md text-label-md text-on-surface-variant font-semibold">Rp</span>
                    <input className="w-full bg-surface-container-low pl-10 pr-4 py-2.5 rounded-lg text-on-surface font-headline-md text-title-sm font-bold focus:outline-none focus:bg-surface-container-lowest transition-all" type="text" defaultValue="50.000" />
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Dikalikan 40 personel aktif skuad GPMB. Estimasi arus kas rutin: <strong className="text-on-surface">Rp 2.000.000 / bulan</strong>.
                  </p>
                </div>
                {/* Jatuh Tempo Rutin */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Tanggal Jatuh Tempo Rutin</label>
                  <select className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg text-on-surface font-label-md text-label-md focus:outline-none focus:bg-surface-container-lowest transition-all" defaultValue="10">
                    <option value="5">Tanggal 05 setiap bulan</option>
                    <option value="10">Tanggal 10 setiap bulan (Standar Disiplin)</option>
                    <option value="15">Tanggal 15 setiap bulan</option>
                    <option value="20">Tanggal 20 setiap bulan</option>
                  </select>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Pesan pengingat otomatis pertama disiarkan H-3 (Tanggal 07) lewat WhatsApp Gateway.
                  </p>
                </div>
              </div>
              {/* Kebijakan Toleransi & Denda */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                <div className="flex flex-col gap-1">
                  <span className="font-label-md text-label-md text-on-surface font-bold">Kebijakan Denda Keterlambatan</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
                    Bebas denda finansial. Taruna yang terlambat dialihkan pada tugas pembinaan disiplin fisik/atribut lapangan di bawah koordinasi Komandan Korps (Field Commander).
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
              {/* Periode Aktif Skuad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Tahun Ajaran / Musim Aktif</label>
                  <input className="w-full bg-surface-container-high/60 px-4 py-2.5 rounded-lg text-on-surface font-label-md text-label-md cursor-not-allowed" readOnly type="text" value="2026 / 2027 (Road to GPMB Jakarta)" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Pagu Cadangan Kas Darurat Lapangan</label>
                  <input className="w-full bg-surface-container-low px-4 py-2.5 rounded-lg text-on-surface font-label-md text-label-md focus:outline-none" type="text" defaultValue="Rp 3.500.000" />
                </div>
              </div>
            </div>
            {/* Kolom Channel Penerimaan Kas & QRIS */}
            <div className="flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold">Manajemen Kas Fisik & Brankas Tunai</span>
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">Terverifikasi Pembina</span>
                </div>
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">Lokasi Penyimpanan</span>
                    <span className="font-headline-md text-title-sm text-on-surface font-bold">Brankas Kasir Unit MBGT</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-t border-surface-container pt-2">
                    <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">Penanggung Jawab</span>
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">Bendahara Umum (Fahmi Pratama)</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-t border-surface-container pt-2">
                    <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">Metode Penyetoran</span>
                    <span className="font-body-sm text-body-sm text-on-surface">100% Tunai Langsung di Lapangan saat Sesi Latihan Drill & Musik</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-1">
                  <span>Sistem Pembayaran:</span>
                  <span className="font-label-sm text-label-sm font-semibold text-secondary">100% Kas Tunai Lapangan</span>
                </div>
                <button className="w-full py-2.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container transition-all font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 mt-1">
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span>Unduh Tanda Terima Kas Tunai (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TAB 2: Otorisasi Belanja Lapangan */}
        <div className={cn("flex flex-col gap-space-md", activeTab === 'panel-otorisasi' ? "block" : "hidden")} id="panel-otorisasi">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="w-1.5 h-5 rounded-full bg-secondary-container"></span>
                <h2 className="font-headline-md text-title-sm text-on-surface font-bold">Kebijakan Batas Otorisasi Belanja & Audit Trail</h2>
              </div>
              <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed">Peraturan Kas No. 04/SK-MBGT/2026</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Plafon belanja dirancang agar operasional latihan harian tetap fleksibel tanpa mengorbankan akuntabilitas. Transaksi di atas ambang batas secara otomatis dibekukan sampai mendapatkan persetujuan resmi.
            </p>
            {/* Matrix Tiering Belanja */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
              {/* Tier 1: Mandiri */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-bold">TIER 1 • MANDIRI</span>
                    <span className="material-symbols-outlined text-secondary text-lg">bolt</span>
                  </div>
                  <h3 className="font-headline-md text-title-sm text-on-surface font-bold">Belanja Darurat Lapangan</h3>
                  <div className="text-on-surface font-headline-md text-headline-md font-bold">≤ Rp 500.000</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Dapat langsung dicairkan oleh <strong>Bendahara Lapangan</strong> tanpa konfirmasi awal (e.g. konsumsi latihan, air mineral galon, lakban pit, baterai metronom).
                  </p>
                </div>
                <div className="pt-space-xs">
                  <span className="font-label-xs text-label-xs text-on-surface font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-secondary">check</span> Wajib input nota & foto struk fisik H+1
                  </span>
                </div>
              </div>
              {/* Tier 2: Persetujuan Pembina */}
              <div className="p-space-md rounded-xl bg-surface-container-high/60 flex flex-col justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">TIER 2 • APPROVAL PEMBINA</span>
                    <span className="material-symbols-outlined text-secondary text-lg">admin_panel_settings</span>
                  </div>
                  <h3 className="font-headline-md text-title-sm text-on-surface font-bold">Belanja Operasional Rutin</h3>
                  <div className="text-on-surface font-headline-md text-headline-md font-bold">Rp 500.001 - Rp 2.000.000</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Otomatis mengirim alert otorisasi WhatsApp 1-klik ke ponsel <strong>Kak Drs. Sutrisno, M.Pd</strong>. Dana cair setelah tombol setuju ditekan.
                  </p>
                </div>
                <div className="pt-space-xs">
                  <span className="font-label-xs text-label-xs text-on-surface font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-secondary">timer</span> Batas respons otomatis: 6 jam latihan
                  </span>
                </div>
              </div>
              {/* Tier 3: Pengadaan Besar & Logistik */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-bold">TIER 3 • PLENO DEWAN</span>
                    <span className="material-symbols-outlined text-on-surface text-lg">verified</span>
                  </div>
                  <h3 className="font-headline-md text-title-sm text-on-surface font-bold">Pengadaan Alat & Ekspedisi</h3>
                  <div className="text-on-surface font-headline-md text-headline-md font-bold">&gt; Rp 2.000.000</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Wajib pengajuan form LPJ awal (TOR Belanja), 3 pembanding invoice supplier instrumen, dan tanda tangan ganda Pembina + Kesiswaan Sekolah.
                  </p>
                </div>
                <div className="pt-space-xs">
                  <span className="font-label-xs text-label-xs text-on-surface font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-secondary">approval</span> Pembayaran wajib via transfer rekening
                  </span>
                </div>
              </div>
            </div>
            {/* Strict Audit Rules Toggles */}
            <div className="flex flex-col gap-space-sm pt-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface font-bold uppercase tracking-wider">Peraturan Integritas Bukti Transaksi</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">Wajib Lampirkan Foto Nota Fisik / Struk Asli</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Audit trail mutasi tidak dapat ditutup tanpa file JPG/PNG nota terlampir</span>
                  </div>
                  <input defaultChecked className="w-5 h-5 accent-primary cursor-pointer" type="checkbox" />
                </div>
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">Lock Buku Kas Bulanan Otomatis</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Tutup buku kas tanggal terakhir jam 23:59 WIB, cegah revisi transaksi lampau</span>
                  </div>
                  <input defaultChecked className="w-5 h-5 accent-primary cursor-pointer" type="checkbox" />
                </div>
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">Geo-tagging Lokasi Nota Pembelian</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Simpan metadata koordinat GPS saat panitia mengunggah nota via ponsel</span>
                  </div>
                  <input className="w-5 h-5 accent-primary cursor-pointer" type="checkbox" />
                </div>
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">Notifikasi SMS Cadangan (Fallback SMS)</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Kirim SMS jika server WhatsApp Gateway mengalami kendala koneksi lebih 10 menit</span>
                  </div>
                  <input defaultChecked className="w-5 h-5 accent-primary cursor-pointer" type="checkbox" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TAB 3: Hak Akses & Kewenangan Peran (RBAC) */}
        <div className={cn("flex flex-col gap-space-md", activeTab === 'panel-rbac' ? "block" : "hidden")} id="panel-rbac">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="w-1.5 h-5 rounded-full bg-secondary-container"></span>
                <div>
                  <h2 className="font-headline-md text-title-sm text-on-surface font-bold">Matriks Hak Akses & Manajemen Peran (RBAC)</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Pengaturan izin komprehensif bagi Bendahara, Pembina, Koordinator Baris Seksi, dan Taruna Skuad.</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-all font-label-sm text-label-sm shrink-0">
                <span className="material-symbols-outlined text-sm">person_add</span>
                <span>+ Tambah Pengelola Baru</span>
              </button>
            </div>
            {/* Tabel Peran & Izin */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="py-3 px-4 font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold rounded-l-lg">Tingkat Peran & Pejabat</th>
                    <th className="py-3 px-4 font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold text-center">Buku Kas & Entri</th>
                    <th className="py-3 px-4 font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold text-center">Otorisasi Belanja</th>
                    <th className="py-3 px-4 font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold text-center">Broadcast WA</th>
                    <th className="py-3 px-4 font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold text-center">Ekspor LPJ</th>
                    <th className="py-3 px-4 font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold text-center rounded-r-lg">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {/* Role 1 */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shrink-0">
                          FP
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-md text-label-md font-bold text-on-surface">Kak Fahmi Pratama</span>
                            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">Super Admin</span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Bendahara Umum MBGT • ID: MBGT-BND-01</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-label-xs text-label-xs px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">FULL ACCESS</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-high text-on-surface font-bold">≤ Rp 500rb</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant">
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Role 2 */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs shrink-0">
                          DS
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-md text-label-md font-bold text-on-surface">Drs. Sutrisno, M.Pd</span>
                            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">Pembina Utama</span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Pengawas Operasional & Keuangan Korps</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-low text-on-surface-variant font-semibold">Read Only</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-label-xs text-label-xs px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">ALL TIERS (&gt;500rb)</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-base">remove</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant">
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Role 3 */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-xs shrink-0">
                          SEC
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-md text-label-md font-bold text-on-surface">Koordinator Seksi (4 Personel)</span>
                            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-semibold">Section Head</span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Brass, Battery Percussion, Pit & Color Guard</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-low text-on-surface-variant font-semibold">Ajukan Usulan Belanja</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-base">close</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-high text-on-surface font-semibold">Seksi Internal</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-base">remove</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant">
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Role 4 */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-9 h-9 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center font-bold text-xs shrink-0">
                          40
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-md text-label-md font-bold text-on-surface">Taruna Skuad Marching Band</span>
                            <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-semibold">Member</span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">40 Anggota Aktif Musim 2026/2027</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-low text-on-surface-variant font-semibold">Cek Kartu Pribadi</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-base">close</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-base">close</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-label-xs text-label-xs px-2 py-1 rounded bg-surface-container-high text-on-surface font-semibold">Unduh Kuitansi</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant">
                        <span className="material-symbols-outlined text-base">more_vert</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* TAB 4: Integrasi WhatsApp Gateway & Templates */}
        <div className={cn("flex flex-col gap-space-md", activeTab === 'panel-wa' ? "block" : "hidden")} id="panel-wa">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
            {/* Left 2 Cols: Template Editors */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="w-1.5 h-5 rounded-full bg-secondary-container"></span>
                  <h2 className="font-headline-md text-title-sm text-on-surface font-bold">Template Pesan Otomatis WhatsApp</h2>
                </div>
                <span className="font-label-xs text-label-xs text-on-surface-variant">Variabel Dinamis: {'{NAMA}, {BULAN}, {NOMINAL}, {KODE}'}</span>
              </div>
              {/* Selector Template */}
              <div className="flex items-center gap-2 border-b border-surface-container pb-2 overflow-x-auto">
                <button className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold shrink-0">
                  1. Tagihan Iuran Bulanan
                </button>
                <button className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low font-label-sm text-label-sm shrink-0">
                  2. Kuitansi Lunas
                </button>
                <button className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low font-label-sm text-label-sm shrink-0">
                  3. Alert Otorisasi Belanja
                </button>
                <button className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low font-label-sm text-label-sm shrink-0">
                  4. Laporan Mingguan Kas
                </button>
              </div>
              {/* Active Template Editor Form */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Teks Draft Pesan WhatsApp Gateway</label>
                  <button className="font-label-xs text-label-xs text-secondary hover:underline flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-xs">refresh</span> Muat Ulang Template Standar
                  </button>
                </div>
                <textarea className="w-full bg-surface-container-low p-space-md rounded-xl text-on-surface font-mono text-body-sm focus:outline-none focus:bg-surface-container-lowest transition-all" rows={7} defaultValue={`Halo {NAMA_TARUNA},

Semangat bertugas dalam formasi skuad Marching Band Gema Taruna! 🎺🥁

Pemberitahuan bahwa iuran kas bulanan periode *{BULAN_PERIODE}* sebesar *Rp {NOMINAL}* telah terbit.
Jatuh Tempo: *{TANGGAL_JATUH_TEMPO}*.

💳 Rekening Bank Mandiri: 137-00-982144-8 a.n Marching Band Gema Taruna
📱 Scan QRIS Dinamis melalui aplikasi perbankan/e-wallet Anda.

Konfirmasi pembayaran otomatis dapat dicek langsung pada portal kartu kas taruna: {LINK_KARTU_IURAN}

Salam Hormat,
*Bendahara Umum MB Gema Taruna*`}></textarea>
              </div>
              <div className="flex items-center justify-between pt-space-xs">
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-secondary">info</span> Pesan akan disiarkan pada H-3 sebelum tanggal jatuh tempo pukul 09:00 WIB.
                </span>
                <button className="flex items-center gap-1 px-space-md py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container transition-all font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-sm">send</span>
                  <span>Kirim Sampel Pesan Uji Coba</span>
                </button>
              </div>
            </div>
            {/* Right 1 Col: Gateway Connection Info */}
            <div className="flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold">Koneksi Server WhatsApp</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                </div>
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">Mesin API Gateway</span>
                  <span className="font-headline-md text-title-sm text-on-surface font-bold">Fonnte Multi-Device Enterprise</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Nomor Terhubung: <strong>+62 812-4455-8910</strong> (Official Kas MBGT)</span>
                </div>
                <div className="flex flex-col gap-1 pt-1 text-body-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant">Sisa Kuota Kuartal:</span>
                    <span className="font-label-sm text-label-sm font-bold text-on-surface">4.820 / 5.000 Pesan</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <button className="w-full py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container transition-all font-label-sm text-label-sm font-semibold">
                    Scan QR Pair Baru
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-surface-container-high text-error hover:bg-error-container transition-all font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-sm">link_off</span>
                  </button>
                </div>
              </div>
              {/* Log Pengiriman Terakhir */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs">
                <span className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold">Aktivitas Terakhir Bot WA</span>
                <div className="flex flex-col gap-2 pt-1">
                  <div className="p-2 rounded bg-surface-container-low flex items-center justify-between text-body-sm">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-sm">check</span>
                      <span className="text-on-surface">Kuitansi #KAS-8812</span>
                    </div>
                    <span className="text-on-surface-variant text-label-xs">10m lalu</span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-low flex items-center justify-between text-body-sm">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-sm">check</span>
                      <span className="text-on-surface">Approval Pembina (#OUT-104)</span>
                    </div>
                    <span className="text-on-surface-variant text-label-xs">42m lalu</span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-low flex items-center justify-between text-body-sm">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-sm">check</span>
                      <span className="text-on-surface">Broadcast Iuran Batch #09</span>
                    </div>
                    <span className="text-on-surface-variant text-label-xs">2j lalu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TAB 5: Backup & Keamanan Ledger */}
        <div className={cn("flex flex-col gap-space-md", activeTab === 'panel-backup' ? "block" : "hidden")} id="panel-backup">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="w-1.5 h-5 rounded-full bg-secondary-container"></span>
                <h2 className="font-headline-md text-title-sm text-on-surface font-bold">Keamanan Data, Integritas SHA-256 & Arsip Ledger Kas</h2>
              </div>
              <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-semibold">Ledger Hash: 0x9f1a...c82d</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {/* Card Ekspor SQL & Data */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-xl">database</span>
                    <span className="font-label-md text-label-md font-bold">Cadangan SQL / JSON</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Seluruh riwayat penerimaan iuran, mutasi belanja lapangan, saldo seksi, dan profil 40 anggota skuad dalam satu bundel data terenkripsi.
                  </p>
                </div>
                <button className="w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface transition-all font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span>Unduh Database Kas (.JSON)</span>
                </button>
              </div>
              {/* Card Arsip Kuitansi & Nota */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-xl">folder_zip</span>
                    <span className="font-label-md text-label-md font-bold">Bundel Nota & Struk Lapangan</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Koleksi foto berkas nota fisik pembelanjaan suku cadang instrumen, bensin truk kontainer, serta nota seragam format ZIP per bulan.
                  </p>
                </div>
                <button className="w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface transition-all font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">file_download</span>
                  <span>Unduh Arsip Struk (.ZIP 48 MB)</span>
                </button>
              </div>
              {/* Card Audit Trail 120 Hari */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-xl">manage_history</span>
                    <span className="font-label-md text-label-md font-bold">Audit Trail & System Log</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Catatan mutlak siapa yang mengubah status iuran, waktu approval belanja oleh pembina, dan log IP jaringan selama 120 hari terakhir.
                  </p>
                </div>
                <button className="w-full py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary transition-all font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-secondary-container">visibility</span>
                  <span>Buka Log Aktivitas Sistem</span>
                </button>
              </div>
            </div>
            {/* Hash Verification Box */}
            <div className="p-space-md rounded-xl bg-surface-container-high/40 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-xl">fingerprint</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">Integritas Kriptografi Ledger Kas: Valid & Tanpa Anomali</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">SHA-256 Root Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
                </div>
              </div>
              <button className="px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all font-label-sm text-label-sm font-semibold shrink-0">
                Jalankan Verifikasi Ulang
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Save Footer Bar */}
        <div className="p-space-md bg-surface-container-lowest rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
            <span>Perubahan konfigurasi tersimpan otomatis ke draf lokal bendahara.</span>
          </div>
          <div className="flex items-center gap-space-sm">
            <button className="px-space-md py-2 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-all" type="button">
              Batalkan Perubahan
            </button>
            <button className="px-space-lg py-2 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-all flex items-center gap-1.5" type="button">
              <span className="material-symbols-outlined text-sm text-secondary-container">save</span>
              <span>Terapkan Konfigurasi Sistem</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
