interface Review {
    id: string;
    avatar: string;
    username: string;
    comment: string;
}

interface ReviewsProps {
    total?: number;
    reviews?: Review[];
    onSeeAll?: () => void;
}

const ReviewCard = ({ total, reviews, onSeeAll }: ReviewsProps) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-1">
            {/* 标题行 */}
            <div className="flex justify-between items-center mb-4 border-b">
                <span className="text-sm font-medium text-gray-900">
                    产品评价<span className="text-gray-500">({total || 0})</span>
                </span>
                <button className="text-sm text-blue-600 font-medium" onClick={onSeeAll}>
                    查看全部&gt;
                </button>
            </div>

            {/* 评论项 */}
            <div className="flex flex-col gap-1">
                {/* 头像：用占位色块代替 */}
                <div className="flex items-center justify-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0 "></div>
                    <div className="text-sm font-medium text-gray-900">用户名</div>
                </div>
                {/* 用户名 + 评论 */}
                <div className="">
                    <div className="mt-1 text-sm text-gray-700">评论；；；；；；；；；；；；；；；；；；；</div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
