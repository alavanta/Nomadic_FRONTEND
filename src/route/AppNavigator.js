import React, { Component } from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Main from '../screens/Main';
import AuthLoading from '../screens/AuthLoading';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Profile from '../screens/tabmenu/Profile';
import Package from '../screens/Package';
import PrivateChat from '../screens/PrivateChat';
import PackageDetail from '../screens/PackageDetail';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import otpCode from '../screens/ForgotPassword/otpCode';
import Maps from '../screens/Maps';
import Checkout from '../screens/Checkout/Checkout';
import ProfileEdit from '../screens/Account/ProfileEdit';

const AppStack = createStackNavigator(
  {
    Home: Home,
    Profile: Profile,
    ProfileEdit: ProfileEdit,
    PrivateChat: PrivateChat,
    PackageDetail: PackageDetail,
    Package: Package,
    Checkout: Checkout,
    Maps: Maps
  },
  {
    headerMode: 'none'
  }
);
const AuthStack = createStackNavigator(
  {
    Main: Main,
    Login: Login,
    Register: Register,
    ForgotPassword: ForgotPassword,
    otpCode: otpCode
  },
  {
    headerMode: 'none'
  }
);

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default createAppContainer(switchNavigator);
