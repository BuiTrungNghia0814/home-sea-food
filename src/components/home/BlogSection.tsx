import { blogPosts } from '@/data/sample-data'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function BlogSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <div>
            <Badge variant="ocean" className="mb-3">Blog ẩm thực</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Mẹo Hay Từ Biển
            </h2>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-1 text-ocean-600 font-medium hover:gap-2 transition-all">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[16/10] bg-ocean-50 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2">{formatDate(post.createdAt)}</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-ocean-600 transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                <span className="text-ocean-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Đọc tiếp <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
