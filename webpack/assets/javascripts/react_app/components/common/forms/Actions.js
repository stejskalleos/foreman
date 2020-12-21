import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';

import { noop } from '../../../common/helpers';
import { simpleLoader } from '../Loader';
import { translate as __ } from '../../../../react_app/common/I18n';

const FormActions = ({ onCancel, disabled, submitting, submitBtnText }) => (
  <div className="clearfix">
    <div className="form-actions">
      <Button bsStyle="primary" type="submit" disabled={disabled || submitting}>
        &nbsp;
        {submitBtnText || __('Submit')}
        {submitting && <span className="fr">{simpleLoader('sm')}</span>}
      </Button>
      {' ' /* adds whitespace between the buttons */}
      <Button bsStyle="default" onClick={onCancel} disabled={submitting}>
        {__('Cancel')}
      </Button>
    </div>
  </div>
);

FormActions.propTypes = {
  disabled: PropTypes.bool,
  submitting: PropTypes.bool,
  onCancel: PropTypes.func,
  submitBtnText: PropTypes.string,
};

FormActions.defaultProps = {
  disabled: false,
  submitting: false,
  onCancel: noop,
  submitBtnText: null,
};

export default FormActions;
