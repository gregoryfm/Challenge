import React from 'react';
import styled from 'styled-components/native';

const Button = (props) => (
  <Wrapper onPress={props.onPress} {...props}>
    {props.children}
  </Wrapper>
);

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60;
  border-radius: 50;
  margin-top: 20;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid white;
`;

export default Button;
