'use client'

import { useState } from 'react'
import { products, reviews as allReviews } from '@/data/sample-data'
import { formatPrice, formatDate } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Rating } from '@/components/ui/Rating'
import { Card, CardContent } from '@/components/ui/Card'
import { ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  if (!product) {
    notFound()
  }

  const productReviews = allReviews.filter(r => r.productId === product.id)
  const relatedProducts = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addItem(product as any, quantity)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const handleBuyNow = () => {
    addItem(product as any, quantity)
    router.push('/cart')
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-ocean-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-ocean-600">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        {/* Product main */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-2xl bg-ocean-50 flex items-center justify-center mb-4">
              <span className="text-8xl">🦐</span>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg bg-ocean-50 flex items-center justify-center border-2 transition-colors ${
                    selectedImage === i ? 'border-ocean-600' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <span className="text-2xl">🦐</span>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex gap-2 mb-3">
              {product.isBestSeller && <Badge variant="danger">Bán chạy</Badge>}
              {product.salePrice && <Badge variant="success">Đang giảm giá</Badge>}
            </div>

            <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <Rating value={4} showValue />
              <span className="text-sm text-gray-400">({productReviews.length} đánh giá)</span>
              <span className="text-sm text-gray-400">|</span>
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-ocean-600">
                {formatPrice(product.salePrice || product.price)}
              </span>
              {product.salePrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
              {product.salePrice && (
                <Badge variant="danger">
                  -{Math.round((1 - product.salePrice / product.price) * 100)}%
                </Badge>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Mô tả</h4>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-ocean-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Xuất xứ</p>
                  <p className="font-medium text-sm text-gray-800">{product.origin}</p>
                </div>
                <div className="p-3 bg-ocean-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Quy trình</p>
                  <p className="font-medium text-sm text-gray-800">{product.dryingProcess}</p>
                </div>
                <div className="p-3 bg-ocean-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Hương vị</p>
                  <p className="font-medium text-sm text-gray-800">{product.taste}</p>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium text-gray-700">Số lượng:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 hover:bg-gray-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2.5 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Thêm vào giỏ
              </Button>
              <Button size="lg" variant="secondary" className="flex-1" onClick={handleBuyNow}>
                Mua ngay
              </Button>
            </div>

            {/* Toast notification */}
            {showToast && (
              <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Đã thêm {quantity} {product.name} vào giỏ hàng!
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Truck className="h-5 w-5" />, text: 'Giao hàng nhanh' },
                { icon: <Shield className="h-5 w-5" />, text: 'Chính hãng 100%' },
                { icon: <RotateCcw className="h-5 w-5" />, text: 'Đổi trả 7 ngày' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-ocean-600">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-16">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            Đánh giá từ khách hàng
          </h2>
          {productReviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {productReviews.map((review) => (
                <Card key={review.id} variant="bordered">
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-800">{review.customerName}</p>
                        <Rating value={review.rating} size="sm" />
                      </div>
                      <span className="text-sm text-gray-400">{formatDate(review.createdAt)}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
          )}
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-square bg-ocean-50 flex items-center justify-center">
                    <span className="text-4xl group-hover:scale-110 transition-transform">🦐</span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-800 group-hover:text-ocean-600 transition-colors line-clamp-2 mb-1">
                      {p.name}
                    </h3>
                    <span className="text-ocean-600 font-bold text-sm">
                      {formatPrice(p.salePrice || p.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
