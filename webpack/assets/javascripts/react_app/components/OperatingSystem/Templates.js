import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, FieldLevelHelp, LoadingState } from 'patternfly-react';

import { translate as __ } from '../../common/I18n';
import { STATUS } from '../../constants';
import { get } from '../../redux/API';
import { foremanUrl } from '../../../foreman_tools';

import { OPERATING_SYSTEM_TEMPLATES } from './TemplatesConst';
import {
  selectApiStatus,
  selectTemplateKinds,
  selectTemplates,
} from './TemplatesSelectors';

import CommonForm from '../common/forms/CommonForm';
import Select from '../common/forms/Select';

const OperatingSystemTemplates = () => {
  const dispatch = useDispatch();
  const apiStatus = useSelector(selectApiStatus);
  const templateKinds = useSelector(selectTemplateKinds);
  const templates = useSelector(selectTemplates);

  const templatesByKind = kindId => {
    const filtered = templates.filter(t => t.template_kind_id === kindId);
    return filtered.map(t => ({
      label: t.name,
      value: t.id,
    }));
  };

  useEffect(() => {
    const params = {
      url: foremanUrl('/operatingsystems/templates'),
      key: OPERATING_SYSTEM_TEMPLATES,
    };

    dispatch(get(params));
  }, [dispatch]);

  if (apiStatus === STATUS.ERROR) {
    return (
      <Alert type="error">
        {__(
          'There was an error while loading the templates, try refreshing the page.'
        )}
      </Alert>
    );
  }

  return (
    <LoadingState loading={!templates.length && apiStatus === STATUS.PENDING}>
      {templateKinds.map((kind, i) => (
        <CommonForm
          label={kind.name}
          key={`${kind.id}-${kind.name}`}
          tooltipHelp={
            kind.description && (
              <FieldLevelHelp content={kind.description} placement="right" />
            )
          }
        >
          <Select
            name={`operatingsystem[os_default_templates_attributes][${i}][provisioning_template_id]`}
            id={`operatingsystem_os_default_templates_attributes_${i}_provisioning_template_id`}
            options={templatesByKind(kind.id)}
            allowClear
          />

          <input
            type="hidden"
            name={`operatingsystem[os_default_templates_attributes][${i}][template_kind_id`}
            id={`operatingsystem_os_default_templates_attributes_${i}_template_kind_id`}
            value={kind.id}
          />
        </CommonForm>
      ))}
    </LoadingState>
  );
};

export default OperatingSystemTemplates;
