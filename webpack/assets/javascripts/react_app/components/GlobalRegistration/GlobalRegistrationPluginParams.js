import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'patternfly-react';

import CommonForm from '../common/forms/CommonForm';

const GlobalRegistrationPluginParams = ({ params, onChangeHandler }) => (
  <div>
    {params.map((param, i) => (
      <div key={param.key}>
        <Grid.Row>
          <Grid.Col md={8}>
            <CommonForm label={param.label} className={`grt-${param.key}`}>
              <input
                type="text"
                className="form-control"
                name={param.key}
                onChange={e => onChangeHandler(e)}
              />
            </CommonForm>
          </Grid.Col>
        </Grid.Row>
        <br />
      </div>
    ))}
  </div>
);

GlobalRegistrationPluginParams.propTypes = {
  params: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default GlobalRegistrationPluginParams;
