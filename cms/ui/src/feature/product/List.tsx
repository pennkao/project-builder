import { Button, Image, SearchInput } from '@/components/elements';
import { Action, ActionLeft, ActionRight, Content, Footer, Page } from '@/feature/compos/layout';
import { List, Pagination, type ListColumn } from '@/feature/compos/list';
import { FilterIcon, PlusIcon } from '@/icons';
import { SRC } from '@/lib/image';
import { formatDate } from '@fullcalendar/core/index.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { StatusLabel } from './compos';
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
                    <Link to={`/products/${item?.handle}`}>
                        <Image src={SRC(item?.main_image || '')} className="h-10 w-10 rounded-md object-cover shrink-0" />
                    </Link>

                    <div className="flex flex-1 items-center line-clamp-2">{item?.name || '-'}</div>
                </div>
            ),
        },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'brand', label: 'Brand', sortable: true },
        {
            key: 'price',
            label: 'Price',
            sortable: true,
        },
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

            <Action>
                <ActionLeft>
                    <SearchInput value={search} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} />
                    <Button startIcon={<FilterIcon className="w-5 h-5" />} className="h-11" variant="outline">
                        Filter
                    </Button>
                </ActionLeft>
                <ActionRight>
                    <Button startIcon={<PlusIcon className="w-5 h-5" fill="white" />} variant="primary" onClick={() => navigator('/add-product')}>
                        Add Product
                    </Button>
                </ActionRight>
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
