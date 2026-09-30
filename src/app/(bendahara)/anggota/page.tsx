'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AnggotaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    closeModal()
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4500)
  }

  return (
    <div className="flex flex-col w-full relative">
      <div className="px-gutter py-space-xl flex flex-col gap-space-xl max-w-[1440px] mx-auto w-full">
        {/* Top Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-xs">verified</span>
                Modul Anggota • Registrasi Musim 2026/2027
              </span>
              <span className="text-outline-variant font-label-xs text-label-xs">•</span>
              <span className="text-on-surface-variant font-label-xs text-label-xs">ID Skuad: MBGT-REG-40</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold">
              Database Anggota Gema Taruna
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Data induk seluruh personel terdaftar, instrumen, kontak darurat/WhatsApp, serta kepatuhan fiskal skuad utama Grand Prix Marching Band.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <button type="button" className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface transition-colors font-label-md text-label-md">
              <span className="material-symbols-outlined text-lg">upload_file</span>
              <span>Import CSV</span>
            </button>
            <button type="button" className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface transition-colors font-label-md text-label-md">
              <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
              <span>Unduh Skuad (PDF)</span>
            </button>
            <button type="button" onClick={openModal} className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary hover:opacity-90 shadow-sm transition-all font-label-md text-label-md font-semibold">
              <span className="material-symbols-outlined text-lg">person_add</span>
              <span>+ Tambah Anggota Baru</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Cards (4 Bento Stats) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Card 1: Total Anggota */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-container"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Total Anggota</span>
              <span className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-xl">groups</span>
              </span>
            </div>
            <div className="mt-space-md">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-metric-display text-metric-display text-on-surface">40</span>
                <span className="font-title-sm text-title-sm text-on-surface-variant font-medium">Personel</span>
              </div>
              <div className="flex items-center justify-between mt-space-xs pt-space-xs">
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">38 Taruna Aktif, 2 Alumni</p>
                <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">100% Verif</span>
              </div>
            </div>
          </div>
          {/* Card 2: Komposisi Divisi */}
          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Komposisi Divisi</span>
              <span className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-xl">military_tech</span>
              </span>
            </div>
            <div className="mt-space-md">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-metric-display text-metric-display text-on-surface">4</span>
                <span className="font-title-sm text-title-sm text-on-surface-variant font-medium">Seksi Tempur</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-space-xs pt-space-xs">
                <span className="font-label-xs text-label-xs px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">Brass: 14</span>
                <span className="font-label-xs text-label-xs px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-bold">Battery: 10</span>
                <span className="font-label-xs text-label-xs px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">Guard: 8</span>
                <span className="font-label-xs text-label-xs px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-bold">Pit: 5</span>
              </div>
            </div>
          </div>
          {/* Card 3: Disiplin Iuran */}
          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Iuran September</span>
              <span className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-xl">payments</span>
              </span>
            </div>
            <div className="mt-space-md">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-metric-display text-metric-display text-on-surface">32</span>
                <span className="font-title-sm text-title-sm text-on-surface-variant">/ 40 Lunas</span>
                <span className="ml-auto font-label-sm text-label-sm text-secondary font-bold">80%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-secondary-container h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-error mt-space-xs font-medium">8 Anggota menunggu teguran WA</p>
            </div>
          </div>
          {/* Card 4: Rekrutmen Musim Ini */}
          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Rekrutmen Baru</span>
              <span className="w-9 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">star</span>
              </span>
            </div>
            <div className="mt-space-md">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-metric-display text-metric-display text-on-surface">+6</span>
                <span className="font-title-sm text-title-sm text-on-surface-variant font-medium">Taruna Baru</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs pt-space-xs">Lulus Diklat Dasar GPMB 2026</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Controls Toolbar */}
        <div className="flex flex-col gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-sm">
            {/* Search bar */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">search</span>
              </span>
              <input type="text" id="searchInput" placeholder="Cari nama anggota, instrumen, WhatsApp, atau ID anggota..." className="w-full pl-11 pr-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none transition-all shadow-inner" />
            </div>
            {/* Filter Selects */}
            <div className="flex flex-wrap items-center gap-space-xs">
              <select className="px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer">
                <option>Semua Seksi</option>
                <option>Brass (Trumpet/Mello/Baritone/Tuba)</option>
                <option>Percussion (Battery Line)</option>
                <option>Color Guard (Equipment Line)</option>
                <option>Pit Instrument (Front Ensemble)</option>
                <option>Official & Alumni</option>
              </select>
              <select className="px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer">
                <option>Status: Aktif</option>
                <option>Semua Status</option>
                <option>Cuti Akademik</option>
                <option>Alumni</option>
              </select>
              <select className="px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer">
                <option>Semua Status Iuran</option>
                <option>Lunas (September)</option>
                <option>Menunggak Iuran</option>
              </select>
              <button type="button" className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors">
                <span className="material-symbols-outlined text-sm">mark_email_read</span>
                <span>Broadcast WA</span>
              </button>
            </div>
          </div>
          {/* Quick Section Tabs */}
          <div className="flex items-center justify-between border-t border-surface-container pt-space-sm flex-wrap gap-space-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <button className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-xs text-label-xs font-bold tracking-wider uppercase transition-colors">
                Semua (40)
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-xs text-label-xs font-semibold tracking-wider uppercase transition-colors">
                Brass (14)
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-xs text-label-xs font-semibold tracking-wider uppercase transition-colors">
                Battery (10)
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-xs text-label-xs font-semibold tracking-wider uppercase transition-colors">
                Color Guard (8)
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-xs text-label-xs font-semibold tracking-wider uppercase transition-colors">
                Pit Instrument (5)
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-xs text-label-xs font-semibold tracking-wider uppercase transition-colors">
                Official / Alumni (3)
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Terpilih: <strong className="text-on-surface">0</strong> personel</span>
            </div>
          </div>
        </div>

        {/* Table of Members */}
        <div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-xs text-label-xs uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer" />
                  </th>
                  <th className="py-3 px-4 font-bold">No & ID</th>
                  <th className="py-3 px-4 font-bold">Nama Lengkap & Peran</th>
                  <th className="py-3 px-4 font-bold">Seksi & Instrumen</th>
                  <th className="py-3 px-4 font-bold">Kontak WhatsApp</th>
                  <th className="py-3 px-4 font-bold">Tgl Gabung</th>
                  <th className="py-3 px-4 font-bold text-center">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Status Iuran</th>
                  <th className="py-3 px-4 font-bold text-center">Aksi Bendahara</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container font-body-md text-body-md text-on-surface">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="py-3.5 px-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">#01</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">MB-021</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm shrink-0">
                        BA
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-label-md font-semibold text-on-surface truncate">Bagas Arya Santoso</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Snare Drum Section Leader</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-xs text-label-xs font-semibold">
                      <span className="material-symbols-outlined text-sm">album</span>
                      Battery • Snare Drum 14"
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-label-sm text-label-sm font-semibold text-on-surface hover:text-secondary transition-colors">
                      <span className="material-symbols-outlined text-base text-secondary">chat</span>
                      0812-3456-7890
                    </a>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">14 Agu 2024</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-xs text-label-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                      Aktif
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-bold">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      Lunas Sep
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Lihat Detail">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                      <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Edit Anggota">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-secondary hover:bg-secondary-fixed/50 transition-colors" title="Kirim WA">
                        <span className="material-symbols-outlined text-lg">sms</span>
                      </a>
                      <button className="p-1.5 rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-colors" title="Hapus">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="py-3.5 px-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">#02</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">MB-014</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-sm shrink-0">
                        DW
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-label-md font-semibold text-on-surface truncate">Dimas Wahyu Pratama</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Lead Trumpet 1</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
                      <span className="material-symbols-outlined text-sm">campaign</span>
                      Brass • Lead Trumpet
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <a href="https://wa.me/6281388992211" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-label-sm text-label-sm font-semibold text-on-surface hover:text-secondary transition-colors">
                      <span className="material-symbols-outlined text-base text-secondary">chat</span>
                      0813-8899-2211
                    </a>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">10 Sep 2025</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-xs text-label-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                      Aktif
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-xs text-label-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                      Menunggak Rp50k
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Lihat Detail">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                      <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Edit Anggota">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <a href="https://wa.me/6281388992211?text=Halo%20Dimas,%20mohon%20konfirmasi%20iuran%20MBGT%20September%20sebesar%20Rp50.000" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-secondary hover:bg-secondary-fixed/50 transition-colors" title="Tagih WA">
                        <span className="material-symbols-outlined text-lg">priority_high</span>
                      </a>
                      <button className="p-1.5 rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-colors" title="Hapus">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="py-3.5 px-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">#03</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">MB-034</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-sm shrink-0">
                        SN
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-label-md font-semibold text-on-surface truncate">Siti Nurhaliza</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Rifle & Sabre Soloist</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-tertiary-fixed text-on-tertiary-fixed font-label-xs text-label-xs font-semibold">
                      <span className="material-symbols-outlined text-sm">flag</span>
                      Color Guard • Weapon Line
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <a href="https://wa.me/6281901234567" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-label-sm text-label-sm font-semibold text-on-surface hover:text-secondary transition-colors">
                      <span className="material-symbols-outlined text-base text-secondary">chat</span>
                      0819-0123-4567
                    </a>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">02 Jan 2024</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-xs text-label-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                      Aktif
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-bold">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      Lunas Sep
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Lihat Detail">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                      <button className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Edit Anggota">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <a href="https://wa.me/6281901234567" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-secondary hover:bg-secondary-fixed/50 transition-colors" title="Kirim WA">
                        <span className="material-symbols-outlined text-lg">sms</span>
                      </a>
                      <button className="p-1.5 rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-colors" title="Hapus">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Pagination Footer */}
          <div className="p-space-md bg-surface-container-lowest border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-sm">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Menampilkan <strong className="text-on-surface font-semibold">1 - 3</strong> dari <strong className="text-on-surface font-semibold">40</strong> personel terdaftar
            </p>
            <div className="flex items-center gap-1">
              <button disabled className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant/50 font-label-sm text-label-sm cursor-not-allowed">
                Sebelumnya
              </button>
              <button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container-low text-on-surface font-label-sm text-label-sm font-semibold flex items-center justify-center transition-colors">
                2
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container-low text-on-surface font-label-sm text-label-sm font-semibold flex items-center justify-center transition-colors">
                3
              </button>
              <span className="px-1 text-on-surface-variant font-label-xs text-label-xs">...</span>
              <button className="w-8 h-8 rounded-lg hover:bg-surface-container-low text-on-surface font-label-sm text-label-sm font-semibold flex items-center justify-center transition-colors">
                6
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-medium transition-colors">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>

        {/* Section Profile & Equipment Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
          {/* Card: Visual Section Distribution */}
          <div className="lg:col-span-2 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-xs text-label-xs text-secondary uppercase font-bold tracking-wider">Distribusi Skuad Lapangan</span>
                <h3 className="font-title-sm text-title-sm text-on-surface font-bold">Kesiapan Formasi Drill GPMB 2026</h3>
              </div>
              <span className="font-label-xs text-label-xs px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">Kuorum Lengkap</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm my-space-md">
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">Brass Line</span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">14</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Lead & Low Brass</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">Battery Line</span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">10</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Snare, Tenor, Bass</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">Color Guard</span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">8</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Rifle, Sabre, Silk</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">Front Pit</span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">5</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Mallet & Synth</span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low p-space-sm rounded-lg">
              <span className="material-symbols-outlined text-secondary text-lg">info</span>
              <span>Semua personel telah terikat komitmen iuran wajib sebesar Rp 50.000/bulan untuk pemeliharaan alat dan sewa lapangan latih.</span>
            </div>
          </div>

          {/* Card: Bendahara Quick Memo */}
          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-space-xs text-secondary">
              <span className="material-symbols-outlined text-lg">notifications_active</span>
              <span className="font-label-xs text-label-xs uppercase font-bold tracking-wider">Memo Bendahara</span>
            </div>
            <div className="my-space-sm flex flex-col gap-space-xs">
              <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Penutupan Kas September</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Sisa tenggat waktu setoran iuran iuran kas: <strong>3 Hari Lagi</strong>. Silakan kirim pesan pengingat WA satu klik kepada 8 personel yang belum menyelesaikan administrasi.
              </p>
            </div>
            <button type="button" className="w-full inline-flex items-center justify-center gap-space-xs py-2 px-space-md rounded-lg bg-secondary-fixed hover:bg-secondary-fixed/80 text-on-secondary-fixed transition-colors font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-base">forward_to_inbox</span>
              Kirim Pengingat Otomatis (8 Anggota)
            </button>
          </div>
        </div>

      </div>

      {/* FLOATING MODAL OVERLAY: TAMBAH ANGGOTA BARU */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-4 overflow-y-auto" id="addMemberModal">
          <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between border-b border-surface-container">
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-secondary uppercase font-bold tracking-wider">Registrasi Musim 2026/2027</span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Formulir Tambah Anggota Baru</h2>
              </div>
              <button type="button" onClick={closeModal} className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-space-lg flex flex-col gap-space-md" id="newMemberForm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Nama Lengkap Taruna *</label>
                  <input type="text" required placeholder="Contoh: Muhammad Kevin Adiputra" className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Nomor WhatsApp Aktif *</label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-surface-container text-on-surface-variant font-label-md text-label-md rounded-l-lg border-r border-surface-container-high">+62</span>
                    <input type="tel" required placeholder="812-xxxx-xxxx" className="w-full px-space-md py-2 rounded-r-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Seksi / Divisi *</label>
                  <select className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none cursor-pointer">
                    <option>Brass Line</option>
                    <option>Percussion (Battery Line)</option>
                    <option>Color Guard</option>
                    <option>Pit Instrument (Front Ensemble)</option>
                    <option>Official & Tim Medis</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Spesifikasi Instrumen / Alat *</label>
                  <input type="text" required placeholder='Contoh: Trombone Tenor / Snare Drum 14"' className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">ID Anggota (Otomatis)</label>
                  <input type="text" disabled value="MB-041 (Tersedia)" className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md font-bold cursor-not-allowed" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Tanggal Bergabung</label>
                  <input type="date" defaultValue="2026-09-24" className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none cursor-pointer" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Status Formasi Musim Ini</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
                  <label className="flex items-center gap-2 p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
                    <input type="radio" name="status_member" defaultChecked className="text-primary focus:ring-0" />
                    <span className="font-label-sm text-label-sm text-on-surface font-medium">Aktif Lapangan</span>
                  </label>
                  <label className="flex items-center gap-2 p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
                    <input type="radio" name="status_member" className="text-primary focus:ring-0" />
                    <span className="font-label-sm text-label-sm text-on-surface font-medium">Cadangan / Trainee</span>
                  </label>
                  <label className="flex items-center gap-2 p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
                    <input type="radio" name="status_member" className="text-primary focus:ring-0" />
                    <span className="font-label-sm text-label-sm text-on-surface font-medium">Official Skuad</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Riwayat Kesehatan & Kesiapan Fisik</label>
                <textarea rows={2} placeholder="Contoh: Kondisi prima, tidak ada cedera pergelangan atau pantangan latihan panas." className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none"></textarea>
              </div>
              <div className="p-space-sm rounded-lg bg-secondary-fixed/50 flex items-center justify-between text-on-secondary-fixed">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">receipt_long</span>
                  <span className="font-label-sm text-label-sm font-semibold">Komitmen Iuran Rutin MBGT:</span>
                </div>
                <span className="font-label-sm text-label-sm font-bold">Rp 50.000 / bulan</span>
              </div>
              <div className="flex items-center justify-end gap-space-sm pt-space-xs mt-2 border-t border-surface-container">
                <button type="button" onClick={closeModal} className="px-space-md py-2.5 rounded-lg hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors">
                  Batal
                </button>
                <button type="submit" className="inline-flex items-center gap-1.5 px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary hover:opacity-90 font-label-md text-label-md font-bold transition-all shadow-sm">
                  <span className="material-symbols-outlined text-base">save</span>
                  <span>Simpan Personel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Microfeedback Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl bg-primary-container text-on-primary shadow-xl">
          <span className="material-symbols-outlined text-secondary text-2xl">check_circle</span>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm font-bold">Sinkronisasi Berhasil</span>
            <span className="font-body-sm text-body-sm text-on-primary-container">Data anggota baru berhasil disinkronkan ke buku iuran dan kas besar.</span>
          </div>
          <button type="button" onClick={() => setShowToast(false)} className="ml-2 text-on-primary-container hover:text-on-primary">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      )}

    </div>
  )
}
