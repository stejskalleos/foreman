import React from 'react';
import { useSelector } from 'react-redux';

import {
  FormGroup,
  FormSelectOption,
  FormSelect,
  Popover,
} from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { selectConfigParams } from '../RegistrationCommandsPageSelectors';
import { translate as __ } from '../../../../common/I18n';

const ConfigParams = ({
  setupRemoteExecution,
  setupInsights,
  handleRemoteExecution,
  handleInsights,
  isLoading,
}) => {
  const configParams = useSelector(selectConfigParams);

  const options = (value = '') => {
    const defaultValue = value ? __('Yes') : __('No');
    const defaultLabel = `${__(
      'Inherit from Host parameter'
    )} (${defaultValue})`;

    return (
      <>
        <FormSelectOption key={0} value="" label={defaultLabel} />
        <FormSelectOption key={1} value label={__('Yes (override)')} />
        <FormSelectOption key={2} value={false} label={__('No (override)')} />
      </>
    );
  };

  return (
    <>
      <FormGroup
        label="Setup Rex"
        isRequired
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
        <FormSelect
          value={setupRemoteExecution}
          onChange={v => handleRemoteExecution(v)}
          className="without_select2"
          id="registration_setup_remote_execution"
          isDisabled={isLoading}
          isRequired
        >
          {options(configParams?.host_registration_remote_execution)}
        </FormSelect>
      </FormGroup>
      <FormGroup
        label="Setup Insights"
        isRequired
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
        <FormSelect
          value={setupInsights}
          onChange={v => handleInsights(v)}
          className="without_select2"
          id="registration_setup_insights"
          isDisabled={isLoading}
          isRequired
        >
          {options(configParams?.host_registration_insights)}
        </FormSelect>
      </FormGroup>
    </>
  );
};

export default ConfigParams;
