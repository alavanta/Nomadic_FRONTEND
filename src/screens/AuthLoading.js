import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { fetchUser } from '../public/redux/action';

class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    await AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    });
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
