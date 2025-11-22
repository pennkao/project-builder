import { ArrowLeftIcon, ArrowRightIcon } from '@/icons';
interface PaginationProps {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    showText?: boolean;
    onPageChange: (page: number) => void;
}

export const FooterPage = ({ currentPage, totalCount, pageSize, showText = true, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(totalCount / pageSize);
    if (totalCount <= pageSize) return null;
    // 生成页码按钮
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className={`flex items-center ${showText ? 'justify-between' : 'justify-center'} px-5 py-4 pr-20 border-t border-gray-100 sm:flex-row sm:items-center dark:border-gray-800`}>
            {showText && (
                <div>
                    Showing {currentPage * pageSize - pageSize + 1} to {currentPage * pageSize} of {totalCount}
                </div>
            )}
            <div className="flex items-center justify-center gap-1">
                {/* 上一页 */}

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="w-10 h-10 rounded-md border text-sm font-medium 
                   bg-white dark:bg-gray-800 p-2.5
                   text-gray-700 dark:text-gray-300 
                   hover:bg-gray-100 dark:hover:bg-gray-700 
                   disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowLeftIcon className="fill-current w-5 h-5 " />
                </button>

                {/* 页码按钮 */}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 rounded-md border text-sm font-medium 
            ${currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        {page}
                    </button>
                ))}
                {/* 下一页 */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="w-10 h-10 rounded-md border text-sm font-medium 
                   bg-white dark:bg-gray-800 
                   text-gray-700 dark:text-gray-300 p-2.5
                   hover:bg-gray-100 dark:hover:bg-gray-700 
                   disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowRightIcon className="fill-current w-5 h-5 " />
                </button>
            </div>
        </div>
    );
};
export default FooterPage;
