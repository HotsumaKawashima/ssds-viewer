import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default () => {
  const [state, setState] = useState(false);

  return [
    DeleteDialog(state, setState),
    openDialog(setState)
  ]
}

const DeleteDialog = (state, setState) => ({fileIds, onYesClick}) => {
  return (
    <Dialog
      open={state}
      onClose={ () => setState(false) }
      >
      <DialogContent>
        <DialogContentText>
          { fileIds.length } 個のファイルを削除します。 よろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={ () => setState(false) } color='primary'>
          いいえ
        </Button>
        <Button onClick={ () => { setState(false); onYesClick(); } } color='primary'>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const openDialog = (setState) => () => {
  setState(true);
}
