export default function TransparansiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background text-on-surface font-sans">{children}</div>;
}
