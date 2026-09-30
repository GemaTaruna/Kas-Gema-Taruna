'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function LaporanKeuanganPage() {
  const [showModal, setShowModal] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const triggerToast = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  return (
    <div className="flex flex-col w-full relative">
      {/* Dynamic Notification Toast Container */}
      <div 
        className={cn(
          "fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-space-sm px-space-md py-space-sm bg-primary-container text-on-primary rounded-xl shadow-xl",
          showToast ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        )}
      >
        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
        <span className="font-label-md text-label-md">{toastMessage}</span>
      </div>

      <div className="p-margin flex flex-col gap-space-xl max-w-[1440px] mx-auto w-full">
        {/* Top Context & Header Action Toolbar */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-label-xs text-label-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">shield_with_heart</span>
                Modul Akuntabilitas
              </span>
              <span className="text-on-surface-variant font-label-xs">•</span>
              <span className="font-label-xs text-label-xs uppercase tracking-wider text-secondary font-semibold">
                Laporan Pertanggungjawaban (LPJ) Kas MBGT
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Laporan Keuangan & Akuntabilitas
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Rekapitulasi arus kas masuk, arus kas keluar, realisasi anggaran per divisi, serta kepatuhan iuran anggota untuk transparansi Pengurus, Pembina, dan Pihak Sekolah.
            </p>
          </div>
          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm bg-surface-container-lowest p-1.5 rounded-xl shadow-sm">
            {/* Period Select */}
            <div className="relative">
              <select 
                className="appearance-none font-label-md text-label-md bg-surface-container-low text-on-surface font-semibold py-2 pl-3.5 pr-8 rounded-lg cursor-pointer focus:outline-none" 
                defaultValue="s1"
                onChange={(e) => {
                  const text = e.target.options[e.target.selectedIndex].text;
                  triggerToast('Data laporan disaring berdasarkan ' + text);
                }}
              >
                <option value="y2026">Tahun Fiskal 2026</option>
                <option value="s1">Semester Ganjil 2026/2027</option>
                <option value="m09">Bulan September 2026</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-base">expand_more</span>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface transition-colors font-label-sm text-label-sm" onClick={() => triggerToast('Menyiapkan berkas Excel (Rekap_Kas_MBGT_2026.xlsx)...')}>
              <span className="material-symbols-outlined text-base text-secondary">table_view</span>
              <span>Ekspor Excel</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface transition-colors font-label-sm text-label-sm" onClick={() => setShowModal(true)}>
              <span className="material-symbols-outlined text-base text-error">picture_as_pdf</span>
              <span>Download PDF</span>
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary-container text-on-primary hover:opacity-90 transition-opacity font-label-sm text-label-sm shadow-sm" onClick={() => window.print()}>
              <span className="material-symbols-outlined text-base">print</span>
              <span>Cetak Dokumen</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter">
          {/* Card 1: Saldo Kas Bersih */}
          <div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Saldo Kas Bersih</span>
                <span className="font-body-sm text-body-sm text-secondary font-medium">Likuiditas Lancar</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              </div>
            </div>
            <div className="mt-space-md flex flex-col gap-1">
              <span className="font-metric-display text-metric-display text-on-surface tracking-tight">Rp 12.450.000</span>
              <div className="flex flex-col text-on-surface-variant font-body-sm text-body-sm pt-1">
                <div className="flex justify-between items-center">
                  <span>Kas Bank (BSI Giro):</span>
                  <span className="font-semibold text-on-surface">Rp 9.200.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Kas Tunai Bendahara:</span>
                  <span className="font-semibold text-on-surface">Rp 3.250.000</span>
                </div>
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between">
              <span className="font-label-xs text-label-xs uppercase text-on-surface-variant font-semibold">Rasio Solvabilitas</span>
              <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-bold">100% SEHAT</span>
            </div>
          </div>
          {/* Card 2: Total Penerimaan */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Penerimaan (Inflow)</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Jan - Sep 2026</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-xl">trending_up</span>
              </div>
            </div>
            <div className="mt-space-md flex flex-col gap-1">
              <span className="font-metric-display text-metric-display text-on-surface tracking-tight">Rp 25.000.000</span>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-secondary h-full rounded-full transition-all duration-700" style={{ width: '62.5%' }}></div>
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant">
              <span className="font-body-sm text-body-sm">Pagu: Rp 40.000.000</span>
              <span className="font-label-xs text-label-xs font-bold text-secondary">62.5% Capaian</span>
            </div>
          </div>
          {/* Card 3: Total Pengeluaran */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Belanja (Outflow)</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Realisasi Operasional</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-xl">payments</span>
              </div>
            </div>
            <div className="mt-space-md flex flex-col gap-1">
              <span className="font-metric-display text-metric-display text-on-surface tracking-tight">Rp 12.550.000</span>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-error h-full rounded-full transition-all duration-700" style={{ width: '50.2%' }}></div>
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant">
              <span className="font-body-sm text-body-sm">Plafon: Rp 25.000.000</span>
              <span className="font-label-xs text-label-xs font-bold text-on-surface">Sisa Rp 12.450.000</span>
            </div>
          </div>
          {/* Card 4: Efisiensi Anggaran */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Efisiensi Anggaran</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Net Reserve Ratio</span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-xl">pie_chart</span>
              </div>
            </div>
            <div className="mt-space-md flex flex-col gap-1">
              <span className="font-metric-display text-metric-display text-on-surface tracking-tight">+Rp 12.450.000</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant pt-1">Surplus Operasional Bersih</span>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center gap-1.5">
              <span className="inline-flex w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-xs text-label-xs text-secondary font-bold uppercase tracking-wider">Aman Menjelang GPMB 2026</span>
            </div>
          </div>
        </div>

        {/* Section 1: Visual Arus Kas Bulanan & Breakdown Belanja Terbesar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Arus Kas Chart Visual */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-on-surface">Tren Komparasi Kas Jan – Sep 2026</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Komparasi laju Penerimaan (Inflow) vs Belanja Operasional (Outflow)</span>
              </div>
              {/* Chart Legend */}
              <div className="flex items-center gap-space-md text-label-sm font-label-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-secondary"></span>
                  <span className="text-on-surface">Penerimaan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-surface-container-high"></span>
                  <span className="text-on-surface-variant">Pengeluaran</span>
                </div>
              </div>
            </div>
            {/* Inline SVG Visualization Bar Graph */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[620px] h-64 flex flex-col justify-between pt-2 pb-1">
                {/* Grid Lines & Bars */}
                <div className="relative h-48 w-full flex items-end justify-between px-2">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                    <div className="w-full h-px bg-surface-container"></div>
                    <div className="w-full h-px bg-surface-container"></div>
                    <div className="w-full h-px bg-surface-container"></div>
                    <div className="w-full h-px bg-surface-container"></div>
                  </div>
                  {/* Jan */}
                  <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer w-12">
                    <div className="flex items-end gap-1 h-44">
                      <div className="w-4 bg-secondary rounded-t transition-all group-hover:opacity-80" style={{ height: '36%' }} title="Inflow: Rp 2.100.000"></div>
                      <div className="w-4 bg-surface-container-high rounded-t transition-all group-hover:bg-primary-container" style={{ height: '24%' }} title="Outflow: Rp 1.400.000"></div>
                    </div>
                    <span className="font-label-xs text-label-xs text-on-surface-variant group-hover:text-on-surface font-semibold">Jan</span>
                  </div>
                  {/* Feb */}
                  <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer w-12">
                    <div className="flex items-end gap-1 h-44">
                      <div className="w-4 bg-secondary rounded-t transition-all group-hover:opacity-80" style={{ height: '31%' }} title="Inflow: Rp 1.800.000"></div>
                      <div className="w-4 bg-surface-container-high rounded-t transition-all group-hover:bg-primary-container" style={{ height: '20%' }} title="Outflow: Rp 1.200.000"></div>
                    </div>
                    <span className="font-label-xs text-label-xs text-on-surface-variant group-hover:text-on-surface font-semibold">Feb</span>
                  </div>
                  {/* Mar */}
                  <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer w-12">
                    <div className="flex items-end gap-1 h-44">
                      <div className="w-4 bg-secondary rounded-t transition-all group-hover:opacity-80" style={{ height: '41%' }} title="Inflow: Rp 2.400.000"></div>
                      <div className="w-4 bg-surface-container-high rounded-t transition-all group-hover:bg-primary-container" style={{ height: '27%' }} title="Outflow: Rp 1.600.000"></div>
                    </div>
                    <span className="font-label-xs text-label-xs text-on-surface-variant group-hover:text-on-surface font-semibold">Mar</span>
                  </div>
                  {/* Apr */}
                  <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer w-12">
                    <div className="flex items-end gap-1 h-44">
                      <div className="w-4 bg-secondary rounded-t transition-all group-hover:opacity-80" style={{ height: '32%' }} title="Inflow: Rp 1.900.000"></div>
                      <div className="w-4 bg-surface-container-high rounded-t transition-all group-hover:bg-primary-container" style={{ height: '22%' }} title="Outflow: Rp 1.300.000"></div>
                    </div>
                    <span className="font-label-xs text-label-xs text-on-surface-variant group-hover:text-on-surface font-semibold">Apr</span>
                  </div>
                  {/* Mei */}
                  <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer w-12">
                    <div className="flex items-end gap-1 h-44">
                      <div className="w-4 bg-secondary rounded-t transition-all group-hover:opacity-80" style={{ height: '37%' }} title="Inflow: Rp 2.200.000"></div>
                      <div className="w-4 bg-surface-container-high rounded-t transition-all group-hover:bg-primary-container" style={{ height: '25%' }} title="Outflow: Rp 1.500.000"></div>
                    </div>
                    <span className="font-label-xs text-label-xs text-on-surface-variant group-hover:text-on-surface font-semibold">Mei</span>
                  </div>
                  {/* Jun */}
                  <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer w-12">
                    <div className="flex items-end gap-1 h-44">
                      <div className="w-4 bg-secondary rounded-t transition-all group-hover:opacity-80" style={{ height: '53%' }} title="Inflow: Rp 3.100.000"></div>
                      <div className="w-4 bg-surface-container-high rounded-t transition-all group-hover:bg-primary-container" style={{ height: '31%' }} title="Outflow: Rp 1.800.000"></div>
                    </div>
                    <span className="font-label-xs text-label-xs text-on-surface-variant group-hover:text-on-surface font-semibold">Jun</span>
                  </div>
                  {/* Jul */}
                  <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer w-12">
                    <div className="flex items-end gap-1 h-44">
                      <div className="w-4 bg-secondary rounded-t transition-all group-hover:opacity-80" style={{ height: '43%' }} title="Inflow: Rp 2.500.000"></div>
                      <div className="w-4 bg-surface-container-high rounded-t transition-all group-hover:bg-primary-container" style={{ height: '29%' }} title="Outflow: Rp 1.700.000"></div>
                    </div>
                    <span className="font-label-xs text-label-xs text-on-surface-variant group-hover:text-on-surface font-semibold">Jul</span>
                  </div>
                  {/* Agu (Sponsorship Peak) */}
                  <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer w-12 relative">
                    <span className="absolute -top-7 text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed uppercase tracking-tight">Sponsor</span>
                    <div className="flex items-end gap-1 h-44">
                      <div className="w-4 bg-secondary rounded-t transition-all group-hover:opacity-80" style={{ height: '98%' }} title="Inflow: Rp 5.800.000 (Puncak Sponsor)"></div>
                      <div className="w-4 bg-surface-container-high rounded-t transition-all group-hover:bg-primary-container" style={{ height: '35%' }} title="Outflow: Rp 2.050.000"></div>
                    </div>
                    <span className="font-label-xs text-label-xs text-secondary font-bold">Agu</span>
                  </div>
                  {/* Sep */}
                  <div className="flex flex-col items-center gap-2 z-10 group cursor-pointer w-12">
                    <div className="flex items-end gap-1 h-44">
                      <div className="w-4 bg-secondary rounded-t transition-all group-hover:opacity-80" style={{ height: '56%' }} title="Inflow: Rp 3.250.000"></div>
                      <div className="w-4 bg-surface-container-high rounded-t transition-all group-hover:bg-primary-container" style={{ height: '19%' }} title="Outflow: Rp 1.130.000"></div>
                    </div>
                    <span className="font-label-xs text-label-xs text-on-surface font-bold">Sep</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-space-md flex flex-wrap items-center justify-between gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <span>*Data diperbarui secara otomatis per tanggal 30 September 2026 pukul 23:59 WIB.</span>
              <a className="text-secondary font-semibold hover:underline inline-flex items-center gap-1 font-label-sm text-label-sm" href="#">
                Lihat Jurnal Transaksi Detail
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
          
          {/* Breakdown Belanja Terbesar */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-headline-md text-headline-md text-on-surface">Struktur Belanja</span>
                <span className="font-label-xs text-label-xs px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant uppercase font-bold">Realisasi</span>
              </div>
              <div className="flex flex-col gap-space-md">
                {/* Item 1 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="text-on-surface font-semibold">Perawatan & Pengadaan Alat</span>
                    <span className="font-bold text-on-surface">41.4%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '41.4%' }}></div>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">Rp 5.200.000 (Mouthpiece, Snare Heads, Valve Oil)</span>
                </div>
                {/* Item 2 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="text-on-surface font-semibold">Transportasi & Truk Logistik</span>
                    <span className="font-bold text-on-surface">26.3%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full rounded-full" style={{ width: '26.3%' }}></div>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">Rp 3.300.000 (Sewa Pick-up Uji Coba Lapangan)</span>
                </div>
                {/* Item 3 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="text-on-surface font-semibold">Properti & Kostum Guard</span>
                    <span className="font-bold text-on-surface">15.9%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-surface-tint h-full rounded-full" style={{ width: '15.9%' }}></div>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">Rp 2.000.000 (Kain Bendera Sablon + Sarung Tangan)</span>
                </div>
                {/* Item 4 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="text-on-surface font-semibold">Konsumsi Latihan Gabungan</span>
                    <span className="font-bold text-on-surface">11.2%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary-fixed-dim h-full rounded-full" style={{ width: '11.2%' }}></div>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">Rp 1.400.000 (Air Mineral Galon + Snack TC)</span>
                </div>
                {/* Item 5 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="text-on-surface font-semibold">Registrasi Event & Lomba</span>
                    <span className="font-bold text-on-surface">5.2%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-surface-container-high h-full rounded-full" style={{ width: '5.2%' }}></div>
                  </div>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">Rp 650.000 (DP Pendaftaran Divisi Street Parade)</span>
                </div>
              </div>
            </div>
            <div className="mt-space-lg p-space-md rounded-xl bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-2xl">verified_user</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm font-bold text-on-surface">Kepatuhan Anggaran</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Sesuai RKAM Musim 2026</span>
                </div>
              </div>
              <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">OPTIMAL</span>
            </div>
          </div>
        </div>

        {/* Section 2: Disiplin Kepatuhan Iuran Kas Anggota per Seksi */}
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-headline-md text-headline-md text-on-surface">Kepatuhan Iuran Kas Anggota</h2>
                <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed uppercase font-bold">Bulan September 2026</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Target Iuran: <span className="font-semibold text-on-surface">Rp 2.000.000</span> • Terkumpul: <span className="font-semibold text-secondary">Rp 1.600.000 (80%)</span> • Tunggakan: <span className="font-semibold text-error">Rp 400.000</span>
              </p>
            </div>
            <div className="flex items-center gap-space-xs">
              <button 
                className="px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm flex items-center gap-2 shadow-sm" 
                onClick={() => triggerToast('Semua perwakilan seksi telah dikirimi pengingat WhatsApp!')}
              >
                <span className="material-symbols-outlined text-base text-secondary">send</span>
                <span>Broadcast Rekap ke Seksi</span>
              </button>
            </div>
          </div>
          
          {/* Table Section */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant">
                    <th className="py-3.5 px-space-md">Divisi / Seksi MBGT</th>
                    <th className="py-3.5 px-space-md text-center">Skuad</th>
                    <th className="py-3.5 px-space-md text-right">Target Iuran</th>
                    <th className="py-3.5 px-space-md text-right">Terkumpul</th>
                    <th className="py-3.5 px-space-md text-center">Persentase</th>
                    <th className="py-3.5 px-space-md text-center">Status Disiplin</th>
                    <th className="py-3.5 px-space-md text-right">Aksi Bendahara</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {/* Row 1: Brass */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors font-body-md text-body-md">
                    <td className="py-4 px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-3 h-3 rounded-full bg-secondary"></span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">Brass Section</span>
                          <span className="text-on-surface-variant font-body-sm text-body-sm">Trumpet, Mellophone, Euphonium, Tuba</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-space-md text-center font-medium">14 Personil</td>
                    <td className="py-4 px-space-md text-right tabular-nums">Rp 700.000</td>
                    <td className="py-4 px-space-md text-right tabular-nums font-semibold text-on-surface">Rp 550.000</td>
                    <td className="py-4 px-space-md text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-on-surface">78%</span>
                        <span className="text-error font-body-sm text-body-sm">(3 tunggak)</span>
                      </div>
                    </td>
                    <td className="py-4 px-space-md text-center">
                      <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-semibold uppercase">
                        Perlu Perhatian
                      </span>
                    </td>
                    <td className="py-4 px-space-md text-right">
                      <button 
                        className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm inline-flex items-center gap-1 transition-colors" 
                        onClick={() => triggerToast('Notifikasi rekap tunggakan terkirim ke Captain Brass Section')}
                      >
                        <span className="material-symbols-outlined text-sm">notifications_active</span>
                        <span>Kirim Notif</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 2: Percussion */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors font-body-md text-body-md">
                    <td className="py-4 px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">Battery Percussion</span>
                          <span className="text-on-surface-variant font-body-sm text-body-sm">Snare Line, Quint Tom, Bass Drum, Cymbal</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-space-md text-center font-medium">10 Personil</td>
                    <td className="py-4 px-space-md text-right tabular-nums">Rp 500.000</td>
                    <td className="py-4 px-space-md text-right tabular-nums font-semibold text-on-surface">Rp 450.000</td>
                    <td className="py-4 px-space-md text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-on-surface">90%</span>
                        <span className="text-on-surface-variant font-body-sm text-body-sm">(1 tunggak)</span>
                      </div>
                    </td>
                    <td className="py-4 px-space-md text-center">
                      <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-semibold uppercase">
                        Sangat Baik
                      </span>
                    </td>
                    <td className="py-4 px-space-md text-right">
                      <button 
                        className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm inline-flex items-center gap-1 transition-colors" 
                        onClick={() => triggerToast('Notifikasi rekap tunggakan terkirim ke Captain Battery Percussion')}
                      >
                        <span className="material-symbols-outlined text-sm">notifications_active</span>
                        <span>Kirim Notif</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 3: Color Guard */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors font-body-md text-body-md">
                    <td className="py-4 px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-3 h-3 rounded-full bg-tertiary-container"></span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">Color Guard (CG)</span>
                          <span className="text-on-surface-variant font-body-sm text-body-sm">Flag Corps, Rifle, Sabre & Dance Line</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-space-md text-center font-medium">8 Personil</td>
                    <td className="py-4 px-space-md text-right tabular-nums">Rp 400.000</td>
                    <td className="py-4 px-space-md text-right tabular-nums font-semibold text-on-surface">Rp 300.000</td>
                    <td className="py-4 px-space-md text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-on-surface">75%</span>
                        <span className="text-error font-body-sm text-body-sm">(2 tunggak)</span>
                      </div>
                    </td>
                    <td className="py-4 px-space-md text-center">
                      <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-semibold uppercase">
                        Terkendali
                      </span>
                    </td>
                    <td className="py-4 px-space-md text-right">
                      <button 
                        className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm inline-flex items-center gap-1 transition-colors" 
                        onClick={() => triggerToast('Notifikasi rekap tunggakan terkirim ke Captain Color Guard')}
                      >
                        <span className="material-symbols-outlined text-sm">notifications_active</span>
                        <span>Kirim Notif</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 4: Pit Instrument */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors font-body-md text-body-md bg-secondary-fixed/10">
                    <td className="py-4 px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-3 h-3 rounded-full bg-secondary"></span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">Pit Instrument (Front Ensemble)</span>
                          <span className="text-on-surface-variant font-body-sm text-body-sm">Marimba, Vibraphone, Xylophone, Timpani</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-space-md text-center font-medium">5 Personil</td>
                    <td className="py-4 px-space-md text-right tabular-nums">Rp 250.000</td>
                    <td className="py-4 px-space-md text-right tabular-nums font-bold text-on-surface">Rp 250.000</td>
                    <td className="py-4 px-space-md text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span className="font-bold text-on-surface">100%</span>
                      </div>
                    </td>
                    <td className="py-4 px-space-md text-center">
                      <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold uppercase">
                        Sempurna Lunas
                      </span>
                    </td>
                    <td className="py-4 px-space-md text-right">
                      <span className="text-on-surface-variant font-body-sm text-body-sm italic">Disiplin Penuh</span>
                    </td>
                  </tr>
                  {/* Row 5: Official & Medis */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors font-body-md text-body-md">
                    <td className="py-4 px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-3 h-3 rounded-full bg-outline"></span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">Official & Logistik Medis</span>
                          <span className="text-on-surface-variant font-body-sm text-body-sm">Peralatan, Sound Engineer, Pertolongan Pertama</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-space-md text-center font-medium">3 Personil</td>
                    <td className="py-4 px-space-md text-right tabular-nums">Rp 150.000</td>
                    <td className="py-4 px-space-md text-right tabular-nums font-semibold text-on-surface">Rp 100.000</td>
                    <td className="py-4 px-space-md text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-on-surface">67%</span>
                        <span className="text-error font-body-sm text-body-sm">(1 tunggak)</span>
                      </div>
                    </td>
                    <td className="py-4 px-space-md text-center">
                      <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-semibold uppercase">
                        Dalam Konfirmasi
                      </span>
                    </td>
                    <td className="py-4 px-space-md text-right">
                      <button 
                        className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm inline-flex items-center gap-1 transition-colors" 
                        onClick={() => triggerToast('Notifikasi konfirmasi dikirim ke Koordinator Official')}
                      >
                        <span className="material-symbols-outlined text-sm">notifications_active</span>
                        <span>Kirim Notif</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 3 & 4: Lembar Pengesahan LPJ & Panel Opsi Ekspor Terpadu */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Lembar Pengesahan & Akuntabilitas */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-space-md">
                <div className="flex flex-col">
                  <span className="font-headline-md text-headline-md text-on-surface">Lembar Pengesahan & Legalitas Kas</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Validasi berjenjang bendahara, dewan pembina, dan unit kesiswaan sekolah</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs uppercase font-bold">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  Resmi Diaudit
                </div>
              </div>
              {/* Signatures Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md mt-space-md">
                {/* Signer 1 */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between min-h-[160px]">
                  <div className="flex flex-col">
                    <span className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold">Dibuat Oleh:</span>
                    <span className="font-label-md text-label-md font-semibold text-on-surface mt-1">Kak Fahmi Pratama</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Bendahara Umum</span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="font-label-xs text-label-xs text-secondary font-bold inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">done_all</span>
                      TERPARAF DIGITAL
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-xl">draw</span>
                  </div>
                </div>
                {/* Signer 2 */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between min-h-[160px]">
                  <div className="flex flex-col">
                    <span className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold">Disetujui Oleh:</span>
                    <span className="font-label-md text-label-md font-semibold text-on-surface mt-1">Drs. Sutrisno, M.Pd</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Pembina Utama MBGT</span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="font-label-xs text-label-xs text-secondary font-bold inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">done_all</span>
                      TERPARAF DIGITAL
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-xl">draw</span>
                  </div>
                </div>
                {/* Signer 3 */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between min-h-[160px]">
                  <div className="flex flex-col">
                    <span className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold">Mengetahui:</span>
                    <span className="font-label-md text-label-md font-semibold text-on-surface mt-1">H. Maryanto, S.Pd</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Kesiswaan & Pembina OSIS</span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="font-label-xs text-label-xs text-secondary font-bold inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">done_all</span>
                      TERVERIFIKASI
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-xl">approval</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Security / Hash Verification Strip */}
            <div className="mt-space-lg p-space-md rounded-xl bg-surface-container-high/60 flex flex-col sm:flex-row items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-12 h-12 bg-on-surface text-surface flex items-center justify-center rounded-lg p-1">
                  <span className="material-symbols-outlined text-2xl text-surface">qr_code_2</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm font-bold text-on-surface">Hash Integritas Keuangan Digital:</span>
                  <span className="font-body-sm text-body-sm font-mono text-on-surface-variant break-all">MBGT-LPJ-2026-09-HASH-7F4B92AE</span>
                </div>
              </div>
              <span className="font-label-xs text-label-xs text-on-surface-variant">Timestamp: 30/09/2026 23:59:12 WIB</span>
            </div>
          </div>

          {/* Panel Pengunduhan Laporan & Ekspor Berkas */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-headline-md text-headline-md text-on-surface">Format Dokumen LPJ</span>
                <span className="material-symbols-outlined text-secondary">cloud_download</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                Pilih arsip dan format berkas pendukung pembukuan kas yang ingin diunduh atau dikirimkan ke pihak eksternal.
              </p>
              <form className="flex flex-col gap-space-sm" id="exportForm">
                <label className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                  <input defaultChecked className="mt-1 w-4 h-4 accent-secondary rounded cursor-pointer" type="checkbox" />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">Laporan Buku Kas Umum (PDF)</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Format resmi Dispora, Yayasan, dan Unit Sekolah.</span>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                  <input defaultChecked className="mt-1 w-4 h-4 accent-secondary rounded cursor-pointer" type="checkbox" />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">Rekap Disiplin Iuran Anggota (.XLSX)</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Rincian absensi bayar seluruh skuad per seksi marching band.</span>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                  <input className="mt-1 w-4 h-4 accent-secondary rounded cursor-pointer" type="checkbox" />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">Lampiran Bukti Nota & Kuitansi (ZIP)</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Hasil pemindaian berkas belanja fisik alat dan logistik.</span>
                  </div>
                </label>
                <div className="pt-space-xs flex items-center justify-between px-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Sertakan Stempel & Tanda Tangan Pembina</span>
                  <span className="font-label-xs text-label-xs font-semibold text-secondary">AKTIF</span>
                </div>
              </form>
            </div>
            <div className="mt-space-lg flex flex-col sm:flex-row gap-space-xs">
              <button 
                className="flex-1 py-2.5 px-space-md rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm" 
                onClick={() => triggerToast('Mengunduh paket berkas LPJ Gema Taruna...')}
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Unduh Sekarang</span>
              </button>
              <button 
                className="py-2.5 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-colors" 
                onClick={() => triggerToast('Laporan berhasil dikirim ke email Drs. Sutrisno, M.Pd')}
              >
                <span className="material-symbols-outlined text-base">outgoing_mail</span>
                <span>Kirim ke Pembina</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Dialog: Preview & Download LPJ Lengkap */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-container/60 backdrop-blur-sm transition-opacity">
          <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-lg shadow-xl flex flex-col gap-space-md animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-2xl">picture_as_pdf</span>
                <span className="font-headline-md text-headline-md text-on-surface">Download Dokumen LPJ Kas</span>
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors" onClick={() => setShowModal(false)}>
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Dokumen Laporan Pertanggungjawaban ini telah dikompilasi secara otomatis sesuai standar pembukuan kas Unit Marching Band Gema Taruna Periode Semester Ganjil 2026/2027.
            </p>
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-2 font-body-sm text-body-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Nomor Dokumen:</span>
                <span className="font-mono font-semibold text-on-surface">042/LPJ-FIN/MBGT/IX/2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Total Lembar:</span>
                <span className="font-semibold text-on-surface">18 Halaman Termasuk Lampiran</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Status Pengesahan:</span>
                <span className="font-semibold text-secondary">Telah Terverifikasi 3 Pihak</span>
              </div>
            </div>
            <div className="flex items-center justify-end gap-space-xs pt-2">
              <button className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors" onClick={() => setShowModal(false)}>
                Batal
              </button>
              <button 
                className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm" 
                onClick={() => {
                  setShowModal(false);
                  triggerToast('Mengunduh LPJ_Lengkap_MBGT_Sep2026.pdf...');
                }}
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Unduh PDF Lengkap</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
