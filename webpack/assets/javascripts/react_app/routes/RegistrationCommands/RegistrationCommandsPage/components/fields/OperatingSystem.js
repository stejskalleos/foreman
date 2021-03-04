import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import {
  FormGroup,
  FormSelect,
  FormSelectOption,
  Popover,
} from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../../../common/I18n';
import { get } from '../../../../../redux/API';

import { operatingSystemTemplateAction } from '../../RegistrationCommandsPageActions';
import {
  osHelperText,
  validatedOS,
  emptyOption,
  formatOSname,
} from '../../RegistrationCommandsPageHelpers';

const OperatingSystem = ({
  operatingSystemId,
  operatingSystems,
  operatingSystemTemplate,
  handleOperatingSystem,
  handleInvalidField,
  isLoading,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (operatingSystemId) {
      dispatch(get(operatingSystemTemplateAction(operatingSystemId)));
    }
  }, [dispatch, operatingSystemId]);

  useEffect(() => {
    if (operatingSystemTemplate !== undefined) {
      handleInvalidField('Operating System', !!operatingSystemTemplate?.name);
    }
    if (operatingSystemId === '') {
      handleInvalidField('Operating System', true);
    }
  }, [operatingSystemId, operatingSystemTemplate, handleInvalidField]);

  return (
    <FormGroup
      label={__('Operating System')}
      helperText={osHelperText(operatingSystemId, operatingSystemTemplate)}
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
        validated={validatedOS(operatingSystemId, operatingSystemTemplate)}
        isDisabled={isLoading || operatingSystems.length === 0}
      >
        {emptyOption(operatingSystems.length)}
        {operatingSystems.map((os, i) => (
          <FormSelectOption key={i} value={os.id} label={formatOSname(os)} />
        ))}
      </FormSelect>
    </FormGroup>
  );
};

OperatingSystem.propTypes = {
  operatingSystemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleOperatingSystem: PropTypes.func.isRequired,
  handleInvalidField: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  operatingSystems: PropTypes.array,
  operatingSystemTemplate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};

OperatingSystem.defaultProps = {
  operatingSystemId: '',
  operatingSystems: [],
  operatingSystemTemplate: {},
};

export default OperatingSystem;
