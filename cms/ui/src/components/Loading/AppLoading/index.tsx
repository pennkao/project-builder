export default function LoadingPage() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
            </div>
        </div>
    );
}
