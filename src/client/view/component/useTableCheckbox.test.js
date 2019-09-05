import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { renderHook, act } from '@testing-library/react-hooks';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import useTableCheckbox, { useKeyState } from './useTableCheckbox';

describe('パブリック関数', () => {

  test('レンダリング', () => {

    const CheckboxTable = () => {
      const [ HeadCheckbox, BodyCheckbox, initCheckbox, state ] = useTableCheckbox();

      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <HeadCheckbox checkboxKeys={['key01', 'key02']}/>
              </TableCell>
              <TableCell>header 1</TableCell>
              <TableCell>header 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <BodyCheckbox checkboxKey='key01'/>
              </TableCell>
              <TableCell>body 1-1</TableCell>
              <TableCell>body 1-2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <BodyCheckbox checkboxKey='key02'/>
              </TableCell>
              <TableCell>body 2-1</TableCell>
              <TableCell>body 2-2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )
    }

    ReactTestUtils.renderIntoDocument(
      <CheckboxTable />
    );
  });

});

describe('フック', () => {

  test('orderとkeyを切り替える', () => {
    const { result } = renderHook(() => useKeyState());

    expect(result.current.state).toStrictEqual([])

    const values = [
      { value: { keys: ['key01'], bool: true },            state: ['key01'] },
      { value: { keys: ['key02', 'key03'] , bool: true },  state: ['key01', 'key02', 'key03'] },
      { value: { keys: ['key02'], bool: false },           state: ['key01', 'key03'] },
      { value: { keys: ['key01', 'key03'] , bool: false }, state: [] },
    ]

    for( let i=0; i<values.length; i++ ) {

      act(() => {
        result.current.setState(values[i].value.keys, values[i].value.bool);
      });

      expect(result.current.state).toStrictEqual(values[i].state);
    }

    act(() => {
      result.current.initCheckbox();
    });
    expect(result.current.state).toStrictEqual([]);
  });

});
