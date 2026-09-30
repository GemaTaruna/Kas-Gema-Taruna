export type UserRole = 'bendahara' | 'pembina' | 'anggota'
export type MemberSection = 'brass' | 'percussion' | 'color_guard' | 'pit' | 'official'
export type MemberStatus = 'aktif' | 'cadangan' | 'alumni'
export type TransactionType = 'pemasukan' | 'pengeluaran'
export type DuesStatus = 'lunas' | 'belum_bayar'
export type PaymentMethod = 'tunai' | 'transfer'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          role: UserRole
          phone: string | null
          avatar_url: string | null
          section: MemberSection | null
          instrument: string | null
          member_id: string | null
          drill_position: string | null
          status: MemberStatus
          joined_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'> & { created_at?: string }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      transactions: {
        Row: {
          id: string
          type: TransactionType
          category: string
          amount: number
          description: string
          reference_no: string
          receipt_url: string | null
          vendor: string | null
          section: string | null
          recorded_by: string
          verified_by: string | null
          verified_at: string | null
          transaction_date: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>
      }
      dues: {
        Row: {
          id: string
          member_id: string
          period: string
          amount: number
          status: DuesStatus
          paid_at: string | null
          recorded_by: string | null
          payment_method: PaymentMethod | null
          wa_notified: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['dues']['Row'], 'id' | 'created_at' | 'wa_notified'> & { id?: string; created_at?: string; wa_notified?: boolean }
        Update: Partial<Database['public']['Tables']['dues']['Insert']>
      }
      settings: {
        Row: {
          id: string
          key: string
          value: Record<string, unknown>
          updated_by: string | null
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['settings']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string }
        Update: Partial<Database['public']['Tables']['settings']['Insert']>
      }
    }
  }
}
