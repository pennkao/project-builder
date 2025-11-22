import { defaultPageDataList, defaultQueryParams } from '@/defaults';
import { usePost } from '@/hooks/usePost';
import { useEffect, useState } from 'react';
import { Confirm } from '@/components/Confirm';

const message = async (message: string) => {
    const confirm = await Confirm('Error', message, { confirmText: 'Confirm', cancelText: 'Cancel', danger: true });
    if (!confirm) return false;
    return true;
};

export const useProductList = () => {
    const [page, setPage] = useState(1); // eslint-disable-next-line
    const [listQueryParams, setlistQueryParams] = useState<ListQueryParamsType>({ ...defaultQueryParams, target: 'products' });
    const [result, setResult] = useState<PageListDataType<ProductItemType>>(defaultPageDataList);

    const { doPost } = usePost<PageListDataType<ProductItemType>>('list');
    const { doPost: doPostDelete, Params } = usePost('delete');

    const fetchList = async () => {
        doPost({
            params: listQueryParams,
            querys: { page: page, size: 10 },
            callback: (data) => {
                if (data) setResult(data);
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
    const Delete = async (id: number) => {
        const confirm = await message('Are you sure you want to delete this product?');
        if (!confirm) return false;
        doPostDelete(
            Params({ params: { id: id, target: 'product' } }, () => {
                setResult((prev) => ({
                    ...prev,
                    list: prev.list.filter((item) => item.id !== id),
                }));
            })
        );
    };
    return { result, Delete, setParamFilter, setParamSort, setPage };
};
