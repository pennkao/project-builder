import { useApi } from '@/hooks/useApi';
import { isValidUrl } from '@/utils/tools';
export const useImages = (callback: () => void) => {
    const { api } = useApi();

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
            callback();
        });
    };
    return { handleSubmit };
};
