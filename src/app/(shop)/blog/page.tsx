import { blogPosts } from '@/data/sample-data'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-ocean-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Blog</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="ocean" className="mb-3">Blog ẩm thực</Badge>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Mẹo Hay Từ Biển
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Khám phá các công thức chế biến, mẹo chọn hải sản và kiến thức về ẩm thực biển Việt Nam
          </p>
        </div>

        {/* Featured post */}
        <div className="mb-12">
          <Card variant="elevated" className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="aspect-[16/10] md:aspect-auto bg-gradient-to-br from-ocean-100 to-ocean-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-6xl block mb-4">📝</span>
                  <p className="text-ocean-700 font-medium">Hình ảnh bài viết</p>
                </div>
              </div>
              <CardContent className="flex flex-col justify-center p-8">
                <Badge variant="ocean" className="w-fit mb-3">Nổi bật</Badge>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-3">
                  {blogPosts[0]?.title}
                </h2>
                <p className="text-gray-500 mb-4 leading-relaxed">
                  {blogPosts[0]?.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatDate(blogPosts[0]?.createdAt)}
                  </span>
                  <span>5 phút đọc</span>
                </div>
                <Link href="#" className="text-ocean-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Đọc tiếp <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[16/10] bg-ocean-50 flex items-center justify-center relative">
                <span className="text-4xl">📝</span>
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="ocean">Ẩm thực</Badge>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(post.createdAt)}
                  </span>
                  <span>5 phút đọc</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-ocean-600 transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">{post.excerpt}</p>
                <span className="text-ocean-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Đọc tiếp <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16">
          <Card className="gradient-ocean text-white overflow-hidden">
            <CardContent className="text-center py-12">
              <span className="text-4xl block mb-4">📧</span>
              <h3 className="text-2xl font-heading font-bold mb-3">
                Đăng ký nhận bài viết mới
              </h3>
              <p className="text-ocean-100 mb-6 max-w-md mx-auto">
                Nhận công thức chế biến và ưu đãi đặc biệt qua email mỗi tuần
              </p>
              <div className="flex max-w-md mx-auto gap-3">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 outline-none focus:ring-2 focus:ring-sand-400"
                />
                <button className="px-6 py-3 bg-sand-500 text-ocean-900 rounded-lg font-semibold hover:bg-sand-600 transition-colors">
                  Đăng ký
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
