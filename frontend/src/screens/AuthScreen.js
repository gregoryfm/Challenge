import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import Button from '../components/Button';
import { RouteNames } from '../navigation/RouteNames';
import { IMAGES } from '../utils/assets/images';

class AuthScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <TextWrapper>
          <FotonLogo />
        </TextWrapper>
        <ButtonsWrapper>
          <CustomButton onPress={() => navigation.navigate(RouteNames.login)}>
            <ButtonText>Login</ButtonText>
          </CustomButton>
          <CustomButton onPress={() => navigation.navigate(RouteNames.register)}>
            <ButtonText>Register</ButtonText>
          </CustomButton>
        </ButtonsWrapper>
      </View>
    );
  }
}

const View = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.mainBackgroundColor};
  padding: 20px;
`;

const FotonLogo = styled.Image.attrs({ source: IMAGES.FOTON })`
  width: 200px;
  height: 55px;
  margin-bottom: 200px;
`;

const TextWrapper = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;

const ButtonsWrapper = styled.View`
  flex: 1;
  position: absolute;
  bottom: 20;
  left: 20;
  right: 20;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.colors.buttonTextColor};
`;

const CustomButton = styled(Button)`
  border: 2px solid ${props => props.theme.colors.buttonBorderColor};;
`;

export default withNavigation(AuthScreen);
