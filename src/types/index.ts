export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  origin: string;
  dryingProcess: string;
  taste: string;
  price: number;
  salePrice?: number;
  stock: number;
  images: string[];
  categoryId: string;
  category?: Category;
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  totalAmount: number;
  shippingFee: number;
  paymentMethod: 'COD' | 'BANK_TRANSFER';
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';
  notes?: string;
  items?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  excerpt: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingInfo {
  customerName: string;
  phone: string;
  address: string;
  province: string;
  district: string;
  ward: string;
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
}
