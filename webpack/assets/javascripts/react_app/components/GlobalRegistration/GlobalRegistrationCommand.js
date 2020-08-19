import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Alert, LoadingState } from 'patternfly-react';

import { STATUS } from '../../constants';
import { translate as __ } from '../../common/I18n';
import {
  selectStatus,
  selectRegisterCommand,
} from './GlobalRegistrationSelectors';

const GlobalRegistrationCommand = () => {
  const apiStatus = useSelector(selectStatus);
  const registerCommand = useSelector(selectRegisterCommand);

  const copy = () => {
    const tmpElement = document.createElement('textarea');

    tmpElement.appendChild(document.createTextNode(registerCommand));
    document.body.appendChild(tmpElement);
    tmpElement.select();
    document.execCommand('copy');
    document.body.removeChild(tmpElement);
  };

  if (apiStatus === STATUS.ERROR) {
    return (
      <Grid.Row>
        <Grid.Col md={8}>
          <Alert>
            {__(
              'There was an error while creating the command, try refreshing the page.'
            )}
          </Alert>
        </Grid.Col>
      </Grid.Row>
    );
  }

  return (
    <LoadingState loading={apiStatus === STATUS.PENDING}>
      {registerCommand && (
        <Grid.Row>
          <Grid.Col md={8}>
            <pre className="white-space-normal" id="grt_command">
              {registerCommand}
            </pre>

            <button onClick={copy}>Copy</button>
          </Grid.Col>
        </Grid.Row>
      )}
    </LoadingState>
  );
};

export default GlobalRegistrationCommand;
