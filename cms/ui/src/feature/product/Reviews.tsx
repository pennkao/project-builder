import Button from '@/components/ui/button/Button';
import { Action, Content, FooterPage, Header, Page } from '@/feature/common/layout';

const Reviews = () => {
    return (
        <Page title="Reviews" showBackgroud={true}>
            <Header title="Products" desc="Track your store's progress to boost your sales.">
                <Button variant="outline">Export</Button>
                <Button variant="primary">Add Product</Button>
            </Header>
            <Action>2</Action>
            <Content>
                <></>
            </Content>
            <FooterPage currentPage={1} totalCount={100} pageSize={10} onPageChange={() => {}} />
        </Page>
    );
};
export default Reviews;
