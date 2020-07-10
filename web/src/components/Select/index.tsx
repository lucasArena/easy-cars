import React, { useRef, useEffect, useCallback, useState } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}
const Select: React.FC<Props> = ({ name, options, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  const [selected, setSelected] = useState(defaultValue || '');

  const handleSelect = useCallback((e) => {
    return setSelected(e.value);
  }, []);

  useEffect(() => {
    setSelected(defaultValue || '');
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'props.value.value',
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <ReactSelect
        value={
          selected &&
          options &&
          options.find((option) => option.value === selected)
        }
        onChange={(e) => handleSelect(e)}
        options={options}
        ref={selectRef}
        classNamePrefix="react-select"
        styles={{
          control: (styles) => ({
            ...styles,
            height: 57,
            borderRadius: 10,
            background: '#232129',
          }),
          option: (styles) => ({
            ...styles,
            height: 57,
            color: '#666360',
          }),
        }}
        {...rest}
      />
    </Container>
  );
};
export default Select;
