import { t } from 'i18next';
import { useEffect, useState } from 'react';

// 假设 ExchangeItem 已定义（或内联）
const ExchangeItem = ({ name, phone, timeAgo }: { name: string; phone: string; timeAgo: string }) => (
    <div className="text-tip text-xs">
        {name} {phone} {timeAgo} {t('product.detail.change-product')}
    </div>
);

export default function BuyRecords() {
    // 模拟初始用户
    const [users, setUsers] = useState([
        { name: '蒋**', phone: '184****6089', timeAgo: '在12分钟前' },
        { name: '杜**', phone: '140****9310', timeAgo: '在13分钟前' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomNames = ['王**', '李**', '张**', '刘**', '陈**', '杨**'];
            const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
            const randomPhone = `${Math.floor(130 + Math.random() * 80)}****${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
            const minutesAgo = Math.floor(Math.random() * 20) + 1;
            const newUser = {
                name: randomName,
                phone: randomPhone,
                timeAgo: `在${minutesAgo}分钟前`,
            };

            // 最多保留 5 条记录（新记录在前或后？这里新记录加在末尾）
            setUsers((prev) => {
                const updated = [prev[0], newUser];
                return updated.length > 5 ? updated.slice(-5) : updated;
            });
        }, 60000); // 每5秒新增一条

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-start bg-white rounded-lg  overflow-hidden px-2">
            {users.map((user, index) => (
                <ExchangeItem key={index} name={user.name} phone={user.phone} timeAgo={user.timeAgo} />
            ))}
        </div>
    );
}
