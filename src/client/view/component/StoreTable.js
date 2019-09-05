import React from 'react'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import useTableSortLabel from './useTableSortLabel';

export default ({ ssdsModel }) => {

  const [ TableSortLabel, sortState ] = useTableSortLabel('STORE NAME');

  const summed = ssdsModel
    .sumSales(['STORE NUMBER'])
    .sort(sortState.key, sortState.order);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel labelKey='STORE NAME'>店名</TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel labelKey='DATA TYPE'>店タイプ</TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel labelKey='STORE NUMBER'>店番号</TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel labelKey='CITY'>地域</TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel labelKey='POSTAL CODE'>ポストコード</TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel labelKey='SUM'>販売本数</TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          summed.getValue().map( (row, index) =>
            <TableRow key={ index }>
              <TableCell>{ row['STORE NAME'] }</TableCell>
              <TableCell>{ row['DATA TYPE'] }</TableCell>
              <TableCell>{ row['STORE NUMBER'] }</TableCell>
              <TableCell>{ row['CITY'] }</TableCell>
              <TableCell>{ row['POSTAL CODE'] }</TableCell>
              <TableCell>{ row['SUM'] }</TableCell>
            </TableRow>
          )
         }
      </TableBody>
    </Table>
  )
}
