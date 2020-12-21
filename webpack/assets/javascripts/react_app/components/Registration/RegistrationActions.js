import { foremanUrl } from '../../../foreman_tools';
import {
  REGISTRATION_FORM_DATA,
  REGISTRATION_UPDATE_FORM,
  REGISTRATION_OS_TEMPLATE,
  REGISTRATION_COMMAND,
} from './RegistrationConstants';

export const apiFormDataAction = params => ({
  key: REGISTRATION_FORM_DATA,
  url: foremanUrl('/hosts/register'),
  params,
});

export const updateFormAction = payload => ({
  type: REGISTRATION_UPDATE_FORM,
  payload,
});

export const osTemplateAction = id => ({
  key: REGISTRATION_OS_TEMPLATE,
  url: foremanUrl(`/hosts/register/os/${id}`),
});

export const generateCommandAction = formValues => ({
  key: REGISTRATION_COMMAND,
  url: foremanUrl('/hosts/register'),
  params: formValues,
});
