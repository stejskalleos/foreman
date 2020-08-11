import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'patternfly-react';
import CommonForm from '../common/forms/CommonForm';

const GRPluginParams = ({params, onChangeHandler}) => {
  return(
    <div>
      {params.map(param => (
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
}

export default GRPluginParams;
