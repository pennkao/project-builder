// app/routes/test-maxwidth.tsx
export default function TestPage() {
    return (
        <>
            <h1 className="text-3xl font-bold">Test Page</h1>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded">提交</button>

            <button className="bg-bg-muted hover:bg-bg-muted-hover text-text-muted px-4 py-2 rounded">取消</button>

            <input className="border border-border DEFAULT focus:border-border-focus rounded px-3 py-2" placeholder="First name" />

            <p className="text-error-500 text-sm mt-1">This field is required</p>

            <div className="p-8 space-y-6">
                <h1 className="text-3xl font-bold">maxWidth 配置测试</h1>

                {/* 测试所有 max-width 配置 */}
                <div className="max-w-xs bg-red-100 p-4 border-l-4 border-red-500">max-w-xs (应该工作)</div>

                <div className="max-w-sm bg-orange-100 p-4 border-l-4 border-orange-500">max-w-sm (应该工作)</div>

                <div className="max-w-md bg-yellow-100 p-4 border-l-4 border-yellow-500">max-w-md (应该工作)</div>

                <div className="max-w-lg bg-green-100 p-4 border-l-4 border-green-500">max-w-lg (应该工作)</div>

                <div className="max-w-xl bg-blue-100 p-4 border-l-4 border-blue-500">max-w-xl (应该工作)</div>

                <div className="max-w-2xl bg-indigo-100 p-4 border-l-4 border-indigo-500">max-w-2xl (应该工作)</div>

                <div className="max-w-3xl bg-purple-100 p-4 border-l-4 border-purple-500">max-w-3xl (应该工作)</div>

                <div className="max-w-4xl bg-pink-100 p-4 border-l-4 border-pink-500">max-w-4xl (应该工作)</div>

                <div className="max-w-5xl bg-rose-100 p-4 border-l-4 border-rose-500">max-w-5xl (应该工作)</div>

                <div className="max-w-6xl bg-cyan-100 p-4 border-l-4 border-cyan-500">max-w-6xl (应该工作)</div>

                <div className="max-w-7xl bg-teal-100 p-4 border-l-4 border-teal-500">max-w-7xl (应该工作)</div>

                {/* 测试自定义配置 */}
                <div className="max-w-8xl bg-emerald-100 p-4 border-l-4 border-emerald-500">max-w-8xl (测试自定义配置 - 88rem = 1408px)</div>

                {/* 对比任意值 */}
                <div className="max-w-[88rem] bg-amber-100 p-4 border-l-4 border-amber-500">max-w-[88rem] (任意值对比)</div>
            </div>

            <div className="isolate p-8">
                {' '}
                {/* isolate 防止样式继承 */}
                <style>{`
        .test-element { 
          all: initial; /* 重置所有样式 */
          display: block !important;
        }
      `}</style>
                <div className="test-element max-w-5xl bg-red-500 text-white p-4 mx-auto text-center">测试 max-w-5xl - 应该是 500px 宽度</div>
                <div className="test-element max-w-md bg-blue-500 text-white p-4 mx-auto mt-4 text-center">对比: max-w-md - 应该是 28rem 宽度</div>
                <div className="mt-8 p-4 bg-gray-100">
                    <h3 className="font-bold">实际测量:</h3>
                    <div
                        className="max-w-5xl bg-yellow-100 p-4 mx-auto text-center"
                        ref={(el) => {
                            if (el) {
                                const width = el.offsetWidth;
                                console.log('max-w-5xl 实际宽度:', width, 'px');
                                // 更新显示
                                const display = document.getElementById('width-display');
                                if (display) display.textContent = `${width}px`;
                            }
                        }}
                    >
                        测量宽度:{' '}
                        <span id="width-display" className="font-mono">
                            计算中...
                        </span>
                        <div className="bg-red-500 text-white p-4">Tailwind 测试11</div>
                    </div>
                </div>
            </div>

            <div className="relative w-full h-full">
                <div className="absolute inset-0 h-full w-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-slate-300/50 border-t-slate-500/75 rounded-full animate-spin"></div>
                </div>
            </div>
        </>
    );
}

export function TestPage1() {
    return (
        <>
            <div className="p-8 space-y-8">
                <h1 className="text-2xl font-bold mb-4">暖色系 Shopify 风格配色面板</h1>

                {/* 主色按钮 */}
                <div className="space-x-4 mb-4">
                    <button className="px-4 py-2 rounded text-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-focus">Primary</button>
                    <button className="px-4 py-2 rounded text-white bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-focus">Secondary</button>
                </div>

                {/* 按钮状态 */}
                <div className="space-x-4 mb-4">
                    <button
                        className="px-4 py-2 rounded text-white bg-button-bg hover:bg-button-hover active:bg-button-active focus:outline-none focus:ring-2 focus:ring-button-focus disabled:bg-button-disabled"
                        disabled
                    >
                        Button Disabled
                    </button>
                </div>

                {/* 状态色 */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="p-4 rounded text-white text-center bg-success-500 hover:bg-success-hover active:bg-success-active focus:outline-none focus:ring-2 focus:ring-success-focus">Success</div>
                    <div className="p-4 rounded text-white text-center bg-error-500 hover:bg-error-hover active:bg-error-active focus:outline-none focus:ring-2 focus:ring-error-focus">Error</div>
                    <div className="p-4 rounded text-white text-center bg-warning-500 hover:bg-warning-hover active:bg-warning-active focus:outline-none focus:ring-2 focus:ring-warning-focus">Warning</div>
                    <div className="p-4 rounded text-white text-center bg-info-500 hover:bg-info-hover active:bg-info-active focus:outline-none focus:ring-2 focus:ring-info-focus">Info</div>
                </div>

                {/* 文本色 */}
                <div className="space-y-2 mb-4">
                    <p className="text-default">Text Default</p>
                    <p className="text-muted">Text Muted</p>
                    <p className="text-placeholder">Placeholder</p>
                </div>

                {/* 背景色 */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4">
                    <div className="p-4 rounded text-center bg-default">BG Default</div>
                    <div className="p-4 rounded text-center bg-muted">BG Muted</div>
                    <div className="p-4 rounded text-center bg-card">BG Card</div>
                </div>

                {/* 边框色 */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4">
                    <div className="p-4 rounded border-2 border-default text-center">Border Default</div>
                    <div className="p-4 rounded border-2 border-focus text-center">Border Focus</div>
                    <div className="p-4 rounded border-2 border-error text-center">Border Error</div>
                </div>
            </div>
            {/* Input 测试面板 */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Input 测试</h2>

                {/* 默认输入框 */}
                <input
                    type="text"
                    placeholder="Default input"
                    className="w-full p-2 rounded border-2 border-default text-default bg-default placeholder-placeholder focus:border-focus focus:ring-2 focus:ring-primary-focus"
                />

                {/* 输入框禁用 */}
                <input type="text" placeholder="Disabled input" disabled className="w-full p-2 rounded border-2 border-default text-disabled bg-muted placeholder-placeholder cursor-not-allowed" />

                {/* 带错误状态 */}
                <input type="text" placeholder="Error input" className="w-full p-2 rounded border-2 border-error text-default bg-default placeholder-placeholder focus:border-error focus:ring-2 focus:ring-error" />

                {/* 带成功状态 */}
                <input
                    type="text"
                    placeholder="Success input"
                    className="w-full p-2 rounded border-2 border-success-500 text-default bg-default placeholder-placeholder focus:border-success-500 focus:ring-2 focus:ring-success-focus"
                />

                {/* 带 warning 状态 */}
                <input
                    type="text"
                    placeholder="Warning input"
                    className="w-full p-2 rounded border-2 border-warning-500 text-default bg-default placeholder-placeholder focus:border-warning-500 focus:ring-2 focus:ring-warning-focus"
                />
            </div>
        </>
    );
}
