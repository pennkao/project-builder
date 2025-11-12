import TextTag from '@/components/TextTag';
import { useEffect, useRef, useState } from 'react';
const TagInput = ({ onChange, limit, className, placeholder }: { onChange: (tags: string[]) => void; limit?: number; className?: string; placeholder?: string }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    className = className ? className : '';
    placeholder = placeholder ? placeholder : '';
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();

            if (inputValue.length === 0) {
                setTags(tags.slice(0, -1));
            }
            if (inputValue.length > 0) {
                setInputValue('');
            }
        }

        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();

            if (limit && tags.length >= limit) {
                alert(`最多只能输入 ${limit} 个标签${tags.length}`);
                return;
            }
            const value = inputValue.trim();
            if (!value) {
                return;
            }
            if (!tags.includes(value)) {
                setTags((prev) => [...prev, value]);
                setInputValue('');
                return;
            }
            setInputValue('');
        }

        if (inputRef.current) {
            inputRef.current?.focus();
        }
    };
    const handleRemove = (tag: string) => {
        setTags((prev) => prev.filter((item) => item !== tag));
        inputRef.current?.focus();
    };
    const handleBlur = () => {
        if (limit && tags.length >= limit) {
            alert(`最多只能输入 ${limit} 个标签${tags.length}`);
            return;
        }
        const value = inputValue.trim();
        if (!value) {
            return;
        }
        if (!tags.includes(value)) {
            setTags((prev) => [...prev, value]);
            setInputValue('');
            return;
        }
        setInputValue('');
    };
    useEffect(() => {
        onChange?.(tags);
    }, [tags]);
    // placeholder: text - gray - 400;
    return (
        <>
            <div
                className={`flex flex-wrap min-h-11 items-center gap-1 border p-1 rounded-lg shadow-theme-xs placeholder:text-gray-400 dark:placeholder:text-white/30 dark:bg-gray-900 dark:text-white/90
                    border-gray-300 input-wrap-hover ${className}`}
            >
                {tags.map((tag) => (
                    <TextTag key={tag} tag={tag} onRemove={(tag) => handleRemove(tag)} />
                ))}
                <input
                    type="text"
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => {
                        handleBlur();
                    }}
                    className="flex-1 outline-none min-w-[100px] h-8 m-0 "
                    placeholder={`${tags.length > 0 ? '' : placeholder}`}
                />
            </div>
        </>
    );
};

export default TagInput;
