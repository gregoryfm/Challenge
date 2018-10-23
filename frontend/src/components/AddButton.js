import React from 'react';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { IMAGES } from '../utils/assets/images';

const Wrapper = styled.TouchableOpacity`
  ${Platform.select({
    ios: css`
      shadow-color: grey;
      shadow-offset: 0px 0px;
      shadow-radius: 2px;
      shadow-opacity: 2px;`,
    android: css`
        elevation: 5;`
  })};
  background-color: white;
  align-items: center;
  justify-content: center;
  width: 70;
  height: 70;
  border-radius: 35;
  bottom: 20;
  right: 20;
  position: absolute;
`;

const Icon = styled.Image.attrs({ source: IMAGES.ADD })`
  width: 30;
  height: 30;
  tint-color: palevioletred;
`;

const AddButton = (props) => (
  <Wrapper {...props}>
    <Icon />
  </Wrapper>
);

export default AddButton;
