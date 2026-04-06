# 🦐 Hải Sản Quê Nhà - E-commerce Website

Website bán hải sản khô chính gốc từ ngư dân Việt Nam. Được xây dựng với Next.js 14, TailwindCSS, và TypeScript.

## ✨ Tính năng

### Frontend (Customer)
- **Trang chủ**: Hero banner, sản phẩm nổi bật, câu chuyện thương hiệu, combo ưu đãi
- **Danh sách sản phẩm**: Lọc theo danh mục, giá; Sắp xếp; Grid/List view
- **Chi tiết sản phẩm**: Hình ảnh, mô tả, đánh giá, sản phẩm liên quan
- **Giỏ hàng**: Thêm/xóa/cập nhật số lượng, tính tổng
- **Thanh toán**: Form thông tin giao hàng, COD/Chuyển khoản
- **Blog**: Bài viết về ẩm thực, mẹo chọn hải sản

### Admin Panel
- **Dashboard**: Tổng quan sản phẩm, đơn hàng, doanh thu
- **Quản lý sản phẩm**: Thêm/sửa/xóa sản phẩm
- **Quản lý đơn hàng**: Xem, cập nhật trạng thái đơn hàng

### Marketing & SEO
- SEO-friendly URLs (slug)
- Meta tags cho mỗi trang
- Placeholder cho Facebook/TikTok Pixel
- Blog section cho content marketing

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| State | Zustand (Cart) |
| Database | PostgreSQL + Prisma ORM |
| Icons | Lucide React |

## 📁 Folder Structure

```
src/
├── app/
│   ├── (shop)/              # Customer-facing pages
│   │   ├── products/        # Product listing
│   │   ├── products/[slug]/ # Product detail
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout
│   │   └── blog/            # Blog
│   ├── admin/               # Admin panel
│   │   ├── products/        # Manage products
│   │   └── orders/          # Manage orders
│   ├── api/                 # API routes
│   │   ├── products/        # Product API
│   │   ├── orders/          # Order API
│   │   └── categories/      # Category API
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── home/                # Homepage sections
│   └── shop/                # Shop components
├── data/
│   └── sample-data.ts       # Sample product data
├── lib/
│   ├── utils.ts             # Utility functions
│   └── constants.ts         # App constants
├── store/
│   └── cart-store.ts        # Zustand cart store
└── types/
    └── index.ts             # TypeScript interfaces
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm hoặc yarn

### Installation

```bash
# 1. Clone repository
git clone <repo-url>
cd home_sea_food

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your database URL

# 4. Setup database (optional - app works with sample data)
npx prisma generate
npx prisma db push

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Pages

| URL | Description |
|-----|-------------|
| `/` | Homepage |
| `/products` | Product listing |
| `/products/[slug]` | Product detail |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/blog` | Blog |
| `/admin` | Admin dashboard |
| `/admin/products` | Admin products |
| `/admin/orders` | Admin orders |

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Ocean Blue | `#0284c7` | Primary, CTAs |
| Sand Beige | `#f5c542` | Accents, highlights |
| Shell White | `#faf8f5` | Background |
| Ocean Dark | `#075985` | Headers, footer |

## 📦 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables (Production)
```
DATABASE_URL=your_production_database_url
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📄 License

MIT License
