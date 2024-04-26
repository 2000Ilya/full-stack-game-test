import axios from 'axios';
import { Upload } from './components/upload/Upload';

function App() {
  async function onUpload(file: File) {
    console.log(file);
    const myData = new FormData();
    myData.append('file', file);
    // await axios.get('http://localhost:3000/data');
    await axios.post('http://localhost:3000/upload_files', myData);
  }

  return (
    <>
      {/* <input type={"file"} value={file} onChange={handleChangeFile} /> */}
      <Upload onUpload={onUpload} disabled={false} />
    </>
  )

}

export default App
