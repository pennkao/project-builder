// MainLayout.tsx
import AppFooter from "@/features/app/AppFooter";
import AppHeader from "@/features/app/AppHeader";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    // 外层：撑满视口高度，设置全局背景色
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 内层：限制宽度为 1200px，居中，包含所有内容 */}
      <div className="w-full mx-auto flex flex-col flex-grow max-w-5xl">
        <AppHeader />
        <main className="flex-grow">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </div>
  );
}