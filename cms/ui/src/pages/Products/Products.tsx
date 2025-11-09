import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import ContentAction from '@/components/page/ContentAction';
import Page from '@/components/page/Page';
import PageAction from '@/components/page/PageAction';
import Button from '@/components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { usePostApi } from '@/hooks/useApi';
import { AngleDownIcon, AngleUpIcon, DownloadIcon, FilterIcon, PlusIcon, SearchIcon } from '@/icons';
import { formatDate } from '@fullcalendar/core/index.js';
import { useEffect, useMemo, useState } from 'react';
interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: string;
    sales_count: string;
    status: number;
    cts: string;
    main_image_url: string;
}
export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const { refresh } = usePostApi<Product[]>('list-products');
    useEffect(() => {
        refresh({ a: 1, b: 2 }).then((res) => {
            if (res) {
                setProducts(res);
            }
        });
    }, []);

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

    const [sortingField, setSortingField] = useState<{ field: string; status: '' | 'asc' | 'desc' }>({ field: '', status: '' });
    // ✅ 排序逻辑
    const sortedItems = useMemo(() => {
        if (!sortingField.field || sortingField.status === '') return [...items];
        const field = sortingField.field as keyof Product;
        return [...items].sort((a, b) => {
            if (a[field] < b[field]) return sortingField.status === 'asc' ? 1 : -1;
            if (a[field] > b[field]) return sortingField.status === 'asc' ? -1 : 1;
            return 0;
        });
    }, [items, sortingField]);
    const formatStatus = (status: number) => {
        return status === 0 ? 'Active' : 'Inactive';
    };
    const handleSorting = (field: keyof Product) => {
        if (field !== sortingField.field) {
            setSortingField({ field, status: 'desc' });
            return;
        }
        setSortingField({
            field,
            status: sortingField.status === '' || sortingField.status === 'asc' ? 'desc' : 'asc',
        });
    };
    const FieldJsx = ({ label, field, sortingField, onClick }: { label: string; field: string; sortingField?: { field: string; status: '' | 'asc' | 'desc' }; onClick: () => void }) => {
        console.log(sortingField);
        const handleClick = () => {
            onClick();
        };
        return (
            <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={handleClick}>
                <div className="text-sm text-gray-500 ">{label}</div>
                <div className="flex flex-col justify-center gap-0">
                    <AngleUpIcon className={`w-2 h-2 ${sortingField?.status === 'asc' && sortingField.field === field ? 'text-black' : 'text-gray-500/40'}`} />
                    <AngleDownIcon className={`w-2 h-2 ${sortingField?.status === 'desc' && sortingField.field === field ? 'text-black' : 'text-gray-500/40'}`} />
                </div>
            </div>
        );
    };
    const className = 'px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-100';

    return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <Table>
                <TableHeader>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-sm">
                        <th className={className}>
                            <Checkbox
                                checked={isAllSelected}
                                onChange={() => {
                                    handleSelectAll(!isAllSelected); // 切换 true/false
                                    setIsAllSelected(!isAllSelected);
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldJsx
                                label={'Product'}
                                field={'name'}
                                sortingField={sortingField}
                                onClick={() => {
                                    handleSorting('name');
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldJsx
                                label={'Category'}
                                field={'category'}
                                sortingField={sortingField}
                                onClick={() => {
                                    handleSorting('category');
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldJsx
                                label={'Brand'}
                                field={'brand'}
                                sortingField={sortingField}
                                onClick={() => {
                                    handleSorting('brand');
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldJsx
                                label={'Price'}
                                field={'price'}
                                sortingField={sortingField}
                                onClick={() => {
                                    handleSorting('price');
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldJsx
                                label={'Status'}
                                field={'status'}
                                sortingField={sortingField}
                                onClick={() => {
                                    handleSorting('status');
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldJsx
                                label={'Date'}
                                field={'cts'}
                                sortingField={sortingField}
                                onClick={() => {
                                    handleSorting('cts');
                                }}
                            />
                        </th>

                        <th className={className}>
                            <span className="text-xs text-gray-600">Actions</span>
                        </th>
                    </tr>
                </TableHeader>

                <TableBody>
                    {sortedItems.map((item, index) => (
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
                                    <img src={item.main_image_url} className="h-10 w-10 rounded-md object-cover" />
                                    <span className={className}>{item.name}</span>
                                </div>
                            </TableCell>

                            <TableCell className={className}>{item.category}</TableCell>

                            <TableCell className={className}>{item.brand}</TableCell>

                            <TableCell className={className}>{item.price}</TableCell>

                            <TableCell className={className}>
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${item.status === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {formatStatus(item.status)}
                                </span>
                            </TableCell>

                            <TableCell className={className}>{formatDate(item.cts)}</TableCell>

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
