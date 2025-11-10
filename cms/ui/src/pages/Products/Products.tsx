import FieldSort from '@/components/FidldSort';
import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import ContentAction from '@/components/page/ContentAction';
import Page from '@/components/page/Page';
import PageAction from '@/components/page/PageAction';
import Button from '@/components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { formatProductStatus } from '@/feature/status/product';
import { usePost } from '@/hooks/usePost';
import { DownloadIcon, FilterIcon, PlusIcon, SearchIcon } from '@/icons';
import { sortItems } from '@/utils/sort';
import { formatDate } from '@fullcalendar/core/index.js';
import { useEffect, useMemo, useState } from 'react';
import Image from '../../components/Image';
import { Pagination } from '../../components/page/Pagination';
interface ProductType {
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
interface ProductPageType {
    page: number;
    size: number;
    total: number;
    list: ProductType[];
}
export default function Products() {
    const [page, setPage] = useState(1); // eslint-disable-next-line
    const [result, setResult] = useState<ProductPageType>({
        page: 1,
        size: 10,
        total: 0,
        list: [],
    });
    const { doPost } = usePost<ProductPageType>('list-products');
    // doLoading({}, { page, size: 10 }, (res) => setResult(res));
    useEffect(() => {
        doPost({ querys: { page: page, size: 10 } }, (data) => {
            setResult(data);
        });
    }, [page]);

    return (
        <Page pageTitle="Product List" showBackgroud={true}>
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
            <ListProduct items={[...(result?.list || [])]} />
            <Pagination currentPage={result?.page} pageSize={result?.size} totalCount={result?.total} onPageChange={setPage} />
        </Page>
    );
}

const ListProduct = ({ items }: { items: ProductType[] }) => {
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
        const field = sortingField.field as keyof ProductType;
        return sortItems(items, field, sortingField.status);
    }, [items, sortingField]);

    const handleSorting = (field: keyof ProductType) => {
        if (field !== sortingField.field) {
            setSortingField({ field, status: 'desc' });
            return;
        }
        setSortingField({
            field,
            status: sortingField.status === '' || sortingField.status === 'asc' ? 'desc' : 'asc',
        });
    };

    const className = 'px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-100';
    const firstRowClassName = 'px-5 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-100';

    return (
        <div className="w-full">
            <Table>
                <TableHeader>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-sm h-12">
                        <th className={firstRowClassName}>
                            <Checkbox
                                checked={isAllSelected}
                                onChange={() => {
                                    handleSelectAll(!isAllSelected); // 切换 true/false
                                    setIsAllSelected(!isAllSelected);
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldSort
                                label={'Product'}
                                field={'name'}
                                sortingField={sortingField}
                                onClick={() => {
                                    handleSorting('name');
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldSort
                                label={'Category'}
                                field={'category'}
                                sortingField={sortingField}
                                onClick={() => {
                                    handleSorting('category');
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldSort
                                label={'Brand'}
                                field={'brand'}
                                sortingField={sortingField}
                                onClick={() => {
                                    handleSorting('brand');
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldSort
                                label={'Price'}
                                field={'price'}
                                sortingField={sortingField}
                                onClick={() => {
                                    handleSorting('price');
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldSort
                                label={'Status'}
                                field={'status'}
                                sortingField={sortingField}
                                onClick={() => {
                                    handleSorting('status');
                                }}
                            />
                        </th>
                        <th className={className}>
                            <FieldSort
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
                        <TableRow key={index} className=" hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                            <TableCell className={firstRowClassName}>
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
                                    <Image src={item.main_image_url} className="h-10 w-10 rounded-md object-cover" />
                                    <span className={className}>{item.name}</span>
                                </div>
                            </TableCell>

                            <TableCell className={className}>{item.category}</TableCell>

                            <TableCell className={className}>{item.brand}</TableCell>

                            <TableCell className={className}>{item.price}</TableCell>

                            <TableCell className={className}>{formatProductStatus(item.status)}</TableCell>

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
