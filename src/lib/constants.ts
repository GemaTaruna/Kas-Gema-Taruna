export const DUES_AMOUNT = 50000 // Rp 50.000 per bulan
export const DUES_PER_SESSION = 5000 // Rp 5.000 per sesi latihan
export const SESSIONS_PER_MONTH = 8 // 2x seminggu, 4 minggu
export const APPROVAL_THRESHOLD = 500000 // Belanja > Rp 500.000 perlu approval Pembina
export const TOTAL_MEMBERS = 40

export const SECTIONS = [
  { id: 'brass', name: 'Brass Section', color: '#904d00', bgColor: '#ffdcc3' },
  { id: 'percussion', name: 'Percussion (Battery)', color: '#131b2e', bgColor: '#dae2fd' },
  { id: 'color_guard', name: 'Color Guard', color: '#920028', bgColor: '#ffdada' },
  { id: 'pit', name: 'Pit Instrument', color: '#4338CA', bgColor: '#eef2ff' },
  { id: 'official', name: 'Official & Medis', color: '#76777d', bgColor: '#f3f4f6' },
] as const

export const EXPENSE_CATEGORIES = [
  'Perawatan Alat', 'Konsumsi Latihan', 'Transportasi',
  'Kostum & Seragam', 'Pendaftaran Lomba', 'ATK & Administrasi', 'Lainnya'
] as const

export const INCOME_CATEGORIES = [
  'Iuran Anggota', 'Donasi Alumni', 'Sponsorship',
  'Hadiah Kejuaraan', 'Dana Pembinaan Sekolah', 'Sewa Alat', 'Lainnya'
] as const
