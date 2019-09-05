import React, { useState } from 'react'
import Select from 'react-select';

export default () => {
  const [state, setState] = useState([]);

  return [
      MultiPulldownMenu(state, setState),
      state.map(value => value.value)
  ]
}

const MultiPulldownMenu = (state, setState) => ({ options }) => {

  return (
    <Select
      value={state}
      onChange={targets => targets === null ? setState([]) : setState(targets)}
      options={options}
      isMulti
    />
  )
}
