// TODO:
// -> Split into smaller components
// -> JWT token scope, how?
// -> Loading fields from plugins (like activation key)
// -> tabIndex
// -> Lint & Rubocop
// -> Ruby tests
// -> JS tests

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Select from '../common/forms/Select';
import Checkbox from '../common/forms/Checkbox';
import CommonForm from '../common/forms/CommonForm';
import { get } from '../../redux/API';
import { useSelector, useDispatch } from 'react-redux';
import { GR_COMMAND } from './GlobalRegistrationConstants';
import { selectRegisterCommand, selectStatus } from './GlobalRegistrationSelectors';
import { Grid } from 'patternfly-react';
import { translate as __ } from 'foremanReact/common/I18n';
import GRPluginParams from './GRPluginParams'
import GlobalRegistrationCommand from './GlobalRegistrationCommand'

const GlobalRegistration = props => {
  const { organizations, locations, hostGroups, pluginParams } = props.data;
  const dispatch = useDispatch();

  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [selectedHostGroup, setSelectedHostGroup] = useState(null);
  const [insecure, setInsecure] = useState(false);
  const [expiration, setExpiration] = useState(4);
  const [selectedPluginParams, setSelectedPluginParams] = useState({});

  const handleSubmit = () => {
    const params = {
      organization_id: selectedOrg,
      location_id: selectedLoc,
      hostgroup_id: selectedHostGroup,
      insecure: insecure,
      expiration: expiration,
    }

    dispatch(
      get({
        key: GR_COMMAND,
        url: '/provisioning_templates/global_registration',
        params: {...params, ...selectedPluginParams },
      })
    );
  };

  const handleParamFromPlugins = (e) => {
    const newValues = {...selectedPluginParams, ...{[e.target.name]: e.target.value } }
    console.log(newValues)
    console.log(newValues)
    setSelectedPluginParams(newValues);
  }

  return (
    <div>
      <Grid.Row>
        <Grid.Col md={8}>
          {organizations.length && (
            <Select
              label={__('Organization')}
              onChange={e => setSelectedOrg(e.target.value)}
              className="grt-organizations-select"
              options={organizations}
              tabIndex={1}
            />
          )}
        </Grid.Col>
      </Grid.Row>
      <br />
      <Grid.Row>
        <Grid.Col md={8}>
          {locations.length && (
            <Select
              label={__('Location')}
              onChange={e => setSelectedLoc(e.target.value)}
              options={locations}
              className="grt-locations-select"
              tabIndex={2}
            />
          )}
        </Grid.Col>
      </Grid.Row>
      <br />
      <Grid.Row>
        <Grid.Col md={8}>
          {hostGroups.length && (
            <Select
              label={__('Host Group')}
              onChange={e => setSelectedHostGroup(e.target.value)}
              options={hostGroups}
              className="grt-host-group-select"
              tabIndex={3}
            />
          )}
        </Grid.Col>
      </Grid.Row>
      <br />
      <GRPluginParams params={pluginParams} onChangeHandler={handleParamFromPlugins} />
      <Grid.Row>
        <Grid.Col md={8}>

        <Checkbox
          label={__('Insecure?')}
          onChange={e => setInsecure(!insecure)}
          checked={insecure}
          className='grt-insecure'
          tabIndex={4}
        />
        </Grid.Col>
      </Grid.Row>
      <br />

      <Grid.Row>
        <Grid.Col md={8}>
          <CommonForm label="Expiration (hours)" className="grt-expiration">
            <input
              type="number"
              className="form-control"
              value={expiration}
              onChange={e => setExpiration(e.target.value)}
              tabIndex={5}
            />
          </CommonForm>
        </Grid.Col>
      </Grid.Row>
      <br />

      <Grid.Row>
        <Grid.Col md={8}>
          <button onClick={handleSubmit} tabIndex={6}>Generate command</button>
        </Grid.Col>
      </Grid.Row>
      <br />

      <GlobalRegistrationCommand />
    </div>
  );
};

export default GlobalRegistration;
