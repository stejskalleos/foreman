import React from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button, OverlayTrigger, Tooltip } from 'patternfly-react';

import { translate as __ } from '../../../common/I18n';
import FormField from '../../common/forms/FormField';
import ClipboardCopy from '../../common/ClipboardCopy';
import { STATUS } from '../../../constants';

import {
  selectAPIStatusCommand,
  selectCommand,
} from '../RegistrationSelectors';

const CommandField = () => {
  const apiStatus = useSelector(selectAPIStatusCommand);
  const command = useSelector(selectCommand);

  if (apiStatus === STATUS.ERROR) {
    return (
      <Alert type="error">
        {__(
          'There was an error while generating the command, see the logs for more information.'
        )}
      </Alert>
    );
  }

  if (!command) {
    return <React.Fragment />;
  }

  return (
    <FormField label={__('Command')} inputSizeClass="col-md-8">
      <pre className="ellipsis white-space-normal" id="registration_command">
        {command}
      </pre>
      <OverlayTrigger
        overlay={<Tooltip id="registration_tooltip">{__('Copied!')}</Tooltip>}
        placement="right"
        trigger={['click']}
        rootClose
      >
        <Button
          onClick={() => navigator.clipboard.writeText(command)}
          bsStyle="default"
        >
          {__('Copy to clipboard')}
        </Button>
      </OverlayTrigger>
    </FormField>
  );
};

export default CommandField;
