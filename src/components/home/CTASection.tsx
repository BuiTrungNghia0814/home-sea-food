import { Button } from '@/components/ui/Button'
import { Phone } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="section-padding gradient-ocean text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40 40-40h-20l-40 40zm40 0v-20l-20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative text-center">
        <span className="text-5xl block mb-6">🌊</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Sẵn Sàng Thử Hương Vị Biển Cả?
        </h2>
        <p className="text-ocean-100 text-lg max-w-2xl mx-auto mb-8">
          Đặt hàng ngay hôm nay để nhận ưu đãi đặc biệt. 
          Hải sản tươi ngon sẽ đến tay bạn trong 2-5 ngày!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/products">
            <Button size="lg" variant="secondary">
              Đặt Hàng Ngay 🛒
            </Button>
          </Link>
          <a href="tel:0988931408">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Phone className="h-5 w-5 mr-2" />
              Gọi Tư Vấn
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
