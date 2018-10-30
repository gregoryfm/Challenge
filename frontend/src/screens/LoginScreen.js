// @flow

import React from 'react';
import { ScrollView, Platform, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import Button from '../components/Button';
import Input from '../components/Input';
import { RouteNames } from '../navigation/RouteNames';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';

type Props = {
  navigation: Object,
};

type State = {
  email: string,
  password: string,
};

class LoginScreen extends React.Component<Props, State> {

  state = {
    email: '',
    password: '',
  };

  handleLogin = ( login ) => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    if (!email || !password) {
      alert('Fill out all the fields!');
    } else {
      login({ variables: { email, password }})
      .then(({ data }) => {
        if (data.login) {
          AsyncStorage.setItem('token', data.login.authToken);
          navigation.navigate(RouteNames.logged);
        } else {
          alert(`Unregistered User`);
        }
      })
      .catch(error => console.log(error));
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <Mutation mutation={LOGIN_USER}>
          { login => {
            return (
              <KeyboardWrapper>
                <ScrollView>
                  <TextWrapper>
                    <BigText>Login</BigText>
                    <Input
                      placeholder="Email"
                      autoCorrect={false}
                      onChangeText={text => this.setState({ email: text })} />
                    <Input
                      placeholder="Password"
                      autoCorrect={false}
                      secureTextEntry
                      onChangeText={text => this.setState({ password: text })} />
                  </TextWrapper>
                </ScrollView>
                <ButtonsWrapper>
                  <Button onPress={() => this.handleLogin(login)}>
                    <ButtonText>Login</ButtonText>
                  </Button>
                  <Button onPress={() => navigation.goBack()}>
                    <ButtonText>Return</ButtonText>
                  </Button>
                </ButtonsWrapper>
              </KeyboardWrapper>
            );
          }}
      </Mutation>
    )
  }
}

const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      email
      authToken
    }
  }
`;

const BigText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  padding: 20px 0 20px 0;
  margin-left: 10;
  margin-top: 10;
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
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
  background-color: ${props => props.theme.colors.mainBackgroundColor};
`;

export default withNavigation(LoginScreen);
