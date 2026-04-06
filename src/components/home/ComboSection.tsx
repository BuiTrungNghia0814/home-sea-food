import { products } from '@/data/sample-data'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function ComboSection() {
  const combos = products.filter(p => p.categoryId === 'cat-5')

  return (
    <section className="section-padding bg-sand-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge variant="warning" className="mb-3">🔥 Tiết kiệm hơn</Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Combo Ưu Đãi
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Mua combo tiết kiệm hơn, trải nghiệm đa dạng hương vị biển cả
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] bg-gradient-to-br from-sand-200 to-ocean-100 flex items-center justify-center relative">
                <span className="text-6xl">🎁</span>
                {product.salePrice && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    -{Math.round((1 - product.salePrice / product.price) * 100)}%
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-ocean-600">
                      {formatPrice(product.salePrice || product.price)}
                    </span>
                    {product.salePrice && (
                      <span className="block text-sm text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  <Link href={`/products/${product.slug}`}>
                    <Button>Mua ngay</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
