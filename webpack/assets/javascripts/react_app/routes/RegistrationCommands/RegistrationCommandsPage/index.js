import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Alert, Form, Grid, GridItem } from '@patternfly/react-core';

import { translate as __ } from '../../../common/I18n';
import { get, post } from '../../../redux/API';
import {
  useForemanOrganization,
  useForemanLocation,
} from '../../../Root/Context/ForemanContext';
import { STATUS } from '../../../constants';

import PageLayout from '../../common/PageLayout/PageLayout';
import Slot from '../../../components/common/Slot';

import {
  selectAPIStatusData,
  selectAPIStatusCommand,
  selectPluginData,
} from './RegistrationCommandsPageSelectors';
import { dataAction, commandAction } from './RegistrationCommandsPageActions';

import Taxonomies from './fields/Taxonomies';
import HostGroup from './fields/HostGroup';
import OperatingSystem from './fields/OperatingSystem';
import SmartProxy from './fields/SmartProxy';
import Insecure from './fields/Insecure';
import ConfigParams from './fields/ConfigParams';
import TokenLifeTime from './fields/TokenLifeTime';
import Advanced from './fields/Advanced';
import Actions from './fields/Actions';
import Command from './fields/Command';

const RegistrationCommandsPage = () => {
  const dispatch = useDispatch();

  const currentOrganization = useForemanOrganization();
  const currentLocation = useForemanLocation();
  const apiStatusData = useSelector(selectAPIStatusData);
  const apiStatusCommand = useSelector(selectAPIStatusCommand);

  const isLoading = apiStatusData === STATUS.PENDING;
  const isGenerating = apiStatusCommand === STATUS.PENDING;

  const [showAdvanced, setShowAdvanced] = useState(true); // TODO: change to false
  const [invalidFields, setInvalidFields] = useState([]);

  const [organizationId, setOrganizationId] = useState(currentOrganization?.id);
  const [locationId, setLocationId] = useState(currentLocation?.id);
  const [hostGroupId, setHostGroupId] = useState();
  const [operatingSystemId, setOperatingSystemId] = useState();
  const [smartProxyId, setSmartProxyId] = useState();
  const [insecure, setInsecure] = useState(false);
  const [setupRemoteExecution, setSetupRemoteExecution] = useState('');
  const [setupInsights, setSetupInsights] = useState('');
  const [jwtExpiration, setJwtExpiration] = useState(4);

  const pluginData = useSelector(selectPluginData);
  const [pluginValues, setPluginValues] = useState({});

  const updatePluginValues = data => {
    setPluginValues({ ...pluginValues, ...data });
  };

  // // Tohle by melo byt soucasti update Form asi
  // -> Plus v helpers zejo
  const handleInvalidFields = (field, isValid) => {
    if (isValid) {
      setInvalidFields(invalidFields.filter(f => f !== field));
    } else if (!invalidFields.find(f => f === field)) {
      const fields = invalidFields;
      fields.push(field);
      setInvalidFields(fields);
    }
  };

  const submit = e => {
    e.preventDefault();

    const params = {
      organizationId,
      locationId,
      hostGroupId,
      operatingSystemId,
      ...pluginValues,
    };

    dispatch(post(commandAction(params)));
  };

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
    if (!hostGroupId && !operatingSystemId) {
      return;
    }
    const params = {
      organization_id: organizationId,
      location_id: locationId,
      hostgroup_id: hostGroupId, // TODO: Mohlo by to bejt hostGroupId
      operatingsystem_id: operatingSystemId, // TODO: To same!
    };
    dispatch(get(dataAction(params)));
  }, [dispatch, hostGroupId, operatingSystemId]);

  return (
    <PageLayout header={__('Register Host')} searchable={false}>
      <Grid>
        <GridItem span={6}>
          <Form onSubmit={e => submit(e)}>
            {apiStatusData === STATUS.ERROR && (
              <Alert
                variant="danger"
                title={__(
                  'There was an error while loading the data, see the logs for more information.'
                )}
              />
            )}
            <Taxonomies
              organizationId={organizationId}
              handleOrganization={setOrganizationId}
              locationId={locationId}
              handleLocation={setLocationId}
              isLoading={isLoading}
            />

            <HostGroup
              hostGroupId={hostGroupId}
              handleHostGroup={setHostGroupId}
              isLoading={isLoading}
            />

            <OperatingSystem
              operatingSystemId={operatingSystemId}
              handleOperatingSystem={setOperatingSystemId}
              isLoading={isLoading}
            />

            <SmartProxy
              smartProxyId={smartProxyId}
              handleSmartProxy={setSmartProxyId}
              isLoading={isLoading}
            />

            <Insecure
              insecure={insecure}
              handleInsecure={setInsecure}
              isLoading={isLoading}
            />

            <Slot
              taxonomies={{
                organizationId,
                locationId,
              }}
              id="registrationGeneral"
              pluginData={pluginData}
              pluginValues={pluginValues}
              onChange={updatePluginValues}
              isLoading={isLoading}
              multi
            />

            <Advanced show={showAdvanced} handleShow={setShowAdvanced} />

            {showAdvanced && (
              <>
                <ConfigParams
                  setupRemoteExecution={setupRemoteExecution}
                  setupInsights={setupInsights}
                  handleInsights={setSetupInsights}
                  handleRemoteExecution={setSetupRemoteExecution}
                  isLoading={isLoading}
                />
                <TokenLifeTime
                  value={jwtExpiration}
                  onChange={setJwtExpiration}
                  handleInvalidFields={handleInvalidFields} // Toto je spatne
                  isLoading={isLoading}
                />
                <Slot
                  taxonomies={{
                    organizationId,
                    locationId,
                  }}
                  id="registrationAdvanced"
                  pluginData={pluginData}
                  pluginValues={pluginValues}
                  onChange={updatePluginValues}
                  isLoading={isLoading}
                  multi
                />
              </>
            )}
            <Actions
              isDisabled={isLoading || invalidFields.length > 0}
              isGenerating={isGenerating}
              submit={submit}
            />
            <Command />
          </Form>
        </GridItem>
      </Grid>
    </PageLayout>
  );
};

export default RegistrationCommandsPage;
