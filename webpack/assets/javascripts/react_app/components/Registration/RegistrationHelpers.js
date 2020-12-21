import React from 'react';
import { translate as __ } from '../../common/I18n';
import { foremanUrl } from '../../../foreman_tools';

// rename configParamOptions
export const configParamOptions = (paramValue = '') => {
  const paramValueYN = paramValue ? __('Yes') : __('No');

  return [
    {
      label: `${__('Inherit from Host parameter')} (${paramValueYN})`,
      value: 'inherit',
    },
    { label: __('Yes (enforce)'), value: 'true' },
    { label: __('No (enforce)'), value: 'false' },
  ];
};

export const tooltipText = {
  hostGroup: __('TODO'),
  operatingSystem: __(
    'The operating system needs to be set in case the registration process does not detect the OS automatically. If the autodetection fails, this could be used to override the assigned OS used for the registration.'
  ),
  smartProxy: __(
    'Only Smart Proxies with enabled Registration module are available'
  ),
  insights: __(
    'If selected, Insights client will be installed and registered on Red Hat family operating systems. It has no effect on other OS families that do not support it.'
  ),
  rex: __('If selected, SSH keys will be installed on the registered host.'),
  token: __('Expiration of the authorization token in hours.'),
  insecure: __(
    'If the target machine does not trust the Foreman SSL certificate, the initial connection could be subject to Man in the middle attack. If you accept the risk and do not require the server authenticity to be verified, you can enable insecure argument for the initial curl. Note that all subsequent communication is then properly secured, because the initial request deploys the SSL certificate for the rest of the registration process.'
  ),
};

export const osTemplateHelp = (os, template) => {
  if (!os || template === undefined) {
    return '';
  }

  if (template.name === null) {
    return (
      <span className="has-error">
        <a href={foremanUrl(template.os_path)}>Operating system</a>{' '}
        {__('does not have assigned registration template')}
      </span>
    );
  }

  return (
    <span>
      {__('Registration template')}:{' '}
      <a href={foremanUrl(template.path)}>{template.name}</a>
    </span>
  );
};

export const validateJWT = (value, setJwtError, setValue) => {
  if (!Number.isInteger(+value)) {
    setJwtError(__('Must be integer'));
    return;
  }

  if (+value < 1) {
    setJwtError(__('Minimum value is 1 hour'));
    return;
  }

  if (+value >= 999999999) {
    setJwtError(__('Maximum value is 999 999 999 hours'));
    return;
  }

  setJwtError(null);
  setValue({ key: 'jwtExpiration', value });
};

export const submitForm = () => {};
