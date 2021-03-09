import React from 'react';
import { useSelector } from 'react-redux';

import {
  FormGroup,
  FormSelectOption,
  FormSelect,
} from '@patternfly/react-core';

import { translate as __ } from '../../../../common/I18n';
import {
  selectOrganizations,
  selectLocations,
} from '../RegistrationCommandsPageSelectors';

const Taxonomies = ({
  organizationId,
  handleOrganization,
  locationId,
  handleLocation,
  isLoading,
}) => {
  const organizations = useSelector(selectOrganizations);
  const locations = useSelector(selectLocations);

  return (
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
};

export default Taxonomies;
