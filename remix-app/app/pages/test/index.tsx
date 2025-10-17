
// app/routes/test-maxwidth.tsx
export default function TestPage() {
  return (
    <>
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">maxWidth 配置测试</h1>
      
      {/* 测试所有 max-width 配置 */}
      <div className="max-w-xs bg-red-100 p-4 border-l-4 border-red-500">
        max-w-xs (应该工作)
      </div>
      
      <div className="max-w-sm bg-orange-100 p-4 border-l-4 border-orange-500">
        max-w-sm (应该工作)
      </div>
      
      <div className="max-w-md bg-yellow-100 p-4 border-l-4 border-yellow-500">
        max-w-md (应该工作)
      </div>
      
      <div className="max-w-lg bg-green-100 p-4 border-l-4 border-green-500">
        max-w-lg (应该工作)
      </div>
      
      <div className="max-w-xl bg-blue-100 p-4 border-l-4 border-blue-500">
        max-w-xl (应该工作)
      </div>
      
      <div className="max-w-2xl bg-indigo-100 p-4 border-l-4 border-indigo-500">
        max-w-2xl (应该工作)
      </div>
      
      <div className="max-w-3xl bg-purple-100 p-4 border-l-4 border-purple-500">
        max-w-3xl (应该工作)
      </div>
      
      <div className="max-w-4xl bg-pink-100 p-4 border-l-4 border-pink-500">
        max-w-4xl (应该工作)
      </div>
      
      <div className="max-w-5xl bg-rose-100 p-4 border-l-4 border-rose-500">
        max-w-5xl (应该工作)
      </div>
      
      <div className="max-w-6xl bg-cyan-100 p-4 border-l-4 border-cyan-500">
        max-w-6xl (应该工作)
      </div>
      
      <div className="max-w-7xl bg-teal-100 p-4 border-l-4 border-teal-500">
        max-w-7xl (应该工作)
      </div>
      
      {/* 测试自定义配置 */}
      <div className="max-w-8xl bg-emerald-100 p-4 border-l-4 border-emerald-500">
        max-w-8xl (测试自定义配置 - 88rem = 1408px)
      </div>
      
      {/* 对比任意值 */}
      <div className="max-w-[88rem] bg-amber-100 p-4 border-l-4 border-amber-500">
        max-w-[88rem] (任意值对比)
      </div>
    </div>

     <div className="isolate p-8"> {/* isolate 防止样式继承 */}
      <style>{`
        .test-element { 
          all: initial; /* 重置所有样式 */
          display: block !important;
        }
      `}</style>
      
      <div className="test-element max-w-5xl bg-red-500 text-white p-4 mx-auto text-center">
        测试 max-w-5xl - 应该是 500px 宽度
      </div>
      
      <div className="test-element max-w-md bg-blue-500 text-white p-4 mx-auto mt-4 text-center">
        对比: max-w-md - 应该是 28rem 宽度
      </div>
      
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
          测量宽度: <span id="width-display" className="font-mono">计算中...</span>
          <div className="bg-red-500 text-white p-4">
  Tailwind 测试11
</div>
        </div>
      </div>
    </div>
    </>
  );
}