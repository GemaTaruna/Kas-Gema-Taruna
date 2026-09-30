import Link from 'next/link'

export default async function DashboardPage() {
  // const supabase = await createClient()
  
  // TODO: Fetch profile
  // const { data: { user } } = await supabase.auth.getUser()
  // const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()
  
  // TODO: Fetch transactions summary
  // const { data: transactions } = await supabase.from('transactions').select('*').order('created_at', { ascending: false }).limit(5)
  
  // TODO: Fetch dues summary for current month
  // const currentPeriod = new Date().toISOString().slice(0, 7)
  // const { data: dues } = await supabase.from('dues').select('*').eq('period', currentPeriod)

  return (
    <div className="flex flex-col w-full">
      <div className="p-gutter flex flex-col gap-space-xl max-w-[1440px] mx-auto w-full">
        
        {/* 1. GREETING BANNER */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
          {/* Decorative Brass Accent Ribbon Layer */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-secondary-fixed opacity-40 blur-3xl pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-secondary to-secondary-container"></div>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative z-10">
            <div className="flex flex-col gap-space-xs max-w-3xl">
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="font-label-xs text-label-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface">
                  Akses Penuh
                </span>
                <span className="inline-flex items-center gap-1 font-label-xs text-label-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  Bendahara Umum Marching Band Gema Taruna
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
                Selamat datang kembali, Kak Fahmi Pratama! 👋
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Ringkasan keuangan, mutasi kas, dan progres iuran anggota per <span className="font-semibold text-on-surface">24 September 2026</span>. Seluruh data tersinkronisasi dengan divisi lapangan.
              </p>
            </div>
            
            {/* Quick Actions Panel */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-space-sm shrink-0">
              <button className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary hover:bg-on-background transition-all shadow-sm">
                <span className="material-symbols-outlined text-lg text-secondary-fixed">add_circle</span>
                <span className="font-label-md text-label-md font-semibold tracking-wide">Catat Pemasukan</span>
              </button>
              <button className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all shadow-sm">
                <span className="material-symbols-outlined text-lg text-error">remove_circle</span>
                <span className="font-label-md text-label-md font-semibold tracking-wide">Catat Pengeluaran</span>
              </button>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant transition-all shadow-sm">
                <span className="material-symbols-outlined text-lg">campaign</span>
                <span className="font-label-md text-label-md font-semibold tracking-wide">Kirim WA Pengingat</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. STATISTIC METRIC CARDS (4-Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
          {/* Card 1 */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-secondary-container"></div>
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-sm text-label-sm font-semibold uppercase text-on-surface-variant">Saldo Kas Saat Ini</span>
              <div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
              </div>
            </div>
            <div className="my-space-xs">
              <div className="font-metric-display text-metric-display font-bold text-on-surface tracking-tight">
                Rp 12.450.000
              </div>
            </div>
            <div className="flex items-center gap-space-xs pt-space-xs">
              <span className="inline-flex items-center gap-0.5 font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-low text-secondary font-bold">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                +8.5%
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Kasir Tunai Lapangan / Brankas MBGT</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-sm text-label-sm font-semibold uppercase text-on-surface-variant">Total Pemasukan (2026)</span>
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-xl text-secondary">arrow_downward_alt</span>
              </div>
            </div>
            <div className="my-space-xs">
              <div className="font-metric-display text-metric-display font-bold text-on-surface tracking-tight">
                Rp 25.000.000
              </div>
            </div>
            <div className="flex items-center justify-between pt-space-xs text-on-surface-variant">
              <span className="font-body-sm text-body-sm">Akumulasi Kas Masuk</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">48 Transaksi</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-sm text-label-sm font-semibold uppercase text-on-surface-variant">Total Pengeluaran (2026)</span>
              <div className="w-9 h-9 rounded-lg bg-error-container flex items-center justify-center text-on-error-container">
                <span className="material-symbols-outlined text-xl">arrow_upward_alt</span>
              </div>
            </div>
            <div className="my-space-xs">
              <div className="font-metric-display text-metric-display font-bold text-error tracking-tight">
                Rp 12.550.000
              </div>
            </div>
            <div className="flex items-center justify-between pt-space-xs text-on-surface-variant">
              <span className="font-body-sm text-body-sm">Alat, Kostum & Latihan</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">31 Pos Biaya</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-sm text-label-sm font-semibold uppercase text-on-surface-variant">Iuran September 2026</span>
              <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center text-primary-fixed">
                <span className="material-symbols-outlined text-xl">payments</span>
              </div>
            </div>
            <div className="my-space-xs flex items-baseline justify-between">
              <div className="font-metric-display text-metric-display font-bold text-on-surface tracking-tight">
                80%
              </div>
              <span className="font-label-md text-label-md font-semibold text-on-surface-variant">
                Rp 1.6M / 2.0M
              </span>
            </div>
            {/* Compact Linear Bar */}
            <div className="flex flex-col gap-1 pt-space-xs">
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
                <span className="font-semibold text-on-surface">32 Lunas</span>
                <span>8 Belum Bayar</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. MAIN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Column: Financial Trends Chart */}
          <div className="lg:col-span-8 flex flex-col rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
              <div>
                <span className="font-label-xs text-label-xs uppercase font-bold text-secondary tracking-wider">Pergerakan Anggaran</span>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Tren Keuangan & Saldo Kas Bulanan (2026)</h2>
              </div>
              {/* Filter Tabs */}
              <div className="inline-flex p-1 rounded-lg bg-surface-container-high self-start sm:self-auto">
                <button className="px-space-sm py-1 rounded-md text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface transition-colors">6 Bulan Terakhir</button>
                <button className="px-space-sm py-1 rounded-md bg-surface-container-lowest font-label-sm text-label-sm text-on-surface font-semibold shadow-sm">Tahun 2026</button>
                <button className="px-space-sm py-1 rounded-md text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface transition-colors">Semua</button>
              </div>
            </div>

            {/* Legend and Quick Stats */}
            <div className="flex flex-wrap items-center gap-space-lg mb-space-md pb-space-sm">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-primary-container"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Pemasukan Kas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-error"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Pengeluaran Operasional</span>
              </div>
              <div className="flex items-center gap-2 ml-auto text-body-sm font-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-sm text-secondary">star</span>
                <span>Puncak: <strong className="text-on-surface">Agustus (Sponsorship GPJB)</strong></span>
              </div>
            </div>

            {/* High Visual Chart Area (Inline Vector SVG) */}
            <div className="w-full h-72 relative flex items-end">
              <svg className="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 700 240">
                <line stroke="#E2E8F0" strokeDasharray="3 3" x1="0" x2="700" y1="210" y2="210"></line>
                <line stroke="#E2E8F0" strokeDasharray="3 3" x1="0" x2="700" y1="150" y2="150"></line>
                <line stroke="#E2E8F0" strokeDasharray="3 3" x1="0" x2="700" y1="90" y2="90"></line>
                <line stroke="#E2E8F0" strokeDasharray="3 3" x1="0" x2="700" y1="30" y2="30"></line>

                <text fill="#76777D" fontFamily="Plus Jakarta Sans" fontSize="10" x="5" y="28">6 Jt</text>
                <text fill="#76777D" fontFamily="Plus Jakarta Sans" fontSize="10" x="5" y="88">4 Jt</text>
                <text fill="#76777D" fontFamily="Plus Jakarta Sans" fontSize="10" x="5" y="148">2 Jt</text>
                <text fill="#76777D" fontFamily="Plus Jakarta Sans" fontSize="10" x="5" y="208">0</text>

                <defs>
                  <linearGradient id="inflowGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#131B2E" stopOpacity="0.18"></stop>
                    <stop offset="100%" stopColor="#131B2E" stopOpacity="0.0"></stop>
                  </linearGradient>
                </defs>

                <path d="M 40 185 C 80 180, 110 160, 150 165 C 190 170, 220 145, 260 140 C 300 135, 330 150, 370 145 C 410 140, 440 120, 480 110 C 520 100, 550 40, 590 35 C 630 30, 660 70, 690 75 L 690 210 L 40 210 Z" fill="url(#inflowGrad)"></path>
                <path d="M 40 185 C 80 180, 110 160, 150 165 C 190 170, 220 145, 260 140 C 300 135, 330 150, 370 145 C 410 140, 440 120, 480 110 C 520 100, 550 40, 590 35 C 630 30, 660 70, 690 75" stroke="#131B2E" strokeLinecap="round" strokeWidth="3"></path>
                
                <path d="M 40 195 C 80 190, 110 180, 150 175 C 190 170, 220 165, 260 168 C 300 170, 330 160, 370 155 C 410 150, 440 135, 480 130 C 520 125, 550 85, 590 80 C 630 75, 660 120, 690 135" stroke="#BA1A1A" strokeDasharray="4 4" strokeLinecap="round" strokeWidth="2.5"></path>

                <circle cx="590" cy="35" fill="#FE932C" r="5" stroke="#FFFFFF" strokeWidth="2"></circle>
                <circle cx="590" cy="80" fill="#BA1A1A" r="4" stroke="#FFFFFF" strokeWidth="1.5"></circle>

                <circle cx="690" cy="75" fill="#131B2E" r="6" stroke="#FFFFFF" strokeWidth="2"></circle>
                <circle cx="690" cy="135" fill="#BA1A1A" r="4" stroke="#FFFFFF" strokeWidth="1.5"></circle>
              </svg>
            </div>

            {/* Chart X-Axis Labels */}
            <div className="grid grid-cols-9 text-center pt-space-sm font-label-xs text-label-xs text-on-surface-variant font-semibold">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>Mei</span>
              <span>Jun</span>
              <span>Jul</span>
              <span className="text-secondary font-bold">Agu (Sponsor)</span>
              <span className="text-on-surface font-bold underline decoration-secondary decoration-2 underline-offset-4">Sep 2026</span>
            </div>

            <div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-sm text-secondary">info</span>
                <span className="font-body-sm text-body-sm text-on-surface">Pemasukan bulan Agustus tercatat tertinggi (Rp 5.800.000) berkat sokongan alumni & pihak sekolah.</span>
              </div>
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Audit Q3 Terverifikasi</span>
            </div>
          </div>

          {/* Right Column: Status Iuran */}
          <div className="lg:col-span-4 flex flex-col rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs uppercase font-bold text-secondary tracking-wider">Disiplin Kas Skuad</span>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Status Iuran</h2>
              </div>
              <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                Sep 2026
              </span>
            </div>

            {/* Circular Visual Card & Summary */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between my-space-sm">
              <div className="flex flex-col gap-0.5">
                <span className="font-headline-lg text-headline-lg font-bold text-on-surface">80%</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">32 dari 40 Taruna Telah Lunas</span>
                <span className="font-label-xs text-label-xs font-semibold text-secondary mt-1">Sisa Target: Rp 400.000</span>
              </div>
              {/* Circular Donut SVG Visual */}
              <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                  <path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="80, 100" strokeLinecap="round" strokeWidth="4"></path>
                </svg>
                <span className="absolute font-label-xs text-label-xs font-bold text-on-surface">32/40</span>
              </div>
            </div>

            {/* Section Breakdown List */}
            <div className="flex flex-col divide-y divide-surface-container-high my-space-xs">
              <div className="py-space-sm flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Brass Section</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">14 Anggota</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">12 Lunas</span>
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold">2 Belum</span>
                </div>
              </div>
              <div className="py-space-sm flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Percussion (Battery)</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">10 Anggota</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">9 Lunas</span>
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold">1 Belum</span>
                </div>
              </div>
              <div className="py-space-sm flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Color Guard</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">8 Anggota</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">6 Lunas</span>
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold">2 Belum</span>
                </div>
              </div>
              <div className="py-space-sm flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-surface-tint"></span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Pit Instrument</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">5 Anggota</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">3 Lunas</span>
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold">2 Belum</span>
                </div>
              </div>
              <div className="py-space-sm flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Official & Medis</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">3 Anggota</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">2 Lunas</span>
                  <span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold">1 Belum</span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col gap-space-xs mt-space-md pt-space-xs">
              <Link href="/iuran" className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="font-label-md text-label-md font-semibold">Lihat Semua Data Iuran</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant transition-colors shadow-sm">
                <span className="material-symbols-outlined text-sm">send</span>
                <span className="font-label-sm text-label-sm font-bold">Kirim WA Pengingat ke 8 Anggota</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4. RECENT TRANSACTIONS TABLE */}
        <div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col">
          <div className="p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-lowest">
            <div className="flex flex-col">
              <span className="font-label-xs text-label-xs uppercase font-bold text-secondary tracking-wider">Log Pembukuan Kas</span>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Transaksi Kas Terakhir</h2>
            </div>
            <div className="flex items-center gap-space-xs flex-wrap">
              <div className="inline-flex p-1 rounded-lg bg-surface-container-high">
                <button className="px-space-sm py-1 rounded-md bg-surface-container-lowest font-label-sm text-label-sm text-on-surface font-semibold shadow-sm">Semua (5)</button>
                <button className="px-space-sm py-1 rounded-md text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface transition-colors">Pemasukan</button>
                <button className="px-space-sm py-1 rounded-md text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface transition-colors">Pengeluaran</button>
              </div>
              <Link href="/riwayat" className="flex items-center gap-1 px-space-sm py-2 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm font-semibold">
                <span>Buka Arsip Lengkap</span>
                <span className="material-symbols-outlined text-base">open_in_new</span>
              </Link>
            </div>
          </div>
          
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-xs text-label-xs uppercase tracking-wider">
                  <th className="py-space-sm px-space-lg">Tanggal</th>
                  <th className="py-space-sm px-space-md">Jenis</th>
                  <th className="py-space-sm px-space-md">Kategori / Sumber</th>
                  <th className="py-space-sm px-space-lg">Keterangan</th>
                  <th className="py-space-sm px-space-lg text-right">Nominal</th>
                  <th className="py-space-sm px-space-md">Dicatat Oleh</th>
                  <th className="py-space-sm px-space-lg text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high font-body-md text-body-md text-on-surface">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-md px-space-lg whitespace-nowrap font-medium text-on-surface">
                    24 Sep 2026
                    <span className="block font-body-sm text-body-sm text-on-surface-variant">09:15 WIB</span>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Pemasukan
                    </span>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap font-medium">
                    Iuran Anggota
                  </td>
                  <td className="py-space-md px-space-lg">
                    <div className="flex flex-col">
                      <span className="font-medium text-on-surface">Pembayaran Iuran September - Bagas Arya</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Seksi: Percussion / Battery (#MB-021)</span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-lg whitespace-nowrap text-right font-headline-md text-headline-md font-bold text-secondary">
                    +Rp 50.000
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Fahmi</span>
                    <span className="block font-label-xs text-label-xs text-on-surface-variant">Bendahara</span>
                  </td>
                  <td className="py-space-md px-space-lg whitespace-nowrap text-center">
                    <button className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" title="Detail Transaksi">
                      <span className="material-symbols-outlined text-xl">receipt_long</span>
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-md px-space-lg whitespace-nowrap font-medium text-on-surface">
                    22 Sep 2026
                    <span className="block font-body-sm text-body-sm text-on-surface-variant">16:40 WIB</span>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full bg-error-container text-on-error-container font-label-xs text-label-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                      Pengeluaran
                    </span>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap font-medium">
                    Perawatan Alat
                  </td>
                  <td className="py-space-md px-space-lg">
                    <div className="flex flex-col">
                      <span className="font-medium text-on-surface">Pembelian Stick Snare & Valve Oil Trumpet</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Toko Musik Harmoni Nada (Nota Terlampir)</span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-lg whitespace-nowrap text-right font-headline-md text-headline-md font-bold text-error">
                    -Rp 350.000
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Fahmi</span>
                    <span className="block font-label-xs text-label-xs text-on-surface-variant">Bendahara</span>
                  </td>
                  <td className="py-space-md px-space-lg whitespace-nowrap text-center">
                    <button className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" title="Detail Transaksi">
                      <span className="material-symbols-outlined text-xl">receipt_long</span>
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-md px-space-lg whitespace-nowrap font-medium text-on-surface">
                    20 Sep 2026
                    <span className="block font-body-sm text-body-sm text-on-surface-variant">11:05 WIB</span>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Pemasukan
                    </span>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap font-medium">
                    Donasi Alumni
                  </td>
                  <td className="py-space-md px-space-lg">
                    <div className="flex flex-col">
                      <span className="font-medium text-on-surface">Donasi Pembelian Bell Lyra dari Alumni Angkatan 15</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Setor Tunai Langsung ke Bendahara Unit (Brankas MBGT)</span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-lg whitespace-nowrap text-right font-headline-md text-headline-md font-bold text-secondary">
                    +Rp 1.500.000
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Drs. Sutrisno</span>
                    <span className="block font-label-xs text-label-xs text-secondary font-bold">Pembina</span>
                  </td>
                  <td className="py-space-md px-space-lg whitespace-nowrap text-center">
                    <button className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" title="Detail Transaksi">
                      <span className="material-symbols-outlined text-xl">receipt_long</span>
                    </button>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-md px-space-lg whitespace-nowrap font-medium text-on-surface">
                    18 Sep 2026
                    <span className="block font-body-sm text-body-sm text-on-surface-variant">17:30 WIB</span>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full bg-error-container text-on-error-container font-label-xs text-label-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                      Pengeluaran
                    </span>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap font-medium">
                    Konsumsi Latihan
                  </td>
                  <td className="py-space-md px-space-lg">
                    <div className="flex flex-col">
                      <span className="font-medium text-on-surface">Konsumsi Latihan Gabungan Lapangan Upacara</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Air mineral 5 galon & 45 paket snack taruna</span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-lg whitespace-nowrap text-right font-headline-md text-headline-md font-bold text-error">
                    -Rp 280.000
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Fahmi</span>
                    <span className="block font-label-xs text-label-xs text-on-surface-variant">Bendahara</span>
                  </td>
                  <td className="py-space-md px-space-lg whitespace-nowrap text-center">
                    <button className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" title="Detail Transaksi">
                      <span className="material-symbols-outlined text-xl">receipt_long</span>
                    </button>
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-md px-space-lg whitespace-nowrap font-medium text-on-surface">
                    15 Sep 2026
                    <span className="block font-body-sm text-body-sm text-on-surface-variant">14:10 WIB</span>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Pemasukan
                    </span>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap font-medium">
                    Iuran Anggota
                  </td>
                  <td className="py-space-md px-space-lg">
                    <div className="flex flex-col">
                      <span className="font-medium text-on-surface">Pembayaran Iuran September - Siti Nurhaliza</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Seksi: Color Guard (#MB-034) - Tunai</span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-lg whitespace-nowrap text-right font-headline-md text-headline-md font-bold text-secondary">
                    +Rp 50.000
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">Fahmi</span>
                    <span className="block font-label-xs text-label-xs text-on-surface-variant">Bendahara</span>
                  </td>
                  <td className="py-space-md px-space-lg whitespace-nowrap text-center">
                    <button className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors" title="Detail Transaksi">
                      <span className="material-symbols-outlined text-xl">receipt_long</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-space-lg py-space-sm bg-surface-container-low flex flex-col sm:flex-row items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
            <span>Menampilkan 5 mutasi paling mutakhir dari 79 entri pembukuan aktif.</span>
            <div className="flex items-center gap-space-xs mt-2 sm:mt-0 font-label-xs text-label-xs font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
              <span>Buku Kas Terkunci Aman (Enkripsi Ledger Gema Taruna)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
