import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-ocean-900 text-white" id="contact">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-ocean-600 flex items-center justify-center">
                <span className="text-xl">🦐</span>
              </div>
              <h3 className="text-xl font-heading font-bold">Hải Sản Quê Nhà</h3>
            </div>
            <p className="text-ocean-200 text-sm leading-relaxed mb-4">
              Mang hải sản tươi ngon từ vùng biển Việt Nam đến bàn ăn của gia đình bạn.
              Chất lượng đảm bảo, giá tận gốc từ ngư dân.
            </p>
            <div className="flex gap-3">
              <a href={SITE_CONFIG.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-ocean-800 hover:bg-ocean-700 flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={SITE_CONFIG.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-ocean-800 hover:bg-ocean-700 flex items-center justify-center transition-colors">
                <span className="text-sm font-bold">TT</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/products', label: 'Tất cả sản phẩm' },
                { href: '/products?category=muc-kho', label: 'Mực khô' },
                { href: '/products?category=ca-kho', label: 'Cá khô' },
                { href: '/products?category=tom-kho', label: 'Tôm khô' },
                { href: '/products?category=nuoc-mam', label: 'Nước mắm' },
                { href: '/blog', label: 'Blog ẩm thực' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ocean-200 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Tra cứu đơn hàng', href: '/track-order' },
                { label: 'Chính sách vận chuyển', href: '#' },
                { label: 'Chính sách đổi trả', href: '#' },
                { label: 'Hướng dẫn mua hàng', href: '#' },
                { label: 'Câu hỏi thường gặp', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-ocean-200 text-sm hover:text-white cursor-pointer transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-ocean-400 mt-0.5 shrink-0" />
                <span className="text-ocean-200 text-sm">{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-ocean-400 shrink-0" />
                <span className="text-ocean-200 text-sm">{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-ocean-400 shrink-0" />
                <span className="text-ocean-200 text-sm">{SITE_CONFIG.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-ocean-800 text-center">
          <p className="text-ocean-300 text-sm">
            © 2026 Hải Sản Quê Nhà. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
