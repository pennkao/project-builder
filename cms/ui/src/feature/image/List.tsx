import { ImageView, Popover } from '@/components/composed';
import { Button, Checkbox } from '@/components/elements';
import TextArea from '@/components/elements/TextArea';
import { Action, ActionLeft, ActionRight, Content, Footer, Page } from '@/feature/compos/layout';
import { Pagination } from '@/feature/compos/list';

import { useListWitePage } from '@/hooks/useList';
import { EyeIcon, MainIcon, PlusIcon } from '@/icons';
import { SRC } from '@/lib/image';
import { useState } from 'react';
import { useImages } from './hooks/useImages';

export default function List() {
    const { Result, SetPage, DoRefresh, Delete } = useListWitePage<ImageType>('image', 100);
    const { handleSubmit } = useImages(() => {
        DoRefresh();
    });

    const [ids, setIds] = useState<Record<number, boolean>>({});
    const [images, setImages] = useState('');
    const [toClose, setToClose] = useState<number | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const doSubmit = (images: string) => {
        setToClose((prev) => (prev === null ? 0 : prev + 1));
        handleSubmit(images);
    };

    const handleDelete = () => {
        const del_ids = Object.keys(ids)
            .filter((id) => ids[Number(id)] === true)
            .map((id) => Number(id));
        if (!del_ids.length) return;
        Delete(del_ids);
    };

    const className = 'border border-gray-200 rounded-xl dark:border-gray-800 w-30 h-30';
    return (
        <>
            <Page title="Images" showBackgroud={true}>
                <Action>
                    <ActionLeft></ActionLeft>
                    <ActionRight>
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
                        {JSON.stringify(ids)}
                        <Button
                            variant="outline"
                            onClick={() => {
                                handleDelete();
                            }}
                        >
                            Delete
                        </Button>
                    </ActionRight>
                </Action>
                <Content className="flex flex-row justify-start sm:px-2 px-9">
                    <div className="flex flex-row justify-start flex-wrap gap-6 sm:gap-1 md:gap-5 xl:gap-2 ">
                        {Result?.list?.length === 0 && <div className="text-center">No images found</div>}
                        {Result?.list?.map((item, index) => (
                            <div key={index}>
                                <div className={`relative border border-red-500 ${className}`}>
                                    <span className="text-xs text-black absolute top-1 left-1">
                                        {item.width_px}x{item?.height_px || ''}
                                    </span>
                                    <div className="text-xs text-black absolute bottom-1 left-1">
                                        <Checkbox
                                            checked={ids[item.id] == true}
                                            onChange={(ck) => {
                                                setIds({ ...ids, [item.id]: ck });
                                            }}
                                            className="text-xs text-gray-500 "
                                        />
                                    </div>

                                    <span className="text-xs text-gray-500 absolute top-1 right-1 cursor-pointer">
                                        <EyeIcon onClick={() => setPreview(item.url)} className="w-5 h-5" fill="white" />
                                    </span>
                                    <img src={SRC(item.url)} alt={item.alt_text} className={className} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <ImageView src={SRC(preview || '')} onClick={() => setPreview(null)} />
                </Content>
                <Footer>
                    <Pagination currentPage={Result?.page || 1} totalCount={Result?.total || 0} pageSize={Result?.size || 10} onPageChange={SetPage} />
                </Footer>
            </Page>
        </>
    );
}
