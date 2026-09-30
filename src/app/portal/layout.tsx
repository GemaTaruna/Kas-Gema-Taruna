export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-container-low flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-surface relative shadow-xl overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
