import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/orders/track?code=xxx&phone=xxx - Tra cứu đơn hàng
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderCode = searchParams.get('code')
    const phone = searchParams.get('phone')

    if (!orderCode || !phone) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập mã đơn hàng và số điện thoại' },
        { status: 400 }
      )
    }

    const order = await prisma.order.findFirst({
      where: {
        orderCode: orderCode.trim(),
        phone: phone.trim().replace(/\s/g, ''),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy đơn hàng' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error('Error tracking order:', error)
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tra cứu đơn hàng' },
      { status: 500 }
    )
  }
}
