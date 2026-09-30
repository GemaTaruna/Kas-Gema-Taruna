'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PortalBottomTabs() {
  const pathname = usePathname();

  const tabs = [
    { path: '/portal/ringkasan', icon: 'donut_small', label: 'Ringkasan' },
    { path: '/portal/iuran', icon: 'credit_card', label: 'Iuran' },
    { path: '/portal/arus-kas', icon: 'swap_vert', label: 'Arus Kas' },
    { path: '/portal/slip', icon: 'receipt', label: 'Slip' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 h-20 bg-surface-container-lowest border-t border-outline-variant z-40 pb-safe">
      <div className="flex items-center justify-around h-full px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          
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
