// Dữ liệu sản phẩm CALOHA - Natural Health (Trích xuất từ Google Sheets và tài liệu thiết kế)
(function() {
const PRODUCTS_DATA = [
  {
    "id": 1,
    "name": "Tinh dầu Vỏ Quýt (organic Tangerine - 10ml)",
    "subtitle": "organic Tangerine - 10ml",
    "price": 650000,
    "priceFormatted": "650.000đ",
    "category": "Cam Chanh",
    "volume": "10ml",
    "stock": 2,
    "isOrganic": true,
    "image": "assets/prod_orange.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Ép lạnh vỏ quả tươi",
    "featured": false,
    "gallery": [
      "assets/prod_orange.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 2,
    "name": "Tinh dầu Vỏ Cam Bergamot (Organic Bergamot -30ml)",
    "subtitle": "Organic Bergamot -30ml",
    "price": 1290000,
    "priceFormatted": "1.290.000đ",
    "category": "Cam Chanh",
    "volume": "30ml",
    "stock": 6,
    "isOrganic": true,
    "image": "assets/prod_orange.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Ép lạnh vỏ quả tươi",
    "featured": true,
    "gallery": [
      "assets/prod_orange.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 3,
    "name": "Tinh dầu Vỏ Cam Bergamot (Organic Bergamot -10ml)",
    "subtitle": "Organic Bergamot -10ml",
    "price": 590000,
    "priceFormatted": "590.000đ",
    "category": "Cam Chanh",
    "volume": "10ml",
    "stock": 9,
    "isOrganic": true,
    "image": "assets/prod_orange.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Ép lạnh vỏ quả tươi",
    "featured": false,
    "gallery": [
      "assets/prod_orange.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 4,
    "name": "Tinh dầu Chanh (Lemon Organic-30ml)",
    "subtitle": "Lemon Organic-30ml",
    "price": 590000,
    "priceFormatted": "590.000đ",
    "category": "Cam Chanh",
    "volume": "30ml",
    "stock": 3,
    "isOrganic": true,
    "image": "assets/prod_lemongrass.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Ép lạnh vỏ quả tươi",
    "featured": false,
    "gallery": [
      "assets/prod_lemongrass.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 5,
    "name": "Tinh dầu Chanh (Lemon Organic-10ml)",
    "subtitle": "Lemon Organic-10ml",
    "price": 490000,
    "priceFormatted": "490.000đ",
    "category": "Cam Chanh",
    "volume": "10ml",
    "stock": 9,
    "isOrganic": true,
    "image": "assets/prod_lemongrass.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Ép lạnh vỏ quả tươi",
    "featured": false,
    "gallery": [
      "assets/prod_lemongrass.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 6,
    "name": "Tinh dầu Sả Chanh (Lemongrass Organic - 10ml)",
    "subtitle": "Lemongrass Organic - 10ml",
    "price": 370000,
    "priceFormatted": "370.000đ",
    "category": "Cam Chanh",
    "volume": "10ml",
    "stock": 7,
    "isOrganic": true,
    "image": "assets/prod_lemongrass.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Ép lạnh vỏ quả tươi",
    "featured": true,
    "gallery": [
      "assets/prod_lemongrass.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 7,
    "name": "Tinh dầu Sả Chanh (Lemongrass Organic - 30ml)",
    "subtitle": "Lemongrass Organic - 30ml",
    "price": 690000,
    "priceFormatted": "690.000đ",
    "category": "Cam Chanh",
    "volume": "30ml",
    "stock": 3,
    "isOrganic": true,
    "image": "assets/prod_lemongrass.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Ép lạnh vỏ quả tươi",
    "featured": false,
    "gallery": [
      "assets/prod_lemongrass.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 8,
    "name": "Tinh dầu Cam Ngọt (Organic Sweet Orange -100ml)",
    "subtitle": "Organic Sweet Orange -100ml",
    "price": 1090000,
    "priceFormatted": "1.090.000đ",
    "category": "Cam Chanh",
    "volume": "100ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/prod_orange.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Ép lạnh vỏ quả tươi",
    "featured": true,
    "gallery": [
      "assets/prod_orange.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 9,
    "name": "Tinh dầu Cam Ngọt (Organic Sweet Orange -30ml )",
    "subtitle": "Organic Sweet Orange -30ml ",
    "price": 550000,
    "priceFormatted": "550.000đ",
    "category": "Cam Chanh",
    "volume": "30ml",
    "stock": 2,
    "isOrganic": true,
    "image": "assets/prod_orange.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Ép lạnh vỏ quả tươi",
    "featured": false,
    "gallery": [
      "assets/prod_orange.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 10,
    "name": "Tinh dầu Cam Ngọt (Organic Sweet Orange -10ml )",
    "subtitle": "Organic Sweet Orange -10ml ",
    "price": 370000,
    "priceFormatted": "370.000đ",
    "category": "Cam Chanh",
    "volume": "10ml",
    "stock": 7,
    "isOrganic": true,
    "image": "assets/prod_orange.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Ép lạnh vỏ quả tươi",
    "featured": true,
    "gallery": [
      "assets/prod_orange.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 11,
    "name": "Tinh dầu Bưởi Hồng (Organic Pink Grapefruit - 10 ml)",
    "subtitle": "Organic Pink Grapefruit - 10 ml",
    "price": 690000,
    "priceFormatted": "690.000đ",
    "category": "Cam Chanh",
    "volume": "10 ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/prod_orange.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Ép lạnh vỏ quả tươi",
    "featured": false,
    "gallery": [
      "assets/prod_orange.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 12,
    "name": "Tinh dầu Bạch Đàn Chanh hữu cơ (Organic Lemon Eucalyptus - 10 ml)",
    "subtitle": "Organic Lemon Eucalyptus - 10 ml",
    "price": 450000,
    "priceFormatted": "450.000đ",
    "category": "Cam Chanh",
    "volume": "10 ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/prod_lemongrass.jpg",
    "note": "Top Note (Hương đầu)",
    "aroma": "Ngọt mát, tươi sáng, phấn chấn tinh thần",
    "benefits": [
      "Nâng cao tinh thần",
      "Khử mùi không gian",
      "Hỗ trợ tập trung"
    ],
    "uses": "Khuếch tán phòng làm việc, phòng khách; nhỏ vài giọt vào bồn tắm",
    "origin": "Ý / Việt Nam",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/prod_lemongrass.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 13,
    "name": "Tinh dầu Gỗ Hoàng Đàn Atlas ( Organic Cedarwood Atlas - 10ml )",
    "subtitle": " Organic Cedarwood Atlas - 10ml ",
    "price": 350000,
    "priceFormatted": "350.000đ",
    "category": "Gỗ",
    "volume": "10ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/prod_sandalwood.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": true,
    "gallery": [
      "assets/prod_sandalwood.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 14,
    "name": "Tinh dầu Vỏ Quế Cassia  (Organic Cinnamon Cassia - 10ml)",
    "subtitle": "Organic Cinnamon Cassia - 10ml",
    "price": 470000,
    "priceFormatted": "470.000đ",
    "category": "Gỗ",
    "volume": "10ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_woody.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_woody.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 15,
    "name": "Tinh dầu Bách Địa Trung Hải (Organic Cypress - 10ml)",
    "subtitle": "Organic Cypress - 10ml",
    "price": 490000,
    "priceFormatted": "490.000đ",
    "category": "Gỗ",
    "volume": "10ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_woody.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_woody.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 16,
    "name": "Tinh dầu Bạch Xù (Organic Juniper Berry - 10ml)",
    "subtitle": "Organic Juniper Berry - 10ml",
    "price": 790000,
    "priceFormatted": "790.000đ",
    "category": "Gỗ",
    "volume": "10ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_woody.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_woody.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 17,
    "name": "Tinh dầu Lãnh Sam Nhựa Thơm (Organic Balsam Fir - 10ml)",
    "subtitle": "Organic Balsam Fir - 10ml",
    "price": 490000,
    "priceFormatted": "490.000đ",
    "category": "Gỗ",
    "volume": "10ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_woody.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_woody.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 18,
    "name": "Tinh dầu Mộc Dược (Organic Myrrh - 10ml)",
    "subtitle": "Organic Myrrh - 10ml",
    "price": 650000,
    "priceFormatted": "650.000đ",
    "category": "Gỗ",
    "volume": "10ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_woody.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_woody.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 19,
    "name": "Tinh dầu Cỏ Hương Lau (Organic Vetiver-5ml)",
    "subtitle": "Organic Vetiver-5ml",
    "price": 850000,
    "priceFormatted": "850.000đ",
    "category": "Gỗ",
    "volume": "5ml",
    "stock": 2,
    "isOrganic": true,
    "image": "assets/cat_woody.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_woody.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 20,
    "name": "Tinh dầu Cỏ Xạ Hương (Organic Thyme Thymol-5ml)",
    "subtitle": "Organic Thyme Thymol-5ml",
    "price": 550000,
    "priceFormatted": "550.000đ",
    "category": "Gỗ",
    "volume": "5ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/prod_peppermint.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/prod_peppermint.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 21,
    "name": "Tinh dầu Đàn Hương Ấn Độ (Organic Indian Sandalwood Essential Oil - 10 ml)",
    "subtitle": "Organic Indian Sandalwood Essential Oil - 10 ml",
    "price": 3590000,
    "priceFormatted": "3.590.000đ",
    "category": "Gỗ",
    "volume": "10 ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/prod_sandalwood.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": true,
    "gallery": [
      "assets/prod_sandalwood.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 22,
    "name": "Tinh dầu Đàn Hương Ấn Độ (Organic Indian Sandalwood Essential Oil - 2.5 ml)",
    "subtitle": "Organic Indian Sandalwood Essential Oil - 2.5 ml",
    "price": 1450000,
    "priceFormatted": "1.450.000đ",
    "category": "Gỗ",
    "volume": "2.5 ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/prod_sandalwood.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/prod_sandalwood.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 23,
    "name": "Tinh dầu Đàn Hương Trắng Úc (Organic Sandalwood Australia - 5ml)",
    "subtitle": "Organic Sandalwood Australia - 5ml",
    "price": 1290000,
    "priceFormatted": "1.290.000đ",
    "category": "Gỗ",
    "volume": "5ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/prod_sandalwood.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/prod_sandalwood.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 24,
    "name": "Tinh dầu Hoắc Hương (Organic Patchouli Essential Oil - 10 ml)",
    "subtitle": "Organic Patchouli Essential Oil - 10 ml",
    "price": 590000,
    "priceFormatted": "590.000đ",
    "category": "Gỗ",
    "volume": "10 ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/cat_woody.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_woody.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 25,
    "name": "Tinh dầu Trầm Hương (Organic  Frankincense Caterii - 10ml)",
    "subtitle": "Organic  Frankincense Caterii - 10ml",
    "price": 790000,
    "priceFormatted": "790.000đ",
    "category": "Gỗ",
    "volume": "10ml",
    "stock": 3,
    "isOrganic": true,
    "image": "assets/cat_woody.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": true,
    "gallery": [
      "assets/cat_woody.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 26,
    "name": "Tinh dầu Thông Scotland (Organic Scots Pine - 10ml)",
    "subtitle": "Organic Scots Pine - 10ml",
    "price": 450000,
    "priceFormatted": "450.000đ",
    "category": "Gỗ",
    "volume": "10ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/cat_woody.jpg",
    "note": "Base Note (Hương cuối)",
    "aroma": "Trầm ấm, sâu lắng, mộc mạc và tĩnh tại",
    "benefits": [
      "An thần",
      "Cân bằng cảm xúc",
      "Thiền định & ngủ sâu"
    ],
    "uses": "Xông phòng ngủ, phòng thiền; tạo nốt hương lưu hương cho nước hoa tự nhiên",
    "origin": "Ấn Độ / Mỹ",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_woody.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 27,
    "name": "Tinh dầu Gừng (Organic Ginger Root) 10ml",
    "subtitle": "Organic Ginger Root",
    "price": 850000,
    "priceFormatted": "850.000đ",
    "category": "Thảo Mộc",
    "volume": "10ml",
    "stock": 2,
    "isOrganic": true,
    "image": "assets/cat_herbal.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": true,
    "gallery": [
      "assets/cat_herbal.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 28,
    "name": "Tinh dầu Hương Thảo (Organic Rosemary 1,8-Cineole - 10ml)",
    "subtitle": "Organic Rosemary 1,8-Cineole - 10ml",
    "price": 450000,
    "priceFormatted": "450.000đ",
    "category": "Thảo Mộc",
    "volume": "10ml",
    "stock": 3,
    "isOrganic": true,
    "image": "assets/cat_herbal.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_herbal.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 29,
    "name": "Tinh dầu đinh hương (Clove Buld - 10ml)",
    "subtitle": "Clove Buld - 10ml",
    "price": 590000,
    "priceFormatted": "590.000đ",
    "category": "Thảo Mộc",
    "volume": "10ml",
    "stock": 2,
    "isOrganic": false,
    "image": "assets/cat_herbal.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_herbal.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 30,
    "name": "Tinh dầu Tiểu Đậu Khấu (Cardamon - 5ml)",
    "subtitle": "Cardamon - 5ml",
    "price": 690000,
    "priceFormatted": "690.000đ",
    "category": "Thảo Mộc",
    "volume": "5ml",
    "stock": 2,
    "isOrganic": false,
    "image": "assets/cat_herbal.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_herbal.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 31,
    "name": "Tinh dầu Nhựa  Copaiba (Organic Copaiba Oleoresin - 10ml)",
    "subtitle": "Organic Copaiba Oleoresin - 10ml",
    "price": 450000,
    "priceFormatted": "450.000đ",
    "category": "Thảo Mộc",
    "volume": "10ml",
    "stock": 2,
    "isOrganic": true,
    "image": "assets/cat_woody.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_woody.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 32,
    "name": "Tinh dầu Nghệ (Organic Turmeric CO2 Extract-10ml)",
    "subtitle": "Organic Turmeric CO2 Extract-10ml",
    "price": 490000,
    "priceFormatted": "490.000đ",
    "category": "Thảo Mộc",
    "volume": "10ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_herbal.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_herbal.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 33,
    "name": "Tinh dầu Kinh Giới Dại (Organic Oregano - 10ml)",
    "subtitle": "Organic Oregano - 10ml",
    "price": 490000,
    "priceFormatted": "490.000đ",
    "category": "Thảo Mộc",
    "volume": "10ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_herbal.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_herbal.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 34,
    "name": "Tinh dầu Khuynh Diệp Cầu (Organic Eucalyptus Globulus Essential Oil - 10ml)",
    "subtitle": "Organic Eucalyptus Globulus Essential Oil - 10ml",
    "price": 450000,
    "priceFormatted": "450.000đ",
    "category": "Thảo Mộc",
    "volume": "10ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/prod_lemongrass.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/prod_lemongrass.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 35,
    "name": "Tinh dầu Khuynh Diệp Cầu (Organic Eucalyptus Globulus Essential Oil - 30ml)",
    "subtitle": "Organic Eucalyptus Globulus Essential Oil - 30ml",
    "price": 590000,
    "priceFormatted": "590.000đ",
    "category": "Thảo Mộc",
    "volume": "30ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/prod_lemongrass.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/prod_lemongrass.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 36,
    "name": "Tinh dầu Kinh Giới Ô Ngọt (Organic Sweet Marjoram-10ml)",
    "subtitle": "Organic Sweet Marjoram-10ml",
    "price": 590000,
    "priceFormatted": "590.000đ",
    "category": "Thảo Mộc",
    "volume": "10ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/cat_herbal.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_herbal.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 37,
    "name": "Tinh dầu Xô Thơm  (Organic Clary Sage Essential Oil - 10 ml)",
    "subtitle": "Organic Clary Sage Essential Oil - 10 ml",
    "price": 690000,
    "priceFormatted": "690.000đ",
    "category": "Thảo Mộc",
    "volume": "10 ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/cat_herbal.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_herbal.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 38,
    "name": "Tinh dầu Bạc Hà (Peppermint Organic -100ml)",
    "subtitle": "Peppermint Organic -100ml",
    "price": 1790000,
    "priceFormatted": "1.790.000đ",
    "category": "Thảo Mộc",
    "volume": "100ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/prod_peppermint.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": true,
    "gallery": [
      "assets/prod_peppermint.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 39,
    "name": "Tinh dầu Bạc Hà (Peppermint Organic -30ml)",
    "subtitle": "Peppermint Organic -30ml",
    "price": 790000,
    "priceFormatted": "790.000đ",
    "category": "Thảo Mộc",
    "volume": "30ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/prod_peppermint.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/prod_peppermint.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 40,
    "name": "Tinh dầu Bạc Hà (Peppermint Organic -10ml)",
    "subtitle": "Peppermint Organic -10ml",
    "price": 450000,
    "priceFormatted": "450.000đ",
    "category": "Thảo Mộc",
    "volume": "10ml",
    "stock": 10,
    "isOrganic": true,
    "image": "assets/prod_peppermint.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": true,
    "gallery": [
      "assets/prod_peppermint.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 41,
    "name": "Tinh dầu Bạc Hà Lục (organic Spearmint - 10ml)",
    "subtitle": "organic Spearmint - 10ml",
    "price": 450000,
    "priceFormatted": "450.000đ",
    "category": "Thảo Mộc",
    "volume": "10ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/prod_peppermint.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/prod_peppermint.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 42,
    "name": "Tinh dầu Tràm Trà (Organic Tea Tree - 10 ml)",
    "subtitle": "Organic Tea Tree - 10 ml",
    "price": 490000,
    "priceFormatted": "490.000đ",
    "category": "Thảo Mộc",
    "volume": "10 ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/cat_herbal.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": true,
    "gallery": [
      "assets/cat_herbal.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 43,
    "name": "Tinh dầu Tràm Trà (Organic Tea Tree - 30 ml)",
    "subtitle": "Organic Tea Tree - 30 ml",
    "price": 650000,
    "priceFormatted": "650.000đ",
    "category": "Thảo Mộc",
    "volume": "30 ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/cat_herbal.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_herbal.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 44,
    "name": "Tinh dầu Sả Hoa Hồng (Palmarosa - 10 ml)",
    "subtitle": "Palmarosa - 10 ml",
    "price": 490000,
    "priceFormatted": "490.000đ",
    "category": "Thảo Mộc",
    "volume": "10 ml",
    "stock": 5,
    "isOrganic": false,
    "image": "assets/prod_lemongrass.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/prod_lemongrass.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 45,
    "name": "Tinh dầu Húng Quế (Organic Basil Linalool - 10 ml)",
    "subtitle": "Organic Basil Linalool - 10 ml",
    "price": 650000,
    "priceFormatted": "650.000đ",
    "category": "Thảo Mộc",
    "volume": "10 ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/cat_herbal.jpg",
    "note": "Middle Note (Hương giữa)",
    "aroma": "Thảo mộc thanh mát",
    "benefits": [
      "Kháng khuẩn",
      "Thanh lọc không khí",
      "Giảm căng thẳng"
    ],
    "uses": "Khuếch tán với máy xông 3-5 giọt; hoặc pha với dầu nền massage 1-2%",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_herbal.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 46,
    "name": "Tinh dầu Hoa Oải Hương (Organic Lavender  - 100ml)",
    "subtitle": "Organic Lavender  - 100ml",
    "price": 1590000,
    "priceFormatted": "1.590.000đ",
    "category": "Hoa",
    "volume": "100ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/prod_lavender.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": true,
    "gallery": [
      "assets/prod_lavender.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 47,
    "name": "Tinh dầu Hoa Oải Hương (Organic Lavender  - 30ml)",
    "subtitle": "Organic Lavender  - 30ml",
    "price": 690000,
    "priceFormatted": "690.000đ",
    "category": "Hoa",
    "volume": "30ml",
    "stock": 10,
    "isOrganic": true,
    "image": "assets/prod_lavender.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/prod_lavender.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 48,
    "name": "Tinh dầu Hoa Oải Hương (Organic Lavender Organic - 10ml)",
    "subtitle": "Organic Lavender Organic - 10ml",
    "price": 350000,
    "priceFormatted": "350.000đ",
    "category": "Hoa",
    "volume": "10ml",
    "stock": 3,
    "isOrganic": true,
    "image": "assets/prod_lavender.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": true,
    "gallery": [
      "assets/prod_lavender.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 49,
    "name": "Tinh dầu Ngọc Lan Tây (Organic Ylang Ylang Complete-30ml)",
    "subtitle": "Organic Ylang Ylang Complete-30ml",
    "price": 1290000,
    "priceFormatted": "1.290.000đ",
    "category": "Hoa",
    "volume": "30ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_floral.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": true,
    "gallery": [
      "assets/cat_floral.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 50,
    "name": "Tinh dầu Ngọc Lan Tây (Organic Ylang Ylang Complete-10ml)",
    "subtitle": "Organic Ylang Ylang Complete-10ml",
    "price": 650000,
    "priceFormatted": "650.000đ",
    "category": "Hoa",
    "volume": "10ml",
    "stock": 7,
    "isOrganic": true,
    "image": "assets/cat_floral.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_floral.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 51,
    "name": "Tinh dầu hoa nhài (Organic Jasmine Absolute - 2.5ml)",
    "subtitle": "Organic Jasmine Absolute - 2.5ml",
    "price": 2090000,
    "priceFormatted": "2.090.000đ",
    "category": "Hoa",
    "volume": "2.5ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/prod_jasmine.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/prod_jasmine.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 52,
    "name": "Tinh dầu Cúc La Mã (Organic Roman Chamonmile-2.5ml)",
    "subtitle": "Organic Roman Chamonmile-2.5ml",
    "price": 990000,
    "priceFormatted": "990.000đ",
    "category": "Hoa",
    "volume": "2.5ml",
    "stock": 2,
    "isOrganic": true,
    "image": "assets/cat_floral.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_floral.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 53,
    "name": "Tinh dầu Hoa Cam Đắng(Organic Neroli 5ml)",
    "subtitle": "Organic Neroli 5ml",
    "price": 2200000,
    "priceFormatted": "2.200.000đ",
    "category": "Hoa",
    "volume": "5ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_floral.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_floral.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 54,
    "name": "Tinh dầu Hoa Cam Đắng(Organic Neroli 2.5ml)",
    "subtitle": "Organic Neroli 2.5ml",
    "price": 1290000,
    "priceFormatted": "1.290.000đ",
    "category": "Hoa",
    "volume": "2.5ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_floral.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_floral.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 55,
    "name": "Tinh dầu Phong Lữ Ai Cập (Organic Egyptian Gerainum - 10ml)",
    "subtitle": "Organic Egyptian Gerainum - 10ml",
    "price": 590000,
    "priceFormatted": "590.000đ",
    "category": "Hoa",
    "volume": "10ml",
    "stock": 2,
    "isOrganic": true,
    "image": "assets/cat_floral.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_floral.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 56,
    "name": "Tinh dầu Phong Lữ Ai Cập (Organic Egyptian Gerainum - 5ml)",
    "subtitle": "Organic Egyptian Gerainum - 5ml",
    "price": 490000,
    "priceFormatted": "490.000đ",
    "category": "Hoa",
    "volume": "5ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_floral.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_floral.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 57,
    "name": "Tinh dầu Hoa Hồng (Organic Rose Absolute - 5ml)",
    "subtitle": "Organic Rose Absolute - 5ml",
    "price": 2990000,
    "priceFormatted": "2.990.000đ",
    "category": "Hoa",
    "volume": "5ml",
    "stock": 4,
    "isOrganic": true,
    "image": "assets/prod_rose.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": true,
    "gallery": [
      "assets/prod_rose.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 58,
    "name": "Tinh dầu Cúc Bất Tử (Organic Helichrysum Italicum-2.5ml)",
    "subtitle": "Organic Helichrysum Italicum-2.5ml",
    "price": 990000,
    "priceFormatted": "990.000đ",
    "category": "Hoa",
    "volume": "2.5ml",
    "stock": 2,
    "isOrganic": true,
    "image": "assets/cat_floral.jpg",
    "note": "Middle/Top Note (Hương giữa/đầu)",
    "aroma": "Dịu ngọt, quyến rũ, thanh tao và lãng mạn",
    "benefits": [
      "Thư giãn thần kinh",
      "Hỗ trợ giấc ngủ ngon",
      "Dưỡng ẩm và làm dịu da"
    ],
    "uses": "Xông phòng ngủ, massage thư giãn cùng dầu nền, nhỏ vào gối ngủ",
    "origin": "Pháp / Ai Cập",
    "method": "Chưng cất lôi cuốn hơi nước (Steam Distillation)",
    "featured": false,
    "gallery": [
      "assets/cat_floral.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 59,
    "name": "Dầu Jojoba Vàng Ép Lạnh (Organic Golden Jojoba Oil)",
    "subtitle": "Organic Golden Jojoba Oil",
    "price": 1590000,
    "priceFormatted": "1.590.000đ",
    "category": "Dầu Nền",
    "volume": "100ml",
    "stock": 5,
    "isOrganic": true,
    "image": "assets/cat_carrier.jpg",
    "note": "Dầu nền thực vật ép lạnh (Carrier Oil)",
    "aroma": "Dịu nhẹ tự nhiên không mùi hắc",
    "benefits": [
      "Cấp ẩm sâu",
      "Chứa Vitamin E dồi dào",
      "Dung môi lý tưởng để hòa tan tinh dầu"
    ],
    "uses": "Thoa trực tiếp lên da/tóc; pha 10-15 giọt tinh dầu nguyên chất vào 30ml dầu nền để massage body",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Ép lạnh nguyên chất (Cold-Pressed)",
    "featured": true,
    "gallery": [
      "assets/cat_carrier.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 60,
    "name": "Dầu Dừa Tinh Khiết (Fractionated Coconut Oil)",
    "subtitle": "Fractionated Coconut Oil",
    "price": 990000,
    "priceFormatted": "990.000đ",
    "category": "Dầu Nền",
    "volume": "100ml",
    "stock": 8,
    "isOrganic": true,
    "image": "assets/cat_carrier.jpg",
    "note": "Dầu nền thực vật ép lạnh (Carrier Oil)",
    "aroma": "Dịu nhẹ tự nhiên không mùi hắc",
    "benefits": [
      "Cấp ẩm sâu",
      "Chứa Vitamin E dồi dào",
      "Dung môi lý tưởng để hòa tan tinh dầu"
    ],
    "uses": "Thoa trực tiếp lên da/tóc; pha 10-15 giọt tinh dầu nguyên chất vào 30ml dầu nền để massage body",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Ép lạnh nguyên chất (Cold-Pressed)",
    "featured": false,
    "gallery": [
      "assets/cat_carrier.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 61,
    "name": "Dầu Tầm Xuân Ép Lạnh (Organic Rosehip Seed Oil)",
    "subtitle": "Organic Rosehip Seed Oil",
    "price": 1250000,
    "priceFormatted": "1.250.000đ",
    "category": "Dầu Nền",
    "volume": "100ml",
    "stock": 1,
    "isOrganic": true,
    "image": "assets/cat_carrier.jpg",
    "note": "Dầu nền thực vật ép lạnh (Carrier Oil)",
    "aroma": "Dịu nhẹ tự nhiên không mùi hắc",
    "benefits": [
      "Cấp ẩm sâu",
      "Chứa Vitamin E dồi dào",
      "Dung môi lý tưởng để hòa tan tinh dầu"
    ],
    "uses": "Thoa trực tiếp lên da/tóc; pha 10-15 giọt tinh dầu nguyên chất vào 30ml dầu nền để massage body",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Ép lạnh nguyên chất (Cold-Pressed)",
    "featured": false,
    "gallery": [
      "assets/cat_carrier.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  },
  {
    "id": 62,
    "name": "Dầu Mù U Nguyên Chất (Organic Tamanu Oil)",
    "subtitle": "Organic Tamanu Oil",
    "price": 990000,
    "priceFormatted": "990.000đ",
    "category": "Dầu Nền",
    "volume": "100ml",
    "stock": 2,
    "isOrganic": true,
    "image": "assets/cat_carrier.jpg",
    "note": "Dầu nền thực vật ép lạnh (Carrier Oil)",
    "aroma": "Dịu nhẹ tự nhiên không mùi hắc",
    "benefits": [
      "Cấp ẩm sâu",
      "Chứa Vitamin E dồi dào",
      "Dung môi lý tưởng để hòa tan tinh dầu"
    ],
    "uses": "Thoa trực tiếp lên da/tóc; pha 10-15 giọt tinh dầu nguyên chất vào 30ml dầu nền để massage body",
    "origin": "Madagascar / Tây Ban Nha",
    "method": "Ép lạnh nguyên chất (Cold-Pressed)",
    "featured": false,
    "gallery": [
      "assets/cat_carrier.jpg",
      "assets/story_distillation.jpg",
      "assets/hero_banner.jpg"
    ]
  }
];

const CATEGORIES_DATA = [
  {
    id: 'Cam Chanh',
    name: 'Hương Cam Chanh',
    enName: 'Citrus Fresh',
    tagline: 'Tươi sáng, sảng khoái & tràn đầy năng lượng tươi mới',
    count: PRODUCTS_DATA.filter(p => p.category === 'Cam Chanh').length,
    image: 'assets/cat_citrus.jpg',
    color: '#e67e22',
    description: 'Chiết xuất từ vỏ các loại quả có múi mọng nước, mang nốt hương đầu tươi vui, giúp kích thích giác quan, xua tan mệt mỏi và khử khuẩn không gian sống.'
  },
  {
    id: 'Gỗ',
    name: 'Hương Gỗ',
    enName: 'Woody & Resins',
    tagline: 'Trầm ấm, tĩnh tại & cân bằng nội tâm',
    count: PRODUCTS_DATA.filter(p => p.category === 'Gỗ').length,
    image: 'assets/cat_woody.jpg',
    color: '#795548',
    description: 'Hương thơm từ vỏ cây, gỗ quý và nhựa thơm thiên nhiên. Mang đến sự vững chãi, bình yên sâu sắc, là lựa chọn tuyệt vời cho các buổi thiền định và thư giãn sâu.'
  },
  {
    id: 'Thảo Mộc',
    name: 'Hương Thảo Mộc',
    enName: 'Herbal & Green',
    tagline: 'Thanh sạch, thông thoáng đường hô hấp & giải tỏa áp lực',
    count: PRODUCTS_DATA.filter(p => p.category === 'Thảo Mộc').length,
    image: 'assets/cat_herbal.jpg',
    color: '#2e7d32',
    description: 'Tinh chất từ lá bạc hà, tràm trà, hương thảo, xô thơm... Hỗ trợ hô hấp khỏe mạnh, kháng khuẩn tự nhiên, đuổi côn trùng và làm mới tinh thần.'
  },
  {
    id: 'Hoa',
    name: 'Hương Hoa',
    enName: 'Floral Blooms',
    tagline: 'Dịu ngọt, quý phái & vỗ về giấc ngủ sâu',
    count: PRODUCTS_DATA.filter(p => p.category === 'Hoa').length,
    image: 'assets/cat_floral.jpg',
    color: '#ad1457',
    description: 'Chắt lọc từ những cánh hoa oải hương, ngọc lan tây, hoa hồng, hoa nhài tuyển chọn. Giúp xoa dịu lo âu, cân bằng cảm xúc và nuôi dưỡng vẻ đẹp làn da.'
  },
  {
    id: 'Dầu Nền',
    name: 'Dầu Nền Hữu Cơ',
    enName: 'Organic Carrier Oils',
    tagline: 'Dung môi hoàn hảo & nuôi dưỡng làn da thuần khiết',
    count: PRODUCTS_DATA.filter(p => p.category === 'Dầu Nền').length,
    image: 'assets/cat_carrier.jpg',
    color: '#d4ac0d',
    description: 'Dầu thực vật ép lạnh giàu acid béo và Vitamin E. Dùng để pha loãng tinh dầu nguyên chất massage an toàn cho da, hoặc dưỡng ẩm tóc và toàn thân.'
  }
];

const ARTICLES_DATA = [
  {
    id: 'so-sanh-cam-ngot-bergamot',
    title: 'So Sánh: Tinh Dầu Cam Ngọt (Sweet Orange) vs Tinh Dầu Vỏ Cam Bergamot',
    category: 'So Sánh Sản Phẩm',
    date: '14/09/2026',
    readTime: '5 phút đọc',
    image: 'assets/cat_citrus.jpg',
    summary: 'Cùng thuộc nhóm hương Cam Chanh tươi sáng, nhưng Cam Ngọt và Bergamot lại có nốt hương và liệu pháp trị liệu tinh thần khác nhau rõ rệt. Hãy xem bài so sánh chi tiết.',
    content: `
      <h3>1. Xuất xứ và đặc tính nguyên liệu</h3>
      <p><strong>Cam Ngọt (Sweet Orange - Citrus sinensis):</strong> Được ép lạnh từ vỏ quả cam vàng chín mọng dưới ánh nắng Địa Trung Hải hoặc Việt Nam. Hương thơm mọng nước, ấm áp, thân thiện và ngọt ngào.</p>
      <p><strong>Cam Bergamot (Citrus bergamia):</strong> Là loại quả lai đặc hữu vùng Calabria nước Ý. Vỏ Bergamot chứa hàm lượng tinh dầu quý giá với nốt hương cam chanh thanh tao kết hợp hương hoa cỏ và vị đắng nhẹ đặc trưng (thành phần tạo nên mùi trà Bá Tước - Earl Grey trứ danh).</p>
      <h3>2. Tác dụng trị liệu tinh thần (Aromatherapy)</h3>
      <ul>
        <li><strong>Cam Ngọt:</strong> Kích thích sự vui vẻ, xua tan áp lực công việc, tạo bầu không khí ấm cúng cho cả gia đình và đặc biệt an toàn, dễ chịu với trẻ nhỏ.</li>
        <li><strong>Bergamot:</strong> Được mệnh danh là "liệu pháp chống lo âu tự nhiên", giúp xoa dịu các cơn khủng hoảng cảm xúc, cân bằng tâm trạng thất thường và hỗ trợ cải thiện chứng trầm cảm nhẹ.</li>
      </ul>
      <h3>3. Ứng dụng thực tế</h3>
      <p>Nên chọn <strong>Cam Ngọt</strong> khi bạn muốn khuếch tán phòng khách, bếp hoặc phòng sinh hoạt chung để khử mùi thức ăn và tạo cảm giác tươi vui. Hãy chọn <strong>Bergamot</strong> cho góc làm việc cá nhân, phòng đọc sách hoặc không gian spa cần sự tĩnh lặng, sang trọng.</p>
    `
  },
  {
    id: 'so-sanh-tram-gio-tram-tra',
    title: 'So Sánh: Tinh Dầu Tràm Gió (Cajeput) vs Tinh Dầu Tràm Trà (Tea Tree)',
    category: 'So Sánh Sản Phẩm',
    date: '13/09/2026',
    readTime: '6 phút đọc',
    image: 'assets/cat_herbal.jpg',
    summary: 'Rất nhiều người nhầm lẫn giữa Tràm Gió và Tràm Trà. Bài viết phân tích cấu trúc hoạt chất Cineol vs Terpinen-4-ol để giúp bạn sử dụng đúng mục đích giữ ấm hoặc trị mụn.',
    content: `
      <h3>1. Sự khác biệt về thành phần hoạt chất cốt lõi</h3>
      <p><strong>Tràm Gió (Cajeput - Melaleuca cajuputi):</strong> Giàu hoạt chất <em>1,8-Cineole (Eucalyptol)</em> chiếm từ 45% - 65%. Hợp chất này có tính ấm, làm loãng đờm nhớt, làm thông thoáng đường thở và giữ ấm cơ thể cực tốt.</p>
      <p><strong>Tràm Trà (Tea Tree - Melaleuca alternifolia):</strong> Giàu hoạt chất <em>Terpinen-4-ol</em> (trên 35-40%). Đây là chất kháng khuẩn, kháng nấm và ức chế vi khuẩn P.acnes gây mụn trứng cá mạnh mẽ nhất trong tự nhiên.</p>
      <h3>2. Bảng so sánh ứng dụng chuẩn khoa học</h3>
      <ul>
        <li><strong>Giữ ấm, phòng cảm lạnh, trị ho nghẹt mũi cho bé và người lớn:</strong> Sử dụng <strong>Tràm Gió</strong> (thoa lòng bàn chân, nhỏ vài giọt vào nước tắm, xoa lưng ngực).</li>
        <li><strong>Chăm sóc da mụn, kháng viêm ổ mụn, khử trùng vết trầy xước, nấm móng:</strong> Sử dụng <strong>Tràm Trà</strong> (chấm điểm mụn hoặc pha vào sữa rửa mặt).</li>
      </ul>
    `
  },
  {
    id: 'so-sanh-lavender-phap-bulgaria',
    title: 'So Sánh: Tinh Dầu Oải Hương Pháp (Provence) vs Oải Hương Bulgaria',
    category: 'So Sánh Sản Phẩm',
    date: '12/09/2026',
    readTime: '4 phút đọc',
    image: 'assets/prod_lavender.jpg',
    summary: 'Hai cái nôi sản sinh ra những giọt tinh dầu Lavender trứ danh thế giới. Đâu là sự khác biệt giữa phong vị ngọt ngào thảo mộc của Pháp và hương hoa đượm sâu của Bulgaria?',
    content: `
      <h3>1. Điều kiện thổ nhưỡng và khí hậu</h3>
      <p>Oải hương Pháp trồng trên các cao nguyên vùng Provence với độ cao trên 800m, hấp thụ khí hậu khô ráo Địa Trung Hải tạo nên hàm lượng Linalyl Acetate thanh thoát.</p>
      <p>Oải hương Bulgaria trồng tại thung lũng Hoa Hồng với lượng mưa dồi dào và đất đai màu mỡ, cho ra nốt hương đậm đà, tròn trịa và bền mùi hơn.</p>
      <h3>2. Trải nghiệm khứu giác</h3>
      <p><strong>Lavender Pháp:</strong> Mang nốt hương đầu tươi mát, phảng phất hương thảo mộc khô tự nhiên, thích hợp cho ban ngày và xông phòng làm dịu căng thẳng tức thì.</p>
      <p><strong>Lavender Bulgaria:</strong> Hương hoa đậm sâu, ngọt ngào, hậu vị ấm và lưu hương lâu trên gối ngủ, là lựa chọn số 1 cho người bị mất ngủ kinh niên.</p>
    `
  },
  {
    id: 'kien-thuc-phan-biet',
    title: 'Cách Phân Biệt Tinh Dầu Thiên Nhiên Nguyên Chất Và Hương Liệu Hóa Học Tổng Hợp',
    category: 'Kiến Thức Tinh Dầu',
    date: '11/09/2026',
    readTime: '5 phút đọc',
    image: 'assets/story_distillation.jpg',
    summary: 'Làm thế nào để nhận biết lọ tinh dầu bạn mua có thực sự chiết xuất 100% từ thiên nhiên hay chỉ là mùi thơm tổng hợp công nghiệp? Xem ngay các mẹo kiểm tra trên giấy trắng và nhiệt độ bay hơi.',
    content: `
      <h3>1. Phân biệt qua hiện tượng bay hơi trên giấy trắng</h3>
      <p>Nhỏ 1 giọt tinh dầu lên tờ giấy trắng tinh khiết. Tinh dầu nguyên chất có cấu trúc phân tử nhẹ, sau 1-2 giờ sẽ bay hơi hoàn toàn mà không để lại vệt dầu loang ố nhờn rít. Hương liệu tổng hợp thường pha dung môi hóa dầu sẽ để lại quầng ố vàng rõ rệt.</p>
      <h3>2. Kiểm tra độ hòa tan trong nước</h3>
      <p>Tinh dầu tự nhiên nhẹ hơn nước và không tan trong nước, sẽ nổi thành các giọt tròn riêng biệt trên bề mặt. Nếu giọt tinh dầu hòa tan làm đục ngầu cốc nước ngay lập tức, sản phẩm có thể đã bị pha hóa chất nhũ hóa nhân tạo.</p>
      <h3>3. Mùi hương nhiều tầng nốt (Aromatherapy Notes)</h3>
      <p>Hương liệu tổng hợp chỉ có một mùi đơn điệu, gắt mũi và nồng nặc không đổi từ đầu đến cuối. Ngược lại, tinh dầu thiên nhiên nguyên chất của CALOHA có độ chuyển biến tinh tế gồm Hương đầu, Hương giữa và Hương lắng, mang lại cảm giác dễ chịu, sâu lắng và không gây đau đầu khi ngửi lâu.</p>
    `
  },
  {
    id: 'huong-dan-ty-le-pha-loang',
    title: 'Cẩm Nang Tỷ Lệ Pha Loãng Tinh Dầu An Toàn Với Dầu Nền Cho Mọi Lứa Tuổi',
    category: 'Hướng Dẫn Sử Dụng',
    date: '10/09/2026',
    readTime: '6 phút đọc',
    image: 'assets/cat_carrier.jpg',
    summary: 'Tinh dầu nguyên chất có nồng độ dược tính cực cao, gấp 50-70 lần thảo dược tươi. Hãy cùng CALOHA học bảng tỷ lệ pha an toàn khi massage lên da mặt, toàn thân và trẻ nhỏ.',
    content: `
      <h3>1. Tại sao bắt buộc phải dùng dầu nền khi thoa lên da?</h3>
      <p>Dầu nguyên chất bay hơi rất nhanh và có hoạt tính sinh học mạnh. Dầu nền (Jojoba, Dầu Dừa, Dầu Tầm Xuân) đóng vai trò khóa ẩm, dẫn truyền các hoạt chất thấm sâu vào biểu bì và bảo vệ hàng rào lipid của da không bị kích ứng.</p>
      <h3>2. Bảng tỷ lệ vàng chuẩn chuyên gia Aromatherapy Quốc tế</h3>
      <ul>
        <li><strong>Nồng độ 0.5% - 1% (Cho da nhạy cảm & trẻ nhỏ trên 2 tuổi):</strong> Pha 3-6 giọt tinh dầu vào 30ml dầu nền.</li>
        <li><strong>Nồng độ 2% (Mức chuẩn cho massage thư giãn toàn thân người lớn):</strong> Pha 12 giọt tinh dầu vào 30ml dầu nền.</li>
        <li><strong>Nồng độ 3% - 5% (Chăm sóc điểm cục bộ, đau mỏi cơ bắp, trị mụn điểm):</strong> Pha 18-30 giọt tinh dầu vào 30ml dầu nền.</li>
      </ul>
      <h3>3. Kiểm tra kích ứng (Patch Test)</h3>
      <p>Trước khi thoa trên diện rộng, luôn pha 1 giọt tinh dầu với 1 thìa cafe dầu nền, thoa vào mặt trong cẳng tay và theo dõi phản ứng trong 24 giờ.</p>
    `
  },
  {
    id: 'bai-viet-tinh-dau-oai-huong',
    title: 'Khám Phá Chi Tiết: Tinh Dầu Hoa Oải Hương (Organic French Lavender) - Nữ Hoàng Thư Giãn',
    category: 'Bài Viết Cho Từng Sản Phẩm',
    date: '09/09/2026',
    readTime: '5 phút đọc',
    image: 'assets/prod_lavender.jpg',
    summary: 'Phân tích sâu về nguồn gốc, cấu tạo hóa học và 10 bài thuốc dân gian ứng dụng tinh dầu Oải Hương Pháp trong đời sống hiện đại.',
    content: `
      <h3>1. Đặc trưng thực vật học</h3>
      <p>Chiết xuất từ hoa <em>Lavandula angustifolia</em> thu hái tại vùng Provence (Pháp). Đây là loài oải hương có giá trị y học và mùi thơm thanh quý nhất trong các giống lavender.</p>
      <h3>2. Các công thức trị liệu phổ biến</h3>
      <ul>
        <li><strong>Giấc ngủ ngon:</strong> Khuếch tán 3 giọt Lavender + 2 giọt Cam Ngọt trước khi ngủ 30 phút.</li>
        <li><strong>Làm dịu vết bỏng nhẹ / côn trùng cắn:</strong> Chấm 1 giọt trực tiếp lên nốt muỗi đốt để giảm sưng ngứa tức thì.</li>
        <li><strong>Thư giãn cơ bắp:</strong> Pha 5 giọt Lavender vào bồn tắm nước ấm ngâm mình 15 phút.</li>
      </ul>
    `
  }
];


const TESTIMONIALS_DATA = [
  {
    name: 'Bác sĩ Minh Trang',
    title: 'Chuyên gia Trị liệu Tự nhiên & Yoga',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    content: 'Tôi đã sử dụng tinh dầu Oải Hương và Trầm Hương của CALOHA trong các lớp thiền định và trị liệu giấc ngủ cho học viên. Mùi hương vô cùng thanh khiết, tầng hương nở tự nhiên và hoàn toàn không gây gắt mũi như các loại trôi nổi trên thị trường.',
    rating: 5,
    product: 'Tinh dầu Hoa Oải Hương & Trầm Hương'
  },
  {
    name: 'Anh Hoàng Nam',
    title: 'Kiến trúc sư & Founder Studio Nội thất',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'Mỗi buổi sáng khi bắt đầu làm việc, tôi xông vài giọt Cam Bergamot cùng Bạc Hà CALOHA. Không gian studio bừng sáng, khách hàng ghé thăm đều khen ngợi mùi hương tinh tế sang trọng.',
    rating: 5,
    product: 'Tinh dầu Cam Bergamot & Bạc Hà Organic'
  },
  {
    name: 'Chị Thanh Thảo',
    title: 'Mẹ bỉm sữa 2 con',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'Tinh dầu Sả Chanh và Tràm Trà của CALOHA là vị cứu tinh cho căn nhà của gia đình tôi vào mùa mưa. Phòng ốc thơm tho, muỗi bay đi hết và các bé không còn hay bị nghẹt mũi về đêm.',
    rating: 5,
    product: 'Tinh dầu Sả Chanh & Tràm Trà Organic'
  }
];

if (typeof window !== 'undefined') {
  window.CALOHA_DATA = { PRODUCTS_DATA, CATEGORIES_DATA, ARTICLES_DATA, TESTIMONIALS_DATA };
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.CATEGORIES_DATA = CATEGORIES_DATA;
  window.ARTICLES_DATA = ARTICLES_DATA;
  window.TESTIMONIALS_DATA = TESTIMONIALS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS_DATA, CATEGORIES_DATA, ARTICLES_DATA, TESTIMONIALS_DATA };
}
})();

