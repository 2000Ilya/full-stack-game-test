import { TCSVDataItem } from "../api/types";

export function prepareTableData<T>(
    data: T[],
    filter: (data: T[]) => T[],
    sort: (data: T[]) => T[]
) {
    return sort(filter(data));
}

export type tableItemKey = keyof TCSVDataItem;

export type TFilterOptions = Record<tableItemKey, TCSVDataItem[tableItemKey][]>;

export function filterTableData(tableData: TCSVDataItem[], filterOptions: TFilterOptions) {
    return tableData.filter(item => {
        for (const key in item) {
            if (filterOptions[key as tableItemKey] && !filterOptions[key as tableItemKey].includes(item[key as tableItemKey])) {
                return false;
            }
        }
        return true;
    });
}

export type TSortOptions = Record<tableItemKey, (value1: TCSVDataItem[tableItemKey], value2: TCSVDataItem[tableItemKey]) => 0 | 1 | -1>;

export function sortTableData(tableData: TCSVDataItem[], sortOptions: TSortOptions) {
    const tableDataCopy = Object.assign([], tableData);

    tableDataCopy.sort((row1, row2) => {
        const key = Object.keys(sortOptions)[0];
        return sortOptions[key as tableItemKey](row1[key as tableItemKey], row2[key as tableItemKey])
    });
    return tableDataCopy;
}