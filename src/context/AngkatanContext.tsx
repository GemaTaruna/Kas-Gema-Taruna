'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export type AngkatanId = '16' | '17' | '18' | '19' | '20' | '21';
export type AppRole = 'superadmin' | 'admin_angkatan' | 'siswa';
export type CloudSyncStatus = 'checking' | 'connected' | 'table_missing';

export const SECTION_OPTIONS: Record<string, string[]> = {
  'BRASS': ['Terompet', 'Bariton'],
  'PERCUSSION': ['Bass Drum', 'Snare Drum', 'Tenor', 'Simbal'],
  'PIT INSTRUMENT': ['Belira'],
  'COLOR GUARD': ['Bendera'],
  'LEADERSHIP': ['Field Commander', 'Stickmaster Taruna', 'Stickmaster Taruni'],
};

export const SECTION_NAMES = Object.keys(SECTION_OPTIONS);

export interface SessionInfo {
  id: string; // e.g. 'P1', 'P2', ...
  fullKey: string; // e.g. '2026-10:P1'
  label: string; // e.g. 'Pertemuan 1'
  date: string;
}

export interface ArrearItem {
  fullKey: string; // e.g. '2026-09:P2'
  monthKey: string; // e.g. '2026-09'
  monthLabel: string; // e.g. 'September 2026'
  monthShort: string; // e.g. 'Sep'
  sessionId: string; // e.g. 'P2'
  shortLabel: string; // e.g. 'Sep-P2'
}

export const INDONESIAN_MONTHS = [
  { num: '01', name: 'Januari', short: 'Jan' },
  { num: '02', name: 'Februari', short: 'Feb' },
  { num: '03', name: 'Maret', short: 'Mar' },
  { num: '04', name: 'April', short: 'Apr' },
  { num: '05', name: 'Mei', short: 'Mei' },
  { num: '06', name: 'Juni', short: 'Jun' },
  { num: '07', name: 'Juli', short: 'Jul' },
  { num: '08', name: 'Agustus', short: 'Agu' },
  { num: '09', name: 'September', short: 'Sep' },
  { num: '10', name: 'Oktober', short: 'Okt' },
  { num: '11', name: 'November', short: 'Nov' },
  { num: '12', name: 'Desember', short: 'Des' },
];

export function formatMonthLabel(monthKey: string): string {
  const [year, month] = (monthKey || '').split('-');
  const m = INDONESIAN_MONTHS.find((item) => item.num === month);
  if (!m) return monthKey;
  return `${m.name} ${year}`;
}

export function formatMonthShort(monthKey: string): string {
  const [year, month] = (monthKey || '').split('-');
  const m = INDONESIAN_MONTHS.find((item) => item.num === month);
  if (!m) return monthKey;
  return `${m.short} ${year?.slice(2) || ''}`.trim();
}

export function buildSessionKey(monthKey: string, sessionId: string): string {
  if (sessionId.includes(':')) return sessionId;
  return `${monthKey}:${sessionId}`;
}

export function parseSessionKey(
  fullKey: string,
  fallbackMonth: string
): { monthKey: string; sessionId: string } {
  if (fullKey.includes(':')) {
    const [monthKey, sessionId] = fullKey.split(':');
    return { monthKey, sessionId };
  }
  return { monthKey: fallbackMonth, sessionId: fullKey };
}

export function generateSessionsForMonth(monthKey: string, count: number): SessionInfo[] {
  const safeCount = Math.max(1, Math.min(24, count || 8));
  return Array.from({ length: safeCount }, (_, idx) => {
    const num = idx + 1;
    const id = `P${num}`;
    const week = Math.ceil(num / 2);
    const sesi = num % 2 === 1 ? 1 : 2;
    return {
      id,
      fullKey: `${monthKey}:${id}`,
      label: `Pertemuan ${num} (Minggu ${week} - Latihan ${sesi})`,
      date: '',
    };
  });
}

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
  paidSessions: string[]; // Pertemuan lunas di bulan aktif, misal ['P1', 'P2']
  allPaidKeys: string[]; // Seluruh key lintas bulan, misal ['2026-09:P1', '2026-10:P1']
  paidSessionDates: Record<string, string>; // Map '2026-10:P1' -> '2026-10-06'
  arrears: ArrearItem[]; // Daftar tunggakan dari bulan-bulan sebelumnya
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

const EMPTY_MONTH_COUNTS_BY_ANGKATAN: Record<AngkatanId, Record<string, number>> = {
  '16': {},
  '17': {},
  '18': {},
  '19': {},
  '20': {},
  '21': {},
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

export function isValidUUID(str: string | null | undefined): boolean {
  if (!str) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID();
    } catch {
      // fallback
    }
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function ensureUUID(id?: string | null): string {
  if (id && isValidUUID(id)) return id;
  return generateUUID();
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

function encodePaidData(
  allPaidKeys: string[],
  paidSessionDates: Record<string, string>
): string {
  return JSON.stringify({
    s: allPaidKeys || [],
    d: paidSessionDates || {},
  });
}

function decodePaidData(
  raw: string | null | undefined,
  fallbackMonth: string
): {
  allPaidKeys: string[];
  paidSessionDates: Record<string, string>;
} {
  if (!raw || raw === '-') {
    return { allPaidKeys: [], paidSessionDates: {} };
  }
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const normalized = parsed.map((k: string) =>
        k.includes(':') ? k : `${fallbackMonth}:${k}`
      );
      return { allPaidKeys: normalized, paidSessionDates: {} };
    }
    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.s)) {
      const normalized = parsed.s.map((k: string) =>
        k.includes(':') ? k : `${fallbackMonth}:${k}`
      );
      const dates: Record<string, string> = {};
      if (parsed.d && typeof parsed.d === 'object') {
        Object.entries(parsed.d).forEach(([k, v]) => {
          const normKey = k.includes(':') ? k : `${fallbackMonth}:${k}`;
          if (typeof v === 'string') dates[normKey] = v;
        });
      }
      return { allPaidKeys: normalized, paidSessionDates: dates };
    }
  } catch {
    if (raw.startsWith('P')) {
      const normalized = raw
        .split(',')
        .map((s) => `${fallbackMonth}:${s.trim()}`);
      return { allPaidKeys: normalized, paidSessionDates: {} };
    }
  }
  return { allPaidKeys: [], paidSessionDates: {} };
}

interface AngkatanContextValue {
  role: AppRole;
  username: string;
  displayName: string;
  lockedAngkatan: AngkatanId | null;
  activeAngkatan: AngkatanId;
  canEdit: boolean;
  cloudStatus: CloudSyncStatus;
  syncLocalToCloud: () => Promise<{ ok: boolean; message: string }>;
  refreshFromCloud: () => Promise<void>;
  duesNominal: number; // Default Rp 5.000 per pertemuan
  setDuesNominal: (val: number) => void;
  waTemplate: string;
  setWaTemplate: (val: string) => void;
  activeMonth: string; // 'YYYY-MM', e.g. '2026-10'
  setActiveMonth: (monthKey: string) => void;
  activePaymentDate: string; // 'YYYY-MM-DD', tanggal uang diterima bendahara
  setActivePaymentDate: (dateStr: string) => void;
  monthlySessionCount: number; // Jumlah latihan di bulan aktif (default 8)
  setMonthlySessionCount: (count: number, targetMonth?: string) => Promise<void>;
  sessions: SessionInfo[];
  activeSessionId: string; // 'P1', 'P2', ...
  setActiveSessionId: (id: string) => void;
  addCustomSession: (label?: string, date?: string) => Promise<void>;
  removeLastSession: () => Promise<void>;
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
  updateTransaction: (
    id: string,
    data: {
      category?: string;
      description?: string;
      vendor?: string;
      amount?: number;
      paymentMethod?: string;
      transactionDate?: string;
      type?: 'pemasukan' | 'pengeluaran';
    }
  ) => Promise<void>;
  addMember: (
    m: Omit<
      MemberItem,
      | 'id'
      | 'angkatan'
      | 'paidSessions'
      | 'allPaidKeys'
      | 'paidSessionDates'
      | 'arrears'
      | 'duesStatus'
      | 'paidAt'
    >
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
  updateMember: (
    id: string,
    data: {
      fullName: string;
      kelas: string;
      section: string;
      instrument: string;
      phone: string;
    }
  ) => Promise<void>;
  deleteAllMembers: () => Promise<void>;
  toggleSessionDues: (
    memberId: string,
    sessionIdOrFullKey: string,
    customPaymentDate?: string
  ) => Promise<void>;
  payMultipleSessionsDues: (
    memberId: string,
    fullKeys: string[],
    customPaymentDate?: string
  ) => Promise<void>;
  clearMemberMonthDues: (memberId: string) => Promise<void>;
  markAllMembersSessionDues: (
    sessionIdOrAll: string,
    targetMemberIds?: string[]
  ) => Promise<void>;
  clearAllMembersSessionDues: (
    sessionIdOrAll: string,
    targetMemberIds?: string[]
  ) => Promise<void>;
}

const AngkatanContext = createContext<AngkatanContextValue | null>(null);

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function AngkatanProvider({ children }: { children: React.ReactNode }) {
  const defaultToday = new Date().toISOString().slice(0, 10);
  const defaultMonth = defaultToday.slice(0, 7);

  const [role, setRole] = useState<AppRole>('superadmin');
  const [username, setUsername] = useState<string>('Gema Taruna');
  const [displayName, setDisplayName] = useState<string>('Super Admin (Pembina)');
  const [lockedAngkatan, setLockedAngkatan] = useState<AngkatanId | null>(null);
  const [activeAngkatan, setActiveAngkatanState] = useState<AngkatanId>('16');
  const [cloudStatus, setCloudStatus] = useState<CloudSyncStatus>('checking');
  const [duesNominal, setDuesNominalState] = useState<number>(5000);
  const [waTemplate, setWaTemplateState] = useState<string>(DEFAULT_WA_TEMPLATE);

  const [activeMonth, setActiveMonthState] = useState<string>(defaultMonth);
  const [activePaymentDate, setActivePaymentDateState] = useState<string>(defaultToday);
  const [monthCountsByAngkatan, setMonthCountsByAngkatan] = useState<
    Record<AngkatanId, Record<string, number>>
  >(EMPTY_MONTH_COUNTS_BY_ANGKATAN);
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

    let localMembersSnapshot: Record<AngkatanId, MemberItem[]> = EMPTY_MEMBERS_BY_ANGKATAN;
    let localTxSnapshot: Record<AngkatanId, TransactionItem[]> = EMPTY_TRANSACTIONS_BY_ANGKATAN;

    try {
      const storedMembers =
        localStorage.getItem('kgt_real_members_v4') ||
        localStorage.getItem('kgt_real_members_v3');
      if (storedMembers) {
        const parsed = JSON.parse(storedMembers);
        // Normalisasi jika dari v3
        ANGKATAN_LIST.forEach((a) => {
          parsed[a] = (parsed[a] || []).map((m: any) => {
            const decoded = decodePaidData(m.paidAt, defaultMonth);
            const fallbackKeys =
              decoded.allPaidKeys.length > 0
                ? decoded.allPaidKeys
                : (m.allPaidKeys || m.paidSessions || []).map((k: string) =>
                    k.includes(':') ? k : `${defaultMonth}:${k}`
                  );
            return {
              ...m,
              allPaidKeys: fallbackKeys,
              paidSessionDates: m.paidSessionDates || decoded.paidSessionDates || {},
            };
          });
        });
        localMembersSnapshot = parsed;
        setMembersByAngkatan(parsed);
      }
      const storedTx =
        localStorage.getItem('kgt_real_tx_v4') ||
        localStorage.getItem('kgt_real_tx_v3');
      if (storedTx) {
        localTxSnapshot = JSON.parse(storedTx);
        setTxByAngkatan(localTxSnapshot);
      }
      const storedNominal =
        localStorage.getItem('kgt_dues_nominal_v4') ||
        localStorage.getItem('kgt_dues_nominal_v3');
      if (storedNominal) {
        setDuesNominalState(Number(storedNominal) || 5000);
      }
      const storedWa =
        localStorage.getItem('kgt_wa_template_v4') ||
        localStorage.getItem('kgt_wa_template_v3');
      if (storedWa) {
        setWaTemplateState(storedWa);
      }
      const storedMonthCounts = localStorage.getItem('kgt_month_counts_v4');
      if (storedMonthCounts) {
        setMonthCountsByAngkatan(JSON.parse(storedMonthCounts));
      }
    } catch {
      // ignore
    }

    const fetchAndSyncSupabaseData = async () => {
      try {
        const supabase = createClient();
        const { data: dbMembers, error: errMembers } = await (supabase as any)
          .from('kgt_members')
          .select('*')
          .order('created_at', { ascending: true });

        if (errMembers) {
          if (errMembers.code === 'PGRST205' || errMembers.status === 404) {
            setCloudStatus('table_missing');
          }
          return;
        }

        setCloudStatus('connected');

        if (dbMembers) {
          const grouped: Record<AngkatanId, MemberItem[]> = {
            '16': [],
            '17': [],
            '18': [],
            '19': [],
            '20': [],
            '21': [],
          };
          const loadedCounts: Record<AngkatanId, Record<string, number>> = {
            '16': {},
            '17': {},
            '18': {},
            '19': {},
            '20': {},
            '21': {},
          };

          for (const a of ANGKATAN_LIST) {
            const rawList = dbMembers.filter((m: any) => m.angkatan === a);
            const configRow = rawList.find((m: any) => m.member_code === '__CONFIG__');
            if (configRow && configRow.paid_at) {
              try {
                const parsedCfg = JSON.parse(configRow.paid_at);
                if (parsedCfg && typeof parsedCfg.monthCounts === 'object') {
                  loadedCounts[a] = parsedCfg.monthCounts;
                }
              } catch {
                // ignore
              }
            }

            const list = rawList.filter((m: any) => m.member_code !== '__CONFIG__');
            const localList = localMembersSnapshot[a] || [];

            // Jika di Cloud kosong atau data di perangkat ini LEBIH BANYAK (misal HP ada 90 siswa, di Cloud cuma 0 atau 77 dummy),
            // utamakan data lokal yang lebih lengkap dan otomatis sinkronkan ke Supabase Cloud!
            if (localList.length > list.length) {
              const updatedLocalList = localList.map((item) => ({
                ...item,
                id: ensureUUID(item.id),
              }));
              grouped[a] = updatedLocalList;
              try {
                const dbPayload = updatedLocalList.map((item) => ({
                  id: item.id,
                  angkatan: a,
                  member_code: item.memberCode,
                  full_name: item.fullName,
                  section: item.section,
                  instrument: item.instrument,
                  phone: item.phone,
                  status: encodeStatusField(item.kelas, item.status),
                  dues_status: (item.allPaidKeys || []).length > 0 ? 'LUNAS' : 'BELUM BAYAR',
                  paid_at: encodePaidData(item.allPaidKeys || [], item.paidSessionDates || {}),
                  dues_amount: item.duesAmount || 5000,
                }));
                await (supabase as any).from('kgt_members').upsert(dbPayload);
              } catch {
                // saved locally
              }
            } else if (list.length > 0) {
              grouped[a] = list.map((m: any) => {
                const { kelas, status } = decodeStatusField(m.status);
                const { allPaidKeys, paidSessionDates } = decodePaidData(
                  m.paid_at,
                  defaultMonth
                );
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
                  duesStatus: 'BELUM BAYAR',
                  paidAt: m.paid_at || '[]',
                  paidSessions: [],
                  allPaidKeys,
                  paidSessionDates,
                  arrears: [],
                  duesAmount: Number(m.dues_amount || 5000),
                };
              });
            }
          }

          setMembersByAngkatan(grouped);
          localStorage.setItem('kgt_real_members_v4', JSON.stringify(grouped));

          setMonthCountsByAngkatan((prev) => {
            const merged: Record<AngkatanId, Record<string, number>> = { ...prev };
            ANGKATAN_LIST.forEach((a) => {
              merged[a] = { ...(prev[a] || {}), ...(loadedCounts[a] || {}) };
            });
            localStorage.setItem('kgt_month_counts_v4', JSON.stringify(merged));
            return merged;
          });
        }

        const { data: dbTx, error: errTx } = await (supabase as any)
          .from('kgt_transactions')
          .select('*')
          .order('created_at', { ascending: false });

        if (!errTx && dbTx) {
          const groupedTx: Record<AngkatanId, TransactionItem[]> = {
            '16': [],
            '17': [],
            '18': [],
            '19': [],
            '20': [],
            '21': [],
          };
          for (const a of ANGKATAN_LIST) {
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
                recordedBy: t.recorded_by || 'Admin',
                transactionDate: t.transaction_date,
              }));
            } else if ((localTxSnapshot[a] || []).length > 0) {
              groupedTx[a] = localTxSnapshot[a];
              const txPayload = localTxSnapshot[a].map((t) => ({
                id: t.id,
                angkatan: a,
                reference_no: t.referenceNo,
                type: t.type,
                category: t.category,
                description: t.description,
                vendor: t.vendor,
                amount: t.amount,
                payment_method: t.paymentMethod,
                recorded_by: t.recordedBy,
                transaction_date: t.transactionDate,
              }));
              await (supabase as any).from('kgt_transactions').upsert(txPayload);
            }
          }
          setTxByAngkatan(groupedTx);
          localStorage.setItem('kgt_real_tx_v4', JSON.stringify(groupedTx));
        }
      } catch {
        // Fallback to localStorage
      }
    };

    fetchAndSyncSupabaseData();
  }, [defaultMonth]);

  // Fungsi manual untuk memaksa sinkronisasi data lokal ke Supabase Cloud
  const syncLocalToCloud = async (): Promise<{ ok: boolean; message: string }> => {
    try {
      const supabase = createClient();
      const { error: checkErr } = await (supabase as any)
        .from('kgt_members')
        .select('id')
        .limit(1);

      if (checkErr) {
        setCloudStatus('table_missing');
        return {
          ok: false,
          message:
            'Tabel kgt_members & kgt_transactions belum dibuat di Supabase SQL Editor. Silakan jalankan SQL di bawah terlebih dahulu.',
        };
      }

      let totalMembersSynced = 0;
      let totalTxSynced = 0;

      for (const a of ANGKATAN_LIST) {
        const mList = membersByAngkatan[a] || [];
        if (mList.length > 0) {
          const updatedMList = mList.map((item) => ({
            ...item,
            id: ensureUUID(item.id),
          }));
          const dbPayload = updatedMList.map((item) => ({
            id: item.id,
            angkatan: a,
            member_code: item.memberCode,
            full_name: item.fullName,
            section: item.section,
            instrument: item.instrument,
            phone: item.phone,
            status: encodeStatusField(item.kelas, item.status),
            dues_status: (item.allPaidKeys || []).length > 0 ? 'LUNAS' : 'BELUM BAYAR',
            paid_at: encodePaidData(item.allPaidKeys || [], item.paidSessionDates || {}),
            dues_amount: item.duesAmount || 5000,
          }));
          await (supabase as any).from('kgt_members').upsert(dbPayload);
          totalMembersSynced += mList.length;
        }

        const tList = txByAngkatan[a] || [];
        if (tList.length > 0) {
          const updatedTList = tList.map((t) => ({
            ...t,
            id: ensureUUID(t.id),
          }));
          const txPayload = updatedTList.map((t) => ({
            id: t.id,
            angkatan: a,
            reference_no: t.referenceNo,
            type: t.type,
            category: t.category,
            description: t.description,
            vendor: t.vendor,
            amount: t.amount,
            payment_method: t.paymentMethod,
            recorded_by: t.recordedBy,
            transaction_date: t.transactionDate,
          }));
          await (supabase as any).from('kgt_transactions').upsert(txPayload);
          totalTxSynced += tList.length;
        }
      }

      setCloudStatus('connected');
      return {
        ok: true,
        message: `Berhasil menyinkronkan ${totalMembersSynced} siswa dan ${totalTxSynced} transaksi ke Cloud Supabase! Data kini dapat diakses di semua perangkat.`,
      };
    } catch {
      return {
        ok: false,
        message: 'Gagal menghubungi server Supabase. Periksa koneksi internet Anda.',
      };
    }
  };

  const refreshFromCloud = async () => {
    try {
      const supabase = createClient();
      const { data: dbMembers, error: errMembers } = await (supabase as any)
        .from('kgt_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (errMembers) {
        if (errMembers.code === 'PGRST205' || errMembers.status === 404) {
          setCloudStatus('table_missing');
        }
        return;
      }

      setCloudStatus('connected');

      if (dbMembers) {
        const grouped: Record<AngkatanId, MemberItem[]> = {
          '16': [],
          '17': [],
          '18': [],
          '19': [],
          '20': [],
          '21': [],
        };
        const loadedCounts: Record<AngkatanId, Record<string, number>> = {
          '16': {},
          '17': {},
          '18': {},
          '19': {},
          '20': {},
          '21': {},
        };

        for (const a of ANGKATAN_LIST) {
          const rawList = dbMembers.filter((m: any) => m.angkatan === a);
          const configRow = rawList.find((m: any) => m.member_code === '__CONFIG__');
          if (configRow && configRow.paid_at) {
            try {
              const parsedCfg = JSON.parse(configRow.paid_at);
              if (parsedCfg && typeof parsedCfg.monthCounts === 'object') {
                loadedCounts[a] = parsedCfg.monthCounts;
              }
            } catch {
              // ignore
            }
          }

          const list = rawList.filter((m: any) => m.member_code !== '__CONFIG__');
          if (list.length > 0) {
            grouped[a] = list.map((m: any) => {
              const { kelas, status } = decodeStatusField(m.status);
              const { allPaidKeys, paidSessionDates } = decodePaidData(
                m.paid_at,
                defaultMonth
              );
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
                duesStatus: 'BELUM BAYAR',
                paidAt: m.paid_at || '[]',
                paidSessions: [],
                allPaidKeys,
                paidSessionDates,
                arrears: [],
                duesAmount: Number(m.dues_amount || 5000),
              };
            });
          }
        }

        setMembersByAngkatan(grouped);
        localStorage.setItem('kgt_real_members_v4', JSON.stringify(grouped));

        setMonthCountsByAngkatan((prev) => {
          const merged: Record<AngkatanId, Record<string, number>> = { ...prev };
          ANGKATAN_LIST.forEach((a) => {
            merged[a] = { ...(prev[a] || {}), ...(loadedCounts[a] || {}) };
          });
          localStorage.setItem('kgt_month_counts_v4', JSON.stringify(merged));
          return merged;
        });
      }

      const { data: dbTx, error: errTx } = await (supabase as any)
        .from('kgt_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!errTx && dbTx) {
        const groupedTx: Record<AngkatanId, TransactionItem[]> = {
          '16': [],
          '17': [],
          '18': [],
          '19': [],
          '20': [],
          '21': [],
        };
        for (const a of ANGKATAN_LIST) {
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
        }
        setTxByAngkatan(groupedTx);
        localStorage.setItem('kgt_real_tx_v4', JSON.stringify(groupedTx));
      }
    } catch {
      // ignore
    }
  };

  const setDuesNominal = (val: number) => {
    setDuesNominalState(val);
    try {
      localStorage.setItem('kgt_dues_nominal_v4', String(val));
    } catch {
      // ignore
    }
  };

  const setWaTemplate = (val: string) => {
    setWaTemplateState(val);
    try {
      localStorage.setItem('kgt_wa_template_v4', val);
    } catch {
      // ignore
    }
  };

  const setActiveMonth = (monthKey: string) => {
    setActiveMonthState(monthKey);
    const countForMonth = monthCountsByAngkatan[activeAngkatan]?.[monthKey] || 8;
    const currentNum = Number(activeSessionId.replace('P', '')) || 1;
    if (currentNum > countForMonth) {
      setActiveSessionId('P1');
    }
  };

  const setActivePaymentDate = (dateStr: string) => {
    if (!dateStr) return;
    setActivePaymentDateState(dateStr);
  };

  const setMonthlySessionCount = async (count: number, targetMonth?: string) => {
    if (!canEdit) return;
    const safeCount = Math.max(1, Math.min(24, count || 8));
    const mKey = targetMonth || activeMonth;

    const updatedForAngkatan = {
      ...(monthCountsByAngkatan[activeAngkatan] || {}),
      [mKey]: safeCount,
    };
    const updatedAll = {
      ...monthCountsByAngkatan,
      [activeAngkatan]: updatedForAngkatan,
    };

    setMonthCountsByAngkatan(updatedAll);
    try {
      localStorage.setItem('kgt_month_counts_v4', JSON.stringify(updatedAll));
    } catch {
      // ignore
    }

    const currentNum = Number(activeSessionId.replace('P', '')) || 1;
    if (currentNum > safeCount) {
      setActiveSessionId(`P${safeCount}`);
    }

    try {
      const supabase = createClient();
      const configPayload = JSON.stringify({ monthCounts: updatedForAngkatan });
      const { data: existingCfg } = await (supabase as any)
        .from('kgt_members')
        .select('id')
        .eq('angkatan', activeAngkatan)
        .eq('member_code', '__CONFIG__')
        .maybeSingle();

      if (existingCfg?.id) {
        await (supabase as any)
          .from('kgt_members')
          .update({ paid_at: configPayload })
          .eq('id', existingCfg.id);
      } else {
        const cfgId =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `cfg-${activeAngkatan}-${Date.now()}`;
        await (supabase as any).from('kgt_members').insert({
          id: cfgId,
          angkatan: activeAngkatan,
          member_code: '__CONFIG__',
          full_name: 'CONFIG_ANGKATAN',
          section: 'SYSTEM',
          instrument: 'SYSTEM',
          phone: '-',
          status: 'SYSTEM',
          dues_status: 'LUNAS',
          paid_at: configPayload,
          dues_amount: duesNominal,
        });
      }
    } catch {
      // Tersimpan di localStorage
    }
  };

  const monthlySessionCount =
    monthCountsByAngkatan[activeAngkatan]?.[activeMonth] || 8;

  const currentSessions = generateSessionsForMonth(activeMonth, monthlySessionCount);

  const addCustomSession = async () => {
    const nextCount = monthlySessionCount + 1;
    await setMonthlySessionCount(nextCount, activeMonth);
    setActiveSessionId(`P${nextCount}`);
  };

  const removeLastSession = async () => {
    if (monthlySessionCount <= 1) return;
    const nextCount = monthlySessionCount - 1;
    await setMonthlySessionCount(nextCount, activeMonth);
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

  const rawMembers = membersByAngkatan[activeAngkatan] || [];

  // Hitung pertemuan mana saja di bulan-bulan sebelum activeMonth yang sudah terlaksana
  const heldPastSessionKeys = React.useMemo(() => {
    const set = new Set<string>();
    rawMembers.forEach((m) => {
      (m.allPaidKeys || []).forEach((fullKey) => {
        const { monthKey, sessionId } = parseSessionKey(fullKey, activeMonth);
        if (monthKey < activeMonth) {
          const maxCount = monthCountsByAngkatan[activeAngkatan]?.[monthKey] || 8;
          const sNum = Number(sessionId.replace('P', '')) || 1;
          if (sNum <= maxCount) {
            set.add(`${monthKey}:${sessionId}`);
          }
        }
      });
    });
    return Array.from(set).sort((a, b) => {
      const pa = parseSessionKey(a, activeMonth);
      const pb = parseSessionKey(b, activeMonth);
      if (pa.monthKey !== pb.monthKey) return pa.monthKey.localeCompare(pb.monthKey);
      const na = Number(pa.sessionId.replace('P', '')) || 0;
      const nb = Number(pb.sessionId.replace('P', '')) || 0;
      return na - nb;
    });
  }, [rawMembers, activeMonth, activeAngkatan, monthCountsByAngkatan]);

  const currentMembers: MemberItem[] = rawMembers.map((m) => {
    const allKeys = m.allPaidKeys || [];
    const monthPrefix = `${activeMonth}:`;
    const paidInActiveMonth = allKeys
      .filter((k) => k.startsWith(monthPrefix))
      .map((k) => k.slice(monthPrefix.length));

    const memberArrears: ArrearItem[] = heldPastSessionKeys
      .filter((pastKey) => !allKeys.includes(pastKey))
      .map((pastKey) => {
        const { monthKey, sessionId } = parseSessionKey(pastKey, activeMonth);
        const mShort = formatMonthShort(monthKey);
        return {
          fullKey: pastKey,
          monthKey,
          monthLabel: formatMonthLabel(monthKey),
          monthShort: mShort,
          sessionId,
          shortLabel: `${mShort}-${sessionId}`,
        };
      });

    return {
      ...m,
      paidSessions: paidInActiveMonth,
      arrears: memberArrears,
      duesStatus: paidInActiveMonth.includes(activeSessionId)
        ? 'LUNAS'
        : 'BELUM BAYAR',
    };
  });

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
    const newId = generateUUID();

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
      localStorage.setItem('kgt_real_tx_v4', JSON.stringify(updated));
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
      localStorage.setItem('kgt_real_tx_v4', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      await (supabase as any).from('kgt_transactions').delete().eq('id', id);
    } catch {
      // Deleted from localStorage
    }
  };

  const updateTransaction = async (
    id: string,
    data: {
      category?: string;
      description?: string;
      vendor?: string;
      amount?: number;
      paymentMethod?: string;
      transactionDate?: string;
      type?: 'pemasukan' | 'pengeluaran';
    }
  ) => {
    if (!canEdit) return;
    setTxByAngkatan((prev) => {
      const updatedList = (prev[activeAngkatan] || []).map((t) => {
        if (t.id !== id) return t;
        return {
          ...t,
          category: data.category !== undefined ? data.category : t.category,
          description: data.description !== undefined ? data.description : t.description,
          vendor: data.vendor !== undefined ? data.vendor : t.vendor,
          amount: data.amount !== undefined ? Number(data.amount) : t.amount,
          paymentMethod: data.paymentMethod !== undefined ? data.paymentMethod : t.paymentMethod,
          transactionDate: data.transactionDate !== undefined ? data.transactionDate : t.transactionDate,
          type: data.type !== undefined ? data.type : t.type,
        };
      });
      const updated = {
        ...prev,
        [activeAngkatan]: updatedList,
      };
      localStorage.setItem('kgt_real_tx_v4', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      const payload: Record<string, any> = {};
      if (data.category !== undefined) payload.category = data.category;
      if (data.description !== undefined) payload.description = data.description;
      if (data.vendor !== undefined) payload.vendor = data.vendor;
      if (data.amount !== undefined) payload.amount = Number(data.amount);
      if (data.paymentMethod !== undefined) payload.payment_method = data.paymentMethod;
      if (data.transactionDate !== undefined) payload.transaction_date = data.transactionDate;
      if (data.type !== undefined) payload.type = data.type;

      await (supabase as any)
        .from('kgt_transactions')
        .update(payload)
        .eq('id', id);
    } catch {
      // Updated in localStorage
    }
  };

  const addMember = async (
    m: Omit<
      MemberItem,
      | 'id'
      | 'angkatan'
      | 'paidSessions'
      | 'allPaidKeys'
      | 'paidSessionDates'
      | 'arrears'
      | 'duesStatus'
      | 'paidAt'
    >
  ) => {
    if (!canEdit) return;
    const newId = generateUUID();

    const initialPaidAt = encodePaidData([], {});

    const newMember: MemberItem = {
      ...m,
      id: newId,
      angkatan: activeAngkatan,
      duesStatus: 'BELUM BAYAR',
      paidAt: initialPaidAt,
      paidSessions: [],
      allPaidKeys: [],
      paidSessionDates: {},
      arrears: [],
    };

    setMembersByAngkatan((prev) => {
      const updated = {
        ...prev,
        [activeAngkatan]: [...(prev[activeAngkatan] || []), newMember],
      };
      localStorage.setItem('kgt_real_members_v4', JSON.stringify(updated));
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
        paid_at: initialPaidAt,
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
    const initialPaidAt = encodePaidData([], {});

    const newItems: MemberItem[] = rows.map((r, idx) => {
      const seq = r.no?.trim() || String(existingCount + idx + 1).padStart(2, '0');
      const code = seq.toUpperCase().startsWith('MB')
        ? seq
        : `MB${activeAngkatan}-${seq.padStart(2, '0')}`;
      const newId = generateUUID();

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
        paidAt: initialPaidAt,
        paidSessions: [],
        allPaidKeys: [],
        paidSessionDates: {},
        arrears: [],
        duesAmount: duesNominal,
      };
    });

    setMembersByAngkatan((prev) => {
      const updated = {
        ...prev,
        [activeAngkatan]: [...(prev[activeAngkatan] || []), ...newItems],
      };
      localStorage.setItem('kgt_real_members_v4', JSON.stringify(updated));
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
        paid_at: initialPaidAt,
        dues_amount: item.duesAmount,
      }));
      await (supabase as any).from('kgt_members').upsert(dbPayload);
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
      localStorage.setItem('kgt_real_members_v4', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      await (supabase as any).from('kgt_members').delete().eq('id', id);
    } catch {
      // Deleted from localStorage
    }
  };

  const updateMember = async (
    id: string,
    data: {
      fullName: string;
      kelas: string;
      section: string;
      instrument: string;
      phone: string;
    }
  ) => {
    if (!canEdit) return;
    setMembersByAngkatan((prev) => {
      const updatedList = (prev[activeAngkatan] || []).map((m) => {
        if (m.id !== id) return m;
        return {
          ...m,
          fullName: data.fullName.trim(),
          kelas: data.kelas.trim() || '-',
          section: data.section,
          instrument: data.instrument.trim() || '-',
          phone: data.phone.trim() || '-',
        };
      });
      const updated = {
        ...prev,
        [activeAngkatan]: updatedList,
      };
      localStorage.setItem('kgt_real_members_v4', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      await (supabase as any)
        .from('kgt_members')
        .update({
          full_name: data.fullName.trim(),
          status: encodeStatusField(data.kelas.trim() || '-', 'Aktif'),
          section: data.section,
          instrument: data.instrument.trim() || '-',
          phone: data.phone.trim() || '-',
        })
        .eq('id', id);
    } catch {
      // Updated in localStorage
    }
  };

  const deleteAllMembers = async () => {
    if (!canEdit) return;
    setMembersByAngkatan((prev) => {
      const updated = {
        ...prev,
        [activeAngkatan]: [],
      };
      localStorage.setItem('kgt_real_members_v4', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      await (supabase as any)
        .from('kgt_members')
        .delete()
        .eq('angkatan', activeAngkatan)
        .neq('member_code', '__CONFIG__');
    } catch {
      // Deleted locally
    }
  };

  // Sinkronisasi 1 Baris Rekap Pemasukan Kas Harian untuk Tanggal Penerimaan (targetDate)
  const syncDailyRecapTransaction = async (
    angkatan: AngkatanId,
    targetDate: string,
    updatedMembersList: MemberItem[]
  ) => {
    const recapRefNo = `REKAP-MB${angkatan}-${targetDate}`;

    let totalPaymentsCount = 0;
    const uniqueStudents = new Set<string>();
    const breakdownMap: Record<string, number> = {};

    updatedMembersList.forEach((m) => {
      const datesObj = m.paidSessionDates || {};
      (m.allPaidKeys || []).forEach((fullKey) => {
        const pDate = datesObj[fullKey];
        if (pDate === targetDate) {
          totalPaymentsCount += 1;
          uniqueStudents.add(m.id);
          const { monthKey, sessionId } = parseSessionKey(fullKey, activeMonth);
          const label = `${sessionId} ${formatMonthShort(monthKey)}`;
          breakdownMap[label] = (breakdownMap[label] || 0) + 1;
        }
      });
    });

    const totalRupiah = totalPaymentsCount * duesNominal;
    const breakdownStr = Object.entries(breakdownMap)
      .map(([lbl, cnt]) => `${cnt}x ${lbl}`)
      .join(', ');

    const existingList = txByAngkatan[angkatan] || [];
    const existingRecap = existingList.find((t) => t.referenceNo === recapRefNo);

    if (totalPaymentsCount === 0) {
      setTxByAngkatan((prev) => {
        const updated = {
          ...prev,
          [angkatan]: (prev[angkatan] || []).filter(
            (t) => t.referenceNo !== recapRefNo
          ),
        };
        localStorage.setItem('kgt_real_tx_v4', JSON.stringify(updated));
        return updated;
      });

      try {
        const supabase = createClient();
        await (supabase as any)
          .from('kgt_transactions')
          .delete()
          .eq('angkatan', angkatan)
          .eq('reference_no', recapRefNo);
      } catch {
        // Deleted locally
      }
      return;
    }

    const descriptionText = `Rekap Iuran Siswa (${totalPaymentsCount} pembayaran: ${breakdownStr})`;
    const vendorText = `${uniqueStudents.size} Siswa MB${angkatan}`;

    if (existingRecap) {
      const updatedTx: TransactionItem = {
        ...existingRecap,
        description: descriptionText,
        vendor: vendorText,
        amount: totalRupiah,
        recordedBy: username,
        transactionDate: targetDate,
      };

      setTxByAngkatan((prev) => {
        const updated = {
          ...prev,
          [angkatan]: (prev[angkatan] || []).map((t) =>
            t.referenceNo === recapRefNo ? updatedTx : t
          ),
        };
        localStorage.setItem('kgt_real_tx_v4', JSON.stringify(updated));
        return updated;
      });

      try {
        const supabase = createClient();
        await (supabase as any)
          .from('kgt_transactions')
          .update({
            description: descriptionText,
            vendor: vendorText,
            amount: totalRupiah,
            recorded_by: username,
            transaction_date: targetDate,
          })
          .eq('id', existingRecap.id);
      } catch {
        // Updated locally
      }
    } else {
      const newId = generateUUID();

      const newTx: TransactionItem = {
        id: newId,
        angkatan,
        referenceNo: recapRefNo,
        type: 'pemasukan',
        category: 'Iuran Anggota',
        description: descriptionText,
        vendor: vendorText,
        amount: totalRupiah,
        paymentMethod: 'Tunai Kas',
        recordedBy: username,
        transactionDate: targetDate,
      };

      setTxByAngkatan((prev) => {
        const updated = {
          ...prev,
          [angkatan]: [newTx, ...(prev[angkatan] || [])],
        };
        localStorage.setItem('kgt_real_tx_v4', JSON.stringify(updated));
        return updated;
      });

      try {
        const supabase = createClient();
        await (supabase as any).from('kgt_transactions').insert({
          id: newId,
          angkatan,
          reference_no: recapRefNo,
          type: 'pemasukan',
          category: 'Iuran Anggota',
          description: descriptionText,
          vendor: vendorText,
          amount: totalRupiah,
          payment_method: 'Tunai Kas',
          recorded_by: username,
          transaction_date: targetDate,
        });
      } catch {
        // Inserted locally
      }
    }
  };

  const toggleSessionDues = async (
    memberId: string,
    sessionIdOrFullKey: string,
    customPaymentDate?: string
  ) => {
    if (!canEdit) return;
    const list = membersByAngkatan[activeAngkatan] || [];
    const target = list.find((item) => item.id === memberId);
    if (!target) return;

    const fullKey = buildSessionKey(activeMonth, sessionIdOrFullKey);
    const payDate = customPaymentDate || activePaymentDate;

    const currentAllKeys = target.allPaidKeys || [];
    const currentDates = { ...(target.paidSessionDates || {}) };
    const isCurrentlyPaid = currentAllKeys.includes(fullKey);

    let nextAllKeys: string[];
    let dateToSync = payDate;

    if (isCurrentlyPaid) {
      dateToSync = currentDates[fullKey] || payDate;
      nextAllKeys = currentAllKeys.filter((k) => k !== fullKey);
      delete currentDates[fullKey];
    } else {
      nextAllKeys = [...currentAllKeys, fullKey];
      currentDates[fullKey] = payDate;
    }

    const encodedPaidAt = encodePaidData(nextAllKeys, currentDates);

    const updatedMembersList = list.map((item) =>
      item.id === memberId
        ? {
            ...item,
            allPaidKeys: nextAllKeys,
            paidSessionDates: currentDates,
            paidAt: encodedPaidAt,
          }
        : item
    );

    setMembersByAngkatan((prev) => {
      const updated = { ...prev, [activeAngkatan]: updatedMembersList };
      localStorage.setItem('kgt_real_members_v4', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      await (supabase as any)
        .from('kgt_members')
        .update({
          dues_status: nextAllKeys.length > 0 ? 'LUNAS' : 'BELUM BAYAR',
          paid_at: encodedPaidAt,
        })
        .eq('id', memberId);
    } catch {
      // Updated in localStorage
    }

    await syncDailyRecapTransaction(activeAngkatan, dateToSync, updatedMembersList);
  };

  const payMultipleSessionsDues = async (
    memberId: string,
    fullKeys: string[],
    customPaymentDate?: string
  ) => {
    if (!canEdit || fullKeys.length === 0) return;
    const list = membersByAngkatan[activeAngkatan] || [];
    const target = list.find((item) => item.id === memberId);
    if (!target) return;

    const payDate = customPaymentDate || activePaymentDate;
    const currentAllKeys = new Set(target.allPaidKeys || []);
    const currentDates = { ...(target.paidSessionDates || {}) };

    fullKeys.forEach((rawKey) => {
      const fk = buildSessionKey(activeMonth, rawKey);
      if (!currentAllKeys.has(fk)) {
        currentAllKeys.add(fk);
        currentDates[fk] = payDate;
      }
    });

    const nextAllKeys = Array.from(currentAllKeys);
    const encodedPaidAt = encodePaidData(nextAllKeys, currentDates);

    const updatedMembersList = list.map((item) =>
      item.id === memberId
        ? {
            ...item,
            allPaidKeys: nextAllKeys,
            paidSessionDates: currentDates,
            paidAt: encodedPaidAt,
          }
        : item
    );

    setMembersByAngkatan((prev) => {
      const updated = { ...prev, [activeAngkatan]: updatedMembersList };
      localStorage.setItem('kgt_real_members_v4', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      await (supabase as any)
        .from('kgt_members')
        .update({
          dues_status: nextAllKeys.length > 0 ? 'LUNAS' : 'BELUM BAYAR',
          paid_at: encodedPaidAt,
        })
        .eq('id', memberId);
    } catch {
      // Updated locally
    }

    await syncDailyRecapTransaction(activeAngkatan, payDate, updatedMembersList);
  };

  // Hapus semua ceklis bulan aktif untuk 1 siswa
  const clearMemberMonthDues = async (memberId: string) => {
    if (!canEdit) return;
    const list = membersByAngkatan[activeAngkatan] || [];
    const target = list.find((item) => item.id === memberId);
    if (!target) return;

    const monthPrefix = `${activeMonth}:`;
    const affectedDates = new Set<string>();
    const currentDates = { ...(target.paidSessionDates || {}) };

    const nextAllKeys = (target.allPaidKeys || []).filter((k) => {
      if (k.startsWith(monthPrefix)) {
        affectedDates.add(currentDates[k] || activePaymentDate);
        delete currentDates[k];
        return false;
      }
      return true;
    });

    const encodedPaidAt = encodePaidData(nextAllKeys, currentDates);
    const updatedMembersList = list.map((item) =>
      item.id === memberId
        ? {
            ...item,
            allPaidKeys: nextAllKeys,
            paidSessionDates: currentDates,
            paidAt: encodedPaidAt,
          }
        : item
    );

    setMembersByAngkatan((prev) => {
      const updated = { ...prev, [activeAngkatan]: updatedMembersList };
      localStorage.setItem('kgt_real_members_v4', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      await (supabase as any)
        .from('kgt_members')
        .update({
          dues_status: nextAllKeys.length > 0 ? 'LUNAS' : 'BELUM BAYAR',
          paid_at: encodedPaidAt,
        })
        .eq('id', memberId);
    } catch {
      // Updated locally
    }

    for (const d of Array.from(affectedDates)) {
      await syncDailyRecapTransaction(activeAngkatan, d, updatedMembersList);
    }
  };

  // Ceklis Semua (Bayar Semua) untuk 1 Pertemuan (misal 'P1') atau 'ALL' (P1..PN)
  const markAllMembersSessionDues = async (
    sessionIdOrAll: string,
    targetMemberIds?: string[]
  ) => {
    if (!canEdit) return;
    const list = membersByAngkatan[activeAngkatan] || [];
    if (list.length === 0) return;

    const targetIdSet = targetMemberIds ? new Set(targetMemberIds) : null;
    const keysToMark =
      sessionIdOrAll === 'ALL'
        ? currentSessions.map((s) => `${activeMonth}:${s.id}`)
        : [`${activeMonth}:${sessionIdOrAll}`];

    const updatedMembersList = list.map((item) => {
      if (targetIdSet && !targetIdSet.has(item.id)) return item;
      const keySet = new Set(item.allPaidKeys || []);
      const datesObj = { ...(item.paidSessionDates || {}) };
      keysToMark.forEach((fk) => {
        if (!keySet.has(fk)) {
          keySet.add(fk);
          datesObj[fk] = activePaymentDate;
        }
      });
      const nextKeys = Array.from(keySet);
      return {
        ...item,
        allPaidKeys: nextKeys,
        paidSessionDates: datesObj,
        paidAt: encodePaidData(nextKeys, datesObj),
      };
    });

    setMembersByAngkatan((prev) => {
      const updated = { ...prev, [activeAngkatan]: updatedMembersList };
      localStorage.setItem('kgt_real_members_v4', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      const dbPayload = updatedMembersList.map((item) => ({
        id: item.id,
        angkatan: activeAngkatan,
        member_code: item.memberCode,
        full_name: item.fullName,
        section: item.section,
        instrument: item.instrument,
        phone: item.phone,
        status: encodeStatusField(item.kelas, item.status),
        dues_status: (item.allPaidKeys || []).length > 0 ? 'LUNAS' : 'BELUM BAYAR',
        paid_at: item.paidAt,
        dues_amount: item.duesAmount || 5000,
      }));
      await (supabase as any).from('kgt_members').upsert(dbPayload);
    } catch {
      // Updated locally
    }

    await syncDailyRecapTransaction(
      activeAngkatan,
      activePaymentDate,
      updatedMembersList
    );
  };

  // Hapus Semua Ceklis untuk 1 Pertemuan (misal 'P1') atau 'ALL' (P1..PN)
  const clearAllMembersSessionDues = async (
    sessionIdOrAll: string,
    targetMemberIds?: string[]
  ) => {
    if (!canEdit) return;
    const list = membersByAngkatan[activeAngkatan] || [];
    if (list.length === 0) return;

    const targetIdSet = targetMemberIds ? new Set(targetMemberIds) : null;
    const keysToRemove = new Set(
      sessionIdOrAll === 'ALL'
        ? currentSessions.map((s) => `${activeMonth}:${s.id}`)
        : [`${activeMonth}:${sessionIdOrAll}`]
    );

    const affectedDates = new Set<string>([activePaymentDate]);

    const updatedMembersList = list.map((item) => {
      if (targetIdSet && !targetIdSet.has(item.id)) return item;
      const datesObj = { ...(item.paidSessionDates || {}) };
      const nextKeys = (item.allPaidKeys || []).filter((fk) => {
        if (keysToRemove.has(fk)) {
          if (datesObj[fk]) affectedDates.add(datesObj[fk]);
          delete datesObj[fk];
          return false;
        }
        return true;
      });
      return {
        ...item,
        allPaidKeys: nextKeys,
        paidSessionDates: datesObj,
        paidAt: encodePaidData(nextKeys, datesObj),
      };
    });

    setMembersByAngkatan((prev) => {
      const updated = { ...prev, [activeAngkatan]: updatedMembersList };
      localStorage.setItem('kgt_real_members_v4', JSON.stringify(updated));
      return updated;
    });

    try {
      const supabase = createClient();
      const dbPayload = updatedMembersList.map((item) => ({
        id: item.id,
        angkatan: activeAngkatan,
        member_code: item.memberCode,
        full_name: item.fullName,
        section: item.section,
        instrument: item.instrument,
        phone: item.phone,
        status: encodeStatusField(item.kelas, item.status),
        dues_status: (item.allPaidKeys || []).length > 0 ? 'LUNAS' : 'BELUM BAYAR',
        paid_at: item.paidAt,
        dues_amount: item.duesAmount || 5000,
      }));
      await (supabase as any).from('kgt_members').upsert(dbPayload);
    } catch {
      // Updated locally
    }

    for (const d of Array.from(affectedDates)) {
      await syncDailyRecapTransaction(activeAngkatan, d, updatedMembersList);
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
        cloudStatus,
        syncLocalToCloud,
        refreshFromCloud,
        duesNominal,
        setDuesNominal,
        waTemplate,
        setWaTemplate,
        activeMonth,
        setActiveMonth,
        activePaymentDate,
        setActivePaymentDate,
        monthlySessionCount,
        setMonthlySessionCount,
        sessions: currentSessions,
        activeSessionId,
        setActiveSessionId,
        addCustomSession,
        removeLastSession,
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
        updateTransaction,
        addMember,
        importMembersBulk,
        deleteMember,
        updateMember,
        deleteAllMembers,
        toggleSessionDues,
        payMultipleSessionsDues,
        clearMemberMonthDues,
        markAllMembersSessionDues,
        clearAllMembersSessionDues,
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
