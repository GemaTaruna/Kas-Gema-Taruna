'use client';

import React, { useState } from 'react';
import { formatRupiah } from '@/lib/utils';

export default function Page() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 w-full px-space-lg flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md min-w-0"><img alt="Emblem logo for Gema Taruna Marching Band featuring a stylized heraldic shield with crossed brass trumpet, drum mallet/percussion element, gold laurel wreath, and a dynamic banner with the text 'GEMA TARUNA'. Navy blue and gold with crimson accents.. Brand logo" className="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1W64D4wP9gktHaJRPyLBJT583cPOoUUg-wTMAkGiMbQR789tkbD3ACfmglcyLYM6vfYUj7IH_BHA5vmvjccgsPEljctJhFxJf0YNcuM_demKa5jydxOZTg1xK2JCtYNVvM1pkBciJiim2-06WWeCrULKnR9xgoeYqATiO74Ssr4ArkYaUGJgmIj5V8PXMOmERr9Bxzjq0ToaFYCIsDBgxSrGI9zN7u4ODJSY1XN1z6khQe5YLaoBIwajY0"/><div className="flex flex-col min-w-0"><div className="flex items-center gap-space-sm"><span className="font-title-sm text-title-sm text-on-surface truncate">KAS GEMA TARUNA</span><span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs uppercase tracking-wider">ANGGOTA (READ-ONLY)</span></div><span className="font-label-xs text-label-xs text-on-surface-variant truncate hidden sm:inline-block">Portal Transparansi Keuangan Anggota</span></div></div><div className="flex items-center gap-space-md flex-shrink-0"><button aria-label="Notifikasi" className="p-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative" type="button"><span className="material-symbols-outlined text-title-sm">notifications</span><span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary-container"></span></button><div className="flex items-center gap-space-sm pl-space-sm"><img alt="Profile" className="w-8 h-8 rounded-full object-cover flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1WzjZNbkEOGj-VCP5WAJN3NT8pfdAqMTQnA3ZiX56agZbb6l2zRDq-rnqEB1rt1g3K6r5C9BKZ3KoIE_T2pahSl_YrR_sh6F3BvHsIEQ6pGp8pzcd1I0L9D6uSInxVbSnCuXZ_yIo79Gblw4J9sjTM-s6wm4n8q3h1y3lBHSKEdybqOAeyTLgpiunSfkv7iegQOW4ikONvEZ-xJUxjqg39r9wQX_UwBRCp4JsB0g0obwmmuqX3eiHvOpA"/><div className="hidden md:flex flex-col text-left"><span className="font-label-md text-label-md text-on-surface leading-tight">Dimas Wahyu Pratama</span><span className="font-label-xs text-label-xs text-on-surface-variant">Trumpet 1 / Baris A3</span></div></div><a className="inline-flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-sm text-label-sm" data-path="login" href="#"><span className="material-symbols-outlined text-body-lg">logout</span><span className="hidden lg:inline">Keluar</span></a></div></div></header><aside className="fixed left-0 top-16 bottom-0 w-72 bg-surface-container-low z-40 flex flex-col justify-between p-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-y-auto"><div className="flex flex-col gap-space-md"><div className="px-space-sm py-space-xs"><span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant">Navigasi Anggota</span></div><nav className="flex flex-col gap-1" data-active-classes="bg-primary-container text-on-primary font-title-sm"><a aria-current="page" className="flex items-center gap-space-md px-space-md py-2.5 rounded-lg transition-colors bg-primary-container text-on-primary font-title-sm" data-path="ringkasan-kas-saya" href="#"><span className="material-symbols-outlined text-title-sm">account_balance_wallet</span><span className="">Ringkasan Kas Saya</span></a><a className="flex items-center gap-space-md px-space-md py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="transparansi-kas-mbgt" href="#"><span className="material-symbols-outlined text-title-sm">query_stats</span><span className="">Transparansi Kas MBGT</span></a><a className="flex items-center gap-space-md px-space-md py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="status-iuran-seksi" href="#"><span className="material-symbols-outlined text-title-sm">groups</span><span className="">Status Iuran Seksi</span></a><a className="flex items-center gap-space-md px-space-md py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="realisasi-anggaran-gpmb" href="#"><span className="material-symbols-outlined text-title-sm">pie_chart</span><span className="">Realisasi Anggaran GPMB</span></a><a className="flex items-center gap-space-md px-space-md py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="unduh-kuitansi-iuran" href="#"><span className="material-symbols-outlined text-title-sm">receipt_long</span><span className="">Unduh Kuitansi Iuran</span></a><a className="flex items-center gap-space-md px-space-md py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" data-path="hubungi-bendahara" href="#"><span className="material-symbols-outlined text-title-sm">support_agent</span><span className="">Hubungi Bendahara</span></a></nav></div><div className="flex flex-col gap-space-sm pt-space-md mt-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="flex flex-col"><span className="font-label-xs text-label-xs text-on-surface-variant">Status Keanggotaan</span><span className="font-label-md text-label-md text-on-surface font-semibold">MB-014</span><span className="font-body-sm text-body-sm text-on-surface-variant">Seksi Brass (Lead Trumpet 1)</span></div><a className="flex items-center justify-center gap-space-xs w-full py-2 px-space-sm rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors font-label-sm text-label-sm" href="https://wa.me/" rel="noopener noreferrer" target="_blank"><span className="material-symbols-outlined text-title-sm">chat</span><span className="">WhatsApp Bendahara</span></a></div></aside><div className="pl-72"><main className="w-full min-h-screen pt-16 px-space-lg pb-space-xl bg-background"><div className="flex flex-col w-full">
{/*  Top Personal Welcome & Transparency Banner  */}
<div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-container via-inverse-surface to-primary-container text-on-primary p-space-lg shadow-md mb-space-lg">
<div className="absolute -right-10 -bottom-14 w-72 h-72 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
<div className="flex items-start gap-space-md max-w-3xl">
<div className="w-14 h-14 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary-container flex-shrink-0 shadow-sm mt-0.5">
<span className="material-symbols-outlined text-display" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
</div>
<div className="flex flex-col gap-1">
<div className="flex flex-wrap items-center gap-space-xs">
<h1 className="font-headline-lg text-headline-lg tracking-tight text-on-primary">
              Halo, Dimas Wahyu Pratama!
            </h1>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-xs text-label-xs uppercase">
<span className="w-1.5 h-1.5 rounded-full bg-on-secondary-container"></span>
              Mode Transparansi Read-Only
            </span>
</div>
<p className="font-body-md text-body-md text-surface-container-high leading-relaxed">
            Selamat datang di portal transparansi keuangan resmi MBGT. Pantau disiplin iuran pribadi Anda, buku kas terbuka korps, dan rincian alokasi belanja Seksi Brass secara real-time.
          </p>
<div className="flex items-center gap-space-md pt-2 text-surface-container-high font-label-xs text-label-xs">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-label-md text-secondary-container">verified</span>
              Terverifikasi Bendahara Umum (Kak Fahmi P.)
            </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-label-md text-surface-tint">sync</span>
              Sinkronisasi: Hari ini, 09:30 WIB
            </span>
</div>
</div>
</div>
{/*  Quick Action Pill / Reminder Status Card  */}
<div className="flex flex-col w-full lg:w-auto min-w-[280px] bg-surface-container-lowest/10 backdrop-blur-md rounded-xl p-space-md text-on-primary shadow-sm">
<div className="flex items-center justify-between mb-2">
<span className="font-label-xs text-label-xs uppercase tracking-wider text-surface-container-high">Tagihan Kas Bulanan</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-primary-fixed font-label-xs text-label-xs font-semibold">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
            September Lunas
          </span>
</div>
<p className="font-title-sm text-title-sm font-semibold text-on-primary mb-1">
          Iuran Oktober 2026 (Rp 50.000)
        </p>
<p className="font-body-sm text-body-sm text-surface-container-high mb-space-md">
          Portal pembayaran dibuka 5 hari lagi (Jatuh tempo 10 Okt)
        </p>
<div className="flex items-center gap-2">
<a className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-space-sm rounded-lg bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold hover:bg-secondary transition-colors shadow-sm" href="https://wa.me/" rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-title-sm">send</span>
<span className="">Konfirmasi WA</span>
</a>
<button className="inline-flex items-center justify-center p-2 rounded-lg bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-on-primary transition-colors"  title="Unduh Kartu Iuran" type="button">
<span className="material-symbols-outlined text-title-sm">badge</span>
</button>
</div>
</div>
</div>
</div>
{/*  4 Primary KPI Metrik Cards  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
{/*  Card 1: My Dues Status  */}
<div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-1 bg-secondary-container"></div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Iuran Saya Musim 2026</span>
<div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-title-sm">military_tech</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-metric-display text-metric-display text-on-surface font-bold tracking-tight">8 / 9</span>
<span className="font-title-sm text-title-sm text-on-surface-variant">Bulan Lunas</span>
</div>
<p className="font-label-sm text-label-sm text-secondary font-semibold mt-1">Rp 400.000 Terhimpun (89%)</p>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span className="inline-flex items-center gap-1 text-on-surface font-label-xs text-label-xs">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span> Sangat Disiplin
        </span>
<span className="font-label-xs text-label-xs">Bebas Denda</span>
</div>
</div>
{/*  Card 2: Open Treasury Balance  */}
<div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-1 bg-primary-container"></div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Saldo Kas Terbuka MBGT</span>
<div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-title-sm">account_balance</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-1">
<span className="font-metric-display text-metric-display text-on-surface font-bold tracking-tight">Rp 12.450.000</span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-1">100% Kas Fisik Brankas Lapangan</p>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span className="font-label-xs text-label-xs">Audited: 24 Sep 2026</span>
<span className="inline-flex items-center text-primary-container font-label-xs text-label-xs font-semibold">Publik &amp; Transparan</span>
</div>
</div>
{/*  Card 3: Brass Division Spending  */}
<div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Belanja Seksi Brass</span>
<div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-title-sm">music_note</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-1">
<span className="font-metric-display text-metric-display text-on-surface font-bold tracking-tight">Rp 3.850.000</span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Total Serapan Musim 2026</p>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span className="font-label-xs text-label-xs">Mouthpiece &amp; Servis Valve</span>
<span className="text-secondary font-label-xs text-label-xs font-semibold">14 Anggota</span>
</div>
</div>
{/*  Card 4: GPMB Budget Readiness  */}
<div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-1 bg-surface-tint"></div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Pagu Kejuaraan GPMB '26</span>
<div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-title-sm">stadium</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-metric-display text-metric-display text-on-surface font-bold tracking-tight">62.5%</span>
<span className="font-title-sm text-title-sm text-on-surface-variant">Tercapai</span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Rp 25.000.000 / Rp 40.000.000</p>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between font-label-xs text-label-xs">
<span className="text-secondary font-semibold">Tersisa 36 Hari</span>
<span className="text-on-surface-variant">Parade Jakarta</span>
</div>
</div>
</div>
{/*  Main Asymmetric 2-Column Content Layout (7 Cols Left / 5 Cols Right)  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg">
{/*  LEFT COLUMN (7/12) - Member Personal Dues & Ledger History  */}
<div className="lg:col-span-7 flex flex-col gap-space-lg">
{/*  Card: 12-Month Matrix Discipline  */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-sm">
<div>
<span className="font-label-xs text-label-xs uppercase tracking-wider text-secondary font-bold">Disiplin Individu</span>
<h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
              Rekapitulasi Iuran Pribadi (2026)
            </h2>
</div>
<div className="flex items-center gap-space-sm bg-surface-container-low px-space-sm py-1 rounded-lg">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
<span className="font-label-xs text-label-xs text-on-surface-variant font-medium">Besaran Iuran: Rp 50.000 / bln</span>
</div>
</div>
{/*  12 Months Visual Grid Matrix  */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-space-sm">
{/*  Jan  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">JAN</span>
<span className="material-symbols-outlined text-title-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<span className="font-label-xs text-label-xs font-semibold text-secondary">LUNAS</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">05 Jan • Tunai</span>
</div>
{/*  Feb  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">FEB</span>
<span className="material-symbols-outlined text-title-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<span className="font-label-xs text-label-xs font-semibold text-secondary">LUNAS</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">03 Feb • Tunai</span>
</div>
{/*  Mar  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">MAR</span>
<span className="material-symbols-outlined text-title-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<span className="font-label-xs text-label-xs font-semibold text-secondary">LUNAS</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">08 Mar • Tunai</span>
</div>
{/*  Apr  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">APR</span>
<span className="material-symbols-outlined text-title-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<span className="font-label-xs text-label-xs font-semibold text-secondary">LUNAS</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">02 Apr • Tunai</span>
</div>
{/*  Mei  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">MEI</span>
<span className="material-symbols-outlined text-title-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<span className="font-label-xs text-label-xs font-semibold text-secondary">LUNAS</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">06 Mei • Tunai</span>
</div>
{/*  Jun  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">JUN</span>
<span className="material-symbols-outlined text-title-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<span className="font-label-xs text-label-xs font-semibold text-secondary">LUNAS</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">04 Jun • Tunai</span>
</div>
{/*  Jul  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">JUL</span>
<span className="material-symbols-outlined text-title-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<span className="font-label-xs text-label-xs font-semibold text-secondary">LUNAS</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">10 Jul • Tunai</span>
</div>
{/*  Agu  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">AGU</span>
<span className="material-symbols-outlined text-title-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<span className="font-label-xs text-label-xs font-semibold text-secondary">LUNAS</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">05 Agu • Tunai</span>
</div>
{/*  Sep (Current)  */}
<div className="p-space-sm rounded-lg bg-secondary-fixed/50 flex flex-col gap-1 relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">SEP</span>
<span className="material-symbols-outlined text-title-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
</div>
<span className="font-label-xs text-label-xs font-semibold text-secondary">LUNAS</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">24 Sep • Lapangan</span>
</div>
{/*  Okt  */}
<div className="p-space-sm rounded-lg bg-surface-container-high/40 flex flex-col gap-1 relative">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">OKT</span>
<span className="material-symbols-outlined text-title-sm text-on-surface-variant">schedule</span>
</div>
<span className="font-label-xs text-label-xs font-semibold text-on-surface-variant">MENDATANG</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Tempo: 10 Okt</span>
</div>
{/*  Nov  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 opacity-70">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">NOV</span>
<span className="material-symbols-outlined text-title-sm text-on-surface-variant">lock</span>
</div>
<span className="font-label-xs text-label-xs text-on-surface-variant">MENDATANG</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Pagu Rutin</span>
</div>
{/*  Des  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1 opacity-70">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold text-on-surface">DES</span>
<span className="material-symbols-outlined text-title-sm text-on-surface-variant">lock</span>
</div>
<span className="font-label-xs text-label-xs text-on-surface-variant">MENDATANG</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Tutup Buku</span>
</div>
</div>
{/*  Transparency Policy Breakdown Callout  */}
<div className="mt-space-xs p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-title-sm">pie_chart</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Alokasi Setiap Rp 50.000 Iuran Anda:</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
                60% (Rp 30rb) Perawatan Alat Musik • 25% (Rp 12.5rb) Logistik • 15% (Rp 7.5rb) Tabungan GPMB
              </span>
</div>
</div>
<span className="inline-flex items-center px-2 py-1 rounded bg-surface-container-high text-on-surface font-label-xs text-label-xs uppercase tracking-wide">
            AD/ART MBGT
          </span>
</div>
</div>
{/*  Card: Digital Official Receipts & Payment History  */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div>
<span className="font-label-xs text-label-xs uppercase tracking-wider text-secondary font-bold">Bukti Pembukuan Resmi</span>
<h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
              Histori Slip Kuitansi Digital Saya
            </h2>
</div>
<button className="inline-flex items-center gap-1 text-primary-container hover:text-on-surface-variant font-label-sm text-label-sm font-semibold transition-colors"  type="button">
<span className="material-symbols-outlined text-title-sm">download</span>
<span className="">Unduh Semua PDF</span>
</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-xs text-label-xs uppercase tracking-wider">
<th className="py-3 px-space-md rounded-l-lg">No. Slip Kuitansi</th>
<th className="py-3 px-space-md">Bulan Kas</th>
<th className="py-3 px-space-md">Metode Bayar</th>
<th className="py-3 px-space-md text-right">Jumlah</th>
<th className="py-3 px-space-md">Petugas Penerima</th>
<th className="py-3 px-space-md text-center rounded-r-lg">Aksi</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md divide-y-0">
{/*  Row 1  */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-semibold text-primary-container">
                  #KWT-2026-09-042
                </td>
<td className="py-3.5 px-space-md text-on-surface">September 2026</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
<span className="material-symbols-outlined text-label-xs">payments</span> Tunai Lapangan
                  </span>
</td>
<td className="py-3.5 px-space-md text-right font-semibold text-on-surface">Rp 50.000</td>
<td className="py-3.5 px-space-md font-label-xs text-label-xs text-on-surface-variant">Kak Fahmi Pratama</td>
<td className="py-3.5 px-space-md text-center">
<button className="p-1 rounded hover:bg-surface-container text-primary-container transition-colors"  title="Unduh Kuitansi" type="button">
<span className="material-symbols-outlined text-title-sm">receipt_long</span>
</button>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-semibold text-primary-container">
                  #KWT-2026-08-019
                </td>
<td className="py-3.5 px-space-md text-on-surface">Agustus 2026</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded bg-surface-container-high text-on-surface"><span className="material-symbols-outlined text-label-xs">payments</span> Tunai Lapangan</span>
</td>
<td className="py-3.5 px-space-md text-right font-semibold text-on-surface">Rp 50.000</td>
<td className="py-3.5 px-space-md font-label-xs text-label-xs text-on-surface-variant">Kak Fahmi Pratama</td>
<td className="py-3.5 px-space-md text-center">
<button className="p-1 rounded hover:bg-surface-container text-primary-container transition-colors"  title="Unduh Kuitansi" type="button">
<span className="material-symbols-outlined text-title-sm">receipt_long</span>
</button>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3.5 px-space-md font-semibold text-primary-container">
                  #KWT-2026-07-005
                </td>
<td className="py-3.5 px-space-md text-on-surface">Juli 2026</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-2 py-0.5 rounded bg-surface-container-high text-on-surface"><span className="material-symbols-outlined text-label-xs">payments</span> Tunai Lapangan</span>
</td>
<td className="py-3.5 px-space-md text-right font-semibold text-on-surface">Rp 50.000</td>
<td className="py-3.5 px-space-md font-label-xs text-label-xs text-on-surface-variant">Rina Wulandari (Staf)</td>
<td className="py-3.5 px-space-md text-center">
<button className="p-1 rounded hover:bg-surface-container text-primary-container transition-colors"  title="Unduh Kuitansi" type="button">
<span className="material-symbols-outlined text-title-sm">receipt_long</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/*  RIGHT COLUMN (5/12) - Ensemble Transparency & Brass Section Metrics  */}
<div className="lg:col-span-5 flex flex-col gap-space-lg">
{/*  Widget 1: Brass Section Specific Budget Allocation  */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div>
<span className="font-label-xs text-label-xs uppercase tracking-wider text-secondary font-bold">Transparansi Instrumen</span>
<h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
              Belanja Khusus Seksi Brass
            </h2>
</div>
<span className="inline-flex items-center px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
            14 Personel
          </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
          Penyaluran dana operasional kas untuk kesiapan instrumen tiup barisan Anda musim ini:
        </p>
<div className="flex flex-col gap-space-sm">
{/*  Item 1  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded bg-surface-container-lowest flex items-center justify-center text-secondary flex-shrink-0">
<span className="material-symbols-outlined text-title-sm">oil_barrel</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm font-semibold text-on-surface truncate">Ultra-Pure Valve Oil (Trumpet &amp; Bone)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">22 Sep 2026 • 6 Botol Latihan</span>
</div>
</div>
<span className="font-label-md text-label-md font-bold text-on-surface flex-shrink-0">Rp 120.000</span>
</div>
{/*  Item 2  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded bg-surface-container-lowest flex items-center justify-center text-secondary flex-shrink-0">
<span className="material-symbols-outlined text-title-sm">build</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm font-semibold text-on-surface truncate">Solder &amp; Dent Removal Mellophone Bell</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">15 Agu 2026 • Bengkel Brass Solo</span>
</div>
</div>
<span className="font-label-md text-label-md font-bold text-on-surface flex-shrink-0">Rp 450.000</span>
</div>
{/*  Item 3  */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded bg-surface-container-lowest flex items-center justify-center text-secondary flex-shrink-0">
<span className="material-symbols-outlined text-title-sm">volume_off</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm font-semibold text-on-surface truncate">Busa Hardcase &amp; Straight Mute Trumpet</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">02 Jul 2026 • Logistik Alat</span>
</div>
</div>
<span className="font-label-md text-label-md font-bold text-on-surface flex-shrink-0">Rp 280.000</span>
</div>
</div>
<button className="inline-flex items-center justify-center gap-1.5 py-2 px-space-md rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm font-semibold"  type="button">
<span className="">Lihat Semua Pengeluaran Seksi Brass</span>
<span className="material-symbols-outlined text-body-lg">arrow_forward</span>
</button>
</div>
{/*  Widget 2: Section Dues Compliance Leaderboard (Esprit de Corps)  */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div>
<span className="font-label-xs text-label-xs uppercase tracking-wider text-secondary font-bold">Semangat Kebersamaan</span>
<h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
              Kepatuhan Iuran Antar Seksi
            </h2>
</div>
<span className="material-symbols-outlined text-title-sm text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
</div>
<div className="flex flex-col gap-space-sm">
{/*  Pit Instrument (100%)  */}
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between font-label-xs text-label-xs">
<div className="flex items-center gap-1.5">
<span className="font-bold text-on-surface">Pit Instrument (Front Ensemble)</span>
<span className="text-secondary font-bold">🏆 Tertib 100%</span>
</div>
<span className="font-bold text-on-surface">5/5 Personel</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
<div className="h-full bg-secondary" style={{ width: '100%' }}></div>
</div>
</div>
{/*  Battery Percussion (90%)  */}
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between font-label-xs text-label-xs">
<span className="font-medium text-on-surface">Battery Percussion</span>
<span className="font-bold text-on-surface">90% (9/10 Personel)</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
<div className="h-full bg-primary-container" style={{ width: '90%' }}></div>
</div>
</div>
{/*  Brass Section (78%) - User section  */}
<div className="flex flex-col gap-1 p-2 rounded-lg bg-secondary-fixed/30">
<div className="flex items-center justify-between font-label-xs text-label-xs">
<span className="font-bold text-on-surface flex items-center gap-1">
                Brass Section (Seksi Anda)
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
</span>
<span className="font-bold text-secondary">78% (11/14 Personel)</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
<div className="h-full bg-secondary-container" style={{ width: '78%' }}></div>
</div>
</div>
{/*  Color Guard (75%)  */}
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between font-label-xs text-label-xs">
<span className="font-medium text-on-surface">Color Guard</span>
<span className="font-bold text-on-surface">75% (6/8 Personel)</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
<div className="h-full bg-surface-tint" style={{ width: '75%' }}></div>
</div>
</div>
</div>
</div>
{/*  Widget 3: Member Financial Support & Assistance  */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-title-sm">contact_support</span>
</div>
<div>
<h3 className="font-label-md text-label-md font-bold text-on-surface">Butuh Bantuan atau Pengaduan?</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Layanan langsung keuangan MBGT</p>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
          Kuitansi belum terbit, salah pencatatan slip transfer, atau ingin mengajukan <strong>Bantuan Beasiswa Keringanan Iuran Korps</strong>? Silakan hubungi pengurus.
        </p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
<a className="inline-flex items-center justify-center gap-1.5 py-2 px-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors font-label-sm text-label-sm font-semibold" href="https://wa.me/" rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-title-sm">forum</span>
<span className="">Chat Bendahara</span>
</a>
<button className="inline-flex items-center justify-center gap-1.5 py-2 px-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors font-label-sm text-label-sm font-semibold"  type="button">
<span className="material-symbols-outlined text-title-sm">school</span>
<span className="">Ajukan Beasiswa</span>
</button>
</div>
</div>
</div>
</div>
{/*  Footer Accountability Seal  */}
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant">
<div className="flex items-center gap-space-sm text-center sm:text-left">
<span className="material-symbols-outlined text-title-sm text-secondary">verified_user</span>
<span className="font-body-sm text-body-sm">
        Seluruh data transparansi disinkronkan langsung dari Ledger Kas MBGT. Diawasi oleh Pembina Utama MBGT: <strong>Drs. Sutrisno, M.Pd.</strong>
</span>
</div>
<span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant whitespace-nowrap">
      AKUNTABILITAS &amp; DISIPLIN KORPS
    </span>
</div>
</div></main></div>

    </>
  );
}
