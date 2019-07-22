import React, {Component} from 'react';
import AppNavigation from './src/route/AppNavigator';
import store from './src/public/redux/store';
import {Provider} from 'react-redux';

import Main from './src/screens/Main'


export default class App extends Component{
  render() {
    return (
      <Provider store={store}>  
        <AppNavigation/>
       </Provider>
    )
  }
}