import { SearchInput } from '@/components/composed';
import { Button, Image } from '@/components/elements';
import { Action, Content, Footer, Header, Page } from '@/feature/common/layout';
import { List, Pagination, type ListColumn } from '@/feature/common/list';
import { isrc } from '@/utils/image';
import { formatDate } from '@fullcalendar/core/index.js';
import { useState } from 'react';
import { Link } from 'react-router';
import { StatusLabel } from './comps';
import { useReviews } from './hooks';

import { FilterIcon } from '@/icons';

const Reviews = () => {
    const { result, setParamFilter } = useReviews();

    const [search, setSearch] = useState('');
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setParamFilter([{ field: 'name', operator: 'like', value: search }]);
        }
    };
    const handleDelete = (id: number) => {
        console.log(id);
        // setResult((prev) => ({
        //     ...prev,
        //     list: prev.list.filter((item) => item.id !== id),
        // }));
    };
    const productColumns: ListColumn<ProductReviewType>[] = [
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
        { key: 'rating', label: 'Rating', sortable: true },
        { key: 'total', label: 'Total', sortable: true },
        { key: 'count', label: 'Count', sortable: true },
        { key: 'avg', label: 'Avg', sortable: true },
        { key: 'status', label: 'Status', sortable: false, render: (item?: ProductReviewType) => <StatusLabel status={item?.status || 0} /> },
        { key: 'cts', label: 'Date', sortable: false, render: (item?: ProductReviewType) => formatDate(item?.cts || 0) },
        {
            key: 'action',
            label: 'Action',
            sortable: false,
            render: (item?: ProductReviewType) => (
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
            <Header title="Reviews" desc="Track your store's progress to boost your sales.">
                <Button variant="outline">Export</Button>
                <Button variant="primary">Add Product</Button>
            </Header>
            <Action>
                <SearchInput value={search} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} />
                <Button startIcon={<FilterIcon className="w-5 h-5" />} className="h-11" variant="outline">
                    Filter
                </Button>
            </Action>
            <Content>
                <List<ProductReviewType> rowKey="id" fields={productColumns} items={result?.list || []} />
            </Content>
            <Footer>
                <Pagination currentPage={1} totalCount={100} pageSize={10} onPageChange={() => {}} />
            </Footer>
        </Page>
    );
};
export default Reviews;
