import React, { useState } from 'react';
import MuiTableSortLabel from '@material-ui/core/TableSortLabel';

export default (defaultKey) => {
  const { state, setState } = useOrderState(defaultKey);

  return [
    TableSortLabel(state, setState),
    state
  ]
}

const TableSortLabel = (state, setState) => ({labelKey, children}) => {

  return (
    <MuiTableSortLabel
      active={ labelKey === state.key }
      direction={ state.order }
      onClick={ () => setState(labelKey) }
    >
      { children }
    </MuiTableSortLabel>
  )
};

export const useOrderState = defaultKey => {
  const [ state, _setState ] = useState({ key: defaultKey, order: 'desc' });

  const setState = newKey => {
    const newOrder = getNewOrder(state.key, state.order, newKey);
    _setState({ key: newKey, order: newOrder });
  }

  return { state, setState };
}

const getNewOrder = (key, order, newKey) => {
  if(key !== newKey) {
    return 'desc';
  } else if (order === 'asc') {
    return 'desc';
  } else {
    return 'asc';
  }
}
