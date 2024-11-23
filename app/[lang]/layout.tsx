import './globals.css'
import { Toaster } from 'sonner'
import { Metadata } from 'next'
import React, { use } from 'react'

import { baseUrl, siteName, defaultImage } from '@/const'

import linguiConfig from '@/lingui.config'
import { allMessages, getI18nInstance } from '@/i18n'
import { LinguiClientProvider } from '@/components/i18n/LinguiClientProvider'
import { PageLangParam, withLinguiLayout } from '@/components/i18n/Lingui'

import { t } from '@lingui/macro'

export async function generateStaticParams() {
  return linguiConfig.locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageLangParam) {
  const { lang } = await params
  const i18n = getI18nInstance(lang)

  return {
    metadataBase: new URL(baseUrl),

    title: {
      default: t(i18n)`Image + Watermark - Add Text Watermarks Locally`,
      template: t(i18n)`%s | Image + Watermark - Add Text Watermarks Locally`
    },
    description: t(
      i18n
    )`Free offline watermark tool for images - Add text watermarks locally without uploading. Your photos never leave your device. Adjust opacity, position, and font styles with complete privacy. No upload, no registration required.`,

    keywords: [
      t(i18n)`offline watermark`,
      t(i18n)`local image watermark`,
      t(i18n)`private watermark tool`,
      t(i18n)`no upload watermark`,
      t(i18n)`browser watermark`,
      t(i18n)`secure image watermark`,
      t(i18n)`private photo watermark`,
      t(i18n)`local photo processing`,
      t(i18n)`client-side watermark`,
      t(i18n)`watermark without upload`,
      t(i18n)`private image tool`,
      t(i18n)`offline photo editor`
    ],

    // Canonical URL
    alternates: {
      canonical: `/${lang}`,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    openGraph: {
      type: 'website',
      siteName: siteName,
      title: t(i18n)`Offline Image Watermark - Add Watermarks Privately Without Uploading`,
      description: t(i18n)`Add watermarks to your photos privately in your browser - No upload needed. Your images stay on your device. Free, secure, and instant watermarking with complete privacy.`,
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: t(i18n)`Offline Image Watermark Tool - Private & Secure`
        }
      ],
      locale: lang,
      url: baseUrl
    },

    twitter: {
      card: 'summary_large_image',
      title: t(i18n)`Offline Image Watermark - Private Watermarking Without Upload`,
      description: t(i18n)`Add watermarks to your photos privately in your browser. No server upload, complete privacy, instant results. Free offline watermarking tool.`,
      images: [defaultImage],
      creator: '@okhknet',
      site: '@okhknet'
    },

    category: t(i18n)`Privacy-focused Image Tools`,
    creator: siteName,
    publisher: siteName,
    applicationName: t(i18n)`Offline Image Watermark`,
    formatDetection: {
      telephone: false,
      date: false,
      address: false,
      email: false
    },

    // Icons
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.svg',
      apple: '/apple-touch-icon.svg',
      other: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          sizes: '32x32',
          url: '/favicon-32x32.svg'
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          sizes: '16x16',
          url: '/favicon-16x16.svg'
        }
      ]
    }
  }
}

export default withLinguiLayout(function RootLayout({
  children,
  params: { lang }
}) {
  return (
    <html lang={lang}>
      <body>
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={allMessages[lang]!}
        >
          {children}
          <Toaster position="top-center" expand={false} richColors />
        </LinguiClientProvider>
      </body>
    </html>
  )
})
