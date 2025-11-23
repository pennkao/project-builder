import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/elements';
import Checkbox from '@/components/elements/Checkbox';
import { FieldSort } from '@/feature/common/list';
import { sortItems } from '@/utils/sort';
import { useMemo, useState } from 'react';

export interface ListColumn<T> {
    key: string | keyof T;
    label?: string; // 表头
    sortable?: boolean; // 是否可排序
    render?: (item?: T) => React.ReactNode; // 自定义单元格渲染
    className?: string;
}
interface ListProps<T> {
    items: T[];
    fields: ListColumn<T>[];
    onDelete?: (id: number) => void; // 可选操作
    rowKey?: keyof T; // 用于 TableRow key
}
const List = <T extends { id: number }>({ items = [], fields = [], onDelete, rowKey = 'id' as keyof T }: ListProps<T>) => {
    const [sortingField, setSortingField] = useState<{ field: string; status: '' | 'asc' | 'desc' }>({ field: '', status: '' });
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({}); // Add this line

    const [isAllSelected, setIsAllSelected] = useState(false);
    const handleSelectAll = (isSelected: boolean) => {
        const allSelected: Record<number, boolean> = {};
        items.forEach((item) => {
            allSelected[item.id] = isSelected;
        });
        setCheckedItems(allSelected);
    };
    const handleSorting = (field: keyof ProductItemType) => {
        if (field !== sortingField.field) {
            setSortingField({ field, status: 'desc' });
            return;
        }
        setSortingField({
            field,
            status: sortingField.status === '' || sortingField.status === 'asc' ? 'desc' : 'asc',
        });
    };
    const sortedItems = useMemo(() => {
        if (!sortingField.field || sortingField.status === '') return [...items];
        const field = sortingField.field as keyof T;
        return sortItems<T>(items, field, sortingField.status);
    }, [items, sortingField]);

    const handleCheckboxChange = (id: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id], // 切换 true/false
        }));
    };
    const defaultClassName = 'px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-100';
    const defaultFirstRowClassName = 'px-5 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-100';

    return (
        <Table>
            <TableHeader>
                <TableRow className='"bg-gray-50 dark:bg-gray-800 text-sm h-12'>
                    <TableCell className={defaultFirstRowClassName}>
                        <Checkbox
                            checked={isAllSelected}
                            onChange={() => {
                                handleSelectAll(!isAllSelected); // 切换 true/false
                                setIsAllSelected(!isAllSelected);
                            }}
                        />
                    </TableCell>
                    {fields.map((col, index) => (
                        <TableCell isHeader={true} key={index} className={col?.className ? col.className : defaultClassName}>
                            {col.sortable ? (
                                <FieldSort
                                    label={col.label || ''}
                                    field={col.key as string}
                                    sortingField={sortingField}
                                    onClick={() => {
                                        handleSorting(col.key as keyof ProductItemType);
                                    }}
                                />
                            ) : (
                                col.label
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {sortedItems.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                        <TableCell className={defaultFirstRowClassName}>
                            <Checkbox
                                id={`checkbox-${item.id}`}
                                checked={!!checkedItems[item.id]}
                                onChange={() => {
                                    handleCheckboxChange(item.id);
                                }}
                            />
                        </TableCell>
                        {fields.map((col, idx) => (
                            <TableCell key={idx} className={col?.className ? col.className : defaultClassName}>
                                {col.render ? col.render(item) : (item[col.key as keyof typeof item] as any)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default List;
