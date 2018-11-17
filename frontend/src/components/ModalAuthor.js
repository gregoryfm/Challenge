import React from 'react';
import AddButton from './AddButton';
import { ApolloConsumer } from "react-apollo";
import { withNavigation, NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import { IMAGES } from '../utils/assets/images';
import {
  Modal,
  FlatList,
  TouchableOpacity
} from 'react-native';

class ModalAuthor extends React.Component {
  render() {
    const { modalVisible, authors, onPressAction, onPressAddAuthor,
      fetch, fetchMore, refreshing, onRefresh, navigation } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <View>
          <ApolloConsumer>
            { client => {
              if (!authors.length) {
                fetch(client);
              }
              return (
                <View>
                  <HeaderButton onPress={() => navigation.goBack()}>
                    <ReturnIcon />
                    <BigText>Authors</BigText>
                  </HeaderButton>
                  <FlatList
                    data={authors}
                    refreshing={refreshing}
                    onRefresh={() => onRefresh(client)}
                    onEndReachedThreshold={0.2}
                    onEndReached={ () => fetchMore(client)}
                    ListEmptyComponent={() =>
                      <TextEmptyList>No authors registered</TextEmptyList>
                    }
                    keyExtractor={item => item.id}
                    renderItem={ ({item}) =>
                      <TouchableOpacity onPress={() => onPressAction(item)}>
                        <ItemCard>
                          <ItemCardText>{item.name}, {item.age} years old</ItemCardText>
                        </ItemCard>
                      </TouchableOpacity>
                    }
                    />
                </View>
              )
            }}
          </ApolloConsumer>
          <AddAuthorButton onPress={() => onPressAddAuthor()} />
        </View>
      </Modal>
    )
  }
}

const View = styled.View`
  background-color: ${props => props.theme.colors.mainBackgroundColor};
  height: 100%;
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

const BigText = styled.Text`
  width: 150px;
  font-size: 36px;
  font-weight: bold;
  margin-left: 10;
  margin-top: -7px;
  color: ${props => props.theme.colors.bigTextColor};
`;

const ItemCard = styled.View`
  background-color: ${props => props.theme.colors.cardBackgroundColor};
  flex-grow: 1;
  flex-basis: 0;
  margin: 10px 7px 10px 7px;
  padding: 20px;
  height: 110;
  border-radius: 10;
`;

const ItemCardText = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-size: 25px;
`;

const AddAuthorButton = styled(AddButton)`
  bottom: 5%;
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

export default withNavigation(ModalAuthor);
