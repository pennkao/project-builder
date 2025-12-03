import { Button, Input, Label } from '@/components/elements';
import JsonEditor from '@/components/JsonEditor';
import { Card, Col, Content, Footer, Page } from '@/feature/common/layout';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSave } from './hooks/useSave';
export function Add() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const sid = Number.parseInt(id || '0');
    // 注释掉的确认删除对话框代码
    const { data, setData, UpdateOrSave } = useSave(sid); // 注释掉的批量操作相关钩子

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Page title="Add Site" showBackgroud={false}>
            <Content className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Col>
                    <Card title="Site Info">
                        <div className="flex flex-row gap-1">
                            <div className="w-1/2">
                                <Label htmlFor="inputTwo">Name</Label>
                                <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="input">Type</Label>
                                <Input type="text" id="input" placeholder="Type" value={data.stype} onChange={(e) => setData({ ...data, stype: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="input">Domain</Label>
                            <Input type="text" placeholder="domain" value={data.domain} onChange={(e) => setData({ ...data, domain: e.target.value })} />
                        </div>
                    </Card>
                    <Card title="Site">
                        <JsonEditor value={data.site} onChange={(site) => setData({ ...data, site })} />
                    </Card>
                </Col>
                <Col>
                    <Card title="Config Schema">
                        <JsonEditor value={data.config} onChange={(config) => setData({ ...data, config })} />
                    </Card>
                </Col>
            </Content>

            <Footer className="flex justify-end gap-2 ">
                <Button
                    variant="outline"
                    onClick={() => {
                        navigate('/sites');
                    }}
                >
                    Draft
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        UpdateOrSave(() => {
                            navigate('/sites');
                        });
                    }}
                >
                    Save & Create
                </Button>
            </Footer>
        </Page>
    );
}
