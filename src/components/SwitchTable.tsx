import React from 'react'
import {Switch} from "../types/dataTypes";
import {Table} from "antd";
import {ColumnsType} from "antd/lib/table";
import {Link} from "react-router-dom";
import {getPairCellColor} from "../helpers/cableFunctions";

type SwitchTableProps = {
  data: Switch,
  loading: boolean,
  ip: string
}

type SwitchRow = {
  portNumber: number | string,
  portState: string,
  pairNumber: number,
  cableLength: string | number,
  cableState: string,
};

export const SwitchTable: React.FC<SwitchTableProps> = ({ data, loading, ip}) => {

  const rows: SwitchRow[] = [];
  console.log(data);

  data.forEach(port => {
    rows.push({
      portNumber: port.number,
      portState: port.state,
      pairNumber: 1,
      cableLength: port.pair1.length,
      cableState: port.pair1.state,
    });

    if (port.state === "Link-Down") {
      rows.push({
        portNumber: '',
        portState: '',
        pairNumber: 2,
        cableLength: port.pair2.length,
        cableState: port.pair2.state,
      });
    }
  });

  const columns: ColumnsType<SwitchRow> = [{
    title: '#',
    dataIndex: 'portNumber',
    key: 'portNumber',
    render: portNumber => <Link to={`/switch/${ip}/${portNumber}`}>{portNumber}</Link>
  }, {
    title: 'Порт',
    dataIndex: 'portState',
    key: 'portState'
  }, {
    title: 'Пары',
    dataIndex: 'pairNumber',
    key: 'pairNumber'
  }, {
    title: 'Статус',
    dataIndex: 'cableState',
    key: 'cableState',
    onCell: ({ cableState }) => ({
      className: getPairCellColor(cableState)
    })
  }, {
    title: 'Длины',
    dataIndex: 'cableLength',
    key: 'cableLength',
  }]

  return (
    <Table
      columns={columns}
      dataSource={rows}
      loading={loading}
      pagination={false}
    >

    </Table>
  );
}