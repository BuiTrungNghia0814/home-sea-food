import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative gradient-ocean text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
          {/* Text */}
          <div className="animate-slide-up">
            <div className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              🌊 Hải sản tươi ngon từ biển Việt Nam
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-tight mb-6">
              Từ Biển Khơi
              <br />
              Đến <span className="text-sand-400">Bàn Ăn</span> Bạn
            </h1>
            <p className="text-lg md:text-xl text-ocean-100 leading-relaxed mb-8 max-w-lg">
              Mực khô, cá khô, tôm khô và nước mắm chính gốc từ ngư dân Phan Thiết, Nha Trang, Phú Quốc. 
              Tươi ngon - Giá tận gốc - Giao hàng toàn quốc.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Mua Ngay 🛒
                </Button>
              </Link>
              <Link href="#story">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold">
                  Câu Chuyện Của Chúng Tôi
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { number: '10K+', label: 'Khách hàng' },
                { number: '50+', label: 'Sản phẩm' },
                { number: '99%', label: 'Hài lòng' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-sand-400">{stat.number}</div>
                  <div className="text-sm text-ocean-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image placeholder */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-full aspect-square rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl block mb-4">🦑</span>
                  <p className="text-ocean-200 text-sm">Hình ảnh sản phẩm</p>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">100% Tự Nhiên</p>
                  <p className="text-xs text-gray-500">Không chất bảo quản</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                <span className="text-2xl">🚚</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Giao Hàng Nhanh</p>
                  <p className="text-xs text-gray-500">Toàn quốc 2-5 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
