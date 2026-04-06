'use client'

import { useState } from 'react'
import { products } from '@/data/sample-data'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Rating } from '@/components/ui/Rating'
import Link from 'next/link'
import { ShoppingCart, Eye, Check } from 'lucide-react'

export function FeaturedProducts() {
  const featured = products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 8)
  const addItem = useCartStore((state) => state.addItem)
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleAddToCart = (product: typeof featured[0]) => {
    addItem(product as any, 1)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge variant="ocean" className="mb-3">Sản phẩm nổi bật</Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Được Yêu Thích Nhất
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Những sản phẩm bán chạy nhất, được hàng nghìn khách hàng tin tưởng và lựa chọn
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <div key={product.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Image */}
              <div className="relative aspect-square bg-ocean-50 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                  🦐
                </div>
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isBestSeller && (
                    <Badge variant="danger">Bán chạy</Badge>
                  )}
                  {product.salePrice && (
                    <Badge variant="success">Giảm giá</Badge>
                  )}
                </div>
                {/* Quick actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Link href={`/products/${product.slug}`}>
                    <Button size="sm" variant="secondary" className="rounded-full">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedId === product.id ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 md:p-4">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold text-sm md:text-base text-gray-800 hover:text-ocean-600 transition-colors line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-gray-400 mb-2">{product.origin}</p>
                <Rating value={4} size="sm" />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-ocean-600 font-bold text-sm md:text-base">
                    {formatPrice(product.salePrice || product.price)}
                  </span>
                  {product.salePrice && (
                    <span className="text-gray-400 line-through text-xs">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link href="/products">
            <Button variant="outline" size="lg">
              Xem tất cả sản phẩm →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
