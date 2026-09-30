'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAngkatan } from '@/context/AngkatanContext';

const DATA_PATH_MAP: Record<string, string> = {
  'dashboard': '/dashboard',
  'dashboard-utama': '/dashboard',
  'dashboard-utama-bendahara': '/dashboard',
  'database-anggota': '/anggota',
  'database-anggota-marching-band-gema-taruna': '/anggota',
  'pembayaran-iuran': '/iuran',
  'pembayaran-iuran-anggota': '/iuran',
  'pemasukan-kas': '/pemasukan',
  'pemasukan-kas-buku-kas-masuk': '/pemasukan',
  'pengeluaran-kas': '/pengeluaran',
  'pengeluaran-kas-buku-kas-keluar': '/pengeluaran',
  'riwayat-transaksi': '/riwayat',
  'riwayat-transaksi-keuangan-buku-kas-umum': '/riwayat',
  'laporan-keuangan': '/laporan',
  'laporan-keuangan-akuntabilitas-kas': '/laporan',
  'pengaturan': '/pengaturan',
  'pengaturan-sistem-keuangan-hak-akses': '/pengaturan',
  'ringkasan-kas-saya': '/transparansi',
  'transparansi-kas-mbgt': '/transparansi',
  'status-iuran-seksi': '/transparansi',
  'realisasi-anggaran-gpmb': '/transparansi',
  'unduh-kuitansi-iuran': '/transparansi',
  'hubungi-bendahara': '/transparansi',
};

export default function GlobalNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAngkatan();

  useEffect(() => {
    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest('[data-path]') as HTMLElement | null;
      if (!el) return;

      const dataPath = el.getAttribute('data-path');
      if (!dataPath) return;

      e.preventDefault();

      if (dataPath === 'login') {
        logout();
        try {
          const supabase = createClient();
          await supabase.auth.signOut();
        } catch {
          // ignore
        }
        router.push('/login');
        router.refresh();
        return;
      }

      const mappedRoute = DATA_PATH_MAP[dataPath];
      if (mappedRoute) {
        router.push(mappedRoute);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname, router, logout]);

  // Menu melayang di pojok kanan bawah dihapus sesuai permintaan user
  return null;
}
