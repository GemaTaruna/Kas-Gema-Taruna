export default function TransparansiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex flex-col justify-between">
      <div className="flex-1">{children}</div>
      <footer className="py-4 px-4 sm:px-6 text-center text-xs text-on-surface-variant border-t border-outline-variant/40 bg-surface-container-lowest">
        <span>© 2026 Marching Band Gema Taruna (Mode Hanya Membaca) • </span>
        <a
          href="https://www.tiktok.com/@novano007"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-secondary hover:underline"
        >
          @novano007 - 2026
        </a>
      </footer>
    </div>
  );
}
