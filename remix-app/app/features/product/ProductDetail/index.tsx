import RichTextViewer from '@/components/RichTextViewer';
import { t } from 'i18next';
import React from 'react';
const ProductDetail = React.memo(({ data }: { data: string }) => {
    return (
        <div className="flex flex-col">
            <div className="p-2"></div>
            <div className="rich-text-container w-full">
                <RichTextViewer htmlContent={data} />
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <div>{t('product.detail.label')}</div>
                    <p>{t('product.detail.tips1')}</p>
                    <p>{t('product.detail.tips2')}</p>
                    <p>{t('product.detail.tips3')}</p>
                </div>
            </div>
            <div className="p-6"></div>
        </div>
    );
});
export default ProductDetail;
