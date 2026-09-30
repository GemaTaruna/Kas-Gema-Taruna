'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export type AngkatanId = '16' | '17' | '18' | '19' | '20' | '21';
export type AppRole = 'superadmin' | 'admin_angkatan' | 'siswa';

export interface AccountInfo {
  username: string;
  password?: string;
  role: AppRole;
  angkatan: AngkatanId | null; // null = Super Admin (bisa akses & edit semua angkatan 16-21)
  displayName: string;
}

export interface MemberItem {
  id: string;
  angkatan: AngkatanId;
  memberCode: string;
  fullName: string;
  section: string;
  instrument: string;
  phone: string;
  status: string;
  duesStatus: 'LUNAS' | 'BELUM BAYAR';
  paidAt: string;
  duesAmount: number;
}

export interface TransactionItem {
  id: string;
  angkatan: AngkatanId;
  referenceNo: string;
  type: 'pemasukan' | 'pengeluaran';
  category: string;
  description: string;
  vendor: string;
  amount: number;
  paymentMethod: string;
  recordedBy: string;
  transactionDate: string;
}

export const ANGKATAN_LIST: AngkatanId[] = ['16', '17', '18', '19', '20', '21'];

export const OFFICIAL_ACCOUNTS: AccountInfo[] = [
  {
    username: 'Gema Taruna',
    password: 'Gemataruna123@',
    role: 'superadmin',
    angkatan: null,
    displayName: 'Super Admin (Pembina)',
  },
  {
    username: 'MB16',
    password: 'Satutekad',
    role: 'admin_angkatan',
    angkatan: '16',
    displayName: 'Admin Bendahara Angkatan 16',
  },
  {
    username: 'MB17',
    password: 'Satusemangat',
    role: 'admin_angkatan',
    angkatan: '17',
    displayName: 'Admin Bendahara Angkatan 17',
  },
  {
    username: 'MB18',
    password: 'Marchinghebat',
    role: 'admin_angkatan',
    angkatan: '18',
    displayName: 'Admin Bendahara Angkatan 18',
  },
  {
    username: 'MB19',
    password: 'Satutekad',
    role: 'admin_angkatan',
    angkatan: '19',
    displayName: 'Admin Bendahara Angkatan 19',
  },
  {
    username: 'MB20',
    password: 'Satusemangat',
    role: 'admin_angkatan',
    angkatan: '20',
    displayName: 'Admin Bendahara Angkatan 20',
  },
  {
    username: 'MB21',
    password: 'Marchinghebat',
    role: 'admin_angkatan',
    angkatan: '21',
    displayName: 'Admin Bendahara Angkatan 21',
  },
];

// Data awal terpisah untuk masing-masing Angkatan 16 s.d. 21
const INITIAL_MEMBERS_BY_ANGKATAN: Record<AngkatanId, MemberItem[]> = {
  '16': [
    { id: 'm16-1', angkatan: '16', memberCode: 'MB16-01', fullName: 'Raka Pratama Putra', section: 'Brass', instrument: 'Trumpet 1', phone: '081234560016', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '24 Sep 2026', duesAmount: 50000 },
    { id: 'm16-2', angkatan: '16', memberCode: 'MB16-02', fullName: 'Nadia Kusuma Wardhani', section: 'Color Guard', instrument: 'Flag & Rifle', phone: '081234560116', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '23 Sep 2026', duesAmount: 50000 },
    { id: 'm16-3', angkatan: '16', memberCode: 'MB16-03', fullName: 'Fajar Sidiq Nugroho', section: 'Percussion', instrument: 'Snare Drum', phone: '081234560216', status: 'Aktif', duesStatus: 'BELUM BAYAR', paidAt: '-', duesAmount: 50000 },
  ],
  '17': [
    { id: 'm17-1', angkatan: '17', memberCode: 'MB17-01', fullName: 'Bagas Arya Santoso', section: 'Percussion', instrument: 'Quinto / Tenor', phone: '081234560017', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '22 Sep 2026', duesAmount: 50000 },
    { id: 'm17-2', angkatan: '17', memberCode: 'MB17-02', fullName: 'Aulia Rahma Dewi', section: 'Pit Instrument', instrument: 'Marimba', phone: '081234560117', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '21 Sep 2026', duesAmount: 50000 },
    { id: 'm17-3', angkatan: '17', memberCode: 'MB17-03', fullName: 'Reza Aditya Saputra', section: 'Brass', instrument: 'Mellophone', phone: '081234560217', status: 'Aktif', duesStatus: 'BELUM BAYAR', paidAt: '-', duesAmount: 50000 },
  ],
  '18': [
    { id: 'm18-1', angkatan: '18', memberCode: 'MB18-01', fullName: 'Dimas Wahyu Pratama', section: 'Brass', instrument: 'Lead Trumpet', phone: '081234560018', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '24 Sep 2026', duesAmount: 50000 },
    { id: 'm18-2', angkatan: '18', memberCode: 'MB18-02', fullName: 'Siti Nurhaliza Putri', section: 'Color Guard', instrument: 'Sabre', phone: '081234560118', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '20 Sep 2026', duesAmount: 50000 },
    { id: 'm18-3', angkatan: '18', memberCode: 'MB18-03', fullName: 'Farhan Maulana', section: 'Brass', instrument: 'Baritone', phone: '081234560218', status: 'Aktif', duesStatus: 'BELUM BAYAR', paidAt: '-', duesAmount: 50000 },
  ],
  '19': [
    { id: 'm19-1', angkatan: '19', memberCode: 'MB19-01', fullName: 'Gilang Ramadhan', section: 'Percussion', instrument: 'Bass Drum 1', phone: '081234560019', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '24 Sep 2026', duesAmount: 50000 },
    { id: 'm19-2', angkatan: '19', memberCode: 'MB19-02', fullName: 'Tiara Andini Larasati', section: 'Pit Instrument', instrument: 'Vibraphone', phone: '081234560119', status: 'Aktif', duesStatus: 'BELUM BAYAR', paidAt: '-', duesAmount: 50000 },
    { id: 'm19-3', angkatan: '19', memberCode: 'MB19-03', fullName: 'Hendra Wijaya', section: 'Brass', instrument: 'Tuba / Contra', phone: '081234560219', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '19 Sep 2026', duesAmount: 50000 },
  ],
  '20': [
    { id: 'm20-1', angkatan: '20', memberCode: 'MB20-01', fullName: 'Naufal Dzakwan', section: 'Brass', instrument: 'Trumpet 2', phone: '081234560020', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '24 Sep 2026', duesAmount: 50000 },
    { id: 'm20-2', angkatan: '20', memberCode: 'MB20-02', fullName: 'Zahra Amelia', section: 'Color Guard', instrument: 'Flag Line', phone: '081234560120', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '22 Sep 2026', duesAmount: 50000 },
    { id: 'm20-3', angkatan: '20', memberCode: 'MB20-03', fullName: 'Ilham Kurniawan', section: 'Percussion', instrument: 'Snare Drum', phone: '081234560220', status: 'Aktif', duesStatus: 'BELUM BAYAR', paidAt: '-', duesAmount: 50000 },
  ],
  '21': [
    { id: 'm21-1', angkatan: '21', memberCode: 'MB21-01', fullName: 'Arjuna Satria Muda', section: 'Brass', instrument: 'Mellophone', phone: '081234560021', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '24 Sep 2026', duesAmount: 50000 },
    { id: 'm21-2', angkatan: '21', memberCode: 'MB21-02', fullName: 'Keisya Maharani', section: 'Pit Instrument', instrument: 'Xylophone', phone: '081234560121', status: 'Aktif', duesStatus: 'BELUM BAYAR', paidAt: '-', duesAmount: 50000 },
    { id: 'm21-3', angkatan: '21', memberCode: 'MB21-03', fullName: 'Bima Sakti Pratama', section: 'Percussion', instrument: 'Cymbal', phone: '081234560221', status: 'Aktif', duesStatus: 'LUNAS', paidAt: '23 Sep 2026', duesAmount: 50000 },
  ],
};

const INITIAL_TRANSACTIONS_BY_ANGKATAN: Record<AngkatanId, TransactionItem[]> = {
  '16': [
    { id: 't16-1', angkatan: '16', referenceNo: 'BKM-16-001', type: 'pemasukan', category: 'Iuran Anggota', description: 'Setoran Iuran Rutin Skuad Angkatan 16', vendor: 'Bendahara MB16', amount: 4200000, paymentMethod: 'Tunai Kas', recordedBy: 'MB16', transactionDate: '2026-09-20' },
    { id: 't16-2', angkatan: '16', referenceNo: 'BKK-16-001', type: 'pengeluaran', category: 'Perawatan Alat', description: 'Servis Valve & Slide Brass Angkatan 16', vendor: 'Surya Musik', amount: 1150000, paymentMethod: 'Tunai Kas', recordedBy: 'MB16', transactionDate: '2026-09-22' },
  ],
  '17': [
    { id: 't17-1', angkatan: '17', referenceNo: 'BKM-17-001', type: 'pemasukan', category: 'Iuran Anggota', description: 'Setoran Iuran Rutin Skuad Angkatan 17', vendor: 'Bendahara MB17', amount: 3850000, paymentMethod: 'Tunai Kas', recordedBy: 'MB17', transactionDate: '2026-09-19' },
    { id: 't17-2', angkatan: '17', referenceNo: 'BKK-17-001', type: 'pengeluaran', category: 'Logistik Latihan', description: 'Konsumsi & Air Mineral Drill Angkatan 17', vendor: 'Agen Tirta', amount: 950000, paymentMethod: 'Tunai Kas', recordedBy: 'MB17', transactionDate: '2026-09-23' },
  ],
  '18': [
    { id: 't18-1', angkatan: '18', referenceNo: 'BKM-18-001', type: 'pemasukan', category: 'Iuran Anggota', description: 'Setoran Iuran Kas Skuad Angkatan 18', vendor: 'Bendahara MB18', amount: 5400000, paymentMethod: 'Tunai Kas', recordedBy: 'MB18', transactionDate: '2026-09-18' },
    { id: 't18-2', angkatan: '18', referenceNo: 'BKK-18-001', type: 'pengeluaran', category: 'Perawatan Alat', description: 'Pembelian Drumhead & Stick Battery Angkatan 18', vendor: 'Nada Perkusi', amount: 1650000, paymentMethod: 'Tunai Kas', recordedBy: 'MB18', transactionDate: '2026-09-24' },
  ],
  '19': [
    { id: 't19-1', angkatan: '19', referenceNo: 'BKM-19-001', type: 'pemasukan', category: 'Iuran Anggota', description: 'Setoran Iuran Kas Skuad Angkatan 19', vendor: 'Bendahara MB19', amount: 3100000, paymentMethod: 'Tunai Kas', recordedBy: 'MB19', transactionDate: '2026-09-21' },
    { id: 't19-2', angkatan: '19', referenceNo: 'BKK-19-001', type: 'pengeluaran', category: 'Kostum & Seragam', description: 'Perbaikan Aksesoris Plume & Guard Angkatan 19', vendor: 'Sanggar Busana', amount: 750000, paymentMethod: 'Tunai Kas', recordedBy: 'MB19', transactionDate: '2026-09-24' },
  ],
  '20': [
    { id: 't20-1', angkatan: '20', referenceNo: 'BKM-20-001', type: 'pemasukan', category: 'Iuran Anggota', description: 'Setoran Iuran Kas Skuad Angkatan 20', vendor: 'Bendahara MB20', amount: 2750000, paymentMethod: 'Tunai Kas', recordedBy: 'MB20', transactionDate: '2026-09-20' },
    { id: 't20-2', angkatan: '20', referenceNo: 'BKK-20-001', type: 'pengeluaran', category: 'Konsumsi Latihan', description: 'Galon & Logistik Lapangan Angkatan 20', vendor: 'Koperasi MBGT', amount: 520000, paymentMethod: 'Tunai Kas', recordedBy: 'MB20', transactionDate: '2026-09-23' },
  ],
  '21': [
    { id: 't21-1', angkatan: '21', referenceNo: 'BKM-21-001', type: 'pemasukan', category: 'Iuran Anggota', description: 'Setoran Iuran Perdana Taruna Angkatan 21', vendor: 'Bendahara MB21', amount: 2150000, paymentMethod: 'Tunai Kas', recordedBy: 'MB21', transactionDate: '2026-09-22' },
    { id: 't21-2', angkatan: '21', referenceNo: 'BKK-21-001', type: 'pengeluaran', category: 'ATK & Administrasi', description: 'Cetak Kartu Iuran & Modul Drill Angkatan 21', vendor: 'Prima Grafika', amount: 380000, paymentMethod: 'Tunai Kas', recordedBy: 'MB21', transactionDate: '2026-09-24' },
  ],
};

interface AngkatanContextValue {
  role: AppRole;
  username: string;
  displayName: string;
  lockedAngkatan: AngkatanId | null;
  activeAngkatan: AngkatanId;
  canEdit: boolean;
  setActiveAngkatan: (a: AngkatanId) => void;
  loginWithCredentials: (usernameInput: string, passwordInput: string) => { ok: boolean; error?: string; account?: AccountInfo };
  enterStudentMode: (angkatan: AngkatanId) => void;
  logout: () => void;
  members: MemberItem[];
  transactions: TransactionItem[];
  totalPemasukan: number;
  totalPengeluaran: number;
  saldoAkhir: number;
  addTransaction: (tx: Omit<TransactionItem, 'id' | 'angkatan' | 'referenceNo' | 'recordedBy'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addMember: (m: Omit<MemberItem, 'id' | 'angkatan'>) => Promise<void>;
  toggleMemberDues: (id: string) => Promise<void>;
}

const AngkatanContext = createContext<AngkatanContextValue | null>(null);

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function AngkatanProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<AppRole>('superadmin');
  const [username, setUsername] = useState<string>('Gema Taruna');
  const [displayName, setDisplayName] = useState<string>('Super Admin (Pembina)');
  const [lockedAngkatan, setLockedAngkatan] = useState<AngkatanId | null>(null);
  const [activeAngkatan, setActiveAngkatanState] = useState<AngkatanId>('16');

  const [membersByAngkatan, setMembersByAngkatan] = useState<Record<AngkatanId, MemberItem[]>>(INITIAL_MEMBERS_BY_ANGKATAN);
  const [txByAngkatan, setTxByAngkatan] = useState<Record<AngkatanId, TransactionItem[]>>(INITIAL_TRANSACTIONS_BY_ANGKATAN);

  // Load session & localStorage data on mount
  useEffect(() => {
    const savedRole = (getCookieValue('kgt_session_role') as AppRole) || 'superadmin';
    const savedUser = getCookieValue('kgt_session_user') || 'Gema Taruna';
    const savedDisplay = getCookieValue('kgt_session_display') || 'Super Admin (Pembina)';
    const savedLocked = getCookieValue('kgt_session_locked_angkatan') as AngkatanId | null;
    const savedActive = (getCookieValue('kgt_active_angkatan') as AngkatanId) || savedLocked || '16';

    setRole(savedRole);
    setUsername(savedUser);
    setDisplayName(savedDisplay);
    setLockedAngkatan(savedLocked && ANGKATAN_LIST.includes(savedLocked) ? savedLocked : null);
    if (ANGKATAN_LIST.includes(savedActive)) {
      setActiveAngkatanState(savedActive);
    }

    // Load local storage ledgers per angkatan
    try {
      const storedMembers = localStorage.getItem('kgt_members_multi_v1');
      if (storedMembers) {
        setMembersByAngkatan(JSON.parse(storedMembers));
      }
      const storedTx = localStorage.getItem('kgt_tx_multi_v1');
      if (storedTx) {
        setTxByAngkatan(JSON.parse(storedTx));
      }
    } catch {
      // ignore parse errors
    }

    // Also try fetching from Supabase if tables exist
    const fetchSupabaseData = async () => {
      try {
        const supabase = createClient();
        const { data: dbMembers } = await (supabase as any).from('kgt_members').select('*').order('created_at', { ascending: true });
        if (dbMembers && dbMembers.length > 0) {
          const grouped: Record<AngkatanId, MemberItem[]> = { ...INITIAL_MEMBERS_BY_ANGKATAN };
          ANGKATAN_LIST.forEach((a) => {
            const list = dbMembers.filter((m: any) => m.angkatan === a);
            if (list.length > 0) {
              grouped[a] = list.map((m: any) => ({
                id: m.id,
                angkatan: m.angkatan,
                memberCode: m.member_code,
                fullName: m.full_name,
                section: m.section,
                instrument: m.instrument || '-',
                phone: m.phone || '',
                status: m.status || 'Aktif',
                duesStatus: m.dues_status === 'LUNAS' ? 'LUNAS' : 'BELUM BAYAR',
                paidAt: m.paid_at || '-',
                duesAmount: Number(m.dues_amount || 50000),
              }));
            }
          });
          setMembersByAngkatan(grouped);
        }

        const { data: dbTx } = await (supabase as any).from('kgt_transactions').select('*').order('created_at', { ascending: false });
        if (dbTx && dbTx.length > 0) {
          const groupedTx: Record<AngkatanId, TransactionItem[]> = { ...INITIAL_TRANSACTIONS_BY_ANGKATAN };
          ANGKATAN_LIST.forEach((a) => {
            const list = dbTx.filter((t: any) => t.angkatan === a);
            if (list.length > 0) {
              groupedTx[a] = list.map((t: any) => ({
                id: t.id,
                angkatan: t.angkatan,
                referenceNo: t.reference_no,
                type: t.type,
                category: t.category,
                description: t.description,
                vendor: t.vendor || '-',
                amount: Number(t.amount),
                paymentMethod: t.payment_method || 'Tunai Kas',
                recordedBy: t.recorded_by || 'Bendahara',
                transactionDate: t.transaction_date,
              }));
            }
          });
          setTxByAngkatan(groupedTx);
        }
      } catch {
        // Fallback to localStorage if Supabase tables not yet created
      }
    };

    fetchSupabaseData();
  }, []);

  const setActiveAngkatan = (a: AngkatanId) => {
    // Jika admin_angkatan, kunci hanya di angkatannya sendiri
    if (role === 'admin_angkatan' && lockedAngkatan && a !== lockedAngkatan) {
      return;
    }
    setActiveAngkatanState(a);
    document.cookie = `kgt_active_angkatan=${a}; path=/; max-age=2592000; SameSite=Lax`;
  };

  const loginWithCredentials = (usernameInput: string, passwordInput: string) => {
    const cleanUser = usernameInput.trim().toLowerCase();
    const matched = OFFICIAL_ACCOUNTS.find(
      (acc) => acc.username.toLowerCase() === cleanUser && acc.password === passwordInput
    );

    if (!matched) {
      return {
        ok: false,
        error: 'Akun atau Kata Sandi tidak sesuai! Pastikan huruf besar/kecil Kata Sandi benar.',
      };
    }

    const targetAngkatan: AngkatanId = matched.angkatan || '16';
    setRole(matched.role);
    setUsername(matched.username);
    setDisplayName(matched.displayName);
    setLockedAngkatan(matched.angkatan);
    setActiveAngkatanState(targetAngkatan);

    document.cookie = `kgt_session_role=${matched.role}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `kgt_session_user=${encodeURIComponent(matched.username)}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `kgt_session_display=${encodeURIComponent(matched.displayName)}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `kgt_session_locked_angkatan=${matched.angkatan || ''}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `kgt_active_angkatan=${targetAngkatan}; path=/; max-age=2592000; SameSite=Lax`;

    return { ok: true, account: matched };
  };

  const enterStudentMode = (angkatan: AngkatanId) => {
    const disp = `Siswa Angkatan ${angkatan} (Hanya Membaca)`;
    setRole('siswa');
    setUsername(`Siswa MB${angkatan}`);
    setDisplayName(disp);
    setLockedAngkatan(angkatan);
    setActiveAngkatanState(angkatan);

    document.cookie = `kgt_session_role=siswa; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `kgt_session_user=${encodeURIComponent(`Siswa MB${angkatan}`)}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `kgt_session_display=${encodeURIComponent(disp)}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `kgt_session_locked_angkatan=${angkatan}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `kgt_active_angkatan=${angkatan}; path=/; max-age=2592000; SameSite=Lax`;
  };

  const logout = () => {
    document.cookie = 'kgt_session_role=; path=/; max-age=0';
    document.cookie = 'kgt_session_user=; path=/; max-age=0';
    document.cookie = 'kgt_session_display=; path=/; max-age=0';
    document.cookie = 'kgt_session_locked_angkatan=; path=/; max-age=0';
    document.cookie = 'kgt_active_angkatan=; path=/; max-age=0';
  };

  const canEdit =
    role === 'superadmin' ||
    (role === 'admin_angkatan' && lockedAngkatan === activeAngkatan);

  const currentMembers = membersByAngkatan[activeAngkatan] || [];
  const currentTransactions = txByAngkatan[activeAngkatan] || [];

  const totalPemasukan = currentTransactions
    .filter((t) => t.type === 'pemasukan')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPengeluaran = currentTransactions
    .filter((t) => t.type === 'pengeluaran')
    .reduce((sum, t) => sum + t.amount, 0);

  const saldoAkhir = totalPemasukan - totalPengeluaran;

  const addTransaction = async (
    tx: Omit<TransactionItem, 'id' | 'angkatan' | 'referenceNo' | 'recordedBy'>
  ) => {
    if (!canEdit) return;
    const prefix = tx.type === 'pemasukan' ? 'BKM' : 'BKK';
    const seq = String((txByAngkatan[activeAngkatan]?.length || 0) + 1).padStart(3, '0');
    const newTx: TransactionItem = {
      ...tx,
      id: `${prefix}-${activeAngkatan}-${Date.now()}`,
      angkatan: activeAngkatan,
      referenceNo: `${prefix}-${activeAngkatan}-${seq}`,
      recordedBy: username,
    };

    const updated = {
      ...txByAngkatan,
      [activeAngkatan]: [newTx, ...(txByAngkatan[activeAngkatan] || [])],
    };
    setTxByAngkatan(updated);
    localStorage.setItem('kgt_tx_multi_v1', JSON.stringify(updated));

    try {
      const supabase = createClient();
      await (supabase as any).from('kgt_transactions').insert({
        angkatan: activeAngkatan,
        reference_no: newTx.referenceNo,
        type: newTx.type,
        category: newTx.category,
        description: newTx.description,
        vendor: newTx.vendor,
        amount: newTx.amount,
        payment_method: newTx.paymentMethod,
        recorded_by: newTx.recordedBy,
        transaction_date: newTx.transactionDate,
      });
    } catch {
      // Saved in localStorage
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!canEdit) return;
    const updated = {
      ...txByAngkatan,
      [activeAngkatan]: (txByAngkatan[activeAngkatan] || []).filter((t) => t.id !== id),
    };
    setTxByAngkatan(updated);
    localStorage.setItem('kgt_tx_multi_v1', JSON.stringify(updated));

    try {
      const supabase = createClient();
      await (supabase as any).from('kgt_transactions').delete().eq('id', id);
    } catch {
      // Deleted from localStorage
    }
  };

  const addMember = async (m: Omit<MemberItem, 'id' | 'angkatan'>) => {
    if (!canEdit) return;
    const newMember: MemberItem = {
      ...m,
      id: `m${activeAngkatan}-${Date.now()}`,
      angkatan: activeAngkatan,
    };
    const updated = {
      ...membersByAngkatan,
      [activeAngkatan]: [...(membersByAngkatan[activeAngkatan] || []), newMember],
    };
    setMembersByAngkatan(updated);
    localStorage.setItem('kgt_members_multi_v1', JSON.stringify(updated));

    try {
      const supabase = createClient();
      await (supabase as any).from('kgt_members').insert({
        angkatan: activeAngkatan,
        member_code: newMember.memberCode,
        full_name: newMember.fullName,
        section: newMember.section,
        instrument: newMember.instrument,
        phone: newMember.phone,
        status: newMember.status,
        dues_status: newMember.duesStatus,
        paid_at: newMember.paidAt,
        dues_amount: newMember.duesAmount,
      });
    } catch {
      // Saved in localStorage
    }
  };

  const toggleMemberDues = async (id: string) => {
    if (!canEdit) return;
    const list = membersByAngkatan[activeAngkatan] || [];
    const target = list.find((item) => item.id === id);
    if (!target) return;

    const nextStatus: 'LUNAS' | 'BELUM BAYAR' =
      target.duesStatus === 'LUNAS' ? 'BELUM BAYAR' : 'LUNAS';
    const nextPaidAt =
      nextStatus === 'LUNAS'
        ? new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
        : '-';

    const updatedList = list.map((item) =>
      item.id === id ? { ...item, duesStatus: nextStatus, paidAt: nextPaidAt } : item
    );

    const updated = {
      ...membersByAngkatan,
      [activeAngkatan]: updatedList,
    };
    setMembersByAngkatan(updated);
    localStorage.setItem('kgt_members_multi_v1', JSON.stringify(updated));

    try {
      const supabase = createClient();
      await (supabase as any)
        .from('kgt_members')
        .update({ dues_status: nextStatus, paid_at: nextPaidAt })
        .eq('id', id);
    } catch {
      // Updated in localStorage
    }
  };

  return (
    <AngkatanContext.Provider
      value={{
        role,
        username,
        displayName,
        lockedAngkatan,
        activeAngkatan,
        canEdit,
        setActiveAngkatan,
        loginWithCredentials,
        enterStudentMode,
        logout,
        members: currentMembers,
        transactions: currentTransactions,
        totalPemasukan,
        totalPengeluaran,
        saldoAkhir,
        addTransaction,
        deleteTransaction,
        addMember,
        toggleMemberDues,
      }}
    >
      {children}
    </AngkatanContext.Provider>
  );
}

export function useAngkatan() {
  const ctx = useContext(AngkatanContext);
  if (!ctx) {
    throw new Error('useAngkatan must be used inside AngkatanProvider');
  }
  return ctx;
}
