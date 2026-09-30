'use client';

import React, { useState } from 'react';
import BendaharaSidebar from '@/components/layouts/BendaharaSidebar';
import BendaharaHeader from '@/components/layouts/BendaharaHeader';
import AngkatanLedgerBanner from '@/components/features/AngkatanLedgerBanner';

export default function BendaharaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex flex-col">
      <BendaharaSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <div className="flex-1 flex flex-col lg:pl-72 min-h-screen">
        <BendaharaHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 pt-16 flex flex-col justify-between">
          <div>
            <AngkatanLedgerBanner />
            {children}
          </div>
          <footer className="py-4 px-4 sm:px-6 text-center text-xs text-on-surface-variant border-t border-outline-variant/40 bg-surface-container-lowest">
            <span>© 2026 Marching Band Gema Taruna • </span>
            <a
              href="https://www.instagram.com/novano007"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-secondary hover:underline"
            >
              @novano007 - 2026
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
