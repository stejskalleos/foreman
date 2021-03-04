import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  FormGroup,
  FormSelect,
  FormSelectOption,
  Popover,
} from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../../common/I18n';
import { selectHostGroups } from '../RegistrationCommandsPageSelectors';

const HostGroup = ({ hostGroupId, handleHostGroup, isLoading }) => {
  const hostGroups = useSelector(selectHostGroups);
  const emptyOptionLabel = () => {
    if (hostGroups.length > 0) {
      return '';
    }
    return 'Nothing to select.';
  };

  return (
    <FormGroup
      label='Host Group'
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
      <FormSelect
        value={hostGroupId}
        onChange={v => handleHostGroup(v)}
        className='without_select2'
        id='registration_host_group'
        isDisabled={isLoading || hostGroups.length === 0}
      >
        <FormSelectOption value='' label={emptyOptionLabel()} />
        {hostGroups.map((hg, i) => (
          <FormSelectOption key={i} value={hg.id} label={hg.name} />
        ))}
      </FormSelect>
    </FormGroup>
  );
};

export default HostGroup;
