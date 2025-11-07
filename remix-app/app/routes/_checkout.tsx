import { redirect } from '@remix-run/node';

export const loader = async () => {
    // 访问 /checkout/ 时，直接跳转到首页
    return redirect('/');
};

export default function CheckoutIndexRedirect() {
    return null;
}
