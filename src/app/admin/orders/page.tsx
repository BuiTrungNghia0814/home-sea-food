'use client'

import { useState, useEffect, useCallback } from 'react'
import { formatPrice, formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Eye, X, Package, Truck, CheckCircle, XCircle, Clock, Phone, MapPin, User } from 'lucide-react'

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
  updatedAt: string
}

const statusConfig: Record<OrderStatus, { label: string; variant: 'warning' | 'ocean' | 'success' | 'danger' }> = {
  PENDING: { label: 'Chờ xác nhận', variant: 'warning' },
  CONFIRMED: { label: 'Đã xác nhận', variant: 'ocean' },
  SHIPPING: { label: 'Đang giao', variant: 'ocean' },
  DELIVERED: { label: 'Đã giao', variant: 'success' },
  CANCELLED: { label: 'Đã hủy', variant: 'danger' },
}

function OrderDetailModal({ order, onClose, onStatusChange }: {
  order: Order
  onClose: () => void
  onStatusChange: (id: string, status: OrderStatus) => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold">Chi tiết đơn hàng #{order.orderCode}</h2>
            <button onClick={onClose}><X className="h-5 w-5" /></button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-3">
              <Badge variant={statusConfig[order.status].variant} className="text-sm px-3 py-1">
                {statusConfig[order.status].label}
              </Badge>
              <Select
                options={Object.entries(statusConfig).map(([key, config]) => ({
                  value: key,
                  label: `Chuyển sang: ${config.label}`,
                }))}
                value={order.status}
                onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3">Thông tin khách hàng</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span>{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{order.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span>{order.address}, {order.ward}, {order.district}, {order.province}</span>
              </div>
              {order.notes && (
                <p className="text-gray-500 italic">Ghi chú: {order.notes}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Sản phẩm ({order.items.length})</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 py-2 border-b last:border-0">
                  <div className="w-10 h-10 rounded bg-ocean-50 flex items-center justify-center shrink-0">
                    <span>🦐</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product?.name || `Sản phẩm #${item.productId}`}</p>
                    <p className="text-xs text-gray-400">x{item.quantity} x {formatPrice(item.price)}</p>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-ocean-50 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Tạm tính</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span>{order.shippingFee === 0 ? 'Miễn phí' : formatPrice(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Thanh toán</span>
              <span>{order.paymentMethod === 'COD' ? 'COD' : 'Chuyển khoản'}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-ocean-200">
              <span className="font-bold">Tổng cộng</span>
              <span className="font-bold text-lg text-ocean-600">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            Đặt lúc: {formatDate(order.createdAt)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)

      const response = await fetch(`/api/orders?${params}`)
      const result = await response.json()

      if (result.success) {
        setOrders(result.data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      const result = await response.json()
      if (result.success) {
        fetchOrders()
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus })
        }
      }
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const filteredOrders = orders

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-sm text-gray-500 mt-1">{orders.length} đơn hàng</p>
        </div>
        <Select
          options={[
            { value: 'all', label: 'Tất cả đơn hàng' },
            { value: 'PENDING', label: 'Chờ xác nhận' },
            { value: 'CONFIRMED', label: 'Đã xác nhận' },
            { value: 'SHIPPING', label: 'Đang giao' },
            { value: 'DELIVERED', label: 'Đã giao' },
            { value: 'CANCELLED', label: 'Đã hủy' },
          ]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = orders.filter(o => o.status === key).length
          return (
            <Card key={key}>
              <CardContent className="text-center py-3">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <Badge variant={config.variant}>{config.label}</Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Orders table */}
      <Card>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Đang tải...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Chưa có đơn hàng nào</p>
              <p className="text-sm text-gray-400 mt-1">Đơn hàng sẽ xuất hiện khi khách hàng đặt hàng</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3">Mã đơn</th>
                    <th className="pb-3">Khách hàng</th>
                    <th className="pb-3">Sản phẩm</th>
                    <th className="pb-3">Tổng tiền</th>
                    <th className="pb-3">TT</th>
                    <th className="pb-3">Trạng thái</th>
                    <th className="pb-3">Ngày đặt</th>
                    <th className="pb-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 font-medium text-sm text-ocean-600 font-mono">#{order.orderCode}</td>
                      <td className="py-3">
                        <span className="text-sm font-medium block">{order.customerName}</span>
                        <span className="text-xs text-gray-400">{order.phone}</span>
                      </td>
                      <td className="py-3 text-sm text-gray-500">{order.items.length} SP</td>
                      <td className="py-3 text-sm font-medium">{formatPrice(order.totalAmount)}</td>
                      <td className="py-3 text-sm text-gray-500">{order.paymentMethod === 'COD' ? 'COD' : 'CK'}</td>
                      <td className="py-3">
                        <Badge variant={statusConfig[order.status].variant}>
                          {statusConfig[order.status].label}
                        </Badge>
                      </td>
                      <td className="py-3 text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 text-gray-400 hover:text-ocean-600 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}
