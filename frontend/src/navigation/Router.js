import { createStackNavigator } from 'react-navigation';
import { RouteNames } from './RouteNames';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export const NonLoggedAppRouter = createStackNavigator(
  {
    [RouteNames.auth]: { screen: AuthScreen },
    [RouteNames.login]: { screen: LoginScreen },
    [RouteNames.register]: { screen: RegisterScreen },
  },
  {
    initialRouteName: 'AuthScreen',
    navigationOptions: {
      header: null,
    },
  },
);
