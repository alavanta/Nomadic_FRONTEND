import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  AsyncStorage
} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { fetchUser } from '../public/redux/action';

class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();

    if (!firebase.apps.length) {
      // Your Firebase Settings
      var firebaseConfig = {
        apiKey: 'AIzaSyCkv7nDMbGawhvJHS-QP8WVjCuYuYS-cCY',
        authDomain: 'nomadic-27204.firebaseapp.com',
        databaseURL: 'https://nomadic-27204.firebaseio.com',
        projectId: 'nomadic-27204',
        storageBucket: '',
        messagingSenderId: '1043925655684',
        appId: '1:1043925655684:web:33d3d167c2e629c7'
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
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
