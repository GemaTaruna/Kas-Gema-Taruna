'use client';

export default function MobileHeader() {
  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-surface-container-lowest border-b border-outline-variant z-40 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-container rounded flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-sm">music_note</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-on-surface">KAS GEMA TARUNA</span>
          <span className="text-[10px] text-on-surface-variant">Bendahara Umum</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
          <span className="material-symbols-outlined text-lg">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error"></span>
        </div>
        <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface text-xs font-bold">
          FP
        </div>
      </div>
    </header>
  );
}
