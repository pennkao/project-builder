import { defaultPageDataList } from '@/defaults';
import { useApi } from '@/hooks/useApi';
import { isValidUrl } from '@/utils/tools';
import { useEffect, useState } from 'react';
export const useImages = () => {
    const { api } = useApi();
    const [data, setData] = useState<PageListDataType<ImageType>>({ ...defaultPageDataList, size: 100 });
    const [page, setPage] = useState(1);

    useEffect(() => {
        doLoadIamges();
    }, [page]);

    const doLoadIamges = () => {
        api.query({ page: page, size: 50 })
            .doList('images')
            .callback((images) => {
                if (images) {
                    setData(images);
                }
            });
    };
    const addImages = (images: string[], callback: () => void) => {
        api.Post('add-images', { images: images }).callback((ok) => {
            if (ok) callback();
        });
    };

    const handleSubmit = async (images: string) => {
        // alert(images);
        const imageArr = images
            .trim()
            .split('\n')
            .map((item) => item.trim())
            .filter((item) => isValidUrl(item));
        if (imageArr.length === 0) {
            return;
        }
        addImages(imageArr, () => {
            doLoadIamges();
        });
    };
    return { data, setPage, handleSubmit };
};
