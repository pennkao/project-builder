import RichTextViewer from '@/components/RichTextViewer';
import React from 'react';
const ProductDetail = React.memo(({ data }: { data: string }) => {
    return (
        <div className="flex flex-col">
            <div className="">商品详情</div>
            <div>
                <div>产品参数</div>
            </div>
            <div className="rich-text-container w-full">
                <RichTextViewer htmlContent={data} />
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <div>消费提醒</div>
                    <div>1. 产品安全：请在使用前查看产品安全说明，确保符合使用要求。 2. 注意事项：在使用产品时，注意事项请参考使用说明。 3. 注意事项：在使用产品时，注意事项请参考使用说明。</div>
                </div>
                <div className="flex flex-col">
                    <div>使用说明</div>
                    <div>1. 产品安全：请在使用前查看产品安全说明，确保符合使用要求。 2. 注意事项：在使用产品时，注意事项请参考使用说明。 3. 注意事项：在使用产品时，注意事项请参考使用说明。</div>
                </div>
            </div>
        </div>
    );
});
export default ProductDetail;
