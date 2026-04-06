import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/shop/Header'
import { Footer } from '@/components/shop/Footer'

export const metadata: Metadata = {
  title: 'Hải Sản Quê Nhà - Hải sản khô chính gốc từ ngư dân Việt Nam',
  description: 'Hải sản khô tươi ngon, giá tận gốc từ Phan Thiết, Nha Trang, Phú Quốc. Mực khô, cá khô, tôm khô, nước mắm chính hiệu.',
  keywords: 'hải sản khô, mực khô, cá khô, tôm khô, nước mắm, đặc sản biển Việt Nam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
