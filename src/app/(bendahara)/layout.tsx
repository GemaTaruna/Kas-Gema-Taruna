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
    <div className="min-h-screen bg-background print:bg-white text-on-surface font-sans flex flex-col">
      <div className="print:hidden">
        <BendaharaSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
      <div className="flex-1 flex flex-col lg:pl-72 print:pl-0 min-h-screen">
        <div className="print:hidden">
          <BendaharaHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        </div>
        <main className="flex-1 pt-16 print:pt-0 flex flex-col justify-between">
          <div>
            <div className="print:hidden">
              <AngkatanLedgerBanner />
            </div>
            {children}
          </div>
          <footer className="print:hidden py-4 px-4 sm:px-6 text-center text-xs text-on-surface-variant border-t border-outline-variant/40 bg-surface-container-lowest">
            <span>© 2026 Marching Band Gema Taruna • </span>
            <a
              href="https://www.tiktok.com/@novano007"
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
