import {
  REGISTRATION_FORM_DATA,
  REGISTRATION_COMMAND,
  REGISTRATION_OS_TEMPLATE,
} from './RegistrationConstants';

import {
  selectAPIStatus,
  selectAPIResponse,
} from '../../redux/API/APISelectors';

// Form Data
// Taky rozdelit nebo ne?
export const selectAPIStatusFormData = state =>
  selectAPIStatus(state, REGISTRATION_FORM_DATA);

export const selectOrganizations = state =>
  selectAPIResponse(state, REGISTRATION_FORM_DATA).organizations || [];

export const selectLocations = state =>
  selectAPIResponse(state, REGISTRATION_FORM_DATA).locations || [];

export const selectHostGroups = state =>
  selectAPIResponse(state, REGISTRATION_FORM_DATA).hostGroups || [];

export const selectOperatingSystems = state =>
  selectAPIResponse(state, REGISTRATION_FORM_DATA).operatingSystems || [];

export const selectSmartProxies = state =>
  selectAPIResponse(state, REGISTRATION_FORM_DATA).smartProxies || [];

export const selectConfigParams = state =>
  selectAPIResponse(state, REGISTRATION_FORM_DATA).configParams || [];

// Form Values

export const selectRegistration = state => state.registration;

export const selectOrganizationId = state =>
  selectRegistration(state).organizationId;

export const selectLocationId = state => selectRegistration(state).locationId;

export const selectHostGroupId = state => selectRegistration(state).hostgroupId;

export const selectOperatingSystemId = state =>
  selectRegistration(state).operatingsystemId;

export const selectSmartProxyId = state =>
  selectRegistration(state).smartProxyId;

export const selectSetupInsights = state =>
  selectRegistration(state).setupInsights;

export const selectSetupRemoteExecution = state =>
  selectRegistration(state).setupRemoteExecution;

export const selectJwtExpiration = state =>
  selectRegistration(state).jwtExpiration;

export const selectInsecure = state => selectRegistration(state).insecure;

// OS template

export const selectOSTemplate = state =>
  selectAPIResponse(state, REGISTRATION_OS_TEMPLATE).template;

// Registration Command

export const selectAPIStatusCommand = state =>
  selectAPIStatus(state, REGISTRATION_COMMAND);

export const selectCommand = state =>
  selectAPIResponse(state, REGISTRATION_COMMAND).command || undefined;
