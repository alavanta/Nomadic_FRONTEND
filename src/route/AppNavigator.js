import React,{Component} from 'react';
import { createSwitchNavigator,createStackNavigator,createAppContainer } from 'react-navigation';
import Main from '../screens/Main';
import AuthLoading from '../screens/AuthLoading';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Package from '../screens/Package'

const AppStack = createStackNavigator (
    { 
        Home, Package
    },
    {
        headerMode:"none"
    }
);
const AuthStack = createStackNavigator (
    {
        Main: Main,
        Login: Login,
        Register: Register,
    },
    {
        headerMode:"none"
    }
);


const switchNavigator = createSwitchNavigator (
    {
        AuthLoading: Home,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
);

export default createAppContainer(switchNavigator);