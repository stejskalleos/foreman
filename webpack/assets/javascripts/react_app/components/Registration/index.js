import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'patternfly-react';
import PropTypes from 'prop-types';

import reducer from './RegistrationReducer';

import { foremanUrl } from '../../../foreman_tools';
import { get, post } from '../../redux/API';
import { translate as __ } from '../../common/I18n';
import { STATUS } from '../../constants';

import {
  selectAPIStatusFormData,
  selectAPIStatusCommand,
  selectRegistration,
  selectOrganizations,
  selectOrganizationId,
  selectLocations,
  selectLocationId,
  selectHostGroups,
  selectHostGroupId,
  selectOperatingSystems,
  selectOperatingSystemId,
  selectSmartProxies,
  selectSmartProxyId,
  selectSetupInsights,
  selectSetupRemoteExecution,
  selectJwtExpiration,
  selectInsecure,
  selectOSTemplate,
  selectConfigParams,
} from './RegistrationSelectors';

import * as Actions from './RegistrationActions';
import {
  configParamOptions,
  tooltipText,
  osTemplateHelp,
  validateJWT,
} from './RegistrationHelpers';

import Form from '../common/forms/Form';
import FormField from '../common/forms/FormField';
import Select from '../common/forms/Select';
import Slot from '../common/Slot';

import CommandField from './components/CommandField';

const Registration = ({ originalScope }) => {
  const dispatch = useDispatch();

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [jwtError, setJwtError] = useState(null);

  const apiStatusFormData = useSelector(selectAPIStatusFormData);
  const apiStatusCommand = useSelector(selectAPIStatusCommand);
  const isLoading = apiStatusFormData === STATUS.PENDING;

  const formValues = useSelector(selectRegistration);

  const organizations = useSelector(selectOrganizations);
  const organizationId = useSelector(selectOrganizationId);

  const locations = useSelector(selectLocations);
  const locationId = useSelector(selectLocationId);

  const hostGroups = useSelector(selectHostGroups);
  const hostGroupId = useSelector(selectHostGroupId);

  const operatingSystems = useSelector(selectOperatingSystems);
  const operatingSystemId = useSelector(selectOperatingSystemId);

  const smartProxies = useSelector(selectSmartProxies);
  const smartProxyId = useSelector(selectSmartProxyId);

  const setupInsights = useSelector(selectSetupInsights);
  const setupRemoteExecution =
    useSelector(selectSetupRemoteExecution) ||
    originalScope.configParams?.host_registration_remote_execution;
  const jwtExpiration = useSelector(selectJwtExpiration);
  const insecure = useSelector(selectInsecure);
  const osTemplate = useSelector(selectOSTemplate);
  const configParams = useSelector(selectConfigParams);

  // vsechny akce presunout do helpers
  const handleOS = payload => {
    onChange(payload);
    dispatch(get(Actions.osTemplateAction(payload.value)));
  };

  const onChange = payload => {
    dispatch(Actions.updateFormAction(payload));
  };

  const submit = e => {
    e.preventDefault();
    dispatch(post(Actions.generateCommandAction(formValues)));
  };

  useEffect(() => {
    if (!organizationId) {
      const newOrganizationId =
        originalScope.organizationId || originalScope.organizations[0]?.id;
      dispatch(
        Actions.updateFormAction({
          key: 'organizationId',
          value: newOrganizationId,
        })
      );
    }

    if (!locationId) {
      const newLocationId =
        originalScope.locationId || originalScope.locations[0]?.id;
      dispatch(
        Actions.updateFormAction({ key: 'locationId', value: newLocationId })
      );
    }

    if (organizationId && locationId) {
      const params = {
        // eslint-disable camelcase
        organization_id: organizationId,
        location_id: locationId,
        hostgroup_id: hostGroupId,
        operatingsystem_id: operatingSystemId,
      };

      dispatch(get(Actions.apiFormDataAction(params)));
    }
  }, [
    dispatch,
    originalScope,
    organizationId,
    locationId,
    hostGroupId,
    operatingSystemId,
  ]);

  if (apiStatusFormData === STATUS.ERROR) {
    return (
      <Alert type="error">
        {__(
          'There was an error while loading the data, try refreshing the page.'
        )}
      </Alert>
    );
  }

  return (
    <Form
      onSubmit={e => submit(e)}
      onCancel={() => {
        window.location.href = foremanUrl('/hosts');
      }}
      submitting={apiStatusCommand === STATUS.PENDING}
      submitBtnText={__('Generate command')}
      className="form-horizontal well registration-form"
    >
      <FormField label={__('Organization')}>
        <Select
          id="organization_id"
          name="organization_id"
          value={organizationId}
          options={organizations.map(org => ({
            label: org.name,
            value: org.id,
          }))}
          onChange={e =>
            onChange({ key: 'organizationId', value: e.target.value })
          }
          disabled={isLoading}
        />
      </FormField>
      <FormField label={__('Location')}>
        <Select
          id="location_id"
          name="location_id"
          value={locationId}
          options={locations.map(loc => ({
            label: loc.name,
            value: loc.id,
          }))}
          onChange={e => onChange({ key: 'locationId', value: e.target.value })}
          disabled={isLoading}
        />
      </FormField>

      <FormField label={__('Host Group')} labelHelp={tooltipText.hostGroup}>
        <Select
          id="hostgroup_id"
          name="hostgroup_id"
          value={hostGroupId}
          options={hostGroups.map(hg => ({ label: hg.name, value: hg.id }))}
          onChange={e =>
            onChange({ key: 'hostgroupId', value: e.target.value })
          }
          disabled={isLoading}
          allowClear
        />
      </FormField>

      <FormField
        label={__('Operating System')}
        labelHelp={tooltipText.operatingSystem}
      >
        <Select
          id="operatingsystem_id"
          name="operatingsystem_id"
          value={operatingSystemId}
          options={operatingSystems.map(os => ({
            label: os.title,
            value: os.id,
          }))}
          onChange={e =>
            handleOS({ key: 'operatingsystemId', value: e.target.value })
          }
          disabled={isLoading}
          allowClear
        />
        <span className="help-block help-inline">
          <small>{osTemplateHelp(operatingSystemId, osTemplate)}</small>
        </span>
      </FormField>

      <FormField label={__('Smart Proxy')} labelHelp={tooltipText.smartProxy}>
        <Select
          id="smart_proxy_id"
          name="smart_proxy_id"
          value={smartProxyId}
          options={smartProxies.map(sp => ({ label: sp.name, value: sp.id }))}
          onChange={e =>
            onChange({ key: 'smartProxyId', value: e.target.value })
          }
          disabled={isLoading}
          allowClear
        />
      </FormField>

      <FormField label={__('Insecure')} labelHelp={tooltipText.insecure}>
        <input
          type="checkbox"
          id="insecure"
          name="insecure"
          onChange={() => onChange({ key: 'insecure', value: !insecure })}
          disabled={isLoading}
        />
      </FormField>

      <Slot
        isLoading={isLoading}
        onChange={onChange}
        id="host-registration-form-general-fields"
        multi
      />
      {!showAdvanced && (
        <FormField>
          <a href="#" onClick={() => setShowAdvanced(!showAdvanced)}>
            {__('Display advanced fields')}
          </a>
        </FormField>
      )}

      {showAdvanced && (
        <React.Fragment>
          <FormField>
            <a href="#" onClick={() => setShowAdvanced(!showAdvanced)}>
              {__('Hide advanced fields')}
            </a>
          </FormField>

          <FormField
            label={__('Setup Insights')}
            labelHelp={tooltipText.insights}
          >
            <Select
              id="setup_insights"
              name="setup_insights"
              value="inherit"
              options={configParamOptions(
                setupInsights || configParams?.host_registration_insights
              )}
              onChange={e =>
                onChange({ key: 'setupInsights', value: e.target.value })
              }
              disabled={isLoading}
            />
          </FormField>

          <FormField label={__('Remote Execution')} labelHelp={tooltipText.rex}>
            <Select
              id="setup_remote_execution"
              name="setup_remote_execution"
              value="inherit"
              options={configParamOptions(
                setupRemoteExecution ||
                  configParams?.host_registration_remote_execution
              )}
              onChange={e =>
                onChange({ key: 'setupRemoteExecution', value: e.target.value })
              }
              disabled={isLoading}
            />
          </FormField>

          <FormField
            label={__('Token Lifetime')}
            labelHelp={tooltipText.token}
            error={jwtError}
            required
          >
            <input
              id="jwt_expiration"
              name="jwt_expiration"
              defaultValue={jwtExpiration}
              onChange={e => validateJWT(e.target.value, setJwtError, onChange)}
              className="form-control"
              type="number"
              min="1"
              required="required"
              disabled={isLoading}
            />
          </FormField>

          <Slot
            isLoading={isLoading}
            onChange={onChange}
            id="host-registration-form-advanced-fields"
            multi
          />
        </React.Fragment>
      )}
      <CommandField />
    </Form>
  );
};

// Registration.propTypes = {
//   currentOrganizationId: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]),
//   currentLocationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   currentConfigParams: PropTypes.object,
// };

// Registration.defaultProps = {
//   currentOrganizationId: undefined,
//   currentLocationId: undefined,
//   currentConfigParams: undefined,
// };

export const reducers = { registration: reducer };
export default Registration;
