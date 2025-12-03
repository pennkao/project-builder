import { BoxCubeIcon, CalenderIcon, GridIcon, ImageIcon, ListIcon, PageIcon, PieChartIcon, ShoppingCartIcon, TableIcon, UserCircleIcon } from '@/icons';
// type NavItem = {
//     name: string;
//     icon: React.ReactNode;
//     path?: string;
//     subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
// };
export const navItems: NavItem[] = [
    //   {
    //     icon: <GridIcon />,
    //     name: "Dashboard",
    //     subItems: [{ name: "Ecommerce", path: "/",  }],
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
            { name: 'Products', path: '/products-list' },
            { name: 'Reviews', path: '/reviews' },
            { name: 'Orders', path: '/orders' },
        ],
    },
    {
        name: 'Gallery',
        icon: <ImageIcon />,
        subItems: [{ name: 'Images', path: '/images' }],
    },
    {
        name: 'Logs',
        icon: <ListIcon />,
        subItems: [{ name: 'Site Logs', path: '/logs' }],
    },
    // site
    {
        name: 'Sites',
        icon: <PageIcon />,
        subItems: [
            { name: 'Sites', path: '/sites' },
            // { name: 'Add Site', path: '/add-site' },
        ],
    },
    {
        name: 'Tables',
        icon: <TableIcon />,
        subItems: [{ name: 'Basic Tables', path: '/basic-tables' }],
    },
    {
        name: 'Pages',
        icon: <PageIcon />,
        subItems: [
            { name: 'Blank Page', path: '/blank' },
            //   { name: "404 Error", path: "/error-404",  },
        ],
    },
    {
        icon: <PieChartIcon />,
        name: 'Charts',
        subItems: [
            { name: 'Line Chart', path: '/line-chart' },
            { name: 'Bar Chart', path: '/bar-chart' },
        ],
    },
    {
        icon: <BoxCubeIcon />,
        name: 'UI Elements',
        subItems: [
            { name: 'Alerts', path: '/alerts' },
            { name: 'Avatar', path: '/avatars' },
            { name: 'Badge', path: '/badge' },
            { name: 'Buttons', path: '/buttons' },
            { name: 'Images1', path: '/images1' },
            { name: 'Videos', path: '/videos' },
        ],
    },
    //   {
    //     icon: <PlugInIcon />,
    //     name: "Authentication",
    //     subItems: [
    //       { name: "Sign In", path: "/signin",  },
    //       { name: "Sign Up", path: "/signup",  },
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
