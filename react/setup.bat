@echo off
chcp 65001 >nul
title 🚀 DApp 项目环境初始化

echo ================================================
echo     🚀 开始安装 DApp 项目依赖 (Windows)
echo ================================================
echo.

REM 检查包管理器
where pnpm >nul 2>nul
if %errorlevel%==0 (
    set PM=pnpm
) else (
    where yarn >nul 2>nul
    if %errorlevel%==0 (
        set PM=yarn
    ) else (
        set PM=npm
    )
)

echo 📦 使用包管理器: %PM%
echo.

REM 安装 dependencies
echo 📥 安装 dependencies...
if "%PM%"=="npm" (
    call npm install @reown/appkit@^1.8.9 @reown/appkit-adapter-wagmi@^1.8.9 decimal.js@^10.6.0 qr@^0.5.2 react@^18.3.1 react-dom@^18.3.1 viem@^2.38.0 wagmi@^2.18.0 --save
) else if "%PM%"=="yarn" (
    call yarn add @reown/appkit@^1.8.9 @reown/appkit-adapter-wagmi@^1.8.9 decimal.js@^10.6.0 qr@^0.5.2 react@^18.3.1 react-dom@^18.3.1 viem@^2.38.0 wagmi@^2.18.0
) else (
    call pnpm add @reown/appkit@^1.8.9 @reown/appkit-adapter-wagmi@^1.8.9 decimal.js@^10.6.0 qr@^0.5.2 react@^18.3.1 react-dom@^18.3.1 viem@^2.38.0 wagmi@^2.18.0
)

echo.
echo ⚙️ 安装 devDependencies...

if "%PM%"=="npm" (
    call npm install -D @types/node@^24.7.2 @types/react@^18.3.26 @types/react-dom@^18.3.7 @vitejs/plugin-react@^5.0.4 autoprefixer@^10.4.21 postcss@^8.5.6 prettier-plugin-tailwindcss@^0.6.14 tailwindcss@^4.1.14 typescript@^5.9.3 vite@^7.1.9
) else if "%PM%"=="yarn" (
    call yarn add -D @types/node@^24.7.2 @types/react@^18.3.26 @types/react-dom@^18.3.7 @vitejs/plugin-react@^5.0.4 autoprefixer@^10.4.21 postcss@^8.5.6 prettier-plugin-tailwindcss@^0.6.14 tailwindcss@^4.1.14 typescript@^5.9.3 vite@^7.1.9
) else (
    call pnpm add -D @types/node@^24.7.2 @types/react@^18.3.26 @types/react-dom@^18.3.7 @vitejs/plugin-react@^5.0.4 autoprefixer@^10.4.21 postcss@^8.5.6 prettier-plugin-tailwindcss@^0.6.14 tailwindcss@^4.1.14 typescript@^5.9.3 vite@^7.1.9
)

echo.
echo ✅ 所有依赖安装完成！
echo -----------------------------------------------
echo 💡 你可以现在执行以下命令启动开发模式：
echo.
echo     %PM% run dev
echo -----------------------------------------------
pause
