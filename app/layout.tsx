import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '센티스톡(sentistock)',
  description: 'Created with v0',
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
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}