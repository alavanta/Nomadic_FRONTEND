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
import EditProfile from '../screens/account/EditProfile';
import Package from '../screens/Package';
import PrivateChat from '../screens/PrivateChat';
import PackageDetail from '../screens/PackageDetail';


const AppStack = createStackNavigator (
    { 
        Home: Home,
        Profile: Profile,
        //EditProfile: EditProfile,
        PrivateChat: PrivateChat,
        PackageDetail: PackageDetail,
    },
    {
        headerMode:"none"
    }
);
const AuthStack = createStackNavigator(
  {
    Main: Main,
    Login: Login,
    Register: Register
  },
  {
    headerMode: 'none'
  }
);


const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: PackageDetail,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default createAppContainer(switchNavigator);
