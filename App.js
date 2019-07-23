import React, {Component} from 'react';
import AppNavigation from './src/route/AppNavigator';
import store from './src/public/redux/store';
import {Provider} from 'react-redux';

import { YellowBox } from 'react-native'

import Main from './src/screens/Main'

YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);


export default class App extends Component{
  render() {
    return (
      <Provider store={store}>  
        <AppNavigation/>
       </Provider>
    )
  }
}