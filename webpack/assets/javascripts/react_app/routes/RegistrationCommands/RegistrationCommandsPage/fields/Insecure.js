import React from 'react';

import { FormGroup, Checkbox, Popover } from '@patternfly/react-core';

import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../../common/I18n';

const Insecure = ({ insecure, handleInsecure, isLoading }) => (
  <FormGroup fieldId="reg_insecure">
    <Checkbox
      label={
        <span>
          {__('Insecure')}{' '}
          <Popover
            bodyContent={
              <div>
                {__(
                  'If the target machine does not trust the Foreman SSL certificate, the initial connection could be subject to Man in the middle attack. If you accept the risk and do not require the server authenticity to be verified, you can enable insecure argument for the initial curl. Note that all subsequent communication is then properly secured, because the initial request deploys the SSL certificate for the rest of the registration process.'
                )}
              </div>
            }
          >
            <button
              className="pf-c-form__group-label-help"
              onClick={e => e.preventDefault()}
            >
              <HelpIcon noVerticalAlign />
            </button>
          </Popover>
        </span>
      }
      id="reg_insecure_input"
      onChange={() => handleInsecure(!insecure)}
      isDisabled={isLoading}
      isChecked={insecure}
    />
  </FormGroup>
);
export default Insecure;
