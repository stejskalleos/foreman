import React from 'react';
import { useSelector } from 'react-redux';

import {
  Alert,
  FormGroup,
  ClipboardCopy,
  ClipboardCopyVariant,
} from '@patternfly/react-core';
import { translate as __ } from '../../../../common/I18n';
import { STATUS } from '../../../../constants';

import {
  selectAPIStatusCommand,
  selectCommand,
} from '../RegistrationCommandsPageSelectors';

const Command = () => {
  const status = useSelector(selectAPIStatusCommand);
  const command = useSelector(selectCommand);

  switch (status) {
    case STATUS.ERROR:
      return (
        <Alert
          variant="danger"
          title={__(
            'There was an error while generating the command, see the logs for more information.'
          )}
        />
      );
    case STATUS.RESOLVED:
      return (
        <FormGroup label={__('Registration command')}>
          <ClipboardCopy
            variant={ClipboardCopyVariant.expansion}
            isReadOnly
            isCode
            isExpanded
          >
            {command}
          </ClipboardCopy>
        </FormGroup>
      );
    default:
      return <FormGroup />;
  }
};

export default Command;
