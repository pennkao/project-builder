import BottomSheet from '@/components/BottomSheet';
import { t } from 'i18next';
import { useState } from 'react';
const ReviewCard = ({ reviews }: { reviews: ReviewType[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    if (reviews.length === 0) return null;
    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 px-2">
                {/* 标题行 */}
                <div className="flex justify-between items-center py-2">
                    <span className="text-sub-main">
                        {t('product.reviews')}
                        <span className="text-gray-500">({reviews.length || 0})</span>
                    </span>
                    <button className="text-sub" onClick={() => setIsOpen(true)}>
                        {t('product.show_all')}&gt;
                    </button>
                </div>

                {/* 评论项 */}
                <div className="flex flex-col p-2 gap-1 bg-content">
                    {/* 头像：用占位色块代替 */}
                    <div className="flex items-center justify-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 "></div>
                        <div className="text-sub">{reviews[0].username}</div>
                    </div>
                    {/* 用户名 + 评论 */}
                    <div className="">
                        <div className="mt-1 text-sub-main">{reviews[0].comment}</div>
                    </div>
                </div>
            </div>

            <BottomSheet open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="overflow-y-auto mt-2">
                    {reviews.map((review) => (
                        <div className="flex flex-col p-2 gap-1 " key={review.id}>
                            {/* 头像：用占位色块代替 */}
                            <div className="flex items-center justify-start gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 ">
                                    <img src={review.avatar} alt="用户头像" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div className="text-main">{review.username}</div>
                            </div>
                            {/* 用户名 + 评论 */}
                            <div className="">
                                <div className="mt-1 text-sub">{review.comment}</div>
                            </div>
                            <div className="flex flex-row justify-start items-center sp-border-main pb-3">
                                {review.images.map((image) => (
                                    <img src={image} alt="评论图片" className="w-16 h-16 rounded-md object-cover" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </BottomSheet>
        </>
    );
};

export default ReviewCard;
