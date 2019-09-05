import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

import NavLink from './NavLink';

describe('パブリック関数', () => {

  test('レンダリング', () => {
    const Component = () => {
      return (
        <BrowserRouter>
          <NavLink to='/link'>text</NavLink>
        </BrowserRouter>
      );
    };

    ReactTestUtils.renderIntoDocument(
      <Component />
    );
  });
});

