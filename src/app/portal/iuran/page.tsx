'use client';

import React, { useState } from 'react';
import { formatRupiah } from '@/lib/utils';

export default function Page() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 px-gutter-sm flex items-center justify-between gap-space-sm"><div className="flex items-center gap-space-sm min-w-0"><img alt="Emblem logo for Gema Taruna Marching Band featuring a stylized heraldic shield with crossed brass trumpet, drum mallet/percussion element, gold laurel wreath, and a dynamic banner with the text 'GEMA TARUNA'. Navy blue and gold with crimson accents.. Brand logo" className="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1W64D4wP9gktHaJRPyLBJT583cPOoUUg-wTMAkGiMbQR789tkbD3ACfmglcyLYM6vfYUj7IH_BHA5vmvjccgsPEljctJhFxJf0YNcuM_demKa5jydxOZTg1xK2JCtYNVvM1pkBciJiim2-06WWeCrULKnR9xgoeYqATiO74Ssr4ArkYaUGJgmIj5V8PXMOmERr9Bxzjq0ToaFYCIsDBgxSrGI9zN7u4ODJSY1XN1z6khQe5YLaoBIwajY0"/><div className="flex flex-col min-w-0"><div className="flex items-center gap-1.5"><span className="font-title-sm text-title-sm text-primary tracking-tight truncate">KasMBGT Anggota</span><span className="bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs px-1.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">TRANSPARAN</span></div><span className="font-label-xs text-label-xs text-on-surface-variant truncate">Iuran Saya</span></div></div><div className="flex items-center gap-1 flex-shrink-0"><button aria-label="Notifikasi Transparansi" className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-secondary transition-colors relative rounded-full"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-secondary-container"></span></button><div className="w-11 h-11 flex items-center justify-center"><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WzjZNbkEOGj-VCP5WAJN3NT8pfdAqMTQnA3ZiX56agZbb6l2zRDq-rnqEB1rt1g3K6r5C9BKZ3KoIE_T2pahSl_YrR_sh6F3BvHsIEQ6pGp8pzcd1I0L9D6uSInxVbSnCuXZ_yIo79Gblw4J9sjTM-s6wm4n8q3h1y3lBHSKEdybqOAeyTLgpiunSfkv7iegQOW4ikONvEZ-xJUxjqg39r9wQX_UwBRCp4JsB0g0obwmmuqX3eiHvOpA"/></div></div></div></header><main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface"><div className="flex flex-col w-full px-gutter-sm space-y-space-md">
{/*  Anggota Identity Strip  */}
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0 text-on-secondary-fixed font-title-sm text-title-sm">
        DW
      </div>
<div className="min-w-0 flex flex-col">
<span className="font-title-sm text-title-sm text-on-surface truncate">Dimas Wahyu Pratama</span>
<div className="flex items-center gap-1.5 flex-wrap">
<span className="bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs px-2 py-0.5 rounded-full">Brass • Lead Trumpet 1</span>
<span className="bg-surface-container text-on-surface-variant font-label-xs text-label-xs px-2 py-0.5 rounded-full">Baris Drill A3</span>
</div>
</div>
</div>
<div className="flex flex-col items-end flex-shrink-0">
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Status</span>
<span className="inline-flex items-center gap-1 bg-surface-container-low text-secondary font-label-xs text-label-xs px-2 py-0.5 rounded-full">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
        Aktif 2026
      </span>
</div>
</div>
{/*  Ringkasan Akumulasi Iuran Card (Hero Metric)  */}
<div className="bg-primary-container text-on-primary rounded-xl p-space-lg shadow-md relative overflow-hidden">
<div className="flex justify-between items-start mb-space-sm">
<div>
<span className="font-label-xs text-label-xs uppercase tracking-wider text-primary-fixed-dim">Histori &amp; Jadwal Sesi Latihan</span>
<h2 className="font-headline-md text-headline-md font-semibold text-on-primary mt-0.5">Akumulasi Iuran 2026</h2>
</div>
<div className="w-9 h-9 rounded-lg bg-surface-tint/30 flex items-center justify-center text-primary-fixed">
<span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
</div>
</div>
<div className="flex items-baseline gap-2 my-space-xs">
<span className="font-display text-display font-bold tracking-tight text-on-primary">Rp 395.000</span>
<span className="font-label-sm text-label-sm text-primary-fixed-dim">/ 79 Sesi Terlewati</span>
</div>
<div className="bg-inverse-surface/40 rounded-lg p-space-sm mt-space-md flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-fixed text-[18px]">event_repeat</span>
<span className="font-body-sm text-body-sm text-primary-fixed">Skema Resmi: <strong className="text-on-primary">Rp 5.000 / sesi</strong></span>
</div>
<span className="font-label-xs text-label-xs bg-secondary text-on-secondary px-2 py-0.5 rounded-full">Rabu &amp; Sabtu</span>
</div>
</div>
{/*  Tracker Sesi Bulan Ini (September 2026)  */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[22px]">calendar_month</span>
<h3 className="font-title-sm text-title-sm text-on-surface">Jadwal Sesi September 2026</h3>
</div>
<span className="font-label-xs text-label-xs bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-full font-bold">8 Sesi</span>
</div>
{/*  Timeline List  */}
<div className="space-y-space-sm">
{/*  Sesi 08 - Upcoming  */}
<div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
<div className="flex items-start justify-between">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0">
              08
            </div>
<div>
<div className="font-title-sm text-title-sm text-on-surface">Sabtu, 27 Sep 2026</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Latihan Drill Formasi Lapangan</div>
</div>
</div>
<span className="bg-surface-container-high text-on-surface-variant font-label-xs text-label-xs px-2 py-1 rounded-full uppercase tracking-wider flex-shrink-0">
            Akan Datang
          </span>
</div>
<div className="bg-surface-container-lowest rounded-lg p-space-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-surface-variant">Nominal Wajib</span>
<span className="font-title-sm text-title-sm font-bold text-on-surface">Rp 5.000</span>
</div>
<button className="bg-primary text-on-primary hover:bg-inverse-surface font-label-sm text-label-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors" ><span className="material-symbols-outlined text-[16px]">payments</span><span className="">Bayar Tunai Lapangan</span></button>
</div>
</div>
{/*  Sesi 07 - Paid Recent with Receipt Button  */}
<div className="bg-surface-container rounded-lg p-space-md flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0">
              07
            </div>
<div>
<div className="font-title-sm text-title-sm text-on-surface">Rabu, 24 Sep 2026</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Sesi Music Sectional &amp; Tutti</div>
</div>
</div>
<span className="bg-surface-container-lowest text-on-surface font-label-xs text-label-xs px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
            LUNAS
          </span>
</div>
<div className="flex items-center justify-between pt-space-xs mt-space-xs">
<div className="font-body-sm text-body-sm text-on-surface-variant">
            Tunai • Petugas: <span className="font-medium text-on-surface">Fahmi P.</span>
</div>
<button className="text-secondary font-label-sm text-label-sm flex items-center gap-1 hover:underline" >
<span className="">Lihat Slip</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
{/*  Sesi 06 - Paid QRIS  */}
<div className="bg-surface-container-low rounded-lg p-space-md flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0">
            06
          </div>
<div>
<div className="font-title-sm text-title-sm text-on-surface">Sabtu, 20 Sep 2026</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Tunai Lapangan • Petugas: Fahmi P.</div>
</div>
</div>
<span className="bg-surface-container text-on-surface font-label-xs text-label-xs px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
          LUNAS
        </span>
</div>
{/*  Sesi 05 - Paid Cash  */}
<div className="bg-surface-container-low rounded-lg p-space-md flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0">
            05
          </div>
<div>
<div className="font-title-sm text-title-sm text-on-surface">Rabu, 17 Sep 2026</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Tunai Lapangan • Rp 5.000</div>
</div>
</div>
<span className="bg-surface-container text-on-surface font-label-xs text-label-xs px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
          LUNAS
        </span>
</div>
{/*  Sesi 04 - Paid Cash  */}
<div className="bg-surface-container-low rounded-lg p-space-md flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0">
            04
          </div>
<div>
<div className="font-title-sm text-title-sm text-on-surface">Sabtu, 13 Sep 2026</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Tunai Lapangan • Rp 5.000</div>
</div>
</div>
<span className="bg-surface-container text-on-surface font-label-xs text-label-xs px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
          LUNAS
        </span>
</div>
{/*  Sesi 03 - Paid Transfer Mandiri  */}
<div className="bg-surface-container-low rounded-lg p-space-md flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center font-label-sm text-label-sm font-bold flex-shrink-0">
            03
          </div>
<div>
<div className="font-title-sm text-title-sm text-on-surface">Rabu, 10 Sep 2026</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Tunai Lapangan • Petugas: Fahmi P.</div>
</div>
</div>
<span className="bg-surface-container text-on-surface font-label-xs text-label-xs px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
          LUNAS
        </span>
</div>
</div>
</div>
{/*  Kuitansi Digital Terverifikasi (Slip Viewer Card)  */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md" id="receiptCard">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
<h3 className="font-title-sm text-title-sm text-on-surface">Slip Kuitansi Digital Sah</h3>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs px-2 py-0.5 rounded-full font-bold">Terverifikasi</span>
</div>
{/*  Ticket-styled Slip Box  */}
<div className="bg-surface-container-low rounded-xl p-space-md space-y-space-sm relative overflow-hidden">
{/*  Watermark emblem bg accent  */}
<div className="absolute -right-6 -bottom-6 w-28 h-28 opacity-10 pointer-events-none rounded-full bg-secondary"></div>
<div className="flex justify-between items-start">
<div>
<span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">No. Bukti Transaksi</span>
<p className="font-title-sm text-title-sm font-bold text-on-surface">#KWT-MBGT-2026-09-042</p>
</div>
<div className="text-right">
<span className="font-label-xs text-label-xs text-on-surface-variant">Sesi Pendinginan</span>
<p className="font-body-sm text-body-sm text-on-surface">24 Sep 2026, 17:15 WIB</p>
</div>
</div>
<div className="bg-surface-container-lowest rounded-lg p-space-sm space-y-1">
<div className="flex justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Tunai Lapangan • Petugas: Fahmi P.</span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Dimas Wahyu Pratama (Brass)</span>
</div>
<div className="flex justify-between">
<span className="font-body-sm text-body-sm text-on-surface-variant">Tunai Lapangan • Petugas: Fahmi P.</span>
<span className="font-body-sm text-body-sm text-on-surface">Tunai Lapangan • Petugas: Fahmi P.</span>
</div>
<div className="flex justify-between"><span className="font-body-sm text-body-sm text-on-surface-variant">Metode</span><span className="font-body-sm text-body-sm text-on-surface font-semibold">Tunai Lapangan (Kasir Fisik)</span></div><div className="flex justify-between items-center pt-space-xs">
<span className="font-title-sm text-title-sm font-bold text-on-surface">Total Disetor</span>
<span className="font-headline-md text-headline-md font-bold text-secondary">Rp 5.000</span>
</div>
</div>
{/*  Tanda Tangan & Stempel  */}
<div className="pt-space-xs flex justify-between items-center">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">draw</span>
</div>
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-surface-variant">Bendahara Penerima</span>
<span className="font-label-sm text-label-sm text-on-surface font-bold">Fahmi Pratama</span>
</div>
</div>
<div className="bg-secondary-fixed text-on-secondary-fixed px-2.5 py-1 rounded text-center">
<span className="font-label-xs text-label-xs uppercase tracking-widest font-extrabold block">MBGT VALID</span>
</div>
</div>
</div>
{/*  Actions for slip  */}
<div className="grid grid-cols-2 gap-space-sm pt-space-xs">
<button className="bg-surface-container text-on-surface hover:bg-surface-container-high py-2.5 px-space-sm rounded-lg font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-colors" >
<span className="material-symbols-outlined text-[18px]">download</span>
<span className="">Simpan Slip</span>
</button>
<button className="bg-primary text-on-primary hover:bg-inverse-surface py-2.5 px-space-sm rounded-lg font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-colors" >
<span className="material-symbols-outlined text-[18px]">share</span>
<span className="">Kirim ke WA</span>
</button>
</div>
</div>
{/*  Transparansi Alokasi Kas (Setiap Rp 5.000 Anda Lari ke Mana?)  */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[22px]">pie_chart</span>
<h3 className="font-title-sm text-title-sm text-on-surface">Transparansi Alokasi Kas</h3>
</div>
<span className="font-label-xs text-label-xs text-on-surface-variant">Rp 5.000 / Anggota</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
      Setiap rupiah iuran sesi Anda dikelola dengan akuntabilitas ketat untuk kelangsungan operasional korps:
    </p>
{/*  Multi-segmented Progress Bar  */}
<div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
<div className="bg-secondary h-full" style={{ width: '60%' }} title="Alat Musik (60%)"></div>
<div className="bg-secondary-container h-full" style={{ width: '25%' }} title="Logistik (25%)"></div>
<div className="bg-surface-tint h-full" style={{ width: '15%' }} title="Tabungan GPMB (15%)"></div>
</div>
{/*  Breakdown List  */}
<div className="space-y-space-sm pt-space-xs">
{/*  60% Maintenance  */}
<div className="flex items-start justify-between bg-surface-container-low p-space-sm rounded-lg">
<div className="flex items-start gap-2.5">
<div className="w-3 h-3 rounded-full bg-secondary mt-1 flex-shrink-0"></div>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">Perawatan &amp; Suku Cadang Alat Musik</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Oli valve terompet, stik snare, head marimba, padding</div>
</div>
</div>
<div className="text-right flex-shrink-0 ml-2">
<div className="font-title-sm text-title-sm font-bold text-on-surface">Rp 3.000</div>
<span className="font-label-xs text-label-xs text-secondary font-bold">60%</span>
</div>
</div>
{/*  25% Logistic  */}
<div className="flex items-start justify-between bg-surface-container-low p-space-sm rounded-lg">
<div className="flex items-start gap-2.5">
<div className="w-3 h-3 rounded-full bg-secondary-container mt-1 flex-shrink-0"></div>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">Logistik Sesi Latihan</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Isi ulang galon air minum, spray P3K, kebersihan lapangan</div>
</div>
</div>
<div className="text-right flex-shrink-0 ml-2">
<div className="font-title-sm text-title-sm font-bold text-on-surface">Rp 1.250</div>
<span className="font-label-xs text-label-xs text-secondary font-bold">25%</span>
</div>
</div>
{/*  15% Savings  */}
<div className="flex items-start justify-between bg-surface-container-low p-space-sm rounded-lg">
<div className="flex items-start gap-2.5">
<div className="w-3 h-3 rounded-full bg-surface-tint mt-1 flex-shrink-0"></div>
<div>
<div className="font-label-md text-label-md text-on-surface font-semibold">Tabungan Kontingen GPMB</div>
<div className="font-body-sm text-body-sm text-on-surface-variant">Tunai Lapangan • Petugas: Fahmi P.</div>
</div>
</div>
<div className="text-right flex-shrink-0 ml-2">
<div className="font-title-sm text-title-sm font-bold text-on-surface">Rp 750</div>
<span className="font-label-xs text-label-xs text-on-surface-variant font-bold">15%</span>
</div>
</div>
</div>
</div>
{/*  Komparasi Kepatuhan Antar Seksi (Semangat Korps)  */}
<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[22px]">military_tech</span>
<h3 className="font-title-sm text-title-sm text-on-surface">Kepatuhan Iuran Antar Seksi</h3>
</div>
<span className="font-label-xs text-label-xs bg-surface-container text-on-surface-variant px-2 py-0.5 rounded">September</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
      Peringkat ketertiban kontribusi seksi untuk menumbuhkan solidaritas dan disiplin barisan.
    </p>
<div className="space-y-space-md pt-space-xs">
{/*  Pit Instrument  */}
<div className="space-y-1">
<div className="flex justify-between items-center font-body-sm text-body-sm">
<span className="text-on-surface font-medium flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[16px]">music_note</span>
            Pit Instrument
          </span>
<span className="font-title-sm text-title-sm font-bold text-secondary">100% Tertib</span>
</div>
<div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{ width: '100%' }}></div>
</div>
</div>
{/*  Battery Percussion  */}
<div className="space-y-1">
<div className="flex justify-between items-center font-body-sm text-body-sm">
<span className="text-on-surface font-medium flex items-center gap-1.5">
<span className="material-symbols-outlined text-on-surface-variant text-[16px]">sports_score</span>
            Battery Percussion
          </span>
<span className="font-label-md text-label-md font-bold text-on-surface">92%</span>
</div>
<div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-surface-tint h-full rounded-full" style={{ width: '92%' }}></div>
</div>
</div>
{/*  Brass Section (User's Section Highlighted)  */}
<div className="bg-surface-container p-space-sm rounded-lg space-y-1">
<div className="flex justify-between items-center font-body-sm text-body-sm">
<span className="text-on-surface font-bold flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[16px]">campaign</span>
            Brass Section (Seksi Anda)
          </span>
<span className="font-title-sm text-title-sm font-bold text-secondary">85%</span>
</div>
<div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{ width: '85%' }}></div>
</div>
<span className="font-label-xs text-label-xs text-on-secondary-container block pt-0.5">Tinggal 3 rekan section belum menyelesaikan iuran sesi 07.</span>
</div>
{/*  Color Guard  */}
<div className="space-y-1">
<div className="flex justify-between items-center font-body-sm text-body-sm">
<span className="text-on-surface font-medium flex items-center gap-1.5">
<span className="material-symbols-outlined text-on-surface-variant text-[16px]">flag</span>
            Color Guard
          </span>
<span className="font-label-md text-label-md font-bold text-on-surface">80%</span>
</div>
<div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-surface-tint h-full rounded-full" style={{ width: '80%' }}></div>
</div>
</div>
</div>
</div>
{/*  Banner Bantuan / Pengaduan  */}
<div className="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">help_outline</span>
</div>
<div className="min-w-0">
<p className="font-title-sm text-title-sm text-on-surface font-semibold truncate">Ada kekeliruan data iuran?</p>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Konfirmasi langsung ke Bendahara</p>
</div>
</div>
<a className="bg-primary text-on-primary hover:bg-inverse-surface font-label-sm text-label-sm px-3.5 py-2 rounded-lg flex items-center gap-1.5 flex-shrink-0 transition-colors" href="https://wa.me/6281234567890?text=Halo%20Bendahara%20MBGT,%20saya%20Dimas%20Wahyu%20(Brass)%20ingin%20konfirmasi%20data%20iuran" rel="noopener" target="_blank">
<span className="material-symbols-outlined text-[16px]">chat</span>
<span className="">WhatsApp</span>
</a>
</div>
{/*  QRIS Payment Modal Dialog (Hidden by Default)  */}
{/*  Interactive Feedback Toast  */}
<div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-body-sm text-body-sm px-4 py-2.5 rounded-full shadow-lg transition-opacity duration-300 opacity-0 pointer-events-none z-50 flex items-center gap-2" id="toastNotification">
<span className="material-symbols-outlined text-[18px] text-secondary-fixed">check_circle</span>
<span className="" id="toastMessage">Pesan informasi</span>
</div>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]" data-active-classes="text-secondary font-semibold"><div className="flex justify-around items-center h-16 px-gutter-sm"><a className="flex flex-col items-center justify-center w-14 h-14 text-on-surface-variant transition-colors" data-path="ringkasan" href="#"><span className="material-symbols-outlined text-[24px]">dashboard</span><span className="font-label-xs text-label-xs mt-0.5">Beranda</span></a><a aria-current="page" className="flex flex-col items-center justify-center w-14 h-14 transition-colors text-secondary font-semibold" data-path="iuran-saya" href="#"><span className="material-symbols-outlined text-[24px]">event_available</span><span className="font-label-xs text-label-xs mt-0.5">Iuran</span></a><a className="flex flex-col items-center justify-center w-14 h-14 text-on-surface-variant transition-colors" data-path="transparansi-kas" href="#"><span className="material-symbols-outlined text-[24px]">pie_chart</span><span className="font-label-xs text-label-xs mt-0.5">Arus Kas</span></a><a className="flex flex-col items-center justify-center w-14 h-14 text-on-surface-variant transition-colors" data-path="slip-dan-bantuan" href="#"><span className="material-symbols-outlined text-[24px]">receipt_long</span><span className="font-label-xs text-label-xs mt-0.5">Slip</span></a></div></nav>

    </>
  );
}
