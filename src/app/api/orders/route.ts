import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/orders - Lấy danh sách đơn hàng
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const phone = searchParams.get('phone')
    const orderCode = searchParams.get('orderCode')

    const where: any = {}

    if (status && status !== 'all') {
      where.status = status as any
    }

    if (phone) {
      where.phone = { contains: phone }
    }

    if (orderCode) {
      where.orderCode = orderCode
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: orders,
      total: orders.length,
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, message: 'Lỗi khi lấy đơn hàng' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Tạo đơn hàng mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const required = ['customerName', 'phone', 'address', 'items', 'paymentMethod']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `Thiếu thông tin: ${field}` },
          { status: 400 }
        )
      }
    }

    const orderCode = `HSN${Date.now().toString().slice(-8)}`

    const order = await prisma.order.create({
      data: {
        orderCode,
        customerName: body.customerName,
        phone: body.phone,
        address: body.address,
        province: body.province || '',
        district: body.district || '',
        ward: body.ward || '',
        subtotal: body.subtotal || 0,
        totalAmount: body.totalAmount,
        shippingFee: body.shippingFee || 0,
        paymentMethod: body.paymentMethod,
        notes: body.notes || null,
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Đặt hàng thành công',
      data: order,
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tạo đơn hàng' },
      { status: 500 }
    )
  }
}
