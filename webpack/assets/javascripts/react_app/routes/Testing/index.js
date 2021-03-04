import React from 'react';

import TestingPage from './TestingPage';
import { TESTING_PATH } from './constants';

export default {
  path: TESTING_PATH,
  render: props => <TestingPage {...props} />,
  exact: true,
};
