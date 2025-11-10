import Page from '@/components/page/Page';
import ProductDescription from '@/feature/product/ProductDescription';
import ProductMain from '@/feature/product/ProductMain';
import UploadImage from '@/feature/product/UploadImae';
import CheckboxComponents from '../../components/form/form-elements/CheckboxComponents';
import FileInputExample from '../../components/form/form-elements/FileInputExample';
import InputGroup from '../../components/form/form-elements/InputGroup';
import RadioButtons from '../../components/form/form-elements/RadioButtons';
import ToggleSwitch from '../../components/form/form-elements/ToggleSwitch';
export default function AddProduct() {
    return (
        <Page pageTitle="Add Product" showBackgroud={false}>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <ProductMain />
                    {/* <SelectInputs /> */}
                   

                    {/* <InputStates /> */}
                </div>
                <div className="space-y-6">
                    <UploadImage />
                    <InputGroup />
                    <FileInputExample />
                    <CheckboxComponents />
                    <RadioButtons />
                    <ToggleSwitch />
                    <ProductDescription />
                </div>
            </div>
        </Page>
    );
}
