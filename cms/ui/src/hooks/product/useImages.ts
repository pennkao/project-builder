import { defaultPageDataList } from '@/defaults';
import { useEffect, useState } from 'react';
import { usePost } from '../usePost';

export const useImages = () => {
    const [data, setData] = useState<PageListDataType<ImageType>>({ ...defaultPageDataList,size:100});
    const [page, setPage] = useState(1);
    const { doPost } = usePost<PageListDataType<ImageType>>('list');
    // doLoading({}, { page, size: 10 }, (res) => setResult(res));
    useEffect(() => {
        doPost({
            params: { target: 'images' },
            querys: { page: page, size: 100 },
            callback: (res) => {
                setData(res);
            },
        });
    }, [page]);
    return { data, setData, page, setPage };
};
