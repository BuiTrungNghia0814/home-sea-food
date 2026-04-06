'use client'

import { useState, useEffect } from 'react'
import { products } from '@/data/sample-data'
import { formatPrice, formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED'

interface Order {
  id: string
  orderCode: string
  customerName: string
  totalAmount: number
  status: OrderStatus
  createdAt: string
}

const statusConfig: Record<string, { label: string; variant: 'warning' | 'ocean' | 'success' | 'danger' }> = {
  PENDING: { label: 'Chờ xác nhận', variant: 'warning' },
  CONFIRMED: { label: 'Đã xác nhận', variant: 'ocean' },
  SHIPPING: { label: 'Đang giao', variant: 'ocean' },
  DELIVERED: { label: 'Đã giao', variant: 'success' },
  CANCELLED: { label: 'Đã hủy', variant: 'danger' },
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders')
        const result = await response.json()
        if (result.success) {
          setOrders(result.data)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const totalOrders = orders.length
  const totalRevenue = orders
    .filter(o => o.status !== 'CANCELLED')
    .reduce((sum, o) => sum + o.totalAmount, 0)

  const recentOrders = orders.slice(0, 5)

  const stats = [
    { icon: <Package className="h-6 w-6" />, label: 'Tổng sản phẩm', value: totalProducts, color: 'bg-ocean-500' },
    { icon: <ShoppingCart className="h-6 w-6" />, label: 'Đơn hàng', value: totalOrders, color: 'bg-green-500' },
    { icon: <DollarSign className="h-6 w-6" />, label: 'Doanh thu', value: formatPrice(totalRevenue), color: 'bg-sand-500' },
    { icon: <TrendingUp className="h-6 w-6" />, label: 'Tồn kho', value: totalStock, color: 'bg-purple-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">Tổng quan</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} text-white flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-lg text-gray-900">Đơn hàng gần đây</h2>
            <Link href="/admin/orders" className="text-sm text-ocean-600 hover:underline">Xem tất cả →</Link>
          </div>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Đang tải...</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Chưa có đơn hàng nào</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3">Mã đơn</th>
                    <th className="pb-3">Khách hàng</th>
                    <th className="pb-3">Tổng tiền</th>
                    <th className="pb-3">Trạng thái</th>
                    <th className="pb-3">Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-3 font-medium text-sm text-ocean-600 font-mono">#{order.orderCode}</td>
                      <td className="py-3 text-sm">{order.customerName}</td>
                      <td className="py-3 text-sm font-medium">{formatPrice(order.totalAmount)}</td>
                      <td className="py-3">
                        <Badge variant={statusConfig[order.status]?.variant || 'ocean'}>
                          {statusConfig[order.status]?.label || order.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="font-heading font-semibold text-lg text-gray-900 mb-4">Sản phẩm</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3">Sản phẩm</th>
                  <th className="pb-3">Danh mục</th>
                  <th className="pb-3">Giá</th>
                  <th className="pb-3">Tồn kho</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 6).map((product) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-ocean-50 flex items-center justify-center">
                          <span>🦐</span>
                        </div>
                        <span className="font-medium text-sm">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{product.categoryId}</td>
                    <td className="py-3 text-sm font-medium">{formatPrice(product.price)}</td>
                    <td className="py-3 text-sm">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
