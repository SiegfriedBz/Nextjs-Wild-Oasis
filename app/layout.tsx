import Header from '@/app/_components/Header'
import ToastContainer from '@/app/_context/ToastProvider'
import '@/app/_styles/globals.css'
import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const josefin = Josefin_Sans({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'Welcome | The Wild Oasis'
  },
  description:
    'Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mountains and forests.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_URL,
    siteName: 'The Wild Oasis',
    title: 'Welcome | The Wild Oasis',
    description:
      'Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mountains and forests.',
    images: [
      {
        url: process.env.NEXT_PUBLIC_OG_IMAGE_URL as string,
        width: 1200,
        height: 630,
        alt: 'The Wild Oasis'
      }
    ]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body
        className={`
          container mx-auto 
          min-h-[100svh]
          ${josefin.className}
          bg-primary-950
          text-primary-100
        `}
      >
        <div
          className='
          grid grid-rows-[min-content_1fr]'
        >
          <Header />
          <div className='max-sm:px-2 sm:px-4 max-sm:pt-12 sm:pt-16'>
            {children}
          </div>
        </div>
        <ToastContainer />
        <Analytics />
        <div id='root-portal-modal'></div>
      </body>
    </html>
  )
}
