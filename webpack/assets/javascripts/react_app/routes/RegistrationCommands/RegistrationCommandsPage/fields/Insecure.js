import React from 'react';

import { FormGroup, Checkbox, Popover } from '@patternfly/react-core';

import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../../common/I18n';

const Insecure = ({ insecure, handleInsecure, isLoading }) => (
  <FormGroup
    fieldId="reg_insecure"
    labelIcon={
      <Popover bodyContent={<div>TODO</div>}>
        <button
          className="pf-c-form__group-label-help"
          onClick={e => e.preventDefault()}
        >
          <HelpIcon noVerticalAlign />
        </button>
      </Popover>
    }
  >
    <Checkbox
      label={
        <span>
          {__('Insecure')}{' '}
          <Popover bodyContent={<div>TODO</div>}>
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
