import React from 'react';
import { useSelector } from 'react-redux';

import {
  FormGroup,
  FormSelect,
  FormSelectOption,
  Popover,
} from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../../common/I18n';
import { selectHostGroups } from '../RegistrationCommandsPageSelectors';
import { emptyOption } from '../RegistrationCommandsPageHelpers';

const HostGroup = ({ hostGroupId, handleHostGroup, isLoading }) => {
  const hostGroups = useSelector(selectHostGroups);

  return (
    <FormGroup
      label={__('Host Group')}
      fieldId="reg_host_group"
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
        value={hostGroupId}
        onChange={v => handleHostGroup(v)}
        className="without_select2"
        id="reg_host_group_select"
        isDisabled={isLoading || hostGroups.length === 0}
      >
        {emptyOption(hostGroups.length)}
        {hostGroups.map((hg, i) => (
          <FormSelectOption key={i} value={hg.id} label={hg.name} />
        ))}
      </FormSelect>
    </FormGroup>
  );
};

export default HostGroup;
