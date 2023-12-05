/* eslint-disable camelcase */
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import '../styles/prism.css'
import { ThemeProvider } from '@/contexts/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk',
})

export const metadata: Metadata = {
  title: 'DevFlow',
  description:
    'A community-driven platform for asking and answering prgramming questions. Get help, share knowledge, and collaborate withdevelopers from around the world. Explore topics in web development, mobile app development, algorithms, data structures and more. ',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'primary-text-gradient hover:text-primary-500',
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
export default RootLayout
