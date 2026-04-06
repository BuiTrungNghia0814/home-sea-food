'use client'

import { useState } from 'react'
import { products, categories } from '@/data/sample-data'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react'

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Quản lý sản phẩm</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-1" /> Thêm sản phẩm
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Product form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold">
                  {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                </h2>
                <button onClick={() => { setShowForm(false); setEditingProduct(null) }}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form className="space-y-4">
                <Input label="Tên sản phẩm" placeholder="VD: Mực khô một nắng Phan Thiết" />
                <Select
                  label="Danh mục"
                  options={categories.map(c => ({ value: c.id, label: c.name }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Giá gốc (VNĐ)" type="number" placeholder="250000" />
                  <Input label="Giá khuyến mãi (VNĐ)" type="number" placeholder="200000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Tồn kho" type="number" placeholder="100" />
                  <Input label="Xuất xứ" placeholder="Phan Thiết, Bình Thuận" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả</label>
                  <textarea
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ocean-500 focus:border-transparent outline-none resize-none h-24"
                    placeholder="Mô tả chi tiết sản phẩm..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Quy trình sản xuất" placeholder="Phơi khô tự nhiên" />
                  <Input label="Hương vị" placeholder="Ngọt đậm, dai mềm" />
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <Button variant="outline" type="button" onClick={() => { setShowForm(false); setEditingProduct(null) }}>
                    Hủy
                  </Button>
                  <Button type="submit">
                    {editingProduct ? 'Cập nhật' : 'Thêm sản phẩm'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Products table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3">Sản phẩm</th>
                  <th className="pb-3">Danh mục</th>
                  <th className="pb-3">Giá</th>
                  <th className="pb-3">Tồn kho</th>
                  <th className="pb-3">Nổi bật</th>
                  <th className="pb-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-ocean-50 flex items-center justify-center">
                          <span>🦐</span>
                        </div>
                        <div>
                          <span className="font-medium text-sm block">{product.name}</span>
                          <span className="text-xs text-gray-400">{product.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-500">
                      {categories.find(c => c.id === product.categoryId)?.name || '-'}
                    </td>
                    <td className="py-3">
                      <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                      {product.salePrice && (
                        <span className="block text-xs text-gray-400 line-through">{formatPrice(product.salePrice)}</span>
                      )}
                    </td>
                    <td className="py-3 text-sm">{product.stock}</td>
                    <td className="py-3">
                      {product.isFeatured && <Badge variant="ocean">Nổi bật</Badge>}
                      {product.isBestSeller && <Badge variant="danger">Bán chạy</Badge>}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-ocean-600 transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
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
