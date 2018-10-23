import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { RouteNames } from './RouteNames';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BooksScreen from '../screens/book/BooksScreen';
import AddBookScreen from '../screens/book/AddBookScreen';
import AddAuthorScreen from '../screens/AddAuthorScreen';

const LoggedAppRouter = createStackNavigator(
  {
    [RouteNames.books]: { screen: BooksScreen },
    [RouteNames.add_book]: { screen: AddBookScreen },
    [RouteNames.add_author]: { screen: AddAuthorScreen },
  },
  {
    initialRouteName: RouteNames.books,
    navigationOptions: { header: null },
  },
);

const NonLoggedAppRouter = createStackNavigator(
  {
    [RouteNames.auth]: { screen: AuthScreen },
    [RouteNames.login]: { screen: LoginScreen },
    [RouteNames.register]: { screen: RegisterScreen },
  },
  {
    initialRouteName: RouteNames.auth,
    navigationOptions: { header: null },
  },
);

export const createRootNavigator = (token) =>
  createSwitchNavigator(
    {
      [RouteNames.logged]: LoggedAppRouter,
      [RouteNames.non_logged]: NonLoggedAppRouter,
    },
    {
      initialRouteName: token ? RouteNames.logged : RouteNames.non_logged,
    },
  );
