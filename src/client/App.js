import React from 'react';
import { Provider } from "mobx-react";

import Main from './view/Main';

export default () => {

  const models = {
  }

  return (
    <Provider { ...models }>
      <Main />
    </Provider>
  );
};
