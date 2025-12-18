import { Button, Image, SearchInput } from '@/components/elements';
import { Action, ActionLeft, ActionRight, Content, Footer, Page } from '@/feature/compos/layout';
import { List, Pagination, type ListColumn } from '@/feature/compos/list';
import { useList } from '@/hooks/useList';
import { SRC } from '@/lib/image';

import { FilterIcon, PlusIcon } from '@/icons';
import { formatDate } from '@fullcalendar/core/index.js';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function ReviewDetails() {
    const navigator = useNavigate();
    const { SetPage, Result, SetFilter, Delete, SetIds } = useList<CustomerReviewsType>('customer-review');
    const [search, setSearch] = useState('');
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            SetFilter([{ field: 'ukey', operator: 'like', value: search }]);
        }
    };

    const siteLogColumns: ListColumn<CustomerReviewsType>[] = [
        {
            key: 'user_name',
            label: 'User',
            sortable: false,
        },
        { key: 'user_avatar', label: 'Avatar', sortable: false, render: (item?: CustomerReviewsType) => <Image src={SRC(item?.user_avatar || '')} className="h-10 w-10 rounded-md object-cover shrink-0" /> },
        { key: 'title', label: 'Title', sortable: false, render: (item?: CustomerReviewsType) => item?.title || '-' },
        { key: 'rating', label: 'Rating', sortable: false, render: (item?: CustomerReviewsType) => item?.rating || '-' },
        { key: 'rating', label: 'rating', sortable: false, render: (item?: CustomerReviewsType) => item?.images?.join(',') || '-' },
        { key: 'sort', label: 'Sort', sortable: false, render: (item?: CustomerReviewsType) => item?.sort || '-' },
        { key: 'status', label: 'Status', sortable: false, render: (item?: CustomerReviewsType) => item?.status || '-' },
        { key: 'cts', label: 'Time', sortable: false, render: (item?: CustomerReviewsType) => formatDate(item?.cts || 0) },
        {
            key: 'actions',
            label: 'Actions',
            sortable: false,
            render: (item?: CustomerReviewsType) => (
                <div className="flex items-center gap-1">
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
        <Page title="Review Details" showBackgroud={true}>
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
                    <Button
                        variant="outline"
                        onClick={() => {
                            Delete();
                        }}
                    >
                        Delete
                    </Button>
                </ActionRight>
            </Action>
            <Content>
                <List<CustomerReviewsType>
                    fields={siteLogColumns}
                    items={Result?.list || []}
                    openTab={true}
                    onSelect={(ids) => {
                        SetIds(ids);
                    }}
                />
            </Content>
            <Footer>
                <Pagination currentPage={Result?.page || 0} pageSize={Result?.size || 0} totalCount={Result?.total || 0} onPageChange={SetPage} />
            </Footer>
        </Page>
    );
}
