import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FormGroup } from '@patternfly/react-core';
import { AngleDownIcon, AngleRightIcon } from '@patternfly/react-icons';
import { sprintf, translate as __ } from '../../../../common/I18n';

const Advanced = ({ show, handleShow }) => (
  <FormGroup>
    <a onClick={() => handleShow(!show)}>
      {show ? <AngleDownIcon /> : <AngleRightIcon />}
      {sprintf('%s advanced fields', show ? _('Hide') : _('Show'))}
    </a>
  </FormGroup>
);

export default Advanced;
