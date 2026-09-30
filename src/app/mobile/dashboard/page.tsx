'use client';

import React, { useState } from 'react';
import { formatRupiah } from '@/lib/utils';

export default function Page() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-gutter-sm flex items-center justify-between gap-space-sm"><div className="flex items-center gap-space-sm min-w-0"><img alt="Emblem logo for Gema Taruna Marching Band featuring a stylized heraldic shield with crossed brass trumpet, drum mallet/percussion element, gold laurel wreath, and a dynamic banner with the text 'GEMA TARUNA'. Navy blue and gold with crimson accents.. Brand logo" className="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1W64D4wP9gktHaJRPyLBJT583cPOoUUg-wTMAkGiMbQR789tkbD3ACfmglcyLYM6vfYUj7IH_BHA5vmvjccgsPEljctJhFxJf0YNcuM_demKa5jydxOZTg1xK2JCtYNVvM1pkBciJiim2-06WWeCrULKnR9xgoeYqATiO74Ssr4ArkYaUGJgmIj5V8PXMOmERr9Bxzjq0ToaFYCIsDBgxSrGI9zN7u4ODJSY1XN1z6khQe5YLaoBIwajY0"/><div className="flex flex-col min-w-0"><div className="flex items-center gap-space-xs"><span className="font-headline-md text-body-md font-bold tracking-tight text-on-surface truncate">Kas MBGT</span><span className="px-1.5 py-0.2 rounded-full bg-secondary text-on-secondary font-label-xs text-label-xs font-bold leading-tight">KAS</span></div><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span><span className="font-label-xs text-label-xs text-secondary font-bold tracking-tight truncate uppercase">Latihan Lapangan Aktif</span></div></div></div><div className="flex items-center gap-space-sm flex-shrink-0"><button aria-label="Notifikasi Operasional" className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span></button><div className="relative flex items-center justify-center pl-1"><img alt="Profile" className="w-8 h-8 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.1)]" src="https://lh3.googleusercontent.com/aida/AEtjO1WzjZNbkEOGj-VCP5WAJN3NT8pfdAqMTQnA3ZiX56agZbb6l2zRDq-rnqEB1rt1g3K6r5C9BKZ3KoIE_T2pahSl_YrR_sh6F3BvHsIEQ6pGp8pzcd1I0L9D6uSInxVbSnCuXZ_yIo79Gblw4J9sjTM-s6wm4n8q3h1y3lBHSKEdybqOAeyTLgpiunSfkv7iegQOW4ikONvEZ-xJUxjqg39r9wQX_UwBRCp4JsB0g0obwmmuqX3eiHvOpA"/><span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary-container text-surface flex items-center justify-center font-label-xs text-[7px] font-bold">B</span></div></div></div></header><main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div className="flex flex-col w-full px-margin-sm space-y-space-md">
{/*  Operational Field Pill  */}
<div className="w-full bg-surface-container-high rounded-lg p-space-sm shadow-sm flex items-center justify-between">
<div className="flex items-center gap-2 min-w-0">
<div className="w-7 h-7 rounded-full bg-primary-container text-surface flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-[16px] text-surface-bright">stadium</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-xs text-label-xs text-on-surface truncate">Stadion Madya • Drill Sesi II</span>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          Sinkronisasi Offline Aktif (15:42 WIB)
        </span>
</div>
</div>
<div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-surface-container-lowest shadow-sm flex-shrink-0">
<span className="material-symbols-outlined text-[14px] text-secondary">bolt</span>
<span className="font-label-xs text-label-xs text-on-surface font-bold">88%</span>
</div>
</div>
{/*  Compact Field Wallet Card  */}
<div className="relative w-full rounded-xl bg-primary-container text-on-primary p-space-lg shadow-xl overflow-hidden">
<div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-secondary/15 pointer-events-none blur-xl"></div>
<div className="absolute top-0 left-0 right-0 h-1 bg-secondary-container"></div>
<div className="flex items-start justify-between mb-space-sm relative z-10">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-surface-container-lowest/10 backdrop-blur-sm flex items-center justify-center">
<span className="material-symbols-outlined text-[18px] text-secondary-fixed">account_balance_wallet</span>
</div>
<div>
<p className="font-label-xs text-label-xs tracking-wider uppercase text-on-primary-container font-semibold">Kas Pegangan Lapangan</p>
<p className="font-label-xs text-label-xs text-surface-tint">Kak Fahmi Pratama • Bendahara</p>
</div>
</div>
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-xs text-label-xs font-bold shadow-sm">
        Siap Lapangan
      </span>
</div>
<div className="relative z-10 my-space-xs">
<p className="font-label-xs text-label-xs text-on-primary-container">Total Kas Fisik (Tunai Dompet)</p>
<div className="flex items-baseline justify-between">
<h2 className="font-metric-display text-metric-display font-bold tracking-tight text-surface-bright">Rp 3.250.000</h2>
<button aria-label="Sembunyikan Saldo" className="p-1 rounded-full bg-surface-container-lowest/10 text-on-primary-container hover:text-surface-bright transition-colors" id="toggleBalanceBtn" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
</div>
</div>
<div className="pt-space-sm mt-space-sm bg-surface-container-lowest/5 rounded-lg p-space-sm flex items-center justify-between relative z-10">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-primary-fixed">account_balance</span>
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-primary-container">Kas Rekening MBGT</span>
<span className="font-title-sm text-title-sm text-surface-bright font-semibold">Rp 9.200.000</span>
</div>
</div>
<div className="flex items-center gap-1.5">
<button className="px-2.5 py-1 rounded-lg bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-surface font-label-xs text-label-xs font-bold transition-transform active:scale-95 flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-[14px]">swap_horiz</span>
          Tarik Tunai
        </button>
</div>
</div>
</div>
{/*  3 Big Field Quick Actions  */}
<div className="grid grid-cols-3 gap-space-xs w-full">
{/*  Terima Iuran Quick Tap  */}
<button className="flex flex-col items-center justify-center p-space-sm rounded-xl bg-primary-container text-surface shadow-md active:scale-95 transition-transform text-center min-h-[96px]" id="quickPayModalTrigger" type="button">
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-1.5 shadow-sm">
<span className="material-symbols-outlined text-[22px]">payments</span>
</div>
<span className="font-label-sm text-label-sm font-bold text-surface-bright leading-tight">+ Terima Iuran</span>
<span className="font-label-xs text-label-xs text-on-primary-container">1-Ketukan</span>
</button>
{/*  Catat Belanja  */}
<button className="flex flex-col items-center justify-center p-space-sm rounded-xl bg-surface-container-high text-on-surface shadow-sm active:scale-95 transition-transform text-center min-h-[96px]" id="quickExpenseTrigger" type="button">
<div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-1.5">
<span className="material-symbols-outlined text-[20px]">local_grocery_store</span>
</div>
<span className="font-label-sm text-label-sm font-bold text-on-surface leading-tight">- Catat Belanja</span>
<span className="font-label-xs text-label-xs text-on-surface-variant">Galon / Truk</span>
</button>
{/*  Broadcast WA  */}
<a className="flex flex-col items-center justify-center p-space-sm rounded-xl bg-surface-container-lowest text-on-surface shadow-sm active:scale-95 transition-transform text-center min-h-[96px]" href="https://api.whatsapp.com/send?text=Halo%20Rekan%20Taruna%20MBGT!%20Mengingatkan%20iuran%20latihan%20hari%20ini%20sebesar%20Rp%2050.000%20dapat%20diserahkan%20ke%20Kak%20Fahmi%20(Bendahara)%20di%20tenda%20lapangan.%20Terima%20kasih!" target="_blank">
<div className="w-10 h-10 rounded-full bg-[#25D366] text-surface-container-lowest flex items-center justify-center mb-1.5 shadow-sm">
<span className="material-symbols-outlined text-[20px]">chat</span>
</div>
<span className="font-label-sm text-label-sm font-bold text-on-surface leading-tight">Broadcast WA</span>
<span className="font-label-xs text-label-xs text-on-surface-variant">Kirim Alert</span>
</a>
</div>
{/*  Rehearsal Squad Progress Tracker  */}
<div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">military_tech</span>
<h3 className="font-title-sm text-title-sm text-on-surface font-bold">Disiplin Iuran Skuad Latihan</h3>
</div>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-bold">
        32 / 40 Lunas
      </span>
</div>
{/*  Progress Meter  */}
<div className="w-full bg-surface-container rounded-full h-3 mb-2 overflow-hidden flex">
<div className="bg-secondary-container h-full rounded-full transition-all duration-500 ease-out" style={{ width: '80%' }}></div>
</div>
<div className="flex items-center justify-between text-on-surface-variant mb-space-md">
<span className="font-label-xs text-label-xs">Capaian: <strong className="text-on-surface">80% Selesai</strong></span>
<span className="font-label-xs text-label-xs text-secondary font-bold">8 Taruna Belum Setor</span>
</div>
{/*  Horizontal Fast-Action Cadets In Arrears  */}
<div className="space-y-space-xs">
<p className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant font-bold">Antrean Lapangan (Ketuk Bayar)</p>
{/*  Cadet Row 1  */}
<div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg transition-colors hover:bg-surface-container" id="cadet-farhan">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold flex items-center justify-center font-label-xs text-label-xs flex-shrink-0">
            FM
          </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-label-md text-label-md text-on-surface font-bold truncate">Farhan Maulana</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface font-label-xs text-[10px]">Mellophone</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Rp 50.000 • Sesi Minggu Ke-2</span>
</div>
</div>
<button className="px-3 py-1.5 rounded-lg bg-primary-container text-surface hover:bg-surface-tint active:scale-95 transition-transform flex items-center gap-1 shadow-sm flex-shrink-0"  type="button">
<span className="material-symbols-outlined text-[14px] text-secondary-fixed">check_circle</span>
<span className="font-label-xs text-label-xs font-bold">Bayar</span>
</button>
</div>
{/*  Cadet Row 2  */}
<div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg transition-colors hover:bg-surface-container" id="cadet-dimas">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-9 h-9 rounded-full bg-surface-container-highest text-on-surface font-bold flex items-center justify-center font-label-xs text-label-xs flex-shrink-0">
            DW
          </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-label-md text-label-md text-on-surface font-bold truncate">Dimas Wahyu</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface font-label-xs text-[10px]">Trumpet 1</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Rp 50.000 • Sesi Minggu Ke-2</span>
</div>
</div>
<button className="px-3 py-1.5 rounded-lg bg-primary-container text-surface hover:bg-surface-tint active:scale-95 transition-transform flex items-center gap-1 shadow-sm flex-shrink-0"  type="button">
<span className="material-symbols-outlined text-[14px] text-secondary-fixed">check_circle</span>
<span className="font-label-xs text-label-xs font-bold">Bayar</span>
</button>
</div>
{/*  Cadet Row 3  */}
<div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg transition-colors hover:bg-surface-container" id="cadet-rizky">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-9 h-9 rounded-full bg-surface-container-highest text-on-surface font-bold flex items-center justify-center font-label-xs text-label-xs flex-shrink-0">
            RR
          </div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-label-md text-label-md text-on-surface font-bold truncate">Rizky Ramadhan</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface font-label-xs text-[10px]">Bass Drum 3</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Rp 50.000 • Sesi Minggu Ke-2</span>
</div>
</div>
<button className="px-3 py-1.5 rounded-lg bg-primary-container text-surface hover:bg-surface-tint active:scale-95 transition-transform flex items-center gap-1 shadow-sm flex-shrink-0"  type="button">
<span className="material-symbols-outlined text-[14px] text-secondary-fixed">check_circle</span>
<span className="font-label-xs text-label-xs font-bold">Bayar</span>
</button>
</div>
</div>
</div>
{/*  Field Logistics Expenses Feed  */}
<div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">receipt</span>
<h3 className="font-title-sm text-title-sm text-on-surface font-bold">Pengeluaran Lapangan Hari Ini</h3>
</div>
<span className="font-label-xs text-label-xs text-on-surface-variant font-semibold">Total: Rp 250.000</span>
</div>
<div className="space-y-space-sm">
{/*  Item 1  */}
<div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-3 min-w-0">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface flex-shrink-0">
<span className="material-symbols-outlined text-[18px]">water_drop</span>
</div>
<div className="flex flex-col min-w-0">
<p className="font-label-md text-label-md text-on-surface font-bold truncate">5 Galon Air Mineral &amp; Es Balok</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">13:10 WIB • Logistik Medis &amp; Minum</p>
</div>
</div>
<div className="text-right flex-shrink-0">
<p className="font-label-md text-label-md font-bold text-on-surface">- Rp 85.000</p>
<span className="font-label-xs text-[10px] text-secondary font-bold">Tunai</span>
</div>
</div>
{/*  Item 2  */}
<div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-3 min-w-0">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface flex-shrink-0">
<span className="material-symbols-outlined text-[18px]">rv_hookup</span>
</div>
<div className="flex flex-col min-w-0">
<p className="font-label-md text-label-md text-on-surface font-bold truncate">Tambal Ban Truk Angkut Drum</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">14:05 WIB • Transportasi Alat Pit</p>
</div>
</div>
<div className="text-right flex-shrink-0">
<p className="font-label-md text-label-md font-bold text-on-surface">- Rp 45.000</p>
<span className="font-label-xs text-[10px] text-secondary font-bold">Tunai</span>
</div>
</div>
{/*  Item 3  */}
<div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-3 min-w-0">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface flex-shrink-0">
<span className="material-symbols-outlined text-[18px]">build</span>
</div>
<div className="flex flex-col min-w-0">
<p className="font-label-md text-label-md text-on-surface font-bold truncate">Valve Oil Trombone Darurat (2 Botol)</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">15:15 WIB • Seksi Brass Instrument</p>
</div>
</div>
<div className="text-right flex-shrink-0">
<p className="font-label-md text-label-md font-bold text-on-surface">- Rp 120.000</p>
<span className="font-label-xs text-[10px] text-secondary font-bold">QRIS Kasir</span>
</div>
</div>
</div>
</div>
{/*  Rehearsal Ground Field Snapshot  */}
<div className="w-full rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-xs text-label-xs font-bold text-on-surface uppercase tracking-wider">Titik Latihan Madya &amp; Tenda Kas</span>
<span className="font-label-xs text-label-xs text-secondary font-semibold">Zona Lapangan Barat</span>
</div>
<div className="w-full h-32 rounded-lg overflow-hidden relative shadow-inner">
<img className="w-full h-full object-cover" data-alt="Dramatic wide angle view of an Indonesian high school marching band rehearsing drill sets on an outdoor athletic grass stadium during late afternoon with brass horns shining under warm sunlight and equipment cases organized on sideline" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7GB7f3WpXUQJ2CEKMT45dg8o6gHBqWRDT2D3SKHcm-JhZdASqCRh-YBITGB__phHyt8WHLLNxV08YT1tlRE88owSUJdnhAWxcuBXkQaDAdgQG0JZCoHzD6p84jn98oBteoCFh8rA8quSaiEhR2KG6awRneDMkBB_zu100kntF0RbJgTefeh6fHMzqdqtMaCzVMlU3NzqTT6Kys2wEEwriiRqKPGXNTeTAknglWNUZhiXMZ24B7D6V"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent flex items-end p-2.5">
<div className="flex items-center justify-between w-full">
<div className="flex items-center gap-1.5 text-surface">
<span className="material-symbols-outlined text-[16px] text-secondary-fixed">place</span>
<span className="font-label-xs text-label-xs font-bold">Sektor Tenda Logistik 01</span>
</div>
<span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary-container font-label-xs text-[10px] font-bold">MBGT 2025</span>
</div>
</div>
</div>
</div>
{/*  Field Emergency Approval Assistance (SOS Pembina)  */}
<div className="w-full rounded-xl bg-surface-container-high p-space-md shadow-sm flex items-center justify-between">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-10 h-10 rounded-full bg-primary-container text-secondary-fixed flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-[22px]">contact_phone</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-xs text-label-xs font-bold uppercase tracking-wider text-secondary">Otorisasi Lapangan &gt; Rp 500k</span>
<span className="font-label-md text-label-md text-on-surface font-bold truncate">Drs. Sutrisno (Pembina MBGT)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hubungi via Telepon / WhatsApp Darurat</span>
</div>
</div>
<div className="flex items-center gap-1 flex-shrink-0">
<a aria-label="Telepon Pembina" className="w-9 h-9 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform" href="tel:08123456789">
<span className="material-symbols-outlined text-[18px]">call</span>
</a>
<a aria-label="WA Pembina" className="w-9 h-9 rounded-full bg-[#25D366] text-surface-container-lowest flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform" href="https://api.whatsapp.com/send?phone=628123456789&amp;text=Selamat%20sore%20Pak%20Sutrisno,%20mohon%20konfirmasi%20persetujuan%20dana%20logistik%20lapangan%20MBGT." target="_blank">
<span className="material-symbols-outlined text-[18px]">chat</span>
</a>
</div>
</div>
{/*  Floating Toast Notification for Confirmation (Client-side interactive)  */}
<div className="fixed top-20 left-4 right-4 z-50 bg-primary-container text-surface-bright p-space-sm rounded-xl shadow-xl flex items-center justify-between transform -translate-y-28 opacity-0 transition-all duration-300 pointer-events-none" id="quickToast">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-fixed text-[20px]">check_circle</span>
<span className="font-label-sm text-label-sm" id="quickToastMsg">Iuran Berhasil Dicatat!</span>
</div>
<span className="font-label-xs text-label-xs px-2 py-0.5 rounded bg-surface-container-lowest/20 font-bold">LUNAS</span>
</div>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]" data-active-classes="text-secondary font-semibold"><div className="relative flex items-center justify-around h-16 px-space-xs max-w-lg mx-auto"><a aria-current="page" className="flex flex-col items-center justify-center min-w-[56px] h-full transition-colors py-1 gap-0.5 text-secondary font-semibold" data-path="dashboard" href="#"><span className="material-symbols-outlined text-[22px]">dashboard</span><span className="font-label-xs text-label-xs">Beranda</span></a><a className="flex flex-col items-center justify-center min-w-[56px] h-full text-on-surface-variant hover:text-on-surface transition-colors py-1 gap-0.5" data-path="iuran-skuad" href="#"><span className="material-symbols-outlined text-[22px]">group</span><span className="font-label-xs text-label-xs">Iuran</span></a><div className="flex flex-col items-center justify-center min-w-[56px] h-full"><a aria-label="Catat Transaksi Cepat" className="relative -top-3 w-12 h-12 rounded-full bg-primary-container text-on-primary shadow-[0_6px_16px_rgba(19,27,46,0.35)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform" data-path="catat-cepat" href="#"><span className="material-symbols-outlined text-[26px] text-surface">add</span></a><span className="font-label-xs text-label-xs text-on-surface-variant -mt-2">Catat</span></div><a className="flex flex-col items-center justify-center min-w-[56px] h-full text-on-surface-variant hover:text-on-surface transition-colors py-1 gap-0.5" data-path="belanja-lapangan" href="#"><span className="material-symbols-outlined text-[22px]">shopping_bag</span><span className="font-label-xs text-label-xs">Belanja</span></a><a className="flex flex-col items-center justify-center min-w-[56px] h-full text-on-surface-variant hover:text-on-surface transition-colors py-1 gap-0.5" data-path="rekap-mutasi" href="#"><span className="material-symbols-outlined text-[22px]">receipt_long</span><span className="font-label-xs text-label-xs">Rekap</span></a></div></nav>
    </>
  );
}
