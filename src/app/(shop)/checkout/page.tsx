'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { SHIPPING_FEES } from '@/lib/constants'
import { CreditCard, Truck, CheckCircle, Search } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BANK_TRANSFER'>('COD')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderCode, setOrderCode] = useState('')
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    notes: '',
  })

  const subtotal = getTotal()
  const shipping = subtotal >= SHIPPING_FEES.FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEES.HCM
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          phone: formData.phone,
          address: formData.address,
          province: formData.province,
          district: formData.district,
          ward: formData.ward,
          notes: formData.notes,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.salePrice || item.product.price,
          })),
          subtotal,
          shippingFee: shipping,
          totalAmount: total,
          paymentMethod,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setOrderCode(result.data.orderCode)
        setOrderSuccess(true)
        clearCart()
      } else {
        alert('Lỗi khi đặt hàng: ' + result.message)
      }
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Lỗi kết nối, vui lòng thử lại')
    }

    setIsSubmitting(false)
  }

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center py-20">
          <h2 className="text-2xl font-heading font-bold mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-6">Vui lòng thêm sản phẩm trước khi thanh toán</p>
          <Link href="/products"><Button>Đến cửa hàng</Button></Link>
        </div>
      </div>
    )
  }

  if (orderSuccess) {
    return (
      <div className="section-padding">
        <div className="container-custom max-w-lg mx-auto text-center py-20">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Đặt hàng thành công! 🎉
          </h2>
          <p className="text-gray-600 mb-4">
            Cảm ơn bạn đã đặt hàng tại Hải Sản Quê Nhà.
            Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
          </p>
          <div className="bg-ocean-50 rounded-xl p-4 mb-6 inline-block">
            <p className="text-sm text-gray-500 mb-1">Mã đơn hàng của bạn</p>
            <p className="text-2xl font-bold text-ocean-600 font-mono">#{orderCode}</p>
            <p className="text-xs text-gray-400 mt-1">Lưu lại mã này để tra cứu đơn hàng</p>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/"><Button variant="outline">Về trang chủ</Button></Link>
            <Link href={`/track-order?code=${orderCode}`}><Button variant="secondary">Tra cứu đơn hàng</Button></Link>
            <Link href="/products"><Button>Tiếp tục mua sắm</Button></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-ocean-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-ocean-600">Giỏ hàng</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Thanh toán</span>
        </nav>

        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">Thanh toán</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping info */}
              <Card variant="bordered">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-ocean-600" />
                    <h3 className="font-heading font-semibold text-lg">Thông tin giao hàng</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Họ và tên *"
                      placeholder="Nguyễn Văn A"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      required
                    />
                    <Input
                      label="Số điện thoại *"
                      placeholder="0988 931 408"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    label="Địa chỉ cụ thể *"
                    placeholder="Số nhà, tên đường..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <Select
                      label="Tỉnh/Thành phố *"
                      options={[
                        { value: '', label: 'Chọn tỉnh' },
                        { value: 'hanoi', label: 'Hà Nội' },
                        { value: 'hcm', label: 'TP. Hồ Chí Minh' },
                        { value: 'danang', label: 'Đà Nẵng' },
                        { value: 'other', label: 'Tỉnh khác' },
                      ]}
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      required
                    />
                    <Input
                      label="Quận/Huyện *"
                      placeholder="Quận/Huyện"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      required
                    />
                    <Input
                      label="Phường/Xã *"
                      placeholder="Phường/Xã"
                      value={formData.ward}
                      onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ghi chú</label>
                    <textarea
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none resize-none h-24"
                      placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment method */}
              <Card variant="bordered">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-ocean-600" />
                    <h3 className="font-heading font-semibold text-lg">Phương thức thanh toán</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    paymentMethod === 'COD' ? 'border-ocean-600 bg-ocean-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-ocean-600"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    paymentMethod === 'BANK_TRANSFER' ? 'border-ocean-600 bg-ocean-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="BANK_TRANSFER"
                      checked={paymentMethod === 'BANK_TRANSFER'}
                      onChange={() => setPaymentMethod('BANK_TRANSFER')}
                      className="accent-ocean-600"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Chuyển khoản ngân hàng</p>
                      <p className="text-sm text-gray-500">Chuyển khoản trước qua ngân hàng</p>
                    </div>
                  </label>

                  {paymentMethod === 'BANK_TRANSFER' && (
                    <div className="p-4 bg-sand-50 rounded-lg border border-sand-200 mt-2">
                      <p className="text-sm font-medium text-gray-800 mb-2">Thông tin chuyển khoản:</p>
                      <p className="text-sm text-gray-600">Ngân hàng: Vietcombank</p>
                      <p className="text-sm text-gray-600">Số TK: 1234567890</p>
                      <p className="text-sm text-gray-600">Chủ TK: NGUYEN VAN A</p>
                      <p className="text-sm text-gray-600">Nội dung: [Tên] [SĐT]</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order summary */}
            <div>
              <Card variant="elevated" className="sticky top-24">
                <CardHeader>
                  <h3 className="font-heading font-semibold text-lg">Đơn hàng của bạn</h3>
                </CardHeader>
                <CardContent>
                  {/* Items */}
                  <div className="space-y-3 mb-4 max-h-60 overflow-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded bg-ocean-50 flex items-center justify-center shrink-0">
                          <span className="text-lg">🦐</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{item.product.name}</p>
                          <p className="text-xs text-gray-400">x{item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium text-gray-800">
                          {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tạm tính</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phí vận chuyển</span>
                      <span className={shipping === 0 ? 'text-green-600' : ''}>
                        {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-bold text-gray-900">Tổng cộng</span>
                      <span className="font-bold text-xl text-ocean-600">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-6"
                    loading={isSubmitting}
                  >
                    Đặt hàng
                  </Button>

                  <p className="text-xs text-gray-400 text-center mt-3">
                    Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng của chúng tôi
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
