import CloseButton from '@/components/elements/CloseButton';
const TextTag = ({ tag, onRemove, disabled }: { disabled?: boolean; tag: string; onRemove: (tag: string) => void }) => {
    if (!tag) return null;
    if (disabled) {
        return (
            <span className=" bg-blue-100 gap-2 px-4 py-1 rounded-lg flex items-center cursor-pointer dark:bg-gray-500">
                <span className="select-none">{tag}</span>
                {/* <CloseButton onClose={() => onRemove(tag)} /> */}
            </span>
        );
    }

    return (
        <span className=" bg-blue-100 gap-2 px-3 py-1 rounded-lg flex items-center cursor-pointer dark:bg-gray-500">
            <span className="select-none">{tag}</span>
            <CloseButton onClose={() => onRemove(tag)} />
        </span>
    );
};
export default TextTag;
