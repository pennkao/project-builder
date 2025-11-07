import { ComboBox, haveState } from '@/components/AddressSelector';
import { Keys } from '@/config/keys';
import countriesJson from '@/data/countries.json';
import { initialUserInfoForm } from '@/data/data';
import { useJump } from '@/hooks/useJump';
import useMessageBox from '@/hooks/useMessageBox';
import { fetchStates } from '@/utils/cities.client';
import { postalCodePatterns } from '@/utils/tools';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const timeout = 2000;
export default function UserInfo({ position = 'user-info', action, defaultCountry, buttonText }: UserInfoProps) {
    const navigate = useNavigate();
    const { showMessageBox, hideMessageBox, MessageBoxComponent } = useMessageBox();

    const { t, i18n } = useTranslation(); // 默认 namespace 是 "common"
    const { isLoading, DoJump, Loading } = useJump(position, action);

    const [countries] = useState<CountryType[]>(countriesJson);
    const [states, setStates] = useState<StateType[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);
    // const [isInitDone, setIsInitDone] = useState(false);
    const hydratedRef = useRef(false);
    const [useInfoForm, setUseInfoForm] = useState<UserInfoFormType>(initialUserInfoForm);
    const [address, setAddress] = useState<AddressSelectedType>({ country: '', state: '', city: '' });
    const handleUserInfoChange = (key: keyof UserInfoFormType, value: string) => {
        setUseInfoForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleUnlock = () => {
        hydratedRef.current = true;
    };

    const handleUserAddressChange = (key: keyof UserInfoFormType, value: AddressOptionType) => {
        setUseInfoForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const isHaveState = haveState(useInfoForm.country.code);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const stored = localStorage.getItem(Keys.UseInfo);
        if (stored) {
            const userInfo = JSON.parse(stored);
            if (userInfo) {
                setUseInfoForm(userInfo);
                setAddress({ country: userInfo.country.name, state: userInfo.state.name, city: userInfo.city.name });
            }
            return;
        }

        const ipInfo = localStorage.getItem(Keys.IP);
        if (ipInfo) {
            const ipData = JSON.parse(ipInfo);
            setUseInfoForm((prev) => ({
                ...prev,
                country: { code: ipData.country_code || 'US', name: ipData.country_name || 'United States' },
                state: { code: ipData.region_code || '', name: ipData.region || '' },
                city: ipData.city || '',
                zipCode: ipData.postal || '',
            }));
        }
    }, []);

    // 🔹 国家变化时加载省份
    useEffect(() => {
        if (!useInfoForm.country.code) {
            setStates([]);
            return;
        }
        fetchStates(useInfoForm.country.code).then((data) => setStates(data));
        if (!hydratedRef.current) return; // 防止在初始化时触发
        setStates([]);
        useInfoForm.city = '';
        useInfoForm.zipCode = '';
        handleUserAddressChange('state', { code: '', name: '' });
    }, [useInfoForm.country]);

    // // 🔹 省份变化时加载城市
    useEffect(() => {
        if (!useInfoForm.state.code) {
            setCities([]);
            return;
        }
        setAddress((prev) => ({ ...prev, state: useInfoForm.state.name }));
    }, [useInfoForm.state]);

    const handleSubmit = () => {
        if (!formRef.current) return;
        const pattern = postalCodePatterns[useInfoForm.country.code];
        if (!pattern) {
            showMessageBox(t('message.error.invalid_country'), 'error', timeout);
            return;
        }

        if (!useInfoForm.country.name) {
            showMessageBox(t('message.error.invalid_country'), 'error', timeout);
            return;
        }
        if (!useInfoForm.city) {
            showMessageBox(t('message.error.invalid_city'), 'error', timeout);
            return;
        }
        if (isHaveState && !useInfoForm.state.name) {
            if (!address.state) {
                showMessageBox(t('message.error.invalid_state'), 'error', timeout);
                return;
            }
            useInfoForm.state.name = address.state;
        }
        if (!useInfoForm.zipCode) {
            showMessageBox(t('message.error.invalid_zip'), 'error', timeout);
            return;
        }
        if (!useInfoForm.email) {
            showMessageBox(t('message.error.invalid_email'), 'error', timeout);
            return;
        }
        if (!useInfoForm.firstName) {
            showMessageBox(t('message.error.invalid_first_name'), 'error', timeout);
            return;
        }
        if (!useInfoForm.lastName) {
            showMessageBox(t('message.error.invalid_last_name'), 'error', timeout);
            return;
        }
        if (!useInfoForm.address) {
            showMessageBox(t('message.error.invalid_address'), 'error', timeout);
            return;
        }
        if (!useInfoForm.zipCode.match(pattern)) {
            showMessageBox(t('message.error.invalid_zip'), 'error', timeout);
            return;
        }
        localStorage.setItem(Keys.UseInfo, JSON.stringify(useInfoForm));
        DoJump();
        // navigate('/checkout');
        // action('saveUserInfo');
    };
    const className = 'w-full  p-2  input-main';
    const addressClassName = 'rounded-lg border border-gray-300 bg-white transition-colors py-1 text-base';
    return (
        <>
            <div className="flex items-center justify-center  ">
                <div className="w-full max-w-md bg-white-1 ">
                    <form ref={formRef} className="space-y-2 p-1 gap-4 bg-content">
                        <input type="email" name="email" placeholder={t('userinfo.email')} required className={className} value={useInfoForm.email} onChange={(e) => handleUserInfoChange('email', e.target.value)} />
                        <ComboBox
                            name="country"
                            option={useInfoForm.country}
                            options={countries.map((c) => ({ code: c.code, name: c.name }))}
                            className={addressClassName}
                            isLock={hydratedRef.current}
                            onUnlock={() => handleUnlock()}
                            onChange={(opt) => {
                                handleUserAddressChange('country', opt);
                            }}
                            placeholder={t('userinfo.country')}
                        />
                        <div className="flex justify-between w-full gap-1">
                            <input
                                type="text"
                                name="firstName"
                                placeholder={t('userinfo.first_name')}
                                required
                                className={`w-1/2 ${className}`}
                                value={useInfoForm.firstName || ''}
                                onChange={(e) => handleUserInfoChange('firstName', e.target.value)}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder={t('userinfo.last_name')}
                                required
                                className={`w-1/2 ${className}`}
                                value={useInfoForm.lastName || ''}
                                onChange={(e) => handleUserInfoChange('lastName', e.target.value)}
                            />
                        </div>
                        <input type="text" name="company" placeholder={t('userinfo.company')} className={className} value={useInfoForm.company || ''} onChange={(e) => handleUserInfoChange('company', e.target.value)} />
                        <input type="text" name="address" placeholder={t('userinfo.address')} className={className} value={useInfoForm.address || ''} onChange={(e) => handleUserInfoChange('address', e.target.value)} />
                        <input
                            type="text"
                            name="address2"
                            placeholder={t('userinfo.address2')}
                            className={className}
                            value={useInfoForm.address2 || ''}
                            onChange={(e) => handleUserInfoChange('address2', e.target.value)}
                        />

                        <input type="text" name="city" placeholder={t('userinfo.city')} value={useInfoForm?.city || ''} onChange={(e) => handleUserInfoChange('city', e.target.value)} required className={className} />
                        {isHaveState && (
                            <ComboBox
                                name="state"
                                option={useInfoForm?.state}
                                onUnlock={() => handleUnlock()}
                                isLock={hydratedRef.current}
                                options={states.map((s) => ({ code: s.code, name: s.name }))}
                                className={addressClassName}
                                onChange={(opt) => {
                                    handleUserAddressChange('state', opt);
                                }}
                                placeholder={t('userinfo.state')}
                            />
                        )}
                        <input
                            type="text"
                            name="zipCode"
                            placeholder={t('userinfo.zip_code')}
                            required
                            className={className}
                            value={useInfoForm?.zipCode || ''}
                            onChange={(e) => handleUserInfoChange('zipCode', e.target.value)}
                        />
                        <input
                            type="number"
                            name="phone"
                            placeholder={t('userinfo.phone')}
                            required
                            className={className}
                            value={useInfoForm?.phone || ''}
                            onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                        />
                        {/* 隐藏 input 提交 code */}
                        <input type="hidden" name="country" value={address.country || useInfoForm.country?.name || ''} required />
                        <input type="hidden" name="state" value={address.state || useInfoForm.state?.name || ''} required />
                    </form>
                    <button onClick={handleSubmit} className=" mt-2 w-full button-main">
                        {buttonText || t('common.continue')}
                    </button>
                </div>
                {MessageBoxComponent}
            </div>
            {Loading}
        </>
    );
}
