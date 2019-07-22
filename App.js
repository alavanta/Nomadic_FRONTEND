import React, {Component} from 'react';
import AppNavigation from './src/route/AppNavigator';
// import store from './src/Public/redux/store';
// import {Provider} from 'react-redux';


export default class App extends Component{
  render() {
    return (
      // <Provider store={store}>
        
        <AppNavigation
        />
      // </Provider>
    )
  }
}