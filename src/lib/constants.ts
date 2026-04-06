export const SITE_CONFIG = {
  name: 'Hải Sản Quê Nhà',
  description: 'Hải sản khô chính gốc từ ngư dân Việt Nam - Tươi ngon, giá tận gốc',
  slogan: 'Từ biển khơi đến bàn ăn của bạn',
  phone: '0988 931 408',
  email: 'contact@haisanquenha.vn',
  address: 'Xã Rạng Đông, Tỉnh Nam Định',
  facebook: 'https://facebook.com/haisanquenha',
  tiktok: 'https://tiktok.com/@haisanquenha',
}

export const SHIPPING_FEES = {
  HANOI: 30000,
  HCM: 35000,
  OTHER: 40000,
  FREE_SHIPPING_THRESHOLD: 500000,
}

export const PAYMENT_METHODS = {
  COD: { label: 'Thanh toán khi nhận hàng (COD)', value: 'COD' },
  BANK_TRANSFER: { label: 'Chuyển khoản ngân hàng', value: 'BANK_TRANSFER' },
}

export const ORDER_STATUS = {
  PENDING: { label: 'Chờ xác nhận', color: 'warning' },
  CONFIRMED: { label: 'Đã xác nhận', color: 'ocean' },
  SHIPPING: { label: 'Đang giao', color: 'ocean' },
  DELIVERED: { label: 'Đã giao', color: 'success' },
  CANCELLED: { label: 'Đã hủy', color: 'danger' },
} as const
