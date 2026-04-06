import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Bắt đầu seed database...')

  // Xóa dữ liệu cũ
  await prisma.review.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.banner.deleteMany()
  await prisma.blogPost.deleteMany()

  // ─── Categories ───
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        id: 'cat-1',
        name: 'Mực Khô',
        slug: 'muc-kho',
        description: 'Mực khô cao cấp từ các vùng biển nổi tiếng Việt Nam — Nha Trang, Phan Thiết, Cà Mau.',
        image: '/images/categories/muc-kho.jpg',
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat-2',
        name: 'Cá Khô',
        slug: 'ca-kho',
        description: 'Cá khô phơi nắng tự nhiên, giữ trọn vị ngọt biển cả.',
        image: '/images/categories/ca-kho.jpg',
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat-3',
        name: 'Tôm Khô',
        slug: 'tom-kho',
        description: 'Tôm khô loại 1 từ vùng biển Cà Mau, Bạc Liêu.',
        image: '/images/categories/tom-kho.jpg',
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat-4',
        name: 'Nước Mắm',
        slug: 'nuoc-mam',
        description: 'Nước mắm truyền thống ủ chượp từ cá cơm than.',
        image: '/images/categories/nuoc-mam.jpg',
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat-5',
        name: 'Combo Ưu Đãi',
        slug: 'combo',
        description: 'Các combo tiết kiệm, kết hợp nhiều sản phẩm hải sản.',
        image: '/images/categories/combo.jpg',
      },
    }),
  ])
  console.log(`✅ Đã tạo ${categories.length} danh mục`)

  // ─── Products ───
  const products = await Promise.all([
    prisma.product.create({
      data: {
        id: 'sp-001',
        name: 'Mực Khô Một Nắng Phan Thiết',
        slug: 'muc-kho-mot-nang-phan-thiet',
        description: 'Mực câu được phơi đúng một nắng giòn tại Phan Thiết, thịt dày, dai mềm và thơm lừng.',
        origin: 'Phan Thiết, Bình Thuận',
        dryingProcess: 'Phơi nắng tự nhiên một nắng',
        taste: 'Ngọt thanh, dai mềm, thơm mùi nắng biển',
        price: 250000,
        stock: 120,
        images: JSON.stringify(['/images/products/muc-kho-1.jpg']),
        categoryId: 'cat-1',
        isFeatured: true,
      },
    }),
    prisma.product.create({
      data: {
        id: 'sp-002',
        name: 'Mực Khô Xé Tay Nha Trang',
        slug: 'muc-kho-xe-tay-nha-trang',
        description: 'Mực khô Nha Trang loại đặc biệt, được phơi thủ công trên giàn phơi gỗ.',
        origin: 'Nha Trang, Khánh Hòa',
        dryingProcess: 'Phơi nắng biển Nha Trang, giàn phơi gỗ truyền thống',
        taste: 'Dai giòn sần sật, vị ngọt đậm',
        price: 350000,
        stock: 85,
        images: JSON.stringify(['/images/products/muc-kho-2.jpg']),
        categoryId: 'cat-1',
        isFeatured: true,
        isBestSeller: true,
      },
    }),
    prisma.product.create({
      data: {
        id: 'sp-003',
        name: 'Cá Chỉ Vàng Khô Phú Quốc',
        slug: 'ca-chi-vang-kho-phu-quoc',
        description: 'Cá chỉ vàng tươi sống được bắt từ vùng biển Phú Quốc, phơi khô tự nhiên.',
        origin: 'Phú Quốc, Kiên Giang',
        dryingProcess: 'Phơi nắng tự nhiên trên giàn tre 2-3 ngày',
        taste: 'Béo nhẹ, mặn mà, thịt chắc',
        price: 180000,
        stock: 200,
        images: JSON.stringify(['/images/products/ca-kho-1.jpg']),
        categoryId: 'cat-2',
        isBestSeller: true,
      },
    }),
    prisma.product.create({
      data: {
        id: 'sp-004',
        name: 'Cá Cơm Khô Rim Me',
        slug: 'ca-com-kho-rim-me',
        description: 'Cá cơm khô loại nhỏ rim cùng me chua ngọt theo công thức gia truyền.',
        origin: 'Cà Mau',
        dryingProcess: 'Phơi khô tự nhiên, rim thủ công',
        taste: 'Chua ngọt mặn cay hài hòa',
        price: 120000,
        salePrice: 99000,
        stock: 150,
        images: JSON.stringify(['/images/products/ca-kho-2.jpg']),
        categoryId: 'cat-2',
      },
    }),
    prisma.product.create({
      data: {
        id: 'sp-005',
        name: 'Tôm Khô Bạc Liêu Loại 1',
        slug: 'tom-kho-bac-lieu-loai-1',
        description: 'Tôm thẻ chân trắng loại 1 từ vùng nuôi Bạc Liêu.',
        origin: 'Bạc Liêu',
        dryingProcess: 'Luộc chín, phơi nắng tự nhiên',
        taste: 'Ngọt đậm, dai săn, thơm mùi tôm biển',
        price: 450000,
        stock: 60,
        images: JSON.stringify(['/images/products/tom-kho-1.jpg']),
        categoryId: 'cat-3',
        isFeatured: true,
        isBestSeller: true,
      },
    }),
    prisma.product.create({
      data: {
        id: 'sp-006',
        name: 'Tôm Khô Cà Mau',
        slug: 'tom-kho-ca-mau',
        description: 'Tôm khô từ vùng rừng ngập mặn Cà Mau.',
        origin: 'Cà Mau',
        dryingProcess: 'Phơi nắng tự nhiên, không chất bảo quản',
        taste: 'Ngọt tự nhiên, thơm nồng, dai giòn',
        price: 380000,
        salePrice: 350000,
        stock: 75,
        images: JSON.stringify(['/images/products/tom-kho-2.jpg']),
        categoryId: 'cat-3',
      },
    }),
    prisma.product.create({
      data: {
        id: 'sp-007',
        name: 'Nước Mắm Nhĩ Phú Quốc',
        slug: 'nuoc-mam-nhi-phu-quoc',
        description: 'Nước mắm nhĩ từ nhà thùng Phú Quốc, ủ chượp 12 tháng.',
        origin: 'Phú Quốc, Kiên Giang',
        dryingProcess: 'Ủ chượp truyền thống 12 tháng trong thùng gỗ',
        taste: 'Mặn đậm đà, ngọt hậu, thơm dịu',
        price: 150000,
        stock: 300,
        images: JSON.stringify(['/images/products/nuoc-mam-1.jpg']),
        categoryId: 'cat-4',
        isFeatured: true,
      },
    }),
    prisma.product.create({
      data: {
        id: 'sp-008',
        name: 'Nước Mắm Cốt Phan Thiết',
        slug: 'nuoc-mam-cot-phan-thiet',
        description: 'Nước mắm cốt nguyên chất từ làng nghề nước mắm Phan Thiết.',
        origin: 'Phan Thiết, Bình Thuận',
        dryingProcess: 'Ủ chượp cá cơm 8-10 tháng',
        taste: 'Mặn mà, hậu ngọt',
        price: 120000,
        stock: 250,
        images: JSON.stringify(['/images/products/nuoc-mam-2.jpg']),
        categoryId: 'cat-4',
      },
    }),
    prisma.product.create({
      data: {
        id: 'sp-009',
        name: 'Combo Mực + Cá Tiết Kiệm',
        slug: 'combo-muc-ca-tiet-kiem',
        description: 'Combo gồm mực khô một nắng 200g và cá chỉ vàng khô 300g.',
        origin: 'Phan Thiết & Phú Quốc',
        dryingProcess: 'Phơi nắng tự nhiên',
        taste: 'Đa dạng vị biển',
        price: 380000,
        salePrice: 330000,
        stock: 50,
        images: JSON.stringify(['/images/products/combo-1.jpg']),
        categoryId: 'cat-5',
        isFeatured: true,
      },
    }),
    prisma.product.create({
      data: {
        id: 'sp-010',
        name: 'Combo Đặc Biệt Gia Đình',
        slug: 'combo-dac-biet-gia-dinh',
        description: 'Combo cao cấp gồm mực khô, tôm khô, cá rim me và nước mắm nhĩ.',
        origin: 'Nha Trang, Bạc Liêu, Phú Quốc',
        dryingProcess: 'Phơi nắng tự nhiên & ủ chượp truyền thống',
        taste: 'Tổng hợp vị biển Việt Nam',
        price: 650000,
        stock: 30,
        images: JSON.stringify(['/images/products/combo-2.jpg']),
        categoryId: 'cat-5',
        isFeatured: true,
      },
    }),
    prisma.product.create({
      data: {
        id: 'sp-011',
        name: 'Ruốc Tôm Hạ Long',
        slug: 'ruoc-tom-ha-long',
        description: 'Ruốc tôm Hạ Long được làm từ tôm biển tươi xay nhuyễn.',
        origin: 'Hạ Long, Quảng Ninh',
        dryingProcess: 'Rang khô thủ công trên lửa nhỏ',
        taste: 'Mặn ngọt hài hòa, thơm mùi tôm biển',
        price: 200000,
        stock: 110,
        images: JSON.stringify(['/images/products/ruoc-tom.jpg']),
        categoryId: 'cat-3',
      },
    }),
    prisma.product.create({
      data: {
        id: 'sp-012',
        name: 'Cá Bống Mú Khô',
        slug: 'ca-bong-mu-kho',
        description: 'Cá bống mú tươi phơi khô tự nhiên tại vùng biển Kiên Giang.',
        origin: 'Kiên Giang',
        dryingProcess: 'Phơi nắng tự nhiên 3-4 ngày',
        taste: 'Ngọt thanh, dai chắc',
        price: 280000,
        stock: 90,
        images: JSON.stringify(['/images/products/ca-kho-3.jpg']),
        categoryId: 'cat-2',
      },
    }),
  ])
  console.log(`✅ Đã tạo ${products.length} sản phẩm`)

  // ─── Reviews ───
  const reviews = await Promise.all([
    prisma.review.create({
      data: { productId: 'sp-002', customerName: 'Chị Nguyễn Thị Mai', rating: 5, comment: 'Mực khô Nha Trang xé tay ngon lắm! Mình mua lần thứ 3 rồi.' },
    }),
    prisma.review.create({
      data: { productId: 'sp-005', customerName: 'Anh Trần Văn Hùng', rating: 5, comment: 'Tôm khô Bạc Liêu loại 1 chất lượng thật sự. Tôm săn chắc, màu cam tự nhiên.' },
    }),
    prisma.review.create({
      data: { productId: 'sp-007', customerName: 'Bà Lê Thị Hồng', rating: 4, comment: 'Nước mắm nhĩ Phú Quốc thơm dịu, vị ngọt hậu rất ngon.' },
    }),
    prisma.review.create({
      data: { productId: 'sp-009', customerName: 'Anh Phạm Đức Nam', rating: 5, comment: 'Combo mực + cá rất tiện lợi, tiết kiệm hơn mua lẻ.' },
    }),
    prisma.review.create({
      data: { productId: 'sp-001', customerName: 'Chị Đỗ Thị Lan', rating: 4, comment: 'Mực khô một nắng Phan Thiết thơm ngon, nướng lên mềm dai vừa phải.' },
    }),
    prisma.review.create({
      data: { productId: 'sp-011', customerName: 'Chị Vũ Thị Hoa', rating: 5, comment: 'Ruốc tôm Hạ Long ngon xuất sắc! Sợi ruốc tơi, thơm mùi tôm biển.' },
    }),
  ])
  console.log(`✅ Đã tạo ${reviews.length} đánh giá`)

  // ─── Banners ───
  const banners = await Promise.all([
    prisma.banner.create({
      data: { title: 'Hải Sản Quê — Vị Biển Thật', subtitle: 'Đặc sản khô & nước mắm từ vùng biển Việt Nam', image: '/images/banners/banner-hero.jpg', link: '/products', sortOrder: 1 },
    }),
    prisma.banner.create({
      data: { title: 'Combo Tết 2026 — Quà Biếu Sang Trọng', subtitle: 'Giảm đến 15% cho combo đặc sản biển', image: '/images/banners/banner-combo.jpg', link: '/products?category=combo', sortOrder: 2 },
    }),
    prisma.banner.create({
      data: { title: 'Nước Mắm Nhĩ Phú Quốc', subtitle: '12 Tháng Ủ Chượp, Độ Đạm Trên 40°N', image: '/images/banners/banner-nuoc-mam.jpg', link: '/products/nuoc-mam-nhi-phu-quoc', sortOrder: 3 },
    }),
  ])
  console.log(`✅ Đã tạo ${banners.length} banner`)

  // ─── Blog Posts ───
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: '5 Cách Chế Biến Mực Khô Ngon Nhất',
        slug: '5-cach-che-bien-muc-kho-ngon',
        content: 'Mực khô là món đặc sản được nhiều người yêu thích...',
        excerpt: 'Từ nướng than hoa đến gỏi xoài mực khô — khám phá công thức đơn giản mà thơm ngon.',
        image: '/images/blog/muc-kho.jpg',
        isPublished: true,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Mẹo Chọn Hải Sản Khô Ngon',
        slug: 'meo-chon-hai-san-kho-ngon',
        content: 'Hải sản khô là đặc sản được nhiều gia đình ưa chuộng...',
        excerpt: 'Làm sao phân biệt tôm khô, mực khô thật và giả?',
        image: '/images/blog/chon-hai-san.jpg',
        isPublished: true,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Nước Mắm Truyền Thống vs Công Nghiệp',
        slug: 'nuoc-mam-truyen-thong-vs-cong-nghiep',
        content: 'Nước mắm là linh hồn của ẩm thực Việt Nam...',
        excerpt: 'Tìm hiểu sự khác biệt giữa nước mắm ủ chượp truyền thống và nước mắm công nghiệp.',
        image: '/images/blog/nuoc-mam.jpg',
        isPublished: true,
      },
    }),
  ])
  console.log(`✅ Đã tạo ${blogPosts.length} bài viết blog`)

  console.log('')
  console.log('🎉 Seed database hoàn tất!')
  console.log(`   - ${categories.length} danh mục`)
  console.log(`   - ${products.length} sản phẩm`)
  console.log(`   - ${reviews.length} đánh giá`)
  console.log(`   - ${banners.length} banner`)
  console.log(`   - ${blogPosts.length} bài viết`)
}

main()
  .catch((e) => {
    console.error('❌ Lỗi seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
