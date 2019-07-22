import React,{Component} from 'react';
import { createSwitchNavigator,createStackNavigator,createAppContainer } from 'react-navigation';
import Main from '../screens/Main';
import AuthLoading from '../screens/AuthLoading';


const stackNavigator = createStackNavigator( 
    {
        Home : Main
    }
)

const switchNavigator = createSwitchNavigator (
    {
        AuthLoading : AuthLoading,
        Main : stackNavigator
    },
    {
        initialRouteName: 'AuthLoading'
    }
)

export default createAppContainer(switchNavigator);