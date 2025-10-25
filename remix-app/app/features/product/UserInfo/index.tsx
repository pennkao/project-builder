import { ComboBox, haveState } from '@/components/AddressSelector';
import countriesJson from '@/data/countries.json';
import { useNavigate } from 'react-router';

import { useEffect, useRef, useState } from 'react';
const userInfoKey = '--google:vtx:user:info';
export default function UserInfo({ action, defaultCountry, defaultState, defaultCity, onChange }: UserInfoProps) {
    const userInfo = localStorage && localStorage.getItem(userInfoKey) ? JSON.parse(localStorage.getItem(userInfoKey) || '{}') : null;
    const navigate = useNavigate();

    const [countries] = useState<CountryType[]>(countriesJson);
    const [states, setStates] = useState<StateType[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);

    const [country, setCountry] = useState(userInfo?.addressSelected?.country || defaultCountry || 'US');
    const [state, setState] = useState(userInfo?.addressSelected?.state || defaultState || '');
    const [city, setCity] = useState(userInfo?.addressSelected?.city || defaultCity || '');

    const isHaveState = haveState(country);
    const formRef = useRef<HTMLFormElement>(null);

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
    const handleSubmit = () => {
        if (!formRef.current) return;
        const userInfo: UserInfoType = {
            addressSelected: {
                country,
                state,
                city,
            },
            phone: formRef.current?.phone?.value || '',
            email: formRef.current?.email?.value || '',
            firstName: formRef.current?.firstName?.value || '',
            lastName: formRef.current?.lastName?.value || '',
            company: formRef.current?.company?.value || '',
            address: formRef.current?.address?.value || '',
            address2: formRef.current?.address2?.value || '',
            zipCode: formRef.current?.zipCode?.value || '',
            country: formRef.current?.country?.value || '', // country
            state: formRef.current?.state?.value || '', // state
            city: formRef.current?.city?.value || '', // city
        };

        if (!userInfo.email || !userInfo.zipCode || !userInfo.firstName || !userInfo.lastName || !userInfo.address || !userInfo.country || !userInfo.state || !userInfo.city) {
            console.log('userInfo', userInfo);
            return;
        }

        localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
        navigate('/checkout');
    };
    const className = 'w-full  p-2  input-main';
    const addressClassName = 'rounded-lg border border-gray-300 bg-white transition-colors py-1';
    return (
        <div className="flex items-center justify-center  ">
            <div className="w-full max-w-md bg-white-1 ">
                <form ref={formRef} className="space-y-2 p-1 gap-4 bg-content">
                    <input type="email" name="email" placeholder="Email" required className={className} value={userInfo?.email || ''} />
                    <ComboBox
                        options={countries.map((c) => ({ code: c.code, name: c.name }))}
                        value={country}
                        className={addressClassName}
                        onChange={(code) => {
                            setCountry(code);
                            setState('');
                            setCity('');
                        }}
                        placeholder="Country/Region"
                    />
                    <div className="flex justify-between w-full gap-1">
                        <input type="text" name="firstName" placeholder="First Name" required className={`w-1/2 ${className}`} value={userInfo?.firstName || ''} />
                        <input type="text" name="lastName" placeholder="Last Name" required className={`w-1/2 ${className}`} value={userInfo?.lastName || ''} />
                    </div>
                    <input type="text" name="company" placeholder="Company (Optional)" className={className} value={userInfo?.company || ''} />
                    <input type="text" name="address" placeholder="Address" className={className} value={userInfo?.address || ''} />
                    <input type="text" name="address2" placeholder="Apartment, suite, etc. (Optional)" className={className} value={userInfo?.address2 || ''} />

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
                    <input type="text" name="zipCode" placeholder="Zip code" required className={className} value={userInfo?.zipCode || ''} />
                    <input type="number" name="phone" placeholder="Phone" required className={className} value={userInfo?.phone || ''} />
                    {/* 隐藏 input 提交 code */}
                    <input type="hidden" name="country" value={country} required />
                    <input type="hidden" name="state" value={state} required />
                    {isHaveState && <input type="hidden" name="city" value={city} required />}
                    {/* <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium">
                        提交
                    </button> */}
                </form>
                <button onClick={handleSubmit} className=" mt-2 w-full button-main">
                    继 续agc
                </button>
            </div>
        </div>
    );
}
