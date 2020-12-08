import React from 'react';
import { Provider } from 'react-redux';

import store from '../../../redux';
import { testComponentSnapshotsWithFixtures } from '../../../common/testHelpers';

import OperatingSystemTemplates from '../Templates';

const fixtures = {
  'should render': {}
}

describe('OperatingSystemTemplates', () => {
  testComponentSnapshotsWithFixtures(() => (
    <Provider store={store}>
      <OperatingSystemTemplates />
    </Provider>
  ),
  fixtures
  );
});
