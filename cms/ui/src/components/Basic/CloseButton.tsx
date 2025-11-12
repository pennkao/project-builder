import { CloseIcon } from '@/icons';

const CloseButton = ({ onClose }: { onClose?: () => void }) => {
    return (
        <button
            className="text-sm text-white-500 cursor-pointer opacity-50 hover:opacity-100 transition"
            onClick={(e) => {
                e.stopPropagation();
                onClose?.();
            }}
        >
            <CloseIcon className="w-4 h-4" />
        </button>
    );
};
export default CloseButton;
