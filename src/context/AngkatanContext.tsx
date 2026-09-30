'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export type AngkatanId = '16' | '17' | '18' | '19' | '20' | '21';
export type AppRole = 'superadmin' | 'admin_angkatan' | 'siswa';

export interface AccountInfo {
  username: string;
  password?: string;
  role: AppRole;
  angkatan: AngkatanId | null;
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
    displayName: 'Admin Angkatan 16',
  },
  {
    username: 'MB17',
    password: 'Satusemangat',
    role: 'admin_angkatan',
    angkatan: '17',
    displayName: 'Admin Angkatan 17',
  },
  {
    username: 'MB18',
    password: 'Marchinghebat',
    role: 'admin_angkatan',
    angkatan: '18',
    displayName: 'Admin Angkatan 18',
  },
  {
    username: 'MB19',
    password: 'Satutekad',
    role: 'admin_angkatan',
    angkatan: '19',
    displayName: 'Admin Angkatan 19',
  },
  {
    username: 'MB20',
    password: 'Satusemangat',
    role: 'admin_angkatan',
    angkatan: '20',
    displayName: 'Admin Angkatan 20',
  },
  {
    username: 'MB21',
    password: 'Marchinghebat',
    role: 'admin_angkatan',
    angkatan: '21',
    displayName: 'Admin Angkatan 21',
  },
];

const EMPTY_MEMBERS_BY_ANGKATAN: Record<AngkatanId, MemberItem[]> = {
  '16': [],
  '17': [],
  '18': [],
  '19': [],
  '20': [],
  '21': [],
};

const EMPTY_TRANSACTIONS_BY_ANGKATAN: Record<AngkatanId, TransactionItem[]> = {
  '16': [],
  '17': [],
  '18': [],
  '19': [],
  '20': [],
  '21': [],
};

interface AngkatanContextValue {
  role: AppRole;
  username: string;
  displayName: string;
  lockedAngkatan: AngkatanId | null;
  activeAngkatan: AngkatanId;
  canEdit: boolean;
  duesNominal: number;
  setDuesNominal: (val: number) => void;
  setActiveAngkatan: (a: AngkatanId) => void;
  loginWithCredentials: (
    usernameInput: string,
    passwordInput: string
  ) => { ok: boolean; error?: string; account?: AccountInfo };
  enterStudentMode: (angkatan: AngkatanId) => void;
  logout: () => void;
  members: MemberItem[];
  transactions: TransactionItem[];
  totalPemasukan: number;
  totalPengeluaran: number;
  saldoAkhir: number;
  addTransaction: (
    tx: Omit<TransactionItem, 'id' | 'angkatan' | 'referenceNo' | 'recordedBy'>
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addMember: (m: Omit<MemberItem, 'id' | 'angkatan'>) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  toggleMemberDues: (id: string, recordToCash?: boolean) => Promise<void>;
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
  const [duesNominal, setDuesNominalState] = useState<number>(50000);

  const [membersByAngkatan, setMembersByAngkatan] = useState<Record<AngkatanId, MemberItem[]>>(
    EMPTY_MEMBERS_BY_ANGKATAN
  );
  const [txByAngkatan, setTxByAngkatan] = useState<Record<AngkatanId, TransactionItem[]>>(
    EMPTY_TRANSACTIONS_BY_ANGKATAN
  );

  useEffect(() => {
    // Hapus cache dummy lama jika ada
    try {
      localStorage.removeItem('kgt_members_multi_v1');
      localStorage.removeItem('kgt_tx_multi_v1');
    } catch {
      // ignore
    }

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

    try {
      const storedMembers = localStorage.getItem('kgt_real_members_v2');
      if (storedMembers) {
        setMembersByAngkatan(JSON.parse(storedMembers));
      }
      const storedTx = localStorage.getItem('kgt_real_tx_v2');
      if (storedTx) {
        setTxByAngkatan(JSON.parse(storedTx));
      }
      const storedNominal = localStorage.getItem('kgt_dues_nominal_v2');
      if (storedNominal) {
        setDuesNominalState(Number(storedNominal) || 50000);
      }
    } catch {
      // ignore
    }

    const fetchSupabaseData = async () => {
      try {
        const supabase = createClient();
        const { data: dbMembers } = await (supabase as any)
          .from('kgt_members')
          .select('*')
          .order('created_at', { ascending: true });

        if (dbMembers) {
          const grouped: Record<AngkatanId, MemberItem[]> = {
            '16': [],
            '17': [],
            '18': [],
            '19': [],
            '20': [],
            '21': [],
          };
          ANGKATAN_LIST.forEach((a) => {
            const list = dbMembers.filter((m: any) => m.angkatan === a);
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
          });
          setMembersByAngkatan(grouped);
          localStorage.setItem('kgt_real_members_v2', JSON.stringify(grouped));
        }

        const { data: dbTx } = await (supabase as any)
          .from('kgt_transactions')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbTx) {
          const groupedTx: Record<AngkatanId, TransactionItem[]> = {
            '16': [],
            '17': [],
            '18': [],
            '19': [],
            '20': [],
            '21': [],
          };
          ANGKATAN_LIST.forEach((a) => {
            const list = dbTx.filter((t: any) => t.angkatan === a);
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
              recordedBy: t.recorded_by || 'Admin',
              transactionDate: t.transaction_date,
            }));
          });
          setTxByAngkatan(groupedTx);
          localStorage.setItem('kgt_real_tx_v2', JSON.stringify(groupedTx));
        }
      } catch {
        // Fallback to localStorage
      }
    };

    fetchSupabaseData();
  }, []);

  const setDuesNominal = (val: number) => {
    setDuesNominalState(val);
    try {
      localStorage.setItem('kgt_dues_nominal_v2', String(val));
    } catch {
      // ignore
    }
  };

  const setActiveAngkatan = (a: AngkatanId) => {
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
    const disp = `Cek Kas Siswa — Angkatan ${angkatan}`;
    setRole('siswa');
    setUsername(`Angkatan ${angkatan}`);
    setDisplayName(disp);
    setLockedAngkatan(angkatan);
    setActiveAngkatanState(angkatan);

    document.cookie = `kgt_session_role=siswa; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `kgt_session_user=${encodeURIComponent(`Angkatan ${angkatan}`)}; path=/; max-age=2592000; SameSite=Lax`;
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
    const newId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${prefix}-${activeAngkatan}-${Date.now()}`;

    const newTx: TransactionItem = {
      ...tx,
      id: newId,
      angkatan: activeAngkatan,
      referenceNo: `${prefix}-${activeAngkatan}-${seq}`,
      recordedBy: username,
    };

    const updated = {
      ...txByAngkatan,
      [activeAngkatan]: [newTx, ...(txByAngkatan[activeAngkatan] || [])],
    };
    setTxByAngkatan(updated);
    localStorage.setItem('kgt_real_tx_v2', JSON.stringify(updated));

    try {
      const supabase = createClient();
      await (supabase as any).from('kgt_transactions').insert({
        id: newId,
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
    localStorage.setItem('kgt_real_tx_v2', JSON.stringify(updated));

    try {
      const supabase = createClient();
      await (supabase as any).from('kgt_transactions').delete().eq('id', id);
    } catch {
      // Deleted from localStorage
    }
  };

  const addMember = async (m: Omit<MemberItem, 'id' | 'angkatan'>) => {
    if (!canEdit) return;
    const newId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `m${activeAngkatan}-${Date.now()}`;

    const newMember: MemberItem = {
      ...m,
      id: newId,
      angkatan: activeAngkatan,
    };
    const updated = {
      ...membersByAngkatan,
      [activeAngkatan]: [...(membersByAngkatan[activeAngkatan] || []), newMember],
    };
    setMembersByAngkatan(updated);
    localStorage.setItem('kgt_real_members_v2', JSON.stringify(updated));

    try {
      const supabase = createClient();
      await (supabase as any).from('kgt_members').insert({
        id: newId,
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

  const deleteMember = async (id: string) => {
    if (!canEdit) return;
    const updated = {
      ...membersByAngkatan,
      [activeAngkatan]: (membersByAngkatan[activeAngkatan] || []).filter((m) => m.id !== id),
    };
    setMembersByAngkatan(updated);
    localStorage.setItem('kgt_real_members_v2', JSON.stringify(updated));

    try {
      const supabase = createClient();
      await (supabase as any).from('kgt_members').delete().eq('id', id);
    } catch {
      // Deleted from localStorage
    }
  };

  const toggleMemberDues = async (id: string, recordToCash = false) => {
    if (!canEdit) return;
    const list = membersByAngkatan[activeAngkatan] || [];
    const target = list.find((item) => item.id === id);
    if (!target) return;

    const nextStatus: 'LUNAS' | 'BELUM BAYAR' =
      target.duesStatus === 'LUNAS' ? 'BELUM BAYAR' : 'LUNAS';
    const nextPaidAt =
      nextStatus === 'LUNAS'
        ? new Date().toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : '-';

    const updatedList = list.map((item) =>
      item.id === id ? { ...item, duesStatus: nextStatus, paidAt: nextPaidAt } : item
    );

    const updated = {
      ...membersByAngkatan,
      [activeAngkatan]: updatedList,
    };
    setMembersByAngkatan(updated);
    localStorage.setItem('kgt_real_members_v2', JSON.stringify(updated));

    try {
      const supabase = createClient();
      await (supabase as any)
        .from('kgt_members')
        .update({ dues_status: nextStatus, paid_at: nextPaidAt })
        .eq('id', id);
    } catch {
      // Updated in localStorage
    }

    if (recordToCash && nextStatus === 'LUNAS') {
      await addTransaction({
        type: 'pemasukan',
        category: 'Iuran Anggota',
        description: `Pembayaran Iuran Kas - ${target.fullName} (${target.memberCode})`,
        vendor: target.fullName,
        amount: target.duesAmount || duesNominal,
        paymentMethod: 'Tunai Kas',
        transactionDate: new Date().toISOString().slice(0, 10),
      });
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
        duesNominal,
        setDuesNominal,
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
        deleteMember,
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
