'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const DATA_PATH_MAP: Record<string, string> = {
  // Desktop Bendahara
  'dashboard': '/dashboard',
  'dashboard-utama': '/dashboard',
  'dashboard-utama-bendahara': '/dashboard',
  'database-anggota': '/anggota',
  'database-anggota-marching-band-gema-taruna': '/anggota',
  'pembayaran-iuran': '/iuran',
  'pembayaran-iuran-anggota': '/iuran',
  'pemasukan-kas': '/pemasukan',
  'pemasukan-kas-buku-kas-masuk': '/pemasukan',
  'pengeluaran-kas': '/pengeluaran',
  'pengeluaran-kas-buku-kas-keluar': '/pengeluaran',
  'riwayat-transaksi': '/riwayat',
  'riwayat-transaksi-keuangan-buku-kas-umum': '/riwayat',
  'laporan-keuangan': '/laporan',
  'laporan-keuangan-akuntabilitas-kas': '/laporan',
  'pengaturan': '/pengaturan',
  'pengaturan-sistem-keuangan-hak-akses': '/pengaturan',

  // Desktop Transparansi Anggota
  'ringkasan-kas-saya': '/transparansi',
  'transparansi-kas-mbgt': '/transparansi',
  'status-iuran-seksi': '/transparansi',
  'realisasi-anggaran-gpmb': '/transparansi',
  'unduh-kuitansi-iuran': '/portal/iuran',
  'hubungi-bendahara': '/transparansi',

  // Mobile Bendahara
  'iuran-skuad': '/mobile/iuran',
  'catat-cepat': '/mobile/belanja',
  'belanja-lapangan': '/mobile/belanja',
  'rekap-mutasi': '/mobile/dashboard',

  // Mobile Portal Anggota
  'ringkasan': '/portal/ringkasan',
  'iuran-saya': '/portal/iuran',
  'transparansi-kas': '/portal/ringkasan',
  'slip-dan-bantuan': '/portal/iuran',
};

const ALL_SCREENS = [
  { group: 'Autentikasi', items: [{ path: '/login', label: 'Login Multi-Role', icon: 'login' }] },
  {
    group: 'Desktop — Bendahara (8 Layar)',
    items: [
      { path: '/dashboard', label: '1. Dashboard Utama', icon: 'dashboard' },
      { path: '/iuran', label: '2. Pembayaran Iuran', icon: 'credit_card' },
      { path: '/pemasukan', label: '3. Pemasukan Kas (BKM)', icon: 'south_west' },
      { path: '/pengeluaran', label: '4. Pengeluaran Kas (BKK)', icon: 'north_east' },
      { path: '/anggota', label: '5. Database Anggota', icon: 'groups' },
      { path: '/riwayat', label: '6. Riwayat Transaksi (BKU)', icon: 'history' },
      { path: '/laporan', label: '7. Laporan Keuangan (LPJ)', icon: 'bar_chart' },
      { path: '/pengaturan', label: '8. Pengaturan & Hak Akses', icon: 'settings' },
    ],
  },
  {
    group: 'Desktop — Portal Anggota',
    items: [{ path: '/transparansi', label: '9. Transparansi Kas (Read-Only)', icon: 'visibility' }],
  },
  {
    group: 'Mobile — Bendahara Lapangan (3 Layar)',
    items: [
      { path: '/mobile/dashboard', label: '11. Dashboard Lapangan', icon: 'smartphone' },
      { path: '/mobile/iuran', label: '12. Checklist Iuran Cepat', icon: 'fact_check' },
      { path: '/mobile/belanja', label: '13. Catat Belanja Lapangan', icon: 'shopping_cart' },
    ],
  },
  {
    group: 'Mobile — Portal Anggota PWA (2 Layar)',
    items: [
      { path: '/portal/ringkasan', label: '14. Ringkasan Kas Anggota', icon: 'account_balance_wallet' },
      { path: '/portal/iuran', label: '15. Iuran Saya & Kuitansi', icon: 'receipt_long' },
    ],
  },
];

export default function GlobalNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest('[data-path]') as HTMLElement | null;
      if (!el) return;

      const dataPath = el.getAttribute('data-path');
      if (!dataPath) return;

      e.preventDefault();

      if (dataPath === 'login') {
        document.cookie = 'kgt_session_role=; path=/; max-age=0';
        try {
          const supabase = createClient();
          await supabase.auth.signOut();
        } catch {
          // ignore
        }
        router.push('/login');
        router.refresh();
        return;
      }

      // Context-aware dashboard path (mobile vs desktop)
      if (dataPath === 'dashboard' && pathname.startsWith('/mobile')) {
        router.push('/mobile/dashboard');
        return;
      }

      const mappedRoute = DATA_PATH_MAP[dataPath];
      if (mappedRoute) {
        router.push(mappedRoute);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname, router]);

  return (
    <>
      {/* Floating 15-Screen Switcher Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        title="Navigasi Cepat 15 Layar"
        className="fixed bottom-5 right-5 z-[9999] w-12 h-12 rounded-2xl bg-[#131b2e] text-[#ffdcc3] border border-[#fe932c]/40 shadow-2xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
      >
        <span className="material-symbols-outlined text-[22px]">
          {open ? 'close' : 'grid_view'}
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/25 backdrop-blur-[1px] z-[9997]"
            onClick={() => setOpen(false)}
          />
          <div className="fixed bottom-20 right-5 z-[9998] w-80 max-h-[78vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-[#131b2e] text-white px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-[#fe932c]">
                  KAS GEMA TARUNA
                </p>
                <p className="text-[11px] text-slate-300">Navigasi Cepat 15 Layar Aplikasi</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-semibold">
                Next.js
              </span>
            </div>
            <div className="overflow-y-auto p-3 space-y-3 text-xs">
              {ALL_SCREENS.map((section) => (
                <div key={section.group}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
                    {section.group}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const active = pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => {
                            if (item.path !== '/login') {
                              document.cookie =
                                'kgt_session_role=bendahara; path=/; max-age=2592000; SameSite=Lax';
                            }
                            setOpen(false);
                          }}
                          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg font-medium transition-colors ${
                            active
                              ? 'bg-[#131b2e] text-white font-semibold'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[18px] ${
                              active ? 'text-[#fe932c]' : 'text-slate-500'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
