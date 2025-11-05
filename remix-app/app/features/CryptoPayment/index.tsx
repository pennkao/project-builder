import Countdown from '@/components/Countdown';
import { Cryptos } from '@/config/crypto';
import { Keys } from '@/config/keys';
import useMessageBox from '@/hooks/useMessageBox';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

const MIN_CLICK_INTERVAL = 15; // 秒

const CryptoCheckout = ({ payment }: { payment: string }) => {
    const [selectedCrypto, setSelectedCrypto] = useState<CrypoType | null>(null);
    const { showMessageBox, hideMessageBox, MessageBoxComponent } = useMessageBox(false);
    const [showVerifying, setShowVerifying] = useState(false);
    const [paidNum, setPaidNum] = useState(0);
    const [validPaidNum, setValidPaidNum] = useState(0);

    // 新增：记录弹窗打开时间戳
    const [openTime, setOpenTime] = useState<number | null>(null);

    // 模拟预计验证时间
    const copyAddress = (address: string) => {
        if (!address) return;
        navigator.clipboard.writeText(address).then(() => {
            showMessageBox(t('checkout.address_copied'), 'success', 800);
        });
    };

    useEffect(() => {
        const num = localStorage.getItem(Keys.CheckPayNum);
        if (num) setPaidNum(Number(num));
    }, []);

    const handleSelectedCrypto = (cryptoType: CrypoType) => {
        setSelectedCrypto(cryptoType);
        setOpenTime(Date.now()); // ✅ 记录弹窗打开时间
    };

    const handlePaidClick = (cryptoType: CrypoType) => {
        setOpenTime(Date.now()); // ✅ 记录弹窗打开时间

        if (validPaidNum > 3) {
            showMessageBox(t('checkout.paid_valid_tips'), 'error', 4000);
            return;
        }
        setValidPaidNum((prev) => prev + 1);
        // ✅ 新增：防止10秒内乱点
        if (openTime) {
            const elapsed = (Date.now() - openTime) / 1000;
            console.log('elapsed', elapsed);
            if (elapsed < MIN_CLICK_INTERVAL) {
                showMessageBox(t('checkout.paid_checking_tips'), 'error', 3000);
                return;
            }
        }
        setValidPaidNum(0);

        if (paidNum < 1) {
            setPaidNum((prev) => prev + 1);

            showMessageBox(t('checkout.paid_checking_tips'), 'error', 6000);
            return;
        }
        setShowVerifying(true);

        // 模拟调用后端验证
        setTimeout(async () => {
            // TODO: 调用后端接口检查链上交易
            setShowVerifying(false);
            showMessageBox(t('checkout.paid_success'), 'success', 6000);
        }, cryptoType.confirmTime * 1000);
    };
    const handleClose = () => {
        setValidPaidNum(0);
        setSelectedCrypto(null);
    };
    return (
        <>
            {/* 币种选择列表 */}
            <div className="py-4 px-6 flex flex-col items-start justify-start gap-2 max-h-96 overflow-y-auto bg-gray-50 rounded-xl border border-gray-200">
                {Cryptos.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleSelectedCrypto(item as CrypoType)}
                        className="flex flex-row items-center justify-between w-full bg-white hover:bg-gray-50 transition px-4 py-3 rounded-lg shadow-sm border border-gray-100 cursor-pointer"
                    >
                        <div className="font-medium text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-500 font-mono">{item.network}</div>
                    </div>
                ))}
            </div>

            {/* 支付弹窗 */}
            {selectedCrypto && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-80 flex flex-col items-center">
                        <div className="text-title break-all text-center">
                            {t('product.pay_amount')}:
                            <span className="text-brand">
                                {t('common.symbol')}
                                {payment}
                            </span>
                        </div>

                        <h2 className="text-base font-semibold m-1">
                            {selectedCrypto.name} ({selectedCrypto.network})
                        </h2>

                        <div className="space-y-8">
                            <QRCode value={selectedCrypto?.address || ''} size={200} fgColor="#000000" bgColor="#ffffff" />
                        </div>

                        {/* 地址区域 + 复制 */}
                        <div className="flex flex-col items-center w-full mt-1">
                            <div className="text-sm text-gray-700 break-all text-center ">{selectedCrypto.address}</div>
                            <button onClick={() => copyAddress(selectedCrypto.address || '')} className="text-sm text-blue-600 hover:underline">
                                {t('checkout.copy_address')}
                            </button>
                        </div>

                        {/* 警告提示文案 */}
                        <div className="text-sm text-red-500 font-medium text-center mt-2">{t('checkout.crypt_tips') || '请在完成转账后再点击“我已支付”。重复或过快点击可能导致检测无效。'}</div>

                        <div className="flex gap-2 mt-4 w-full">
                            <button onClick={() => handleClose()} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-xl hover:bg-gray-300 transition">
                                {t('checkout.crypt_close')}
                            </button>
                            <button onClick={() => handlePaidClick(selectedCrypto)} className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
                                {t('checkout.crypt_paid')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 验证中提示 */}
            {showVerifying && (
                <div className="fixed inset-0 flex items-center justify-center z-60">
                    <div className="absolute inset-0 bg-white bg-opacity-50"></div>
                    <div className="relative w-48 h-48 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin mb-4"></div>
                        <div className="text-center px-2">
                            <p className="text-gray-800 font-medium">
                                {t('checkout.verifying_payment', {
                                    minutes: selectedCrypto?.confirmTime ? selectedCrypto.confirmTime / 60 : 5,
                                })}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                                <Countdown className="text-red-500 font-medium" seconds={selectedCrypto?.confirmTime ? selectedCrypto.confirmTime : 300} />
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {MessageBoxComponent}
        </>
    );
};

export default CryptoCheckout;
