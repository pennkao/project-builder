import { Button, Input, Label, Select, TextArea } from '@/components/elements';
import RichTextEditor from '@/components/RichTextEditor';
import ImageSelector from '@/feature/common/ImageSelector';
import { Card, Col, Content, Footer, Page } from '@/feature/compos/layout';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { config } from '@/config/config';
import { decontent, encontent } from '@/lib/content';
import { SRC } from '@/lib/image';
import { genHandle } from '@/utils';
import { useSave } from './hooks/useSave';
export default function Add() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const sid = Number.parseInt(id || '0');
    // 注释掉的确认删除对话框代码
    const { data, setData, UpdateOrSave } = useSave(sid, 'page'); // 注释掉的批量操作相关钩子
    const [isOpen, setIsOpen] = useState(false);
    const options = [
        { value: '2', label: 'unlisted' },
        { value: '1', label: 'private' },
        { value: '0', label: 'public' },
    ];
    const handleSelect = (url: string) => {
        setData({ ...data, image: url });
        setIsOpen(false);
    };
    useEffect(() => {
        if (data.title) {
            setData({ ...data, handle: genHandle(data.title, 0) });
        }
    }, [data.title]);
    return (
        <Page title="Add Site" showBackgroud={false}>
            <Content className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Col>
                    <Card title="Site Info">
                        <div className="flex flex-row gap-1">
                            <div className="w-full">
                                <Label htmlFor="inputTwo">Title</Label>
                                <Input type="text" placeholder="Title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                            </div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <div className="w-full">
                                <Label htmlFor="inputTwo">Handle</Label>
                                <Input type="text" placeholder="Handle" disabled={sid > 0} value={data.handle} onChange={(e) => setData({ ...data, handle: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="input">Subtitle</Label>
                            <Input type="text" placeholder="Subtitle" value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} />
                        </div>
                        <div className="flex flex-row gap-1">
                            <div className="w-1/2">
                                <Label htmlFor="inputTwo">Type</Label>
                                <Input type="text" placeholder="Type" value={data.stype} onChange={(e) => setData({ ...data, stype: e.target.value })} />
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="inputTwo">Visibility</Label>
                                <Select options={options} defaultValue={String(data.visibility)} onChange={(value) => setData({ ...data, visibility: Number(value) })} />
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <div className="w-1/2">
                                <img src={SRC(data.image)} alt={data.title} className="w-12 h-12 object-cover" />
                            </div>
                            <div className="w-1/2">
                                <Button variant="primary" onClick={() => setIsOpen(true)}>
                                    Select Image
                                </Button>
                            </div>
                        </div>
                        <TextArea placeholder="Description" className="w-full px-4 py-2.5" value={data.description} onChange={(value) => setData({ ...data, description: value })} rows={5} />
                    </Card>
                </Col>
                <Col>
                    <Card title="Config Schema">
                        <RichTextEditor
                            url={config.API_URL + 'file/upload'}
                            onChange={(value) => {
                                setData({ ...data, content: encontent(value) });
                            }}
                            initData={decontent(data.content)}
                        />
                    </Card>
                </Col>
            </Content>

            <Footer className="flex justify-end gap-2 ">
                <Button
                    variant="outline"
                    onClick={() => {
                        navigate('/pages');
                    }}
                >
                    Draft
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        UpdateOrSave(() => {
                            navigate('/pages');
                        });
                    }}
                >
                    Save & Create
                </Button>
            </Footer>
            <ImageSelector
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSelect={(url) => {
                    handleSelect(url);
                }}
            />
        </Page>
    );
}
