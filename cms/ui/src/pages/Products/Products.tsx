import { Confirm } from '@/components/Confirm';
import FieldSort from '@/components/FidldSort';
import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import Image from '@/components/Image';
import ContentAction from '@/components/page/ContentAction';
import Page from '@/components/page/Page';
import PageAction from '@/components/page/PageAction';
import { Pagination } from '@/components/page/Pagination';
import Button from '@/components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { formatProductStatus } from '@/feature/status/product';
import { useProductList } from '@/hooks/product/useProductList';
import { usePost } from '@/hooks/usePost';
import { DownloadIcon, FilterIcon, PlusIcon, SearchIcon } from '@/icons';
import { isrc } from '@/utils/image';
import { sortItems } from '@/utils/sort';
import { formatDate } from '@fullcalendar/core/index.js';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function Products() {
    const navigator = useNavigate();
    const [search, setSearch] = useState('');
    const { result, setResult, setParamFilter, setParamSort, setPage, fetchList } = useProductList();
    useEffect(() => {
        fetchList();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setParamFilter([{ field: 'name', operator: 'like', value: search }]);
        }
    };
    const handleDelete = (id: number) => {
        setResult((prev) => ({
            ...prev,
            list: prev.list.filter((item) => item.id !== id),
        }));
    };

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
                    <Button startIcon={<PlusIcon className="w-5 h-5" fill="white" />} variant="primary" onClick={() => navigator('/add-product')}>
                        Add Product
                    </Button>
                </div>
            </PageAction>
            <ContentAction>
                <div className="relative flex-1 sm:flex-auto">
                    <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        <SearchIcon className="w-5 h-5 fill-current" />
                    </span>

                    <Input placeholder="Search..." value={search} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} className="pl-11 sm:w-[300px] sm:min-w-[300px]" />
                </div>
                <div className="relative">
                    <Button startIcon={<FilterIcon className="w-5 h-5" />} className="h-11" variant="outline">
                        Filter
                    </Button>
                </div>
            </ContentAction>
            <ListProduct items={[...(result?.list || [])]} onDelete={(id) => handleDelete(id)} />
            <Pagination currentPage={result?.page} pageSize={result?.size} totalCount={result?.total} onPageChange={setPage} />
        </Page>
    );
}

const ListProduct = ({ items, onDelete }: { onDelete: (id: number) => void; items: ProductItemType[] }) => {
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({}); // Add this line
    const [isAllSelected, setIsAllSelected] = useState(false);
    const { doPost } = usePost<PageListDataType<ProductItemType>>('delete');

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
        const field = sortingField.field as keyof ProductItemType;
        return sortItems<ProductItemType>(items, field, sortingField.status);
    }, [items, sortingField]);

    const handleSorting = (field: keyof ProductItemType) => {
        if (field !== sortingField.field) {
            setSortingField({ field, status: 'desc' });
            return;
        }
        setSortingField({
            field,
            status: sortingField.status === '' || sortingField.status === 'asc' ? 'desc' : 'asc',
        });
    };
    const handleDelete = async (id: number) => {
        const result = await Confirm('Delete selected items?', 'Cannot be undone.');
        if (result) {
            doPost({ params: { id: id, target: 'product' } });
            onDelete(id);
        }
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
                                    {item.main_image ? (
                                        <Image src={isrc(item.main_image)} className="h-10 w-10 rounded-md object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-600">Img</div>
                                    )}

                                    <span className={className}>{item.name}</span>
                                </div>
                            </TableCell>

                            <TableCell className={className}>{item.category}</TableCell>

                            <TableCell className={className}>{item.brand}</TableCell>

                            <TableCell className={className}>{item.price}</TableCell>

                            <TableCell className={className}>{formatProductStatus(item.status)}</TableCell>

                            <TableCell className={className}>{formatDate(item.cts)}</TableCell>

                            <TableCell className={className}>
                                <Link to={`/edit-product/${item.id}`}>Edit</Link>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="ml-2"
                                    onClick={() => {
                                        handleDelete(item.id); // TODO: delete product
                                    }}
                                >
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
