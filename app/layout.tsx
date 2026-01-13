import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '센티스톡(sentistock)',
  description: 'AI 기반 감정 분석 주식 투자 플랫폼',
  manifest: '/manifest.json',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/sentistock-icon.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/sentistock-icon.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/sentistock-icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/sentistock-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}