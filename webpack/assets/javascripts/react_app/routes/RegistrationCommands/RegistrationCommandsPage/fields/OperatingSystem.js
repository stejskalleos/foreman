import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  FormGroup,
  FormSelect,
  FormSelectOption,
  Popover,
} from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../../common/I18n';
import { get } from '../../../../redux/API';

import {
  selectOperatingSystems,
  selectOperatingSystemTemplate,
} from '../RegistrationCommandsPageSelectors';

import { operatingSystemTemplateAction } from '../RegistrationCommandsPageActions';
import {
  osHelperText,
  validatedOS,
  emptyOption,
  formatOSname,
} from '../RegistrationCommandsPageHelpers';

const OperatingSystem = ({
  operatingSystemId,
  handleOperatingSystem,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const operatingSystems = useSelector(selectOperatingSystems);
  const template = useSelector(selectOperatingSystemTemplate);

  useEffect(() => {
    if (operatingSystemId) {
      dispatch(get(operatingSystemTemplateAction(operatingSystemId)));
    }
  }, [dispatch, operatingSystemId]);

  return (
    <FormGroup
      label={__('Operating System')}
      helperText={osHelperText(operatingSystemId, template)}
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
      fieldId="reg_os"
    >
      <FormSelect
        value={operatingSystemId}
        onChange={v => handleOperatingSystem(v)}
        className="without_select2"
        id="reg_os_select"
        validated={validatedOS(operatingSystemId, template)}
        isDisabled={isLoading || selectOperatingSystems.length === 0}
      >
        {emptyOption(operatingSystems.length)}
        {operatingSystems.map((os, i) => (
          <FormSelectOption key={i} value={os.id} label={formatOSname(os)} />
        ))}
      </FormSelect>
    </FormGroup>
  );
};

export default OperatingSystem;
