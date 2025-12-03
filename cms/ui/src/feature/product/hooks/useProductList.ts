import { Confirm } from '@/components/composed';
import { defaultPageDataList, defaultQueryParams } from '@/defaults';
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';
import { normalizeProduct } from '../utils/format';

const message = async (message: string) => {
    const confirm = await Confirm('Error', message, { confirmText: 'Confirm', cancelText: 'Cancel', danger: true });
    if (!confirm) return false;
    return true;
};

export const useProductList = () => {
    const { api } = useApi();

    const [page, setPage] = useState(1); // eslint-disable-next-line
    const [listQueryParams, setlistQueryParams] = useState<ListQueryParamsType>({ ...defaultQueryParams, target: 'products' });
    const [result, setResult] = useState<PageListDataType<ProductItemType>>(defaultPageDataList);

    const fetchList = async () => {
        api.query({ page: page, size: 10 })
            .doList('products', listQueryParams)
            .callback((data) => {
                if (data) {
                    const list = (data.list as ProductItemType[]).map((item) => normalizeProduct(item));
                    setResult({ ...data, list: list });
                }
            });
    };

    useEffect(() => {
        fetchList();
    }, [page, listQueryParams]);

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
        api.doDelete(id, 'product', (ret) => {
            if (!ret) return;
            setResult((prev) => ({
                ...prev,
                list: prev.list.filter((item) => item.id !== id),
            }));
        });
    };
    return { result, Delete, setParamFilter, setParamSort, setPage };
};
