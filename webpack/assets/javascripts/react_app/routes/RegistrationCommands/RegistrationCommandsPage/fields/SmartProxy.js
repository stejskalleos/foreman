import React from 'react';
import { useSelector } from 'react-redux';

import {
  FormGroup,
  FormSelectOption,
  FormSelect,
  Popover,
} from '@patternfly/react-core';

import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../../common/I18n';
import { selectSmartProxies } from '../RegistrationCommandsPageSelectors';

const SmartProxy = ({ smartProxyId, handleSmartProxy, isLoading }) => {
  const smartProxies = useSelector(selectSmartProxies);
  const emptyOptionLabel = () => {
    if (smartProxies.length > 0) {
      return '';
    }
    return 'Nothing to select.';
  };

  return (
    <FormGroup
      label='Smart Proxy'
      fieldId='registration_smart_proxy'
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
        value={smartProxyId}
        onChange={v => handleSmartProxy({ smartProxyId: v })}
        className='without_select2'
        id='registration_smart_proxy_select'
        isDisabled={isLoading || smartProxies.length === 0}
      >
        <FormSelectOption value='' label={emptyOptionLabel()} />
        {smartProxies.map((sp, i) => (
          <FormSelectOption key={i} value={sp.id} label={sp.name} />
        ))}
      </FormSelect>
    </FormGroup>
  );
};

export default SmartProxy;
