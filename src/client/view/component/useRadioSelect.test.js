import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import useRadioSelect from './useRadioSelect';

describe('パブリック関数', () => {

  test('レンダリング', () => {
    const historyModel = {
      get: () => 'label01',
      set: () => {}
    }

    const Component = () => {
      const [ RadioSelect, state ] = useRadioSelect(historyModel, 'paramName', 'label01');

      return (
        <div>
          <RadioSelect labels='label01' />
          <RadioSelect labels='label02' />
          <RadioSelect labels='label03' />
        </div>
      )
    }

    ReactTestUtils.renderIntoDocument(
      <Component />
    );
  });

});
