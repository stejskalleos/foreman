import React from 'react';
import RegistrationCommandsPage from './RegistrationCommandsPage';
import { PATH } from './constants';

export default {
  path: PATH,
  render: props => <RegistrationCommandsPage {...props} />,
  exact: true,
};
