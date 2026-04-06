import { Badge } from '@/components/ui/Badge'

export function StorySection() {
  return (
    <section id="story" className="section-padding gradient-sand">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl bg-ocean-100 flex items-center justify-center">
                <div className="text-center p-4">
                  <span className="text-5xl block mb-2">🎣</span>
                  <p className="text-sm text-ocean-700">Ngư dân đánh bắt</p>
                </div>
              </div>
              <div className="aspect-square rounded-2xl bg-sand-200 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl block mb-2">☀️</span>
                  <p className="text-sm text-sand-700">Phơi khô tự nhiên</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl bg-ocean-200 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl block mb-2">🐟</span>
                  <p className="text-sm text-ocean-700">Hải sản tươi sống</p>
                </div>
              </div>
              <div className="aspect-[3/4] rounded-2xl bg-sand-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <span className="text-5xl block mb-2">📦</span>
                  <p className="text-sm text-sand-800">Đóng gói cẩn thận</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <Badge variant="ocean" className="mb-4">Câu chuyện của chúng tôi</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Từ Đôi Tay Ngư Dân
              <br />
              Đến Bữa Cơm Gia Đình Bạn
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Hải Sản Quê Nhà được thành lập bởi những người con của làng biển Phan Thiết. 
                Chúng tôi lớn lên cùng tiếng sóng biển và mùi mặn mòi của gió biển.
              </p>
              <p>
                Mỗi sản phẩm đều được chọn lọc từ những mẻ lưới tươi nhất, phơi khô dưới nắng 
                biển tự nhiên theo phương pháp truyền thống của ngư dân miền Trung.
              </p>
              <p>
                Chúng tôi cam kết mang đến cho bạn hải sản <strong>100% tự nhiên</strong>, 
                không chất bảo quản, không phẩm màu - giữ trọn hương vị biển cả.
              </p>
            </div>

            {/* Process steps */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: '🎣', title: 'Đánh bắt', desc: 'Từ biển khơi' },
                { icon: '☀️', title: 'Sơ chế', desc: 'Phơi khô tự nhiên' },
                { icon: '📦', title: 'Giao hàng', desc: 'Đến tận tay bạn' },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-800">{step.title}</h4>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
