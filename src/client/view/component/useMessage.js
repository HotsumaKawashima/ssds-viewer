import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default () => {
  const [state, setState] = useState(false);

  return [
    AlartMessage(state, setState),
    openAlartMessage(setState)
  ]
}

const AlartMessage = (state, setState) => ({message}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={state}
      autoHideDuration={5000}
      onClose={ () => setState(false) }
      message={ message }
    />
  )
}

const openAlartMessage = (setState) => () => {
  setState(true);
}
