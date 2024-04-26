import { useState } from 'react';
import { Upload } from './components/upload/Upload';
import { uploadFile } from './api/api';
import Table from './components/table/Table';
import { TCSVDataItem } from './api/types';
import { TFilterOptions, TSortOptions, filterTableData, prepareTableData, sortTableData, tableItemKey } from './helpers/helpers';

function App() {
  const [tableData, setTableData] = useState<TCSVDataItem[]>()

  async function onUpload(file: File) {
    const myData = new FormData();
    myData.append('file', file);
    const response = await uploadFile(myData);
    const tableData = response.data;
    setTableData(getPreparedData(tableData));
  }

  function getPreparedData(tableData: TCSVDataItem[]) {
    const filterOptions = { ['Статус']: ['On'] };
    const filter = (tableData: TCSVDataItem[]) => filterTableData(tableData, filterOptions as TFilterOptions);

    const sortOptions = {
      ['Зарегистрирован']: (item1: TCSVDataItem[tableItemKey], item2: TCSVDataItem[tableItemKey]) => {
        return (Number(new Date(item1)) - Number(new Date(item2)));
      }
    };
    const sort = (tableData: TCSVDataItem[]) => sortTableData(tableData, sortOptions as TSortOptions);

    return prepareTableData(tableData, filter, sort)
  }

  return (
    <>
      <Upload onUpload={onUpload} disabled={false} />
      {
        tableData &&
        <Table tableData={tableData} />
      }
    </>
  )

}

export default App
