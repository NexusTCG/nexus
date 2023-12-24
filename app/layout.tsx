import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import './styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Nexus TCG',
  description: 'An AI-enabled digital TCG where players can make their own cards.',
}

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
          <ThemeProvider theme={theme}>
            {children}
            <Analytics />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}