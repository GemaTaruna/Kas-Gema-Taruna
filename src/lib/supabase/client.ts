import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kiejyfaotimflspzmbqe.supabase.co'

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZWp5ZmFvdGltZmxzcHptYnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3MTAwODQsImV4cCI6MjEwNjI4NjA4NH0.GtlL-eG_SqnQ38kkvYvQju3hlI_uliNcQQ3zljX-lUU'

export function createClient() {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
}
