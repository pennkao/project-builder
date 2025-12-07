import PageBreadcrumb from '@/feature/compos/layout/compos/PageBreadCrumb';
import PageMeta from '@/feature/compos/layout/compos/PageMeta';
import LineChartOne from '../../components/charts/line/LineChartOne';
import ComponentCard from '../../components/common/ComponentCard';

export default function LineChart() {
    return (
        <>
            <PageMeta title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template" description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template" />
            <PageBreadcrumb pageTitle="Line Chart" />
            <div className="space-y-6">
                <ComponentCard title="Line Chart 1">
                    <LineChartOne />
                </ComponentCard>
            </div>
        </>
    );
}
