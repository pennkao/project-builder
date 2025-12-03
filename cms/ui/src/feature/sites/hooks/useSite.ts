import { Confirm } from '@/components/composed';
import { defaultPageDataList } from '@/defaults';
import { usePost } from '@/hooks/usePost';
import { useEffect, useState } from 'react';

const message = async (message: string) => {
    const confirm = await Confirm('Error', message, { confirmText: 'Confirm', cancelText: 'Cancel', danger: true });
    if (!confirm) return false;
    return true;
};

export const useSite = () => {
    const [result, setResult] = useState<PageListDataType<SiteType>>(defaultPageDataList);

    const { doPost } = usePost<PageListDataType<SiteType>>('list');
    const { doPost: doPostDelete, Params } = usePost('delete');

    const fetchList = async () => {
        doPost({
            params: { target: 'sites' },
            querys: { page: 1, size: 1000 },
            callback: (data) => {
                if (data) {
                    setResult(data);
                }
            },
        });
    };

    useEffect(() => {
        fetchList();
    }, []);

    const Delete = async (id: number) => {
        const confirm = await message('Are you sure you want to delete this product?');
        if (!confirm) return false;
        doPostDelete(
            Params({ params: { id: id, target: 'site' } }, () => {
                console.log('delete success',id);
                setResult((prev) => ({
                    ...prev,
                    list: prev.list.filter((item) => item.id !== id),
                }));
            })
        );
    };
    return { result, Delete };
};
