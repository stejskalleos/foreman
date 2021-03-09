import React from 'react';
import { FormSelectOption } from '@patternfly/react-core';

import { foremanUrl } from '../../../../foreman_tools';
import { translate as __ } from '../../../common/I18n';

// Form helpers
export const emptyOption = length => (
  <FormSelectOption
    value=""
    label={length > 0 ? '' : __('Nothing to select.')}
  />
);

// OperatingSystem helpers

export const validatedOS = (operatingSystemId, template) => {
  if (!operatingSystemId) {
    return 'default';
  }

  if (template?.name) {
    return 'success';
  }
  return 'error';
};

export const osHelperText = (operatingSystemId, template) => {
  if (!operatingSystemId || template === undefined) {
    return <>&nbsp;</>;
  }

  if (template?.name) {
    return (
      <span>
        {__('Initial configuration template')}:{' '}
        <a href={foremanUrl(template.path)}>{template.name}</a>
      </span>
    );
  }
  return (
    <span className="has-error">
      <a href={foremanUrl(template.os_path)}>Operating system</a>{' '}
      {__('does not have assigned registration template')}
    </span>
  );
};

export const formatOSname = os =>
  `${os.name} ${os.major}${os.minor && `.${os.minor}`}`;
