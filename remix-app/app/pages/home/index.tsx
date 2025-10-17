
import Banner from "@/features/app/Banner";
import products from "@/mock/products";
import products2 from "@/mock/products";
const HomePage = ({ data }: any) => {{
    const products = products2


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
