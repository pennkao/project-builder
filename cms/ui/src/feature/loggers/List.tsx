import { Button, SearchInput } from '@/components/elements';
import { Action, ActionLeft, ActionRight, Content, Footer, Page } from '@/feature/compos/layout';
import { List, Pagination, type ListColumn } from '@/feature/compos/list';
import { useList } from '@/hooks/useList';
import { FilterIcon, PlusIcon } from '@/icons';
import { formatDate } from '@fullcalendar/core/index.js';
import { useState } from 'react';
import { useNavigate } from 'react-router';
export default function LoggerList() {
    const navigator = useNavigate();
    const [search, setSearch] = useState('');
    const { SetPage, Result, SetFilter, Delete, SetIds } = useList<SiteLogType>('log');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            SetFilter([{ field: 'ukey', operator: 'like', value: search }]);
        }
    };

    const handhandleRowClick = (item?: SiteLogType) => {
        if (item) {
            // navigator(`/logs/${item.ukey}`);
        }
    };
    const siteLogColumns: ListColumn<SiteLogType>[] = [
        {
            key: 'ukey',
            label: 'ukey',
            sortable: false,
            clickable: true,
            render: (item?: SiteLogType) => item?.ukey.slice(0, 5) || '-',
        },
        { key: 'ts', label: 'ts', sortable: true, render: (item?: SiteLogType) => formatDate(item?.ts || 0, { day: '2-digit', hour: '2-digit', minute: '2-digit' }) },
        { key: 'domain', label: 'domain', sortable: false },
        { key: 'source', label: 'source', sortable: true },

        { key: 'ip', label: 'ip', sortable: false, render: (item?: SiteLogType) => item?.ips?.ip.slice(0, 15) || '-' },
        { key: 'wip', label: 'wip', sortable: false, render: (item?: SiteLogType) => item?.fps?.webrtcIps || '-' },
        { key: 'cts', label: 'Date', sortable: false, render: (item?: SiteLogType) => formatDate(item?.cts || 0, { year: 'numeric', month: '2-digit' }) },
        {
            key: 'actions',
            label: 'Actions',
            sortable: false,
            render: (item?: SiteLogType, i?: number) => (
                <div>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handhandleRowClick(item);
                        }}
                    >
                        Edit
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <Page title="Logs List" showBackgroud={true}>
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
                    <Button variant="outline" onClick={Delete}>
                        Delete
                    </Button>
                </ActionRight>
            </Action>
            <Content>
                <List<SiteLogType>
                    fields={siteLogColumns}
                    items={Result?.list || []}
                    openTab={true}
                    onSelect={(ids) => {
                        SetIds(ids);
                    }}
                />
            </Content>
            <Footer>
                <Pagination currentPage={Result?.page || 1} pageSize={Result?.size} totalCount={Result?.total} onPageChange={SetPage} />
            </Footer>
        </Page>
    );
}
