import { useState } from 'react';

const tabs = [
    { id: 1, label: '', content: '这里是第一个页面的内容' },
    { id: 2, label: '', content: '这里是第二个页面的内容' },
    { id: 3, label: '', content: '这里是第三个页面的内容' },
];

export default function VerticalTabs({ tabId = 1 }: { tabId?: number }) {
    const [active, setActive] = useState(tabId);

    return (
        <div className="flex h-full bg-gray-100">
            {/* 左侧内容区域 */}
            <div className="flex-1 flex items-center justify-center text-2xl font-medium bg-white transition-all duration-300">
                <div className="p-8 text-center">{tabs.find((t) => t.id === active)?.content}</div>
            </div>

            {/* 右侧竖直 Tabs */}
            <div className="w-3 flex flex-col divide-y divide-gray-200 border-l border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActive(tab.id)}
                        className={`flex-1 text-center text-sm font-medium transition-all duration-300 
              ${active === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-50 hover:bg-gray-200 text-gray-700'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
