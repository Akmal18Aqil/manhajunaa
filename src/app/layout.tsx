import type { Metadata } from 'next'
import { Providers } from './providers'
import '@/globals.css'

export const metadata: Metadata = {
  title: 'Manhajuna - Platform Tanya Jawab Ilmiah Islami',
  description: 'Platform tanya jawab ilmiah Islam berbasis reputasi dengan standar referensi kitab kuning tertinggi',
  keywords: ['islam', 'fikih', 'tanya jawab', 'q&a', 'ilmiah'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
