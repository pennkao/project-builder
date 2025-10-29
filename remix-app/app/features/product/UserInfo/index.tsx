import { ComboBox, haveState } from '@/components/AddressSelector';
import countriesJson from '@/data/countries.json';
import { useNavigate } from 'react-router';

import { useEffect, useRef, useState } from 'react';
export const userInfoKey = '--google:vtx:user:info';
const initialUserInfoForm: UserInfoFormType = {
    country: { code: '', name: '' },
    state: { code: '', name: '' },
    city: { code: '', name: '' },
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    address2: '',
    zipCode: '',
    phone: '',
};
export default function UserInfo({ action, defaultCountry }: UserInfoProps) {
    const navigate = useNavigate();

    const [countries] = useState<CountryType[]>(countriesJson);
    const [states, setStates] = useState<StateType[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);
    const [isInitDone, setIsInitDone] = useState(false);

    const [useInfoForm, setUseInfoForm] = useState<UserInfoFormType>(initialUserInfoForm);
    const [address, setAddress] = useState<AddressSelectedType>({ country: '', state: '', city: '' });
    const handleUserInfoChange = (key: keyof UserInfoFormType, value: string) => {
        setUseInfoForm((prev) => ({
            ...prev,
            [key]: value,
        }));

    };

    const handleCity = (key: keyof UserInfoFormType, value: string) => {
        console.log('handleCity', key, value);
        setAddress(prev => ({ ...prev, city: value }));
    }
    const handleUserAddressChange = (key: keyof UserInfoFormType, value: AddressOptionType) => {
        setUseInfoForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const isHaveState = haveState(useInfoForm.country.code);
    const formRef = useRef<HTMLFormElement>(null);
    const hydratedRef = useRef(false);

    useEffect(() => {
        const stored = localStorage.getItem(userInfoKey);
        if (!stored) {
            return;
        }
        const userInfo = JSON.parse(stored);
        console.log('userInfo', userInfo);
        if (userInfo) {
            setUseInfoForm(userInfo);
            setAddress({ country: userInfo.country.name, state: userInfo.state.name, city: userInfo.city.name });
        }
        hydratedRef.current = true;
    }, []);

    // 🔹 国家变化时加载省份
    useEffect(() => {
        if (!useInfoForm.country.code) {
            setStates([]);
            setCities([]);
            return;
        }
        setStates([]);
        setCities([]);

        handleUserAddressChange('state', { code: '', name: '' });
        handleUserAddressChange('city', { code: '', name: '' });
        fetch(`/data/states/${useInfoForm.country.code}.states.json`)
            .then((res) => res.json())
            .then((data) => setStates(data))
            .catch(() => setStates([]));
    }, [useInfoForm.country.code, hydratedRef]);

    // // 🔹 省份变化时加载城市
    useEffect(() => {
        if (!useInfoForm.state.code) {
            setCities([]);
            return;
        }
        setCities([]);
        handleUserAddressChange('city', { code: '', name: '' });
        setAddress(prev => ({ ...prev, state: useInfoForm.state.name }));

        fetch(`/data/cities/${useInfoForm.country.code}.cities.json`)
            .then((res) => res.json())
            .then((json) => json[useInfoForm.state.code] || [])
            .then((data) => setCities(data))
            .catch(() => setCities([]));
    }, [useInfoForm.state]);

    useEffect(() => {
        if (!useInfoForm.city.code) {
            return;
        }
        setAddress(prev => ({ ...prev, city: useInfoForm.city.name }));
    }, [useInfoForm.city]);
    // 🔹 通知外部变更
    // useEffect(() => {
    //     onChange?.(country, state, city);
    // }, [country, state, city]);
    const handleSubmit = () => {
        if (!formRef.current) return;

        localStorage.setItem(userInfoKey, JSON.stringify(useInfoForm));
        console.log('userInfo', useInfoForm);
        if (!useInfoForm.email || !useInfoForm.zipCode || !useInfoForm.firstName || !useInfoForm.lastName || !useInfoForm.address || !useInfoForm.country.name || !useInfoForm.city.name) {
            alert('请填写完整信息');
            return;
        }

        navigate('/checkout');
    };
    const className = 'w-full  p-2  input-main';
    const addressClassName = 'rounded-lg border border-gray-300 bg-white transition-colors py-1';
    return (
        <div className="flex items-center justify-center  ">
            <div className="w-full max-w-md bg-white-1 ">
                <form ref={formRef} className="space-y-2 p-1 gap-4 bg-content">
                    <input type="email" name="email" placeholder="Email" required className={className} value={useInfoForm.email} onChange={(e) => handleUserInfoChange('email', e.target.value)} />
                    <ComboBox
                        name="country"
                        option={useInfoForm.country}
                        options={countries.map((c) => ({ code: c.code, name: c.name }))}
                        className={addressClassName}
                        onChange={(opt) => {
                            handleUserAddressChange('country', opt);
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
                    {!isHaveState && (
                        <input type="text" name="city" placeholder="city" value={useInfoForm?.city?.name || address?.city ||''} onChange={(e) => handleCity('city', e.target.value)} required className={className} />
                    )}
                    {isHaveState && (
                        <>
                            <ComboBox
                                name="city"
                                option={useInfoForm?.city}
                                options={cities.map((c) => ({ code: c.name, name: c.name }))} //
                                className={addressClassName}
                                onChange={(opt) => {
                                    handleUserAddressChange('city', opt);
                                }}
                                placeholder="City"
                            />

                            <ComboBox
                                name="state"
                                option={useInfoForm?.state}
                                options={states.map((s) => ({ code: s.code, name: s.name }))}
                                className={addressClassName}
                                onChange={(opt) => {
                                    handleUserAddressChange('state', opt);
                                }}
                                placeholder="State"
                            />
                        </>
                    )}
                    <input type="text" name="zipCode" placeholder="Zip code" required className={className} value={useInfoForm?.zipCode || ''} onChange={(e) => handleUserInfoChange('zipCode', e.target.value)} />
                    <input type="number" name="phone" placeholder="Phone" required className={className} value={useInfoForm?.phone || ''} onChange={(e) => handleUserInfoChange('phone', e.target.value)} />
                    {/* 隐藏 input 提交 code */}
                    <input type="hidden" name="country" value={address.country || useInfoForm.country?.name || ''} required />
                    <input type="hidden" name="state" value={address.state || useInfoForm.state?.name || ''} required />
                    {isHaveState && <input type="hidden" name="city" value={address.city || useInfoForm.city?.name || ''} required />}
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
