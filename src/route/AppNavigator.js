import React,{Component} from 'react';
import { createSwitchNavigator,createStackNavigator,createAppContainer } from 'react-navigation';
import Main from '../screens/Main';
import AuthLoading from '../screens/AuthLoading';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home'
import Profile from '../screens/tabmenu/Profile';
import ChangePassword from '../screens//account/ChangePassword';
import EditProfile from '../screens/account/EditProfile';
import Notification from '../screens/account/Notifications';


const AppStack = createStackNavigator (
    { 
        Home: Home,
        Profile: Profile,
        ChangePassword: ChangePassword,
        EditProfile: EditProfile,
        Notification: Notification
        
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
        AuthLoading: AuthLoading,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
);

export default createAppContainer(switchNavigator);