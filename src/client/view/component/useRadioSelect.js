import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default (defaultState) => {
  const [ state, setState ] = useState(defaultState);

  return [
    RadioSelect(state, setState),
    state,
  ]
}

const RadioSelect = (state, setState) => ({ label }) => {

  return (
    <FormControlLabel
      label={ label }
      control={
        <Radio color='primary'
          checked={ label === state }
          onChange={ ({checked}) => checked ? setState() : setState(label) }
        />
      }
    />
  )
}
