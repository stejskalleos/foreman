// TODO:
// -> Permissions
// -> Lint & Rubocop
// -> Ruby tests
// -> JS tests

import React, { useState } from 'react';
import { Grid } from 'patternfly-react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { get } from '../../redux/API';

import { GLOBAL_REGISTRATION } from './GlobalRegistrationConstants';
import GlobalRegistrationPluginParams from './GlobalRegistrationPluginParams';
import GlobalRegistrationCommand from './GlobalRegistrationCommand';
import GlobalRegistrationDefaultParams from './GlobalRegistrationDefaultParams';

const GlobalRegistration = ({
  organizations,
  locations,
  hostGroups,
  pluginParams,
}) => {
  const dispatch = useDispatch();

  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedHostGroup, setSelectedHostGroup] = useState(null);
  const [insecure, setInsecure] = useState(false);
  const [expiration, setExpiration] = useState(4);
  const [selectedPluginParams, setSelectedPluginParams] = useState({});

  const handleSubmit = () => {
    const params = {
      organization_id: selectedOrganization,
      location_id: selectedLocation,
      hostgroup_id: selectedHostGroup,
      insecure,
      expiration,
    };

    dispatch(
      get({
        key: GLOBAL_REGISTRATION,
        url: '/provisioning_templates/global_registration',
        params: { ...params, ...selectedPluginParams },
      })
    );
  };

  const handleParamFromPlugins = e => {
    const newValues = {
      ...selectedPluginParams,
      ...{ [e.target.name]: e.target.value },
    };

    setSelectedPluginParams(newValues);
  };

  return (
    <div>
      <GlobalRegistrationDefaultParams
        organizations={organizations}
        locations={locations}
        hostGroups={hostGroups}
        insecure={insecure}
        expiration={expiration}
        handleOrganization={setSelectedOrganization}
        handleLocation={setSelectedLocation}
        handleHostGroup={setSelectedHostGroup}
        handleInsecure={setInsecure}
        handleExpiration={setExpiration}
      />
      <GlobalRegistrationPluginParams
        params={pluginParams}
        onChangeHandler={handleParamFromPlugins}
      />

      <Grid.Row>
        <Grid.Col md={8}>
          <button onClick={handleSubmit}>Generate command</button>
        </Grid.Col>
      </Grid.Row>
      <br />

      <GlobalRegistrationCommand />
    </div>
  );
};

GlobalRegistration.propTypes = {
  organizations: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  hostGroups: PropTypes.array.isRequired,
  pluginParams: PropTypes.array.isRequired,
};

export default GlobalRegistration;
