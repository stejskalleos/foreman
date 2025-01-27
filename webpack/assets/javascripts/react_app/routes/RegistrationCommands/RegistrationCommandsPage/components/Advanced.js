import React from 'react';
import PropTypes from 'prop-types';

import ConfigParams from './fields/ConfigParams';
import Packages from './fields/Packages';
import Repository from './fields/Repository';
import TokenLifeTime from './fields/TokenLifeTime';
import UpdatePackages from './fields/UpdatePackages';

const Advanced = ({
  configParams,
  setupRemoteExecution,
  setupInsights,
  setupInsightsInventory,
  handleInsights,
  handleInsightsInventory,
  handleRemoteExecution,
  jwtExpiration,
  handleJwtExpiration,
  handleInvalidField,
  packages,
  handlePackages,
  repoData,
  handleRepoData,
  updatePackages,
  handleUpdatePackages,
  isLoading,
}) => (
  <>
    <ConfigParams
      configParams={configParams}
      setupRemoteExecution={setupRemoteExecution}
      setupInsights={setupInsights}
      setupInsightsInventory={setupInsightsInventory}
      handleInsights={handleInsights}
      handleInsightsInventory={handleInsightsInventory}
      handleRemoteExecution={handleRemoteExecution}
      isLoading={isLoading}
    />
    <Packages
      packages={packages}
      handlePackages={handlePackages}
      configParams={configParams}
      isLoading={isLoading}
    />
    <UpdatePackages
      updatePackages={updatePackages}
      handleUpdatePackages={handleUpdatePackages}
      isLoading={isLoading}
    />
    <Repository
      repoData={repoData}
      handleRepoData={handleRepoData}
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
  setupInsightsInventory: PropTypes.string,
  handleInsights: PropTypes.func.isRequired,
  handleInsightsInventory: PropTypes.func.isRequired,
  handleRemoteExecution: PropTypes.func.isRequired,
  jwtExpiration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleJwtExpiration: PropTypes.func.isRequired,
  handleInvalidField: PropTypes.func.isRequired,
  packages: PropTypes.string,
  repoData: PropTypes.array.isRequired,
  handlePackages: PropTypes.func.isRequired,
  handleRepoData: PropTypes.func.isRequired,
  updatePackages: PropTypes.bool,
  handleUpdatePackages: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Advanced.defaultProps = {
  configParams: {},
  setupRemoteExecution: '',
  setupInsights: '',
  setupInsightsInventory: '',
  jwtExpiration: 4,
  packages: '',
  updatePackages: false,
};

export default Advanced;
