import Countdown from '@/components/Countdown';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

const randomNames = [
    'Bryan',
    'John',
    'Christy',
    'James',
    'Brett',
    'Emma',
    'Kelsey',
    'Joshua',
    'Kenneth',
    'Robin',
    'Mathew',
    'Sabrina',
    'James',
    'Amanda',
    'Alan',
    'Dustin',
    'Lisa',
    'Samantha',
    'James',
    'Jimmy',
    'Mark',
    'Amanda',
    'Penny',
    'Christopher',
    'Sharon',
    'Derek',
    'Maria',
    'Nicholas',
    'Anthony',
    'Ryan',
    'Raymond',
    'Erica',
    'Donna',
    'Steven',
    'Angela',
    'Jennifer',
    'Jeanette',
    'Brittney',
    'Lisa',
    'Tristan',
    'Hannah',
    'Micheal',
    'Karen',
    'Linda',
    'Herbert',
    'Michele',
    'David',
    'Natalie',
    'Joseph',
    'Christopher',
    'Jonathan',
    'Tammy',
    'Beverly',
    'James',
    'Deanna',
    'Christopher',
    'Regina',
    'Sarah',
    'Sarah',
    'Kevin',
    'Shaun',
    'Eric',
    'Willie',
    'Susan',
    'Karen',
    'Corey',
    'Amanda',
    'Jonathan',
    'Cynthia',
    'Jessica',
    'Gregory',
    'Michelle',
    'Jeffrey',
    'Catherine',
    'Joseph',
    'Cassidy',
    'Christian',
    'James',
    'Stefanie',
    'Charles',
    'Gabrielle',
    'Brooke',
    'Justin',
    'Christopher',
    'Lauren',
    'Jason',
    'James',
    'Brandon',
    'Mason',
    'Douglas',
    'Stephanie',
    'Deborah',
    'Paul',
    'Nathan',
    'Joel',
    'Alec',
    'Howard',
    'Eric',
    'Andrew',
];
// 假设 ExchangeItem 已定义（或内联）
const ExchangeItem = ({ name, email, timeAgo }: { name: string; email: string; timeAgo: string }) => (
    <div className="text-tip text-xs">
        {name}&nbsp;&nbsp;{email} {timeAgo} {t('product.detail.change-product')}
    </div>
);

export default function BuyRecords({ stock }: { stock: number }) {
    const [inventory, setInventory] = useState(stock);
    // 模拟初始用户
    const [users, setUsers] = useState([
        { name: 'Jerr**', email: 'Jerr**@**.com', timeAgo: t('buyer.minutes', { num: 5 }) },
        { name: 'Alec**', email: 'Alec**@**.com', timeAgo: t('buyer.minutes', { num: 3 }) },
    ]);
    let tm = 6000 + Math.floor(Math.random() * 10) * 1000;
    useEffect(() => {
        const interval = setTimeout(() => {
            setInventory((prev) => {
                if (prev < 5) {
                    clearInterval(interval);
                    return prev;
                }
                return prev - 1;
            });

            const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
            const minutesAgo = 1;
            const newUser = {
                name: randomName.slice(0, 4),
                email: randomName.slice(0, 4) + '**@**.com',
                timeAgo: t('buyer.minutes', { num: minutesAgo }),
            };

            // 最多保留 5 条记录（新记录在前或后？这里新记录加在末尾）
            setUsers((prev) => {
                const updated = [prev[0], newUser];
                return updated.length > 5 ? updated.slice(-5) : updated;
            });
        }, tm); // 每5秒新增一条

        // return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="flex justify-between items-center p-2">
                <div className="text-xs font-semibold">{t('product.factory_stock', { stock: inventory })}</div>
                <div className="flex items-end gap-1 text-red-600 text-sm font-medium leading-tight">
                    {/* <span className="text-xs">⏰</span> */}
                    <span className="text-xs font-semibold">{t('product.limited_buy')}</span>
                    <Countdown seconds={3600} color="red" className="font-semibold" />
                </div>
            </div>
            <div className="flex flex-col items-start bg-white rounded-lg  overflow-hidden px-2">
                {users.map((user, index) => (
                    <ExchangeItem key={index} name={user.name} email={user.email} timeAgo={user.timeAgo} />
                ))}
            </div>
        </>
    );
}
