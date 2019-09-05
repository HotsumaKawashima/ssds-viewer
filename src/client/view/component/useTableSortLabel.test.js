import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { renderHook, act } from '@testing-library/react-hooks';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import useSortTable, { useOrderState } from './useTableSortLabel';

describe('パブリック関数', () => {

  test('レンダリング', () => {
    const SortTable = () => {
      const [ TableSortLabel, state ] = useSortTable('key01');

      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel labelKey='key01'>header 1</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel labelKey='key02'>header 2</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>body 1-1</TableCell>
              <TableCell>body 1-2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>body 2-1</TableCell>
              <TableCell>body 2-2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )
    }

    ReactTestUtils.renderIntoDocument(
      <SortTable />
    );
  });
});

describe('フック', () => {

  test('orderとkeyを切り替える', () => {
    const { result } = renderHook(() => useOrderState('defaultKey'));

    expect(result.current.state).toStrictEqual({ key: 'defaultKey', order: 'desc' })

    const values = [
      { value: 'defaultKey', state: { key: 'defaultKey' , order: 'asc' } },
      { value: 'defaultKey', state: { key: 'defaultKey' , order: 'desc' } },
      { value: 'secondKey',  state: { key: 'secondKey' ,  order: 'desc' } },
    ]

    for( let i=0; i<values.length; i++ ) {

      act(() => {
        result.current.setState(values[i].value);
      });

      expect(result.current.state).toStrictEqual(values[i].state);
    }

  });
});
