import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Alert,
  Form,
  Grid,
  GridItem,
  Tab,
  Tabs,
  TabTitleText,
} from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../common/I18n';
import { get, post } from '../../../redux/API';
import {
  useForemanOrganization,
  useForemanLocation,
} from '../../../Root/Context/ForemanContext';
import { STATUS } from '../../../constants';
import { SET_INVALID_FIELD } from '../constants';
import PageLayout from '../../common/PageLayout/PageLayout';
import Slot from '../../../components/common/Slot';

import {
  selectAPIStatusData,
  selectAPIStatusCommand,
  selectOrganizations,
  selectLocations,
  selectHostGroups,
  selectInvalidFields,
  selectCommand,
  selectConfigParams,
  selectOperatingSystems,
  selectOperatingSystemTemplate,
  selectSmartProxies,
  selectPluginData,
} from './RegistrationCommandsPageSelectors';
import { dataAction, commandAction } from './RegistrationCommandsPageActions';
import reducer from './RegistrationCommandsPageReducer';

import General from './components/General';
import Advanced from './components/Advanced';
import Actions from './components/Actions';
import Command from './components/Command';

const RegistrationCommandsPage = () => {
  const dispatch = useDispatch();

  // Context
  const currentOrganization = useForemanOrganization();
  const currentLocation = useForemanLocation();

  // API statuses
  const apiStatusCommand = useSelector(selectAPIStatusCommand);
  const apiStatusData = useSelector(selectAPIStatusData);
  const isLoading = apiStatusData === STATUS.PENDING;
  const isGenerating = apiStatusCommand === STATUS.PENDING;

  // Form data
  const organizations = useSelector(selectOrganizations);
  const locations = useSelector(selectLocations);
  const hostGroups = useSelector(selectHostGroups);
  const operatingSystems = useSelector(selectOperatingSystems);
  const operatingSystemTemplate = useSelector(selectOperatingSystemTemplate);
  const smartProxies = useSelector(selectSmartProxies);
  const configParams = useSelector(selectConfigParams);
  const pluginData = useSelector(selectPluginData);

  // Form values
  const [activeTab, setActiveTab] = useState(0);
  const [organizationId, setOrganizationId] = useState(currentOrganization?.id);
  const [locationId, setLocationId] = useState(currentLocation?.id);
  const [hostGroupId, setHostGroupId] = useState();
  const [operatingSystemId, setOperatingSystemId] = useState();
  const [smartProxyId, setSmartProxyId] = useState();
  const [insecure, setInsecure] = useState(false);
  const [setupRemoteExecution, setSetupRemoteExecution] = useState('');
  const [setupInsights, setSetupInsights] = useState('');
  const [jwtExpiration, setJwtExpiration] = useState(4);
  const [repo, setRepo] = useState('');
  const [repoGpg, setRepoGpg] = useState('');
  const invalidFields = useSelector(selectInvalidFields);

  // Command
  const command = useSelector(selectCommand);

  // Plugins
  const [pluginValues, setPluginValues] = useState({});

  const handlePluginValue = data => {
    setPluginValues({ ...pluginValues, ...data });
  };

  const handleInvalidField = useCallback(
    (field, isValid) => {
      const payload = {
        field,
        isValid,
      };

      dispatch({ type: SET_INVALID_FIELD, payload });
    },
    [dispatch]
  );

  const handleSubmit = e => {
    e.preventDefault();

    const params = {
      organizationId,
      locationId,
      hostgroupId: hostGroupId,
      operatingsystemId: operatingSystemId,
      smartProxyId,
      insecure,
      setupRemoteExecution,
      setupInsights,
      jwtExpiration,
      repo,
      repoGpg,
      ...pluginValues,
    };

    dispatch(post(commandAction(params)));
  };

  const changeTab = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  // Reset form values when Organization / Location is selected
  useEffect(() => {
    setHostGroupId();
    setOperatingSystemId();
    setSmartProxyId();

    dispatch(
      get(
        dataAction({ organization_id: organizationId, location_id: locationId })
      )
    );
  }, [dispatch, organizationId, locationId]);

  useEffect(() => {
    if (hostGroupId === undefined && operatingSystemId === undefined) {
      return;
    }

    const params = {
      organization_id: organizationId,
      location_id: locationId,
      hostgroup_id: hostGroupId,
      operatingsystem_id: operatingSystemId,
    };

    dispatch(get(dataAction(params)));

    // Disabled lint warning, need to check only hostgroup_id & operatingsystem_id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, hostGroupId, operatingSystemId]);

  return (
    <PageLayout
      header={__('Register Host')}
      searchable={false}
      toolbarButtons={
        <a
          href="https://docs.theforeman.org/nightly/Managing_Hosts/index-foreman-el.html#registering-a-host-to-project-using-the-global-registration-template_managing-hosts"
          target="_blank"
          rel="noreferrer"
          className="pf-c-button pf-m-secondary pf-m-small"
        >
          <HelpIcon /> {__('Documentation')}
        </a>
      }
    >
      <Grid sm={12} md={7}>
        <GridItem>
          <Form
            onSubmit={e => handleSubmit(e)}
            className="registration"
            isHorizontal
          >
            {apiStatusData === STATUS.ERROR && (
              <Alert
                variant="danger"
                title={__(
                  'There was an error while loading the data, see the logs for more information.'
                )}
              />
            )}
            <Tabs
              activeKey={activeTab}
              onSelect={(e, tab) => changeTab(e, tab)}
            >
              <Tab
                eventKey={0}
                title={<TabTitleText>{__('General fields')}</TabTitleText>}
              >
                <div className="pf-c-form">
                  <General
                    organizationId={organizationId}
                    organizations={organizations}
                    handleOrganization={setOrganizationId}
                    locationId={locationId}
                    locations={locations}
                    handleLocation={setLocationId}
                    hostGroupId={hostGroupId}
                    hostGroups={hostGroups}
                    handleHostGroup={setHostGroupId}
                    operatingSystemId={operatingSystemId}
                    operatingSystems={operatingSystems}
                    operatingSystemTemplate={operatingSystemTemplate}
                    handleOperatingSystem={setOperatingSystemId}
                    smartProxyId={smartProxyId}
                    smartProxies={smartProxies}
                    handleSmartProxy={setSmartProxyId}
                    insecure={insecure}
                    handleInsecure={setInsecure}
                    handleInvalidField={handleInvalidField}
                    invalidFields={invalidFields}
                    isLoading={isLoading}
                  />

                  <Slot
                    id="registrationGeneral"
                    organizationId={organizationId}
                    locationId={locationId}
                    hostGroupId={hostGroupId}
                    pluginValues={pluginValues}
                    pluginData={pluginData}
                    onChange={handlePluginValue}
                    handleInvalidField={handleInvalidField}
                    isLoading={isLoading}
                    multi
                  />
                </div>
              </Tab>
              <Tab
                eventKey={1}
                title={<TabTitleText>{__('Advanced fields')}</TabTitleText>}
              >
                <div className="pf-c-form">
                  <Advanced
                    configParams={configParams}
                    setupRemoteExecution={setupRemoteExecution}
                    setupInsights={setupInsights}
                    handleInsights={setSetupInsights}
                    handleRemoteExecution={setSetupRemoteExecution}
                    jwtExpiration={jwtExpiration}
                    handleJwtExpiration={setJwtExpiration}
                    handleInvalidField={handleInvalidField}
                    pluginValues={pluginValues}
                    handlePluginValue={handlePluginValue}
                    invalidFields={invalidFields}
                    organizationId={organizationId}
                    locationId={locationId}
                    hostGroupId={hostGroupId}
                    repo={repo}
                    handleRepo={setRepo}
                    repoGpg={repoGpg}
                    handleRepoGpg={setRepoGpg}
                    isLoading={isLoading}
                  />
                  <Slot
                    id="registrationAdvanced"
                    organizationId={organizationId}
                    locationId={locationId}
                    hostGroupId={hostGroupId}
                    pluginValues={pluginValues}
                    pluginData={pluginData}
                    onChange={handlePluginValue}
                    handleInvalidField={handleInvalidField}
                    isLoading={isLoading}
                    multi
                  />
                </div>
              </Tab>
            </Tabs>
            <Actions
              isLoading={isLoading}
              isGenerating={isGenerating}
              handleSubmit={handleSubmit}
              invalidFields={invalidFields}
            />
            <Command apiStatus={apiStatusCommand} command={command} />
          </Form>
        </GridItem>
      </Grid>
    </PageLayout>
  );
};

export const reducers = { registration: reducer };
export default RegistrationCommandsPage;
