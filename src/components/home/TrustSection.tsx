import { Badge } from '@/components/ui/Badge'
import { Shield, Truck, Award, HeadphonesIcon } from 'lucide-react'

export function TrustSection() {
  const trusts = [
    {
      icon: <Shield className="h-8 w-8 text-ocean-600" />,
      title: '100% Tự Nhiên',
      desc: 'Không chất bảo quản, không phẩm màu. Hải sản phơi khô tự nhiên theo phương pháp truyền thống.',
    },
    {
      icon: <Truck className="h-8 w-8 text-ocean-600" />,
      title: 'Giao Hàng Toàn Quốc',
      desc: 'Đóng gói kỹ càng, giao hàng nhanh 2-5 ngày. Miễn phí ship cho đơn từ 500K.',
    },
    {
      icon: <Award className="h-8 w-8 text-ocean-600" />,
      title: 'Chất Lượng Đảm Bảo',
      desc: 'Nguồn gốc rõ ràng từ các vùng biển nổi tiếng: Phan Thiết, Nha Trang, Phú Quốc.',
    },
    {
      icon: <HeadphonesIcon className="h-8 w-8 text-ocean-600" />,
      title: 'Hỗ Trợ 24/7',
      desc: 'Đội ngũ tư vấn nhiệt tình, sẵn sàng giải đáp mọi thắc mắc của bạn.',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge variant="ocean" className="mb-3">Tại sao chọn chúng tôi</Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Uy Tín Tạo Nên Thương Hiệu
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trusts.map((item, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-ocean-50/50 hover:bg-ocean-50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:shadow-md transition-shadow">
                {item.icon}
              </div>
              <h3 className="font-heading font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
