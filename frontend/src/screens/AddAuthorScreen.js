// @flow

import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import Button from '../components/Button';
import Input from '../components/Input';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';
import { RouteNames } from '../navigation/RouteNames';
import { IMAGES } from '../utils/assets/images';

type Props = {
  navigation: Object,
};

type State = {
 name: string,
 age: number,
};

class AddAuthorScreen extends React.Component<Props, State> {

  state = {
    name: '',
    age: 0,
  };

  handleSave = ( createAuthor ) => {
    const { name, age } = this.state;
    const { navigation } = this.props;
    if (!name || !age) {
      alert('Fill out all the fields!');
    } else {
      createAuthor({ variables: { name, age: Number(age) }})
      .then(() => {
        alert("Author added successfully");
        navigation.navigate(RouteNames.add_book);
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
                    <HeaderButton onPress={() => this.props.navigation.goBack()}>
                      <ReturnIcon />
                      <BigText>New Author</BigText>
                    </HeaderButton>
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
  width: 300px;
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
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
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

export default withNavigation(AddAuthorScreen);
