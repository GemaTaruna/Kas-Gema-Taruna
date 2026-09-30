'use client';

import React, { useState } from 'react';
import { formatRupiah } from '@/lib/utils';

export default function Page() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-gutter-sm flex items-center justify-between gap-space-sm"><div className="flex items-center gap-space-sm min-w-0"><img alt="Emblem logo for Gema Taruna Marching Band featuring a stylized heraldic shield with crossed brass trumpet, drum mallet/percussion element, gold laurel wreath, and a dynamic banner with the text 'GEMA TARUNA'. Navy blue and gold with crimson accents.. Brand logo" className="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1W64D4wP9gktHaJRPyLBJT583cPOoUUg-wTMAkGiMbQR789tkbD3ACfmglcyLYM6vfYUj7IH_BHA5vmvjccgsPEljctJhFxJf0YNcuM_demKa5jydxOZTg1xK2JCtYNVvM1pkBciJiim2-06WWeCrULKnR9xgoeYqATiO74Ssr4ArkYaUGJgmIj5V8PXMOmERr9Bxzjq0ToaFYCIsDBgxSrGI9zN7u4ODJSY1XN1z6khQe5YLaoBIwajY0"/><div className="flex flex-col min-w-0"><div className="flex items-center gap-space-xs"><span className="font-headline-md text-body-md font-bold tracking-tight text-on-surface truncate">Kas MBGT</span><span className="px-1.5 py-0.2 rounded-full bg-secondary text-on-secondary font-label-xs text-label-xs font-bold leading-tight">KAS</span></div><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span><span className="font-label-xs text-label-xs text-secondary font-bold tracking-tight truncate uppercase">Latihan Lapangan Aktif</span></div></div></div><div className="flex items-center gap-space-sm flex-shrink-0"><button aria-label="Notifikasi Operasional" className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span></button><div className="relative flex items-center justify-center pl-1"><img alt="Profile" className="w-8 h-8 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.1)]" src="https://lh3.googleusercontent.com/aida/AEtjO1WzjZNbkEOGj-VCP5WAJN3NT8pfdAqMTQnA3ZiX56agZbb6l2zRDq-rnqEB1rt1g3K6r5C9BKZ3KoIE_T2pahSl_YrR_sh6F3BvHsIEQ6pGp8pzcd1I0L9D6uSInxVbSnCuXZ_yIo79Gblw4J9sjTM-s6wm4n8q3h1y3lBHSKEdybqOAeyTLgpiunSfkv7iegQOW4ikONvEZ-xJUxjqg39r9wQX_UwBRCp4JsB0g0obwmmuqX3eiHvOpA"/><span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary-container text-surface flex items-center justify-center font-label-xs text-[7px] font-bold">B</span></div></div></div></header><main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div className="flex flex-col w-full px-gutter-sm space-y-space-md">
{/*  Sunlight High-Contrast Banner with Field Sounding Motif  */}
<div className="relative overflow-hidden rounded-xl bg-primary-container text-on-primary shadow-md p-space-md mt-space-xs">
<div className="relative z-10 flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container shadow-sm">
<span className="material-symbols-outlined text-[18px]">sports_score</span>
</span>
<span className="font-label-xs text-label-xs uppercase tracking-wider text-surface-container-highest">GEMA TARUNA MARCHING BAND</span>
</div>
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-xs text-label-xs font-bold">
          SESI ISTIRAHAT SIANG
        </span>
</div>
<div className="flex items-baseline justify-between pt-1">
<div>
<h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-surface-bright">Penarikan Iuran Cepat</h1>
<p className="font-body-sm text-body-sm text-on-primary-container">Target Iuran Rutin September • Rp 50.000 / Anggota</p>
</div>
<div className="text-right">
<span className="font-label-xs text-label-xs text-secondary-fixed">Target Skuad</span>
<p className="font-title-sm text-title-sm font-bold text-surface-bright">80% Lunas</p>
</div>
</div>
</div>
{/*  Decorative marching line backdrop aura  */}
<div className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-secondary/20 blur-2xl pointer-events-none"></div>
</div>
{/*  Field Collection Quick Stats Bento  */}
<div className="grid grid-cols-2 gap-space-sm">
{/*  Stat 1: Collected Today  */}
<div className="flex flex-col justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
<div className="flex items-center justify-between">
<span className="font-label-xs text-label-xs text-on-surface-variant font-bold uppercase tracking-wider">Terkumpul Hari Ini</span>
<div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
</div>
</div>
<div className="mt-space-xs">
<div className="font-metric-display text-metric-display font-extrabold text-on-surface tracking-tight" id="val-terkumpul">+350k</div>
<div className="flex items-center gap-1 mt-0.5 text-on-surface-variant">
<span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
<span className="font-label-xs text-label-xs"><strong id="val-count-terkumpul">7 Taruna</strong> bayar tunai</span>
</div>
</div>
</div>
{/*  Stat 2: Remaining Dues  */}
<div className="flex flex-col justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm">
<div className="flex items-center justify-between">
<span className="font-label-xs text-label-xs text-error font-bold uppercase tracking-wider">Sisa Tagihan</span>
<div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[20px]">pending_actions</span>
</div>
</div>
<div className="mt-space-xs">
<div className="font-metric-display text-metric-display font-extrabold text-error tracking-tight" id="val-sisa">Rp 400k</div>
<div className="flex items-center gap-1 mt-0.5 text-on-surface-variant">
<span className="material-symbols-outlined text-[14px] text-error">person_alert</span>
<span className="font-label-xs text-label-xs"><strong id="val-count-sisa">8 Taruna</strong> belum setor</span>
</div>
</div>
</div>
</div>
{/*  Operational Quick Blast Reminder CTA  */}
<div className="rounded-xl bg-surface-container-low p-space-sm shadow-sm flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm pl-1">
<div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-[20px]">mark_chat_unread</span>
</div>
<div className="flex flex-col min-w-0">
<p className="font-title-sm text-title-sm font-bold text-on-surface truncate leading-tight">Pengingat Sekaligus</p>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Kirim draft tagihan ke 8 anak di WhatsApp</p>
</div>
</div>
<button className="shrink-0 px-3 py-2 rounded-lg bg-primary-container hover:bg-inverse-surface active:scale-95 text-surface font-label-sm text-label-sm font-semibold flex items-center gap-1.5 shadow-sm transition-all"  type="button">
<span className="material-symbols-outlined text-[16px] text-secondary-container">send</span>
<span>Broadcast</span>
</button>
</div>
{/*  Sticky Search & Quick Section Filters (Tuned for One-Handed Thumb Operation)  */}
<div className="sticky top-16 z-30 -mx-gutter-sm px-gutter-sm pt-space-xs pb-space-sm bg-surface/95 backdrop-blur-md space-y-2">
{/*  Search Bar with Sun Glare Resistance  */}
<div className="relative flex items-center w-full">
<span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px] pointer-events-none">search</span>
<input className="w-full h-11 pl-10 pr-10 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/70 shadow-sm focus:bg-surface-container-low outline-none transition-all" id="memberSearch"  placeholder="Cari nama anggota, instrumen, posisi..." type="text"/>
<button className="absolute right-3 text-on-surface-variant hover:text-on-surface"  type="button">
<span className="material-symbols-outlined text-[18px]">cancel</span>
</button>
</div>
{/*  Section Filter Chips (Horizontal Swipe)  */}
<div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-nowrap">
<button className="section-chip px-3 py-1.5 rounded-full bg-primary-container text-surface font-label-xs text-label-xs font-bold shadow-sm transition-all" data-filter="all"  type="button">
        Semua (40)
      </button>
<button className="section-chip px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-xs text-label-xs font-bold transition-all flex items-center gap-1" data-filter="unpaid"  type="button">
<span className="w-2 h-2 rounded-full bg-error"></span>
        Belum Lunas (8)
      </button>
<button className="section-chip px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-xs text-label-xs font-semibold shadow-sm transition-all" data-filter="Brass"  type="button">
        Brass (14)
      </button>
<button className="section-chip px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-xs text-label-xs font-semibold shadow-sm transition-all" data-filter="Battery"  type="button">
        Battery (10)
      </button>
<button className="section-chip px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-xs text-label-xs font-semibold shadow-sm transition-all" data-filter="Color Guard"  type="button">
        Color Guard (8)
      </button>
<button className="section-chip px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-label-xs text-label-xs font-semibold shadow-sm transition-all" data-filter="Pit"  type="button">
        Pit (5)
      </button>
</div>
</div>
{/*  Card List of Members  */}
<div className="flex flex-col space-y-space-sm pb-16" id="memberList">
{/*  Card 1: Dimas Wahyu Pratama (Unpaid)  */}
<div className="member-card rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all flex flex-col gap-space-sm" data-amount="50000" data-name="Dimas Wahyu Pratama" data-section="Brass" data-status="unpaid">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-center gap-space-sm min-w-0">
<div className="relative w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center font-headline-md text-headline-md font-bold text-on-surface shrink-0">
            DW
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-error ring-2 ring-surface"></span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-sm text-title-sm font-bold text-on-surface truncate">Dimas Wahyu Pratama</span>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-bold">Brass</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Trumpet 1 • Baris A3</span>
</div>
</div>
</div>
<div className="text-right shrink-0">
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-xs text-label-xs font-bold tracking-tight">
            BELUM BAYAR
          </span>
<p className="font-title-sm text-title-sm font-extrabold text-on-surface mt-1">Rp 50.000</p>
</div>
</div>
{/*  Quick Action Buttons  */}
<div className="grid grid-cols-12 gap-2 pt-1">
<button className="col-span-8 h-12 rounded-xl bg-primary-container text-surface hover:bg-inverse-surface active:scale-[0.98] font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-sm transition-transform"  type="button">
<span className="material-symbols-outlined text-[20px] text-secondary-container">check_circle</span>
<span>Terima Rp 50k Tunai</span>
</button>
<button aria-label="Bayar via QRIS" className="col-span-2 h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest active:scale-95 text-on-surface flex items-center justify-center transition-all"  type="button">
<span className="material-symbols-outlined text-[22px]">qr_code_2</span>
</button>
<button aria-label="Kirim WA Pengingat" className="col-span-2 h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest active:scale-95 text-secondary flex items-center justify-center transition-all"  type="button">
<span className="material-symbols-outlined text-[20px]">chat</span>
</button>
</div>
</div>
{/*  Card 2: Farhan Maulana (Unpaid)  */}
<div className="member-card rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all flex flex-col gap-space-sm" data-amount="50000" data-name="Farhan Maulana" data-section="Brass" data-status="unpaid">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-center gap-space-sm min-w-0">
<div className="relative w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center font-headline-md text-headline-md font-bold text-on-surface shrink-0">
            FM
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-error ring-2 ring-surface"></span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-sm text-title-sm font-bold text-on-surface truncate">Farhan Maulana</span>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-bold">Brass</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Mellophone • Baris B1</span>
</div>
</div>
</div>
<div className="text-right shrink-0">
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-xs text-label-xs font-bold tracking-tight">
            BELUM BAYAR
          </span>
<p className="font-title-sm text-title-sm font-extrabold text-on-surface mt-1">Rp 50.000</p>
</div>
</div>
<div className="grid grid-cols-12 gap-2 pt-1">
<button className="col-span-8 h-12 rounded-xl bg-primary-container text-surface hover:bg-inverse-surface active:scale-[0.98] font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-sm transition-transform"  type="button">
<span className="material-symbols-outlined text-[20px] text-secondary-container">check_circle</span>
<span>Terima Rp 50k Tunai</span>
</button>
<button aria-label="Bayar via QRIS" className="col-span-2 h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest active:scale-95 text-on-surface flex items-center justify-center transition-all"  type="button">
<span className="material-symbols-outlined text-[22px]">qr_code_2</span>
</button>
<button aria-label="Kirim WA Pengingat" className="col-span-2 h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest active:scale-95 text-secondary flex items-center justify-center transition-all"  type="button">
<span className="material-symbols-outlined text-[20px]">chat</span>
</button>
</div>
</div>
{/*  Card 3: Rizky Ramadhan (Unpaid)  */}
<div className="member-card rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all flex flex-col gap-space-sm" data-amount="50000" data-name="Rizky Ramadhan" data-section="Battery" data-status="unpaid">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-center gap-space-sm min-w-0">
<div className="relative w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center font-headline-md text-headline-md font-bold text-on-surface shrink-0">
            RR
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-error ring-2 ring-surface"></span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-sm text-title-sm font-bold text-on-surface truncate">Rizky Ramadhan</span>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="px-2 py-0.5 rounded-md bg-surface-container-highest text-on-surface font-label-xs text-label-xs font-bold">Battery</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Bass Drum 4 • Baris D2</span>
</div>
</div>
</div>
<div className="text-right shrink-0">
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-xs text-label-xs font-bold tracking-tight">
            BELUM BAYAR
          </span>
<p className="font-title-sm text-title-sm font-extrabold text-on-surface mt-1">Rp 50.000</p>
</div>
</div>
<div className="grid grid-cols-12 gap-2 pt-1">
<button className="col-span-8 h-12 rounded-xl bg-primary-container text-surface hover:bg-inverse-surface active:scale-[0.98] font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-sm transition-transform"  type="button">
<span className="material-symbols-outlined text-[20px] text-secondary-container">check_circle</span>
<span>Terima Rp 50k Tunai</span>
</button>
<button aria-label="Bayar via QRIS" className="col-span-2 h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest active:scale-95 text-on-surface flex items-center justify-center transition-all"  type="button">
<span className="material-symbols-outlined text-[22px]">qr_code_2</span>
</button>
<button aria-label="Kirim WA Pengingat" className="col-span-2 h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest active:scale-95 text-secondary flex items-center justify-center transition-all"  type="button">
<span className="material-symbols-outlined text-[20px]">chat</span>
</button>
</div>
</div>
{/*  Card 4: Kevin Adiputra (Unpaid)  */}
<div className="member-card rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all flex flex-col gap-space-sm" data-amount="50000" data-name="Kevin Adiputra" data-section="Brass" data-status="unpaid">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-center gap-space-sm min-w-0">
<div className="relative w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center font-headline-md text-headline-md font-bold text-on-surface shrink-0">
            KA
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-error ring-2 ring-surface"></span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-sm text-title-sm font-bold text-on-surface truncate">Kevin Adiputra</span>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-bold">Brass</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Trombone • Baris C4</span>
</div>
</div>
</div>
<div className="text-right shrink-0">
<span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-xs text-label-xs font-bold tracking-tight">
            BELUM BAYAR
          </span>
<p className="font-title-sm text-title-sm font-extrabold text-on-surface mt-1">Rp 50.000</p>
</div>
</div>
<div className="grid grid-cols-12 gap-2 pt-1">
<button className="col-span-8 h-12 rounded-xl bg-primary-container text-surface hover:bg-inverse-surface active:scale-[0.98] font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-sm transition-transform"  type="button">
<span className="material-symbols-outlined text-[20px] text-secondary-container">check_circle</span>
<span>Terima Rp 50k Tunai</span>
</button>
<button aria-label="Bayar via QRIS" className="col-span-2 h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest active:scale-95 text-on-surface flex items-center justify-center transition-all"  type="button">
<span className="material-symbols-outlined text-[22px]">qr_code_2</span>
</button>
<button aria-label="Kirim WA Pengingat" className="col-span-2 h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest active:scale-95 text-secondary flex items-center justify-center transition-all"  type="button">
<span className="material-symbols-outlined text-[20px]">chat</span>
</button>
</div>
</div>
{/*  Card 5: Bagas Arya Santoso (Paid state example)  */}
<div className="member-card rounded-xl bg-surface-container-low p-space-md opacity-85 shadow-none transition-all flex flex-col gap-space-xs" data-amount="50000" data-name="Bagas Arya Santoso" data-section="Battery" data-status="paid">
<div className="flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm min-w-0">
<div className="relative w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-md text-headline-md font-bold text-on-surface-variant shrink-0">
            BA
            <span className="material-symbols-outlined absolute -bottom-1 -right-1 text-[16px] text-secondary bg-surface-container-low rounded-full" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-sm text-title-sm font-semibold text-on-surface-variant line-through truncate">Bagas Arya Santoso</span>
<div className="flex items-center gap-1.5">
<span className="px-2 py-0.2 rounded-md bg-surface-container-highest text-on-surface-variant font-label-xs text-label-xs">Battery</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Snare Drum Solo</span>
</div>
</div>
</div>
<div className="text-right shrink-0">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-xs text-label-xs font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            LUNAS 14:20
          </span>
<p className="font-body-sm text-body-sm font-semibold text-on-surface-variant mt-0.5">Rp 50.000 • Tunai</p>
</div>
</div>
</div>
{/*  Card 6: Siti Nurhaliza (Paid state example)  */}
<div className="member-card rounded-xl bg-surface-container-low p-space-md opacity-85 shadow-none transition-all flex flex-col gap-space-xs" data-amount="50000" data-name="Siti Nurhaliza" data-section="Color Guard" data-status="paid">
<div className="flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm min-w-0">
<div className="relative w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-md text-headline-md font-bold text-on-surface-variant shrink-0">
            SN
            <span className="material-symbols-outlined absolute -bottom-1 -right-1 text-[16px] text-secondary bg-surface-container-low rounded-full" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-sm text-title-sm font-semibold text-on-surface-variant line-through truncate">Siti Nurhaliza</span>
<div className="flex items-center gap-1.5">
<span className="px-2 py-0.2 rounded-md bg-surface-container-highest text-on-surface-variant font-label-xs text-label-xs">Color Guard</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Rifle Line Head</span>
</div>
</div>
</div>
<div className="text-right shrink-0">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-xs text-label-xs font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            LUNAS 09:15
          </span>
<p className="font-body-sm text-body-sm font-semibold text-on-surface-variant mt-0.5">Rp 50.000 • QRIS</p>
</div>
</div>
</div>
</div>
{/*  Ergonomic Field Bottom Sticky Bar: Physical Cash in Hand  */}
<div className="fixed bottom-16 inset-x-0 z-40 px-gutter-sm pb-2">
<div className="max-w-lg mx-auto rounded-2xl bg-inverse-surface text-inverse-on-surface shadow-xl p-space-sm flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm pl-2 min-w-0">
<div className="w-10 h-10 rounded-xl bg-surface-tint/30 flex items-center justify-center text-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-[24px]">wallet</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-xs text-label-xs text-inverse-on-surface/70 uppercase tracking-wider font-semibold">Tunai di Kantong Lapangan</span>
<p className="font-headline-md text-headline-md font-bold text-surface-bright tracking-tight truncate leading-tight" id="pocketBalance">Rp 3.650.000</p>
</div>
</div>
<button className="shrink-0 px-3.5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 active:scale-95 text-on-secondary font-label-sm text-label-sm font-bold shadow-md flex items-center gap-1.5 transition-transform"  type="button">
<span className="material-symbols-outlined text-[18px]">lock</span>
<span>Tutup Kas</span>
</button>
</div>
</div>
{/*  QRIS Modal Overlay Component  */}
<div className="hidden fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-gutter-sm" id="qrisModal">
<div className="relative w-full max-w-sm rounded-2xl bg-surface-container-lowest p-space-lg shadow-xl text-center space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
<span>QRIS RESMI MB GEMA TARUNA</span>
</div>
<button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-container-highest"  type="button">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
<div className="flex flex-col items-center">
<p className="font-body-sm text-body-sm text-on-surface-variant">Tagihan Iuran Taruna</p>
<h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-0.5" id="modalMemberName">Dimas Wahyu Pratama</h2>
<span className="font-metric-display text-metric-display font-extrabold text-secondary mt-1">Rp 50.000</span>
</div>
{/*  Crisp QR Canvas Representation  */}
<div className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center justify-center">
<div className="w-48 h-48 bg-white p-2 rounded-lg shadow-sm flex items-center justify-center">
{/*  Dynamic high contrast QR vector  */}
<svg className="w-full h-full text-primary" fill="currentColor" viewBox="0 0 100 100">
<rect fill="currentColor" height="25" width="25" x="5" y="5"></rect>
<rect fill="#fff" height="19" width="19" x="8" y="8"></rect>
<rect fill="currentColor" height="13" width="13" x="11" y="11"></rect>
<rect fill="currentColor" height="25" width="25" x="70" y="5"></rect>
<rect fill="#fff" height="19" width="19" x="73" y="8"></rect>
<rect fill="currentColor" height="13" width="13" x="76" y="11"></rect>
<rect fill="currentColor" height="25" width="25" x="5" y="70"></rect>
<rect fill="#fff" height="19" width="19" x="8" y="73"></rect>
<rect fill="currentColor" height="13" width="13" x="11" y="76"></rect>
<rect height="5" width="10" x="35" y="10"></rect>
<rect height="6" width="15" x="50" y="8"></rect>
<rect height="15" width="8" x="35" y="25"></rect>
<rect height="6" width="14" x="48" y="25"></rect>
<rect height="12" width="24" x="38" y="45"></rect>
<rect height="20" width="8" x="68" y="40"></rect>
<rect height="8" width="20" x="10" y="40"></rect>
<rect height="10" width="10" x="15" y="55"></rect>
<rect height="10" width="15" x="35" y="65"></rect>
<rect height="6" width="20" x="55" y="62"></rect>
<rect height="15" width="12" x="55" y="75"></rect>
<rect height="10" width="15" x="75" y="70"></rect>
<rect height="8" width="10" x="80" y="85"></rect>
</svg>
</div>
<p className="font-label-xs text-label-xs text-on-surface-variant font-medium mt-2">NMID: ID102488392817 • MBGT SATUAN</p>
</div>
<div className="flex flex-col gap-2">
<button className="w-full h-12 rounded-xl bg-primary-container text-surface hover:bg-inverse-surface font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-md"  type="button">
<span className="material-symbols-outlined text-[20px] text-secondary-container">verified</span>
<span>Konfirmasi Masuk Kas (Rp 50.000)</span>
</button>
<button className="w-full py-2 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm"  type="button">
          Tutup &amp; Kembali
        </button>
</div>
</div>
</div>
{/*  Toast Notification  */}
<div className="fixed top-20 inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-300 transform -translate-y-6 opacity-0" id="toastNotification">
<div className="mx-gutter-sm px-4 py-2.5 rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl flex items-center gap-2 font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-secondary-container text-[18px]">verified</span>
<span id="toastMessage">Penerimaan iuran berhasil dicatat!</span>
</div>
</div>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]" data-active-classes="text-secondary font-semibold"><div className="relative flex items-center justify-around h-16 px-space-xs max-w-lg mx-auto"><a className="flex flex-col items-center justify-center min-w-[56px] h-full text-on-surface-variant hover:text-on-surface transition-colors py-1 gap-0.5" data-path="dashboard" href="#"><span className="material-symbols-outlined text-[22px]">dashboard</span><span className="font-label-xs text-label-xs">Beranda</span></a><a aria-current="page" className="flex flex-col items-center justify-center min-w-[56px] h-full transition-colors py-1 gap-0.5 text-secondary font-semibold" data-path="iuran-skuad" href="#"><span className="material-symbols-outlined text-[22px]">group</span><span className="font-label-xs text-label-xs">Iuran</span></a><div className="flex flex-col items-center justify-center min-w-[56px] h-full"><a aria-label="Catat Transaksi Cepat" className="relative -top-3 w-12 h-12 rounded-full bg-primary-container text-on-primary shadow-[0_6px_16px_rgba(19,27,46,0.35)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform" data-path="catat-cepat" href="#"><span className="material-symbols-outlined text-[26px] text-surface">add</span></a><span className="font-label-xs text-label-xs text-on-surface-variant -mt-2">Catat</span></div><a className="flex flex-col items-center justify-center min-w-[56px] h-full text-on-surface-variant hover:text-on-surface transition-colors py-1 gap-0.5" data-path="belanja-lapangan" href="#"><span className="material-symbols-outlined text-[22px]">shopping_bag</span><span className="font-label-xs text-label-xs">Belanja</span></a><a className="flex flex-col items-center justify-center min-w-[56px] h-full text-on-surface-variant hover:text-on-surface transition-colors py-1 gap-0.5" data-path="rekap-mutasi" href="#"><span className="material-symbols-outlined text-[22px]">receipt_long</span><span className="font-label-xs text-label-xs">Rekap</span></a></div></nav>
    </>
  );
}
