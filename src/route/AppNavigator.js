import React,{Component} from 'react';
import { createSwitchNavigator,createStackNavigator,createAppContainer } from 'react-navigation';
import Main from '../screens/Main';
import AuthLoading from '../screens/AuthLoading';
import Login from '../screens/Login';


const AppStack = createStackNavigator({ Home: Main });
const AuthStack = createStackNavigator({ Login: Login });

const stackNavigator = createStackNavigator( 
    {
        Home : Main
    }
)

const switchNavigator = createSwitchNavigator (
    {
        AuthLoading: AuthLoading,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
)

export default createAppContainer(switchNavigator);