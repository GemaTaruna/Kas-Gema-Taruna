import BendaharaSidebar from '@/components/layouts/BendaharaSidebar';
import BendaharaHeader from '@/components/layouts/BendaharaHeader';
import AngkatanLedgerBanner from '@/components/features/AngkatanLedgerBanner';

export default function BendaharaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background text-on-surface font-sans">
      <BendaharaSidebar />
      <div className="flex-1 flex flex-col pl-72">
        <BendaharaHeader />
        <main className="flex-1 pt-16 overflow-y-auto flex flex-col justify-between">
          <div>
            <AngkatanLedgerBanner />
            {children}
          </div>
          <footer className="py-4 px-6 text-center text-xs text-on-surface-variant border-t border-outline-variant/40 bg-surface-container-lowest">
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
