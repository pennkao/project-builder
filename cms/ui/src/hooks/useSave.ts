import { Confirm } from '@/components/composed';
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';

interface UseSaveOptions<T> {
    id: number;
    target: string;
    defaultData: T;

    validate?: (data: T) => Promise<string | null> | string | null;
    beforeSave?: (data: T) => T;
    onLoaded?: (data: any) => T;
}
export interface BaseEntity {
    id?: number;
}

const message = async (message: string) => {
    const confirm = await Confirm('Error', message, { confirmText: 'Confirm', cancelText: 'Cancel', danger: true });
    if (!confirm) return false;
    return true;
};
export function useSave<T extends BaseEntity>({ id, target, defaultData, validate, beforeSave, onLoaded }: UseSaveOptions<T>) {
    const { api } = useApi();
    const [data, setData] = useState<T>(defaultData);

    useEffect(() => {
        if (!id || id <= 0) {
            setData(defaultData);
            return;
        }

        api.doGet(id, target).callback((res) => {
            if (!res) return;

            let entity = res;

            setData(onLoaded ? onLoaded(entity) : entity);
        });
    }, [id, target]);

    const Save = async (callback: () => void) => {
        if (validate) {
            const err = await validate(data);
            if (err) {
                await message(err);
                return false;
            }
        }

        let payload = beforeSave ? beforeSave({ ...data }) : { ...data };

        const confirm = await message('Are you sure you want to save?');
        if (!confirm) return false;

        api.Post(`add-${target}`, payload).callback((ok) => {
            if (ok) callback();
        });
    };

    const Update = async (callback: () => void) => {
        if (!id || id <= 0) return false;

        const confirm = await message('Are you sure you want to update?');
        if (!confirm) return false;

        api.Post(`update-${target}`, data).callback((ok) => {
            if (ok) callback();
        });
    };

    const UpdateOrSave = async (callback: () => void) => {
        if (id && id > 0) {
            await Update(callback);
        } else {
            await Save(callback);
        }
    };

    return { data, setData, UpdateOrSave };
}
