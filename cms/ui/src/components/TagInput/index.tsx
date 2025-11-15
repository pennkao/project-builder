import TextTag from '@/components/TextTag';
import { useRef, useState } from 'react';
const TagInput = ({
    tags,
    initTags,
    disabled,
    onChange,
    onRemove,
    className,
    placeholder,
}: {
    disabled?: boolean;
    tags: string[];
    initTags?: string[]; //进制删除
    onRemove?: (tag: string) => void;
    onChange: (tag: string) => void;
    className?: string;
    placeholder?: string;
}) => {
    // const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    className = className ? className : '';
    placeholder = placeholder ? placeholder : '';
    // useEffect(() => {
    //     setTags(data);
    //     setInitTags(data)
    // }, [data]);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();

            if (inputValue.length === 0) {
                initTags?.forEach((tag) => {
                    onChange(tag);
                });//////////////////////
                onRemove?.('');
            }
            if (inputValue.length > 0) {
                setInputValue('');
            }
        }

        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();

            const value = inputValue.trim();
            if (!value) {
                return;
            }
            if (!tags.includes(value)) {
                onChange(value);
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
        onRemove?.(tag);
        inputRef.current?.focus();
    };
    const handleBlur = () => {
        const value = inputValue.trim();
        if (!value) {
            return;
        }
        if (!tags.includes(value)) {
            console.log(value, ']]]]]]]]]]]]]');
            onChange(value);
            setInputValue('');
            return;
        }
        setInputValue('');
    };

    return (
        <>
            <div
                className={`flex flex-wrap min-h-11 items-center gap-1 border p-1 rounded-lg shadow-theme-xs placeholder:text-gray-400 dark:placeholder:text-white/30 dark:bg-gray-900 dark:text-white/90
                    border-gray-300 input-wrap-hover ${className}`}
            >
                {tags.map((tag, index) => (
                    <TextTag disabled={disabled} key={index} tag={tag} onRemove={(tag) => handleRemove(tag)} />
                ))}
                <input
                    type="text"
                    disabled={disabled}
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
