import { Drawer } from '@/components/composed';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/elements';
import Checkbox from '@/components/elements/Checkbox';
import { sortItems } from '@/utils';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { FieldSort } from './index';

export interface ListColumn<T> {
    key: string | keyof T;
    label?: string; // 表头
    sortable?: boolean; // 是否可排序
    clickable?: boolean; // 是否可点击
    render?: (item?: T, index?: number) => React.ReactNode; // 自定义单元格渲染
    className?: string;
}
interface ListProps<T> {
    items: T[];
    fields: ListColumn<T>[];
    rowKey?: keyof T; // 用于 TableRow key
    openTab?: boolean;
    onSelect?: (item: number[]) => void; // 选中行回调
    expandedRow?: number | null;
    children?: (item: T) => React.ReactNode;
}
const List = <T extends { id: number }>({ items = [], fields = [], openTab = false, expandedRow = null, children, onSelect }: ListProps<T>) => {
    const [sortingField, setSortingField] = useState<{ field: string; status: '' | 'asc' | 'desc' }>({ field: '', status: '' });
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({}); // Add this line
    const [isOpen, setOpen] = useState(false);
    const [itemData, setItemData] = useState<T | null>(null);

    const [isAllSelected, setIsAllSelected] = useState(false);

    useEffect(() => {

        const ids = Object.keys(checkedItems).filter((v) => checkedItems[Number(v)]).map((v) => Number(v));
        onSelect?.(ids);

    }, [checkedItems]);

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
    const handhandleRowClick = (item: T) => {
        if (!item) return;
        setOpen(true);
        setItemData(item);
    };
    const defaultClassName = 'px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-100';
    const defaultFirstRowClassName = 'px-5 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-100';

    return (
        <>
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
                        <Fragment key={index}>
                            <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
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
                                        {col.clickable ? (
                                            <div
                                                className="cursor-pointer border border-gray-200 rounded-md px-2 py-1"
                                                onClick={() => {
                                                    handhandleRowClick(item);
                                                }}
                                            >
                                                {col.render ? col.render(item, index) : (item[col.key as keyof typeof item] as any)}
                                            </div>
                                        ) : col.render ? (
                                            col.render(item, index)
                                        ) : (
                                            (item[col.key as keyof typeof item] as any)
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                            {children && expandedRow !== null && expandedRow === item.id && (
                                <TableRow>
                                    <td colSpan={fields.length + 1} className="px-7">
                                        <div className="flex items-center justify-end w-full"> {children && children(item)}</div>
                                    </td>
                                </TableRow>
                            )}
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
            {openTab && (
                <Drawer
                    open={isOpen}
                    onClose={() => {
                        setOpen(false);
                    }}
                >
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Content</h2>
                        <div className="space-y-2">
                            {itemData &&
                                Object.entries(itemData).map(([key, value]) => (
                                    <div key={key} className="flex flex-col sm:flex-row sm:items-start sm:gap-4 p-2 bg-gray-50 rounded-md">
                                        <div className="text-gray-600 font-semibold w-full sm:w-32">{key}</div>
                                        <div className="text-gray-800 wrap-break-words w-full">{typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}</div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </Drawer>
            )}
        </>
    );
};

export default List;
