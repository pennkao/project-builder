import { Confirm } from '@/components/composed';
import { useBatchPost, usePost } from '@/hooks/usePost';
import { fnv1a32 } from '@/utils';
import { useEffect, useState } from 'react';

const message = async (message: string) => {
    const confirm = await Confirm('Error', message, { confirmText: 'Confirm', cancelText: 'Cancel', danger: true });
    if (!confirm) return false;
    return true;
};

export const useSave = (id: number) => {
    // const [Date, setDate] = useState<SiteType>();
    // const [initDate, setInitDate] = useState<SiteType>();
    const [data, setData] = useState<SiteType>({ id: 0, name: '', domain: '', stype: '', site: {}, config: {} });
    const { doPost } = usePost<SiteType>('list');
    const { doPost: fetchOne } = usePost<SiteType>('fetch');
    const { doPost: doPut } = useBatchPost();
    // const { doPost: doPostDelete, Params } = usePost('delete');

    const fetchList = async () => {
        doPost({
            params: { target: 'sites' },
            querys: { page: 1, size: 1000 },
            callback: (data) => {
                if (data) {
                    // setResult(data);
                }
            },
        });
    };

    useEffect(() => {
        if (id <= 0) {
            setData({ id: 0, name: '', domain: '', stype: '', site: {}, config: {} });
            return;
        }
        fetchOne({
            params: { id: id, target: 'site' },
            callback: (data) => {
                if (data) {
                    if (typeof data.site == 'string') {
                        data.site = JSON.parse(data.site);
                    }
                    if (typeof data.config == 'string') {
                        data.config = JSON.parse(data.config);
                    }
                    setData(data);
                }
            },
        });
    }, []);

    useEffect(() => {
        fetchList();
    }, []);

    const Save = async (callback: () => void) => {
        if (!data.domain || !data.name || !data.stype) {
            await message('Please fill in the required fields: domain, name, stype');
            return false;
        }
        data.id = fnv1a32(data.domain);
        const confirm = await message('Are you sure you want to save this site?');
        if (!confirm) return false;
        doPut(
            'add-site',
            {
                params: data,
            },
            callback
        );
    };

    const Update = async (id: number, callback: () => void) => {
        if (!id || id <= 0) return false;
        const confirm = await message('Are you sure you want to update this site?');
        if (!confirm) return false;
        doPut(
            'update-site',
            {
                params: data,
            },
            callback
        );
    };

    const UpdateOrSave = async (callback: () => void) => {
        console.log('id', id);
        if (id && id > 0) {
            console.log(2222222, id);

            await Update(id, callback);
        } else {
            await Save(callback);
        }
        callback();
    };
    return { data, setData, UpdateOrSave };
};
