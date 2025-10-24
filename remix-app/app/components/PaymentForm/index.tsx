import { checkCvv, checkExpiredDate, checkName, checkNumber, formatCardNumber, formatExpireDateInput } from '@/utils/card';
import { useState } from 'react';
import Cards from 'react-credit-cards-3';

import 'react-credit-cards-3/dist/es/styles-compiled.css';
const PaymentForm = ({ onChange }: { onChange: (state: CreditCardPaymentFormType) => void }) => {
    const [focusedField, setFocusedField] = useState<Focused>('');
    const [isVisible, setIsVisible] = useState(false);
    const [errors, setErrors] = useState<CardErrorType>({ number: '', expiry: '', cvc: '', name: '' });

    const [state, setState] = useState<CreditCardPaymentFormType>({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
    });
    const content = `3-digit security code
usually found on the back of your card.
American Express cards have a 4-digit code located on the front.`;

    const formatExpireInput = (input: string) => {
        // 去掉非数字
        let v = input.replace(/\D/g, '');
        // 限制为4位数字
        if (v.length > 4) v = v.slice(0, 4);
        // 自动插入 /
        if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
        return v;
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'expiry') {
            setState((prev) => ({ ...prev, [name]: formatExpireDateInput(value) }));
        }
        if (name === 'cvc') {
            // 限制为3位数字
            let v = e.target.value.replace(/\D/g, ''); // 只允许数字
            // 限制最大长度 4
            if (v.trim().length > 4) v = v.slice(0, 4);
            setState((prev) => ({ ...prev, [name]: v }));
        }
        if (name === 'number') {
            // 限制为16位数字
            let v = e.target.value.replace(/\D/g, ''); // 只允许数字
            // 限制最大长度 16
            if (v.trim().length > 19) v = v.slice(0, 19);
            v = formatCardNumber(v);
            setState((prev) => ({ ...prev, [name]: v }));
        }
        if (name === 'name') {
            setState((prev) => ({ ...prev, [name]: value }));
        }
        // setState((prev) => ({ ...prev, [name]: value }));
        onChange({ ...state, [name]: value });
    };

    const validateAll = (name: Focused) => {
        if (name === '') {
            return;
        }
        let error: CardErrorType = {
            number: '',
            expiry: '',
            cvc: '',
            name: '',
        };
        switch (name) {
            case 'number':
                const numberValidation = checkNumber(state.number);
                error.number = numberValidation.message;
                if (!numberValidation.result) setErrors(error);
                return;
            case 'expiry':
                const expValidation = checkExpiredDate(state.expiry);
                console.log(expValidation);
                error.expiry = expValidation.message;
                if (!expValidation.result) setErrors(error);
                return;
            case 'cvc':
                const cvcValidation = checkCvv(state.cvc);
                error.cvc = cvcValidation.message;
                if (!cvcValidation.result) setErrors(error);
                return;
            case 'name':
                const nameValidation = checkName(state.name);
                error.name = nameValidation.message;
                if (!nameValidation.result) setErrors(error);
                return;
            default:
                break;
        }
    };
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocusedField(e.target.name as Focused);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value.trim() == '') {
            return;
        }
        validateAll(e.target.name as Focused);
    };

    const handleError = (name: Focused) => {
        // return errors[name] !== '' ? errors[name] : '';
    };
    const errorLineClassName = 'px-1 text-sm h-6 text-error';
    const className = 'w-full px-4 py-2 input-main';

    return (
        <div>
            <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={focusedField} />

            <div className="max-w-md mx-auto mt-2 bg-content rounded-lg p-1">
                <form method="post" className=" border-none flex flex-col">
                    {/* Card Number */}
                    <div className="relative">
                        <input
                            type="text"
                            inputMode="numeric" // 软键盘只显示数字
                            pattern="\d*"
                            name="number"
                            placeholder="Card number"
                            value={state.number}
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            className={className}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-help transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 14 14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="M2.5 7c0-.966.784-1.75 1.75-1.75h5.5c.966 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 0 1-1.75 1.75h-5.5A1.75 1.75 0 0 1 2.5 10.5zm7-1.75V4.22c0-1.364-1.12-2.47-2.5-2.47S4.5 2.856 4.5 4.22v1.03" />
                            </svg>
                        </div>
                    </div>
                    <p className={errorLineClassName}>{errors.number}</p>
                    {/* Expiration Date */}
                    <input type="text" name="expiry" placeholder="Expiration date (MM / YY)" value={state.expiry} onBlur={handleBlur} onChange={handleInputChange} onFocus={handleFocus} className={className} />
                    <p className={errorLineClassName}>{errors.expiry}</p>
                    {/* Security Code */}
                    <div className="relative">
                        <input
                            type="test"
                            name="cvc"
                            pattern="\d*"
                            inputMode="numeric"
                            placeholder="Security code"
                            value={state.cvc}
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            className={className}
                        />
                        <div onClick={() => setIsVisible(!isVisible)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-help transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 1 1 5.83 1c0 1.5-1.5 2.25-2.25 2.25h-.17v1.5" />
                                <line x1="12" y1="17" x2="12" y2="17.01" />
                            </svg>
                        </div>
                        {/* Tooltip 内容 */}
                        {isVisible && (
                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-0">
                                <div className="bg-black text-white text-xs px-3 py-2 rounded-lg shadow-lg max-w-xs">
                                    {content.split('\n').map((line, i) => (
                                        <div key={i} className="mb-1">
                                            {line}
                                        </div>
                                    ))}
                                    <div className="w-2 h-2 bg-black rotate-45 absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <p className={errorLineClassName}>{errors.cvc}</p>
                    {/* Name on Card */}
                    <input type="text" name="name" placeholder="Name on card" value={state.name} onBlur={handleBlur} onChange={handleInputChange} onFocus={handleFocus} className={className} />
                    <p className={errorLineClassName}>{errors.name}</p>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
