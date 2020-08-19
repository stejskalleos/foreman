import { GLOBAL_REGISTRATION } from './GlobalRegistrationConstants';
import {
  selectAPIByKey,
  selectAPIError,
  selectAPIResponse,
} from '../../redux/API/APISelectors';

export const selectRegisterCommand = state =>
  selectAPIResponse(state, GLOBAL_REGISTRATION).registerCommand || null;

export const selectStatus = state =>
  selectAPIByKey(state, GLOBAL_REGISTRATION).status || null;
export const selectError = state => selectAPIError(state, GLOBAL_REGISTRATION);
