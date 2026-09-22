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
    views: 1840,
    likes: 156,
    image: 'assets/cat_citrus.jpg',
    author: 'ThS. DS. Đặng Thu Hà',
    authorRole: 'Chuyên gia Trị liệu Mùi hương & Ban Cố Vấn Nghiên Cứu CALOHA',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tags: ['Cam Ngọt', 'Bergamot', 'Aromatherapy', 'So Sánh', 'Giảm Căng Thẳng'],
    relatedProductIds: [8, 9, 2, 3],
    summary: 'Cùng thuộc nhóm hương Cam Chanh tươi sáng, nhưng Cam Ngọt và Bergamot lại có nốt hương và liệu pháp trị liệu tinh thần khác nhau rõ rệt. Hãy xem bài so sánh chi tiết từ chuyên gia.',
    excerpt: 'Cùng thuộc nhóm hương Cam Chanh tươi sáng, nhưng Cam Ngọt và Bergamot lại có nốt hương và liệu pháp trị liệu tinh thần khác nhau rõ rệt. Hãy xem bài so sánh chi tiết từ chuyên gia.',
    toc: [
      { id: 'xuat-xu', title: '1. Xuất xứ & Đặc tính nguyên liệu ép lạnh' },
      { id: 'tri-lieu', title: '2. Tác dụng trị liệu tinh thần (Aromatherapy)' },
      { id: 'ung-dung', title: '3. Ứng dụng không gian sống & Phù hợp với ai?' },
      { id: 'cong-thuc', title: '4. Công thức blend phối hương đề xuất' },
      { id: 'luu-y', title: '5. Lưu ý an toàn quang học (Phototoxicity)' }
    ],
    content: `
      <p class="blog-sapo">
        Trong thế giới tinh dầu thiên nhiên, nhóm hương Cam Chanh (Citrus) luôn là sự lựa chọn mở đầu hoàn hảo nhờ cảm giác tươi mới, phấn chấn và giải tỏa mệt mỏi tức thì. Tuy nhiên, hai "ngôi sao" sáng nhất là <strong>Cam Ngọt (Sweet Orange)</strong> và <strong>Vỏ Cam Bergamot</strong> thường khiến người dùng băn khoăn khi lựa chọn. Bài viết phân tích toàn diện về thành phần hóa sinh, nốt hương trị liệu và cách ứng dụng thực tế.
      </p>

      <h2 id="xuat-xu">1. Xuất xứ & Đặc tính nguyên liệu ép lạnh</h2>
      <p>
        <strong>Cam Ngọt (Sweet Orange - Citrus sinensis):</strong> Được chiết xuất bằng phương pháp ép lạnh cơ học từ vỏ những trái cam vàng chín mọng dưới ánh nắng Địa Trung Hải hoặc vùng chuyên canh trù phú tại Việt Nam. Tinh dầu chứa tới hơn 90% hợp chất <em>d-Limonene</em> tự nhiên, tỏa hương thơm ngát, ngọt ấm, mọng nước và vô cùng gần gũi.
      </p>
      <p>
        <strong>Cam Bergamot (Citrus bergamia):</strong> Là loại quả lai quý hiếm đặc hữu vùng Calabria ven biển miền Nam nước Ý. Vỏ Bergamot có màu xanh ngọc lam chuyển dần sang vàng chanh, chứa hàm lượng tinh chất thơm phức hợp độc nhất vô nhị. Mùi hương Bergamot không chỉ có vị chua thanh của cam chanh mà còn phảng phất hương hoa thảo mộc quý phái và vị cay đắng nhẹ – chính là linh hồn tạo nên tách trà Bá Tước (Earl Grey) trứ danh của quý tộc Anh Quốc.
      </p>

      <div class="blog-quote">
        “Mùi hương Cam Ngọt tựa như một ngày nắng ấm tràn đầy niềm vui thơ trẻ; trong khi Cam Bergamot lại là sự tĩnh lặng thanh tao, một góc trà chiều sâu lắng xoa dịu những vết thương tâm hồn.”
      </div>

      <h2 id="tri-lieu">2. Tác dụng trị liệu tinh thần (Aromatherapy)</h2>
      <p>
        Mỗi loại tinh dầu tác động lên hệ thống viền não (Limbic system) theo những cơ chế khoa học rất khác biệt:
      </p>
      <ul>
        <li><strong>Cam Ngọt - Kích hoạt Hormone Hạnh Phúc:</strong> Nhờ hàm lượng Limonene vượt trội, Cam Ngọt kích thích cơ thể sản sinh Serotonin và Dopamine. Nó giúp xua tan cảm giác bức bối, tạo năng lượng tích cực cho ngày mới và đặc biệt dịu lành với tâm lý trẻ nhỏ.</li>
        <li><strong>Cam Bergamot - Liệu pháp Xua Tan Lo Âu (Anti-Anxiety):</strong> Bergamot là một trong số rất hiếm tinh dầu họ Cam Chanh chứa đồng thời cả <em>Linalyl Acetate</em> và <em>Linalool</em> (hoạt chất thường thấy trong hoa Oải Hương). Sự kết hợp này mang lại khả năng hạ nhịp tim căng thẳng, điều hòa huyết áp và hỗ trợ cải thiện chứng trầm cảm nhẹ, rối loạn lo âu.</li>
      </ul>

      <div class="blog-tip-card">
        <div class="blog-tip-icon">🌿</div>
        <div class="blog-tip-content">
          <h4>Mẹo Chuyên Gia CALOHA:</h4>
          <p>Nếu bạn cần một mùi hương cho cả gia đình sinh hoạt chung hoặc khi nhà có trẻ nhỏ, hãy ưu tiên <strong>Cam Ngọt</strong>. Nếu bạn là người làm việc văn phòng thường xuyên chịu áp lực KPI, mất ngủ vì suy nghĩ nhiều, hãy đầu tư ngay một lọ <strong>Cam Bergamot</strong> hữu cơ.</p>
        </div>
      </div>

      <h2 id="ung-dung">3. Ứng dụng không gian sống & Phù hợp với ai?</h2>
      <p>
        Tùy thuộc vào không gian và mục đích sử dụng, bạn có thể lựa chọn linh hoạt:
      </p>
      <ul>
        <li><strong>Phòng khách, nhà bếp & phòng ăn:</strong> Cam Ngọt khử mùi dầu mỡ thức ăn cực kỳ hiệu quả, tạo không khí ấm cúng và kích thích khẩu vị trong bữa cơm gia đình.</li>
        <li><strong>Phòng làm việc, phòng đọc sách & Studio:</strong> Bergamot giúp tăng cường sự tập trung sáng tạo, thanh lọc không khí và mang lại thần thái sang trọng, tinh tế.</li>
        <li><strong>Phòng ngủ:</strong> Kết hợp 2 giọt Bergamot + 2 giọt Oải Hương khuếch tán 30 phút trước khi ngủ sẽ đưa bạn vào giấc ngủ sâu không mộng mị.</li>
      </ul>

      <div class="blog-recipe-card">
        <h4>✨ Công Thức Khuếch Tán Mùi Hương Đề Xuất</h4>
        <div class="blog-recipe-grid">
          <div class="recipe-box">
            <h5>☀️ Năng Lượng Tươi Vui Ban Ngày:</h5>
            <ul>
              <li>3 giọt Cam Ngọt CALOHA</li>
              <li>2 giọt Bạc Hà Nhật Organic</li>
              <li>1 giọt Hương Thảo Cineol</li>
              <li><em>Công dụng: Tỉnh táo, phấn chấn, làm việc năng suất.</em></li>
            </ul>
          </div>
          <div class="recipe-box">
            <h5>🌙 Tĩnh Lặng & Xả Stress Ban Đêm:</h5>
            <ul>
              <li>3 giọt Cam Bergamot CALOHA</li>
              <li>2 giọt Hoa Oải Hương Pháp</li>
              <li>1 giọt Gỗ Hoàng Đàn Atlas</li>
              <li><em>Công dụng: Thư giãn hệ thần kinh, giải tỏa muộn phiền.</em></li>
            </ul>
          </div>
        </div>
      </div>

      <h2 id="luu-y">5. Lưu ý an toàn quang học (Phototoxicity)</h2>
      <div class="blog-safety-card">
        <div class="blog-tip-icon">⚠️</div>
        <div>
          <h4>Cảnh Báo Quan Trọng Khi Thoa Lên Da:</h4>
          <p>
            Các loại tinh dầu ép lạnh từ vỏ quả cam chanh (đặc biệt là Cam Bergamot nguyên bản) có chứa hợp chất <em>Furanocoumarins (Bergapten)</em> có tính nhạy cảm với ánh sáng (Phototoxicity). Nếu thoa lên da sau khi pha với dầu nền, bạn cần tránh để vùng da đó tiếp xúc trực tiếp với ánh nắng mặt trời trong vòng ít nhất 12 - 18 giờ để ngăn ngừa hiện tượng tăng sắc tố da hoặc cháy nắng.
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'so-sanh-tram-gio-tram-tra',
    title: 'So Sánh: Tinh Dầu Tràm Gió (Cajeput) vs Tinh Dầu Tràm Trà (Tea Tree)',
    category: 'So Sánh Sản Phẩm',
    date: '13/09/2026',
    readTime: '6 phút đọc',
    views: 2150,
    likes: 198,
    image: 'assets/cat_herbal.jpg',
    author: 'ThS. DS. Đặng Thu Hà',
    authorRole: 'Chuyên gia Trị liệu Mùi hương & Ban Cố Vấn Nghiên Cứu CALOHA',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tags: ['Tràm Gió', 'Tràm Trà', 'Kháng Khuẩn', 'Trị Mụn', 'Giữ Ấm'],
    relatedProductIds: [42, 43, 6, 7],
    summary: 'Rất nhiều người nhầm lẫn giữa Tràm Gió và Tràm Trà. Bài viết phân tích cấu trúc hoạt chất Cineol vs Terpinen-4-ol để giúp bạn sử dụng đúng mục đích giữ ấm hoặc trị mụn.',
    excerpt: 'Rất nhiều người nhầm lẫn giữa Tràm Gió và Tràm Trà. Bài viết phân tích cấu trúc hoạt chất Cineol vs Terpinen-4-ol để giúp bạn sử dụng đúng mục đích giữ ấm hoặc trị mụn.',
    toc: [
      { id: 'khac-biet-hoat-chat', title: '1. Sự khác biệt về thành phần hoạt chất cốt lõi' },
      { id: 'ung-dung-chuan', title: '2. Bảng so sánh ứng dụng chuẩn y học' },
      { id: 'huong-dan-cho-be', title: '3. Cách dùng an toàn cho trẻ sơ sinh và mẹ bỉm' },
      { id: 'tri-mun-cham-soc-da', title: '4. Hướng dẫn trị mụn chuẩn da liễu với Tràm Trà' }
    ],
    content: `
      <p class="blog-sapo">
        Dù cùng mang chữ "Tràm" trong tên tiếng Việt và thuộc họ Đào Kim Nương (Myrtaceae), Tràm Gió (Cajeput) và Tràm Trà (Tea Tree) lại là hai loài thực vật hoàn toàn khác biệt với cấu trúc phân tử và công dụng trị liệu đối lập nhau. Việc hiểu đúng bản chất giúp bạn tránh lãng phí và bảo vệ sức khỏe cả gia đình.
      </p>

      <h2 id="khac-biet-hoat-chat">1. Sự khác biệt về thành phần hoạt chất cốt lõi</h2>
      <p>
        <strong>Tràm Gió (Cajeput - Melaleuca cajuputi):</strong> Giàu hoạt chất <em>1,8-Cineole (Eucalyptol)</em> chiếm từ 45% - 65% và α-Terpineol. Hợp chất này có tính ấm, làm loãng đờm nhớt, làm thông thoáng đường hô hấp, giữ ấm kinh lạc và hỗ trợ cắt cơn ho gió, nghẹt mũi.
      </p>
      <p>
        <strong>Tràm Trà (Tea Tree - Melaleuca alternifolia):</strong> Có nguồn gốc từ miền Đông nước Úc, chứa hàm lượng <em>Terpinen-4-ol</em> (trên 35-42%) cùng γ-terpinene. Đây là "kháng sinh tự nhiên" mạnh mẽ nhất trong thực vật học, có khả năng ức chế vi khuẩn <em>Cutibacterium acnes</em> gây mụn viêm và diệt nấm phổ rộng.
      </p>

      <div class="blog-quote">
        “Quy tắc vàng nằm lòng: Cần giữ ấm đường thở, phòng cảm ho cho bé hãy chọn Tràm Gió; Cần kháng viêm, chấm mụn bọc, trị nấm ngứa hãy chọn Tràm Trà.”
      </div>

      <h2 id="ung-dung-chuan">2. Bảng so sánh ứng dụng chuẩn y học</h2>
      <ul>
        <li><strong>Giữ ấm cơ thể & Hỗ trợ hô hấp:</strong> Thoa 1-2 giọt Tràm Gió vào lòng bàn chân (huyệt Dũng Tuyền), cổ ngực trước khi đi ngủ hoặc xoa bóp lưng khi trời trở lạnh.</li>
        <li><strong>Khử trùng & Kháng khuẩn phòng ốc:</strong> Xông phòng bằng Tràm Gió giúp thanh lọc vi khuẩn trôi nổi trong không khí vào mùa dịch cúm.</li>
        <li><strong>Chăm sóc da dầu mụn:</strong> Dùng tăm bông chấm 1 giọt Tràm Trà trực tiếp lên nốt mụn sưng viêm 2 lần/ngày để gom cồi mụn nhanh chóng.</li>
      </ul>

      <div class="blog-tip-card">
        <div class="blog-tip-icon">🌿</div>
        <div class="blog-tip-content">
          <h4>Mẹo Cho Mẹ Bỉm Sữa:</h4>
          <p>Khi tắm cho bé vào mùa đông, mẹ chỉ cần nhỏ 3-4 giọt Tinh dầu Tràm Gió CALOHA vào thau nước ấm khuấy đều. Hơi ấm của tràm sẽ bảo vệ bé không bị nhiễm lạnh trong suốt quá trình tắm.</p>
        </div>
      </div>
    `
  },
  {
    id: 'so-sanh-lavender-phap-bulgaria',
    title: 'So Sánh: Tinh Dầu Oải Hương Pháp (Provence) vs Oải Hương Bulgaria',
    category: 'So Sánh Sản Phẩm',
    date: '12/09/2026',
    readTime: '4 phút đọc',
    views: 1690,
    likes: 142,
    image: 'assets/prod_lavender.jpg',
    author: 'ThS. DS. Đặng Thu Hà',
    authorRole: 'Chuyên gia Trị liệu Mùi hương & Ban Cố Vấn Nghiên Cứu CALOHA',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tags: ['Lavender', 'Oải Hương', 'Pháp', 'Bulgaria', 'Ngủ Ngon'],
    relatedProductIds: [46, 47, 48],
    summary: 'Hai cái nôi sản sinh ra những giọt tinh dầu Lavender trứ danh thế giới. Đâu là sự khác biệt giữa phong vị ngọt ngào thảo mộc của Pháp và hương hoa đượm sâu của Bulgaria?',
    excerpt: 'Hai cái nôi sản sinh ra những giọt tinh dầu Lavender trứ danh thế giới. Đâu là sự khác biệt giữa phong vị ngọt ngào thảo mộc của Pháp và hương hoa đượm sâu của Bulgaria?',
    toc: [
      { id: 'tho-nhuong', title: '1. Khí hậu & Thổ nhưỡng vùng Provence vs Thung lũng Bulgaria' },
      { id: 'trai-nghiem', title: '2. Trải nghiệm khứu giác & Tầng hương thơm' },
      { id: 'lua-chon', title: '3. Bạn nên chọn loại nào cho phòng ngủ của mình?' }
    ],
    content: `
      <p class="blog-sapo">
        Hoa Oải Hương (Lavender) được mệnh danh là "Mẹ của các loại tinh dầu" nhờ khả năng an thần, chữa lành và thư thái diệu kỳ. Khi nhắc đến Lavender cao cấp nhất, thế giới chỉ tôn vinh hai vùng đất: Provence (Pháp) và Thung lũng Hoa Hồng (Bulgaria). Cùng khám phá sự khác biệt tinh tế giữa hai kiệt tác mùi hương này.
      </p>

      <h2 id="tho-nhuong">1. Khí hậu & Thổ nhưỡng vùng Provence vs Thung lũng Bulgaria</h2>
      <p>
        <strong>Lavender Pháp (Vùng Provence):</strong> Sinh trưởng trên các cao nguyên đá vôi khô ráo ở độ cao trên 800 - 1.200m so với mực nước biển. Nắng gắt và gió lạnh miền núi tôi luyện nên hàm lượng este <em>Linalyl Acetate</em> vô cùng thanh khiết và dịu nhẹ.
      </p>
      <p>
        <strong>Lavender Bulgaria:</strong> Được nuôi dưỡng bởi đất đen màu mỡ và lượng mưa dồi dào của thung lũng Balkan. Giống cây nơi đây cho ra sản lượng hoa dồi dào với hàm lượng phân tử hương thơm đượm nồng và kéo dài dai dẳng.
      </p>

      <h2 id="trai-nghiem">2. Trải nghiệm khứu giác & Tầng hương thơm</h2>
      <ul>
        <li><strong>Lavender Pháp:</strong> Hương đầu mở ra với vị thảo mộc the mát tự nhiên, khô ráo, thanh lịch và phảng phất chút hương lá thông. Rất thích hợp cho những ai thích mùi hương nhẹ nhàng, tự nhiên không quá ngào ngạt.</li>
        <li><strong>Lavender Bulgaria:</strong> Hương hoa nở rộ đượm sâu, nồng nàn, ngọt ngào và ấm áp. Độ lưu hương trên gối ngủ hay máy xông có thể kéo dài suốt đêm.</li>
      </ul>
    `
  },
  {
    id: 'kien-thuc-phan-biet',
    title: 'Cách Phân Biệt Tinh Dầu Thiên Nhiên Nguyên Chất Và Hương Liệu Hóa Học Tổng Hợp',
    category: 'Kiến Thức Về Tinh Dầu',
    date: '11/09/2026',
    readTime: '5 phút đọc',
    views: 3420,
    likes: 310,
    image: 'assets/story_distillation.jpg',
    author: 'ThS. DS. Đặng Thu Hà',
    authorRole: 'Chuyên gia Trị liệu Mùi hương & Ban Cố Vấn Nghiên Cứu CALOHA',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tags: ['Phân Biệt', 'Hương Liệu', 'Chất Lượng', 'GC-MS', 'Hữu Cơ'],
    relatedProductIds: [1, 2, 8, 46],
    summary: 'Làm thế nào để nhận biết lọ tinh dầu bạn mua có thực sự chiết xuất 100% từ thiên nhiên hay chỉ là mùi thơm tổng hợp công nghiệp? Xem ngay các mẹo kiểm tra trên giấy trắng và nhiệt độ bay hơi.',
    excerpt: 'Làm thế nào để nhận biết lọ tinh dầu bạn mua có thực sự chiết xuất 100% từ thiên nhiên hay chỉ là mùi thơm tổng hợp công nghiệp? Xem ngay các mẹo kiểm tra trên giấy trắng và nhiệt độ bay hơi.',
    toc: [
      { id: 'test-giay', title: '1. Thử nghiệm vết loang trên giấy trắng (Paper Blot Test)' },
      { id: 'do-hoa-tan', title: '2. Thử nghiệm độ hòa tan trong nước tinh khiết' },
      { id: 'tang-huong', title: '3. Nhận diện qua sự chuyển tầng nốt hương (Notes)' },
      { id: 'giay-chung-nhan', title: '4. Tiêu chuẩn chứng nhận kiểm nghiệm GC-MS & COA' }
    ],
    content: `
      <p class="blog-sapo">
        Trên thị trường hiện nay có hàng ngàn loại sản phẩm mang mác "tinh dầu", nhưng thực tế có đến 70% là hương liệu công nghiệp (Fragrance Oil) được pha loãng với dung môi hóa dầu. Hít phải hương liệu hóa học trong thời gian dài có thể gây đau đầu, buồn nôn và tổn thương niêm mạc phổi. Dưới đây là 4 phương pháp kiểm tra khoa học và dễ thực hiện nhất tại nhà.
      </p>

      <h2 id="test-giay">1. Thử nghiệm vết loang trên giấy trắng (Paper Blot Test)</h2>
      <p>
        Nhỏ 1 giọt tinh dầu lên mép tờ giấy in A4 trắng tinh khiết và để ở nhiệt độ phòng.
      </p>
      <ul>
        <li><strong>Tinh dầu nguyên chất:</strong> Vì phân tử tinh dầu tự nhiên rất nhẹ và dễ bay hơi, sau khoảng 1 - 2 giờ giọt tinh dầu sẽ thăng hoa hoàn toàn, mặt giấy khô ráo và không để lại bất kỳ vệt nhờn ố vàng nào (ngoại trừ một số tinh dầu có sắc tố tự nhiên đậm như Trầm Hương hay Hoắc Hương).</li>
        <li><strong>Hương liệu pha dầu khoáng:</strong> Dù để qua đêm hay nhiều ngày, trên giấy vẫn tồn tại một quầng loang dầu ướt át nhờn rít không bao giờ biến mất.</li>
      </ul>

      <h2 id="do-hoa-tan">2. Thử nghiệm độ hòa tan trong nước tinh khiết</h2>
      <p>
        Nhỏ 1-2 giọt vào ly nước trong. Tinh dầu thiên nhiên nhẹ hơn nước sẽ nổi tròn vo trên mặt nước hoặc trôi bồng bềnh mà không hòa tan. Nếu giọt dầu lập tức hòa tan làm đục ngầu cốc nước, chắc chắn sản phẩm đã bị pha thêm chất nhũ hóa nhân tạo (Surfactants).
      </p>
    `
  },
  {
    id: 'huong-dan-ty-le-pha-loang',
    title: 'Cẩm Nang Tỷ Lệ Pha Loãng Tinh Dầu An Toàn Với Dầu Nền Cho Mọi Lứa Tuổi',
    category: 'Hướng Dẫn Sử Dụng',
    date: '10/09/2026',
    readTime: '6 phút đọc',
    views: 2890,
    likes: 245,
    image: 'assets/cat_carrier.jpg',
    author: 'ThS. DS. Đặng Thu Hà',
    authorRole: 'Chuyên gia Trị liệu Mùi hương & Ban Cố Vấn Nghiên Cứu CALOHA',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tags: ['Tỷ Lệ Vàng', 'Dầu Nền', 'Massage', 'An Toàn', 'Trẻ Nhỏ'],
    relatedProductIds: [1, 2, 46, 42],
    summary: 'Tinh dầu nguyên chất có nồng độ dược tính cực cao, gấp 50-70 lần thảo dược tươi. Hãy cùng CALOHA học bảng tỷ lệ pha an toàn khi massage lên da mặt, toàn thân và trẻ nhỏ.',
    excerpt: 'Tinh dầu nguyên chất có nồng độ dược tính cực cao, gấp 50-70 lần thảo dược tươi. Hãy cùng CALOHA học bảng tỷ lệ pha an toàn khi massage lên da mặt, toàn thân và trẻ nhỏ.',
    toc: [
      { id: 'tai-sao-can-dau-nen', title: '1. Tại sao bắt buộc phải dùng dầu nền khi thoa lên da?' },
      { id: 'bang-ty-le-vang', title: '2. Bảng tỷ lệ vàng chuẩn chuyên gia Aromatherapy Quốc Tế' },
      { id: 'patch-test', title: '3. Quy trình thử kích ứng da (Patch Test) 24h' }
    ],
    content: `
      <p class="blog-sapo">
        Một giọt tinh dầu nguyên chất tương đương với dược tính của 50 đến 70 tách trà thảo mộc. Do độ đậm đặc phân tử sinh học cực lớn, việc thoa trực tiếp tinh dầu chưa pha loãng lên da có thể gây bỏng rát hoặc viêm da tiếp xúc. Nắm vững bảng tỷ lệ vàng pha với dầu nền (Carrier Oils) là bước khởi đầu bắt buộc của bất kỳ ai yêu thích Aromatherapy.
      </p>

      <h2 id="tai-sao-can-dau-nen">1. Tại sao bắt buộc phải dùng dầu nền khi thoa lên da?</h2>
      <p>
        Tinh dầu nguyên chất bốc hơi rất nhanh trong không khí. Dầu dẫn xuất (dầu Jojoba hữu cơ, dầu Hạnh Nhân ngọt, dầu Hạt Nho) giàu axit béo thiết yếu đóng vai trò:
      </p>
      <ul>
        <li>Ngăn chặn sự bay hơi sớm, giữ hoạt chất lưu lại trên da lâu dài.</li>
        <li>Vận chuyển các phân tử tinh dầu thấm sâu qua lớp biểu bì vào tuần hoàn máu.</li>
        <li>Nuôi dưỡng màng lipid bảo vệ da mềm mại, ngừa kích ứng.</li>
      </ul>

      <h2 id="bang-ty-le-vang">2. Bảng tỷ lệ vàng chuẩn chuyên gia Aromatherapy Quốc Tế</h2>
      <ul>
        <li><strong>Nồng độ 0.5% - 1% (Cho da mặt nhạy cảm & trẻ em trên 2 tuổi):</strong> 3 - 6 giọt tinh dầu vào 30ml dầu nền.</li>
        <li><strong>Nồng độ 2% (Mức chuẩn cho massage toàn thân người lớn):</strong> 12 giọt tinh dầu vào 30ml dầu nền.</li>
        <li><strong>Nồng độ 3% - 5% (Chăm sóc điểm cục bộ, đau mỏi cơ bắp, chấm mụn):</strong> 18 - 30 giọt tinh dầu vào 30ml dầu nền.</li>
      </ul>
    `
  },
  {
    id: 'bai-viet-tinh-dau-oai-huong',
    title: 'Khám Phá Chi Tiết: Tinh Dầu Hoa Oải Hương (Organic French Lavender) - Nữ Hoàng Thư Giãn',
    category: 'Bài Viết Cho Từng Sản Phẩm',
    date: '09/09/2026',
    readTime: '5 phút đọc',
    views: 2470,
    likes: 215,
    image: 'assets/prod_lavender.jpg',
    author: 'ThS. DS. Đặng Thu Hà',
    authorRole: 'Chuyên gia Trị liệu Mùi hương & Ban Cố Vấn Nghiên Cứu CALOHA',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tags: ['Oải Hương', 'Pháp', 'Organic', 'Giấc Ngủ', 'Thư Giãn'],
    relatedProductIds: [46, 47, 48],
    summary: 'Phân tích sâu về nguồn gốc, cấu tạo hóa học và 10 bài thuốc dân gian ứng dụng tinh dầu Oải Hương Pháp trong đời sống hiện đại.',
    excerpt: 'Phân tích sâu về nguồn gốc, cấu tạo hóa học và 10 bài thuốc dân gian ứng dụng tinh dầu Oải Hương Pháp trong đời sống hiện đại.',
    toc: [
      { id: 'dac-trung', title: '1. Đặc trưng thực vật học Lavandula Angustifolia' },
      { id: 'cong-thuc-tri-lieu', title: '2. Các công thức trị liệu giấc ngủ & giảm căng thẳng' },
      { id: 'cham-soc-da', title: '3. Tác dụng làm dịu vết côn trùng cắn và bỏng nhẹ' }
    ],
    content: `
      <p class="blog-sapo">
        Được xưng tụng là "Nữ hoàng của thảo mộc", tinh dầu Hoa Oải Hương Pháp (Lavandula Angustifolia) từ lâu đã trở thành biểu tượng bất tử của sự an yên, tĩnh lặng và thanh tẩy tâm trí. Cùng CALOHA tìm hiểu tường tận loài thảo mộc cao quý của vùng đất Provence.
      </p>

      <h2 id="dac-trung">1. Đặc trưng thực vật học Lavandula Angustifolia</h2>
      <p>
        Không giống như các giống lai Lavandin rẻ tiền thường có mùi gắt do hàm lượng Camphor cao, giống Oải hương thuần chủng <em>Lavandula Angustifolia</em> chứa nồng độ Linalyl Acetate và Linalool vượt trội, mang lại nốt hương hoa cỏ tinh tế, tròn trịa và êm dịu nhất.
      </p>

      <h2 id="cong-thuc-tri-lieu">2. Các công thức trị liệu giấc ngủ & giảm căng thẳng</h2>
      <ul>
        <li><strong>Liệu pháp gối ngủ êm ái:</strong> Nhỏ 1 giọt Lavender lên góc gối ngủ 15 phút trước khi nằm, hương thơm phảng phất sẽ đưa bạn vào giấc ngủ sinh học tự nhiên.</li>
        <li><strong>Ngâm bồn tắm giải tỏa mệt mỏi:</strong> Pha 5 giọt Lavender cùng 1 chén muối Epsom vào bồn nước ấm, ngâm mình 15-20 phút sau một ngày dài áp lực.</li>
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

