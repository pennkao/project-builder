import { Confirm } from '@/components/composed';
import { defaultPageDataList, defaultQueryParams } from '@/defaults';
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';

const message = async (message: string) => {
    const confirm = await Confirm('Error', message, { confirmText: 'Confirm', cancelText: 'Cancel', danger: true });
    if (!confirm) return false;
    return true;
};

export const useOrders = () => {
    const [page, setPage] = useState(1); // eslint-disable-next-line
    const { api } = useApi();
    const [listQueryParams, setlistQueryParams] = useState<ListQueryParamsType>({ ...defaultQueryParams, target: 'order-logs' });
    const [result, setResult] = useState<PageListDataType<OrderLogsType>>(defaultPageDataList);

    const setParamFilter = (items: FilterItemType[]) => {
        setlistQueryParams((prev) => ({
            ...prev,
            filter: items,
        }));
    };
    const setParamSort = (items: SortItemType[]) => {
        setlistQueryParams((prev) => ({ ...prev, sort: items }));
    };
    const Delete = async (id: number) => {
        const confirm = await message('Are you sure you want to delete this product?');
        if (!confirm) return false;
        api.doDelete(id, 'order-logs', (data) => {
            if (typeof data === 'object')
                setResult((prev) => ({
                    ...prev,
                    list: prev.list.filter((item) => item.id !== id),
                }));
        });
    };

    const fetchList = async () => {
        api.query({ page: page, size: 10 })
            .doList('order-logs', listQueryParams)
            .callback((data) => {
                if (typeof data === 'object') setResult(data);
            });
    };
    useEffect(() => {
        fetchList();
    }, [page, listQueryParams]);

    return { result, Delete, setParamFilter, setParamSort, setPage };
};
