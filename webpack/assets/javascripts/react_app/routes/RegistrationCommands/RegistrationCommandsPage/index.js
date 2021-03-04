import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { translate as __ } from '../../../common/I18n';
import { get, post } from '../../../redux/API';
import { foremanUrl } from '../../../../foreman_tools';

import {
  useForemanOrganization,
  useForemanLocation,
} from '../../../Root/Context/ForemanContext';
import { STATUS } from '../../../constants';

import {
  Alert,
  Form,
  Grid,
  GridItem,
} from '@patternfly/react-core';

import PageLayout from '../../common/PageLayout/PageLayout';
import Slot from '../../../components/common/Slot';

import Taxonomies from './fields/Taxonomies';
import HostGroup from './fields/HostGroup';
import OperatingSystem from './fields/OperatingSystem';
import SmartProxy from './fields/SmartProxy';
import Insecure from './fields/Insecure';
import Advanced from './fields/Advanced';
import ConfigParams from './fields/ConfigParams';
import TokenLifeTime from './fields/TokenLifeTime';
import Command from './fields/Command';
import Actions from './fields/Actions';

import {
  selectAPIStatusData,
  selectAPIStatusCommand,
} from './RegistrationCommandsPageSelectors';
import { dataAction, commandAction } from './RegistrationCommandsPageActions';

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
  const [formData, setFormData] = useState({
    smartProxyId: undefined,
    insecure: false,
    setupInsights: '',
    setupRemoteExecution: '',
    jwtExpiration: 4,
  });

  const updateFormData = data => {
    setFormData({ ...formData, ...data });
  };

  // Tohle by melo byt soucasti update Form asi
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
      ...formData,
    };

    dispatch(post(commandAction(params)));
  };

  useEffect(() => {
    setHostGroupId();
    setOperatingSystemId();
    setFormData({ smartProxyId: undefined });

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
        <GridItem span={4}>
          <Form onSubmit={e => submit(e)}>
            {apiStatusData === STATUS.ERROR && (
              <Alert
                variant='danger'
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
              smartProxyId={formData?.smartProxyId}
              handleSmartProxy={updateFormData}
              isLoading={isLoading}
            />

            <Insecure
              value={formData?.insecure}
              handleInsecure={updateFormData}
              isLoading={isLoading}
            />

            <Slot
              isLoading={isLoading}
              taxonomies={ {organizationId: organizationId, locationId: locationId }}
              onChange={updateFormData}
              id='registrationGeneral'
              multi
            />

            <Advanced show={showAdvanced} handleShow={setShowAdvanced} />

            {showAdvanced && (
              <>
                <ConfigParams
                  setupInsights={formData?.setupInsights}
                  setupRemoteExecution={formData?.setupRemoteExecution}
                  onChange={updateFormData}
                  isLoading={isLoading}
                />
                <TokenLifeTime
                  value={formData?.jwtExpiration}
                  onChange={updateFormData}
                  isLoading={isLoading}
                  handleInvalidFields={handleInvalidFields}
                />
                <Slot
                  taxonomies={ { organizationId: organizationId, locationId: locationId }}
                  isLoading={isLoading}
                  onChange={updateFormData}
                  id='registrationAdvanced'
                  multi
                />
                <Actions
                  isDisabled={isLoading || invalidFields.length > 0}
                  isGenerating={isGenerating}
                  submit={submit}
                />
              </>
            )}
            <Command />
          </Form>
        </GridItem>
      </Grid>
    </PageLayout>
  );
};

export default RegistrationCommandsPage;


// Ideas:
// -> SetupRemoteExecution je hovadina, to by se melo jmenovat deploy SSH keys
