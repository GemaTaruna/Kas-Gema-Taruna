'use client';

import React, { useState } from 'react';
import { formatRupiah } from '@/lib/utils';

export default function Page() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-gutter-sm flex items-center justify-between gap-space-sm"><div className="flex items-center gap-space-sm min-w-0"><img alt="Emblem logo for Gema Taruna Marching Band featuring a stylized heraldic shield with crossed brass trumpet, drum mallet/percussion element, gold laurel wreath, and a dynamic banner with the text 'GEMA TARUNA'. Navy blue and gold with crimson accents.. Brand logo" className="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1W64D4wP9gktHaJRPyLBJT583cPOoUUg-wTMAkGiMbQR789tkbD3ACfmglcyLYM6vfYUj7IH_BHA5vmvjccgsPEljctJhFxJf0YNcuM_demKa5jydxOZTg1xK2JCtYNVvM1pkBciJiim2-06WWeCrULKnR9xgoeYqATiO74Ssr4ArkYaUGJgmIj5V8PXMOmERr9Bxzjq0ToaFYCIsDBgxSrGI9zN7u4ODJSY1XN1z6khQe5YLaoBIwajY0"/><div className="flex flex-col min-w-0"><div className="flex items-center gap-1.5"><span className="font-title-sm text-title-sm text-primary tracking-tight truncate">KasMBGT Anggota</span><span className="bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs px-1.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">TRANSPARAN</span></div><span className="font-label-xs text-label-xs text-on-surface-variant truncate">Ringkasan</span></div></div><div className="flex items-center gap-1 flex-shrink-0"><button aria-label="Notifikasi Transparansi" className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-secondary transition-colors relative rounded-full"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-secondary-container"></span></button><div className="w-11 h-11 flex items-center justify-center"><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WzjZNbkEOGj-VCP5WAJN3NT8pfdAqMTQnA3ZiX56agZbb6l2zRDq-rnqEB1rt1g3K6r5C9BKZ3KoIE_T2pahSl_YrR_sh6F3BvHsIEQ6pGp8pzcd1I0L9D6uSInxVbSnCuXZ_yIo79Gblw4J9sjTM-s6wm4n8q3h1y3lBHSKEdybqOAeyTLgpiunSfkv7iegQOW4ikONvEZ-xJUxjqg39r9wQX_UwBRCp4JsB0g0obwmmuqX3eiHvOpA"/></div></div></div></header><main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface"><div className="flex flex-col w-full px-gutter-sm space-y-space-md">
{/*  Sambutan Anggota & Kartu Identitas Prestisius  */}
<div className="relative overflow-hidden rounded-xl bg-primary-container text-on-primary p-space-md shadow-md">
<div className="absolute -right-6 -bottom-8 w-36 h-36 rounded-full bg-secondary/15 blur-2xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col space-y-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/10 backdrop-blur-md">
<span className="material-symbols-outlined text-[14px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
<span className="font-label-xs text-label-xs uppercase tracking-wider text-surface-bright">Mode Transparansi Terbuka</span>
</div>
<span className="font-label-xs text-label-xs text-primary-fixed-dim">ID: MBGT-014</span>
</div>
<div className="flex items-center gap-3 pt-1">
<div className="relative flex-shrink-0">
<img className="w-13 h-13 w-12 h-12 rounded-full object-cover shadow-sm bg-surface-container-highest" data-alt="Close up warm studio portrait of Dimas, a focused Indonesian youth trumpet player in marching band uniform with brass lapel pins and confident friendly expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAORCE3ZLItrBACAWlanKKg3vRrS4DGot6DE65-WYuqDORQSPm_E4O-YGwv_8Vwhy4TVIqF0KjAQmtcuJYT2n4_X5-q4NS090nhA2gDOWAj5oUrjO3QVOuvmqcrDuvP91F9gRjEUiyNm2HN_poXZLRhqrj4rQ3ahK1cBiZBMbdo4pWrwH5UgGfxEpZLoDNKaIvkEzGpYaImXnJIvpJc9cxc_aFMbLabKAuLmgyfSMHROoVsCuK5xo8W"/>
<span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary-container ring-2 ring-primary-container"></span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-xs text-label-xs uppercase text-secondary-fixed tracking-wider">Selamat Datang di Portal Kas</span>
<h1 className="font-headline-md text-headline-md tracking-tight text-surface-bright truncate">Dimas Wahyu Pratama</h1>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-xs text-label-xs text-surface-dim font-medium">Lead Trumpet 1</span>
<span className="w-1 h-1 rounded-full bg-primary-fixed-dim"></span>
<span className="font-label-xs text-label-xs text-secondary-container">Baris Drill A3</span>
</div>
</div>
</div>
<div className="flex items-center justify-between pt-2">
<div className="flex items-center gap-1.5">
<span className="px-2 py-0.5 rounded-full bg-secondary/30 text-secondary-fixed font-label-xs text-label-xs">🎺 Brass Section</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/15 text-primary-fixed font-label-xs text-label-xs">Aktif Skuad 2026</span>
</div>
<div className="flex items-center gap-1 text-surface-variant font-label-xs text-label-xs">
<span className="material-symbols-outlined text-[14px]">lock_open_right</span>
<span className="">Akses Anggota</span>
</div>
</div>
</div>
</div>
{/*  Status Iuran Berjalan: Skema 5rb/Latihan  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm space-y-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]">calendar_month</span>
</div>
<div>
<span className="font-title-sm text-title-sm text-on-surface block leading-tight">Iuran Minggu Ini</span>
<span className="font-label-xs text-label-xs text-on-surface-variant">Minggu Ke-4 September 2026 • Tarif Rp 5.000 / drill</span>
</div>
</div>
<span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs">2 Sesi / Pekan</span>
</div>
<div className="grid grid-cols-2 gap-2.5 pt-1">
{/*  Sesi Terakhir  */}
<div className="rounded-lg bg-surface-container-low p-2.5 flex flex-col justify-between space-y-2">
<div className="flex items-center justify-between">
<span className="font-label-xs text-label-xs text-on-surface-variant">Rabu, 24 Sep</span>
<span className="px-1.5 py-0.5 rounded bg-surface-container text-secondary font-label-xs text-label-xs flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            LUNAS
          </span>
</div>
<div>
<div className="font-title-sm text-title-sm text-on-surface font-bold">Rp 5.000</div>
<div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5"><span className="material-symbols-outlined text-[13px]">payments</span><span className="truncate">100% Kas Tunai Fisik (Brankas MBGT)</span></div>
</div>
</div>
{/*  Sesi Mendatang  */}
<div className="rounded-lg bg-surface-container p-2.5 flex flex-col justify-between space-y-2 relative overflow-hidden">
<div className="absolute -right-2 -bottom-2 w-10 h-10 rounded-full bg-secondary-fixed/50 pointer-events-none"></div>
<div className="flex items-center justify-between relative z-10">
<span className="font-label-xs text-label-xs text-on-surface">Sabtu, 27 Sep</span>
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
            SIAP BAYAR
          </span>
</div>
<div className="relative z-10">
<div className="font-title-sm text-title-sm text-secondary font-bold">Rp 5.000</div>
<div className="font-body-sm text-body-sm text-on-secondary-fixed-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[13px]">schedule</span>
<span className="">Sebelum Drill 15.30</span>
</div>
</div>
</div>
</div>
{/*  Tombol Aksi Cepat Iuran  */}
<div className="pt-1 flex gap-2">
<button className="flex-1 h-10 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] shadow-sm" id="btn-show-cash"><span className="material-symbols-outlined text-[18px]">payments</span><span className="">Setor Tunai Lapangan</span></button>
<button className="h-10 px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-1 transition-colors hover:bg-surface-container-high" id="btn-show-receipt">
<span className="material-symbols-outlined text-[18px]">receipt</span>
<span className="">Kuitansi</span>
</button>
</div>
</div>
{/*  QRIS Drawer / Popover (Hidden by Default)  */}
{/*  3 Kartu Metrik Taruna  */}
<div className="grid grid-cols-1 gap-2.5">
{/*  Metrik 1: Disiplin Iuran Pribadi  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
<svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
<path className="text-surface-container stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5"></path>
<path className="text-secondary stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="94, 100" strokeLinecap="round" strokeWidth="3.5"></path>
</svg>
<span className="absolute font-label-xs text-label-xs text-secondary font-bold">94%</span>
</div>
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Disiplin Korps Dimas</span>
<span className="font-title-sm text-title-sm text-on-surface font-bold">15 / 16 Sesi Lunas</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">0 Tunggakan Aktif • Catatan Bersih</span>
</div>
</div>
<div className="w-8 h-8 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]">military_tech</span>
</div>
</div>
{/*  Metrik 2 & 3: Bento Grid Ringkas Kas & Alokasi Brass  */}
<div className="grid grid-cols-2 gap-2.5">
{/*  Kas Terbuka MBGT  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between space-y-2">
<div className="flex items-center justify-between">
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Kas Total MBGT</span>
<div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[15px]">account_balance</span>
</div>
</div>
<div>
<div className="font-title-sm text-title-sm text-on-surface font-extrabold tracking-tight">Rp 12.450.000</div>
<div className="font-body-sm text-body-sm text-secondary flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-[13px]">payments</span><span className="truncate">100% Kas Tunai Fisik (Brankas MBGT)</span></div>
</div>
</div>
{/*  Alokasi Seksi Brass  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between space-y-2">
<div className="flex items-center justify-between">
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Seksi Brass</span>
<div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span className="material-symbols-outlined text-[15px]">music_note</span>
</div>
</div>
<div>
<div className="font-title-sm text-title-sm text-on-surface font-extrabold tracking-tight">Rp 3.850.000</div>
<div className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">6 Pelumas + Servis Wadah</div>
</div>
</div>
</div>
</div>
{/*  Foto Dokumentasi Drill & Transparansi Lapangan  */}
<div className="relative rounded-xl overflow-hidden shadow-sm">
<div className="bg-cover bg-center w-full h-36 flex flex-col justify-end p-3 relative" data-alt="High angle outdoor view of a marching band brass line drilling with shiny trumpets reflecting bright daylight on green turf field with precise uniform stance" style={{ backgroundImage: "url(\'https://lh3.googleusercontent.com/aida-public/AB6AXuBT-wb_Ycf9utj0m18HeuJ1EEwaUFnJemZiu4o9jOxtl2ghNjtgCU-lfolbIz-lQMit40D_95wdUplUKfnEHr4Fr7B-47mKD9C_-HgtHoxcR4GzB_NJpjAVeg3czC5kLDFDPaEHVUUeUrEwQXOllyqHnX0PsUJUK7wDWolV4cCsYUsnXwB3RhWgAReyySwvItHJaV1Dd1YzmAdmb_Ks7eeRg8-P8Aw0Ay9rc-MF7p4vGpDY5FDA2U0r\')" }}>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/40 to-transparent"></div>
<div className="relative z-10 flex items-center justify-between text-surface-bright">
<div>
<span className="font-label-xs text-label-xs uppercase tracking-wider text-secondary-fixed">Fokus Musim 2026</span>
<p className="font-title-sm text-title-sm leading-tight text-surface-bright">Persiapan Gelar Pamor &amp; Kejurnas</p>
</div>
<div className="px-2 py-1 rounded bg-surface-container-lowest/20 backdrop-blur-md font-label-xs text-label-xs">
          Brass Focus
        </div>
</div>
</div>
</div>
{/*  Real-Time Feed Kas Terbuka Hari Ini  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm space-y-3">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
<span className="font-title-sm text-title-sm text-on-surface">Arus Pengeluaran Lapangan</span>
</div>
<span className="font-label-xs text-label-xs text-on-surface-variant">Update 24 Sep</span>
</div>
{/*  Feed Items  */}
<div className="space-y-2">
{/*  Item 1: Galon Air  */}
<div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between gap-3">
<div className="flex items-center gap-2.5 min-w-0">
<div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-[18px] flex-shrink-0">
            💧
          </div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-on-surface font-semibold truncate">5 Galon Air Mineral &amp; Es Balok</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Logistik drill lapangan utama • 68 anggota</span>
</div>
</div>
<div className="text-right flex-shrink-0">
<span className="font-title-sm text-title-sm text-on-surface font-bold">-Rp 85.000</span>
<span className="block font-label-xs text-label-xs text-secondary">Rabu 16.45</span>
</div>
</div>
{/*  Item 2: Valve Oil Trombone  */}
<div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between gap-3">
<div className="flex items-center gap-2.5 min-w-0">
<div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-[18px] flex-shrink-0">
            🎺
          </div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-on-surface font-semibold truncate">Valve Oil Trombone Darurat</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Seksi Brass • Slide rotor macet saat run-through</span>
</div>
</div>
<div className="text-right flex-shrink-0">
<span className="font-title-sm text-title-sm text-on-surface font-bold">-Rp 120.000</span>
<span className="block font-label-xs text-label-xs text-secondary">Rabu 17.15</span>
</div>
</div>
{/*  Item 3: Sewa Mobil Bak Pit  */}
<div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between gap-3">
<div className="flex items-center gap-2.5 min-w-0">
<div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-[18px] flex-shrink-0">
            🚚
          </div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-on-surface font-semibold truncate">Sewa Mobil Bak Angkut Alat Pit</span>
<span className="font-body-sm text-body-sm text-on-surface-variant truncate">Marimba, Timpani &amp; Genset Lapangan Gedung Spora</span>
</div>
</div>
<div className="text-right flex-shrink-0">
<span className="font-title-sm text-title-sm text-on-surface font-bold">-Rp 150.000</span>
<span className="block font-label-xs text-label-xs text-secondary">Rabu 18.00</span>
</div>
</div>
</div>
{/*  Verification Badge Footer  */}
<div className="flex items-center justify-between p-2 rounded-lg bg-surface-container font-label-xs text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
<span className="">Diverifikasi Kak Fahmi Pratama (Bendahara MBGT)</span>
</div>
<a className="text-secondary font-semibold flex items-center hover:underline" href="#">
        Detail Nota
        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>
</div>
</div>
{/*  Aksi Cepat Anggota  */}
<div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm space-y-2.5">
<span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant">Layanan Mandiri Anggota</span>
<div className="grid grid-cols-1 gap-2">
{/*  Unduh Kartu PDF  */}
<button className="w-full h-11 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between text-on-surface">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded bg-surface-container-lowest flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[18px]">download_for_offline</span>
</div>
<span className="font-label-md text-label-md font-semibold">Unduh Kartu Iuran Digital (PDF)</span>
</div>
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
</button>
{/*  WA Bendahara  */}
<a className="w-full h-11 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between text-on-surface" href="https://wa.me/6281234567890?text=Halo%20Kak%20Fahmi%20Bendahara%20MBGT,%20saya%20Dimas%20(MBGT-014)%20mau%20konfirmasi%20iuran" rel="noopener noreferrer" target="_blank">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded bg-secondary-container text-on-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">chat</span>
</div>
<span className="font-label-md text-label-md font-semibold">Tanya / Konfirmasi ke Bendahara</span>
</div>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs">WhatsApp</span>
</a>
</div>
{/*  Beasiswa / Keringanan Iuran  */}
<div className="pt-2 text-center">
<a className="inline-flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">
<span className="material-symbols-outlined text-[14px]">volunteer_activism</span>
<span className="underline">Pengajuan Keringanan / Bantuan Kas Skuad Korps</span>
</a>
</div>
</div>
{/*  Foto Profil Tim / Galeri Kecil Pembina  */}
<div className="rounded-xl bg-surface-container-lowest p-3 shadow-sm flex items-center gap-3">
<img className="w-14 h-14 rounded-lg object-cover bg-surface-container" data-alt="Marching band staff instructor in field uniform supervising drum major and brass section on rehearsal field under bright morning sunlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu4ljT4_Zl2gE0C2uQXNGkZy3ZferHxpxGKlW1fzx-Z5u123cmZ7M2S0utbInGdGCwREynhZEdig9GvVXOgZ9JizZ9-uDVdJsYbr82GNiaAoPbeEQ5XbgptVrZ0kyyCckWEWBiPhn1W7x535eN4Eaj3kk3tFWrOMqZAVKwy_1p1MqRflSNZZTEKfOPyfRAkQdyMAChsfN4V3O-IpHWeGJBFx2wBqwwLdcNmVH8kdvGZALqIFmMUSSa"/>
<div className="flex flex-col min-w-0">
<span className="font-label-xs text-label-xs uppercase text-secondary">Komitmen Akuntabilitas</span>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">"Setiap rupiah keringat anggota adalah napas harmoni dan disiplin suara korps Gema Taruna."</p>
<span className="font-label-xs text-label-xs text-on-surface font-semibold mt-0.5">— Dewan Pembina &amp; Pengurus MBGT</span>
</div>
</div>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]" data-active-classes="text-secondary font-semibold"><div className="flex justify-around items-center h-16 px-gutter-sm"><a aria-current="page" className="flex flex-col items-center justify-center w-14 h-14 transition-colors text-secondary font-semibold" data-path="ringkasan" href="#"><span className="material-symbols-outlined text-[24px]">dashboard</span><span className="font-label-xs text-label-xs mt-0.5">Beranda</span></a><a className="flex flex-col items-center justify-center w-14 h-14 text-on-surface-variant transition-colors" data-path="iuran-saya" href="#"><span className="material-symbols-outlined text-[24px]">event_available</span><span className="font-label-xs text-label-xs mt-0.5">Iuran</span></a><a className="flex flex-col items-center justify-center w-14 h-14 text-on-surface-variant transition-colors" data-path="transparansi-kas" href="#"><span className="material-symbols-outlined text-[24px]">pie_chart</span><span className="font-label-xs text-label-xs mt-0.5">Arus Kas</span></a><a className="flex flex-col items-center justify-center w-14 h-14 text-on-surface-variant transition-colors" data-path="slip-dan-bantuan" href="#"><span className="material-symbols-outlined text-[24px]">receipt_long</span><span className="font-label-xs text-label-xs mt-0.5">Slip</span></a></div></nav>

    </>
  );
}
