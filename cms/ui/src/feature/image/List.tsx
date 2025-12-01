import { Popover } from '@/components/composed';
import { Button } from '@/components/elements';
import TextArea from '@/components/elements/TextArea';
import { Content, FooterPage, Header, Page } from '@/feature/common/layout';

import { MainIcon, PlusIcon } from '@/icons';
import { isrc } from '@/lib/image';
import { useState } from 'react';
import { useImages } from './hooks/useImages';

export default function List() {
    const { data, setPage, handleSubmit } = useImages();
    const [images, setImages] = useState('');
    const [toClose, setToClose] = useState<number | null>(null);

    const doSubmit = (images: string) => {
        setToClose((prev) => (prev === null ? 0 : prev + 1));
        handleSubmit(images);
    };

    const className = 'border border-gray-200 rounded-xl dark:border-gray-800 w-30 h-30';
    return (
        <>
            <Page title="Images" showBackgroud={true}>
                <Header title="Images" desc="Track your store's progress to boost your sales.">
                    <Popover
                        toClose={toClose}
                        button={
                            <Button variant="primary" startIcon={<PlusIcon className="w-5 h-5" fill="white" />}>
                                Add Image
                            </Button>
                        }
                    >
                        <div className="flex flex-col justify-start flex-wrap gap-6 sm:gap-1 md:gap-5 xl:gap-2.5 w-[450px]">
                            <TextArea placeholder="Images" rows={4} value={images} onChange={(value) => setImages(value)} />
                            <Button variant="primary" onClick={() => doSubmit(images)} startIcon={<MainIcon className="w-5 h-5" fill="white" />}>
                                Save
                            </Button>
                        </div>
                    </Popover>
                </Header>
                <Content className="flex flex-row justify-start sm:px-2 px-9">
                    <div className="flex flex-row justify-start flex-wrap gap-6 sm:gap-1 md:gap-5 xl:gap-2.5 ">
                        {data?.list?.length === 0 && <div className="text-center">No images found</div>}
                        {data?.list?.map((item, index) => (
                            <div key={index}>
                                <div className={`relative border border-red-500 ${className}`}>
                                    <span className="text-xs text-gray-500 absolute top-1 left-1">
                                        {item.width_px}x{item?.height_px || ''}
                                    </span>
                                    <span className="text-xs text-gray-500 absolute top-0 right-0">✅</span>
                                    <img src={isrc(item.url)} alt={item.alt_text} className={className} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Content>
                <FooterPage currentPage={data?.page} pageSize={data?.size} totalCount={data?.total} onPageChange={setPage} />
            </Page>
        </>
    );
}
