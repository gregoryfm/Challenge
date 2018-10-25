// @flow

import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ModalAuthor from '../../components/ModalAuthor';
import { RouteNames } from '../../navigation/RouteNames';

type Props = {
  navigation: Object,
};

type State = {
  modalVisible: boolean,
  author: Object,
  listAuthors: Array<mixed>,
  fetchedAllAuthors: boolean,
  title: string,
  refreshing: boolean,
};

class BooksScreen extends Component<Props, State> {
  state = {
    modalVisible: false,
    author: { id: '', name: '', age: 0 },
    listAuthors: [],
    fetchedAllAuthors: false,
    title: '',
    refreshing: false
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  fetch = client =>
    client.query({ query: queryAuthors, fetchPolicy: "network-only" })
    .then(result => {
      const { authors } = result.data;
      if (!authors.length) {
        this.props.navigation.navigate(RouteNames.add_author);
      } else {
        return this.setState({ listAuthors: authors });
      }
    })
    .catch(e => {
      e && console.log(e);
    });

  fetchMore = client => {
    const { listAuthors, fetchedAllAuthors } = this.state;
    const last = listAuthors.length;

    if (fetchedAllAuthors) return;

    client.query({ query: queryAuthors, variables: { skip: last }, fetchPolicy: "network-only"})
      .then(result => {
        const { authors } = result.data;
        if (!authors.length) {
            return this.setState({ fetchedAllAuthors: true });
        }
        return this.setState({ listAuthors: [...listAuthors, ...authors] });
      })
      .catch(e => {
        e && console.log(e);
      });
  }

  onRefresh = client => {
    const { listAuthors } = this.state;
    client.query(
      {
        query: queryAuthors,
        variables: { skip: listAuthors.length },
        fetchPolicy: "network-only"
      }
    ).then(result => {
        const { authors } = result.data;
        if (!authors.length) {
            return this.setState({ fetchedAllAuthors: true });
        }
        return this.setState({ listAuthors: [...listAuthors, ...authors], refreshing: false });
    }).catch(e => {
      e && console.log(e);
    })
  };

  onPressAction = item => {
    this.setState({ author: item, modalVisible: false });
  }

  onPressAddAuthor = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('AddAuthorScreen');
  }

  handleSave = createBook => {
    const { title, author } = this.state;
    const { navigation } = this.props;
    if (!title && !author) {
      alert('Fill out all the fields!');
    } else {
      createBook({ variables: { title, authorId: author.id }})
      .then((result) => {
        const book = result.data.createBook;
        alert(`Book ${book.title}, added successfully.`);
        navigation.navigate(RouteNames.books);
      })
      .catch(error => alert(error));
    }
  }

  render() {
    const { navigation } = this.props;
    const { author, listAuthors, modalVisible, refreshing } = this.state;
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
                !author
                &&
                ( <Input
                    placeholder="Author"
                    onFocus={() => this.setModalVisible(true)} /> )
                ||
                ( <Input
                    onFocus={() => this.setModalVisible(true)}
                    value={`${author.name}, ${author.age} years old`} /> )
              }
              <ModalAuthor
                navigation={this.props.navigation}
                modalVisible={modalVisible}
                authors={listAuthors}
                onPressAction={this.onPressAction}
                onPressAddAuthor={this.onPressAddAuthor}
                fetch={this.fetch}
                fetchMore={this.fetchMore}
                onRefresh={this.onRefresh}
                refreshing={refreshing} />

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
  query($skip: Int, $limit: Int) {
    authors(skip: $skip, limit: $limit) {
      id
      name
      age
    }
  }
`;

const ADD_BOOK = gql`
  mutation($title: String!, $authorId: String!) {
    createBook( title: $title, author: { _id: $authorId }) {
      id
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
  color: ${props => props.theme.colors.bigTextColor};
`;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.mainBackgroundColor};
`;

const ButtonsWrapper = styled.View`
  flex: 1;
  position: absolute;
  bottom: 20;
  left: 20;
  right: 20;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.buttonTextColor};
  font-size: 20px;
  font-weight: 600;
`;

export default withNavigation(BooksScreen);
