import React from 'react';

import {
  FormGroup,
  NumberInput,
  Popover,
} from '@patternfly/react-core';

import { HelpIcon } from '@patternfly/react-icons';
import { sprintf, translate as __ } from '../../../../common/I18n';

const TokenLifeTime = ({ value, onChange, isLoading, handleInvalidFields }) => {
  const minValue = 1;
  const maxValue = 87600; // Ten years in hours
  const currentValue = Number(value === undefined ? 4 : value);

  const isValid = v => v >= minValue && v <= maxValue;

  const setValue = v => {
    handleInvalidFields('Token Life Time', isValid(v));
    onChange({ jwtExpiration: v });
  };

  return (
    <FormGroup
      label={__('Token Life Time')}
      validated={isValid(currentValue) ? 'default' : 'error'}
      helperTextInvalid={sprintf(
        'Token life time value must be between %s and %s hours (ten years).',
        minValue,
        maxValue
      )}
      isRequired
      fieldId='registration_token_life_time'
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
      <NumberInput
        value={currentValue}
        min={minValue}
        max={maxValue}
        onChange={e => setValue(e.target.value)}
        onMinus={() => setValue(currentValue - 1)}
        onPlus={() => setValue(currentValue + 1)}
        id='registration_token_life_time_input'
        unit={currentValue > 1 ? __('hours') : __('hour')}
        disabled={isLoading}
      />
    </FormGroup>
  );
};

export default TokenLifeTime;
