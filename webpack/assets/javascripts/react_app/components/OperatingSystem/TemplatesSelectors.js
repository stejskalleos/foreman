import {
  selectAPIStatus,
  selectAPIResponse,
} from '../../redux/API/APISelectors';

import { OPERATING_SYSTEM_TEMPLATES } from './TemplatesConst';

export const selectApiStatus = state =>
  selectAPIStatus(state, OPERATING_SYSTEM_TEMPLATES);

export const selectTemplateKinds = state =>
  selectAPIResponse(state, OPERATING_SYSTEM_TEMPLATES).template_kinds || [];

export const selectTemplates = state =>
  selectAPIResponse(state, OPERATING_SYSTEM_TEMPLATES).templates || [];
