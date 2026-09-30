-- ============================================================================
-- KAS GEMA TARUNA — DATABASE SCHEMA MULTI-ANGKATAN (ANGKATAN 16 s.d. 21)
-- Jalankan seluruh script ini di Supabase -> SQL Editor -> New Query -> Run
-- ============================================================================

create extension if not exists "uuid-ossp";

-- 1. Tabel Akun Pengelola (Super Admin Pembina & Admin Angkatan 16-21)
create table if not exists public.kgt_accounts (
  id uuid default uuid_generate_v4() primary key,
  username text not null unique,
  password text not null,
  role text not null check (role in ('superadmin', 'admin_angkatan')),
  angkatan text, -- NULL untuk Super Admin (akses semua angkatan 16-21), '16'..'21' untuk Admin Angkatan
  display_name text not null,
  created_at timestamptz not null default now()
);

-- Masukkan 7 Akun Resmi sesuai spesifikasi
insert into public.kgt_accounts (username, password, role, angkatan, display_name) values
  ('Gema Taruna', 'Gemataruna123@', 'superadmin', null, 'Super Admin (Pembina)'),
  ('MB16', 'Satutekad', 'admin_angkatan', '16', 'Admin Bendahara Angkatan 16'),
  ('MB17', 'Satusemangat', 'admin_angkatan', '17', 'Admin Bendahara Angkatan 17'),
  ('MB18', 'Marchinghebat', 'admin_angkatan', '18', 'Admin Bendahara Angkatan 18'),
  ('MB19', 'Satutekad', 'admin_angkatan', '19', 'Admin Bendahara Angkatan 19'),
  ('MB20', 'Satusemangat', 'admin_angkatan', '20', 'Admin Bendahara Angkatan 20'),
  ('MB21', 'Marchinghebat', 'admin_angkatan', '21', 'Admin Bendahara Angkatan 21')
on conflict (username) do update set
  password = excluded.password,
  role = excluded.role,
  angkatan = excluded.angkatan,
  display_name = excluded.display_name;

-- 2. Tabel Anggota Skuad per Angkatan (16 s.d. 21)
create table if not exists public.kgt_members (
  id uuid default uuid_generate_v4() primary key,
  angkatan text not null check (angkatan in ('16', '17', '18', '19', '20', '21')),
  member_code text not null,
  full_name text not null,
  section text not null default 'Brass',
  instrument text default 'Trumpet',
  phone text default '',
  status text not null default 'Aktif',
  dues_status text not null default 'BELUM BAYAR',
  paid_at text default '-',
  dues_amount bigint not null default 50000,
  created_at timestamptz not null default now()
);

-- 3. Tabel Transaksi Buku Kas (Pemasukan & Pengeluaran Terpisah per Angkatan)
create table if not exists public.kgt_transactions (
  id uuid default uuid_generate_v4() primary key,
  angkatan text not null check (angkatan in ('16', '17', '18', '19', '20', '21')),
  reference_no text not null,
  type text not null check (type in ('pemasukan', 'pengeluaran')),
  category text not null,
  description text not null,
  vendor text default '-',
  amount bigint not null check (amount >= 0),
  payment_method text default 'Tunai Kas',
  recorded_by text not null default 'Bendahara',
  transaction_date date not null default current_date,
  created_at timestamptz not null default now()
);

-- 4. Index untuk performa query per Angkatan
create index if not exists idx_kgt_members_angkatan on public.kgt_members(angkatan);
create index if not exists idx_kgt_transactions_angkatan on public.kgt_transactions(angkatan, transaction_date desc);

-- 5. Row Level Security (Buka akses baca untuk mode Cek Kas Siswa & tulis untuk Admin)
alter table public.kgt_accounts enable row level security;
alter table public.kgt_members enable row level security;
alter table public.kgt_transactions enable row level security;

drop policy if exists "Public read kgt_accounts" on public.kgt_accounts;
create policy "Public read kgt_accounts" on public.kgt_accounts for select using (true);

drop policy if exists "Public access kgt_members" on public.kgt_members;
create policy "Public access kgt_members" on public.kgt_members for all using (true) with check (true);

drop policy if exists "Public access kgt_transactions" on public.kgt_transactions;
create policy "Public access kgt_transactions" on public.kgt_transactions for all using (true) with check (true);
