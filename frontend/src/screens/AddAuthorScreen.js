import React from 'react';
import { ScrollView, Platform, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import Button from '../components/Button';
import Input from '../components/Input';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';

class AddAuthorScreen extends React.Component {

  state = {
    name: '',
    age: null,
  };

  handleSave = ( createAuthor ) => {
    const { name, age } = this.state;
    if (!name || !age) {
      alert('Fill out all the fields!');
    } else {
      createAuthor({ variables: { name, age: Number(age) }})
      .then(() => {
        alert("Author added successfully");
      })
      .catch(error => alert(error));
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <Mutation mutation={ADD_AUTHOR}>
          { createAuthor => {
            return (
              <KeyboardWrapper>
                <ScrollView>
                  <TextWrapper>
                    <BigText>New Author</BigText>
                    <Input
                      placeholder="Name"
                      autoCorrect
                      autoCapitalize="words"
                      onChangeText={text => this.setState({ name: text })} />
                    <Input
                      placeholder="Age"
                      keyboardType="number-pad"
                      onChangeText={text => this.setState({ age: text })} />
                  </TextWrapper>
                </ScrollView>
                <ButtonsWrapper>
                  <Button onPress={() => this.handleSave(createAuthor)}>
                    <ButtonText>Save</ButtonText>
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

const ADD_AUTHOR = gql`
  mutation($name: String!, $age: Int!) {
    createAuthor(name: $name, age: $age) {
      name
      age
    }
  }
`;

const BigText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  padding: 20px 0 20px 0;
  margin-left: 10;
  margin-top: 10;
  color: white;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: white
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
  background-color: palevioletred;
`;

export default withNavigation(AddAuthorScreen);
