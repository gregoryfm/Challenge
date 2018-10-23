import React from 'react';
import AddButton from './AddButton';
import { ApolloConsumer } from "react-apollo";
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import {
  Modal,
  FlatList,
  TouchableOpacity
} from 'react-native';

class ModalAuthor extends React.Component {
  render() {
    const { modalVisible, authors, onPressAction, onPressAddAuthor, fetch } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <View style={{marginTop: 22}}>
          <ApolloConsumer>
            { client => {
              if (!authors.length) {
                fetch(client);
              }
              return (
                <View>
                  <BigText>Authors</BigText>
                  <FlatList
                  data={authors}
                  keyExtractor={item => item.id}
                  renderItem={ ({item}) =>
                  <TouchableOpacity onPress={() => onPressAction(item)}>
                        <ItemCard>
                          <ItemCardText>{item.name}, {item.age} years old</ItemCardText>
                        </ItemCard>
                      </TouchableOpacity>
                    }
                    />
                    <AddAuthorButton onPress={() => onPressAddAuthor()} />
                  </View>
                  )
                }}
          </ApolloConsumer>
        </View>
      </Modal>
    )
  }
}

const View = styled.View`
  background-color: palevioletred;
`;

const BigText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  padding: 20px 0 20px 0;
  margin-left: 10;
  margin-top: 10;
  color: white;
`;

const ItemCard = styled.View`
  background-color: #add8e6;
  flex-grow: 1;
  flex-basis: 0;
  margin: 10px 7px 10px 7px;
  padding: 20px;
  height: 110;
  border-radius: 10;
`;

const ItemCardText = styled.Text`
  color: black;
  font-size: 25px;
`;

const AddAuthorButton = styled(AddButton)`
  bottom: 23%;
`;

export default withNavigation(ModalAuthor);
