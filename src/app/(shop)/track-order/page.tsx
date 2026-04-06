'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { formatPrice, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Search, Package, Truck, CheckCircle, XCircle, Clock, MapPin, Phone, User } from 'lucide-react'
import Link from 'next/link'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED'

interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  product?: {
    id: string
    name: string
  }
}

interface Order {
  id: string
  orderCode: string
  customerName: string
  phone: string
  address: string
  province: string
  district: string
  ward: string
  subtotal: number
  totalAmount: number
  shippingFee: number
  paymentMethod: 'COD' | 'BANK_TRANSFER'
  status: OrderStatus
  notes: string | null
  items: OrderItem[]
  createdAt: string
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: 'warning' | 'ocean' | 'success' | 'danger'; icon: React.ReactNode }> = {
  PENDING: { label: 'Chờ xác nhận', color: 'warning', icon: <Clock className="h-5 w-5" /> },
  CONFIRMED: { label: 'Đã xác nhận', color: 'ocean', icon: <CheckCircle className="h-5 w-5" /> },
  SHIPPING: { label: 'Đang giao hàng', color: 'ocean', icon: <Truck className="h-5 w-5" /> },
  DELIVERED: { label: 'Đã giao hàng', color: 'success', icon: <CheckCircle className="h-5 w-5" /> },
  CANCELLED: { label: 'Đã hủy', color: 'danger', icon: <XCircle className="h-5 w-5" /> },
}

const STATUS_STEPS: OrderStatus[] = ['PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED']

function OrderTimeline({ status }: { status: OrderStatus }) {
  if (status === 'CANCELLED') {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg">
        <XCircle className="h-5 w-5 text-red-500" />
        <span className="text-red-700 font-medium">Đơn hàng đã bị hủy</span>
      </div>
    )
  }

  const currentIndex = STATUS_STEPS.indexOf(status)

  return (
    <div className="flex items-center justify-between">
      {STATUS_STEPS.map((step, index) => {
        const config = STATUS_CONFIG[step]
        const isActive = index <= currentIndex
        const isCurrent = index === currentIndex

        return (
          <div key={step} className="flex flex-col items-center flex-1 relative">
            {index > 0 && (
              <div className={`absolute top-5 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                index <= currentIndex ? 'bg-ocean-500' : 'bg-gray-200'
              }`} style={{ zIndex: 0 }} />
            )}
            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isActive ? 'bg-ocean-600 text-white' : 'bg-gray-200 text-gray-400'
            } ${isCurrent ? 'ring-4 ring-ocean-200' : ''}`}>
              {config.icon}
            </div>
            <span className={`text-xs mt-2 text-center font-medium ${
              isActive ? 'text-ocean-600' : 'text-gray-400'
            }`}>
              {config.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function OrderDetail({ order }: { order: Order }) {
  const statusConfig = STATUS_CONFIG[order.status]

  return (
    <div className="space-y-6 animate-slide-up">
      <Card variant="elevated">
        <CardContent className="py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Mã đơn hàng</p>
              <p className="text-xl font-bold text-ocean-600 font-mono">#{order.orderCode}</p>
            </div>
            <Badge variant={statusConfig.color} className="text-sm px-3 py-1">
              {statusConfig.label}
            </Badge>
          </div>
          <OrderTimeline status={order.status} />
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <h3 className="font-heading font-semibold">Thông tin giao hàng</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{order.customerName}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{order.phone}</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <span className="text-sm">{order.address}, {order.ward}, {order.district}, {order.province}</span>
          </div>
          {order.notes && (
            <div className="flex items-start gap-3">
              <Package className="h-4 w-4 text-gray-400 mt-0.5" />
              <span className="text-sm text-gray-600">Ghi chú: {order.notes}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <h3 className="font-heading font-semibold">Sản phẩm đã đặt</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3 py-2 border-b last:border-0">
                <div className="w-12 h-12 rounded-lg bg-ocean-50 flex items-center justify-center shrink-0">
                  <span className="text-lg">🦐</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.product?.name || `Sản phẩm #${item.productId}`}
                  </p>
                  <p className="text-xs text-gray-400">x{item.quantity}</p>
                </div>
                <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tạm tính</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Phí vận chuyển</span>
              <span className={order.shippingFee === 0 ? 'text-green-600' : ''}>
                {order.shippingFee === 0 ? 'Miễn phí' : formatPrice(order.shippingFee)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="font-bold">Tổng cộng</span>
              <span className="font-bold text-lg text-ocean-600">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="bordered">
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Phương thức thanh toán</span>
            <span className="font-medium">{order.paymentMethod === 'COD' ? 'COD (Thanh toán khi nhận hàng)' : 'Chuyển khoản ngân hàng'}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">Ngày đặt hàng</span>
            <span className="text-sm">{formatDate(order.createdAt)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TrackOrderPage() {
  const searchParams = useSearchParams()
  const [orderCode, setOrderCode] = useState(searchParams.get('code') || '')
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!orderCode.trim()) {
      setError('Vui lòng nhập mã đơn hàng')
      return
    }
    if (!phone.trim()) {
      setError('Vui lòng nhập số điện thoại')
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      const params = new URLSearchParams({
        code: orderCode.trim(),
        phone: phone.trim(),
      })

      const response = await fetch(`/api/orders/track?${params}`)
      const result = await response.json()

      if (result.success) {
        setOrder(result.data)
      } else {
        setOrder(null)
        setError(result.message || 'Không tìm thấy đơn hàng')
      }
    } catch (err) {
      setOrder(null)
      setError('Lỗi kết nối, vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section-padding">
      <div className="container-custom max-w-2xl mx-auto">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-ocean-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Tra cứu đơn hàng</span>
        </nav>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-ocean-100 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-ocean-600" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Tra Cứu Đơn Hàng
          </h1>
          <p className="text-gray-500">
            Nhập mã đơn hàng và số điện thoại để kiểm tra trạng thái đơn hàng
          </p>
        </div>

        <Card variant="elevated" className="mb-8">
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Mã đơn hàng"
                  placeholder="VD: HSN12345678"
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value)}
                />
                <Input
                  label="Số điện thoại"
                  placeholder="Số điện thoại khi đặt hàng"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
              )}
              <Button type="submit" size="lg" className="w-full" loading={loading}>
                <Search className="h-4 w-4 mr-2" />
                Tra cứu
              </Button>
            </form>
          </CardContent>
        </Card>

        {order && <OrderDetail order={order} />}

        {searched && !order && !error && !loading && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy đơn hàng</h3>
            <p className="text-gray-500 mb-6">Vui lòng kiểm tra lại thông tin</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-2">Cần hỗ trợ?</p>
          <p className="text-sm text-gray-600">
            Liên hệ: <a href="tel:0988931408" className="text-ocean-600 font-medium">0988 931 408</a>
          </p>
        </div>
      </div>
    </div>
  )
}
