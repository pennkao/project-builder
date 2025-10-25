import { ComboBox, haveState } from '@/components/AddressSelector';
import countriesJson from '@/data/countries.json';
import { useEffect, useState } from 'react';

export default function UserInfo({ action, defaultCountry, defaultState, defaultCity, onChange }: UserInfoProps) {
    const [countries] = useState<Country[]>(countriesJson);
    const [states, setStates] = useState<StateType[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const [country, setCountry] = useState(defaultCountry || 'US');
    const [state, setState] = useState(defaultState || '');
    const [city, setCity] = useState(defaultCity || '');
    const isHaveState = haveState(country);
    // 🔹 国家变化时加载省份
    useEffect(() => {
        console.log('country changed', country);
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

    const className = 'w-full  p-2  input-main';
    const addressClassName = 'rounded-lg border border-gray-300 bg-white transition-colors py-1';
    return (
        <div className="flex items-center justify-center  ">
            <div className="w-full max-w-md bg-white-1 ">
                <form className="space-y-2 p-1 gap-4 bg-content">
                    <input type="email" name="email" placeholder="Email" required className={className} />
                    <ComboBox
                        options={countries.map((c) => ({ code: c.code, name: c.name }))}
                        value={country}
                        className={addressClassName}
                        onChange={(code) => {
                            console.log('country changed', code);
                            setCountry(code);
                            setState('');
                            setCity('');
                        }}
                        placeholder="Country/Region"
                    />
                    <div className="flex justify-between w-full gap-1">
                        <input type="text" name="firstName" placeholder="First Name" required className={`w-1/2 ${className}`} />
                        <input type="text" name="lastName" placeholder="Last Name" required className={`w-1/2 ${className}`} />
                    </div>
                    <input type="text" name="company" placeholder="Company (Optional)" className={className} />
                    <input type="text" name="address1" placeholder="Address" className={className} />
                    <input type="text" name="address2" placeholder="Apartment, suite, etc. (Optional)" className={className} />
                    {/* 城市 */}
                    {!isHaveState && <input type="text" name="city" placeholder="city" required className={className} />}
                    {isHaveState && (
                        <>
                            <ComboBox
                                options={cities.map((c) => ({ code: c.name, name: c.name }))} //
                                mustSelect={false}
                                value={city}
                                className={addressClassName}
                                onChange={(code) => {
                                    setCity(code);
                                    console.log('city changed', code);
                                }}
                                placeholder="City"
                            />

                            <ComboBox
                                options={states.map((s) => ({ code: s.code, name: s.name }))}
                                value={state}
                                className={addressClassName}
                                onChange={(code) => {
                                    setState(code);
                                    console.log('state changed', code);
                                    setCity('');
                                }}
                                placeholder="State"
                            />
                        </>
                    )}
                    <input type="text" name="postalCode" placeholder="Zip code" required className={className} />
                    <input type="tel" name="phone" placeholder="Phone" required className={className} />
                    {/* 隐藏 input 提交 code */}
                    <input type="hidden" name="country" value={country} required />
                    <input type="hidden" name="state" value={state} required />
                    {isHaveState && <input type="hidden" name="city" value={city} required />}
                    {/* <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium">
                        提交
                    </button> */}
                </form>
                <button
                    onClick={() => {
                        action('tab3');
                        console.log('action...');
                    }}
                    className=" mt-2 w-full button-main"
                >
                    继 续agc
                </button>
            </div>
        </div>
    );
}
