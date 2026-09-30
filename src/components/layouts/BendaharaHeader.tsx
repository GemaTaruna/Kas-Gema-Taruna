'use client';

import { useRouter } from 'next/navigation';
import { ANGKATAN_LIST, useAngkatan } from '@/context/AngkatanContext';

interface BendaharaHeaderProps {
  onOpenMobileMenu?: () => void;
}

export default function BendaharaHeader({ onOpenMobileMenu }: BendaharaHeaderProps) {
  const router = useRouter();
  const {
    role,
    username,
    displayName,
    activeAngkatan,
    setActiveAngkatan,
    logout,
  } = useAngkatan();

  const handleLogout = () => {
    logout();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-3 sm:px-6">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {/* Tombol Hamburger Menu untuk Web Mobile */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Buka Menu Navigasi"
          className="lg:hidden w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        <img
          src="/logo.png"
          alt="Logo Gema Taruna"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-contain bg-primary-container p-1 shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-headline-md text-xs sm:text-sm uppercase tracking-tight text-on-surface font-bold truncate">
              KAS GEMA TARUNA
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary-container text-secondary-fixed text-[10px] sm:text-[11px] font-extrabold shrink-0">
              MB{activeAngkatan}
            </span>
          </div>
          <span className="font-body-sm text-[11px] text-on-surface-variant truncate hidden sm:block">
            {role === 'superadmin'
              ? 'Super Admin Pembina — Akses Seluruh Angkatan (16–21)'
              : `Buku Kas Mandiri Angkatan ${activeAngkatan}`}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {role === 'superadmin' && (
          <div className="hidden xl:flex items-center gap-1 bg-surface-container px-2 py-1 rounded-lg border border-outline-variant/40">
            <span className="text-[10px] font-bold uppercase text-on-surface-variant px-1">
              Angkatan:
            </span>
            {ANGKATAN_LIST.map((angk) => (
              <button
                key={angk}
                type="button"
                onClick={() => setActiveAngkatan(angk)}
                className={`px-2 py-0.5 rounded text-xs font-bold transition cursor-pointer ${
                  activeAngkatan === angk
                    ? 'bg-primary-container text-secondary-fixed shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {angk}
              </button>
            ))}
          </div>
        )}

        <span className="hidden md:inline-flex font-label-xs text-[10px] px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider font-bold">
          {role === 'superadmin' ? 'SUPER ADMIN' : `ADMIN MB${activeAngkatan}`}
        </span>

        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-outline-variant">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-secondary-fixed text-xs font-extrabold">
            {role === 'superadmin' ? 'GT' : `M${activeAngkatan}`}
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-on-surface leading-tight">
              {username}
            </span>
            <span className="text-[10px] text-on-surface-variant leading-tight">
              {displayName}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-error bg-error-container/40 hover:bg-error-container hover:text-on-error-container transition-colors cursor-pointer text-xs font-bold"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </div>
    </header>
  );
}
