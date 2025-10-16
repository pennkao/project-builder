import { useState } from 'react';
import styles from './styles.module.css';
interface DropdownProps {
    options: { label: string; value: string }[];
    defaultValue?: string;
    dropDownClassName?: string;
    onChange: (value: string) => void;
}
const BaseDropdown = ({ options, defaultValue = '', onChange }: DropdownProps) => {
    const [optionValue, setOption] = useState(defaultValue);

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOption(e.target.value);
        onChange(e.target.value);
    };
    return (
        <div className={styles.dropdownWrapper}>
            <select className={styles.dropdown} value={optionValue} onChange={onChangeHandler}>
                {options.map((option) => (
                    <option  key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BaseDropdown;
