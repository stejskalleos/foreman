import React from 'react';
import { Link } from 'react-router-dom';

import { ActionGroup, Button, Tooltip } from '@patternfly/react-core';

import { translate as __ } from '../../../../common/I18n';
import { foremanUrl } from '../../../../../foreman_tools';

const Actions = ({ isDisabled, isGenerating, submit }) => {
  return (
    <ActionGroup>
      <Button
        variant='primary'
        onClick={e => submit(e)}
        isDisabled={isDisabled}
        isLoading={isGenerating}
      >
        {isGenerating ? __('Generating ...') : __('Generate')}
      </Button>
      {/* Can't use <RedirectCancelButton> -> infinitive loading loop */}
      <Link to={foremanUrl('/hosts')}>
        <Button variant='link'>{__('Cancel')}</Button>
      </Link>
    </ActionGroup>
  );
};

export default Actions;
