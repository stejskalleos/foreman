import React from 'react';
import { useSelector } from 'react-redux';

import { Alert, FormGroup } from '@patternfly/react-core';
import { translate as __ } from '../../../../common/I18n';
import { STATUS } from '../../../../constants';

import ClipboardCopy from '../../../../components/common/ClipboardCopy';

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
        <FormGroup>
          <ClipboardCopy text={command} />
        </FormGroup>
      );
    default:
      return <FormGroup />;
  }
};

export default Command;
