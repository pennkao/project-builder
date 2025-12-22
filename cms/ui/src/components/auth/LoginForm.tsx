import { Button } from '@/components/elements';
import Checkbox from '@/components/elements/Checkbox';
import Input from '@/components/elements/InputField';
import Label from '@/components/elements/Label';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import { useState } from 'react';
import { Link } from 'react-router';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        // 简单前端邮箱格式验证
        function isValidEmail(email: string): boolean {
            if (!email) return false;
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        }

        try {
            // 验证邮箱格式
            if (!email || !password) {
                setError('Email or Password are required');
                setLoading(false);
                return;
            }
            if (!isValidEmail(email)) {
                setError('Login failed');
                setLoading(false);
                return;
            }
            // 调用后台登录 API
            const res = (await fetch('/the-door/come-in', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })) as Response & { code: number; message: string };

            if (!res.ok || res.status !== 200) {
                setError('Login failed');
                setLoading(false);
                return;
            }

            const data = await res.json();
            if (!data || data.code !== 0 || data.data.token === '') {
                setError(data.message || 'Login failed');
                return;
            }

            window.location.href = '/admin'; // 登录后跳转后台主页
        } catch (err) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col flex-1">
            <div className="w-full max-w-md pt-10 mx-auto"></div>
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div className="max-sm:px-1">
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Sign In</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enter your email and password to sign in!</p>
                    </div>
                    <div>
                        <div className="relative py-3 sm:py-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm"></div>
                        </div>
                        {error && <div className="mb-4 text-sm text-red-500 dark:text-red-400">{error}</div>}
                        <form onSubmit={handleSubmit} action="/the-door/come-in" method="POST">
                            <div className="space-y-6">
                                <div>
                                    <Label>
                                        Email <span className="text-error-500">*</span>{' '}
                                    </Label>
                                    <Input type="email" name="email" placeholder="info@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <Label>
                                        Password <span className="text-error-500">*</span>{' '}
                                    </Label>
                                    <div className="relative">
                                        <Input type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                                        <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                                            {showPassword ? <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" /> : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Checkbox checked={isChecked} onChange={setIsChecked} />
                                        <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">Keep me logged in</span>
                                    </div>
                                    <Link to="/reset-password" className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div>
                                    <Button className="w-full" size="sm" disabled={loading}>
                                        {loading ? 'Signing in...' : 'Sign in'}
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-5"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
