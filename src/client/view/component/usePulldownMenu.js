import React, { useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

export default (historyModel, paramName) => {
  const state = historyModel.get(paramName, '');

  return [
    PulldownMenu(historyModel, paramName, state),
    state
  ]
}

const PulldownMenu = (historyModel, paramName, state) => ({ options }) => {

  return (
    <FormControl fullWidth>
      <Select
        value={state}
        onChange={e => historyModel.set(paramName, e.target.value)}
      >
        {
          options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)
        }
      </Select>
    </FormControl>
  )
}
