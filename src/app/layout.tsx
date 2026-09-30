import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import GlobalNavigator from '@/components/ui/GlobalNavigator'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KAS GEMA TARUNA — Sistem Keuangan Marching Band',
  description: 'Platform digital manajemen kas dan akuntabilitas keuangan Marching Band Gema Taruna (MBGT)',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={plusJakarta.variable}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background font-sans text-on-surface antialiased">
        {children}
        <GlobalNavigator />
      </body>
    </html>
  )
}
