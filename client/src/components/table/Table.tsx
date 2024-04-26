import { TCSVDataItem } from '../../api/types'

type TableProps = {
    tableData: TCSVDataItem[]
}

const tableFields = [
    {
        key: 'Email',
        title: 'Email'
    },
    {
        key: 'Зарегистрирован',
        title: 'Зарегистрирован'
    },
    {
        key: 'Ник',
        title: 'Ник'
    },
    {
        key: 'Статус',
        title: 'Статус'
    }
];

const Table = ({ tableData }: TableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    {tableFields.map(field => (
                        <th key={field.key}>{field.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((row) => (
                    <tr key={JSON.stringify(row)}>
                        {tableFields.map(field => (
                            <td key={field.key}>{row[field.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table