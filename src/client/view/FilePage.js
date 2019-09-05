import React, { useEffect } from 'react';
import { inject, observer } from "mobx-react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import useTableSortLabel from './component/useTableSortLabel';
import useTableCheckbox from './component/useTableCheckbox';
import useDeleteDialog from './component/useDeleteDialog';
import useMessage from './component/useMessage';

export const FilePage = ({ fileListStore }) => {

  useEffect(() => {
    fileListStore.update();
  }, []);

  const [ TableSortLabel, sortState ] = useTableSortLabel('date');
  const [ HeadCheckbox, BodyCheckbox, initCheckbox, checkState ] = useTableCheckbox();
  const [ DeleteDialog, openDialog ] = useDeleteDialog();
  const [ AlartMessage, openAlartMessage ] = useMessage();
  const [ SuccessMessage, openSuccessMessage ] = useMessage();

  const fileListModel = fileListStore.getModel();
  const data = fileListModel.sort(sortState.key, sortState.order);

  return (
    <Box px={6}>
      <DeleteDialog
        fileIds={ checkState }
        onYesClick={ () => fileListStore.deleteFiles(checkState).then(() => initCheckbox()) }
      />
      <AlartMessage message='ファイルの読み込みに失敗しました' />
      <SuccessMessage message='ファイルの読み込みに成功しました' />

      <Grid container>
        <Grid item>
          <Box pr={1}>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={ openDialog }
            >
              削除
            </Button>
          </Box>
        </Grid>

        <Grid item>
          <Box>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={
                () => fileListStore.importXls()
                  .then(() => openSuccessMessage())
                  .catch(e => openAlartMessage())
              }
            >
            追加
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <HeadCheckbox checkboxKeys={ data.getIds() } />
            </TableCell>
            <TableCell>
              <TableSortLabel labelKey='date'>年度</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel labelKey='dataType'>データタイプ</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel labelKey='lastUpdated'>最終更新日時</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { data.getValue().map( row =>
            <TableRow key={ row['id'] }>
              <TableCell>
                <BodyCheckbox checkboxKey={ row['id'] } />
              </TableCell>
              <TableCell>{ row['date'] }</TableCell>
              <TableCell>{ row['dataType'] }</TableCell>
              <TableCell>{ row['lastUpdated'] }</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    </Box>
  )
}

export default inject('fileListStore')(observer(FilePage));
