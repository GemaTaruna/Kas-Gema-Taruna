'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function BendaharaHeader() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    document.cookie = 'kgt_session_role=; path=/; max-age=0';
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore if Supabase not configured
    }
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter">
      <div className="flex items-center gap-space-md">
        <div className="w-8 h-8 bg-primary-container rounded flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">music_note</span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-md text-title-sm uppercase tracking-tight text-on-surface font-bold">KAS GEMA TARUNA</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Sistem Keuangan Marching Band</span>
        </div>
      </div>
      <div className="flex items-center gap-space-md">
        <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider font-bold">
          BENDAHARA
        </span>
        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-surface-container-high text-on-surface-variant cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error"></span>
        </div>
        <div className="flex items-center gap-space-sm pl-space-sm border-l border-outline-variant">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface">
            FP
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-semibold text-on-surface">Fahmi Pratama</span>
            <span className="font-body-sm text-label-xs text-on-surface-variant">Bendahara Umum</span>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-colors ml-space-xs"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span className="font-label-sm text-label-sm">Keluar</span>
        </button>
      </div>
    </header>
  );
}
