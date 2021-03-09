import React from 'react';

import { FormGroup } from '@patternfly/react-core';
import { AngleDownIcon, AngleRightIcon } from '@patternfly/react-icons';
import { translate as __ } from '../../../../common/I18n';

const Advanced = ({ show, handleShow }) => (
  <FormGroup>
    <a onClick={() => handleShow(!show)}>
      {show ? <AngleDownIcon /> : <AngleRightIcon />}
      {show ? __('Hide advanced fields') : __('Show advanced fields')}
    </a>
  </FormGroup>
);

export default Advanced;
