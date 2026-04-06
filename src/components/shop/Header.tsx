'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Phone, Search } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/store/cart-store'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const itemCount = useCartStore((state) => state.getItemCount())

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/products', label: 'Sản phẩm' },
    { href: '/track-order', label: 'Tra cứu đơn' },
    { href: '/blog', label: 'Blog' },
    { href: '/#story', label: 'Câu chuyện' },
    { href: '/#contact', label: 'Liên hệ' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top bar */}
      <div className="bg-ocean-700 text-white text-sm py-1.5">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5" />
            <span>{SITE_CONFIG.phone}</span>
          </div>
          <span className="hidden sm:block">Miễn phí vận chuyển cho đơn từ 500.000đ</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-ocean-600 flex items-center justify-center">
              <span className="text-white text-xl">🦐</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-heading font-bold text-ocean-800 leading-tight">
                Hải Sản Quê Nhà
              </h1>
              <p className="text-[10px] text-gray-500 hidden sm:block">Từ biển khơi đến bàn ăn</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-ocean-600 font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ocean-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-ocean-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <nav className="container-custom py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-4 text-gray-700 hover:bg-ocean-50 hover:text-ocean-600 rounded-lg font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
