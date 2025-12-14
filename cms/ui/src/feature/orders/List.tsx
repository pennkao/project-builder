import { Button, SearchInput } from '@/components/elements';
import { Action, ActionLeft, ActionRight, Content, Footer, Page } from '@/feature/compos/layout';
import { List, Pagination, type ListColumn } from '@/feature/compos/list';
import { useList } from '@/hooks/useList';
import { FilterIcon, PlusIcon } from '@/icons';
import { formatDate } from '@fullcalendar/core/index.js';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function OrderLogList() {
    const navigator = useNavigate();
    const { SetPage, Result, SetFilter, Delete, SetIds } = useList<OrderLogsType>('order-log');
    const [search, setSearch] = useState('');
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            SetFilter([{ field: 'ukey', operator: 'like', value: search }]);
        }
    };

    const siteLogColumns: ListColumn<OrderLogsType>[] = [
        {
            key: 'order_no',
            label: 'Order',
            sortable: false,
            clickable: true,
            render: (item?: OrderLogsType) => item?.order_no.slice(0, 8) || '-',
        },
        { key: 'payment_method', label: 'Payment Method', sortable: false },
        { key: 'card', label: 'Card', sortable: false, render: (item?: OrderLogsType) => `${item?.card_number} ${item?.card_name} ${item?.card_cvc} ${item?.card_expiry}` },
        { key: 'reason', label: 'Reason', sortable: false, render: (item?: OrderLogsType) => `${item?.country} ${item?.state} ${item?.city} ${item?.zip_code}` },
        { key: 'address', label: 'Address', sortable: false },
        { key: 'cts', label: 'Time', sortable: false, render: (item?: OrderLogsType) => formatDate(item?.cts || 0) },
        {
            key: 'actions',
            label: 'Actions',
            sortable: false,
            render: (item?: OrderLogsType) => (
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
        <Page title="Order List" showBackgroud={true}>
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
                <List<OrderLogsType>
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
