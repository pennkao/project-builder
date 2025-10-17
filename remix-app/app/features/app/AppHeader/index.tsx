 const AppHeader = ({className}: {className?: string}) => {
  return (
    <header className={`bg-red-600 text-white p-4 flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-2 text-sm">
        <span>我的账户</span>
        <span>可用积分: <strong>396500</strong></span>
      </div>
      <div className="flex items-center">
        <span className="font-bold text-lg mr-2">限时兑</span>
        <input
          type="text"
          placeholder="扫地机器人"
          className="flex-1 px-2 py-1 rounded-l-full border-0 outline-none text-black"
        />
        <button className="bg-orange-500 px-4 py-1 rounded-r-full text-white">搜索</button>
        <span className="ml-2">🎧</span>
      </div>
    </header>
  );
}
export default AppHeader;
