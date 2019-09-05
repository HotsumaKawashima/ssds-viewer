import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import useMultiPulldownMenu from './useMultiPulldownMenu';

describe('パブリック関数', () => {

  test('レンダリング', () => {

    const options = [
      { label: 'label01', value: 'value01' },
      { label: 'label02', value: 'value02' },
      { label: 'label03', value: 'value03' },
    ];

    const Component = () => {
      const [ MultiPulldownMenu, state ] = useMultiPulldownMenu();;

      return (
        <MultiPulldownMenu options={ options } />
      )
    }

    ReactTestUtils.renderIntoDocument(
      <Component />
    );
  });

});
