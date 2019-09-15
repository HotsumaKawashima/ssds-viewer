import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default (historyModel, paramName, defaultValue) => {
  const state = historyModel.get(paramName, defaultValue)
  return [
    RadioSelect(historyModel, paramName, state),
    state
  ]
}

const RadioSelect = (historyModel, paramName, state) => ({ label }) => {
  return (
    <FormControlLabel
      label={ label }
      control={
        <Radio color='primary'
          checked={ label === state }
          onChange={ ({checked}) => checked || historyModel.set(paramName, label) }
        />
      }
    />
  )
}
