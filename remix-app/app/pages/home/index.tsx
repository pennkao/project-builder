import BaseImage from '@/components/BaseImage';
import products2 from '@/mock/products';

import AppHeader from '@/features/app/AppHeader';
import { Link } from 'react-router';

const HomePage = ({ data }: any) => {
    const products = products2;

    return (
        <>
            <AppHeader />

            <div className="bg-white rounded-lg p-1 shadow-sm">
                {/* <h2 className="text-xl font-bold text-gray-800 mb-4">热门商品</h2> */}

                {/* 商品网格 */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 auto-rows-min">
                    {products.map((product, idx) => (
                        <div key={product.id} data-idx={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200 flex flex-col">
                            <Link to={`/collections/${product.id}`} className="flex flex-col">
                                {/* 图片容器 */}
                                <div className="relative w-full aspect-[1/1] min-h-[200px] overflow-hidden">
                                    <BaseImage src={product.image} alt={product.name} className="w-full h-full object-cover" isUrl={true} />

                                    {/* 标签 */}
                                    {product.tags && <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{product.tags.join(' ')}</div>}
                                </div>

                                {/* 内容区 */}
                                <div className="p-3 flex flex-col justify-between">
                                    <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">{product.name}</h3>

                                    <div className="mt-2">
                                        <div className="text-lg font-bold text-red-600">{product.points} 积分</div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-xs text-gray-500">{product.price} 元</div>
                                            <div className="text-xs text-orange-600">月兑 {product.monthly}+</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomePage;
