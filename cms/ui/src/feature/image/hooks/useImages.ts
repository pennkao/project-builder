import { defaultPageDataList } from '@/defaults';
import { usePost } from '@/hooks/usePost';
import { isValidUrl } from '@/utils/tools';
import { useEffect, useState } from 'react';
export const useImages = () => {
    const [data, setData] = useState<PageListDataType<ImageType>>({ ...defaultPageDataList, size: 100 });
    const [page, setPage] = useState(1);
    const { doPost } = usePost<PageListDataType<ImageType>>('list');
    // doLoading({}, { page, size: 10 }, (res) => setResult(res));
    useEffect(() => {
        doLoadIamges();
    }, [page]);

    const { doPost: addImagesPost } = usePost<PageListDataType<ImageType>>('add-images');
    const doLoadIamges = () => {
        doPost({
            params: { target: 'images' },
            querys: { page: page, size: 100 },
            callback: (res) => {
                if (res) {
                    setData(res);
                }
            },
        });
    };
    const addImages = (images: string[], callback: () => void) => {
        addImagesPost({
            params: { images: images },
            callback: () => {
                callback();
            },
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
