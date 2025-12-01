import { Button, Image, SearchInput } from '@/components/elements';
import { Action, Content, Footer, Header, Page } from '@/feature/common/layout';
import { List, Pagination, type ListColumn } from '@/feature/common/list';
import { DownloadIcon, FilterIcon, PlusIcon } from '@/icons';
import { isrc } from '@/lib/image';
import { formatDate } from '@fullcalendar/core/index.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { StatusLabel } from './comps';
import { useProductList } from './hooks';
export default function Products() {
    const navigator = useNavigate();
    const [search, setSearch] = useState('');
    const { result, Delete, setParamFilter, setPage } = useProductList();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setParamFilter([{ field: 'name', operator: 'like', value: search }]);
        }
    };

    const productColumns: ListColumn<ProductItemType>[] = [
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
                            // Delete(item?.id || 0); // TODO: delete product
                        }}
                    >
                        Import
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => {
                            Delete(item?.id || 0); // TODO: delete product
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Page title="Product List" showBackgroud={true}>
            <Header title="Products" desc="Track your store's progress to boost your sales.">
                <Button endIcon={<DownloadIcon className="w-5 h-5" />} variant="outline">
                    Export
                </Button>

                <Button startIcon={<PlusIcon className="w-5 h-5" fill="white" />} variant="primary" onClick={() => navigator('/add-product')}>
                    Add Product
                </Button>
            </Header>
            <Action>
                <SearchInput value={search} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} />
                <Button startIcon={<FilterIcon className="w-5 h-5" />} className="h-11" variant="outline">
                    Filter
                </Button>
            </Action>
            <Content>
                <List<ProductItemType> fields={productColumns} items={result?.list || []} />
            </Content>
            <Footer>
                <Pagination currentPage={result?.page} pageSize={result?.size} totalCount={result?.total} onPageChange={setPage} />
            </Footer>
        </Page>
    );
}
