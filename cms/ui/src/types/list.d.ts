interface FilterItemType {
    field: string;
    operator: string;
    value: string | number;
}
interface SortItemType {
    field: string;
    order: 'DESC' | 'ASC';
}
type FieldKey = 'filter' | 'sort';
interface ListQueryParamsType {
    target: string;
    filter: FilterItemType[];
    sort: SortItemType[];
}
