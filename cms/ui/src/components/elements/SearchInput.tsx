import Input from '@/components/form/input/InputField';
import { SearchIcon } from '@/icons';

interface SearchInputProps {
    placeholder?: string;
    value?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}
// SearchInput.tsx
const SearchInput = ({ placeholder, value, onChange, onKeyDown, className }: SearchInputProps) => {
    return (
        <div className="relative">
            <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <SearchIcon className="w-5 h-5 fill-current" />
            </span>
            <Input placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown} className={`pl-11 ${className ?? ''}`} />
        </div>
    );
};
export default SearchInput;
