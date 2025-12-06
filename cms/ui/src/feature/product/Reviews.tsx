import { SearchInput } from '@/components/composed';
import { Button, Image, Input } from '@/components/elements';
import { Action, ActionLeft, ActionRight, Content, Footer, Page } from '@/feature/compos/layout';
import { List, Pagination, type ListColumn } from '@/feature/compos/list';
import { SRC } from '@/lib/image';
import { formatDate } from '@fullcalendar/core/index.js';
import { useState } from 'react';
import { Link } from 'react-router';
import { StatusLabel } from './compos';
import { useReviews } from './hooks';

import { FilterIcon } from '@/icons';

const Reviews = () => {
    const { result, setParamFilter, setPage } = useReviews();
    const [search, setSearch] = useState('');
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setParamFilter([{ field: 'name', operator: 'like', value: search }]);
        }
    };
    const handleToggle = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };
    const handleImport = (id: number) => {
        setExpandedRow(null);
    };
    const productColumns: ListColumn<ProductReviewType>[] = [
        {
            key: 'name',
            label: 'Product',
            sortable: true,
            render: (item) => (
                <div className="flex items-center gap-3">
                    <Link to={`/collections/${item?.handle}`}>
                        <Image src={SRC(item?.main_image || '')} className="h-10 w-10 rounded-md object-cover" />
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
                            handleToggle(item?.id || 0);
                        }}
                    >
                        Import
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Page title="Reviews" showBackgroud={true}>
            <Action>
                <ActionLeft>
                    <SearchInput value={search} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} />
                    <Button startIcon={<FilterIcon className="w-5 h-5" />} className="h-11" variant="outline">
                        Filter
                    </Button>
                </ActionLeft>
                <ActionRight>
                    <Button variant="primary">Add Product</Button>
                </ActionRight>
            </Action>
            <Content>
                <List<ProductReviewType> rowKey="id" fields={productColumns} items={result?.list || []} expandedRow={expandedRow}>
                    {(item) => (
                        <div className="flex items-center gap-2 justify-end w-full">
                            <Input placeholder="Enter product review url" />
                            <Button variant="primary" size="sm" onClick={() => handleImport(item?.id || 0)}>
                                Import
                            </Button>
                        </div>
                    )}
                </List>
            </Content>
            <Footer>
                <Pagination currentPage={result?.page || 1} totalCount={result?.total || 0} pageSize={result?.size || 10} onPageChange={setPage} />
            </Footer>
        </Page>
    );
};
export default Reviews;
