import React from 'react'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import useTableSortLabel from './useTableSortLabel';

export default ({ ssdsModel }) => {

  const [ TableSortLabel, sortState ] = useTableSortLabel('CITY');

  const summed = ssdsModel
    .sumSales(['CITY'])
    .sort(sortState.key, sortState.order);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel labelKey='CITY'>地域名</TableSortLabel>
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
              <TableCell>{ row['CITY'] }</TableCell>
              <TableCell>{ row['SUM'] }</TableCell>
            </TableRow>
          )
         }
      </TableBody>
    </Table>
  )
}
