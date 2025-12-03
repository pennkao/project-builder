import { Confirm } from '@/components/composed';
import { defaultPageDataList } from '@/defaults';
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';

const message = async (message: string) => {
    const confirm = await Confirm('Error', message, { confirmText: 'Confirm', cancelText: 'Cancel', danger: true });
    if (!confirm) return false;
    return true;
};

export const useSite = () => {
    const [result, setResult] = useState<PageListDataType<SiteType>>(defaultPageDataList);
    const { api } = useApi();

    const fetchList = async () => {
        api.query({ page: 1, size: 1000 })
            .doList<PageListDataType<SiteType>>('sites')
            .callback((data) => {
                if (data) setResult(data);
            });
    };

    useEffect(() => {
        fetchList();
    }, []);

    const Delete = async (id: number) => {
        const confirm = await message('Are you sure you want to delete this product?');
        if (!confirm) return false;
        api.doDelete(id, 'site', (ok) => {
            if (!ok) return;
            setResult((prev) => ({
                ...prev,
                list: prev.list.filter((item) => item.id !== id),
            }));
        });
    };
    return { result, Delete };
};
