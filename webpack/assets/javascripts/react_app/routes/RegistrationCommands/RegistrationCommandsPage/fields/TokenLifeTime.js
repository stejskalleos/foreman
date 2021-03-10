import React from 'react';

import { FormGroup, TextInput, Popover } from '@patternfly/react-core';

import { HelpIcon } from '@patternfly/react-icons';
import { sprintf, translate as __ } from '../../../../common/I18n';

const TokenLifeTime = ({ value, onChange, handleInvalidFields, isLoading }) => {
  const minValue = 1;
  const maxValue = 87600; // Ten years in hours

  const isValid = v => v >= minValue && v <= maxValue;

  const setValue = v => {
    handleInvalidFields('Token Life Time', isValid(v));
    onChange(v);
  };

  return (
    <FormGroup
      label={__('Token Life Time (hours)')}
      validated={isValid(value) ? 'default' : 'error'}
      helperTextInvalid={sprintf(
        'Token life time value must be between %s and %s hours (ten years).',
        minValue,
        maxValue
      )}
      isRequired
      fieldId="registration_token_life_time"
      labelIcon={
        <Popover
          bodyContent={
            <div>
              {__(
                'Expiration of the authorization token. TODO: Max & min values'
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
      }
    >
      <TextInput
        value={value}
        type="number"
        min={minValue}
        max={maxValue}
        isDisabled={isLoading}
        id="reg_token_life_time_input"
        onChange={v => setValue(v)}
      />
    </FormGroup>
  );
};

export default TokenLifeTime;
