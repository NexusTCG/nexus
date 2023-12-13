import { Inter, Roboto_Mono } from 'next/font/google'
import './styles/globals.css'

const inter = Inter({ subsets: ['latin'] })
const roboto_mono = Roboto_Mono({ subsets: ['latin'] })

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
    <html lang="en" className={roboto_mono.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center bg-slate-900 text-white">
          {children}
        </main>
      </body>
    </html>
  )
}
