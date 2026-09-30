'use client';

import { useRouter } from 'next/navigation';
import { ANGKATAN_LIST, useAngkatan } from '@/context/AngkatanContext';

export default function BendaharaHeader() {
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
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter">
      <div className="flex items-center gap-space-md">
        <img
          src="/logo.png"
          alt="Logo Gema Taruna"
          className="w-9 h-9 rounded-lg object-contain bg-primary-container p-1"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-headline-md text-title-sm uppercase tracking-tight text-on-surface font-bold">
              KAS GEMA TARUNA
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary-container text-secondary-fixed text-[11px] font-extrabold">
              ANGKATAN {activeAngkatan} (MB{activeAngkatan})
            </span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {role === 'superadmin'
              ? 'Super Admin Pembina — Akses Seluruh Angkatan (16–21)'
              : `Buku Kas Mandiri Angkatan ${activeAngkatan}`}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-space-sm">
        {/* Jika Super Admin (Pembina), tampilkan switcher cepat Angkatan 16-21 di Header */}
        {role === 'superadmin' && (
          <div className="hidden xl:flex items-center gap-1 bg-surface-container px-2 py-1 rounded-lg border border-outline-variant/40 mr-2">
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

        <span className="font-label-xs text-label-xs px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider font-bold">
          {role === 'superadmin' ? 'SUPER ADMIN (PEMBINA)' : `ADMIN MB${activeAngkatan}`}
        </span>

        <div className="flex items-center gap-space-sm pl-space-sm border-l border-outline-variant">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-secondary-fixed text-xs font-extrabold">
            {role === 'superadmin' ? 'GT' : `M${activeAngkatan}`}
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              {username}
            </span>
            <span className="font-body-sm text-label-xs text-on-surface-variant">
              {displayName}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-colors ml-space-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span className="font-label-sm text-label-sm">Keluar</span>
        </button>
      </div>
    </header>
  );
}
