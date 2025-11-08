import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import ContentAction from '@/components/page/ContentAction';
import Page from '@/components/page/Page';
import PageAction from '@/components/page/PageAction';
import Button from '@/components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { DownloadIcon, FilterIcon, PlusIcon, SearchIcon } from '@/icons';
import { useState } from 'react';
interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: string;
    stock: string;
    stockType: string;
    date: string;
    image: string;
}
export default function Products() {
    const products = [
        {
            id: 1,
            name: 'ASUS ROG Gaming Laptop',
            category: 'Laptop',
            brand: 'ASUS',
            price: '$2,199',
            stock: 'Out of Stock',
            stockType: 'out',
            date: '01 Dec, 2027',
            image: '/images/product/product-01.jpg',
        },
        {
            id: 2,
            name: 'Airpods Pro 2nd Gen',
            category: 'Accessories',
            brand: 'Apple',
            price: '$839',
            stock: 'In Stock',
            stockType: 'in',
            date: '29 Jun, 2027',
            image: '/images/product/product-02.jpg',
        },
    ];

    return (
        <Page pageTitle="Product List">
            <PageAction>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Products List</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track your store's progress to boost your sales.</p>
                </div>
                <div className="flex gap-3">
                    <Button endIcon={<DownloadIcon className="w-5 h-5" />} variant="outline">
                        Export
                    </Button>
                    <a>
                        <Button startIcon={<PlusIcon className="w-5 h-5" fill="white" />} variant="primary">
                            Add Product
                        </Button>
                    </a>
                </div>
            </PageAction>
            <ContentAction>
                <div className="relative flex-1 sm:flex-auto">
                    <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        <SearchIcon className="w-5 h-5 fill-current" />
                    </span>

                    <Input placeholder="Search..." className="pl-11 sm:w-[300px] sm:min-w-[300px]" />
                </div>
                <div className="relative">
                    <Button startIcon={<FilterIcon className="w-5 h-5" />} className="h-11" variant="outline">
                        Filter
                    </Button>
                </div>
            </ContentAction>
            <List items={products} />
        </Page>
    );
}

const List = ({ items }: { items: Product[] }) => {
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({}); // Add this line
    const [isAllSelected, setIsAllSelected] = useState(false);
    const handleCheckboxChange = (id: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id], // 切换 true/false
        }));
    };
    const handleSelectAll = (isSelected: boolean) => {
        const allSelected: Record<number, boolean> = {};
        items.forEach((item) => {
            allSelected[item.id] = isSelected;
        });
        setCheckedItems(allSelected);
    };

    const className = 'px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-100';

    return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <Table>
                <TableHeader>
                    <tr>
                        <th className={className}>
                            <Checkbox
                                checked={isAllSelected}
                                onChange={() => {
                                    handleSelectAll(!isAllSelected); // 切换 true/false
                                    setIsAllSelected(!isAllSelected);
                                }}
                            />
                        </th>
                        <th className={className}>Product</th> 
                        <th className={className}>Category</th>
                        <th className={className}>Brand</th>
                        <th className={className}>Price</th>
                        <th className={className}>Stock</th>
                        <th className={className}>Created At</th>
                        <th className={className}>Actions</th>
                    </tr>
                </TableHeader>

                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                            <TableCell className={className}>
                                <Checkbox
                                    id={`checkbox-${item.id}`}
                                    checked={!!checkedItems[item.id]}
                                    onChange={() => {
                                        handleCheckboxChange(item.id);
                                    }}
                                />
                            </TableCell>

                            <TableCell className={className}>
                                <div className="flex items-center gap-3">
                                    <img src={item.image} alt={item.name} className="h-10 w-10 rounded-md object-cover" />
                                    <span className={className}>{item.name}</span>
                                </div>
                            </TableCell>

                            <TableCell className={className}>{item.category}</TableCell>

                            <TableCell className={className}>{item.brand}</TableCell>

                            <TableCell className={className}>{item.price}</TableCell>

                            <TableCell className={className}>
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${item.stockType === 'in' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {item.stock}
                                </span>
                            </TableCell>

                            <TableCell className={className}>{item.date}</TableCell>

                            <TableCell className={className}>
                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
