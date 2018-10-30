
import React from 'react';
import styled from 'styled-components/native';

const Input = (props) => (
  <InputWrapper>
    <TextInput {...props} />
  </InputWrapper>
);

const InputWrapper = styled.View`
  padding: 5px;
  margin-top: 24px;
`;

const TextInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
})`
  border: 2px solid white;
  border-radius: 20px;
  height: 60;
  width: 100%;
  font-size: 20;
  color: antiquewhite;
  font-weight: bold;
  margin-bottom: -10px;
  padding-left: 10px;
`;

export default Input;
