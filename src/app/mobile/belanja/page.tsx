'use client';

import React, { useState } from 'react';
import { formatRupiah } from '@/lib/utils';

export default function Page() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-gutter-sm flex items-center justify-between gap-space-sm"><div className="flex items-center gap-space-sm min-w-0"><img alt="Emblem logo for Gema Taruna Marching Band featuring a stylized heraldic shield with crossed brass trumpet, drum mallet/percussion element, gold laurel wreath, and a dynamic banner with the text 'GEMA TARUNA'. Navy blue and gold with crimson accents.. Brand logo" className="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1W64D4wP9gktHaJRPyLBJT583cPOoUUg-wTMAkGiMbQR789tkbD3ACfmglcyLYM6vfYUj7IH_BHA5vmvjccgsPEljctJhFxJf0YNcuM_demKa5jydxOZTg1xK2JCtYNVvM1pkBciJiim2-06WWeCrULKnR9xgoeYqATiO74Ssr4ArkYaUGJgmIj5V8PXMOmERr9Bxzjq0ToaFYCIsDBgxSrGI9zN7u4ODJSY1XN1z6khQe5YLaoBIwajY0"/><div className="flex flex-col min-w-0"><div className="flex items-center gap-space-xs"><span className="font-headline-md text-body-md font-bold tracking-tight text-on-surface truncate">Kas MBGT</span><span className="px-1.5 py-0.2 rounded-full bg-secondary text-on-secondary font-label-xs text-label-xs font-bold leading-tight">KAS</span></div><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span><span className="font-label-xs text-label-xs text-secondary font-bold tracking-tight truncate uppercase">Latihan Lapangan Aktif</span></div></div></div><div className="flex items-center gap-space-sm flex-shrink-0"><button aria-label="Notifikasi Operasional" className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span></button><div className="relative flex items-center justify-center pl-1"><img alt="Profile" className="w-8 h-8 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.1)]" src="https://lh3.googleusercontent.com/aida/AEtjO1WzjZNbkEOGj-VCP5WAJN3NT8pfdAqMTQnA3ZiX56agZbb6l2zRDq-rnqEB1rt1g3K6r5C9BKZ3KoIE_T2pahSl_YrR_sh6F3BvHsIEQ6pGp8pzcd1I0L9D6uSInxVbSnCuXZ_yIo79Gblw4J9sjTM-s6wm4n8q3h1y3lBHSKEdybqOAeyTLgpiunSfkv7iegQOW4ikONvEZ-xJUxjqg39r9wQX_UwBRCp4JsB0g0obwmmuqX3eiHvOpA"/><span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary-container text-surface flex items-center justify-center font-label-xs text-[7px] font-bold">B</span></div></div></div></header><main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen"><div className="flex flex-col w-full pb-10">
{/*  Top Operational Banner & Petty Cash Overview  */}
<div className="px-gutter-sm pt-space-md pb-space-sm">
<div className="bg-primary-container text-on-primary rounded-xl p-space-md shadow-md relative overflow-hidden">
{/*  Decorative Emblem Watermark Effect  */}
<div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-secondary-container/10 flex items-center justify-center pointer-events-none">
<span className="material-symbols-outlined text-[80px] text-surface-tint/20">shield</span>
</div>
<div className="relative z-10 flex flex-col gap-1">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span className="font-label-xs text-label-xs uppercase tracking-wider text-secondary-fixed">Kas Lapangan Siaga</span>
</div>
<span className="font-label-xs text-label-xs px-2 py-0.5 rounded-full bg-surface/10 text-surface">Sesi 14:00 - 18:00 WIB</span>
</div>
<h1 className="font-headline-lg-mobile text-headline-lg-mobile text-surface font-bold tracking-tight mt-1">
          Catat Belanja Lapangan
        </h1>
<p className="font-body-sm text-body-sm text-on-primary-container">
          Entri pengeluaran kas tunai seketika di tempat latihan
        </p>
{/*  Current Petty Cash Metric  */}
<div className="mt-space-sm pt-space-xs flex items-baseline justify-between bg-surface/5 p-space-sm rounded-lg backdrop-blur-sm">
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-surface-dim">Saldo Kas Pegangan Saat Ini</span>
<span className="font-headline-md text-headline-md font-bold text-surface tracking-tight" id="currentBalanceDisplay">Rp 3.250.000</span>
</div>
<div className="flex items-center gap-1 text-secondary-fixed font-label-xs text-label-xs">
<span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
<span>Dompet Bendahara</span>
</div>
</div>
</div>
</div>
</div>
{/*  Quick Category Preset Chips  */}
<div className="px-gutter-sm mt-space-sm">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-xs text-label-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-secondary">bolt</span> Presets Cepat Operasional
      </span>
<span className="font-label-xs text-label-xs text-on-surface-variant">Tap 1-kali</span>
</div>
<div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-gutter-sm px-gutter-sm">
<button className="preset-pill flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-secondary-container hover:text-on-secondary-container transition-all active:scale-95 shadow-sm"  type="button">
<span className="text-[15px]">💧</span>
<span className="font-label-sm text-label-sm font-semibold">Galon &amp; Snack</span>
</button>
<button className="preset-pill flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-secondary-container hover:text-on-secondary-container transition-all active:scale-95 shadow-sm"  type="button">
<span className="text-[15px]">🎺</span>
<span className="font-label-sm text-label-sm font-semibold">Sparepart / Oil</span>
</button>
<button className="preset-pill flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-secondary-container hover:text-on-secondary-container transition-all active:scale-95 shadow-sm"  type="button">
<span className="text-[15px]">🚚</span>
<span className="font-label-sm text-label-sm font-semibold">Truk / Bensin</span>
</button>
<button className="preset-pill flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-secondary-container hover:text-on-secondary-container transition-all active:scale-95 shadow-sm"  type="button">
<span className="text-[15px]">🩹</span>
<span className="font-label-sm text-label-sm font-semibold">Medis P3K</span>
</button>
<button className="preset-pill flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-secondary-container hover:text-on-secondary-container transition-all active:scale-95 shadow-sm"  type="button">
<span className="text-[15px]">🚩</span>
<span className="font-label-sm text-label-sm font-semibold">Tali / Lakban</span>
</button>
</div>
</div>
{/*  Primary Input Form Card  */}
<div className="px-gutter-sm mt-space-md">
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-space-md">
{/*  Big Numeric Amount Display Section  */}
<div className="bg-surface-container-low rounded-xl p-space-md flex flex-col items-center justify-center relative overflow-hidden">
<span className="font-label-xs text-label-xs text-on-surface-variant font-bold uppercase tracking-wider mb-1">
          Nominal Pengeluaran Tunai
        </span>
<div className="flex items-baseline justify-center gap-1">
<span className="font-headline-md text-headline-md font-bold text-secondary">Rp</span>
<input className="font-metric-display text-metric-display font-extrabold text-on-surface bg-transparent text-center focus:outline-none w-48 tracking-tight" id="amountInput" inputMode="numeric" type="text" defaultValue="120.000"/>
</div>
{/*  Quick Denomination Increment Pills  */}
<div className="flex items-center gap-2 mt-space-sm">
<button className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-xs text-label-xs font-bold hover:bg-secondary hover:text-on-secondary transition-colors active:scale-95"  type="button">
            +10rb
          </button>
<button className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-xs text-label-xs font-bold hover:bg-secondary hover:text-on-secondary transition-colors active:scale-95"  type="button">
            +50rb
          </button>
<button className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-xs text-label-xs font-bold hover:bg-secondary hover:text-on-secondary transition-colors active:scale-95"  type="button">
            +100rb
          </button>
<button className="px-2 py-1 rounded-full bg-error-container text-on-error-container font-label-xs text-label-xs font-bold hover:bg-error hover:text-on-error transition-colors"  title="Reset" type="button">
<span className="material-symbols-outlined text-[14px]">backspace</span>
</button>
</div>
</div>
{/*  Segmented Pos Anggaran Selector  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-xs text-label-xs font-bold text-on-surface uppercase tracking-wider flex items-center justify-between">
<span>Kategori Pos Kas</span>
<span className="text-secondary font-semibold">Sub-Buku 03</span>
</label>
<div className="grid grid-cols-3 gap-1.5 bg-surface-container-low p-1 rounded-lg">
<button className="pos-btn py-2 px-1 rounded-lg text-center font-label-sm text-label-sm font-semibold transition-all bg-primary-container text-on-primary shadow-sm"  type="button">
            Konsumsi
          </button>
<button className="pos-btn py-2 px-1 rounded-lg text-center font-label-sm text-label-sm font-semibold transition-all text-on-surface-variant hover:bg-surface-container-high"  type="button">
            Alat / Medis
          </button>
<button className="pos-btn py-2 px-1 rounded-lg text-center font-label-sm text-label-sm font-semibold transition-all text-on-surface-variant hover:bg-surface-container-high"  type="button">
            Logistik
          </button>
</div>
</div>
{/*  Nama Toko / Keterangan Belanja  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-xs text-label-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1" htmlFor="vendorInput">
<span className="material-symbols-outlined text-[15px] text-secondary">storefront</span> Nama Toko / Warung Vendor
        </label>
<div className="relative">
<input className="w-full bg-surface-container-low text-on-surface rounded-lg px-space-sm py-2.5 font-body-md text-body-md focus:outline-none focus:bg-surface-container-highest transition-colors placeholder:text-outline" id="vendorInput" placeholder="Contoh: Warung Bu Siti / Indomaret Gate 3" type="text" value="Depot Air Minum Barokah Stadion"/>
</div>
</div>
{/*  Target Section Selector Badges  */}
<div className="flex flex-col gap-1.5">
<div className="flex items-center justify-between">
<label className="font-label-xs text-label-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-secondary">groups</span> Peruntukan Seksi Korps
          </label>
<span className="font-label-xs text-label-xs text-on-surface-variant">Multi-pilihan</span>
</div>
<div className="flex flex-wrap gap-2" id="sectionBadges">
<button className="badge-pill active px-3 py-1.5 rounded-full font-label-xs text-label-xs font-bold transition-all bg-secondary text-on-secondary shadow-sm"  type="button">
            Seluruh Korps
          </button>
<button className="badge-pill px-3 py-1.5 rounded-full font-label-xs text-label-xs font-bold transition-all bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"  type="button">
            🎺 Brass
          </button>
<button className="badge-pill px-3 py-1.5 rounded-full font-label-xs text-label-xs font-bold transition-all bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"  type="button">
            🥁 Battery
          </button>
<button className="badge-pill px-3 py-1.5 rounded-full font-label-xs text-label-xs font-bold transition-all bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"  type="button">
            🎹 Pit Percussion
          </button>
<button className="badge-pill px-3 py-1.5 rounded-full font-label-xs text-label-xs font-bold transition-all bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"  type="button">
            🚩 Color Guard
          </button>
</div>
</div>
{/*  PIC Belanja Lapangan  */}
<div className="flex flex-col gap-1.5">
<label className="font-label-xs text-label-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
<span className="material-symbols-outlined text-[15px] text-secondary">badge</span> Penanggung Jawab Lapangan (PIC)
        </label>
<div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg">
<div className="flex items-center gap-2.5">
<img className="w-9 h-9 rounded-full object-cover shadow-sm" data-alt="Close up avatar photo of Fahmi Pratama, marching band logistics lead officer in clean athletic navy polo with heraldic badge emblem, smiling outdoor football stadium daylight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjUs7WNLemsSjMXvbJm11f7oLOCHgMVUxaFx_ty4zAoBmVJ9pJMEjnR0B9_1wduWXKP4vxMOd-YHXlgV_liVsrhq8H20iICPyR7NTLxN2cQoUeG426Zn9pP1U2bLCtybuaZIFjcg0eNtDid5MJwAzRd7gwMv4agnI90c4U0msvWOSPid8GsUmt0VRsYw-ELzRhAChdlaUiRgt2P1ctpJEGsauB_Gecf1ydR-eOIYZAUXv2ZufxJ3xB"/>
<div className="flex flex-col">
<span className="font-title-sm text-body-md font-bold text-on-surface leading-tight">Fahmi Pratama</span>
<span className="font-label-xs text-label-xs text-on-surface-variant">Koordinator Logistik &amp; Perlengkapan</span>
</div>
</div>
<button className="px-2 py-1 rounded bg-surface-container-high text-on-surface font-label-xs text-label-xs font-semibold hover:bg-surface-container-highest"  type="button">
            Ganti
          </button>
</div>
</div>
</div>
</div>
{/*  Camera Physical Receipt Scanner Section  */}
<div className="px-gutter-sm mt-space-md">
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-label-xs text-label-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-secondary">photo_camera</span> Bukti Struk Fisik / Nota
        </span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-xs text-label-xs text-on-surface-variant">Wajib Audit</span>
</div>
{/*  Receipt Capture Box with Captured Preview Card  */}
<div className="relative rounded-xl overflow-hidden bg-surface-container-low p-space-sm" id="receiptContainer">
{/*  Live Upload/Capture Area (Simulated state: 1 receipt already photographed)  */}
<div className="flex flex-col gap-space-sm">
<div className="relative w-full h-40 rounded-lg overflow-hidden shadow-sm group">
<img className="w-full h-full object-cover" data-alt="High quality overhead photo of a realistic printed cash register receipt on clean textured surface showing itemized purchases of mineral water gallons, snack cartons, and fuel pump slips for Gema Taruna Marching Band logistics, clearly visible numbers, bright day lighting." id="receiptImagePreview" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK6QVQQpyaCtxrVvo4GkY_MZItOEui1OhBSQsbZC9pvesFKslqJUAixiNIpBoEJiScVYaQkJ4aJc1oufeLThYhyTQPcEZfzLF6xi_02ZOuDl3_pNenJBWSx3-VRChQN3xc3AG8QrpI7kyQ5ad70nA3L2vq0cPAvF7sFA9QMkMr4BXh89WK6V5Fx2h5UM5QV6DikUlMkaW8HEP0QhcJxMkwimGeErhIvRJwGzMwm0AVC8VGZBGmCci9"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent flex items-end justify-between p- space-sm p-3">
<div className="flex items-center gap-1.5 text-surface">
<span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
<span className="font-label-xs text-label-xs font-bold">Nota_Lap_1409.jpg (1.4 MB)</span>
</div>
<button className="px-2.5 py-1 rounded bg-surface/90 text-on-surface font-label-xs text-label-xs font-bold shadow hover:bg-surface flex items-center gap-1 backdrop-blur-sm active:scale-95"  type="button">
<span className="material-symbols-outlined text-[14px]">flip_camera_ios</span> Foto Ulang
              </button>
</div>
</div>
{/*  Secondary OCR Analysis Pill  */}
<div className="flex items-center justify-between bg-surface-container-high/60 px-3 py-2 rounded-lg">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-secondary">document_scanner</span>
<div className="flex flex-col">
<span className="font-label-xs text-label-xs font-bold text-on-surface">OCR Match Otomatis: Rp 120.000</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Terbaca: 6x Galon 19L + Es Balok</span>
</div>
</div>
<span className="w-2 h-2 rounded-full bg-secondary"></span>
</div>
</div>
</div>
{/*  Governance Policy Callout (> Rp 500.000 Approval Rule)  */}
<div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container-high text-on-surface" id="governanceBanner">
<span className="material-symbols-outlined text-[20px] text-secondary flex-shrink-0 mt-0.5">verified_user</span>
<div className="flex flex-col">
<span className="font-label-xs text-label-xs font-bold text-on-surface">Prosedur Akuntabilitas Lapangan</span>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
            Pengeluaran di atas <strong className="text-on-surface font-semibold">Rp 500.000</strong> akan otomatis menerbitkan notifikasi persetujuan instan ke Pembina (<strong className="text-on-surface font-semibold">Drs. Sutrisno</strong>).
          </p>
</div>
</div>
</div>
</div>
{/*  Recent Field Purchases Feed Preview  */}
<div className="px-gutter-sm mt-space-md">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-xs text-label-xs font-bold text-on-surface uppercase tracking-wider">
        Pengeluaran Lapangan Hari Ini
      </span>
<span className="font-label-xs text-label-xs text-secondary font-semibold">3 Transaksi</span>
</div>
<div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex flex-col gap-2">
{/*  Item 1  */}
<div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center font-bold">
<span className="material-symbols-outlined text-[18px]">local_gas_station</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm font-bold text-on-surface">Bensin Suzuki Carry Pick Up</span>
<span className="font-label-xs text-label-xs text-on-surface-variant">11:15 WIB • Supir Pak Joko</span>
</div>
</div>
<div className="text-right">
<span className="font-label-sm text-label-sm font-bold text-error">- Rp 100.000</span>
<span className="block font-label-xs text-label-xs text-on-surface-variant">Nota OK</span>
</div>
</div>
{/*  Item 2  */}
<div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center font-bold">
<span className="material-symbols-outlined text-[18px]">medical_services</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm font-bold text-on-surface">Koyo &amp; Spray Pereda Nyeri</span>
<span className="font-label-xs text-label-xs text-on-surface-variant">09:40 WIB • Medis Mbak Rina</span>
</div>
</div>
<div className="text-right">
<span className="font-label-sm text-label-sm font-bold text-error">- Rp 75.000</span>
<span className="block font-label-xs text-label-xs text-on-surface-variant">Nota OK</span>
</div>
</div>
</div>
</div>
{/*  Action Sticky Bar (Field Friendly Large Touch Targets)  */}
<div className="px-gutter-sm mt-space-lg flex flex-col gap-2">
<button className="w-full h-14 rounded-xl bg-primary-container text-surface hover:bg-inverse-surface active:scale-[0.99] font-title-sm text-title-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform" id="submitExpenseBtn"  type="button">
<span className="material-symbols-outlined text-[22px] text-secondary">check_circle</span>
<span>Simpan ke Buku Kas Keluar</span>
</button>
<button className="w-full h-11 rounded-lg bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high active:scale-95 font-label-md text-label-md font-semibold transition-colors flex items-center justify-center"  type="button">
      Batal
    </button>
</div>
{/*  Success Toast Modal Notification (Hidden by default)  */}
<div className="fixed bottom-20 inset-x-4 z-50 transform translate-y-28 opacity-0 pointer-events-none transition-all duration-300 ease-out" id="successToast">
<div className="bg-primary-container text-surface rounded-xl p-space-md shadow-xl flex items-center justify-between gap-3">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary">
<span className="material-symbols-outlined text-[24px]">payments</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm font-bold text-surface">Kas Lapangan Terpotong!</span>
<span className="font-body-sm text-body-sm text-on-primary-container" id="toastDetail">Tersimpan ke Kas MBGT</span>
</div>
</div>
<button className="text-surface-dim hover:text-surface" >
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
</div>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]" data-active-classes="text-secondary font-semibold"><div className="relative flex items-center justify-around h-16 px-space-xs max-w-lg mx-auto"><a className="flex flex-col items-center justify-center min-w-[56px] h-full text-on-surface-variant hover:text-on-surface transition-colors py-1 gap-0.5" data-path="dashboard" href="#"><span className="material-symbols-outlined text-[22px]">dashboard</span><span className="font-label-xs text-label-xs">Beranda</span></a><a className="flex flex-col items-center justify-center min-w-[56px] h-full text-on-surface-variant hover:text-on-surface transition-colors py-1 gap-0.5" data-path="iuran-skuad" href="#"><span className="material-symbols-outlined text-[22px]">group</span><span className="font-label-xs text-label-xs">Iuran</span></a><div className="flex flex-col items-center justify-center min-w-[56px] h-full"><a aria-label="Catat Transaksi Cepat" className="relative -top-3 w-12 h-12 rounded-full bg-primary-container text-on-primary shadow-[0_6px_16px_rgba(19,27,46,0.35)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform" data-path="catat-cepat" href="#"><span className="material-symbols-outlined text-[26px] text-surface">add</span></a><span className="font-label-xs text-label-xs text-on-surface-variant -mt-2">Catat</span></div><a aria-current="page" className="flex flex-col items-center justify-center min-w-[56px] h-full transition-colors py-1 gap-0.5 text-secondary font-semibold" data-path="belanja-lapangan" href="#"><span className="material-symbols-outlined text-[22px]">shopping_bag</span><span className="font-label-xs text-label-xs">Belanja</span></a><a className="flex flex-col items-center justify-center min-w-[56px] h-full text-on-surface-variant hover:text-on-surface transition-colors py-1 gap-0.5" data-path="rekap-mutasi" href="#"><span className="material-symbols-outlined text-[22px]">receipt_long</span><span className="font-label-xs text-label-xs">Rekap</span></a></div></nav>
    </>
  );
}
