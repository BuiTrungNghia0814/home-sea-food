import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED'
export type PaymentMethod = 'COD' | 'BANK_TRANSFER'

export interface OrderItem {
  productId: string
  productName: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  orderCode: string
  customerName: string
  phone: string
  address: string
  province: string
  district: string
  ward: string
  notes: string
  items: OrderItem[]
  subtotal: number
  shippingFee: number
  totalAmount: number
  paymentMethod: PaymentMethod
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

interface OrdersStore {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'orderCode' | 'status' | 'createdAt' | 'updatedAt'>) => Order
  updateStatus: (orderId: string, status: OrderStatus) => void
  getOrderById: (orderCode: string, phone: string) => Order | undefined
  getAllOrders: () => Order[]
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        const now = new Date().toISOString()
        const orderCode = `HSN${Date.now().toString().slice(-8)}`
        const order: Order = {
          ...orderData,
          id: `order-${Date.now()}`,
          orderCode,
          status: 'PENDING',
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({ orders: [order, ...state.orders] }))
        return order
      },

      updateStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
          ),
        }))
      },

      getOrderById: (orderCode, phone) => {
        return get().orders.find(
          (o) => o.orderCode === orderCode && o.phone.replace(/\s/g, '') === phone.replace(/\s/g, '')
        )
      },

      getAllOrders: () => {
        return get().orders
      },
    }),
    {
      name: 'seafood-orders',
    }
  )
)
