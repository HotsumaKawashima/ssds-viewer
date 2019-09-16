import React from 'react'
import Select from 'react-select';

export default (historyModel, paramName) => {
  const state = historyModel.getAll(paramName);
  return [
    MultiPulldownMenu(historyModel, paramName, state),
    state
  ]
}

const MultiPulldownMenu = (historyModel, paramName, state) => ({ options }) => {
  return (
    <Select
      value={state.map(s => options.find(o => o.value == s))}
      onChange={targets => targets === null ? historyModel.delete(paramName) : historyModel.setAll(paramName ,targets.map(v => v.value))}
      options={options}
      isMulti
    />
  )
}
