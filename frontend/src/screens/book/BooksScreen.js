import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import AddButton from '../../components/AddButton';
import { RouteNames } from '../../navigation/RouteNames';
import { FlatList, TouchableWithoutFeedback } from "react-native";
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";

type Props = {
  navigation: Object,
};

type State = {
  listBooks: Array<mixed>,
  fetchedAllBooks: boolean,
  refreshing: boolean,
}

class BooksScreen extends Component<Props, State> {
  state = {
    listBooks: [],
    fetchedAllBooks: false,
    refreshing: false,
  };

  fetch = client => client.query({ query: queryBooks, variables: {}, fetchPolicy: "network-only" })
    .then(result => {
      const { books } = result.data;
      if (books.length)
        return this.setState({ listBooks: books });
    })
    .catch(e => {
      e && console.log(e);
    });

  fetchMore = client => {
    const { listBooks, fetchedAllBooks } = this.state;
    const last = listBooks.length;

    if (fetchedAllBooks) return;

    client.query({ query: queryBooks, variables: { skip: last }, fetchPolicy: "network-only" })
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
  };

  onRefresh = client => {
    const { listBooks } = this.state;

    client.query(
      {
        query: queryBooks,
        variables: { skip: listBooks.length },
        fetchPolicy: "network-only"
      }
    ).then(result => {
        const { books } = result.data;
        if (!books.length) {
            return this.setState({ fetchedAllBooks: true });
        }
        return this.setState({ listBooks: [...listBooks, ...books], refreshing: false });
    }).catch(e => {
      e && console.log(e);
    })
  };

  onPressItem = book => {
    this.props.navigation.navigate('DetailsBookScreen', { book });
  }

  render() {
    const { navigation } = this.props;
    const { listBooks, refreshing } = this.state;
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
                refreshing={refreshing}
                onRefresh={() => this.onRefresh(client)}
                onEndReachedThreshold={0.1}
                onEndReached={() => this.fetchMore(client)}
                ListEmptyComponent={() =>
                  <TextEmptyList>No books registered</TextEmptyList>
                }
                keyExtractor={item => item.id}
                renderItem={ ({ item }) =>
                  <TouchableWithoutFeedback onPress={() => this.onPressItem(item)}>
                    <BookCard>
                      <BookCardText>
                        {item.title} {"\n"}
                        {item.author.name}
                      </BookCardText>
                    </BookCard>
                  </TouchableWithoutFeedback>
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
  color: ${props => props.theme.colors.bigTextColor};
`;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.mainBackgroundColor};
`;

const BookCard = styled.View`
  background-color: ${props => props.theme.colors.cardBackgroundColor};
  flex-grow: 1;
  flex-basis: 0;
  margin: 10px 7px 10px 7px;
  padding: 20px;
  height: 110;
  border-radius: 10;
`;

const BookCardText = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-size: 25px;
`;

const TextEmptyList = styled.Text`
  font-size: 30px;
  justify-content: center;
  align-content: center;
  font-weight: bold;
  padding: 20px 0 20px 0;
  margin-left: 10;
  color: #CCCCCC;
`;

export default withNavigation(BooksScreen);
