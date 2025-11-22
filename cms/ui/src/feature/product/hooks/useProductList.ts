import { defaultPageDataList, defaultQueryParams } from '@/defaults';
import { usePost } from '@/hooks/usePost';
import { useEffect, useState } from 'react';

export const useProductList = () => {
    const [page, setPage] = useState(1); // eslint-disable-next-line
    const [listQueryParams, setlistQueryParams] = useState<ListQueryParamsType>({ ...defaultQueryParams, target: 'products' });
    const [result, setResult] = useState<PageListDataType<ProductItemType>>(defaultPageDataList);

    const { doPost } = usePost<PageListDataType<ProductItemType>>('list');

    const fetchList = async () => {
        doPost({
            params: listQueryParams,
            querys: { page: page, size: 10 },
            callback: (data) => {
                setResult(data);
            },
        });
    };
    // doLoading({}, { page, size: 10 }, (res) => setResult(res));
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
    return { result, setResult, setParamFilter, setParamSort, setPage, fetchList };
};
