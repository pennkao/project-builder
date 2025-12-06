import { Confirm } from '@/components/composed';
import { useApi } from '@/hooks/useApi';
import { fnv1a32 } from '@/utils';
import { useEffect, useState } from 'react';

const message = async (message: string) => {
    const confirm = await Confirm('Error', message, { confirmText: 'Confirm', cancelText: 'Cancel', danger: true });
    if (!confirm) return false;
    return true;
};

export const useSave = (id: number) => {
    const { api } = useApi();
    const [data, setData] = useState<SiteType>({ id: 0, name: '', domain: '', stype: '', site: {}, config: {} });

    useEffect(() => {
        if (id <= 0) {
            setData({ id: 0, name: '', domain: '', stype: '', site: {}, config: {} });
            return;
        }
        api.doGet(id, 'site').callback((site) => {
            if (site) {
                if (typeof site.site == 'string') {
                    site.site = JSON.parse(site.site);
                }
                if (typeof site.config == 'string') {
                    site.config = JSON.parse(site.config);
                }
                setData(site);
            }
        });
    }, []);

    const Save = async (callback: () => void) => {
        if (!data.domain || !data.name || !data.stype) {
            await message('Please fill in the required fields: domain, name, stype');
            return false;
        }
        data.id = fnv1a32(data.domain);
        const confirm = await message('Are you sure you want to save this site?');
        if (!confirm) return false;
        api.Post('add-site', data).callback((ok) => {
            if (ok) {
                callback();
            }
        });
    };

    const Update = async (id: number, callback: () => void) => {
        if (!id || id <= 0) return false;
        const confirm = await message('Are you sure you want to update this site?');
        if (!confirm) return false;
        api.Post('update-site', data).callback((ok) => {
            if (ok) {
                callback();
            }
        });
    };

    const UpdateOrSave = async (callback: () => void) => {
        if (id && id > 0) {
            await Update(id, callback);
        } else {
            await Save(callback);
        }
    };
    return { data, setData, UpdateOrSave };
};
