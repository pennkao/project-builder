export const sortItems = <T>(items: T[], field: keyof T, status: 'asc' | 'desc') => {
    return [...items].sort((a, b) => {
        if (a[field] < b[field]) return status === 'asc' ? 1 : -1;
        if (a[field] > b[field]) return status === 'asc' ? -1 : 1;
        return 0;
    });
};
