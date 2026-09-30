# 🎺 KAS GEMA TARUNA — Sistem Manajemen Keuangan & Akuntabilitas Marching Band

Aplikasi web *full-stack* berbasis **Next.js (App Router) + Tailwind CSS + Supabase** untuk manajemen kas fisik, iuran anggota, buku kas masuk/keluar, dan transparansi keuangan **Marching Band Gema Taruna (MBGT)**.

---

## ✨ Daftar 15 Layar Aplikasi (Routes)

| No | Route URL | Nama Layar | Peran / Mode |
|---|---|---|---|
| 1 | `/dashboard` | Dashboard Utama Bendahara | Desktop — Bendahara |
| 2 | `/iuran` | Pembayaran Iuran Anggota | Desktop — Bendahara |
| 3 | `/pemasukan` | Pemasukan Kas (Buku Kas Masuk / BKM) | Desktop — Bendahara |
| 4 | `/pengeluaran` | Pengeluaran Kas (Buku Kas Keluar / BKK) | Desktop — Bendahara |
| 5 | `/anggota` | Database Anggota MBGT | Desktop — Bendahara |
| 6 | `/riwayat` | Riwayat Transaksi Keuangan (BKU) | Desktop — Bendahara |
| 7 | `/laporan` | Laporan Keuangan & Akuntabilitas (LPJ) | Desktop — Bendahara / Pembina |
| 8 | `/pengaturan` | Pengaturan Sistem & Hak Akses | Desktop — Bendahara |
| 9 | `/transparansi` | Dashboard Transparansi Anggota (Read-Only) | Desktop — Anggota / Pembina |
| 10 | `/login` | Halaman Login & Autentikasi Multi-Role | Semua Peran |
| 11 | `/mobile/dashboard` | Dashboard Lapangan Bendahara | Mobile — Bendahara Lapangan |
| 12 | `/mobile/iuran` | Checklist Iuran Cepat Lapangan | Mobile — Bendahara Lapangan |
| 13 | `/mobile/belanja` | Catat Belanja Lapangan | Mobile — Bendahara Lapangan |
| 14 | `/portal/ringkasan` | Portal Anggota: Ringkasan Kas | Mobile PWA — Anggota |
| 15 | `/portal/iuran` | Portal Anggota: Iuran Saya & Kuitansi | Mobile PWA — Anggota |

> 💡 **Tips Navigasi Cepat:** Di pojok kanan bawah layar terdapat tombol melayang (**ikon grid**) untuk berpindah antar ke-15 layar secara instan kapan saja.

---

## 🚀 1. Cara Menjalankan di Komputer Lokal

```bash
cd kas-gema-taruna
npm install
npm run dev
```

Buka **`http://localhost:3000`** di browser.
- Anda bisa langsung klik tombol **"Demo Bendahara"**, **"Demo Pembina"**, atau **"Demo Anggota"** di halaman `/login` tanpa perlu menunggu setup Supabase selesai.

---

## 🗄️ 2. Cara Setup Database Supabase

1. Buat akun dan project baru (gratis) di [https://supabase.com](https://supabase.com).
2. Di dashboard Supabase project Anda, buka menu **SQL Editor** → klik **New Query**.
3. Salin seluruh isi file [`supabase/schema.sql`](./supabase/schema.sql), tempel ke SQL Editor, lalu klik **Run**.
   - Script ini akan membuat 4 tabel utama (`profiles`, `transactions`, `dues`, `settings`), *trigger* otomatis saat user baru mendaftar, serta *Row Level Security (RLS)* untuk 3 peran (`bendahara`, `pembina`, `anggota`).
4. Buka menu **Project Settings** → **API**, lalu salin:
   - **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`)
   - **Project API Keys — `anon` `public`** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
5. Masukkan kedua nilai tersebut ke file `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
   ```

---

## ☁️ 3. Cara Upload ke GitHub & Deploy ke Vercel

### A. Upload Folder `kas-gema-taruna` ke GitHub
1. Buat repository baru di GitHub (misalnya `kas-gema-taruna`).
2. Jalankan perintah Git dari dalam folder `kas-gema-taruna`:
   ```bash
   cd "kas-gema-taruna"
   git add .
   git commit -m "Initial commit: Kas Gema Taruna Next.js + Supabase"
   git branch -M main
   git remote add origin https://github.com/USERNAME_ANDA/kas-gema-taruna.git
   git push -u origin main
   ```

### B. Deploy ke Vercel
1. Buka [https://vercel.com](https://vercel.com) → **Add New Project** → pilih repository `kas-gema-taruna`.
2. Pada bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL` = *(URL Supabase Anda)*
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = *(Anon Key Supabase Anda)*
   *(Catatan: Jika Anda belum mengisi Supabase, aplikasi tetap bisa di-deploy dan dijalankan menggunakan tombol Akun Demo di halaman Login).*
3. Klik **Deploy** — dalam ~1 menit aplikasi Anda sudah online!
