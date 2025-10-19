import RichTextViewer from '@/components/RichTextViewer';

const ProductDetail = ({ data }: { data: string }) => {
    return (
        <div>
            <div className="">商品详情</div>
            <div>
                <div>产品参数</div>
            </div>
            <div className="rich-text-container max-w-full min-h-[100px] overflow-x-hidden overflow-auto">
                <RichTextViewer htmlContent={data} />
            </div>

            <div>
                <div>消费提醒</div>
                <div>1. 产品安全：请在使用前查看产品安全说明，确保符合使用要求。 2. 注意事项：在使用产品时，注意事项请参考使用说明。 3. 注意事项：在使用产品时，注意事项请参考使用说明。</div>
            </div>
            <div>
                <div>使用说明</div>
                <div>1. 产品安全：请在使用前查看产品安全说明，确保符合使用要求。 2. 注意事项：在使用产品时，注意事项请参考使用说明。 3. 注意事项：在使用产品时，注意事项请参考使用说明。</div>
            </div>
        </div>
    );
};

export default ProductDetail;
