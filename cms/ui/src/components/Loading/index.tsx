// LoadingPage.tsx
export default function LoadingPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
            </div>
        </div>
    );
}
