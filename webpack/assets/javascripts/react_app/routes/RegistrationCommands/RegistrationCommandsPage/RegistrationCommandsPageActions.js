import { foremanUrl } from '../../../../foreman_tools';

import {
  REGISTRATION_COMMANDS_DATA,
  REGISTRATION_COMMANDS_OS_TEMPLATE,
  REGISTRATION_COMMANDS,
} from '../constants';

export const dataAction = params => ({
  key: REGISTRATION_COMMANDS_DATA,
  url: foremanUrl('/hosts/register/data'),
  params,
});

export const operatingSystemTemplateAction = operatingSystemId => ({
  key: REGISTRATION_COMMANDS_OS_TEMPLATE,
  url: foremanUrl(`/hosts/register/os/${operatingSystemId}`),
});

export const commandAction = params => ({
  key: REGISTRATION_COMMANDS,
  url: foremanUrl('/hosts/register'),
  params,
});
