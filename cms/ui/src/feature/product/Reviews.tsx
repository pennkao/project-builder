import { SearchInput } from '@/components/composed';
import { Button, Image } from '@/components/elements';
import { Action, Content, Footer, Header, Page } from '@/feature/common/layout';
import { List, Pagination } from '@/feature/common/list';
import { isrc } from '@/utils/image';
import { formatDate } from '@fullcalendar/core/index.js';
import { Link } from 'react-router';
import { StatusLabel } from './comps';
import { useProductList } from './hooks';

import { FilterIcon } from '@/icons';
export type ListColumn<T> = {
    key: keyof T | string; // 字段名或标识
    label: string; // 列标题
    sortable?: boolean; // 是否可排序
    render?: (item?: T) => React.ReactNode; // 自定义单元格渲染
    className?: string; // 可选样式
};

const Reviews = () => {
    const { result, setParamFilter, setPage } = useProductList();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // setParamFilter([{ field: 'name', operator: 'like', value: search }]);
        }
    };
    const handleDelete = (id: number) => {
        // setResult((prev) => ({
        //     ...prev,
        //     list: prev.list.filter((item) => item.id !== id),
        // }));
    };
    const productColumns: ListColumn<ProductItemType>[] = [
        {
            key: 'index',
            label: '',
            sortable: false,
        },

        {
            key: 'name',
            label: 'Product',
            sortable: true,
            render: (item) => (
                <div className="flex items-center gap-3">
                    <Link to={`/collections/${item?.handle}`}>
                        <Image src={isrc(item?.main_image || '')} className="h-10 w-10 rounded-md object-cover" />
                    </Link>
                    {item?.name || '-'}
                </div>
            ),
        },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'brand', label: 'Brand', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'status', label: 'Status', sortable: false, render: (item?: ProductItemType) => <StatusLabel status={item?.status || 0} /> },
        { key: 'cts', label: 'Date', sortable: false, render: (item?: ProductItemType) => formatDate(item?.cts || 0) },
        {
            key: 'action',
            label: 'Action',
            sortable: false,
            render: (item?: ProductItemType) => (
                <div className="flex items-center gap-1">
                    <Link to={`/edit-product/${item?.id}`}>Edit</Link>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => {
                            handleDelete(item?.id || 0); // TODO: delete product
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Page title="Reviews" showBackgroud={true}>
            <Header title="Products" desc="Track your store's progress to boost your sales.">
                <Button variant="outline">Export</Button>
                <Button variant="primary">Add Product</Button>
            </Header>
            <Action>
                <SearchInput value={''} onKeyDown={handleKeyDown} onChange={(e) => {}} />
                <Button startIcon={<FilterIcon className="w-5 h-5" />} className="h-11" variant="outline">
                    Filter
                </Button>
            </Action>
            <Content>
                <List<ProductItemType> rowKey="id" fields={productColumns} items={result?.list || []} />
            </Content>
            <Footer>
                <Pagination currentPage={1} totalCount={100} pageSize={10} onPageChange={() => {}} />
            </Footer>
        </Page>
    );
};
export default Reviews;
