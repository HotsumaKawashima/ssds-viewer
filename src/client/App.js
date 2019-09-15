import React from 'react';
import { Provider } from "mobx-react";

import Main from './view/Main';
import HistoryModel from './model/HistoryModel';

const models = {
  historyModel: new HistoryModel(),
}

export default () => {

  return (
    <Provider { ...models }>
      <Main />
    </Provider>
  );
};
