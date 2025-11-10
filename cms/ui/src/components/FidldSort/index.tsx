import { AngleDownIcon, AngleUpIcon } from '@/icons';
const FieldSort = ({ label, field, sortingField, onClick }: { label: string; field: string; sortingField?: { field: string; status: '' | 'asc' | 'desc' }; onClick: () => void }) => {
    const handleClick = () => {
        onClick();
    };
    return (
        <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={handleClick}>
            <div className="text-sm text-gray-500 ">{label}</div>
            <div className="flex flex-col justify-center gap-0">
                <AngleUpIcon className={`w-2 h-2 ${sortingField?.status === 'asc' && sortingField.field === field ? 'text-black' : 'text-gray-500/40'}`} />
                <AngleDownIcon className={`w-2 h-2 ${sortingField?.status === 'desc' && sortingField.field === field ? 'text-black' : 'text-gray-500/40'}`} />
            </div>
        </div>
    );
};

export default FieldSort;
