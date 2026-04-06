'use client'

import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
            <Link href="/products">
              <Button size="lg">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const subtotal = getTotal()
  const shipping = subtotal >= 500000 ? 0 : 35000
  const total = subtotal + shipping

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-ocean-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Giỏ hàng</span>
        </nav>

        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
          Giỏ hàng ({items.length} sản phẩm)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} variant="bordered">
                <CardContent className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-ocean-50 flex items-center justify-center shrink-0">
                    <span className="text-4xl">🦐</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-ocean-600 transition-colors mb-1">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-400 mb-3">{item.product.origin}</p>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-50"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-50"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-ocean-600 font-bold">
                          {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">
                            {formatPrice(item.product.salePrice || item.product.price)} / sản phẩm
                          </p>
                        )}
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear cart */}
            <div className="flex justify-between items-center pt-4">
              <Link href="/products" className="text-ocean-600 font-medium text-sm hover:underline">
                ← Tiếp tục mua sắm
              </Link>
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-600">
                <Trash2 className="h-4 w-4 mr-1" />
                Xóa tất cả
              </Button>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <Card variant="elevated">
              <CardContent>
                <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">
                  Tóm tắt đơn hàng
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-400">
                      Miễn phí ship cho đơn từ {formatPrice(500000)}
                    </p>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Tổng cộng</span>
                      <span className="font-bold text-xl text-ocean-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button size="lg" className="w-full">
                    Tiến hành thanh toán
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
