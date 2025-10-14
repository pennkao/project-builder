#!/usr/bin/env python3
# ==================================================
# 🚀 create-structure.py - 通用 DApp 项目模板生成器
# ==================================================
# 功能：
#   1️⃣ 生成通用 DApp 目录结构（含 core/features/layouts/components）
#   2️⃣ 写入模板文件（App.tsx、main.tsx、vite.config.ts 等）
#   3️⃣ 自动生成 package.json 与 tsconfig.json
#   4️⃣ 兼容 i18n / plugins / security / config 模块
# ==================================================
# 作者：reco + GPT-5 架构助手
# ==================================================

import os
import json

# ==================================================
# 1️⃣ 项目结构定义
# ==================================================
STRUCTURE = {
    "src": {
        "app": ["main.tsx", "App.tsx"],
        "layouts": {
            "Sidebar": ["index.tsx", "styles.module.css"],
            "Header": ["index.tsx", "styles.module.css"],
            "Footer": ["index.tsx", "styles.module.css"],
            ".": ["MainLayout.tsx"]
        },
        "features": {
            "wallet": {
                "components": ["WalletSidebar.tsx", "ConnectButton.tsx", "BalanceDisplay.tsx", "styles.module.css"],
                "hooks": ["useWalletState.ts", "useWalletBalance.ts", "useWalletEvents.ts"],
                "utils": ["formatAddress.ts", "walletHelpers.ts"],
                "constants": ["walletConfig.ts"],
                ".": ["index.ts"]
            },
            "admin": {
                "components": ["AdminSidebar.tsx", "AdminPanel.tsx", "styles.module.css"],
                "hooks": ["useAdminState.ts"],
                ".": ["index.ts"]
            },
            "game": {
                "components": ["LotteryPanel.tsx", "PrizeDisplay.tsx", "styles.module.css"],
                "hooks": ["useGameLogic.ts"],
                ".": ["index.ts"]
            },
            "shared": {
                "hooks": ["useSharedStorage.ts", "useModal.ts", "useBoolean.ts"],
                "utils": ["formatNumber.ts", "currency.ts", "logger.ts"],
                ".": ["index.ts"]
            }
        },
        "components": {
            "common": {
                "Button": ["index.tsx", "styles.module.css"],
                "Card": ["index.tsx", "styles.module.css"],
                "Input": ["index.tsx", "styles.module.css"],
                "Modal": ["index.tsx", "styles.module.css"]
            },
            "ui": {
                "Toast": ["index.tsx", "styles.module.css"],
                "Spinner": ["index.tsx", "styles.module.css"]
            }
        },
        "pages": ["index.tsx", "admin.tsx", "game.tsx", "user.tsx"],
        "context": ["WalletContext.tsx", "ThemeContext.tsx", "AppContext.tsx"],
        "lib": ["wagmiClient.ts", "ethersProvider.ts", "viemClient.ts"],
        "data": {
            ".": ["LuckyDay.json", "tokenList.json"],
            "contracts": ["ERC20.abi.json", "LuckyGame.abi.json"]
        },
        "styles": ["global.css", "tailwind.css", "variables.css", "animations.css"],
        "assets": {"icons": [], "images": [], "fonts": []},
        "types": ["wallet.d.ts", "contract.d.ts", "global.d.ts", "env.d.ts"],
        "core": {
            "config": ["app.config.ts"],
            "i18n": {
                ".": ["index.ts"],
                "locales": ["en.json", "zh.json"]
            },
            "plugins": ["index.ts"],
            "security": ["index.ts"]
        }
    },
    ".": [".env",  "index.html"]
}

# ==================================================
# 2️⃣ 模板内容定义
# ==================================================
TEMPLATES = {
    "main.tsx": """
        import React from 'react';
        import ReactDOM from 'react-dom/client';
        import App from './App';
        import '../styles/global.css';

        ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
        );
""",
    "App.tsx": """
        import React from 'react';
        export default function App() {
        return (
            <div style={{textAlign: 'center', marginTop: '20vh'}}>
            <h1>🚀 DApp Template Initialized</h1>
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
            </div>
        );
        }
""",
    "index.tsx": "export default function Page() { return <div>Page Placeholder</div>; }",
    "styles.module.css": "/* Local CSS */\n.root { display: flex; align-items: center; justify-content: center; }",
    "vite.config.ts": """
        // @ts-nocheck  // 忽略类型检查，防止“找不到类型定义”等无关错误

        import react from '@vitejs/plugin-react';
        import { resolve } from 'path';
        import { defineConfig } from 'vite';

        // https://vitejs.dev/config/
        export default defineConfig({
            plugins: [react()],
            resolve: {
                alias: {
                    '@': resolve(__dirname, 'src'),
                },
            },
        });
""",
    "index.html": """<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>DApp Template</title>
        </head>
        <body>
            <div id="root"></div>
            <script type="module" src="/src/app/main.tsx"></script>
        </body>
        </html>
""",
    ".env": """
            # Environment Variables
            VITE_APP_NAME=DAppTemplate
            VITE_API_BASE_URL=https://api.example.com
""",
    "en.json": json.dumps({"hello": "Hello World"}, indent=2),
    "zh.json": json.dumps({"hello": "你好，世界"}, indent=2),
    "app.config.ts": """
        export const AppConfig = {
        appName: 'DApp Template',
        version: '1.0.0',
};
""",
    "index.ts": "// module entry\n",
}


# ==================================================
# 3️⃣ 目录与文件生成逻辑
# ==================================================
def create_structure(base, struct, templates):
    for name, content in struct.items():
        path = os.path.join(base, name)
        if isinstance(content, dict):
            os.makedirs(path, exist_ok=True)
            create_structure(path, content, templates)
        elif isinstance(content, list):
            os.makedirs(path, exist_ok=True)
            for file in content:
                fpath = os.path.join(path, file)
                os.makedirs(os.path.dirname(fpath), exist_ok=True)
                with open(fpath, "w", encoding="utf-8") as f:
                    f.write(templates.get(file, f"// {file}\n"))

# ==================================================
# 4️⃣ 配置文件写入
# ==================================================
def write_config_files():
    gitignore = """ 
    # dependencies
node_modules/
.pnp
.pnp.js

# production
/dist
/build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# editor
.idea/
.vscode/
*.log
*.tsbuildinfo

# lockfiles
package-lock.json
yarn.lock
pnpm-lock.yaml
    """
    package_json = {
        "name": "dapp-template",
        "version": "1.0.0",
        "private": True,
        "scripts": {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
        },
        "dependencies": {
            "react": "^18.3.1",
            "react-dom": "^18.3.1"
        },
        "devDependencies": {
            "@vitejs/plugin-react": "^4.3.2",
            "typescript": "^5.4.0",
            "vite": "^5.2.0"
        }
    }


    tsconfig = {
        "compilerOptions": {
            "baseUrl": ".",
            "paths": {
                "@/*": ["src/*"]
            }
        },
        "files": [],
        "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
        "exclude": ["node_modules", "dist"]
    }
    
    tsconfig_app = {
        "compilerOptions": {
            "composite":True,
            "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
            "target": "ESNext",
            "useDefineForClassFields": True,
            "lib": ["DOM", "DOM.Iterable", "ESNext"],
            "allowJs": False,
            "skipLibCheck": True,
            "esModuleInterop": False,
            "allowSyntheticDefaultImports": True,
            "strict": True,
            "forceConsistentCasingInFileNames": True,
            "module": "ESNext",
            "moduleResolution": "Node",
            "resolveJsonModule": True,
            "isolatedModules": True,
            "noEmit": True,
            "types": ["vite/client"],
            "jsx": "react-jsx",
            "baseUrl": ".",
            "paths": {
                "@/*": ["src/*"]
            }
        },
        "typeRoots": ["./node_modules/@types", "./src/types"],

        "include": ["src"]
    }

    
    tsconfig_node = {
        "compilerOptions": {
            "composite": True,
            "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
            "target": "ES2023",
            "lib": ["ES2023"],
            "module": "NodeNext",
            "moduleResolution": "NodeNext",
            "skipLibCheck": True,
            "strict": True,
            "noEmit": True,
            "types": ["node", "vite/client"]
        },
        "include": ["vite.config.ts"]
    }
    
    tailwind_config = """
        export default {
            content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
            theme: {
                extend: {
                    colors: {
                        primary: '#5a38d1',
                        secondary: '#6e57e0',
                    },
                    borderRadius: {
                        xl: '1rem',
                    },
                },
            },
            plugins: [],
        };
    """ 
    prettier_config = """
        // prettier.config.js 或 .prettierrc.js
        module.exports = {
            // 基础格式化选项
            printWidth: 220, // 每行最大字符数
            tabWidth: 4, // 缩进空格数
            useTabs: false, // 使用空格而非制表符
            semi: true, // 语句末尾添加分号
            singleQuote: true, // 使用单引号而非双引号
            quoteProps: 'as-needed', // 对象属性引号使用方式
            jsxSingleQuote: false, // JSX 中使用双引号
            trailingComma: 'es5', // 尾随逗号规则
            bracketSpacing: true, // 对象括号间加空格 { foo: bar }
            bracketSameLine: false, // 多行 JSX 元素的 `>` 换行显示
            arrowParens: 'always', // 箭头函数参数始终加括号
        };
    """
    config_list = [("tsconfig.json", "json", tsconfig), 
                   ("tsconfig.app.json", "json", tsconfig_app), 
                   ("tsconfig.node.json", "json", tsconfig_node), 
                   ("tailwind.config.js","text", tailwind_config),
                   ("prettier.config.js","text", prettier_config),
                   (".gitignore","text", gitignore)]
    
    for config_file, ctype, config_content in config_list:
        with open(config_file, "w", encoding="utf-8") as f:
            if ctype == "json":
                json.dump(config_content, f, indent=4)
            else:
                f.write(config_content)
        
# ==================================================
# 5️⃣ 主执行入口
# ==================================================
def main():
    print("🚀 正在生成通用 DApp 模板结构...\n")
    create_structure(".", STRUCTURE, TEMPLATES)
    write_config_files()
    print("✅ 项目框架已生成完毕！")
    print("👉 下一步：")
    print("   npm install")
    print("   npm install @types/node")
    print("   npm run dev")

# ==================================================
# 执行入口
# ==================================================
if __name__ == "__main__":
    main()
