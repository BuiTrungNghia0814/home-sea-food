import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products - Lấy danh sách sản phẩm từ database
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort')
    const limit = searchParams.get('limit')

    const where: any = { isActive: true }

    if (category) {
      where.category = { slug: category }
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = Number(minPrice)
      if (maxPrice) where.price.lte = Number(maxPrice)
    }

    let orderBy: any = { createdAt: 'desc' }
    if (sort === 'price-asc') orderBy = { price: 'asc' }
    if (sort === 'price-desc') orderBy = { price: 'desc' }
    if (sort === 'newest') orderBy = { createdAt: 'desc' }

    const products = await prisma.product.findMany({
      where,
      include: { category: true, reviews: true },
      orderBy,
      ...(limit ? { take: Number(limit) } : {}),
    })

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, message: 'Lỗi khi lấy sản phẩm' },
      { status: 500 }
    )
  }
}
