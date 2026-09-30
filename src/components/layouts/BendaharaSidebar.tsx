'use client';

import Link from 'next/link';

interface BendaharaSidebarProps {
  activePath?: string;
}

export default function BendaharaSidebar({ activePath = '/dashboard' }: BendaharaSidebarProps) {
  const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/anggota', icon: 'groups', label: 'Database Anggota', badge: '40' },
    { path: '/iuran', icon: 'credit_card', label: 'Pembayaran Iuran', badge: 'Sep 2026' },
    { path: '/pemasukan', icon: 'south_west', label: 'Pemasukan Kas' },
    { path: '/pengeluaran', icon: 'north_east', label: 'Pengeluaran Kas' },
    { path: '/riwayat', icon: 'history', label: 'Riwayat Transaksi' },
    { path: '/laporan', icon: 'bar_chart', label: 'Laporan Keuangan' },
    { path: '/pengaturan', icon: 'settings', label: 'Pengaturan' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-72 bg-surface-container-lowest border-r border-outline-variant flex flex-col z-50">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-space-xs p-space-md">
          <nav className="flex flex-col gap-1 mt-4">
            {navItems.map((item) => {
              const isActive = activePath === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center justify-between px-space-md py-space-sm rounded-lg transition-all ${
                    isActive
                      ? 'bg-secondary-container text-on-secondary-container font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className={`material-symbols-outlined text-xl ${isActive ? '' : (item.icon === 'south_west' ? 'text-secondary' : item.icon === 'north_east' ? 'text-error' : '')}`}>
                      {item.icon}
                    </span>
                    <span className="font-label-md text-label-md">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`font-label-xs text-label-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-on-secondary-container text-secondary-container' : 'bg-surface-container-high text-on-surface-variant'}`}>
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
            <span className="font-label-xs text-label-xs uppercase font-bold tracking-wider">Status Musim</span>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface font-semibold">Periode Aktif: 2026/2027</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Grand Prix MB Indonesia Prep</p>
        </div>
        <a className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container hover:text-on-surface transition-colors" href="https://wa.me/" rel="noopener noreferrer" target="_blank">
          <span className="material-symbols-outlined text-sm">chat</span>
          <span className="font-label-sm text-label-sm">Pusat Bantuan WA</span>
        </a>
      </div>
    </aside>
  );
}
