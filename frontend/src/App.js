import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { createRootNavigator } from './navigation/Router';
import ContextProvider from './ContextProvider';
import client from './ApolloConfig';

export default class App extends Component {
  state = {
    token: '',
    isTokenRetrieved: false,
  };

  componentWillMount() {
    // AsyncStorage.clear();
    AsyncStorage.getItem('token')
    .then(value => {
      this.setState({
        token: value,
        isTokenRetrieved: true,
      });
    });
}

  render() {
    const { token, isTokenRetrieved } = this.state;
    const Launch = createRootNavigator(token);

    return (
      <ApolloProvider client={client}>
        <ContextProvider>
          {isTokenRetrieved ? <Launch /> : null}
        </ContextProvider>
      </ApolloProvider>
    );
  }
}
