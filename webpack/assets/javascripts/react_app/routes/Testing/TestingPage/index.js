import React, { useState } from 'react';
import { Form, FormSelect, FormSelectOption } from '@patternfly/react-core';
import Select from '../../../components/common/forms/Select';
import { translate as __ } from '../../../common/I18n';
import PageLayout from '../../common/PageLayout/PageLayout';

const TestingPage = ({props}) => {
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

  const handler = (val) => {
    console.log(val)
    console.log(val)
    console.log(val)
    setValue(val);
  }

  // https://www.patternfly.org/2020.04/documentation/react/components/formselect#props
  return (
    <PageLayout header={__('Testing Page route')} searchable={false}>
      Input
      <input name="test-input" value={value} onChange={(e) => handler(e.target.value)} />
      <hr />
      Select:
      <Select options={options} onChange={e => handler(e.target.value)}></Select>
      <hr />
      FormSelect:
      <Form>
        <FormSelect value={value} onChange={"NOT WORKING"}>
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
