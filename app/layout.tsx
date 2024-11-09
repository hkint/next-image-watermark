import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

// Define common metadata values
const siteName = 'Image Watermark';
const baseUrl = 'https://watermark.okhk.net';
const defaultImage = `https://okhk.net/api/og?title=${siteName}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  
  // Basic Metadata
  title: {
    default: 'Offline Image Watermark - Add Text Watermarks Locally Without Upload',
    template: '%s | Offline Image Watermark'
  },
  description: 'Free offline watermark tool for images - Add text watermarks locally without uploading. Your photos never leave your device. Adjust opacity, position, and font styles with complete privacy. No upload, no registration required.',
  
  // Keywords - Updated to focus on offline/privacy aspects
  keywords: [
    'offline watermark',
    'local image watermark',
    'private watermark tool',
    'no upload watermark',
    'browser watermark',
    'secure image watermark',
    'private photo watermark',
    'local photo processing',
    'client-side watermark',
    'watermark without upload',
    'private image tool',
    'offline photo editor'
  ],
  
  // Canonical URL
  alternates: {
    canonical: '/',
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
      'max-snippet': -1,
    },
  },
  
  // Open Graph - Updated to emphasize offline/privacy features
  openGraph: {
    type: 'website',
    siteName: siteName,
    title: 'Offline Image Watermark - Add Watermarks Privately Without Uploading',
    description: 'Add watermarks to your photos privately in your browser - No upload needed. Your images stay on your device. Free, secure, and instant watermarking with complete privacy.',
    images: [{
      url: defaultImage,
      width: 1200,
      height: 630,
      alt: 'Offline Image Watermark Tool - Private & Secure'
    }],
    locale: 'en_US',
    url: baseUrl,
  },
  
  // Twitter Card - Updated for privacy focus
  twitter: {
    card: 'summary_large_image',
    title: 'Offline Image Watermark - Private Watermarking Without Upload',
    description: 'Add watermarks to your photos privately in your browser. No server upload, complete privacy, instant results. Free offline watermarking tool.',
    images: [defaultImage],
    creator: '@okhknet',
    site: '@okhknet',
  },
  
  // Additional Metadata - Updated categories and tags
  category: 'Privacy-focused Image Tools',
  creator: siteName,
  publisher: siteName,
  applicationName: 'Offline Image Watermark',
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
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
        url: '/favicon-32x32.svg',
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        sizes: '16x16',
        url: '/favicon-16x16.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" expand={false} richColors />
      </body>
    </html>
  );
}