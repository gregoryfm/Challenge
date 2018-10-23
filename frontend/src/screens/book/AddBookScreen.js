import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ModalAuthor from '../../components/ModalAuthor';
import { RouteNames } from '../../navigation/RouteNames';

class BooksScreen extends Component {
  state = {
    modalVisible: false,
    author: undefined,
    authors: [],
    title: '',
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  fetch = (client) => client.query({ query: queryAuthors })
  .then(result => {
    const { authors } = result.data;
    return this.setState({ authors });
  })
  .catch(e => {
    e && console.log(e);
  });

  onPressAction = item => {
    this.setState({ author: item, modalVisible: false });
  }

  onPressAddAuthor = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('AddAuthorScreen');
  }

  handleSave = ( createBook ) => {
    const { title, author } = this.state;
    const { navigation } = this.props;
    if (!title && !author) {
      alert('Fill out all the fields!');
    } else {
      createBook({ variables: { title, authorId: author.id }})
      .then(() => {
        alert("Book added successfully.");
        navigation.navigate(RouteNames.books);
      })
      .catch(error => alert(error));
    }
  }

  render() {
    const { navigation } = this.props;
    const { author, authors, modalVisible } = this.state;
    return (
      <Mutation mutation={ADD_BOOK}>
        { createBook => {
          return (
            <Wrapper>
              <BigText>New Book</BigText>
              <Input
                autoCorrect
                autoCapitalize="words"
                placeholder="Book Title"
                onChangeText={text => this.setState({ title: text })} />
              {
                !author && (
                  <Input
                    placeholder="Author"
                    onFocus={() => this.setModalVisible(true)} />
                )
                ||
                (
                  <Input
                    onFocus={() => this.setModalVisible(true)}
                    value={`${author.name}, ${author.age} years old`} />
                )
              }
              <ModalAuthor
                navigation={this.props.navigation}
                modalVisible={modalVisible}
                authors={authors}
                onPressAction={this.onPressAction}
                onPressAddAuthor={this.onPressAddAuthor}
                fetch={this.fetch} />

              <ButtonsWrapper>
                <Button onPress={() => this.handleSave(createBook)}>
                  <ButtonText>Save</ButtonText>
                </Button>
                <Button onPress={() => navigation.goBack()}>
                  <ButtonText>Return</ButtonText>
                </Button>
              </ButtonsWrapper>
            </Wrapper>
          )
        }}
      </Mutation>
    );
  }
}

const queryAuthors = gql`
  query {
    authors {
      id
      name
      age
    }
  }
`;

const ADD_BOOK = gql`
  mutation($title: String!, $authorId: String!) {
    createBook( title: $title, author: { _id: $authorId }) {
      title
      author {
        name
        age
      }
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

const Wrapper = styled.View`
  flex: 1;
  background-color: palevioletred;
`;

const ButtonsWrapper = styled.View`
  flex: 1;
  position: absolute;
  bottom: 20;
  left: 20;
  right: 20;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

export default withNavigation(BooksScreen);
