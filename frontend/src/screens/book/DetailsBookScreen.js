import React from 'react';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import { IMAGES } from '../../utils/assets/images';

class DetailsBookScreen extends React.Component {

  render() {
    const { navigation } = this.props;
    const book = navigation.getParam('book');
    return (
        <View>
          <HeaderButton onPress={() => navigation.goBack()}>
            <ReturnIcon />
            <BigText>Book</BigText>
          </HeaderButton>
          <Title>{book.title}</Title>
          <Details>
            By {book.author.name}, {book.author.age} years old.
          </Details>
        </View>
      );
  }
}

const View = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.mainBackgroundColor};
`;

const BigText = styled.Text`
  width: 300px;
  font-size: 36px;
  font-weight: bold;
  margin-left: 10;
  margin-top: -7px;
  color: ${props => props.theme.colors.bigTextColor};
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

const Title = styled.Text`
  font-size: 35px;
  margin-top: 30px;
  margin-bottom: 40px;
  text-align: center;
  text-transform: capitalize;
`;

const Details = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-size: 25px;
  margin-top: 25px;
  text-align: center;
`;

export default withNavigation(DetailsBookScreen);
