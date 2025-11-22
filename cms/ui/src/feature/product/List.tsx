import SearchInput from '@/components/elements/SearchInput';
import Button from '@/components/ui/button/Button';
import { Action, Content, FooterPage, Header, Page } from '@/feature/common/layout';
import { DownloadIcon, FilterIcon, PlusIcon } from '@/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { List } from './comps';
import { useProductList } from './hooks';

export default function Products() {
    const navigator = useNavigate();
    const [search, setSearch] = useState('');
    const { result, setResult, setParamFilter, setPage, fetchList } = useProductList();
    useEffect(() => {
        fetchList();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setParamFilter([{ field: 'name', operator: 'like', value: search }]);
        }
    };
    const handleDelete = (id: number) => {
        setResult((prev) => ({
            ...prev,
            list: prev.list.filter((item) => item.id !== id),
        }));
    };

    return (
        <Page title="Product List" showBackgroud={true}>
            <Header title="Products" desc="Track your store's progress to boost your sales.">
                <Button endIcon={<DownloadIcon className="w-5 h-5" />} variant="outline">
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
                <List items={[...(result?.list || [])]} onDelete={(id) => handleDelete(id)} />
            </Content>
            <FooterPage currentPage={result?.page} pageSize={result?.size} totalCount={result?.total} onPageChange={setPage} />
        </Page>
    );
}
