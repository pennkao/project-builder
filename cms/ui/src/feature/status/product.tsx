export const formatProductStatus = (status: number) => {
    if (status === 0) {
        return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-green-100 text-green-700`}>Active</span>;
    }
    if (status === 1) {
        return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-red-100 text-red-700`}>Inactive</span>;
    }
};
