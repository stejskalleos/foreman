import React, { useEffect, useRef } from 'react';
import { TypeAheadSelect } from 'patternfly-react';

import NavItem from './NavItem';
import { foremanUrl } from '../../../common/helpers';
import { translate as __ } from '../../../common/I18n';

const SearchMenu = ({ items }) => {
  const textInput = useRef(null);


  const options = items
    .map(item => item.children)
    .flat()
    .filter(item => item.type === 'item')
    .map(item => ({ label: item.name, value: item.url }));

  const handleChange = value => {
    if (value.length > 0) {
      window.location.href = foremanUrl(value[0].value);
    }
  };

  const handleKeyDown = e => {
    const target = e.target.tagName;

    if (e.keyCode === 192) {
      if (target === 'TEXTAREA' || target === 'INPUT') {
        return;
      }
      e.preventDefault();
      textInput.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <NavItem className="navbar-form navbar-left">
      <form className="form-inline">
        <div className="form-group">
          <TypeAheadSelect
            options={options}
            multiple={false}
            placeholder="Press ` and go to ..."
            onChange={value => handleChange(value)}
            ref={textInput}
          />
        </div>
      </form>
    </NavItem>
  );
};

export default SearchMenu;
