import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import AddButton from '../../components/AddButton';
import { RouteNames } from '../../navigation/RouteNames';
import { FlatList } from "react-native";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";

class BooksScreen extends Component {

  state = {
    books: [],
  };

  fetch = (client) => client.query({ query: queryBooks })
  .then(result => {
    const { books } = result.data;
    return this.setState({ books });
  })
  .catch(e => {
    e && console.log(e);
  });

  render() {
    const { navigation } = this.props;
    const { books } = this.state;
    return (
      <Wrapper>
        <BigText>Book List</BigText>
        <ApolloConsumer>
          { client => {
            if (!books.length) {
              this.fetch(client);
            }
            return (
              <FlatList
                data={books}
                keyExtractor={item => item.id}
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
  query {
    books {
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
