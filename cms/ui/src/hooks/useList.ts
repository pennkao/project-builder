import { Confirm } from '@/components/composed';
import { defaultPageDataList, defaultQueryParams } from '@/defaults';
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';

const message = async (message: string) => {
    const confirm = await Confirm('Error', message, { confirmText: 'Confirm', cancelText: 'Cancel', danger: true });
    if (!confirm) return false;
    return true;
};
export const useList = <T extends { id: number }>(target: string, normalize?: (item: any) => T) => {
    const { api } = useApi();

    const [page, setPage] = useState(1);
    const [result, setResult] = useState(defaultPageDataList as PageListDataType<T>);
    const [query, setQuery] = useState<ListQueryParamsType>({ ...defaultQueryParams, target });
    const [refresh, setRefresh] = useState(0);

    const Update = async (id: number, field: string, value: number | string) => {
        api.doUpdate(id, target, field, value).callback((ok) => {
            if (!ok) return;
        });
    };
    const fetch = async () => {
        api.query({ page, size: 10 })
            .doList(target, query)
            .callback((data) => {
                if (!data) return;
                const list = normalize ? data.list.map(normalize) : data.list;
                setResult({ ...data, list });
            });
    };

    const setFilter = (items: FilterItemType[]) => {
        items = items.filter((item) => item.value !== '');
        setQuery((prev) => ({
            ...prev,
            filter: items,
        }));
    };

    const setSort = (items: SortItemType[]) => {
        setQuery((prev) => ({ ...prev, sort: items }));
    };

    const Delete = async (id: number) => {
        const confirm = await message('Are you sure you want to delete this product?');
        if (!confirm) return false;
        api.doDelete(id, target).callback((ok) => {
            if (!ok) return;
            setResult((prev) => ({
                ...prev,
                list: prev.list.filter((item) => item.id !== id),
            }));
        });
    };
    const doRefresh = () => setRefresh((v) => v + 1);
    useEffect(() => {
        fetch();
    }, [page, query, refresh]);

    return {
        page,
        setPage,
        result,
        setFilter,
        Delete,
        setSort,
        doRefresh,
        Update,
    };
};
