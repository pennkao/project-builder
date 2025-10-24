import { useEffect, useState } from 'react';
import styles from './styles.module.css'; // border-breathe 的 css 放这里

interface Tab {
    label: string;
    key: string;
    content: React.ReactNode;
}

interface HorizontalTabsProps {
    tabs: Tab[];
    className?: string;
    activeKey?: string | null;
    onTabChange?: (key: string | null) => void;
}

export default function HorizontalTabs({ tabs, className, activeKey: outActiveKey, onTabChange }: HorizontalTabsProps) {
    const [activeKey, setActiveKey] = useState(outActiveKey ?? tabs[0].key);
    useEffect(() => {
        if (outActiveKey) {
            setActiveKey(outActiveKey);
        }
    }, [outActiveKey]);

    const handleTabSwitch = (tabKey: string) => {
        setActiveKey(tabKey);
        onTabChange?.(tabKey);
    };

    return (
        <div className={`flex flex-col h-full  ${className ?? ''}`}>
            {/* Tabs Header */}
            <div className="flex border-b px-9 border-gray-100 bg-white-1 gap-2 mb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => handleTabSwitch(tab.key)}
                        className={`flex-1 text-center py-2 text-sub ${styles['tab-button']} ${activeKey === tab.key ? `${styles.active}` : 'text-gray-600 hover:text-blue-500'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 px-2 bg-white-1 ">{tabs.find((t) => t.key === activeKey)?.content}</div>
        </div>
    );
}
