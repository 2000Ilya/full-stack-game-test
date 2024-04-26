import { useState } from 'react';
import { Upload } from './components/upload/Upload';
import { uploadFile } from './api/api';
import Table from './components/table/Table';
import { TCSVDataItem } from './api/types';

function App() {
  const [tableData, setTableData] = useState<TCSVDataItem[]>()

  async function onUpload(file: File) {
    const myData = new FormData();
    myData.append('file', file);
    const response = await uploadFile(myData);
    const tableData = response.data;
    setTableData(tableData);
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
