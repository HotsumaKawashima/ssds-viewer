import React, { useState } from 'react'
import _ from 'underscore';
import Checkbox from '@material-ui/core/Checkbox';

export default () => {
  const { state, setState, initCheckbox } = useKeyState();

  return [
    HeadCheckbox(state, setState),
    BodyCheckbox(state, setState),
    initCheckbox,
    state,
  ]
}

const HeadCheckbox = (state, setState) => ({checkboxKeys}) => (
  <Checkbox
    indeterminate={state.length > 0 && state.length < checkboxKeys.length}
    checked={state.length >= checkboxKeys.length}
    onChange={e => setState(checkboxKeys, e.target.checked)}
  />
)

const BodyCheckbox = (state, setState) => ({checkboxKey}) => (
  <Checkbox
    checked={state.indexOf(checkboxKey) >= 0}
    onChange={e => setState([checkboxKey], e.target.checked)}
  />
)

export const useKeyState = () => {
  const [ state, _setState ] = useState([]);

  const setState = (keys, bool) => {
    if(bool) {
      _setState(_.uniq(state.concat(keys)));
    } else {
      _setState(_.without(state, ...keys));
    }
  }

  const initCheckbox = () => {
    _setState([]);
  }

  return { state, setState, initCheckbox };
}
