// BottomSheet.tsx
export default function BottomSheet({ open, onClose, children }: BottomSheetProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-end p-0 bg-black/40" onClick={onClose}>
            <div
                className="bg-white relative h-[98%] w-full rounded-t-2xl"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <button className="absolute top-0 right-0 text-gray-400 px-3 py-1" onClick={onClose}>
                    x
                </button>
                <div className="h-full border-none overflow-auto pt-2">{children}</div>
            </div>
        </div>
    );
}
