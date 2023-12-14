import './styles/globals.css'
import { Inter } from 'next/font/google'
import ThemeRegistry from './styles/ThemRregistry';

const inter = Inter({ subsets: ['latin'] })

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Nexus TCG',
  description: 'An AI-enabled digital TCG where players can make their own cards.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center bg-slate-900 text-white">
          <ThemeRegistry options={{ key: 'mui-theme' }}>
            {children}
          </ThemeRegistry>
        </main>
      </body>
    </html>
  )
}
