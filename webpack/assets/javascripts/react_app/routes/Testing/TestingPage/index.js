import React, { useState } from 'react';
import { Form, FormSelect, FormSelectOption } from '@patternfly/react-core';
import { translate as __ } from '../../../common/I18n';
import PageLayout from '../../common/PageLayout/PageLayout';

const TestingPage = () => {
  const [value, setValue] = useState('');

  const options = [
    { value: 'please choose', label: 'Please Choose', disabled: true },
    { value: 'mr', label: 'Mr', disabled: false },
    { value: 'miss', label: 'Miss', disabled: false },
    { value: 'mrs', label: 'Mrs', disabled: false },
    { value: 'ms', label: 'Ms', disabled: false },
    { value: 'dr', label: 'Dr', disabled: false },
    { value: 'other', label: 'Other', disabled: false },
  ];

  console.log('TestingPage');
  console.log(value);

  return (
    <PageLayout header={__('Testing Page route')} searchable={false}>
      <Form>
        <FormSelect value={value} onChange={e => setValue(e.target.value)}>
          {options.map((option, index) => (
            <FormSelectOption
              isDisabled={option.disabled}
              key={index}
              value={option.value}
              label={option.label}
            />
          ))}
        </FormSelect>
      </Form>
    </PageLayout>
  );
};

export default TestingPage;
