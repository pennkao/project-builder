import { Button, Switch } from '@/components/elements';
import { Content, Footer, Header, Page } from '@/feature/compos/layout';
import { List, type ListColumn } from '@/feature/compos/list';
import { useApi } from '@/hooks/useApi';
import { useList } from '@/hooks/useList';
import { useState } from 'react';

import { DownloadIcon, PlusIcon } from '@/icons';
import { SRC } from '@/lib/image';
import { formatDate } from '@fullcalendar/core/index.js';
import { Link, useNavigate } from 'react-router';
export function SitesList() {
    const navigator = useNavigate();
    const { api } = useApi();
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const handleToggle = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };
    const { Result, Delete } = useList<SiteType>('site');
    const SwitchSiteStatus = (data: { id: number; status: number }) => {
        if (data.id === 0) {
            return;
        }
        api.Post('updater', {
            id: data.id,
            target: 'site',
            dtype: 'status',
            value: data.status,
        });
    };
    const siteColumns: ListColumn<SiteType>[] = [
        {
            key: 'image',
            label: 'Image',
            sortable: false,
            render: (item?: SiteType) => <img src={SRC(item?.image || '')} alt={item?.name || ''} className="w-12 h-12 rounded" />,
        },
        {
            key: 'name',
            label: 'Name',
            sortable: false,
        },
        { key: 'domain', label: 'Domain', sortable: false },
        {
            key: 'status',
            label: 'Status',
            sortable: false,
            render: (item?: SiteType) => (
                <Switch
                    onChange={(checked) => {
                        SwitchSiteStatus({
                            id: item?.id || 0,
                            status: checked ? 0 : 1,
                        });
                    }}
                    label={item?.status === 0 ? 'Active' : 'Inactive'}
                    defaultChecked={item?.status === 0}
                    disabled={item?.status === 1}
                />
            ),
        },
        { key: 'stype', label: 'Type', sortable: false },

        { key: 'uts', label: 'Update Date', sortable: false, render: (item?: SiteType) => formatDate(item?.uts || 0) },
        { key: 'cts', label: 'Date', sortable: false, render: (item?: SiteType) => formatDate(item?.cts || 0) },

        {
            key: 'action',
            label: 'Action',
            sortable: false,
            render: (item?: SiteType) => (
                <div className="flex items-center gap-1">
                    <Link to={`/sites/edit/${item?.id}`}>Edit</Link>
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
        <Page title="Site List" showBackgroud={true}>
            <Header title="Site" desc="Track your store's progress to boost your sales.">
                <Button endIcon={<DownloadIcon className="w-5 h-5" />} variant="outline">
                    Export
                </Button>

                <Button startIcon={<PlusIcon className="w-5 h-5" fill="white" />} variant="primary" onClick={() => navigator('/sites/create')}>
                    Add Product
                </Button>
            </Header>
            <Content>
                <List<SiteType> fields={siteColumns} items={Result?.list || []} expandedRow={expandedRow}>
                    {(item) => (
                        <div className="flex items-center gap-2 justify-end w-full">
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${item?.domain}`} target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>
                            <a href={`https://twitter.com/intent/tweet?url=${item?.domain}&text=This%20is%20awesome`} target="_blank" rel="noopener noreferrer">
                                Twitter
                            </a>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${item?.domain}}`} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                            <a href={`https://line.me/R/msg/text/?${item?.domain}`} target="_blank" rel="noopener noreferrer">
                                Line
                            </a>
                            <a href={`https://api.whatsapp.com/send?text=${item?.domain}`} target="_blank" rel="noopener noreferrer">
                                WhatsApp
                            </a>
                        </div>
                    )}
                </List>
            </Content>
            <Footer>
                <></>
                {/* <Pagination currentPage={result?.page} pageSize={result?.size} totalCount={result?.total} onPageChange={setPage} /> */}
            </Footer>
        </Page>
    );
}
