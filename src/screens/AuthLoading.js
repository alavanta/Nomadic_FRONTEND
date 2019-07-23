import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  AsyncStorage
} from 'react-native';

class AuthLoading extends Component {
  constructor(props) {
    super(props);

    StatusBar.setHidden(true);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('token');
    await AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    });
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          AlignItems: 'center'
        }}
      >
        <ActivityIndicator size="large" color="#EF4453" />
      </View>
    );
  }
}

export default AuthLoading;
