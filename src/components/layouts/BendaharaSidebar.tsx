'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAngkatan } from '@/context/AngkatanContext';

export default function BendaharaSidebar() {
  const pathname = usePathname();
  const { activeAngkatan, members, role } = useAngkatan();

  const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/anggota', icon: 'groups', label: 'Database Anggota', badge: `MB${activeAngkatan}` },
    { path: '/iuran', icon: 'credit_card', label: 'Pembayaran Iuran', badge: `${members.length} Siswa` },
    { path: '/pemasukan', icon: 'south_west', label: 'Pemasukan Kas' },
    { path: '/pengeluaran', icon: 'north_east', label: 'Pengeluaran Kas' },
    { path: '/riwayat', icon: 'history', label: 'Riwayat Transaksi' },
    { path: '/laporan', icon: 'bar_chart', label: 'Laporan Keuangan' },
    { path: '/pengaturan', icon: 'settings', label: 'Pengaturan' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-72 bg-surface-container-lowest border-r border-outline-variant flex flex-col z-50">
      {/* Top Brand Logo inside Sidebar */}
      <div className="h-16 px-space-md border-b border-outline-variant/50 flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Logo Marching Band Gema Taruna"
          className="w-10 h-10 rounded-xl object-contain bg-primary-container p-1 shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-headline-md text-sm font-extrabold text-on-surface truncate">
            GEMA TARUNA
          </span>
          <span className="text-[11px] font-bold text-secondary truncate">
            Buku Kas Angkatan {activeAngkatan}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-space-xs p-space-md">
          <nav className="flex flex-col gap-1 mt-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center justify-between px-space-md py-space-sm rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span
                      className={`material-symbols-outlined text-xl ${
                        isActive
                          ? 'text-secondary-fixed'
                          : item.icon === 'south_west'
                          ? 'text-secondary'
                          : item.icon === 'north_east'
                          ? 'text-error'
                          : ''
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-label-md text-label-md">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`font-label-xs text-label-xs px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-space-md flex flex-col gap-space-sm border-t border-outline-variant">
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs text-secondary">
            <span className="material-symbols-outlined text-sm">military_tech</span>
            <span className="font-label-xs text-label-xs uppercase font-bold tracking-wider">
              Pembukuan Aktif
            </span>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface font-semibold">
            Skuad Angkatan {activeAngkatan} (MB{activeAngkatan})
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {role === 'superadmin'
              ? 'Super Admin (Bisa Edit Semua Angkatan)'
              : `Kas Terpisah Angkatan ${activeAngkatan}`}
          </p>
        </div>

        {/* Credit Link @novano007 - 2026 */}
        <div className="pt-1 text-center">
          <a
            href="https://www.instagram.com/novano007"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 text-xs font-bold text-secondary hover:underline transition"
          >
            <span>@novano007 - 2026</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
