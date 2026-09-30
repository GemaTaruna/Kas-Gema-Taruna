'use client'

import React from 'react'

export default function PengeluaranKasPage() {
  return (
    <div className="flex flex-col w-full px-margin py-space-lg gap-space-lg text-on-surface">
      {/* Header Modul */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-2">
            <span className="font-label-xs text-label-xs uppercase tracking-widest text-on-surface-variant font-bold">MODUL BUKU KAS</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
            <span className="font-label-xs text-label-xs uppercase tracking-wider font-bold text-on-tertiary-container bg-error-container/60 px-2 py-0.5 rounded-full">KAS KELUAR</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">Pencatatan Pengeluaran Kas</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Pengawasan belanja operasional, perbaikan instrumen tiup & perkusi, kostum pameran, transportasi, dan logistik lomba.
          </p>
        </div>
        {/* Quick Action Header */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <button className="flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container transition-all font-label-md text-label-md" type="button">
            <span className="material-symbols-outlined text-base text-secondary">table_view</span>
            <span>Export Excel</span>
          </button>
          <button className="flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container transition-all font-label-md text-label-md" type="button">
            <span className="material-symbols-outlined text-base text-on-surface-variant">print</span>
            <span>Cetak Rekap BKK</span>
          </button>
          <a className="flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-tertiary-container text-tertiary-fixed shadow-md hover:opacity-95 transition-all font-label-md text-label-md font-bold" href="#form-bkk">
            <span className="material-symbols-outlined text-base">remove_circle_outline</span>
            <span>+ Catat Pengeluaran Baru</span>
          </a>
        </div>
      </div>

      {/* KPI Metrik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Card 1 */}
        <div className="flex flex-col justify-between p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Total Pengeluaran Musim</span>
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-high text-on-surface">
              <span className="material-symbols-outlined text-lg">calendar_month</span>
            </span>
          </div>
          <div className="my-space-sm">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold tracking-tight">Rp 12.550.000</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">Akumulasi Musim 2026/2027</div>
          </div>
          <div className="flex items-center gap-1.5 pt-space-xs font-label-xs text-label-xs text-on-surface-variant">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary-container"></span>
            <span>31 Pos Pembukuan Tercatat</span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="flex flex-col justify-between p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Bulan September 2026</span>
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-error-container text-on-error-container">
              <span className="material-symbols-outlined text-lg">trending_down</span>
            </span>
          </div>
          <div className="my-space-sm">
            <div className="font-metric-display text-metric-display text-on-tertiary-container font-extrabold tracking-tight">Rp 1.130.000</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">4 transaksi keluar terverifikasi</div>
          </div>
          <div className="flex items-center gap-1.5 pt-space-xs font-label-xs text-label-xs text-on-surface-variant truncate">
            <span className="material-symbols-outlined text-sm text-secondary">tune</span>
            <span className="truncate">Fokus: Perawatan alat & konsumsi</span>
          </div>
        </div>
        {/* Card 3 */}
        <div className="flex flex-col justify-between p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Burn Rate Plafon</span>
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed">
              <span className="material-symbols-outlined text-lg">pie_chart</span>
            </span>
          </div>
          <div className="my-space-sm">
            <div className="flex items-baseline gap-2">
              <div className="font-metric-display text-metric-display text-on-surface font-extrabold tracking-tight">50.2%</div>
              <span className="font-label-xs text-label-xs text-secondary font-bold">Aman</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-2 mt-2 overflow-hidden">
              <div className="bg-secondary h-2 rounded-full" style={{ width: '50.2%' }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-xs font-label-xs text-label-xs text-on-surface-variant">
            <span>Rp 12.450.000 sisa plafon</span>
            <span className="font-bold">Total: Rp 25jt</span>
          </div>
        </div>
        {/* Card 4 */}
        <div className="flex flex-col justify-between p-space-lg rounded-xl bg-surface-container-lowest shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Kategori Terbesar</span>
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-high text-secondary">
              <span className="material-symbols-outlined text-lg">music_note</span>
            </span>
          </div>
          <div className="my-space-sm">
            <div className="font-metric-display text-metric-display text-on-surface font-extrabold tracking-tight">Rp 5.200.000</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">Perawatan & Sparepart Instrumen</div>
          </div>
          <div className="flex items-center gap-1.5 pt-space-xs font-label-xs text-label-xs text-secondary font-bold">
            <span className="material-symbols-outlined text-sm">stars</span>
            <span>41.4% Dari Total Kas Keluar</span>
          </div>
        </div>
      </div>

      {/* Composition Split View */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        {/* Panel Kiri: Tabel Kas Keluar Komprehensif */}
        <div className="xl:col-span-8 flex flex-col gap-space-md">
          {/* Toolbar & Filters */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
              {/* Search Field */}
              <div className="md:col-span-6 relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="Cari deskripsi belanja, toko alat, no BKK..." type="text" />
              </div>
              {/* Filter Kategori Dropdown */}
              <div className="md:col-span-3">
                <select className="w-full px-3 py-2 bg-surface-container-low rounded-lg font-label-sm text-label-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container">
                  <option value="all">Semua Kategori Belanja</option>
                  <option value="alat" defaultValue="alat">Perawatan Alat Musik</option>
                  <option value="kostum">Kostum & Seragam</option>
                  <option value="konsumsi">Konsumsi Latihan</option>
                  <option value="transport">Transportasi & Truk</option>
                  <option value="lomba">Biaya Pendaftaran Lomba</option>
                  <option value="atk">Administrasi & ATK</option>
                </select>
              </div>
              {/* Periode Dropdown */}
              <div className="md:col-span-3">
                <select className="w-full px-3 py-2 bg-surface-container-low rounded-lg font-label-sm text-label-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container">
                  <option value="2026-09" defaultValue="2026-09">September 2026</option>
                  <option value="2026-08">Agustus 2026</option>
                  <option value="2026-07">Juli 2026</option>
                  <option value="all-season">Semua Musim 26/27</option>
                </select>
              </div>
            </div>
            {/* Filter Chips / Shortcut quick view */}
            <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5">
              <span className="font-label-xs text-label-xs text-on-surface-variant whitespace-nowrap">Filter Cepat:</span>
              <button className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-xs text-label-xs whitespace-nowrap" type="button">Semua Status</button>
              <button className="px-2.5 py-1 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface-variant font-label-xs text-label-xs whitespace-nowrap" type="button">Nota Fisik Lengkap</button>
              <button className="px-2.5 py-1 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface-variant font-label-xs text-label-xs whitespace-nowrap" type="button">Diverifikasi Pembina</button>
              <button className="px-2.5 py-1 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface-variant font-label-xs text-label-xs whitespace-nowrap" type="button">Nominal &gt; Rp 1 Juta</button>
            </div>
          </div>

          {/* Tabel Komprehensif */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-space-md py-space-sm flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <span className="font-title-sm text-title-sm font-bold text-on-surface">Buku Kas Keluar (BKK)</span>
                <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-bold">5 ditampilkan</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Disortir berdasarkan tanggal terbaru</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-md text-body-md border-collapse">
                <thead className="bg-surface-container-low text-on-surface-variant font-label-xs text-label-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 font-bold" scope="col">No. BKK & Waktu</th>
                    <th className="py-3.5 px-3 font-bold" scope="col">Kategori</th>
                    <th className="py-3.5 px-4 font-bold" scope="col">Rincian Belanja & Rekanan</th>
                    <th className="py-3.5 px-4 font-bold text-right" scope="col">Nominal Keluar</th>
                    <th className="py-3.5 px-3 font-bold text-center" scope="col">Bukti Nota</th>
                    <th className="py-3.5 px-3 font-bold" scope="col">PIC Belanja</th>
                    <th className="py-3.5 px-3 font-bold text-center" scope="col">Status</th>
                    <th className="py-3.5 px-3 font-bold text-center" scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y-0 text-on-surface">
                  {/* Row 1 */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-label-sm text-label-sm font-bold text-on-surface">BKK-2026-09-031</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">22 Sep 2026, 16:40</div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">Perawatan Alat</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-label-md text-label-md text-on-surface font-semibold line-clamp-1">Stick Snare Vic Firth 5 Pasang & Valve Oil Trumpet</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs">storefront</span>
                        <span>Toko Harmoni Nada Musik</span>
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="font-title-sm text-title-sm font-extrabold text-on-tertiary-container">-Rp 350.000</span>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Tunai Kas</div>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-xs text-label-xs font-semibold shadow-sm transition-all" title="Lihat foto nota" type="button">
                        <span className="material-symbols-outlined text-sm text-secondary">receipt_long</span>
                        <span>Struk</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="font-label-sm text-label-sm font-semibold text-on-surface">Fahmi Pratama</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Bendahara Umum</div>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        <span>Terverifikasi</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" title="Rincian Transaksi" type="button">
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </button>
                        <button className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" title="Edit" type="button">
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="bg-surface-container-lowest hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-label-sm text-label-sm font-bold text-on-surface">BKK-2026-09-029</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">18 Sep 2026, 17:30</div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-bold">Konsumsi</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-label-md text-label-md text-on-surface font-semibold line-clamp-1">Air Mineral 5 Galon + 45 Paket Snack Taruna Latihan Lapangan</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs">storefront</span>
                        <span>Toko & Katering Barokah</span>
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="font-title-sm text-title-sm font-extrabold text-on-tertiary-container">-Rp 280.000</span>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Tunai Kas</div>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-xs text-label-xs font-semibold shadow-sm transition-all" type="button">
                        <span className="material-symbols-outlined text-sm text-secondary">receipt_long</span>
                        <span>Struk</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="font-label-sm text-label-sm font-semibold text-on-surface">Dimas Anggara</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Seksi Logistik</div>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        <span>Terverifikasi</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" type="button">
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </button>
                        <button className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" type="button">
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-label-sm text-label-sm font-bold text-on-surface">BKK-2026-09-026</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">12 Sep 2026, 10:15</div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">Seragam & Guard</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-label-md text-label-md text-on-surface font-semibold line-clamp-1">Kain Bendera Color Guard Silk 6 Set & Tiang Alumunium 1.8m</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs">storefront</span>
                        <span>Pusat Tekstil Sinar Indah</span>
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="font-title-sm text-title-sm font-extrabold text-on-tertiary-container">-Rp 500.000</span>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Transfer Mandiri</div>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-xs text-label-xs font-semibold shadow-sm transition-all" type="button">
                        <span className="material-symbols-outlined text-sm text-secondary">receipt_long</span>
                        <span>Faktur</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="font-label-sm text-label-sm font-semibold text-on-surface">Nabila Kirana</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Seksi Color Guard</div>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        <span>Terverifikasi</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" type="button">
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </button>
                        <button className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" type="button">
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="bg-surface-container-lowest hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-label-sm text-label-sm font-bold text-on-surface">BKK-2026-08-021</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">25 Agu 2026, 08:30</div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-surface-variant text-on-surface font-bold">Transportasi</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-label-md text-label-md text-on-surface font-semibold line-clamp-1">Sewa 2 Unit Truk Box Angkut Bass Drum, Pit, Marimba ke Stadion</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs">local_shipping</span>
                        <span>PO Ekspedisi Lancar Jaya</span>
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="font-title-sm text-title-sm font-extrabold text-on-tertiary-container">-Rp 1.800.000</span>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Transfer Mandiri</div>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-xs text-label-xs font-semibold shadow-sm transition-all" type="button">
                        <span className="material-symbols-outlined text-sm text-secondary">receipt_long</span>
                        <span>Kuitansi</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="font-label-sm text-label-sm font-semibold text-on-surface">Drs. H. Mulyono</div>
                      <div className="font-body-sm text-body-sm text-secondary font-bold">Pembina Utama</div>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-xs text-label-xs font-bold">
                        <span className="material-symbols-outlined text-xs text-secondary-fixed">verified</span>
                        <span>Audit Passed</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" type="button">
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-label-sm text-label-sm font-bold text-on-surface">BKK-2026-08-015</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">14 Agu 2026, 14:00</div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">Registrasi Lomba</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-label-md text-label-md text-on-surface font-semibold line-clamp-1">Registrasi Peserta Divisi Open Grand Prix Marching Band Indonesia</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs">emoji_events</span>
                        <span>Yayasan GPMB Pusat Jakarta</span>
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="font-title-sm text-title-sm font-extrabold text-on-tertiary-container">-Rp 2.500.000</span>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Transfer Mandiri</div>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-xs text-label-xs font-semibold shadow-sm transition-all" type="button">
                        <span className="material-symbols-outlined text-sm text-secondary">receipt_long</span>
                        <span>Resmi</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="font-label-sm text-label-sm font-semibold text-on-surface">Fahmi Pratama</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Bendahara Umum</div>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-xs text-label-xs font-bold">
                        <span className="material-symbols-outlined text-xs text-secondary-fixed">verified</span>
                        <span>Audit Passed</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" type="button">
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Footer Pagination */}
            <div className="p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm bg-surface-container-lowest">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Menampilkan <span className="font-semibold text-on-surface">1 - 5</span> dari <span className="font-semibold text-on-surface">31</span> transaksi belanja
              </span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm disabled:opacity-40" disabled type="button">
                  Sebelumnya
                </button>
                <button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center" type="button">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium flex items-center justify-center" type="button">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium flex items-center justify-center" type="button">
                  3
                </button>
                <span className="px-1 text-on-surface-variant">...</span>
                <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium flex items-center justify-center" type="button">
                  7
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm" type="button">
                  Berikutnya
                </button>
              </div>
            </div>
          </div>
          {/* Quick Summary Visual Banner */}
          <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm">
            <div className="flex items-center gap-space-md">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-container-lowest text-secondary shadow-sm">
                <span className="material-symbols-outlined text-2xl">policy</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm font-bold text-on-surface">Standar Pelaporan SPJ Marching Band</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Setiap pengeluaran kas wajib melampirkan nota bermeterai / cap toko untuk pemeriksaan pertanggungjawaban akhir musim.</span>
              </div>
            </div>
            <button className="px-space-md py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-bold whitespace-nowrap shadow-sm" type="button">
              Unduh Template SPJ
            </button>
          </div>
        </div>
        
        {/* Panel Kanan: Form Cepat Kas Keluar (BKK) */}
        <div className="xl:col-span-4 flex flex-col gap-space-md" id="form-bkk">
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md">
            {/* Form Header */}
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-tertiary-container text-on-tertiary">
                  <span className="material-symbols-outlined text-lg">receipt</span>
                </span>
                <div className="flex flex-col">
                  <span className="font-headline-md text-headline-md font-bold text-on-surface">Formulir BKK</span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Entri Transaksi Baru</span>
                </div>
              </div>
              <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                Draft BKK-032
              </span>
            </div>
            <form className="flex flex-col gap-space-md" onSubmit={(e) => { e.preventDefault(); alert('Pengeluaran berhasil dicatat ke Buku Kas Keluar!'); }}>
              {/* Field 1: Tanggal Transaksi */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center justify-between">
                  <span>Tanggal Pembayaran</span>
                  <span className="text-on-tertiary-container text-label-xs">*Wajib</span>
                </label>
                <div className="relative">
                  <input className="w-full px-3 py-2 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container" type="date" defaultValue="2026-09-24" />
                </div>
              </div>
              {/* Field 2: Kategori Pos Biaya */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Kategori Anggaran</label>
                <select className="w-full px-3 py-2 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container">
                  <option defaultValue="alat">Perawatan & Sparepart Instrumen Musik</option>
                  <option value="kostum">Kostum, Seragam & Properti Guard</option>
                  <option value="konsumsi">Konsumsi Harian Latihan</option>
                  <option value="transport">Transportasi & Sewa Armada Truk</option>
                  <option value="lomba">Biaya Registrasi Turnamen</option>
                  <option value="medis">Medis, Vitamin & P3K Lapangan</option>
                  <option value="atk">ATK, Fotokopi Partitur & Perlengkapan</option>
                  <option value="lainnya">Lainnya / Taktis Operasional</option>
                </select>
              </div>
              {/* Field 3: Nominal Pengeluaran */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Nominal Pembayaran (Rp)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-title-sm text-title-sm font-bold text-on-tertiary-container">-Rp</span>
                  <input className="w-full pl-12 pr-4 py-2 bg-surface-container-low rounded-lg font-title-sm text-title-sm font-extrabold text-on-tertiary-container focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="0" type="text" defaultValue="450.000" />
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant italic">Terbilang: Empat Ratus Lima Puluh Ribu Rupiah</span>
              </div>
              {/* Field 4: Metode Pembayaran */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Sumber Dana / Kas</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
                    <input defaultChecked className="text-primary-container focus:ring-0" name="payment_method" type="radio" value="tunai" />
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Kas Tunai Bendahara</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
                    <input className="text-primary-container focus:ring-0" name="payment_method" type="radio" value="transfer" />
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Bank Mandiri Band</span>
                  </label>
                </div>
              </div>
              {/* Field 5: Toko / Rekanan / Vendor */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Nama Toko / Penerima Dana</label>
                <div className="relative">
                  <input className="w-full px-3 py-2 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container" placeholder="Misal: Toko Nada Perkusi, Depot Barokah..." type="text" defaultValue="Toko Marching Store Sentosa" />
                </div>
              </div>
              {/* Field 6: Keterangan Detail Keperluan */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Rincian Belanja & Item</label>
                <textarea className="w-full px-3 py-2 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container resize-none" placeholder="Tuliskan nama barang, jumlah unit, seksi marching band penerima..." rows={3} defaultValue="Penggantian Head Snare Drum Remo Falams II 14 Inch sebanyak 1 pcs untuk latihan section Battery Snare Line."></textarea>
              </div>
              {/* Field 7: Foto Struk / Nota Fisik Belanja (Dropzone) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Unggah Struk / Nota Fisik</label>
                  <span className="font-label-xs text-label-xs text-secondary font-bold">Wajib LPJ Audit</span>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors">
                  <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary mb-2 shadow-sm">
                    <span className="material-symbols-outlined text-xl">upload_file</span>
                  </div>
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface">Klik atau seret file nota ke sini</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Format JPG, PNG atau PDF (Maks. 5 MB)</span>
                </div>
              </div>
              {/* Field 8: Penanggung Jawab Lapangan (PIC) */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">Penanggung Jawab Pembelian (PIC)</label>
                <select className="w-full px-3 py-2 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container">
                  <option value="fahmi">Fahmi Pratama (Bendahara Umum)</option>
                  <option defaultValue="aldy">Aldy Febrian (Section Leader Battery/Perkusi)</option>
                  <option value="nabila">Nabila Kirana (Seksi Color Guard)</option>
                  <option value="dimas">Dimas Anggara (Seksi Logistik & Aset)</option>
                  <option value="gilang">Gilang Ramadhan (Section Leader Brass)</option>
                </select>
              </div>
              {/* Notice Aturan Approval Pembina */}
              <div className="p-space-sm rounded-lg bg-surface-container-high flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-secondary flex-shrink-0 mt-0.5">verified_user</span>
                <p className="font-body-sm text-body-sm text-on-surface">
                  <span className="font-semibold text-secondary">Ketentuan Verifikasi:</span> Pengeluaran di atas <strong className="text-on-surface">Rp 1.000.000</strong> akan otomatis meminta persetujuan & paraf digital Pembina sebelum status kas ditutup.
                </p>
              </div>
              {/* Action Buttons */}
              <div className="flex items-center gap-space-sm pt-space-xs">
                <button className="flex-1 py-2.5 rounded-lg bg-tertiary-container hover:opacity-95 text-tertiary-fixed font-label-md text-label-md font-bold shadow-md transition-all flex items-center justify-center gap-2" type="submit">
                  <span className="material-symbols-outlined text-base">save</span>
                  <span>Simpan Pengeluaran Kas</span>
                </button>
                <button className="px-space-md py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all" type="reset">
                  Reset
                </button>
              </div>
            </form>
          </div>
          {/* Quick Tips Card */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2">
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-secondary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">lightbulb</span>
              Tips Keuangan Gema Taruna
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Pastikan setiap pembelian perlengkapan perkusi seperti drum stick dan head mencantumkan rincian merk resmi pada kwitansi agar mempermudah sinkronisasi garansi pabrikan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
