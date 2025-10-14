#!/bin/bash

echo "🚀 开始安装 DApp 项目依赖..."

# 检查包管理器
if command -v pnpm >/dev/null 2>&1; then
    PM=pnpm
elif command -v yarn >/dev/null 2>&1; then
    PM=yarn
else
    PM=npm
fi

echo "📦 使用包管理器: $PM"

# 安装 dependencies
echo "📥 安装 dependencies..."
$PM add \
    @reown/appkit@^1.8.9 \
    @reown/appkit-adapter-wagmi@^1.8.9 \
    decimal.js@^10.6.0 \
    qr@^0.5.2 \
    react@^18.3.1 \
    react-dom@^18.3.1 \
    viem@^2.38.0 \
    wagmi@^2.18.0

# 安装 devDependencies
echo "⚙️ 安装 devDependencies..."
if [ "$PM" = "npm" ]; then
    $PM install -D \
        @types/node@^24.7.2 \
        @types/react@^18.3.26 \
        @types/react-dom@^18.3.7 \
        @vitejs/plugin-react@^5.0.4 \
        autoprefixer@^10.4.21 \
        postcss@^8.5.6 \
        prettier-plugin-tailwindcss@^0.6.14 \
        tailwindcss@^4.1.14 \
        typescript@^5.9.3 \
        vite@^7.1.9
else
    $PM add -D \
        @types/node@^24.7.2 \
        @types/react@^18.3.26 \
        @types/react-dom@^18.3.7 \
        @vitejs/plugin-react@^5.0.4 \
        autoprefixer@^10.4.21 \
        postcss@^8.5.6 \
        prettier-plugin-tailwindcss@^0.6.14 \
        tailwindcss@^4.1.14 \
        typescript@^5.9.3 \
        vite@^7.1.9
fi

echo "✅ 安装完成！"
echo "💡 接下来可执行命令:"
echo "   $PM run dev"
