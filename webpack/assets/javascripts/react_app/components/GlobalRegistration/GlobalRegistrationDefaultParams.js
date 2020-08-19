import React from 'react';
import { Grid } from 'patternfly-react';
import PropTypes from 'prop-types';

import Select from '../common/forms/Select';
import Checkbox from '../common/forms/Checkbox';
import CommonForm from '../common/forms/CommonForm';
import { translate as __ } from '../../common/I18n';

const GlobalRegistrationDefaultParams = ({
  organizations,
  handleOrganization,
  locations,
  insecure,
  expiration,
  handleLocation,
  hostGroups,
  handleHostGroup,
  handleInsecure,
  handleExpiration,
}) => (
  <div>
    <Grid.Row>
      <Grid.Col md={8}>
        <Select
          label={__('Organization')}
          onChange={e => handleOrganization(e.target.value)}
          className="grt-organizations-select"
          options={organizations}
          allowClear
        />
      </Grid.Col>
    </Grid.Row>
    <br />
    <Grid.Row>
      <Grid.Col md={8}>
        <Select
          label={__('Location')}
          onChange={e => handleLocation(e.target.value)}
          options={locations}
          className="grt-locations-select"
          allowClear
        />
      </Grid.Col>
    </Grid.Row>
    <br />
    <Grid.Row>
      <Grid.Col md={8}>
        <Select
          label={__('Host Group')}
          onChange={e => handleHostGroup(e.target.value)}
          options={hostGroups}
          className="grt-host-group-select"
          allowClear
        />
      </Grid.Col>
    </Grid.Row>
    <br />

    <Grid.Row>
      <Grid.Col md={8}>
        <Checkbox
          label={__('Insecure?')}
          onChange={e => handleInsecure(!insecure)}
          checked={insecure}
          className="grt-insecure"
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
            onChange={e => handleExpiration(e.target.value)}
          />
        </CommonForm>
      </Grid.Col>
    </Grid.Row>
    <br />
  </div>
);

GlobalRegistrationDefaultParams.propTypes = {
  organizations: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  hostGroups: PropTypes.array.isRequired,
  insecure: PropTypes.bool.isRequired,
  expiration: PropTypes.number.isRequired,
  handleOrganization: PropTypes.func.isRequired,
  handleLocation: PropTypes.func.isRequired,
  handleHostGroup: PropTypes.func.isRequired,
  handleInsecure: PropTypes.func.isRequired,
  handleExpiration: PropTypes.func.isRequired,
};

export default GlobalRegistrationDefaultParams;
