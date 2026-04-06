'use client'

import { useState, useMemo } from 'react'
import { products, categories } from '@/data/sample-data'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Rating } from '@/components/ui/Rating'
import { Select } from '@/components/ui/Select'
import { ShoppingCart, Eye, Filter, X, Grid3X3, List, Check } from 'lucide-react'
import Link from 'next/link'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('popular')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [addedId, setAddedId] = useState<string | null>(null)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (product: typeof products[0]) => {
    addItem(product as any, 1)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  const filteredProducts = useMemo(() => {
    let result = [...products].filter(p => p.isActive)

    // Filter by category
    if (selectedCategory !== 'all') {
      const cat = categories.find(c => c.slug === selectedCategory)
      if (cat) result = result.filter(p => p.categoryId === cat.id)
    }

    // Filter by price
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      result = result.filter(p => {
        const price = p.salePrice || p.price
        if (max) return price >= min && price <= max
        return price >= min
      })
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case 'price-desc':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default: // popular
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
    }

    return result
  }, [selectedCategory, priceRange, sortBy])

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-ocean-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Sản phẩm</span>
        </nav>

        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Tất Cả Sản Phẩm
            </h1>
            <p className="text-gray-500 mt-1">{filteredProducts.length} sản phẩm</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Bộ lọc
            </Button>

            {/* View mode */}
            <div className="hidden md:flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-ocean-50 text-ocean-600' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-ocean-50 text-ocean-600' : 'text-gray-400 hover:bg-gray-50'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Sort */}
            <Select
              options={[
                { value: 'popular', label: 'Phổ biến nhất' },
                { value: 'newest', label: 'Mới nhất' },
                { value: 'price-asc', label: 'Giá: Thấp → Cao' },
                { value: 'price-desc', label: 'Giá: Cao → Thấp' },
              ]}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className={`
            ${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-auto' : 'hidden'}
            md:block md:static md:w-64 md:shrink-0
          `}>
            {showFilters && (
              <div className="flex items-center justify-between mb-6 md:hidden">
                <h3 className="font-semibold text-lg">Bộ lọc</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Danh mục</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === 'all' ? 'bg-ocean-50 text-ocean-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Tất cả sản phẩm
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.slug ? 'bg-ocean-50 text-ocean-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Khoảng giá</h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'Tất cả' },
                  { value: '0-150000', label: 'Dưới 150.000đ' },
                  { value: '150000-300000', label: '150.000đ - 300.000đ' },
                  { value: '300000-500000', label: '300.000đ - 500.000đ' },
                  { value: '500000-', label: 'Trên 500.000đ' },
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setPriceRange(range.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      priceRange === range.value ? 'bg-ocean-50 text-ocean-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-6xl block mb-4">🔍</span>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500">Thử thay đổi bộ lọc của bạn</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6' 
                : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  viewMode === 'grid' ? (
                    // Grid view
                    <div key={product.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-square bg-ocean-50 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                          🦐
                        </div>
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.isBestSeller && <Badge variant="danger">Bán chạy</Badge>}
                          {product.salePrice && <Badge variant="success">Giảm giá</Badge>}
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <Link href={`/products/${product.slug}`}>
                            <Button size="sm" variant="secondary" className="rounded-full"><Eye className="h-4 w-4" /></Button>
                          </Link>
                          <Button size="sm" className="rounded-full" onClick={() => handleAddToCart(product)}>
                            {addedId === product.id ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 md:p-4">
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="font-semibold text-sm md:text-base text-gray-800 hover:text-ocean-600 transition-colors line-clamp-2 mb-1">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-400 mb-2">{product.origin}</p>
                        <Rating value={4} size="sm" />
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-ocean-600 font-bold text-sm md:text-base">
                            {formatPrice(product.salePrice || product.price)}
                          </span>
                          {product.salePrice && (
                            <span className="text-gray-400 line-through text-xs">{formatPrice(product.price)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List view
                    <div key={product.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex">
                      <div className="w-40 md:w-48 shrink-0 bg-ocean-50 flex items-center justify-center">
                        <span className="text-4xl group-hover:scale-110 transition-transform">🦐</span>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link href={`/products/${product.slug}`}>
                              <h3 className="font-semibold text-gray-800 hover:text-ocean-600 transition-colors mb-1">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-400 mb-2">{product.origin}</p>
                            <Rating value={4} size="sm" />
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-ocean-600 font-bold text-lg block">
                              {formatPrice(product.salePrice || product.price)}
                            </span>
                            {product.salePrice && (
                              <span className="text-gray-400 line-through text-sm">{formatPrice(product.price)}</span>
                            )}
                            <Link href={`/products/${product.slug}`}>
                              <Button size="sm" className="mt-2">Xem chi tiết</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
