'use client';

export default function PemasukanPage() {
  return (
    <div className="flex flex-col w-full px-gutter py-space-lg gap-space-lg text-on-surface">
      {/* Top Visual Ribbon / Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-xs text-label-xs px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider font-bold">
              MODUL BUKU KAS • KAS MASUK
            </span>
            <span className="text-outline-variant">•</span>
            <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">
              Tahun Ajaran 2026/2027
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Pencatatan Pemasukan Kas
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Kelola penerimaan kas dari iuran anggota, sponsorship, donasi alumni, uang sewa instrumen, dan hadiah kejuaraan marching band Gema Taruna secara real-time dan terakuntabel.
          </p>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <button className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-all shadow-sm font-label-md text-label-md cursor-pointer" type="button">
            <span className="material-symbols-outlined text-lg">download</span>
            <span>Export Rekap Excel</span>
          </button>
          <button className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-all shadow-sm font-label-md text-label-md cursor-pointer" type="button">
            <span className="material-symbols-outlined text-lg">receipt_long</span>
            <span>Cetak Slip BKM</span>
          </button>
          <a className="flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary hover:bg-on-surface transition-all shadow-md font-label-md text-label-md cursor-pointer" href="#form-pemasukan">
            <span className="material-symbols-outlined text-lg text-secondary-fixed">add_circle</span>
            <span className="font-semibold">+ Catat Pemasukan Baru</span>
          </a>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Card 1 */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Pemasukan Musim 2026</span>
            <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="font-metric-display text-metric-display text-on-surface tabular-nums">Rp 25.000.000</div>
            <div className="mt-space-xs flex items-center gap-space-xs font-body-sm text-body-sm">
              <span className="inline-flex items-center text-secondary font-semibold">
                <span className="material-symbols-outlined text-sm">trending_up</span> +12%
              </span>
              <span className="text-on-surface-variant">vs target semester (48 transaksi)</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Pemasukan September 2026</span>
            <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-xl">calendar_month</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="font-metric-display text-metric-display text-on-surface tabular-nums">Rp 3.250.000</div>
            <div className="mt-space-xs flex items-center gap-space-xs font-body-sm text-body-sm">
              <span className="inline-flex items-center text-on-surface-variant">
                <span className="material-symbols-outlined text-sm text-secondary mr-1">group</span> Iuran & donatur terhimpun
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Kontributor Terbesar</span>
            <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-xl">military_tech</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="font-headline-md text-headline-md text-on-surface tabular-nums">Rp 12.000.000</div>
            <div className="mt-space-xs flex items-center justify-between font-body-sm text-body-sm">
              <span className="text-on-surface-variant truncate">Sponsor & Hadiah GPJB</span>
              <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-semibold">48% Kas</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Antrean Verifikasi Kasir</span>
            <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-xl">verified_user</span>
            </div>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-metric-display text-metric-display text-on-surface tabular-nums">0</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Transaksi Pending</span>
            </div>
            <div className="mt-space-xs flex items-center gap-space-xs font-body-sm text-body-sm">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-on-surface font-medium">100% mutasi tervalidasi Pembina</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Marching Band Contextual Banner */}
      <div className="relative overflow-hidden rounded-xl bg-primary-container text-on-primary p-space-lg shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg relative z-10">
          <div className="flex items-center gap-space-md">
            <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center shadow-md shrink-0">
              <span className="material-symbols-outlined text-3xl text-on-surface">music_note</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary-fixed text-sm">stars</span>
                <span className="font-label-xs text-label-xs text-secondary-fixed uppercase tracking-wider font-semibold">Program Kampanye Kejuaraan 2026</span>
              </div>
              <h2 className="font-headline-md text-headline-md tracking-tight text-on-primary">Target Anggaran Menuju Grand Prix Marching Band</h2>
              <p className="font-body-sm text-body-sm text-on-primary-container max-w-xl">
                Realisasi penerimaan dana per 24 September telah mencapai 62.5% dari pagu logistik instrumen & kostum kontingen Gema Taruna.
              </p>
            </div>
          </div>
          {/* Mini Progress Visual */}
          <div className="w-full lg:w-72 flex flex-col gap-space-xs bg-on-primary/10 p-space-md rounded-lg backdrop-blur-md">
            <div className="flex items-center justify-between font-label-xs text-label-xs text-on-primary">
              <span>Realisasi Target Kas</span>
              <span className="font-bold text-secondary-fixed">Rp 25M / Rp 40M</span>
            </div>
            <div className="w-full h-2 rounded-full bg-on-primary/20 overflow-hidden">
              <div className="h-full bg-secondary-fixed rounded-full" style={{ width: '62.5%' }}></div>
            </div>
            <span className="font-body-sm text-label-xs text-on-primary-container text-right">Tersisa 36 Hari Menuju Parade Nasional</span>
          </div>
        </div>
      </div>

      {/* Main Operational Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Panel Kiri: Comprehensive Ledger & Filters (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          {/* Filter Toolbar Card */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">search</span>
              <input className="w-full pl-9 pr-space-md py-2 rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-on-surface transition-all" placeholder="Cari kuitansi, nama, divisi..." type="text"/>
            </div>
            <div className="flex flex-wrap items-center gap-space-sm w-full md:w-auto">
              <div className="flex items-center gap-space-xs bg-surface px-space-md py-2 rounded-lg">
                <span className="material-symbols-outlined text-base text-on-surface-variant">filter_alt</span>
                <select className="bg-transparent font-label-md text-body-md text-on-surface focus:outline-none cursor-pointer">
                  <option value="all">Semua Sumber</option>
                  <option value="iuran">Iuran Anggota</option>
                  <option value="alumni">Donasi Alumni</option>
                </select>
              </div>
              <div className="flex items-center gap-space-xs bg-surface px-space-md py-2 rounded-lg">
                <span className="material-symbols-outlined text-base text-on-surface-variant">event</span>
                <select className="bg-transparent font-label-md text-body-md text-on-surface focus:outline-none cursor-pointer">
                  <option value="sep-2026">September 2026</option>
                  <option value="aug-2026">Agustus 2026</option>
                </select>
              </div>
              <button className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" title="Segarkan Data" type="button">
                <span className="material-symbols-outlined text-lg">refresh</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-space-lg py-space-md flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-on-surface text-lg">format_list_bulleted</span>
                <span className="font-headline-md text-title-sm text-on-surface">Jurnal Penerimaan Kas Masuk</span>
              </div>
              <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">Live DB Synced</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-md text-body-md border-collapse">
                <thead>
                  <tr className="bg-surface text-on-surface-variant font-label-xs text-label-xs uppercase tracking-wider">
                    <th className="py-3 px-space-md">No. Kuitansi</th>
                    <th className="py-3 px-space-md">Waktu</th>
                    <th className="py-3 px-space-md">Sumber Kas</th>
                    <th className="py-3 px-space-md">Rincian Deskripsi</th>
                    <th className="py-3 px-space-md text-right">Nominal Masuk</th>
                    <th className="py-3 px-space-md text-center">Tanda Bukti</th>
                    <th className="py-3 px-space-md">Verifikator</th>
                    <th className="py-3 px-space-md text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-on-surface divide-y-0">
                  <tr className="hover:bg-surface transition-colors">
                    <td className="py-4 px-space-md font-label-sm text-label-sm font-bold text-on-surface whitespace-nowrap">BKM-2026-09-042</td>
                    <td className="py-4 px-space-md whitespace-nowrap">
                      <span className="font-label-sm text-label-sm text-on-surface block">24 Sep 2026</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">09:15 WIB</span>
                    </td>
                    <td className="py-4 px-space-md whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-on-surface"></span> Iuran Anggota
                      </span>
                    </td>
                    <td className="py-4 px-space-md max-w-xs">
                      <p className="font-label-md text-label-md text-on-surface font-semibold truncate">Iuran Wajib September - Skuad Percussion</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Bagas Arya dkk (10 anggota section battery)</p>
                    </td>
                    <td className="py-4 px-space-md text-right whitespace-nowrap font-bold text-secondary tabular-nums">+Rp 500.000</td>
                    <td className="py-4 px-space-md text-center whitespace-nowrap">
                      <button className="inline-flex items-center gap-1 px-2 py-1 rounded bg-surface-container font-label-xs text-label-xs text-on-surface hover:bg-surface-container-high transition-colors" type="button"><span className="material-symbols-outlined text-sm">payments</span> Setoran Tunai Langsung</button>
                    </td>
                    <td className="py-4 px-space-md whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        <span className="font-label-sm text-label-sm font-medium">Kak Fahmi (Bendahara)</span>
                      </div>
                    </td>
                    <td className="py-4 px-space-md whitespace-nowrap text-center">
                      <div className="inline-flex items-center gap-1">
                        <button className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-base">visibility</span></button>
                        <button className="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-base text-secondary">chat</span></button>
                      </div>
                    </td>
                  </tr>
                  {/* Additional rows omitted for brevity as UI structure matches */}
                </tbody>
              </table>
            </div>
            {/* Pagination Bar */}
            <div className="p-space-md bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-space-sm">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Menampilkan <span className="font-bold text-on-surface">1</span> dari <span className="font-bold text-on-surface">48</span> entri penerimaan kas</span>
              <div className="flex items-center gap-space-xs">
                <button className="px-3 py-1.5 rounded-lg bg-surface text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer">Sebelumnya</button>
                <button className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shadow-sm">1</button>
                <button className="px-3 py-1.5 rounded-lg bg-surface text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer">Selanjutnya</button>
              </div>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-md">
            <div className="p-2 rounded-lg bg-secondary-fixed text-on-secondary-fixed"><span className="material-symbols-outlined text-lg">shield</span></div>
            <div className="flex flex-col">
              <span className="font-headline-md text-title-sm text-on-surface">Standar Pengendalian Intern Kas (SOP Keuangan MBGT)</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Setiap uang masuk di atas Rp 1.000.000,- wajib diverifikasi oleh Pembina Unit dalam 1x24 jam sebelum dialokasikan ke pos operasional latihan atau pemeliharaan instrumen tiup & perkusi.</p>
            </div>
          </div>
        </div>

        {/* Panel Kanan: Modern Fast-Entry Form Card (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-md" id="form-pemasukan">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col justify-between">
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center"><span className="material-symbols-outlined text-lg">add_card</span></span>
                  <div className="flex flex-col">
                    <h3 className="font-headline-md text-title-sm text-on-surface font-bold">Formulir Bukti Kas Masuk</h3>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Input transaksi baru langsung ke buku besar</span>
                  </div>
                </div>
                <span className="font-label-xs text-label-xs px-2 py-0.5 rounded bg-surface-container text-on-surface font-bold">BKM-AUTO</span>
              </div>
              <form className="flex flex-col gap-space-md" onSubmit={(e) => { e.preventDefault(); alert('Disimpan'); }}>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center justify-between">
                    <span>Tanggal Penerimaan</span>
                    <span className="font-body-sm text-label-xs text-on-surface-variant">WIB</span>
                  </label>
                  <input className="w-full px-space-md py-2 rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-on-surface" type="date" defaultValue="2026-09-24" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Kategori Sumber Kas</label>
                  <select className="w-full px-space-md py-2.5 rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-on-surface">
                    <option value="iuran">Iuran Bulanan Anggota</option>
                    <option value="alumni">Donasi Alumni Paguyuban</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Nominal Diterima</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 font-headline-md text-title-sm text-on-surface-variant font-bold">Rp</span>
                    <input className="w-full pl-10 pr-space-md py-2.5 rounded-lg bg-surface font-headline-md text-headline-md text-on-surface font-bold tracking-tight focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-on-surface tabular-nums" type="text" defaultValue="500.000" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Rekening / Pos Penyimpanan Kas</label>
                  <div className="flex items-center gap-space-xs p-2.5 rounded-lg bg-surface border border-secondary/20">
                    <input defaultChecked className="text-primary-container" name="account" type="radio" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-sm text-label-sm font-semibold truncate text-on-surface">Kas Tunai Bendahara</span>
                      <span className="font-body-sm text-label-xs text-on-surface-variant truncate">Brankas Lapangan & Sekre</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface font-semibold">Nama Penyetor / PIC</label>
                    <input className="w-full px-space-md py-2 rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-on-surface" placeholder="Contoh: Bagas Arya" type="text" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-on-surface font-semibold">No. WhatsApp</label>
                    <input className="w-full px-space-md py-2 rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-on-surface" placeholder="0812xxxxxxx" type="tel" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Rincian / Keterangan Pembayaran</label>
                  <textarea className="w-full px-space-md py-2 rounded-lg bg-surface font-body-md text-body-md text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-on-surface resize-none" rows={2} defaultValue="Iuran Wajib September - Skuad Percussion"></textarea>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">Lampiran Bukti Nota / Transfer</label>
                  <div className="flex flex-col items-center justify-center p-space-md rounded-xl bg-surface hover:bg-surface-container transition-colors cursor-pointer text-center">
                    <span className="material-symbols-outlined text-2xl text-on-surface-variant mb-1">cloud_upload</span>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">Klik untuk unggah atau seret file</span>
                    <span className="font-body-sm text-label-xs text-on-surface-variant">PNG, JPG, PDF (Maks. 5 MB)</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs p-space-sm rounded-lg bg-surface font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-base text-secondary">info</span>
                  <span>Saldo kas akan langsung bertambah dan mutasi tercatat pada Buku Besar.</span>
                </div>
                <div className="flex items-center gap-space-sm pt-space-xs">
                  <button className="flex-1 py-3 px-space-md rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-on-surface transition-all flex items-center justify-center gap-space-xs cursor-pointer" type="submit">
                    <span className="material-symbols-outlined text-lg text-secondary-fixed">save</span>
                    <span>Simpan Pemasukan Baru</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
