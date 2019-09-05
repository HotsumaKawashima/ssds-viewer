import React, { useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

export default () => {
  const [state, setState] = useState('');

  return [
    PulldownMenu(state, setState),
    state
  ]
}

const PulldownMenu = (state, setState) => ({ options }) => {

  return (
    <FormControl fullWidth>
      <Select
        value={state}
        onChange={e => setState(e.target.value)}
      >
        {
          options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)
        }
      </Select>
    </FormControl>
  )
}
