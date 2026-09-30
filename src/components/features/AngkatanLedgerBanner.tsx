'use client';

import React from 'react';
import { ANGKATAN_LIST, useAngkatan } from '@/context/AngkatanContext';
import { formatRupiah } from '@/lib/utils';

export default function AngkatanLedgerBanner() {
  const {
    role,
    username,
    displayName,
    lockedAngkatan,
    activeAngkatan,
    setActiveAngkatan,
    members,
    totalPemasukan,
    totalPengeluaran,
    saldoAkhir,
  } = useAngkatan();

  const lunasCount = members.filter((m) => m.duesStatus === 'LUNAS').length;

  return (
    <div className="w-full bg-gradient-to-r from-[#0f172a] via-[#131b2e] to-[#1e293b] text-white border-b border-amber-500/30 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-3 flex flex-col gap-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500 text-slate-950">
              BUKU KAS ANGKATAN {activeAngkatan} (MB{activeAngkatan})
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-amber-300 border border-white/15">
              {displayName}
            </span>
          </div>

          {/* Pemilih Angkatan untuk Super Admin (Pembina) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {role === 'superadmin' ? (
              <>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mr-1">
                  Pilih Angkatan:
                </span>
                {ANGKATAN_LIST.map((angk) => {
                  const isSelected = activeAngkatan === angk;
                  return (
                    <button
                      key={angk}
                      type="button"
                      onClick={() => setActiveAngkatan(angk)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : 'bg-white/10 text-slate-200 hover:bg-white/20'
                      }`}
                    >
                      MB{angk}
                    </button>
                  );
                })}
              </>
            ) : (
              <div className="px-3 py-1 rounded-lg bg-white/10 border border-amber-400/30 text-xs font-semibold text-amber-200">
                🔒 Pembukuan Khusus Angkatan {lockedAngkatan} ({username})
              </div>
            )}
          </div>
        </div>

        {/* Ringkasan Cepat Angkatan Aktif */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1.5 border-t border-white/10">
          <div className="bg-white/5 rounded-lg px-3 py-1.5 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
              Saldo Kas MB{activeAngkatan}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-amber-400">
              {formatRupiah(saldoAkhir)}
            </span>
          </div>
          <div className="bg-white/5 rounded-lg px-3 py-1.5 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
              Kas Masuk MB{activeAngkatan}
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-400">
              +{formatRupiah(totalPemasukan)}
            </span>
          </div>
          <div className="bg-white/5 rounded-lg px-3 py-1.5 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
              Kas Keluar MB{activeAngkatan}
            </span>
            <span className="text-xs sm:text-sm font-bold text-rose-400">
              -{formatRupiah(totalPengeluaran)}
            </span>
          </div>
          <div className="bg-white/5 rounded-lg px-3 py-1.5 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
              Iuran Lunas MB{activeAngkatan}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white">
              {lunasCount} / {members.length} Siswa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
