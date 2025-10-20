export default function ProductCard({children}: {children: React.ReactNode}) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* 顶部红色横幅 */}
            <div className="bg-red-500 text-white p-3 flex justify-between items-center">
                <div>
                    <div className="text-lg font-bold">
                        18500积分<span className="text-yellow-200">+138元</span>
                        <span className="text-sm ml-1 text-red-100">¥680</span>
                    </div>
                    <div className="text-xs text-red-100 mt-1">积分已节省542元</div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="text-sm font-medium">限⚡兑换</div>
                    <div className="text-xs text-red-100 mt-1">🔥月热度3.1万</div>
                </div>
            </div>

            {/* 中间标签 */}
            <div className="px-3 py-2">
                <div className="flex gap-2 mb-2">
                    <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded">超值兑</span>
                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">可积分抵扣</span>
                </div>

                {/* 商品标题 */}
                <div className="text-sm leading-tight">
                    <span className="inline-block bg-black text-white text-xs px-1.5 py-0.5 rounded mr-1">自营</span>
                    <span className="font-medium">【家用智能扫拖一体机】</span>
                    扫吸拖擦一步到位 大容量电池长续航 智能清扫遇障掉头 让清洁更持久
                </div>
            </div>
            {children}
        </div>
    );
}
