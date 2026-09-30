'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export type AngkatanId = '16' | '17' | '18' | '19' | '20' | '21';
export type AppRole = 'superadmin' | 'admin_angkatan' | 'siswa';

export const SECTION_OPTIONS: Record<string, string[]> = {
  'BRASS': ['Terompet', 'Bariton'],
  'PERCUSSION': ['Bass Drum', 'Snare Drum', 'Tenor', 'Simbal'],
  'PIT INSTRUMENT': ['Belira', 'Instrumen Statis Lainnya'],
  'COLOR GUARD': ['Bendera & Visual Performance'],
  'LEADERSHIP': ['Field Commander', 'Stickmaster Taruna/i'],
};

export const SECTION_NAMES = Object.keys(SECTION_OPTIONS);

export interface SessionInfo {
  id: string; // e.g. 'P1', 'P2', ...
  label: string; // e.g. 'Pertemuan 1'
  date: string;
}

export const DEFAULT_SESSIONS: SessionInfo[] = [
  { id: 'P1', label: 'Pertemuan 1 (Minggu 1 - Sesi 1)', date: '' },
  { id: 'P2', label: 'Pertemuan 2 (Minggu 1 - Sesi 2)', date: '' },
  { id: 'P3', label: 'Pertemuan 3 (Minggu 2 - Sesi 1)', date: '' },
  { id: 'P4', label: 'Pertemuan 4 (Minggu 2 - Sesi 2)', date: '' },
  { id: 'P5', label: 'Pertemuan 5 (Minggu 3 - Sesi 1)', date: '' },
  { id: 'P6', label: 'Pertemuan 6 (Minggu 3 - Sesi 2)', date: '' },
  { id: 'P7', label: 'Pertemuan 7 (Minggu 4 - Sesi 1)', date: '' },
  { id: 'P8', label: 'Pertemuan 8 (Minggu 4 - Sesi 2)', date: '' },
];

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
  memberCode: string; // No / Kode
  fullName: string;   // Nama
  kelas: string;      // Kelas
  section: string;    // Seksi
  instrument: string; // Alat
  phone: string;      // No WA
  status: string;
  duesStatus: 'LUNAS' | 'BELUM BAYAR';
  paidAt: string;
  paidSessions: string[]; // Daftar ID pertemuan yang sudah lunas, misal ['P1', 'P2']
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

const DEFAULT_SESSIONS_BY_ANGKATAN: Record<AngkatanId, SessionInfo[]> = {
  '16': DEFAULT_SESSIONS,
  '17': DEFAULT_SESSIONS,
  '18': DEFAULT_SESSIONS,
  '19': DEFAULT_SESSIONS,
  '20': DEFAULT_SESSIONS,
  '21': DEFAULT_SESSIONS,
};

export const DEFAULT_WA_TEMPLATE =
  'Halo *{nama}* ({kelas} - {seksi}), mengingatkan iuran kas Marching Band Gema Taruna (Angkatan {angkatan}) untuk *{pertemuan}* sebesar *{nominal}* belum tercatat lunas. Mohon dapat dibayarkan pada pertemuan latihan berikutnya. Terima kasih 🙏';

export function formatWhatsAppLink(
  phone: string,
  template: string,
  vars: {
    nama: string;
    kelas: string;
    seksi: string;
    angkatan: string;
    pertemuan: string;
    nominal: string;
  }
): string {
  let cleanPhone = (phone || '').replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  } else if (cleanPhone.startsWith('8')) {
    cleanPhone = '62' + cleanPhone;
  }
  const msg = template
    .replace(/\{nama\}/g, vars.nama)
    .replace(/\{kelas\}/g, vars.kelas || '-')
    .replace(/\{seksi\}/g, vars.seksi)
    .replace(/\{angkatan\}/g, vars.angkatan)
    .replace(/\{pertemuan\}/g, vars.pertemuan)
    .replace(/\{nominal\}/g, vars.nominal);

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
}

// Helper untuk encode/decode kelas & paidSessions ke kolom Supabase yang sudah ada
function encodeStatusField(kelas: string, status: string): string {
  return `${kelas || '-'}||${status || 'Aktif'}`;
}

function decodeStatusField(raw: string): { kelas: string; status: string } {
  if (!raw) return { kelas: '-', status: 'Aktif' };
  if (raw.includes('||')) {
    const [kelas, status] = raw.split('||');
    return { kelas: kelas || '-', status: status || 'Aktif' };
  }
  return { kelas: '-', status: raw };
}

function encodePaidSessions(sessions: string[]): string {
  return JSON.stringify(sessions || []);
}

function decodePaidSessions(raw: string | null | undefined): string[] {
  if (!raw || raw === '-') return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // fallback comma separated
    if (raw.startsWith('P')) return raw.split(',').map((s) => s.trim());
  }
  return [];
}

interface AngkatanContextValue {
  role: AppRole;
  username: string;
  displayName: string;
  lockedAngkatan: AngkatanId | null;
  activeAngkatan: AngkatanId;
  canEdit: boolean;
  duesNominal: number; // Default Rp 5.000 per pertemuan
  setDuesNominal: (val: number) => void;
  waTemplate: string;
  setWaTemplate: (val: string) => void;
  sessions: SessionInfo[];
  activeSessionId: string;
  setActiveSessionId: (id: string) => void;
  addCustomSession: (label: string, date: string) => void;
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
    tx: Omit<TransactionItem, 'id' | 'angkatan' | 'referenceNo' | 'recordedBy'> & {
      customRefNo?: string;
    }
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addMember: (
    m: Omit<MemberItem, 'id' | 'angkatan' | 'paidSessions' | 'duesStatus' | 'paidAt'>
  ) => Promise<void>;
  importMembersBulk: (
    rows: Array<{
      no?: string;
      nama: string;
      kelas: string;
      seksi: string;
      alat: string;
      phone: string;
    }>
  ) => Promise<number>;
  deleteMember: (id: string) => Promise<void>;
  toggleSessionDues: (memberId: string, sessionId: string) => Promise<void>;
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
  const [duesNominal, setDuesNominalState] = useState<number>(5000); // Rp 5.000 per pertemuan
  const [waTemplate, setWaTemplateState] = useState<string>(DEFAULT_WA_TEMPLATE);
  const [sessionsByAngkatan, setSessionsByAngkatan] = useState<
    Record<AngkatanId, SessionInfo[]>
  >(DEFAULT_SESSIONS_BY_ANGKATAN);
  const [activeSessionId, setActiveSessionId] = useState<string>('P1');

  const [membersByAngkatan, setMembersByAngkatan] = useState<Record<AngkatanId, MemberItem[]>>(
    EMPTY_MEMBERS_BY_ANGKATAN
  );
  const [txByAngkatan, setTxByAngkatan] = useState<Record<AngkatanId, TransactionItem[]>>(
    EMPTY_TRANSACTIONS_BY_ANGKATAN
  );

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

    try {
      const storedMembers = localStorage.getItem('kgt_real_members_v3');
      if (storedMembers) {
        setMembersByAngkatan(JSON.parse(storedMembers));
      }
      const storedTx = localStorage.getItem('kgt_real_tx_v3');
      if (storedTx) {
        setTxByAngkatan(JSON.parse(storedTx));
      }
      const storedNominal = localStorage.getItem('kgt_dues_nominal_v3');
      if (storedNominal) {
        setDuesNominalState(Number(storedNominal) || 5000);
      }
      const storedWa = localStorage.getItem('kgt_wa_template_v3');
      if (storedWa) {
        setWaTemplateState(storedWa);
      }
      const storedSessions = localStorage.getItem('kgt_sessions_v3');
      if (storedSessions) {
        setSessionsByAngkatan(JSON.parse(storedSessions));
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
            grouped[a] = list.map((m: any) => {
              const { kelas, status } = decodeStatusField(m.status);
              const paidSessions = decodePaidSessions(m.paid_at);
              return {
                id: m.id,
                angkatan: m.angkatan,
                memberCode: m.member_code,
                fullName: m.full_name,
                kelas,
                section: m.section || 'BRASS',
                instrument: m.instrument || 'Terompet',
                phone: m.phone || '',
                status,
                duesStatus: paidSessions.length > 0 ? 'LUNAS' : 'BELUM BAYAR',
                paidAt: m.paid_at || '-',
                paidSessions,
                duesAmount: Number(m.dues_amount || 5000),
              };
            });
          });
          setMembersByAngkatan(grouped);
          localStorage.setItem('kgt_real_members_v3', JSON.stringify(grouped));
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
          localStorage.setItem('kgt_real_tx_v3', JSON.stringify(groupedTx));
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
      localStorage.setItem('kgt_dues_nominal_v3', String(val));
    } catch {
      // ignore
    }
  };

  const setWaTemplate = (val: string) => {
    setWaTemplateState(val);
    try {
      localStorage.setItem('kgt_wa_template_v3', val);
    } catch {
      // ignore
    }
  };

  const addCustomSession = (label: string, date: string) => {
    const currentList = sessionsByAngkatan[activeAngkatan] || DEFAULT_SESSIONS;
    const nextNum = currentList.length + 1;
    const newSession: SessionInfo = {
      id: `P${nextNum}`,
      label: label.trim() || `Pertemuan ${nextNum}`,
      date,
    };
    const updated = {
      ...sessionsByAngkatan,
      [activeAngkatan]: [...currentList, newSession],
    };
    setSessionsByAngkatan(updated);
    setActiveSessionId(newSession.id);
    try {
      localStorage.setItem('kgt_sessions_v3', JSON.stringify(updated));
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

  const currentSessions = sessionsByAngkatan[activeAngkatan] || DEFAULT_SESSIONS;
  const rawMembers = membersByAngkatan[activeAngkatan] || [];

  // Status LUNAS/BELUM BAYAR dievaluasi berdasarkan pertemuan aktif (activeSessionId)
  const currentMembers: MemberItem[] = rawMembers.map((m) => ({
    ...m,
    duesStatus: (m.paidSessions || []).includes(activeSessionId)
      ? 'LUNAS'
      : 'BELUM BAYAR',
  }));

  const currentTransactions = txByAngkatan[activeAngkatan] || [];

  const totalPemasukan = currentTransactions
    .filter((t) => t.type === 'pemasukan')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPengeluaran = currentTransactions
    .filter((t) => t.type === 'pengeluaran')
    .reduce((sum, t) => sum + t.amount, 0);

  const saldoAkhir = totalPemasukan - totalPengeluaran;

  const addTransaction = async (
    tx: Omit<TransactionItem, 'id' | 'angkatan' | 'referenceNo' | 'recordedBy'> & {
      customRefNo?: string;
    }
  ) => {
    if (!canEdit) return;
    const prefix = tx.type === 'pemasukan' ? 'BKM' : 'BKK';
    const seq = String((txByAngkatan[activeAngkatan]?.length || 0) + 1).padStart(3, '0');
    const newId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${prefix}-${activeAngkatan}-${Date.now()}`;

    const refNo = tx.customRefNo || `${prefix}-${activeAngkatan}-${seq}`;

    const newTx: TransactionItem = {
      id: newId,
      angkatan: activeAngkatan,
      referenceNo: refNo,
      type: tx.type,
      category: tx.category,
      description: tx.description,
      vendor: tx.vendor,
      amount: tx.amount,
      paymentMethod: tx.paymentMethod,
      recordedBy: username,
      transactionDate: tx.transactionDate,
    };

    setTxByAngkatan((prev) => {
      const updated = {
        ...prev,
        [activeAngkatan]: [newTx, ...(prev[activeAngkatan] || [])],
      };
      localStorage.setItem('kgt_real_tx_v3', JSON.stringify(updated));
      return updated;
    });

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
    setTxByAngkatan((prev) => {
      const updated = {
        ...prev,
        [activeAngkatan]: (prev[activeAngkatan] || []).filter((t) => t.id !== id),
      };
      localStorage.setItem('kgt_real_tx_v3', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      await (supabase as any).from('kgt_transactions').delete().eq('id', id);
    } catch {
      // Deleted from localStorage
    }
  };

  const addMember = async (
    m: Omit<MemberItem, 'id' | 'angkatan' | 'paidSessions' | 'duesStatus' | 'paidAt'>
  ) => {
    if (!canEdit) return;
    const newId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `m${activeAngkatan}-${Date.now()}`;

    const newMember: MemberItem = {
      ...m,
      id: newId,
      angkatan: activeAngkatan,
      duesStatus: 'BELUM BAYAR',
      paidAt: '[]',
      paidSessions: [],
    };

    setMembersByAngkatan((prev) => {
      const updated = {
        ...prev,
        [activeAngkatan]: [...(prev[activeAngkatan] || []), newMember],
      };
      localStorage.setItem('kgt_real_members_v3', JSON.stringify(updated));
      return updated;
    });

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
        status: encodeStatusField(newMember.kelas, newMember.status),
        dues_status: 'BELUM BAYAR',
        paid_at: encodePaidSessions([]),
        dues_amount: newMember.duesAmount,
      });
    } catch {
      // Saved in localStorage
    }
  };

  const importMembersBulk = async (
    rows: Array<{
      no?: string;
      nama: string;
      kelas: string;
      seksi: string;
      alat: string;
      phone: string;
    }>
  ): Promise<number> => {
    if (!canEdit || rows.length === 0) return 0;

    const existingCount = (membersByAngkatan[activeAngkatan] || []).length;
    const newItems: MemberItem[] = rows.map((r, idx) => {
      const seq = r.no?.trim() || String(existingCount + idx + 1).padStart(2, '0');
      const code = seq.toUpperCase().startsWith('MB')
        ? seq
        : `MB${activeAngkatan}-${seq.padStart(2, '0')}`;
      const newId =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `m${activeAngkatan}-${Date.now()}-${idx}`;

      const upperSec = (r.seksi || 'BRASS').trim().toUpperCase();
      const matchedSec =
        SECTION_NAMES.find((s) => upperSec.includes(s) || s.includes(upperSec)) ||
        'BRASS';
      const defaultAlat = SECTION_OPTIONS[matchedSec]?.[0] || 'Terompet';

      return {
        id: newId,
        angkatan: activeAngkatan,
        memberCode: code,
        fullName: r.nama.trim(),
        kelas: (r.kelas || '-').trim(),
        section: matchedSec,
        instrument: (r.alat || defaultAlat).trim(),
        phone: (r.phone || '').trim(),
        status: 'Aktif',
        duesStatus: 'BELUM BAYAR',
        paidAt: '[]',
        paidSessions: [],
        duesAmount: duesNominal,
      };
    });

    setMembersByAngkatan((prev) => {
      const updated = {
        ...prev,
        [activeAngkatan]: [...(prev[activeAngkatan] || []), ...newItems],
      };
      localStorage.setItem('kgt_real_members_v3', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      const dbPayload = newItems.map((item) => ({
        id: item.id,
        angkatan: activeAngkatan,
        member_code: item.memberCode,
        full_name: item.fullName,
        section: item.section,
        instrument: item.instrument,
        phone: item.phone,
        status: encodeStatusField(item.kelas, item.status),
        dues_status: 'BELUM BAYAR',
        paid_at: encodePaidSessions([]),
        dues_amount: item.duesAmount,
      }));
      await (supabase as any).from('kgt_members').insert(dbPayload);
    } catch {
      // Saved in localStorage
    }

    return newItems.length;
  };

  const deleteMember = async (id: string) => {
    if (!canEdit) return;
    setMembersByAngkatan((prev) => {
      const updated = {
        ...prev,
        [activeAngkatan]: (prev[activeAngkatan] || []).filter((m) => m.id !== id),
      };
      localStorage.setItem('kgt_real_members_v3', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      await (supabase as any).from('kgt_members').delete().eq('id', id);
    } catch {
      // Deleted from localStorage
    }
  };

  // Tandai Lunas / Batalkan Lunas untuk Pertemuan tertentu (Otomatis tambah/hapus di Pemasukan Kas!)
  const toggleSessionDues = async (memberId: string, sessionId: string) => {
    if (!canEdit) return;
    const list = membersByAngkatan[activeAngkatan] || [];
    const target = list.find((item) => item.id === memberId);
    if (!target) return;

    const currentPaid = target.paidSessions || [];
    const isCurrentlyPaid = currentPaid.includes(sessionId);
    const nextPaid = isCurrentlyPaid
      ? currentPaid.filter((s) => s !== sessionId)
      : [...currentPaid, sessionId];

    const sessionObj = currentSessions.find((s) => s.id === sessionId);
    const sessionLabel = sessionObj ? sessionObj.label : sessionId;

    // Reference No unik untuk transaksi iuran siswa per pertemuan
    const linkedRefNo = `IUR-${activeAngkatan}-${target.memberCode}-${sessionId}`;

    // Update state member
    setMembersByAngkatan((prev) => {
      const updatedList = (prev[activeAngkatan] || []).map((item) =>
        item.id === memberId
          ? {
              ...item,
              paidSessions: nextPaid,
              paidAt: encodePaidSessions(nextPaid),
              duesStatus: (nextPaid.includes(activeSessionId)
                ? 'LUNAS'
                : 'BELUM BAYAR') as 'LUNAS' | 'BELUM BAYAR',
            }
          : item
      );
      const updated = { ...prev, [activeAngkatan]: updatedList };
      localStorage.setItem('kgt_real_members_v3', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      await (supabase as any)
        .from('kgt_members')
        .update({
          dues_status: nextPaid.length > 0 ? 'LUNAS' : 'BELUM BAYAR',
          paid_at: encodePaidSessions(nextPaid),
        })
        .eq('id', memberId);
    } catch {
      // Updated in localStorage
    }

    if (!isCurrentlyPaid) {
      // Ditandai LUNAS -> Otomatis tambah ke Pemasukan Kas
      await addTransaction({
        customRefNo: linkedRefNo,
        type: 'pemasukan',
        category: 'Iuran Pertemuan',
        description: `Iuran ${sessionLabel} - ${target.fullName} (${target.kelas})`,
        vendor: target.fullName,
        amount: duesNominal,
        paymentMethod: 'Tunai Kas',
        transactionDate: new Date().toISOString().slice(0, 10),
      });
    } else {
      // Dibatalkan LUNAS -> Otomatis hapus dari Pemasukan Kas!
      const matchingTx = (txByAngkatan[activeAngkatan] || []).find(
        (t) => t.referenceNo === linkedRefNo
      );

      setTxByAngkatan((prev) => {
        const updated = {
          ...prev,
          [activeAngkatan]: (prev[activeAngkatan] || []).filter(
            (t) => t.referenceNo !== linkedRefNo
          ),
        };
        localStorage.setItem('kgt_real_tx_v3', JSON.stringify(updated));
        return updated;
      });

      try {
        const supabase = createClient();
        if (matchingTx) {
          await (supabase as any)
            .from('kgt_transactions')
            .delete()
            .eq('id', matchingTx.id);
        } else {
          await (supabase as any)
            .from('kgt_transactions')
            .delete()
            .eq('reference_no', linkedRefNo);
        }
      } catch {
        // Deleted from localStorage
      }
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
        waTemplate,
        setWaTemplate,
        sessions: currentSessions,
        activeSessionId,
        setActiveSessionId,
        addCustomSession,
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
        importMembersBulk,
        deleteMember,
        toggleSessionDues,
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
