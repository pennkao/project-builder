import ComponentCard from '@/components/common/ComponentCard';
const Loading = ({ title }: { title: string }) => {
    return (
        <ComponentCard title={title}>
            <div className="h-full w-full flex items-center justify-center p-4">
                <div className="w-8 h-8 border-4 border-blue-500/40 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </ComponentCard>
    );
};

export default Loading;
