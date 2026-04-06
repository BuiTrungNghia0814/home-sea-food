import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingCart, Settings, ChevronLeft } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const sidebarLinks = [
    { href: '/admin', label: 'Tổng quan', icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: '/admin/products', label: 'Sản phẩm', icon: <Package className="h-5 w-5" /> },
    { href: '/admin/orders', label: 'Đơn hàng', icon: <ShoppingCart className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <header className="bg-ocean-800 text-white h-14 flex items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-ocean-200 hover:text-white transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm">Về trang chủ</span>
          </Link>
          <span className="text-ocean-500">|</span>
          <h1 className="font-heading font-bold">Quản trị hệ thống</h1>
        </div>
        <span className="text-sm text-ocean-200">Admin</span>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-[calc(100vh-3.5rem)] shadow-sm">
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-ocean-50 hover:text-ocean-600 transition-colors font-medium"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
