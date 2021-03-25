import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, TextInput, Popover } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { translate as __ } from '../../../../../common/I18n';

const Repository = ({
  repo,
  handleRepo,
  repoGpg,
  handleRepoGpg,
  isLoading,
}) => (
  <>
    <FormGroup
      label={__('Repository')}
      fieldId="reg_smart_proxy"
      labelIcon={
        <Popover
          bodyContent={__(
            "Repository URL / details, for example for Debian OS family: 'deb http://deb.example.com/ buster 1.0', for Red Hat OS family: 'http://rpm.example.com/'"
          )}
        >
          <button
            className="pf-c-form__group-label-help"
            onClick={e => e.preventDefault()}
          >
            <HelpIcon noVerticalAlign />
          </button>
        </Popover>
      }
    >
      <TextInput
        id="reg_repo"
        value={repo}
        type="text"
        onChange={handleRepo}
        isDisabled={isLoading}
      />
    </FormGroup>
    <FormGroup
      label={__('Repository GPG key')}
      fieldId="reg_smart_proxy"
      labelIcon={
        <Popover bodyContent={__('GPG key for the repository')}>
          <button
            className="pf-c-form__group-label-help"
            onClick={e => e.preventDefault()}
          >
            <HelpIcon noVerticalAlign />
          </button>
        </Popover>
      }
    >
      <TextInput
        id="reg_repo_gpg"
        value={repoGpg}
        type="text"
        onChange={handleRepoGpg}
        isDisabled={isLoading}
      />
    </FormGroup>
  </>
);

Repository.propTypes = {
  repo: PropTypes.string,
  repoGpg: PropTypes.string,
  handleRepo: PropTypes.func.isRequired,
  handleRepoGpg: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Repository.defaultProps = {
  repo: '',
  repoGpg: '',
};

export default Repository;
