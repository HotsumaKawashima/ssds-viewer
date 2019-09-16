import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import usePulldownMenu from './usePulldownMenu';

describe('パブリック関数', () => {

  test('レンダリング', () => {
    const historyModel = {
      get: () => 'label01',
      set: () => {}
    }

    const options = [
      { label: 'label01', value: 'value01' },
      { label: 'label02', value: 'value02' },
      { label: 'label03', value: 'value03' },
    ];

    const Component = () => {
      const [ PulldownMenu, state ] = usePulldownMenu(historyModel, 'paramName');

      return (
        <PulldownMenu width={100} options={ options } />
      )
    }

    ReactTestUtils.renderIntoDocument(
      <Component />
    );
  });

});
