'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomTabs() {
  const pathname = usePathname();

  const tabs = [
    { path: '/mobile/dashboard', icon: 'home', label: 'Dashboard' },
    { path: '/mobile/iuran', icon: 'groups', label: 'Iuran' },
    { path: '/mobile/catat', icon: 'add', label: 'Catat', isFab: true },
    { path: '/mobile/belanja', icon: 'shopping_bag', label: 'Belanja' },
    { path: '/mobile/rekap', icon: 'receipt_long', label: 'Rekap' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 h-20 bg-surface-container-lowest border-t border-outline-variant z-40 pb-safe">
      <div className="flex items-center justify-around h-full px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          
          if (tab.isFab) {
            return (
              <div key={tab.path} className="relative -top-5">
                <Link
                  href={tab.path}
                  className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-lg hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-3xl">{tab.icon}</span>
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`flex flex-col items-center justify-center w-16 gap-1 ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              <div className={`w-14 h-8 flex items-center justify-center rounded-full ${isActive ? 'bg-primary-container' : 'bg-transparent'}`}>
                <span className={`material-symbols-outlined ${isActive ? 'font-variation-fill' : ''}`}>
                  {tab.icon}
                </span>
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
