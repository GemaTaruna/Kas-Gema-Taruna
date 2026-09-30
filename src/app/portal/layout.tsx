import AngkatanLedgerBanner from '@/components/features/AngkatanLedgerBanner';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-container-low flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-surface relative shadow-xl overflow-x-hidden flex flex-col justify-between">
        <div className="pt-16">
          <AngkatanLedgerBanner />
        </div>
        <div className="flex-1">{children}</div>
        <footer className="pb-24 pt-3 px-4 text-center text-xs text-on-surface-variant border-t border-outline-variant/40 bg-surface-container-lowest">
          <a
            href="https://www.instagram.com/novano007"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-secondary hover:underline"
          >
            @novano007 - 2026
          </a>
        </footer>
      </div>
    </div>
  );
}
