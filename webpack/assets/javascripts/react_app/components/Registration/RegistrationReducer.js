import Immutable from 'seamless-immutable';

import { REGISTRATION_UPDATE_FORM } from './RegistrationConstants';

const initialState = Immutable({
  organizationId: undefined,
  locationId: undefined,
  hostgroupId: undefined,
  operatingsystemId: undefined,
  smartProxyId: undefined,
  setupInsights: undefined,
  setupRemoteExecution: undefined,
  jwtExpiration: 4,
  insecure: false,
});

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case REGISTRATION_UPDATE_FORM:
      return state.setIn([payload.key], payload.value);
    default:
      return state;
  }
};
