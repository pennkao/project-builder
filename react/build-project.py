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

Layout_Demo_Files = ["index.tsx", "styles.module.css", "Header.tsx", 
                     "Footer.tsx", "Sidebar.tsx", "header.module.css", 
                     "footer.module.css", "sidebar.module.css"]
Component_Files = ["index.tsx","styles.module.css"]
Layout_Files = ["index.tsx", "styles.module.css", "Header.tsx",  "Footer.tsx", "Sidebar.tsx"]
Pages = {"Home":Component_Files, "Admin":Component_Files, "Login":Component_Files, "User":Component_Files}
Router_Config = {"loaders":[], "guards":["AuthGuard.tsx", "NetworkGuard.tsx"], ".":["types.ts","utils.ts","index.tsx", "pageMap.ts","layoutMap.ts"]}
Config_Files = ["app.config.ts","app.routes.ts"]
STRUCTURE = {
    "src": {
        "app": ["main.tsx", "App.tsx"],
        "layouts": {"MainLayout": Layout_Demo_Files,"AdminLayout": Layout_Files,"AuthLayout": Layout_Files},
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
                "Button": Component_Files,
                "Card": Component_Files,
                "Input": Component_Files,
                "Modal": Component_Files
            },
            "ui": {
                "Toast": Component_Files,
                "Spinner": Component_Files
            }
        },
        "pages": Pages,
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
            "security": ["index.ts"],
            "router": Router_Config,
        }
    },
    ".": [".env", ".env.dev", ".env.prod", "index.html"]
}

# ==================================================
# 2️⃣ 模板内容定义
# ==================================================
TEMPLATES = {
#=========main.tsx==================
    "main.tsx": """// src/app/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 🧩 global styles
import "@/styles/animations.css";
import "@/styles/global.css";
import "@/styles/tailwind.css";
import "@/styles/variables.css";

// 🧩 React 18 的新 root API
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

""",
#=========App.tsx==================
    "App.tsx": """// src/App.tsx
import { ThemeProvider } from "@/context/ThemeContext";
import AppRouter from "@/core/router";

const App = () => {
  return (
    <ThemeProvider>
        <AppRouter />
    </ThemeProvider>
  );
};

export default App;
""",    

#=========vite.config.ts==================
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
#=========index.htm==================
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

#=========.env==================
    ".env": """
VITE_APP_NAME=DAppTemplate
VITE_API_BASE_URL=https://api.example.com
""",
#=========en.json==================
    "en.json": json.dumps({"hello": "Hello World"}, indent=2),
#=========zh.json==================
    "zh.json": json.dumps({"hello": "你好，世界"}, indent=2),
#=========app.config.ts==================
    "app.config.ts": """export const AppConfig = {
    appName: 'DApp Template',
    version: '1.0.0',
};

""",
}



# ==================================================
# 4️⃣ 配置文件写入
# ==================================================
def write_config_files():
    gitignore = """# dependencies
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
        "name": "template",
        "version": "1.0.0",
        "private": True,
        "scripts": {
            "dev": "vite --host 0.0.0.0 --mode dev",
            "build": "vite build",
            "preview": "vite preview"
        },
        "dependencies": {
            "react": "^18.3.1",
            "react-dom": "^18.3.1",
            "react-router": "^7.9.4",
        },
        "devDependencies": {
            "@types/react": "^18.3.4",
            "@types/react-dom": "^18.3.2",
            "@types/node": "^24.7.2",
            "@types/react": "^18.3.26",
            "@types/react-dom": "^18.3.7",
            "@vitejs/plugin-react": "^4.3.2",
            "autoprefixer": "^10.4.21",
            "postcss": "^8.5.6",
            "typescript": "^5.9.3",
            "vite": "^7.1.9"
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
    
    tailwind_config = """// prettier.config.js 或 .prettierrc.js
// tailwind.config.js
module.exports = {
    // 1. 必须配置：指定需要扫描的文件
    content: [
        './src/**/*.{css}',
        './public/index.html',
        // 添加所有包含Tailwind类名的文件路径
    ],

    // 2. 主题配置（影响类名排序分组）
    theme: {
        // 2.1 扩展默认主题
        extend: {
            colors: {
                primary: '#3b82f6',
            },
        },

        // 2.2 自定义排序分组（可选）
        order: {
            layouts: ['container', 'display'], // 布局类优先级
            typography: ['font', 'text'], // 文字类优先级
        },
    },

    // 3. 插件配置（影响类名处理）
    plugins: [
        require('@tailwindcss/forms'), // 表单类名处理
        require('@tailwindcss/typography'), // 排版类名处理
    ],

    // 4. 核心功能控制（可选）
    corePlugins: {
        float: false, // 禁用不使用的工具类
    },
};
    """ 
    prettier_config = """module.exports = {
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
    prettierignore = """# 忽略 .md 文件
*.md
    """
    
    vite_config = """// @ts-nocheck 忽略类型检查，防止“找不到类型定义”等无关错误
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: { alias: { '@': resolve(__dirname, 'src') } },
});
"""
    
    config_list = [("tsconfig.json", "json", tsconfig), 
                   ("tsconfig.app.json", "json", tsconfig_app), 
                   ("tsconfig.node.json", "json", tsconfig_node), 
                   ("tailwind.config.js","text", tailwind_config),
                   ("prettier.config.js","text", prettier_config),
                   (".gitignore","text", gitignore),
                   (".prettierignore","text", prettierignore),
                   ("vite.config.ts","text", vite_config)]
    
    for config_file, ctype, config_content in config_list:
        with open(config_file, "w", encoding="utf-8") as f:
            if ctype == "json":
                json.dump(config_content, f, indent=4)
            else:
                f.write(config_content)
        
# ==================================================
# 5️⃣ 业务文件
# ==================================================
PathFileContent = {
    #=================================================
    "src|core|config|app.config.ts":"""// src/config/app.router.ts

export const appRoutes = [
    {
        path: '/',
        layout: 'MainLayout',
        children: [
            { path: '/', component: 'IndexPage' },
            { path: '/login', component: 'LoginPage' },
            { path: '/admin/', component: 'AdminPage' },
        ],
    },
    {
        path: '/admin',
        layout: 'AdminLayout',
        children: [{ path: '/admin/', component: 'AdminPage' }],
    },
];

    """,
    #=================================================
    "src|core|router|index.tsx":"""// src/core/router/index.ts
import { appRoutes } from '@/core/config/app.routers';
import { Suspense } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router';
import { layoutMap } from './layoutMap';
import { getPage } from './pageMap';

function buildRoutes(appRoutes: any[]): RouteObject[] {
    return appRoutes.map((route) => {
        const Layout = layoutMap[route.layout as keyof typeof layoutMap];

        return {
            path: route.path,
            element: (
                <Suspense fallback={<div>Loading layout...</div>}>
                    <Layout />
                </Suspense>
            ),
            children: route.children?.map((child: any) => {
                const Page = getPage(child.component)!;
                if (child.index) {
                    return {
                        index: true,
                        element: (
                            <Suspense fallback={<div>Loading page...</div>}>
                                <Page />
                            </Suspense>
                        ),
                    };
                }
                return {
                    path: child.path,
                    element: (
                        <Suspense fallback={<div>Loading page...</div>}>
                            <Page />
                        </Suspense>
                    ),
                };
            }),
        };
    });
}

const router = createBrowserRouter(buildRoutes(appRoutes));

export default function AppRouter() {
    return <RouterProvider router={router} />;
}


    """,
    #=================================================
    "src|core|router|layoutMap.ts":"""
    """,
    #=================================================
    "src|core|router|pageMap.ts":"""
    """,
    #=================================================
    "src|layouts|MainLayout|index.tsx":"""// src/layouts/MainLayout/index.tsx
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './styles.module.css';

export default function MainLayout() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <Sidebar />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}

    """,
    #=================================================
    "src|layouts|MainLayout|Header.tsx":"""// Header.tsx
import styles from './header.module.css'; 

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>My App</h1>
        </header>
    );
}
    """,
    #=================================================
    "src|layouts|MainLayout|Footer.tsx":"""// Footer.tsx
import styles from './footer.module.css';
const Footer = () => {
    return <div className={styles.footer}>© 2025 My DApp. All rights reserved.</div>;
};

export default Footer;
    """,
    #=================================================
    "src|layouts|MainLayout|styles.module.css":"""
.content {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.header {
    background: #5a38d1;
    color: white;
    padding: 10px;
}
.sidebar {
    background: #f2f2f2;
    padding: 10px;
}
.footer {
    background: #2f0c0c;
    padding: 10px;
    text-align: center;
}
    """,
    #=================================================
    "src|layouts|MainLayout|Sidebar.tsx":"""// Sidebar.tsx
import styles from './sidebar.module.css';
const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <ul>
                <li>🏠 Home</li>
                <li>🔑 Login</li>
                <li>⚙️ Admin</li>
            </ul>
        </nav>
    );
};

export default Sidebar;
    """,
    #=================================================
    "src|layouts|MainLayout|header.module.css":"""
.header {
    background: #5a38d1;
    color: white;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    height: 60px;
}
    """,
    "src|layouts|MainLayout|footer.module.css":"""
.footer {
    background: #91e49f;
    padding: 10px;
    text-align: center;
}

    """,
    #=================================================
    "src|layouts|MainLayout|sidebar.module.css":"""
.sidebar {
    background: #f2f2f2;
    padding: 10px;
}

    """,
    #=================================================
    #=================================================
    "src|pages|Home|index.tsx":"""// src/pages/Home/index.tsx
import { Link } from 'react-router';
const HomePage = () => {
    return (
        <>
            <h1>🏠 This is Home Page</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="root">root</Link>
                </li>
                <li>
                    <Link to="login">login</Link>
                </li>
            </ul>
        </>
    );
};

export default HomePage;


    """,
    #=================================================
    "src|context|ThemeContext.tsx":"""// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // 从 localStorage 读取，或默认 light
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  useEffect(() => {
    // 更新 html 的 data-theme 属性
    document.documentElement.setAttribute("data-theme", theme);
    // 保存到 localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 方便在组件中使用
export const useTheme = () => useContext(ThemeContext);

    """,
    #=================================================
    "src|core|router|layoutMap.ts":"""// src/core/router/layoutMap.ts
import MainLayout from '@/layouts/MainLayout';
export const layoutMap = {
    "MainLayout":MainLayout,
};    
""",
    #=================================================
    "src|core|router|pageMap.ts":"""// src/core/router/pageMap.ts
import { lazy } from 'react';
export const getPage = (name: string) => {
    const map: Record<string, any> = {
        HomePage: lazy(() => import('@/pages/Home')),
        LoginPage: lazy(() => import('@/pages/Login')),
        AdminPage: lazy(() => import('@/pages/Admin')),
    };
    return map[name];
};

    """,
    #=================================================
    "src|pages|Admin|index.tsx":"""// index.tsx
import { Link } from 'react-router';
const AdminPage = () => {
    return (
        <>
            <h1>Admin Page444</h1>
            <Link to="/">Home</Link>
        </>
    );
};
export default AdminPage;
    """,
    #=================================================
    "src|pages|Login|index.tsx":"""// index.tsx
import { Link } from 'react-router';
const LoginPage = () => {
    return (
        <>
            <h1>Login Page</h1>
            <Link to="/">Home</Link>
        </>
    );
};
export default LoginPage;

    """,
}#----------------------end PathFileContent-------------------------------
#==================================================
# 2️⃣ 项目结构定义
def get_file_content(fileMap, path):
    path = path.replace(".\\", "").replace("./", "")
    path = path.replace("\\", "|").replace("/", "|")
    # print(path, "===================================")
    # print(fileMap.get(path))
    return fileMap.get(path, None)
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
                    tpl_content = templates.get(file, None)
                    if tpl_content:
                        f.write(tpl_content)
                        pass
                    else:
                        ct = get_file_content(PathFileContent,fpath)
                        print(f"写入文件: {fpath}")
                        if ct:
                            f.write(ct)
                            pass
                        else:
                            f.write(f"/*{file}*/\n")  
                            pass                  
        else:
            pass 

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
