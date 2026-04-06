// ─── Kiểu dữ liệu ───

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
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
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  createdAt?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  tags: string[];
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ─── Categories ───

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Mực Khô",
    slug: "muc-kho",
    description: "Mực khô cao cấp từ các vùng biển nổi tiếng Việt Nam — Nha Trang, Phan Thiết, Cà Mau.",
    image: "/images/categories/muc-kho.jpg",
  },
  {
    id: "cat-2",
    name: "Cá Khô",
    slug: "ca-kho",
    description: "Cá khô phơi nắng tự nhiên, giữ trọn vị ngọt biển cả, chế biến sẵn sàng cho bữa cơm gia đình.",
    image: "/images/categories/ca-kho.jpg",
  },
  {
    id: "cat-3",
    name: "Tôm Khô",
    slug: "tom-kho",
    description: "Tôm khô loại 1 từ vùng biển Cà Mau, Bạc Liêu — thịt dai ngọt, màu cam tự nhiên.",
    image: "/images/categories/tom-kho.jpg",
  },
  {
    id: "cat-4",
    name: "Nước Mắm",
    slug: "nuoc-mam",
    description: "Nước mắm truyền thống ủ chượp từ cá cơm than, hương vị đậm đà, nguyên chất.",
    image: "/images/categories/nuoc-mam.jpg",
  },
  {
    id: "cat-5",
    name: "Combo Ưu Đãi",
    slug: "combo",
    description: "Các combo tiết kiệm, kết hợp nhiều sản phẩm hải sản quê cho gia đình hoặc làm quà tặng.",
    image: "/images/categories/combo.jpg",
  },
];

// ─── Products ───

export const products: Product[] = [
  {
    id: "sp-001",
    name: "Mực Khô Một Nắng Phan Thiết",
    slug: "muc-kho-mot-nang-phan-thiet",
    description: "Mực câu được phơi đúng một nắng giòn tại Phan Thiết, thịt dày, dai mềm và thơm lừng. Khi nướng lên, mùi thơm quyến rũ lan tỏa khắp nhà, chấm cùng tương ớt thì ngon hết sảy. Phù hợp làm quà biếu hoặc nhâm nhi cuối tuần.",
    origin: "Phan Thiết, Bình Thuận",
    dryingProcess: "Phơi nắng tự nhiên một nắng",
    taste: "Ngọt thanh, dai mềm, thơm mùi nắng biển",
    price: 250000,
    stock: 120,
    images: [
      "/images/products/muc-kho-mot-nang-phan-thiet-1.jpg",
      "/images/products/muc-kho-mot-nang-phan-thiet-2.jpg",
    ],
    categoryId: "cat-1",
    isFeatured: true,
    isBestSeller: false,
    isActive: true,
  },
  {
    id: "sp-002",
    name: "Mực Khô Xé Tay Nha Trang",
    slug: "muc-kho-xe-tay-nha-trang",
    description: "Mực khô Nha Trang loại đặc biệt, được phơi thủ công trên giàn phơi gỗ, xé tay nên sợi mực giữ được độ dài và dai giòn tự nhiên. Thích hợp chế biến gỏi xoài, trộn nộm hoặc ăn vặt trực tiếp sau khi nướng.",
    origin: "Nha Trang, Khánh Hòa",
    dryingProcess: "Phơi nắng biển Nha Trang, giàn phơi gỗ truyền thống",
    taste: "Dai giòn sần sật, vị ngọt đậm, mùi biển rõ ràng",
    price: 350000,
    stock: 85,
    images: [
      "/images/products/muc-kho-xe-tay-nha-trang-1.jpg",
      "/images/products/muc-kho-xe-tay-nha-trang-2.jpg",
    ],
    categoryId: "cat-1",
    isFeatured: true,
    isBestSeller: true,
    isActive: true,
  },
  {
    id: "sp-003",
    name: "Cá Chỉ Vàng Khô Phú Quốc",
    slug: "ca-chi-vang-kho-phu-quoc",
    description: "Cá chỉ vàng tươi sống được bắt từ vùng biển Phú Quốc, phơi khô tự nhiên trên giàn tre. Thịt cá chắc, béo nhẹ, khi chiên giòn hoặc nướng than hoa dậy mùi thơm đặc trưng. Món nhậu lý tưởng cho bữa cơm chiều.",
    origin: "Phú Quốc, Kiên Giang",
    dryingProcess: "Phơi nắng tự nhiên trên giàn tre 2-3 ngày",
    taste: "Béo nhẹ, mặn mà, thịt chắc",
    price: 180000,
    stock: 200,
    images: [
      "/images/products/ca-chi-vang-kho-phu-quoc-1.jpg",
      "/images/products/ca-chi-vang-kho-phu-quoc-2.jpg",
    ],
    categoryId: "cat-2",
    isFeatured: false,
    isBestSeller: true,
    isActive: true,
  },
  {
    id: "sp-004",
    name: "Cá Cơm Khô Rim Me",
    slug: "ca-com-kho-rim-me",
    description: "Cá cơm khô loại nhỏ rim cùng me chua ngọt theo công thức gia truyền miền Tây. Vị chua thanh của me, ngọt mặn của nước mắm, cay nhẹ của ớt — ăn một miếng là nhớ mãi. Mở hộp ra là có ngay món ăn kèm cơm trắng.",
    origin: "Cà Mau",
    dryingProcess: "Phơi khô tự nhiên, rim thủ công",
    taste: "Chua ngọt mặn cay hài hòa, đậm đà",
    price: 120000,
    salePrice: 99000,
    stock: 150,
    images: [
      "/images/products/ca-com-kho-rim-me-1.jpg",
      "/images/products/ca-com-kho-rim-me-2.jpg",
    ],
    categoryId: "cat-2",
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
  },
  {
    id: "sp-005",
    name: "Tôm Khô Bạc Liêu Loại 1",
    slug: "tom-kho-bac-lieu-loai-1",
    description: "Tôm thẻ chân trắng loại 1 từ vùng nuôi Bạc Liêu, được luộc chín rồi phơi khô tự nhiên dưới nắng biển. Tôm khô săn chắc, vỏ giòn, thịt ngọt đậm — nấu canh bầu, xào rau hoặc trộn gỏi đều ngon tuyệt vời.",
    origin: "Bạc Liêu",
    dryingProcess: "Luộc chín, phơi nắng tự nhiên",
    taste: "Ngọt đậm, dai săn, thơm mùi tôm biển",
    price: 450000,
    stock: 60,
    images: [
      "/images/products/tom-kho-bac-lieu-loai-1-1.jpg",
      "/images/products/tom-kho-bac-lieu-loai-1-2.jpg",
    ],
    categoryId: "cat-3",
    isFeatured: true,
    isBestSeller: true,
    isActive: true,
  },
  {
    id: "sp-006",
    name: "Tôm Khô Cà Mau",
    slug: "tom-kho-ca-mau",
    description: "Tôm khô từ vùng rừng ngập mặn Cà Mau — nơi tôm được nuôi tự nhiên, thịt săn chắc và có vị ngọt đặc trưng. Phơi khô truyền thống giữ nguyên hương vị biển, màu cam đỏ tự nhiên đẹp mắt.",
    origin: "Cà Mau",
    dryingProcess: "Phơi nắng tự nhiên, không chất bảo quản",
    taste: "Ngọt tự nhiên, thơm nồng, dai giòn",
    price: 380000,
    salePrice: 350000,
    stock: 75,
    images: [
      "/images/products/tom-kho-ca-mau-1.jpg",
      "/images/products/tom-kho-ca-mau-2.jpg",
    ],
    categoryId: "cat-3",
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
  },
  {
    id: "sp-007",
    name: "Nước Mắm Nhĩ Phú Quốc",
    slug: "nuoc-mam-nhi-phu-quoc",
    description: "Nước mắm nhĩ (nước cốt đầu tiên) từ nhà thùng Phú Quốc, ủ chượp cá cơm than với muối Bà Rịa trong thùng gỗ bời lời suốt 12 tháng. Độ đạm tự nhiên trên 40°N, màu cánh gián đẹp, mùi thơm dịu và vị ngọt hậu sâu.",
    origin: "Phú Quốc, Kiên Giang",
    dryingProcess: "Ủ chượp truyền thống 12 tháng trong thùng gỗ",
    taste: "Mặn đậm đà, ngọt hậu, thơm dịu",
    price: 150000,
    stock: 300,
    images: [
      "/images/products/nuoc-mam-nhi-phu-quoc-1.jpg",
      "/images/products/nuoc-mam-nhi-phu-quoc-2.jpg",
    ],
    categoryId: "cat-4",
    isFeatured: true,
    isBestSeller: false,
    isActive: true,
  },
  {
    id: "sp-008",
    name: "Nước Mắm Cốt Phan Thiết",
    slug: "nuoc-mam-cot-phan-thiet",
    description: "Nước mắm cốt nguyên chất từ làng nghề nước mắm Phan Thiết, Bình Thuận. Cá cơm được đánh bắt và ủ chượp ngay trong ngày, cho ra loại nước mắm có màu vàng nâu trong, vị mặn mà và hậu ngọt tự nhiên.",
    origin: "Phan Thiết, Bình Thuận",
    dryingProcess: "Ủ chượp cá cơm 8-10 tháng",
    taste: "Mặn mà, hậu ngọt, hương thơm đặc trưng",
    price: 120000,
    stock: 250,
    images: [
      "/images/products/nuoc-mam-cot-phan-thiet-1.jpg",
      "/images/products/nuoc-mam-cot-phan-thiet-2.jpg",
    ],
    categoryId: "cat-4",
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
  },
  {
    id: "sp-009",
    name: "Combo Mực + Cá Tiết Kiệm",
    slug: "combo-muc-ca-tiet-kiem",
    description: "Combo bao gồm mực khô một nắng 200g và cá chỉ vàng khô 300g — bộ đôi hải sản khô được yêu thích nhất. Tiết kiệm 50.000đ so với mua lẻ, phù hợp cho bữa cơm gia đình hoặc làm quà tặng ý nghĩa.",
    origin: "Phan Thiết & Phú Quốc",
    dryingProcess: "Phơi nắng tự nhiên",
    taste: "Đa dạng vị biển, ngọt thanh và béo nhẹ",
    price: 380000,
    salePrice: 330000,
    stock: 50,
    images: [
      "/images/products/combo-muc-ca-1.jpg",
      "/images/products/combo-muc-ca-2.jpg",
    ],
    categoryId: "cat-5",
    isFeatured: true,
    isBestSeller: false,
    isActive: true,
  },
  {
    id: "sp-010",
    name: "Combo Đặc Biệt Gia Đình",
    slug: "combo-dac-biet-gia-dinh",
    description: "Combo cao cấp gồm mực khô Nha Trang 300g, tôm khô Bạc Liêu 200g, cá cơm rim me 1 hộp và nước mắm nhĩ Phú Quốc 1 chai 500ml. Tất cả đều là đặc sản vùng miền, chất lượng loại 1 — món quà biếu Tết sang trọng.",
    origin: "Nha Trang, Bạc Liêu, Phú Quốc",
    dryingProcess: "Phơi nắng tự nhiên & ủ chượp truyền thống",
    taste: "Tổng hợp vị biển Việt Nam",
    price: 650000,
    stock: 30,
    images: [
      "/images/products/combo-dac-biet-gia-dinh-1.jpg",
      "/images/products/combo-dac-biet-gia-dinh-2.jpg",
    ],
    categoryId: "cat-5",
    isFeatured: true,
    isBestSeller: false,
    isActive: true,
  },
  {
    id: "sp-011",
    name: "Ruốc Tôm Hạ Long",
    slug: "ruoc-tom-ha-long",
    description: "Ruốc tôm (chà bông tôm) Hạ Long được làm từ tôm biển tươi xay nhuyễn, rang khô trên lửa nhỏ cùng hành phi thơm. Sợi ruốc tơi xốp, màu cam tự nhiên, vị mặn ngọt hài hòa — ăn kèm cháo, cơm nóng hoặc bánh mì đều ngon.",
    origin: "Hạ Long, Quảng Ninh",
    dryingProcess: "Rang khô thủ công trên lửa nhỏ",
    taste: "Mặn ngọt hài hòa, thơm mùi tôm biển",
    price: 200000,
    stock: 110,
    images: [
      "/images/products/ruoc-tom-ha-long-1.jpg",
      "/images/products/ruoc-tom-ha-long-2.jpg",
    ],
    categoryId: "cat-3",
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
  },
  {
    id: "sp-012",
    name: "Cá Bống Mú Khô",
    slug: "ca-bong-mu-kho",
    description: "Cá bống mú tươi phơi khô tự nhiên tại vùng biển Kiên Giang, giữ nguyên vị ngọt thịt và độ dai chắc. Khi hấp gừng hoặc nấu canh chua, cá bống mú khô dậy mùi thơm đặc trưng, thịt dai ngọt như cá tươi.",
    origin: "Kiên Giang",
    dryingProcess: "Phơi nắng tự nhiên 3-4 ngày",
    taste: "Ngọt thanh, dai chắc, thơm mùi cá biển",
    price: 280000,
    stock: 90,
    images: [
      "/images/products/ca-bong-mu-kho-1.jpg",
      "/images/products/ca-bong-mu-kho-2.jpg",
    ],
    categoryId: "cat-2",
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
  },
];

// ─── Banners ───

export const banners: Banner[] = [
  {
    id: "banner-1",
    title: "Hải Sản Quê — Vị Biển Thật",
    subtitle: "Đặc sản khô & nước mắm từ vùng biển Việt Nam, giao tận nhà toàn quốc.",
    image: "/images/banners/banner-hero.jpg",
    link: "/san-pham",
    isActive: true,
  },
  {
    id: "banner-2",
    title: "Combo Tết 2026 — Quà Biếu Sang Trọng",
    subtitle: "Giảm đến 15% cho combo đặc sản biển, hộp quà tặng cao cấp.",
    image: "/images/banners/banner-combo-tet.jpg",
    link: "/combo",
    isActive: true,
  },
  {
    id: "banner-3",
    title: "Nước Mắm Nhĩ Phú Quốc — 12 Tháng Ủ Chượp",
    subtitle: "Độ đạm tự nhiên trên 40°N, không chất bảo quản, nguyên chất 100%.",
    image: "/images/banners/banner-nuoc-mam.jpg",
    link: "/san-pham/nuoc-mam-nhi-phu-quoc",
    isActive: true,
  },
];

// ─── Blog Posts ───

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "5 Cách Chế Biến Mực Khô Ngon Nhất Cho Bữa Cơm Gia Đình",
    slug: "5-cach-che-bien-muc-kho-ngon",
    excerpt: "Từ nướng than hoa đến gỏi xoài mực khô — khám phá những công thức đơn giản mà thơm ngon nhất.",
    content: `Mực khô là món đặc sản được nhiều người yêu thích. Dưới đây là 5 cách chế biến mực khô ngon nhất mà ai cũng có thể thực hiện tại nhà.

## 1. Mực khô nướng than hoa
Đây là cách chế biến đơn giản nhất và giữ được trọn vẹn hương vị. Đặt mực lên vỉ nướng, than hoa phải hồng đều, nướng khoảng 2-3 phút mỗi mặt. Mực chín có mùi thơm đặc trưng, xé sợi chấm tương ớt.

## 2. Gỏi xoài mực khô
Mực khô nướng chín, xé sợi. Trộn với xoài non bào sợi, hành phi, rau răm, đậu phộng rang. Nêm nước mắm chua ngọt — món gỏi thanh mát cho ngày hè.

## 3. Mực khô rim nước mắm
Mực khô cắt miếng vừa ăn, rim lửa nhỏ với nước mắm, đường, tỏi ớt. Vị mặn ngọt cay hài hòa, ăn kèm cơm trắng rất đưa cơm.

## 4. Mực khô chiên giòn
Mực khô ngâm mềm, chiên giòn trong dầu nóng. Giòn rụm bên ngoài, dai ngọt bên trong — món nhậu lai rai cuối tuần.

## 5. Cháo mực khô
Nấu cháo gạo tẻ, thêm mực khô xé nhỏ, hành ngò, tiêu. Bát cháo nóng hổi, ngọt thanh mùi biển — thích hợp cho bữa sáng hoặc khi ốm.`,
    image: "/images/blog/che-bien-muc-kho.jpg",
    author: "Hải Sản Quê",
    publishedAt: "2026-03-15",
    createdAt: "2026-03-15",
    tags: ["cách chế biến", "mực khô", "công thức nấu ăn"],
  },
  {
    id: "blog-2",
    title: "Mẹo Chọn Hải Sản Khô Ngon — Không Bị Lừa Hàng Kém Chất Lượng",
    slug: "meo-chon-hai-san-kho-ngon",
    excerpt: "Làm sao phân biệt tôm khô, mực khô thật và giả? Những bí quyết chọn hải sản khô an toàn cho gia đình.",
    content: `Hải sản khô là đặc sản được nhiều gia đình ưa chuộng, nhưng thị trường hiện nay có không ít hàng giả, hàng kém chất lượng. Dưới đây là những mẹo chọn hải sản khô ngon.

## Cách chọn mực khô ngon
- **Màu sắc**: Mực khô ngon có màu hồng nhạt tự nhiên, không quá trắng hay quá sẫm.
- **Bề mặt**: Thân mực thẳng, các đốm nâu rõ ràng, lớp phấn trắng mỏng phủ đều.
- **Mùi**: Ngửi thấy mùi tanh nhẹ của biển, không hắc hay có mùi hóa chất.
- **Độ dày**: Mực dày mình, râu còn nguyên — đây là mực câu, chất lượng tốt nhất.

## Cách chọn tôm khô ngon
- **Màu cam đỏ tự nhiên**, không đều màu hoàn toàn vì tôm thật có độ chênh nhẹ.
- **Sờ vào không dính tay**, khô ráo nhưng vẫn có độ đàn hồi.
- **Ngửi mùi**: Tôm khô thật có mùi thơm đặc trưng, không tanh hắc.

## Cách chọn cá khô ngon
- **Cá khô ngon** có mắt trong, thịt săn, không có mùi ươn.
- **Da cá** không bị bong tróc, các vảy còn nguyên.
- **Không mua** cá khô có màu quá trắng hoặc có vết mốc.

## Lưu ý chung
- Mua tại cửa hàng uy tín, có xuất xứ rõ ràng.
- Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.
- Hạn sử dụng tốt nhất trong 6 tháng kể từ ngày sản xuất.`,
    image: "/images/blog/meo-chon-hai-san.jpg",
    author: "Hải Sản Quê",
    publishedAt: "2026-02-20",
    createdAt: "2026-02-20",
    tags: ["mẹo hay", "hải sản khô", "an toàn thực phẩm"],
  },
  {
    id: "blog-3",
    title: "Nước Mắm Truyền Thống vs Nước Mắm Công Nghiệp — Khác Biệt Gì?",
    slug: "nuoc-mam-truyen-thong-vs-cong-nghiep",
    excerpt: "Tìm hiểu sự khác biệt giữa nước mắm ủ chượp truyền thống và nước mắm pha chế công nghiệp.",
    content: `Nước mắm là linh hồn của ẩm thực Việt Nam. Nhưng giữa nước mắm truyền thống và nước mắm công nghiệp có sự khác biệt rất lớn mà nhiều người chưa biết.

## Nước mắm truyền thống
- **Nguyên liệu**: Chỉ gồm cá cơm (hoặc các loại cá khác) và muối biển.
- **Quá trình**: Ủ chượp tự nhiên trong thùng gỗ từ 12-24 tháng.
- **Hàm lượng đạm**: Tự nhiên, thường từ 25-43°N.
- **Màu**: cánh gián đến nâu đỏ trong.
- **Vị**: Mặn mà, hậu ngọt tự nhiên, thơm dịu mùi cá biển.
- **Giá thành**: Cao hơn do thời gian sản xuất lâu.

## Nước mắm công nghiệp
- **Nguyên liệu**: Pha loãng nước mắm cốt với nước, thêm đường, chất tạo màu, chất điều vị.
- **Quá trình**: Sản xuất nhanh bằng phương pháp công nghiệp.
- **Hàm lượng đạm**: Thường dưới 15°N, có khi chỉ 5-10°N.
- **Màu**: Nhạt hơn, trong hơn.
- **Vị**: Nhẹ nhàng, dễ ăn nhưng thiếu chiều sâu.
- **Giá thành**: Rẻ hơn nhiều.

## Lời khuyên
Nếu bạn muốn thưởng thức trọn vẹn hương vị nước mắm, hãy chọn nước mắm nhĩ (nước cốt đầu tiên) từ Phú Quốc hoặc Phan Thiết. Dùng để chấm trực tiếp, pha nước chấm hoặc nêm nếm — mỗi giọt đều là tinh hoa của biển cả.`,
    image: "/images/blog/nuoc-mam-truyen-thong.jpg",
    author: "Hải Sản Quê",
    publishedAt: "2026-01-10",
    createdAt: "2026-01-10",
    tags: ["nước mắm", "đặc sản", "ẩm thực Việt"],
  },
];

// ─── Reviews ───

export const reviews: Review[] = [
  {
    id: "rev-1",
    productId: "sp-002",
    customerName: "Chị Nguyễn Thị Mai",
    rating: 5,
    comment: "Mực khô Nha Trang xé tay ngon lắm! Mình mua lần thứ 3 rồi. Nướng lên thơm phức, xé sợi trộn gỏi xoài thì hết sảy. Sẽ tiếp tục ủng hộ shop.",
    createdAt: "2026-03-28",
  },
  {
    id: "rev-2",
    productId: "sp-005",
    customerName: "Anh Trần Văn Hùng",
    rating: 5,
    comment: "Tôm khô Bạc Liêu loại 1 chất lượng thật sự. Tôm săn chắc, màu cam tự nhiên, nấu canh bầu rất ngọt. Đóng gói cẩn thận, giao hàng nhanh.",
    createdAt: "2026-03-25",
  },
  {
    id: "rev-3",
    productId: "sp-007",
    customerName: "Bà Lê Thị Hồng",
    rating: 4,
    comment: "Nước mắm nhĩ Phú Quốc thơm dịu, vị ngọt hậu rất ngon. Mình dùng để pha nước chấm cả nhà đều khen. Chỉ tiếc là chai nhỏ quá, lần sau mua chai lớn hơn.",
    createdAt: "2026-03-20",
  },
  {
    id: "rev-4",
    productId: "sp-009",
    customerName: "Anh Phạm Đức Nam",
    rating: 5,
    comment: "Combo mực + cá rất tiện lợi, tiết kiệm hơn mua lẻ. Mực và cá đều tươi ngon, đóng gói đẹp — mua tặng ba mẹ, ai cũng thích. Rất recommend!",
    createdAt: "2026-03-18",
  },
  {
    id: "rev-5",
    productId: "sp-001",
    customerName: "Chị Đỗ Thị Lan",
    rating: 4,
    comment: "Mực khô một nắng Phan Thiết thơm ngon, nướng lên mềm dai vừa phải. Chỉ có điều lần này con hơi nhỏ hơn đợt trước một chút, nhưng vẫn rất hài lòng.",
    createdAt: "2026-03-12",
  },
  {
    id: "rev-6",
    productId: "sp-011",
    customerName: "Chị Vũ Thị Hoa",
    rating: 5,
    comment: "Ruốc tôm Hạ Long ngon xuất sắc! Sợi ruốc tơi, thơm mùi tôm biển, cho con ăn cháo rất hợp. Mình đặt thêm 3 hộp nữa làm quà tặng.",
    createdAt: "2026-03-05",
  },
];
