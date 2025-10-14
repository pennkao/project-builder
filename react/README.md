# 🧩 Universal DApp Template

A modular and scalable React + Vite + TailwindCSS starter for Web3 or general frontend apps.

## 🚀 Features
- React 18 + TypeScript + Vite
- Modular structure: core / features / layouts / components
- Built-in TailwindCSS + PostCSS + Autoprefixer
- Supports environment configs via `.env`


src/
├─ app/                                   # 应用入口层（初始化、全局容器）
│  ├─ main.tsx                            # React 应用入口，挂载 <App />
│  └─ App.tsx                             # 顶层组件，注入 Router、Provider 等
│
├─ layouts/                               # 页面结构层（可复用的布局组件）
│  ├─ Sidebar/
│  │  ├─ index.tsx                        # 侧边栏组件
│  │  └─ styles.module.css                # 局部样式
│  ├─ Header/
│  │  ├─ index.tsx                        # 顶部导航栏
│  │  └─ styles.module.css
│  ├─ Footer/
│  │  ├─ index.tsx                        # 页脚组件
│  │  └─ styles.module.css
│  └─ MainLayout.tsx                      # 通用主布局（组合 Header + Sidebar + Footer）
│
├─ features/                              # 业务功能模块（按领域划分）
│  ├─ wallet/                             # 钱包相关功能
│  │  ├─ components/                      # 钱包专属组件
│  │  │  ├─ WalletSidebar.tsx
│  │  │  ├─ ConnectButton.tsx
│  │  │  ├─ BalanceDisplay.tsx
│  │  │  └─ styles.module.css
│  │  ├─ hooks/                           # 钱包状态、事件、余额逻辑
│  │  │  ├─ useWalletState.ts
│  │  │  ├─ useWalletBalance.ts
│  │  │  └─ useWalletEvents.ts
│  │  ├─ utils/                           # 钱包工具函数
│  │  │  ├─ formatAddress.ts
│  │  │  └─ walletHelpers.ts
│  │  ├─ constants/                       # 钱包常量配置
│  │  │  └─ walletConfig.ts
│  │  └─ index.ts                         # 模块导出
│  │
│  ├─ admin/                              # 管理后台模块
│  │  ├─ components/
│  │  │  ├─ AdminSidebar.tsx
│  │  │  ├─ AdminPanel.tsx
│  │  │  └─ styles.module.css
│  │  ├─ hooks/
│  │  │  └─ useAdminState.ts
│  │  └─ index.ts
│  │
│  ├─ game/                               # 游戏功能模块
│  │  ├─ components/
│  │  │  ├─ LotteryPanel.tsx
│  │  │  ├─ PrizeDisplay.tsx
│  │  │  └─ styles.module.css
│  │  ├─ hooks/
│  │  │  └─ useGameLogic.ts
│  │  └─ index.ts
│  │
│  └─ shared/                             # 可共享逻辑与工具（通用模块）
│     ├─ hooks/
│     │  ├─ useSharedStorage.ts
│     │  ├─ useModal.ts
│     │  └─ useBoolean.ts
│     ├─ utils/
│     │  ├─ formatNumber.ts
│     │  ├─ currency.ts
│     │  └─ logger.ts
│     └─ index.ts
│
├─ components/                            # 基础 UI 组件层（通用可复用）
│  ├─ common/                             # 基础组件（通用功能）
│  │  ├─ Button/
│  │  │  ├─ index.tsx
│  │  │  └─ styles.module.css
│  │  ├─ Card/
│  │  ├─ Input/
│  │  └─ Modal/
│  └─ ui/                                 # UI 元件（提示、加载等）
│     ├─ Toast/
│     │  ├─ index.tsx
│     │  └─ styles.module.css
│     └─ Spinner/
│        ├─ index.tsx
│        └─ styles.module.css
│
├─ pages/                                 # 页面级组件（与路由对应）
│  ├─ index.tsx                           # 首页
│  ├─ admin.tsx                           # 管理页面
│  ├─ game.tsx                            # 游戏页面
│  └─ user.tsx                            # 用户页面
│
├─ context/                               # 全局上下文（React Context Providers）
│  ├─ WalletContext.tsx                   # 钱包状态上下文
│  ├─ ThemeContext.tsx                    # 主题上下文
│  └─ AppContext.tsx                      # 全局应用上下文
│
├─ lib/                                   # Web3 / 网络相关实例
│  ├─ wagmiClient.ts                      # wagmi 客户端实例
│  ├─ ethersProvider.ts                   # ethers.js Provider 封装
│  └─ viemClient.ts                       # viem 客户端
│
├─ data/                                  # 静态数据与合约 ABI
│  ├─ LuckyDay.json
│  ├─ tokenList.json
│  └─ contracts/
│     ├─ ERC20.abi.json
│     └─ LuckyGame.abi.json
│
├─ styles/                                # 全局样式与变量
│  ├─ global.css
│  ├─ tailwind.css
│  ├─ variables.css
│  └─ animations.css
│
├─ assets/                                # 静态资源
│  ├─ icons/
│  ├─ images/
│  └─ fonts/
│
├─ types/                                 # 类型声明（全局 / 模块）
│  ├─ wallet.d.ts
│  ├─ contract.d.ts
│  ├─ global.d.ts
│  └─ env.d.ts
│
├─ core/                                  # 核心系统层（配置、插件、安全、路由）
│  ├─ config/
│  │  └─ app.config.ts                    # 全局应用配置
│  ├─ i18n/                               # 国际化模块
│  │  ├─ index.ts                         # i18n 初始化逻辑
│  │  └─ locales/
│  │     ├─ en.json
│  │     └─ zh.json
│  ├─ plugins/
│  │  └─ index.ts                         # 全局插件注册（e.g. analytics, sentry）
│  ├─ security/
│  │  └─ index.ts                         # 安全逻辑（auth, session）
│  └─ router/                             # 🔥 路由系统（核心配置）
│     ├─ guards/                          # 路由守卫
│     │  ├─ AuthGuard.tsx                 # 登录验证
│     │  └─ NetworkGuard.tsx              # 区块链网络验证
│     ├─ loaders/                         # （可选）数据加载逻辑
│     ├─ types.ts                         # 路由类型定义（RouteMeta 等）
│     ├─ utils.ts                         # 路由辅助工具（lazy 加载等）
│     ├─ index.tsx                        # Router 入口（BrowserRouter + useRoutes）
│     └─ routes.ts                        # 路由配置表（集中定义或聚合）
│
└─ .env                                   # 环境变量文件
└─ index.html                             # 根 HTML 模板（Vite 挂载点）



| 层级             | 说明                          |
| -------------- | --------------------------- |
| **app**        | 应用启动逻辑（React 根入口）           |
| **core**       | 系统核心（配置、插件、安全、路由） ✅         |
| **features**   | 按功能域划分的业务逻辑                 |
| **components** | 可复用的 UI 与功能组件               |
| **layouts**    | 页面框架与布局                     |
| **context**    | 全局状态容器（React Context）       |
| **lib**        | 第三方客户端或服务封装（wagmi、ethers 等） |
| **data**       | 静态数据与合约 ABI                 |
| **styles**     | 样式与主题                       |
| **assets**     | 静态资源（图标、字体等）                |
| **types**      | 全局 TypeScript 类型定义          |
