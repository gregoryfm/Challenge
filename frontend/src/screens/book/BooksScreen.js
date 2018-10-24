import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import AddButton from '../../components/AddButton';
import { RouteNames } from '../../navigation/RouteNames';
import { FlatList, ActivityIndicator } from "react-native";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";

class BooksScreen extends Component {

  state = {
    listBooks: [],
    fetchedAllBooks: false,
  };

  fetch = client => client.query({ query: queryBooks, })
    .then(result => {
      const { books } = result.data;
      return this.setState({ listBooks: books });
    })
    .catch(e => {
      e && console.log(e);
    });

  fetchMore = client => {
    const { listBooks, fetchedAllBooks } = this.state;
    const last = listBooks.length;

    if (fetchedAllBooks) {
      return;
    }

    client.query({ query: queryBooks, variables: { skip: last }})
      .then(result => {
        const { books } = result.data;
        if (!books.length) {
            return this.setState({ fetchedAllBooks: true });
        }
        return this.setState({ listBooks: [...listBooks, ...books] });
      })
      .catch(e => {
        e && console.log(e);
      });
  }

  render() {
    const { navigation } = this.props;
    const { listBooks } = this.state;
    return (
      <Wrapper>
        <BigText>Book List</BigText>
        <ApolloConsumer>
          { client => {
            if (!listBooks.length) {
              this.fetch(client);
            }
            return (
              <FlatList
                data={listBooks}
                onEndReachedThreshold={0.2}
                onEndReached={ () => this.fetchMore(client)}
                keyExtractor={item => item.id}
                ListFooterComponent={ () => <ActivityIndicator /> }
                renderItem={ ({item}) =>
                  <BookCard>
                    <BookCardText>
                      {item.title} {"\n"}
                      {item.author.name}, {item.author.age} years old
                    </BookCardText>
                  </BookCard>
                }
              />
            )
          }}
        </ApolloConsumer>
        <AddButton onPress={() => navigation.navigate(RouteNames.add_book)} />
      </Wrapper>
    );
  }
}

const queryBooks = gql`
  query($skip: Int, $limit: Int) {
    books(skip: $skip, limit: $limit) {
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
  color: white;
`;

const Wrapper = styled.View`
  flex: 1;
  background-color: palevioletred;
`;

const BookCard = styled.View`
  background-color: #add8e6;
  flex-grow: 1;
  flex-basis: 0;
  margin: 10px 7px 10px 7px;
  padding: 20px;
  height: 110;
  border-radius: 10;
`;

const BookCardText = styled.Text`
  color: black;
  font-size: 25px;
`;

export default withNavigation(BooksScreen);
