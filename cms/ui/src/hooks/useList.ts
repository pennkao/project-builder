import { Confirm } from '@/components/composed';
import { defaultPageDataList, defaultQueryParams } from '@/defaults';
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';

const message = async (message: string) => {
    const confirm = await Confirm('Error', message, { confirmText: 'Confirm', cancelText: 'Cancel', danger: true });
    if (!confirm) return false;
    return true;
};

export const useListWitePage = <T extends { id: number }>(target: string, size?: number) => {
    return useList<T>(target, undefined, size || 100);
};

export const useList = <T extends { id: number }>(target: string, normalize?: (item: any) => T, size?: number) => {
    const { api } = useApi();
    const [PageLimit, SetPageLimit] = useState({ page: 1, size: size || 10 });
    const [Result, SetResult] = useState(defaultPageDataList as PageListDataType<T>);
    const [Query, SetQuery] = useState<ListQueryParamsType>({ ...defaultQueryParams, target });
    const [Refresh, SetRefresh] = useState(0);
    const [Ids, SetIds] = useState<number[]>([]);

    const Update = async (id: number, field: string, value: number | string) => {
        api.doUpdate(id, target, field, value).callback((ok) => {
            if (!ok) return;
        });
    };
    const fetch = async () => {
        api.query({ page: PageLimit.page, size: PageLimit.size })
            .doList(target, Query)
            .callback((data) => {
                if (!data) return;
                const list = normalize ? data.list.map(normalize) : data.list;
                SetResult({ ...data, list });
            });
    };

    const SetFilter = (items: FilterItemType[]) => {
        items = items.filter((item) => item.value !== '');
        SetQuery((prev) => ({
            ...prev,
            filter: items,
        }));
    };

    const SetSort = (items: SortItemType[]) => {
        SetQuery((prev) => ({ ...prev, sort: items }));
    };

    const Delete = async (id?: number) => {
        const del_ids = id && id > 0 ? [id] : Ids.filter((id) => id > 0);
        if (!del_ids.length) return;
        const confirm = await message('Are you sure you want to delete this product?');
        if (!confirm) return false;
        api.doDelete(del_ids, target).callback((ok) => {
            if (!ok) return;
            // setResult((prev) => ({
            //     ...prev,
            //     list: prev.list.filter((item) => !del_ids.includes(item.id)),
            // }));
            DoRefresh();
            SetIds([]);
        });
    };
    const DoRefresh = () => SetRefresh((v) => v + 1);
    useEffect(() => {
        fetch();
    }, [PageLimit, Query, Refresh]);

    const SetPage = (page: number) => SetPageLimit((prev) => ({ ...prev, page }));
    const SetSize = (size: number) => SetPageLimit((prev) => ({ ...prev, size }));

    return {
        SetPage,
        SetSize,
        Result,
        // SetQuery,
        Refresh,
        SetFilter,
        DoRefresh,
        Delete,
        SetSort,
        Update,
        SetIds,
    };
};
