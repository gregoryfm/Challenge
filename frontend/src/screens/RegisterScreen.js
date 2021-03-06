// @flow

import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import Button from '../components/Button';
import Input from '../components/Input';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';
import { IMAGES } from '../utils/assets/images';

type Props = {
  navigation: Object,
};

type State = {
  name: string,
  email: string,
  password: string,
};

class RegisterScreen extends React.Component<Props, State> {
  state = {
    name: '',
    email: '',
    password: '',
  };

  handleRegister = ( createUser ) => {
    const { navigation } = this.props;
    const { name, email, password } = this.state;

    if (!name || !email || !password) {
      alert('Fill out all the fields!');
    } else {
      createUser({
        variables: { name, email, password }
      })
      .then(() => {
        alert('User successfully registered.');
        navigation.navigate(RouteNames.auth);
      })
      .catch(error => alert(error));
    }
  }

  render() {
    return (
      <Mutation mutation={REGISTER_USER}>

          { createUser => {
            return (
              <KeyboardWrapper>
                <ScrollView>
                  <TextWrapper>
                    <HeaderButton onPress={() => this.props.navigation.goBack()}>
                      <ReturnIcon />
                      <BigText>Create an Account</BigText>
                    </HeaderButton>
                    <Input
                      autoCorrect
                      placeholder="Name"
                      autoCapitalize="words"
                      onChangeText={text => this.setState({ name: text })} />
                    <Input
                      placeholder="Email"
                      autoCorrect={false}
                      onChangeText={text => this.setState({ email: text })} />
                    <Input
                      placeholder="Password"
                      autoCorrect={false}
                      secureTextEntry
                      onChangeText={text => this.setState({ password: text })}
                      />
                  </TextWrapper>
                </ScrollView>
                <ButtonsWrapper>
                  <Button onPress={() => this.handleRegister(createUser)}>
                    <ButtonText>Register</ButtonText>
                  </Button>
                </ButtonsWrapper>
              </KeyboardWrapper>
            );
          }}
        </Mutation>
    )
  }
}

const REGISTER_USER = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name
      email: $email
      password: $password
    ) {
      name
      email
      password
    }
  }
`;

const BigText = styled.Text`
  width: 350px;
  font-size: 36px;
  font-weight: bold;
  margin-left: 10;
  margin-top: -7px;
  color: ${props => props.theme.colors.bigTextColor};
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.buttonTextColor};
`;

const TextWrapper = styled.View`
  flex: 3;
`;

const ButtonsWrapper = styled.View`
  flex: 1;
  position: absolute;
  bottom: 20;
  left: 20;
  right: 20;
`;

const KeyboardWrapper = styled.KeyboardAvoidingView.attrs({
  enabled: true,
  behavior: Platform.OS === 'ios' ? 'padding' : '',
})`
  flex: 1;
  background-color: ${props => props.theme.colors.mainBackgroundColor};
`;

const HeaderButton = styled.TouchableOpacity`
  padding: 35px 0 20px 0;
  margin-left: 10;
  flexDirection: row;
`;

const ReturnIcon = styled.Image.attrs({
  source: IMAGES.ARROW,
})`
  width: 35;
  height: 26;
  tint-color: white;
`;

export default withNavigation(RegisterScreen);
