import { Card, Table,  } from 'antd';
import { ColumnType } from 'antd/es/table';

interface DataTableProps<T> {
  columns: ColumnType<T>[];  // Array of column definitions
  dataSource: T[];           // Array of data objects
}

const DataTable = <T,>({ columns, dataSource }: DataTableProps<T>) => (
  <Card bordered={false} bodyStyle={{ padding: 0 }} className="overflow-hidden">
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      scroll={{ y: "calc(100vh - 435px)" }}
    />
  </Card>
);

export default DataTable;
