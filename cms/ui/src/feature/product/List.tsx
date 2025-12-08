import { Select } from '@/components/composed';
import { Button, Image, SearchInput } from '@/components/elements';
import { Action, ActionBatch, ActionLeft, ActionRight, Content, Footer, Page } from '@/feature/compos/layout';
import { List, Pagination, type ListColumn } from '@/feature/compos/list';
import { PlusIcon } from '@/icons';
import { SRC } from '@/lib/image';
import { formatDate } from '@fullcalendar/core/index.js';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { StatusLabel } from './compos';
import { useProductList } from './hooks';
export default function Products() {
    const navigator = useNavigate();
    const [search, setSearch] = useState('');
    const { result, Delete, setParamFilter, setPage, sites, BatchBindSite } = useProductList();
    const [isBatchMode, setIsBatchMode] = useState<boolean>(false);
    const [checkedItems, setCheckedItems] = useState<number[]>([]); // Add this line
    const [sid, setSid] = useState<number>(0);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setParamFilter([{ field: 'name', operator: 'like', value: search }]);
        }
    };

    const sitesMap = useMemo(() => {
        const mp = new Map<number, string>();
        sites.forEach((site) => {
            mp.set(Number(site?.value || 0), site?.label || '-');
        });
        return mp;
    }, [sites]);

    const productColumns: ListColumn<ProductItemType>[] = [
        {
            key: 'name',
            label: 'Product',
            sortable: true,
            render: (item) => (
                <div className="flex items-center gap-3">
                    <Link to={`/products/${item?.handle}`}>
                        <Image src={SRC(item?.main_image || '')} className="h-10 w-10 rounded-md object-cover shrink-0" />
                    </Link>

                    <div className="flex flex-1 items-center line-clamp-2">{item?.name || '-'}</div>
                </div>
            ),
        },
        { key: 'domain', label: 'Domain', sortable: false, render: (item) => sitesMap.get(item?.sid || 0) || '-' },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'brand', label: 'Brand', sortable: true },
        {
            key: 'price',
            label: 'Price',
            sortable: true,
        },
        { key: 'status', label: 'Status', sortable: false, render: (item?: ProductItemType) => <StatusLabel status={item?.status || 0} /> },
        { key: 'cts', label: 'Date', sortable: false, render: (item?: ProductItemType) => formatDate(item?.cts || 0) },
        {
            key: 'action',
            label: 'Action',
            sortable: false,
            render: (item?: ProductItemType) => (
                <div className="flex items-center gap-1">
                    <Link to={`/products/edit/${item?.id}`}>Edit</Link>
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
        <Page title="Product List" showBackgroud={true}>
            <ActionBatch isBatchMode={isBatchMode}>
                <Action>
                    <ActionLeft className="">
                        <SearchInput value={search} onKeyDown={handleKeyDown} onChange={(e) => setSearch(e.target.value)} />
                        <Select onChange={(value) => setParamFilter([{ field: 'sid', operator: 'eq', value }])} options={sites} placeholder="Select site" />
                    </ActionLeft>
                    <ActionRight>
                        <Button variant="outline" onClick={() => setIsBatchMode(true)}>
                            Batch
                        </Button>
                        <Button startIcon={<PlusIcon className="w-5 h-5" fill="white" />} variant="primary" onClick={() => navigator('/products/create')}>
                            Add Product
                        </Button>
                    </ActionRight>
                </Action>
                <Action>
                    <ActionLeft />
                    <ActionRight>
                        <Button
                            variant="outline"
                            onClick={() => {
                                BatchBindSite(checkedItems, sid);
                                setIsBatchMode(false);
                            }}
                        >
                            Add to Site
                        </Button>
                        <Select
                            onChange={(value) => {
                                setSid(Number(value));
                            }}
                            options={sites}
                            placeholder="Select site"
                        />

                        <Button variant="outline" onClick={() => setIsBatchMode(false)}>
                            Cancel
                        </Button>
                    </ActionRight>
                </Action>
            </ActionBatch>
            <Content>
                <List<ProductItemType> fields={productColumns} items={result?.list || []} onSelect={setCheckedItems} />
            </Content>
            <Footer>
                <Pagination currentPage={result?.page} pageSize={result?.size} totalCount={result?.total} onPageChange={setPage} />
            </Footer>
        </Page>
    );
}
