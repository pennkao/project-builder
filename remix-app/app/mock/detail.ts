const a = {
  "id": "prod_12345",
  "name": "UltraBook Pro 2025",
  "description": "轻薄高性能笔记本，适合设计师与开发者",
  "longDescription": "<p>采用第14代Intel处理器，16GB内存...</p>",

  "images": [
    "/images/laptop-1.jpg",
    "/images/laptop-2.jpg",
    "/images/laptop-3.jpg"
  ],
  "videos": ["/videos/unboxing.mp4"],

  "price": 8999,
  "originalPrice": 9999,
  "currency": "CNY",

  "inStock": true,
  "stockCount": 42,
  "isPreorder": false,

  "rating": 4.8,
  "reviewCount": 312,
  "reviews": [
    {
      "id": "rev_001",
      "author": "张小明",
      "avatar": "/avatars/zhang.png",
      "rating": 5,
      "comment": "性能强劲，屏幕色彩非常准！",
      "date": "2025-10-15T08:30:00Z"
    }
  ],

  "specs": [
    {
      "group": "基本参数",
      "items": [
        { "key": "重量", "value": "1.3kg" },
        { "key": "厚度", "value": "14.9mm" }
      ]
    },
    {
      "group": "屏幕",
      "items": [
        { "key": "尺寸", "value": "14 英寸" },
        { "key": "分辨率", "value": "2880×1800" }
      ]
    }
  ],

  "features": [
    {
      "id": "feat1",
      "title": "极致轻薄",
      "description": "仅 1.3kg，轻松放入通勤包",
      "mediaType": "image",
      "mediaUrl": "/images/feature-thin.jpg"
    },
    {
      "id": "feat2",
      "title": "专业级屏幕",
      "description": "100% DCI-P3 色域，Delta E < 1",
      "mediaType": "video",
      "mediaUrl": "/videos/screen-demo.mp4",
      "reverse": true
    }
  ],

  "meta": {
    "title": "UltraBook Pro 2025 - 高性能轻薄本",
    "description": "专为创意工作者打造的旗舰笔记本",
    "keywords": ["笔记本", "轻薄本", "设计师电脑"]
  }
}