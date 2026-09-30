-- KAS GEMA TARUNA Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ENUM types
create type user_role as enum ('bendahara', 'pembina', 'anggota');
create type member_section as enum ('brass', 'percussion', 'color_guard', 'pit', 'official');
create type member_status as enum ('aktif', 'cadangan', 'alumni');
create type transaction_type as enum ('pemasukan', 'pengeluaran');
create type dues_status as enum ('lunas', 'belum_bayar');
create type payment_method as enum ('tunai', 'transfer');

-- 1. Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  role user_role not null default 'anggota',
  phone text,
  avatar_url text,
  section member_section,
  instrument text,
  member_id text unique,
  drill_position text,
  status member_status not null default 'aktif',
  joined_at date,
  created_at timestamptz not null default now()
);

-- 2. Transactions table
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  type transaction_type not null,
  category text not null,
  amount bigint not null check (amount > 0),
  description text not null default '',
  reference_no text not null,
  receipt_url text,
  vendor text,
  section text,
  recorded_by uuid references public.profiles(id) not null,
  verified_by uuid references public.profiles(id),
  verified_at timestamptz,
  transaction_date date not null default current_date,
  created_at timestamptz not null default now()
);

-- 3. Dues table
create table public.dues (
  id uuid default uuid_generate_v4() primary key,
  member_id uuid references public.profiles(id) on delete cascade not null,
  period text not null, -- format: '2026-09'
  amount bigint not null default 50000,
  status dues_status not null default 'belum_bayar',
  paid_at timestamptz,
  recorded_by uuid references public.profiles(id),
  payment_method payment_method,
  wa_notified boolean not null default false,
  created_at timestamptz not null default now(),
  unique(member_id, period)
);

-- 4. Settings table
create table public.settings (
  id uuid default uuid_generate_v4() primary key,
  key text not null unique,
  value jsonb not null default '{}',
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

-- Indexes
create index idx_transactions_date on public.transactions(transaction_date desc);
create index idx_transactions_type on public.transactions(type);
create index idx_dues_period on public.dues(period);
create index idx_dues_member on public.dues(member_id);
create index idx_dues_status on public.dues(status);
create index idx_profiles_role on public.profiles(role);
create index idx_profiles_section on public.profiles(section);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.transactions enable row level security;
alter table public.dues enable row level security;
alter table public.settings enable row level security;

-- RLS Policies: Profiles
create policy "Profiles viewable by all authenticated users" on public.profiles
  for select using (auth.role() = 'authenticated');

create policy "Profiles insertable by bendahara" on public.profiles
  for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'bendahara')
  );

create policy "Profiles updatable by bendahara" on public.profiles
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'bendahara')
    or id = auth.uid()
  );

-- RLS Policies: Transactions
create policy "Transactions viewable by all authenticated" on public.transactions
  for select using (auth.role() = 'authenticated');

create policy "Transactions manageable by bendahara" on public.transactions
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'bendahara')
  );

create policy "Transactions verifiable by pembina" on public.transactions
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'pembina')
  ) with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'pembina')
  );

-- RLS Policies: Dues
create policy "Dues viewable by bendahara and pembina" on public.dues
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('bendahara', 'pembina'))
    or member_id = auth.uid()
  );

create policy "Dues manageable by bendahara" on public.dues
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'bendahara')
  );

-- RLS Policies: Settings
create policy "Settings viewable by bendahara and pembina" on public.settings
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role in ('bendahara', 'pembina'))
  );

create policy "Settings manageable by bendahara" on public.settings
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'bendahara')
  );

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Anggota Baru'),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'anggota'),
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Default settings
insert into public.settings (key, value) values
  ('dues_config', '{"amount": 50000, "per_session": 5000, "due_day": 10, "penalty": false}'::jsonb),
  ('season', '{"name": "2026/2027", "competition": "Grand Prix MB Indonesia"}'::jsonb),
  ('approval_threshold', '{"amount": 500000}'::jsonb)
on conflict (key) do nothing;
