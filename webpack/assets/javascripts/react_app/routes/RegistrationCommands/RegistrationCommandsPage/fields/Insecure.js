import React from 'react';

import { FormGroup, Checkbox, Popover } from '@patternfly/react-core';

import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../../common/I18n';

const Insecure = ({ value, handleInsecure, isLoading }) => (
  <FormGroup
    fieldId='registration_insecure'
    labelIcon={
      <Popover bodyContent={<div>TODO</div>}>
        <button
          className='pf-c-form__group-label-help'
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
          Insecure{' '}
          <Popover bodyContent={<div>TODO</div>}>
            <button
              className='pf-c-form__group-label-help'
              onClick={e => e.preventDefault()}
            >
              <HelpIcon noVerticalAlign />
            </button>
          </Popover>
        </span>
      }
      id='registration_insecure_input'
      onChange={() => handleInsecure({ insecure: !value })}
      isDisabled={isLoading}
      isChecked={value}
    />
  </FormGroup>
);
export default Insecure;
