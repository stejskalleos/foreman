import React from 'react';
import PropTypes from 'prop-types';

import {
  FormGroup,
  FormSelectOption,
  FormSelect,
} from '@patternfly/react-core';

import { translate as __ } from '../../../../../common/I18n';

const Taxonomies = ({
  organizationId,
  organizations,
  handleOrganization,
  locationId,
  locations,
  handleLocation,
  isLoading,
}) => (
  <>
    <FormGroup label="Organization" isRequired fieldId="reg_organization">
      <FormSelect
        value={organizationId}
        onChange={v => handleOrganization(v)}
        className="without_select2"
        id="reg_organization_select"
        isDisabled={isLoading}
        isRequired
      >
        <FormSelectOption value="" label={__('Any Organization')} />
        {organizations.map((o, i) => (
          <FormSelectOption key={i} value={o.id} label={o.name} />
        ))}
      </FormSelect>
    </FormGroup>

    <FormGroup label="Location" isRequired fieldId="reg_location">
      <FormSelect
        value={locationId}
        onChange={v => handleLocation(v)}
        className="without_select2"
        id="reg_location_select"
        isDisabled={isLoading}
        isRequired
      >
        <FormSelectOption value="" label={__('Any Location')} />
        {locations.map((l, i) => (
          <FormSelectOption key={i} value={l.id} label={l.name} />
        ))}
      </FormSelect>
    </FormGroup>
  </>
);

Taxonomies.propTypes = {
  organizationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locations: PropTypes.array,
  organizations: PropTypes.array,
  handleOrganization: PropTypes.func.isRequired,
  locationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleLocation: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Taxonomies.defaultProps = {
  organizationId: '',
  locationId: '',
  organizations: [],
  locations: [],
};

export default Taxonomies;
