import { useState } from 'react';

export const useMode = <T>() => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<T>({} as T);
    const doOpen = (data: T) => {
        setData(data);
        setIsOpen(true);
    };
    const doClose = () => {
        setData({} as T);
        setIsOpen(false);
    };
    return { isOpen, data, doOpen, doClose };
};
