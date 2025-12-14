import { defaultPageDataList } from '@/defaults';
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';

export const useImages = () => {
    const { api } = useApi();

    const [data, setData] = useState<PageListDataType<ImageType>>({ ...defaultPageDataList, size: 100 });
    const [page, setPage] = useState(1);
    useEffect(() => {
        doLoadIamges();
    }, [page]);

    const doLoadIamges = () => {
        api.query({ page: page, size: 100 })
            .doList('images')
            .callback((data) => {
                if (!data) return;
                setData(data);
            });
    };
    const addImages = (images: string[], callback: () => void) => {
        api.Post('add-images', { images: images }).callback((ok) => {
            if (!ok) callback();
        });
    };
    return { data, setData, page, setPage, doLoadIamges, addImages };
};
