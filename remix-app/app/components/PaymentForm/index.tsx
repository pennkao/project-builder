import cardValidator from 'card-validator';
import { useState } from 'react';
import Cards from 'react-credit-cards-3';

import 'react-credit-cards-3/dist/es/styles-compiled.css';
const PaymentForm = ({ onChange }: { onChange: (state: CreditCardPaymentFormType) => void }) => {
    const [focusedField, setFocusedField] = useState<Focused>('');
    const [isVisible, setIsVisible] = useState(false);
    const [errors, setErrors] = useState('');

    const [state, setState] = useState<CreditCardPaymentFormType>({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
    });
    const content = `3-digit security code
usually found on the back of your card.
American Express cards have a 4-digit code located on the front.`;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
        onChange({ ...state, [name]: value });
    };

    let className = 'w-full px-4 py-3 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500';

    const validateAll = (name: Focused) => {
        let errs = '';
        if (name === '') {
            return;
        }
        let isValid = true;
        switch (name) {
            case 'number':
                const numberValidation = cardValidator.number(state.number);
                if (!numberValidation.isValid) errs = 'number:卡号不合法';
                isValid = false;
                break;
            case 'expiry':
                const expValidation = cardValidator.expirationDate(state.expiry);
                if (!expValidation.isValid) errs = 'expiry:到期日不合法/已过期';
                isValid = false;
                break;
            case 'cvc':
                const cvcValidation = cardValidator.cvv(state.cvc);
                if (!cvcValidation.isValid) errs = 'cvc: CVV 不合法';
                isValid = false;
                break;
            case 'name':
                const nameValidation = cardValidator.cardholderName(state.name);
                if (!nameValidation.isValid) errs = 'name: 姓名不合法';
                isValid = false;
                break;
            default:
                break;
        }

        if (!isValid) {
            setErrors(errs);

            return false;
        }
        return true;
    };
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocusedField(e.target.name as Focused);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value.trim() == '') {
            return;
        }
        const isValid = validateAll(e.target.name as Focused);
        if (!isValid) {
            e.target.classList.add('border-red-500');
        }
    };

    return (
        <div>
            <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={focusedField} />
            <div className="max-w-md mx-auto mt-1 bg-gray-100 rounded-lg shadow p-1">
                <span>{errors}</span>
            </div>
            <div className="max-w-md mx-auto mt-1 bg-gray-100 rounded-lg shadow p-1">
                <form method="post" className="space-y-2">
                    {/* Card Number */}
                    <div className="relative">
                        <input type="number" name="number" placeholder="Card number" value={state.number} onBlur={handleBlur} onChange={handleInputChange} onFocus={handleFocus} className={className} />
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

                    {/* Expiration Date */}
                    <input type="text" name="expiry" placeholder="Expiration date (MM / YY)" value={state.expiry} onBlur={handleBlur} onChange={handleInputChange} onFocus={handleFocus} className={className} />

                    {/* Security Code */}
                    <div className="relative">
                        <input type="text" name="cvc" placeholder="Security code" value={state.cvc} onBlur={handleBlur} onChange={handleInputChange} onFocus={handleFocus} className={className} />
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

                    {/* Name on Card */}
                    <input type="text" name="name" placeholder="Name on card" value={state.name} onBlur={handleBlur} onChange={handleInputChange} onFocus={handleFocus} className={className} />
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
