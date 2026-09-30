import BendaharaSidebar from '@/components/layouts/BendaharaSidebar';
import BendaharaHeader from '@/components/layouts/BendaharaHeader';

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
        <main className="flex-1 pt-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
