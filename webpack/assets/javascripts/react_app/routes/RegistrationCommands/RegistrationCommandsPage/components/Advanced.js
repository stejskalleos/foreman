import React from 'react';
import PropTypes from 'prop-types';

import ConfigParams from './fields/ConfigParams';
import TokenLifeTime from './fields/TokenLifeTime';

const Advanced = ({
  configParams,
  setupRemoteExecution,
  setupInsights,
  handleInsights,
  handleRemoteExecution,
  jwtExpiration,
  handleJwtExpiration,
  handleInvalidField,
  isLoading,
}) => (
  <>
    <ConfigParams
      configParams={configParams}
      setupRemoteExecution={setupRemoteExecution}
      setupInsights={setupInsights}
      handleInsights={handleInsights}
      handleRemoteExecution={handleRemoteExecution}
      isLoading={isLoading}
    />
    <TokenLifeTime
      value={jwtExpiration}
      onChange={handleJwtExpiration}
      handleInvalidField={handleInvalidField}
      isLoading={isLoading}
    />
  </>
);

Advanced.propTypes = {
  configParams: PropTypes.object,
  setupRemoteExecution: PropTypes.string,
  setupInsights: PropTypes.string,
  handleInsights: PropTypes.func.isRequired,
  handleRemoteExecution: PropTypes.func.isRequired,
  jwtExpiration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleJwtExpiration: PropTypes.func.isRequired,
  handleInvalidField: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Advanced.defaultProps = {
  configParams: {},
  setupRemoteExecution: '',
  setupInsights: '',
  jwtExpiration: 4,
};

export default Advanced;
