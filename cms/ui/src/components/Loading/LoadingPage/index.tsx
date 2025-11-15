export default function LoadingPage() {
    return (
        <div className="w-full h-full flex items-center justify-center py-20">
            <div className="text-center">
                {/* 旋转加载圈 */}
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
        </div>
    );
}
