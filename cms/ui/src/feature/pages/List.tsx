import { Button, Switch } from '@/components/elements';
import { Action, ActionLeft, ActionRight, Content, Footer, Page } from '@/feature/compos/layout';
import { List, type ListColumn } from '@/feature/compos/list';
import { useApi } from '@/hooks/useApi';
import { useList } from '@/hooks/useList';

import { DownloadIcon, PlusIcon } from '@/icons';
import { SRC } from '@/lib/image';
import { formatDate } from '@fullcalendar/core/index.js';
import { Link, useNavigate } from 'react-router';
export function PageList() {
    const navigator = useNavigate();
    const { api } = useApi();

    const { Result, Delete } = useList<PageType>('page');
    const SwitchSiteStatus = (data: { id: number; field: 'status' | 'visibility'; status: number }) => {
        if (data.id === 0) {
            return;
        }
        api.Post('updater', {
            id: data.id,
            target: 'page',
            dtype: data.field,
            value: data.status,
        });
    };
    const pageColumns: ListColumn<PageType>[] = [
        {
            key: 'image',
            label: 'Image',
            sortable: false,
            render: (item?: PageType) => <img src={SRC(item?.image || '')} alt={item?.title || ''} className="w-12 h-12 rounded" />,
        },
        {
            key: 'title',
            label: 'Title',
            sortable: false,
        },
        { key: 'stype', label: 'Type', sortable: false },
        {
            key: 'status',
            label: 'Status',
            sortable: false,
            render: (item?: PageType) => (
                <Switch
                    onChange={(checked) => {
                        SwitchSiteStatus({
                            id: item?.id || 0,
                            status: checked ? 0 : 1,
                            field: 'status',
                        });
                    }}
                    label={item?.status === 0 ? 'Active' : 'Inactive'}
                    defaultChecked={item?.status === 0}
                />
            ),
        },
        {
            key: 'visibility',
            label: 'Visibility',
            sortable: false,
            render: (item?: PageType) => (
                <Switch
                    onChange={(checked) => {
                        SwitchSiteStatus({
                            id: item?.id || 0,
                            status: checked ? 0 : 1,
                            field: 'visibility',
                        });
                    }}
                    label={item?.visibility === 0 ? 'Visible' : 'Hidden'}
                    defaultChecked={item?.visibility === 0}
                />
            ),
        },
        { key: 'cts', label: 'Date', sortable: false, render: (item?: PageType) => formatDate(item?.cts || 0) },
        {
            key: 'action',
            label: 'Action',
            sortable: false,
            render: (item?: PageType) => (
                <div className="flex items-center gap-1">
                    <Link to={`/pages/edit/${item?.id}`}>Edit</Link>
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
        <Page title="Page List" showBackgroud={true}>
            <Action>
                <ActionLeft></ActionLeft>
                <ActionRight>
                    <Button endIcon={<DownloadIcon className="w-5 h-5" />} variant="outline">
                        Export
                    </Button>

                    <Button startIcon={<PlusIcon className="w-5 h-5" fill="white" />} variant="primary" onClick={() => navigator('/pages/create')}>
                        Add Page
                    </Button>
                </ActionRight>
            </Action>

            <Content>
                <List<PageType> fields={pageColumns} items={Result?.list || []} />
            </Content>
            <Footer>
                <></>
                {/* <Pagination currentPage={result?.page} pageSize={result?.size} totalCount={result?.total} onPageChange={setPage} /> */}
            </Footer>
        </Page>
    );
}
