
import Banner from "@/features/app/Banner";
const HomePage = ({ data }: any) => {{
const products: Product[] = [
  {
    id: "1",
    name: "【五粮液一尊天下】六瓶装浓香型52度白酒",
    image: "https://cdn1.tiantiandui.cn/yT7icgYLBgtDD4g31Y50gNYjIn0sHAPq?x-oss-process=image/resize,h_400,m_lfit",
    points: 58000,
    price: 4999,
    monthly: "1.2万",
    tags: ["五粮液官方授权", "52°浓香经典"],
  },
  {
    id: "2",
    name: "【除菌除螨】牛油果洗衣液两/四桶装",
    image: "https://cdn1.tiantiandui.cn/XIQ8o2iZVL8X3yVxfOZBcNh60VT6hhDj?x-oss-process=image/resize,h_400,m_lfit",
    points: 12000,
    price: 98.9,
    monthly: "2.4万",
    tags: ["母婴级品质", "抑菌温和"],
  },
  {
    id: "3",
    name: "【甩脂机】腰腹按摩懒人减肥专属",
    image: "https://cdn1.tiantiandui.cn/XIQ8o2iZVL8X3yVxfOZBcNh60VT6hhDj?x-oss-process=image/resize,h_400,m_lfit",
    points: 7300,
    price: 149,
    monthly: "11.7万",
    tags: ["腰腹甩脂", "振动按摩"],
  },
  {
    id: "4",
    name: "【轻便登机箱】静音万向轮行李箱20寸",
    image: "https://cdn1.tiantiandui.cn/XIQ8o2iZVL8X3yVxfOZBcNh60VT6hhDj?x-oss-process=image/resize,h_400,m_lfit",
    points: 3080,
    price: 308,
    monthly: "700+",
    tags: ["可上飞机", "加厚防撞"],
  },
];

    return (
        <>
            <Banner />
<div className="bg-white rounded-lg p-1 shadow-sm">
  <h2 className="text-xl font-bold text-gray-800 mb-4">热门商品</h2>
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {products.map((product) => (
      <div
        key={product.id}
        className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
      >
        {/* 图片 */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* 标签 */}
          {product.tags && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {product.tags.join(" ")}
            </div>
          )}
        </div>

        {/* 内容 */}
        <div className="p-3">
          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">
            {product.name}
          </h3>
          <div className="mt-2">
            <div className="text-lg font-bold text-red-600">
              {product.points}积分
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {product.price}元
            </div>
            <div className="text-xs text-orange-600 mt-1">
              月兑{product.monthly}+
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
        </>
    );
}};
export default HomePage;
