import { ComboBox, haveState } from '@/components/AddressSelector';
import countriesJson from '@/data/countries.json';
import { useNavigate } from 'react-router';

import { useEffect, useRef, useState } from 'react';
const userInfoKey = '--google:vtx:user:info';
export default function UserInfo({ action, defaultCountry, defaultState, defaultCity }: UserInfoProps) {
    const navigate = useNavigate();

    const [countries] = useState<CountryType[]>(countriesJson);
    const [states, setStates] = useState<StateType[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);
    const [country, setCountry] = useState(defaultCountry || 'US');
    const [state, setState] = useState(defaultState || '');
    const [city, setCity] = useState(defaultCity || '');
    const [useInfoForm, setUseInfoForm] = useState<UserInfoFormType>({} as UserInfoFormType);

    const handleUserInfoChange = (key: keyof UserInfoFormType, value: string) => {
        console.log('key', key, 'value', value);
        console.log('useInfoForm', useInfoForm);
        setUseInfoForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const isHaveState = haveState(country);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem(userInfoKey) || '{}');

        if (userInfo) {
            setCountry(userInfo?.addressSelected?.country || defaultCountry || 'US');
            setState(userInfo?.addressSelected?.state || defaultState || '');
            setCity(userInfo?.addressSelected?.city || defaultCity || '');
            setUseInfoForm({
                country: userInfo?.country || '',
                state: userInfo?.state || '',
                city: userInfo?.city || '',
                email: userInfo?.email || '',
                firstName: userInfo?.firstName || '',
                lastName: userInfo?.lastName || '',
                company: userInfo?.company || '',
                address: userInfo?.address || '',
                address2: userInfo?.address2 || '',
                zipCode: userInfo?.zipCode || '',
                phone: userInfo?.phone || '',
            });
        }
    }, []);
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
        handleUserInfoChange('state', '');
        handleUserInfoChange('city', '');
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
        handleUserInfoChange('city', '');
        fetch(`/data/cities/${country}.cities.json`)
            .then((res) => res.json())
            .then((json) => json[state] || [])
            .then((data) => setCities(data))
            .catch(() => setCities([]));
    }, [country, state]);

    // 🔹 通知外部变更
    // useEffect(() => {
    //     onChange?.(country, state, city);
    // }, [country, state, city]);
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
        localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
        console.log('userInfo', useInfoForm);
        if (!userInfo.email || !userInfo.zipCode || !userInfo.firstName || !userInfo.lastName || !userInfo.address || !userInfo.country || !userInfo.city) {
            alert('请填写完整信息');
            return;
        }
        console.log('aaaaaaaaaaaaaaaaa');

        // navigate('/checkout');
    };
    const className = 'w-full  p-2  input-main';
    const addressClassName = 'rounded-lg border border-gray-300 bg-white transition-colors py-1';
    return (
        <div className="flex items-center justify-center  ">
            <div className="w-full max-w-md bg-white-1 ">
                <form ref={formRef} className="space-y-2 p-1 gap-4 bg-content">
                    <input type="email" name="email" placeholder="Email" required className={className} value={useInfoForm.email} onChange={(e) => handleUserInfoChange('email', e.target.value)} />
                    <ComboBox
                        options={countries.map((c) => ({ code: c.code, name: c.name }))}
                        value={country}
                        className={addressClassName}
                        onInputChange={(val) => {
                            handleUserInfoChange('country', val);
                        }}
                        onChange={(code) => {
                            setCountry(code);
                            setState('');
                            setCity('');
                        }}
                        placeholder="Country/Region"
                    />
                    <div className="flex justify-between w-full gap-1">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            required
                            className={`w-1/2 ${className}`}
                            value={useInfoForm.firstName || ''}
                            onChange={(e) => handleUserInfoChange('firstName', e.target.value)}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            required
                            className={`w-1/2 ${className}`}
                            value={useInfoForm.lastName || ''}
                            onChange={(e) => handleUserInfoChange('lastName', e.target.value)}
                        />
                    </div>
                    <input type="text" name="company" placeholder="Company (Optional)" className={className} value={useInfoForm.company || ''} onChange={(e) => handleUserInfoChange('company', e.target.value)} />
                    <input type="text" name="address" placeholder="Address" className={className} value={useInfoForm.address || ''} onChange={(e) => handleUserInfoChange('address', e.target.value)} />
                    <input
                        type="text"
                        name="address2"
                        placeholder="Apartment, suite, etc. (Optional)"
                        className={className}
                        value={useInfoForm.address2 || ''}
                        onChange={(e) => handleUserInfoChange('address2', e.target.value)}
                    />

                    {/* 城市 */}
                    {!isHaveState && <input type="text" name="city" placeholder="city" value={useInfoForm?.city || ''} onChange={(e) => handleUserInfoChange('city', e.target.value)} required className={className} />}
                    {isHaveState && (
                        <>
                            <ComboBox
                                options={cities.map((c) => ({ code: c.name, name: c.name }))} //
                                mustSelect={false}
                                value={city}
                                className={addressClassName}
                                onInputChange={(val) => {
                                    handleUserInfoChange('city', val);
                                }}
                                onChange={(code) => {
                                    setCity(code);
                                }}
                                placeholder="City"
                            />

                            <ComboBox
                                options={states.map((s) => ({ code: s.code, name: s.name }))}
                                value={state}
                                className={addressClassName}
                                onInputChange={(val) => {
                                    handleUserInfoChange('state', val);
                                }}
                                onChange={(code) => {
                                    setState(code);
                                    setCity('');
                                }}
                                placeholder="State"
                            />
                        </>
                    )}
                    <input type="text" name="zipCode" placeholder="Zip code" required className={className} value={useInfoForm?.zipCode || ''} onChange={(e) => handleUserInfoChange('zipCode', e.target.value)} />
                    <input type="number" name="phone" placeholder="Phone" required className={className} value={useInfoForm?.phone || ''} onChange={(e) => handleUserInfoChange('phone', e.target.value)} />
                    {/* 隐藏 input 提交 code */}
                    <input type="hidden" name="country" value={useInfoForm?.country || ''} required />
                    <input type="hidden" name="state" value={useInfoForm?.state || ''} required />
                    {isHaveState && <input type="hidden" name="city" value={useInfoForm?.city || ''} required />}
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
