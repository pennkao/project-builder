interface InputProps {
    type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    min?: string;
    max?: string;
    step?: number;
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
    hint?: string;
}
export const Input = ({ type = 'text', id, name, placeholder, value, onChange, className = '', min, max, step, disabled = false, success = false, error = false, hint }: InputProps) => {
    const inputClasses = `h-11 rounded-lg border appearance-none  py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800 ${className}`;
    return <input  type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} min={min} max={max} step={step} disabled={disabled} className={inputClasses} />;
};
