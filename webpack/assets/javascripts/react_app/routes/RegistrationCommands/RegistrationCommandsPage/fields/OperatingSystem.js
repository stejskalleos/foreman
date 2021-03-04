import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { get, post } from '../../../../redux/API';
import { foremanUrl } from '../../../../../foreman_tools';

import {
  FormGroup,
  FormSelectOption,
  FormSelect,
  Popover,
} from '@patternfly/react-core';

import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../../common/I18n';
import {
  selectOperatingSystems,
  selectOperatingSystemTemplate,
} from '../RegistrationCommandsPageSelectors';

import { operatingSystemTemplateAction } from '../RegistrationCommandsPageActions';

const OperatingSystem = ({
  operatingSystemId,
  handleOperatingSystem,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const operatingSystems = useSelector(selectOperatingSystems);
  const template = useSelector(selectOperatingSystemTemplate);

  const helperText = () => {
    if (!operatingSystemId || template === undefined) {
      return <>&nbsp;</>;
    }

    if (template?.name) {
      return (
        <span>
          {__('Initial configuration template')}:{' '}
          <a href={foremanUrl(template.path)}>{template.name}</a>
        </span>
      );
    }
    return (
      <span className='has-error'>
        <a href={foremanUrl(template.os_path)}>Operating system</a>{' '}
        {__('does not have assigned registration template')}
      </span>
    );
  };

  // TODO: one liners
  const validated = () => {
    if (!operatingSystemId) {
      return 'default';
    }

    if (template?.name) {
      return 'success';
    }
    return 'error';
  };

  const formatName = os => {
    const minor = `.${os.minor}`;
    return `${os.name} ${os.major}${os.minor && `.${os.minor}`}`;
  };

  useEffect(() => {
    if (operatingSystemId) {
      dispatch(get(operatingSystemTemplateAction(operatingSystemId)));
    }
  }, [dispatch, operatingSystemId]);

  return (
    <FormGroup
      label='Operating System'
      helperText={helperText()}
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
      fieldId='registration_operating_system'
    >
      <FormSelect
        value={operatingSystemId}
        onChange={v => handleOperatingSystem(v)}
        className='without_select2'
        id='registration_operating_system_select'
        validated={validated()}
        isDisabled={isLoading}
      >
        <FormSelectOption value='' label='' />
        {operatingSystems.map((os, i) => (
          <FormSelectOption key={i} value={os.id} label={formatName(os)} />
        ))}
      </FormSelect>
    </FormGroup>
  );
};

export default OperatingSystem;
