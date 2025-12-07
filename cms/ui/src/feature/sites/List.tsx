import { Button } from '@/components/elements';
import { Content, Footer, Header, Page } from '@/feature/compos/layout';
import { List, type ListColumn } from '@/feature/compos/list';
import { useList } from '@/hooks/useList';
import { DownloadIcon, PlusIcon } from '@/icons';
import { formatDate } from '@fullcalendar/core/index.js';
import { Link, useNavigate } from 'react-router';
export function SitesList() {
    const navigator = useNavigate();
    // const { result, Delete } = useSite();
    const { result, setFilter, setPage,Delete} = useList<SiteType>('site');

    const siteColumns: ListColumn<SiteType>[] = [
        {
            key: 'id',
            label: 'Id',
            sortable: false,
        },
        {
            key: 'name',
            label: 'Name',
            sortable: false,
        },
        { key: 'domain', label: 'Domain', sortable: false },
        { key: 'stype', label: 'Type', sortable: false },

        { key: 'uts', label: 'Update Date', sortable: false, render: (item?: SiteType) => formatDate(item?.uts || 0) },
        { key: 'cts', label: 'Date', sortable: false, render: (item?: SiteType) => formatDate(item?.cts || 0) },

        {
            key: 'action',
            label: 'Action',
            sortable: false,
            render: (item?: SiteType) => (
                <div className="flex items-center gap-1">
                    <Link to={`/edit-site/${item?.id}`}>Edit</Link>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => {
                            // Delete(item?.id || 0); // TODO: delete product
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

                <Button startIcon={<PlusIcon className="w-5 h-5" fill="white" />} variant="primary" onClick={() => navigator('/add-site')}>
                    Add Product
                </Button>
            </Header>
            {/* <Action>
                <SearchInput value={search} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} />
                <Button startIcon={<FilterIcon className="w-5 h-5" />} className="h-11" variant="outline">
                    Filter
                </Button>
            </Action> */}
            <Content>
                <List<SiteType> fields={siteColumns} items={result?.list || []} />
            </Content>
            <Footer>
                <></>
                {/* <Pagination currentPage={result?.page} pageSize={result?.size} totalCount={result?.total} onPageChange={setPage} /> */}
            </Footer>
        </Page>
    );
}
