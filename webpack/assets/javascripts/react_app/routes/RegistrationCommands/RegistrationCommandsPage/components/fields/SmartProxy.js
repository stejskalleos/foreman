import React from 'react';
import PropTypes from 'prop-types';

import {
  FormGroup,
  FormSelect,
  FormSelectOption,
  Popover,
} from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../../../common/I18n';
import { emptyOption } from '../../RegistrationCommandsPageHelpers';

const SmartProxy = ({
  smartProxyId,
  smartProxies,
  handleSmartProxy,
  isLoading,
}) => (
  <FormGroup
    label={__('Smart Proxy')}
    fieldId="reg_smart_proxy"
    labelIcon={
      <Popover
        bodyContent={__(
          'Only Smart Proxies with enabled Registration module are available'
        )}
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
    <FormSelect
      value={smartProxyId}
      onChange={v => handleSmartProxy(v)}
      className="without_select2"
      id="reg_smart_proxy_select"
      isDisabled={isLoading || smartProxies.length === 0}
    >
      {emptyOption(smartProxies.length)}
      {smartProxies.map((sp, i) => (
        <FormSelectOption key={i} value={sp.id} label={sp.name} />
      ))}
    </FormSelect>
  </FormGroup>
);

SmartProxy.propTypes = {
  smartProxyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleSmartProxy: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  smartProxies: PropTypes.array,
};

SmartProxy.defaultProps = {
  smartProxyId: '',
  smartProxies: [],
};

export default SmartProxy;
