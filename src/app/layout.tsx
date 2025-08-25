import { type Metadata } from 'next'
import {getLocale} from 'next-intl/server';
import { Inter, Noto_Sans_JP, Geist } from 'next/font/google'
import { Toaster } from 'sonner'
import { getTranslations } from 'next-intl/server'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'HomePage' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale();
 
  return (
    <html className={`h-full bg-neutral-950 text-base antialiased ${inter.variable} ${notoSansJP.variable} ${geist.variable}`} lang={locale}>
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
