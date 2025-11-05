import countriesJson from '@/data/countries.json';
import { useEffect, useEffectEvent, useMemo, useRef, useState } from 'react';
export const haveState = (country: string) => {
    const noStateCountry = ['FR', 'DE', 'NL', 'PL', 'SA', 'GB'];
    return !noStateCountry.includes(country);
};
export function ComboBox({ name, options, option, onChange, isLock, onUnlock, placeholder, className = '' }: ComboBoxProps) {
    const containerRef = useRef<HTMLInputElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [selectedOption, setSelectedOption] = useState<AddressOptionType>(option);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
    const [isFocused, setIsFocused] = useState(false);
    // const matchOption = options.find((o) => o.code === selectedOption.code);
    // console.log('inputvalue', value);
    // setInputValue(selectedOption?.name || '');
    //设置默认值
    useEffect(() => {
        if (!isLock && !option.code && !option.name) return;
        setSelectedOption(option);
    }, [option]);
    // const matchOption = options.find((o) => o.code === selectedOption.code)

    // 过滤选项，高亮匹配放前
    const filteredOptions = useMemo(() => {
        if (!selectedOption.name.trim()) return options;
        const q = selectedOption.name.toLowerCase();
        const matches: AddressOptionType[] = [];
        const rest: AddressOptionType[] = [];
        for (const o of options) {
            (o.name.toLowerCase().includes(q) ? matches : rest).push(o);
        }
        return matches.concat(rest);
    }, [selectedOption.name, options]);

    // 计算下拉位置
    const computeDropdown = () => {
        const el = containerRef.current;
        if (!el) return { style: {} as React.CSSProperties };
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const isDropUp = spaceAbove > spaceBelow;

        const maxHeight = Math.min(200, filteredOptions.length * 36);
        const top = isDropUp ? rect.top - maxHeight - 4 : rect.bottom + 4;

        return {
            style: {
                position: 'fixed',
                top,
                left: rect.left,
                width: rect.width,
                maxHeight,
                overflowY: 'auto',
                zIndex: 9999,
            } as React.CSSProperties,
        };
    };

    // 更新下拉位置，用 useEffectEvent 保证最新状态
    const updateDropdown = useEffectEvent(() => {
        setDropdownStyle(computeDropdown().style);
    });

    // 使用 useEffect 替代 useLayoutEffect
    useEffect(() => {
        if (!isOpen) return;
        updateDropdown();

        window.addEventListener('resize', updateDropdown);
        window.addEventListener('scroll', updateDropdown, true);

        return () => {
            window.removeEventListener('resize', updateDropdown);
            window.removeEventListener('scroll', updateDropdown, true);
        };
    }, [isOpen]);

    // 外部点击关闭，用 useEffectEvent 保证最新状态
    const handleClickOutside = useEffectEvent((e: MouseEvent) => {
        if (!wrapperRef.current) return;
        if (!wrapperRef.current.contains(e.target as Node)) setIsOpen(false);
    });

    useEffect(() => {
        document.addEventListener('pointerdown', handleClickOutside);
        return () => document.removeEventListener('pointerdown', handleClickOutside);
    }, [handleClickOutside]);

    /**
     * 处理地址选项的选择事件
     * @param opt - AddressOptionType 类型的地址选项对象，包含地址代码和名称等信息
     */
    const handleSelect = (opt: AddressOptionType) => {
        onUnlock?.();
        // 触发变更回调函数，传入地址选项的代码
        onChange?.(opt);
        // 设置输入框的显示值为地址选项的名称
        setSelectedOption(opt);
        // 触发输入变更回调函数，传入地址选项的名称
        // onInputChange?.(opt.name);
        // 使用 requestAnimationFrame 确保在下一次动画帧之前关闭下拉选项
        requestAnimationFrame(() => setIsOpen(false));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUnlock?.();
        console.log('inputValue', e.target.value);
        if (name === 'city') {
            setSelectedOption({ code: '', name: e.target.value });
            onChange?.({ code: '', name: e.target.value });
        }
        // onInputChange?.(e.target.value);
        setIsOpen(e.target.value.trim().length > 1);
    };

    const handleDropdownClick = () => {
        if (name == 'city') return;
        if (options.length === 0) return;
        setIsOpen((prev) => !prev);
    };

    const highlightText = (text: string) => {
        const q = selectedOption.name.trim().toLowerCase();
        const idx = text.toLowerCase().indexOf(q);
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <span className="bg-yellow-200">{text.slice(idx, idx + q.length)}</span>
                {text.slice(idx + q.length)}
            </>
        );
    };
    return (
        <div ref={wrapperRef} onClick={handleDropdownClick} className={`relative min-h-[37.6px] ${className} ${isFocused ? 'border-green-500 ring-1 ring-green-500 ring-opacity-30' : 'border-gray-300'}`}>
            <div ref={containerRef} className="flex items-center px-2 py-[2px] border-none ">
                <input
                    type="text"
                    readOnly={name == 'city' ? false : true}
                    value={selectedOption?.name || ''}
                    onChange={handleChange}
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-1 outline-none text-main text-sm bg-transparent border-none "
                />
                {options.length > 0 && name != 'city' && <div className="ml-2 cursor-pointer border-none  select-none text-gray-400">▼</div>}
            </div>
            {isOpen && options.length > 0 && (
                <ul style={dropdownStyle} className="border border-gray rounded-lg shadow-lg bg-white overflow-auto">
                    {filteredOptions.map((opt) => (
                        <li key={opt.code} className="px-3 py-2 cursor-pointer text-main hover:bg-gray-100" onClick={() => handleSelect(opt)}>
                            {highlightText(opt.name)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// ▼ 主地址组件
export default function AddressSelector({ defaultCountry, defaultState, defaultCity, className, onChange }: AddressProps) {
    const [countries] = useState<CountryType[]>(countriesJson);
    const [states, setStates] = useState<StateType[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);

    const [country, setCountry] = useState(defaultCountry || '');
    const [state, setState] = useState(defaultState || '');
    const [city, setCity] = useState(defaultCity || '');

    // 🔹 国家变化时加载省份
    useEffect(() => {
        if (!country) {
            setStates([]);
            setCities([]);
            return;
        }
        setStates([]);
        setCities([]);
        fetch(`/data/states/${country}.states.json`)
            .then((res) => res.json())
            .then((data) => setStates(data))
            .catch(() => setStates([]));
    }, [country]);

    // 🔹 省份变化时加载城市
    useEffect(() => {
        if (!country || !state) {
            setCities([]);
            return;
        }
        setCities([]);
        fetch(`/data/cities/${country}.cities.json`)
            .then((res) => res.json())
            .then((json) => json[state] || [])
            .then((data) => setCities(data))
            .catch(() => setCities([]));
    }, [country, state]);

    // 🔹 通知外部变更
    useEffect(() => {
        onChange?.(country, state, city);
    }, [country, state, city]);

    return (
        <div className={`flex flex-col gap-3 w-full ${className || ''}`}>
            {/* 国家 */}
            <ComboBox
                name="country"
                option={{ code: '', name: '' }}
                options={countries.map((c) => ({ code: c.code, name: c.name }))}
                code={country}
                onChange={(opt) => {
                    setCountry(opt.code);
                    setState('');
                    setCity('');
                }}
                placeholder="选择国家"
            />
            {/* 省份 */}
            <ComboBox
                name="state"
                option={{ code: '', name: '' }}
                options={states.map((s) => ({ code: s.code, name: s.name }))}
                code={state}
                onChange={(opt) => {
                    setState(opt.code);
                    setCity('');
                }}
                placeholder="选择省份/州"
            />
            {/* 城市 */}
            <ComboBox
                name="city"
                option={{ code: '', name: '' }}
                options={cities.map((c) => ({ code: c.code, name: c.name }))}
                code={city} //
                onChange={(opt) => setCity(opt.code)}
                placeholder="选择城市"
            />
        </div>
    );
}
