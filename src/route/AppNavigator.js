import React,{Component} from 'react';
import { createSwitchNavigator,createStackNavigator,createAppContainer } from 'react-navigation';
import Main from '../screens/Main';
import AuthLoading from '../screens/AuthLoading';
import Login from '../screens/Login';
import Register from '../screens/Register';


const AppStack = createStackNavigator({ Home: Main });
const AuthStack = createStackNavigator({ Login: Login });

const switchNavigator = createSwitchNavigator (
    {
        AuthLoading: Register,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
)

export default createAppContainer(switchNavigator);