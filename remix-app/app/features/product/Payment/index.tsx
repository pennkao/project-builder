import PaymentForm from '@/components/PaymentForm';
import cardValidator from 'card-validator';
import { useState } from 'react';

export default function Payment() {
    const [errors, setErrors] = useState<string[]>([]);
    const [cardNumber, setCardNumber] = useState<CreditCardPaymentFormType>({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
    }); // number, expiry, cvc, name
    const errs: string[] = [];

    const validateAll = () => {
        const numberValidation = cardValidator.number(cardNumber.number);
        if (!numberValidation.isValid) setErrors([...errors, 'number,卡号不合法']);
        const expValidation = cardValidator.expirationDate(cardNumber.expiry);
        if (!expValidation.isValid) setErrors([...errors, 'expiry,到期日不合法/已过期']);
        const cvcValidation = cardValidator.cvv(cardNumber.cvc);
        if (!cvcValidation.isValid) setErrors([...errors, 'cvc,CVV 不合法']);

        if (cardNumber.name.trim().length === 0) setErrors([...errors, 'name,姓名不合法']);
        return errors.length === 0;
    };

    return (
        <>
            <PaymentForm onChange={setCardNumber} />
            <button type="submit" onClick={validateAll} className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
            {errs.length === 0 ? '' : `,${errors.join(',')}`}111111111111
            </button>
        </>
    );
}
