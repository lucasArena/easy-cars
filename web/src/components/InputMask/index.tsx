import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';

import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface Props extends InputProps {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}
const InputMask: React.FC<Props> = ({
  name,
  icon: Icon,
  disabled,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [mask, setMask] = useState(defaultValue || '');

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(mask);
  }, [mask]);

  const handleInputFocus = useCallback(() => [setIsFocused(true)], []);

  const handleMask = useCallback((e) => {
    const { value } = e.target;
    return setMask(value);
  }, []);

  useEffect(() => {
    setMask(defaultValue || '');
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'props.value',
      clearValue: (pickerRef) => {
        pickerRef.setInputValue(null);
      },
    });
  }, [registerField, fieldName]);
  return (
    <Container
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      disabled={disabled}
    >
      {Icon && <Icon size={20} />}

      <ReactInputMask
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        disabled={disabled}
        value={mask}
        onChange={(e) => handleMask(e)}
        maskChar=""
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default InputMask;
