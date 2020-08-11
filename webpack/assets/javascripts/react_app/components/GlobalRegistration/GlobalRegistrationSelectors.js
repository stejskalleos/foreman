import { GR_COMMAND } from './GlobalRegistrationConstants';
import {   selectAPIByKey,
  selectAPIError,
  selectAPIResponse, } from '../../redux/API/APISelectors';

export const selectRegisterCommand = state =>
  selectAPIResponse(state, GR_COMMAND).registerCommand || null;

// export const selectStatus = state => selectAPIStatus(state, GR_COMMAND);
export const selectStatus = state => selectAPIByKey(state, GR_COMMAND).status || null;
export const selectError = state => selectAPIError(state, GR_COMMAND);
