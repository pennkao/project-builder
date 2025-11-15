import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';

// Assume these icons are imported from an icon library
import { useSidebar } from '../context/SidebarContext';
import { BoxCubeIcon, CalenderIcon, ChevronDownIcon, GridIcon, HorizontaLDots, ImageIcon, ListIcon, PageIcon, PieChartIcon, ShoppingCartIcon, TableIcon, UserCircleIcon } from '../icons';
import Logo from './Logo';
// import SidebarWidget from "./SidebarWidget.tsx3";

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
    //   {
    //     icon: <GridIcon />,
    //     name: "Dashboard",
    //     subItems: [{ name: "Ecommerce", path: "/", pro: false }],
    //   },
    {
        icon: <GridIcon />,
        name: 'Dashboard',
        path: '/',
    },
    {
        name: 'E-commerce',
        icon: <ShoppingCartIcon />,
        subItems: [
            { name: 'Products', path: '/products-list', pro: false },
            { name: 'Add Product', path: '/add-product', pro: false },
        ],
    },
    {
        name: 'Gallery',
        icon: <ImageIcon />,
        subItems: [{ name: 'Images', path: '/images', pro: false }],
    },
    {
        name: 'Forms',
        icon: <ListIcon />,
        subItems: [{ name: 'Form Elements', path: '/form-elements', pro: false }],
    },
    {
        name: 'Tables',
        icon: <TableIcon />,
        subItems: [{ name: 'Basic Tables', path: '/basic-tables', pro: false }],
    },
    {
        name: 'Pages',
        icon: <PageIcon />,
        subItems: [
            { name: 'Blank Page', path: '/blank', pro: false },
            //   { name: "404 Error", path: "/error-404", pro: false },
        ],
    },
    {
        icon: <PieChartIcon />,
        name: 'Charts',
        subItems: [
            { name: 'Line Chart', path: '/line-chart', pro: false },
            { name: 'Bar Chart', path: '/bar-chart', pro: false },
        ],
    },
    {
        icon: <BoxCubeIcon />,
        name: 'UI Elements',
        subItems: [
            { name: 'Alerts', path: '/alerts', pro: false },
            { name: 'Avatar', path: '/avatars', pro: false },
            { name: 'Badge', path: '/badge', pro: false },
            { name: 'Buttons', path: '/buttons', pro: false },
            { name: 'Images1', path: '/images1', pro: false },
            { name: 'Videos', path: '/videos', pro: false },
        ],
    },
    //   {
    //     icon: <PlugInIcon />,
    //     name: "Authentication",
    //     subItems: [
    //       { name: "Sign In", path: "/signin", pro: false },
    //       { name: "Sign Up", path: "/signup", pro: false },
    //     ],
    //   },
    {
        icon: <CalenderIcon />,
        name: 'Calendar',
        path: '/calendar',
    },
    {
        icon: <UserCircleIcon />,
        name: 'User Profile',
        path: '/profile',
    },
];

const AppSidebar = () => {
    // const [isLoadingSidebar, setIsLoadingSidebar] = useState(true);

    // // 模拟接口加载完成，或者根据真实数据接口
    // useEffect(() => {
    //     // const timer = setTimeout(() => setIsLoadingSidebar(false), 500);
    //     // return () => clearTimeout(timer);
    //     setIsLoadingSidebar(false);
    // }, []);
    // const SidebarSkeleton = () => {
    //     return (
    //         <aside className="fixed flex flex-col justify-start top-0 px-5 left-0 bg-white dark:bg-gray-900 h-screen w-[290px] animate-pulse border-r border-gray-200">
    //             <div className="py-8  flex justify-start">
    //                 <div className="h-15 dark:h-8 w-32 bg-gray-100 dark:bg-gray-700 rounded"></div>
    //             </div>
    //             <div className="py-1 w-full flex justify-start mb-5">
    //                 <div className="h-5 text-gray-500 text-xs">MENU</div>
    //             </div>
    //             <nav className="flex flex-col gap-4 px-2">
    //                 {Array.from({ length: 8 }).map((_, i) => (
    //                     <div key={i} className="h-10 w-full bg-gray-100 dark:bg-gray-700 rounded mx-2"></div>
    //                 ))}
    //             </nav>
    //         </aside>
    //     );
    // };

    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState<{
        index: number;
    } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // const isActive = (path: string) => location.pathname === path;
    const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

    useEffect(() => {
        let submenuMatched = false;
        navItems.forEach((nav, index) => {
            if (nav.subItems) {
                nav.subItems.forEach((subItem) => {
                    if (isActive(subItem.path)) {
                        setOpenSubmenu({
                            //   type: menuType as "main" | "others",
                            index,
                        });
                        submenuMatched = true;
                    }
                });
            }
        });

        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [location, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (prevOpenSubmenu && prevOpenSubmenu.index === index) {
                return null;
            }
            return { index };
        });
    };

    const renderMenuItems = (items: NavItem[]) => (
        <ul className="flex flex-col gap-4">
            {items.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index)}
                            className={`menu-item group ${openSubmenu?.index === index ? 'menu-item-active' : 'menu-item-inactive'} cursor-pointer ${!isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'}`}
                        >
                            <span className={`menu-item-icon-size  ${openSubmenu?.index === index ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>{nav.icon}</span>
                            {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDownIcon className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.index === index ? 'rotate-180 text-brand-500' : ''}`} />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link to={nav.path} className={`menu-item group ${isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'}`}>
                                <span className={`menu-item-icon-size ${isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>{nav.icon}</span>
                                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                            </Link>
                        )
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`${index}`] = el;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                                height: openSubmenu?.index === index ? `${subMenuHeight[`${index}`]}px` : '0px',
                            }}
                        >
                            <ul className="mt-2 space-y-1 ml-9">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link to={subItem.path} className={`menu-dropdown-item ${isActive(subItem.path) ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}>
                                            {subItem.name}
                                            <span className="flex items-center gap-1 ml-auto">
                                                {subItem.new && <span className={`ml-auto ${isActive(subItem.path) ? 'menu-dropdown-badge-active' : 'menu-dropdown-badge-inactive'} menu-dropdown-badge`}>new</span>}
                                                {subItem.pro && <span className={`ml-auto ${isActive(subItem.path) ? 'menu-dropdown-badge-active' : 'menu-dropdown-badge-inactive'} menu-dropdown-badge`}>pro</span>}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
    // if (isLoadingSidebar) {
    //     return <SidebarSkeleton />;
    // }
    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`py-8 flex ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}>
                <Link to="/">
                    <Logo big={isExpanded || isHovered || isMobileOpen} />
                </Link>
            </div>
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}>
                                {isExpanded || isHovered || isMobileOpen ? 'Menu' : <HorizontaLDots className="size-6" />}
                            </h2>
                            {renderMenuItems(navItems)}
                        </div>
                        <div className="">
                            <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}></h2>
                        </div>
                    </div>
                </nav>
                {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
            </div>
        </aside>
    );
};

export default AppSidebar;
