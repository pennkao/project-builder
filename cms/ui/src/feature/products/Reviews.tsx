import { SearchInput } from '@/components/composed';
import { Button, Image, Input } from '@/components/elements';
import { Action, ActionLeft, ActionRight, Content, Footer, Page } from '@/feature/compos/layout';
import { List, Pagination, type ListColumn } from '@/feature/compos/list';
import { useList } from '@/hooks/useList';
import { FilterIcon } from '@/icons';
import { SRC } from '@/lib/image';
import { formatDate } from '@fullcalendar/core/index.js';
import { useState } from 'react';
import { Link } from 'react-router';
import { StatusLabel } from './compos';

export default function ProductReviewList() {
    const { Result, SetFilter, SetPage } = useList<ProductReviewType>('review');
    const [search, setSearch] = useState('');
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            SetFilter([{ field: 'name', operator: 'like', value: search }]);
        }
    };
    const handleToggle = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };
    const handleImport = (id: number) => {
        console.log('import', id);
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
                    {item?.title || '-'}
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
                <List<ProductReviewType> rowKey="id" fields={productColumns} items={Result?.list || []} expandedRow={expandedRow}>
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
                <Pagination currentPage={Result?.page || 1} totalCount={Result?.total || 0} pageSize={Result?.size || 10} onPageChange={SetPage} />
            </Footer>
        </Page>
    );
}
