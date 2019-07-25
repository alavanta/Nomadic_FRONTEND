/**
 * @format
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Splash from './src/screens/Splash';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

class Main extends Component {
  constructor(properties) {
    super(properties);
    this.state = { currentScreen: 'Splash' };
    setTimeout(() => {
      this.setState({ currentScreen: 'App' });
    }, 3000);

    OneSignal.init('90673f44-2b1e-4f5b-9de9-4b008c53d201');
    OneSignal.inFocusDisplaying(2);

    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure(); // triggers the ids event
  }

  componentWillUnmount() {
    // OneSignal.removeEventListener('received', this.onReceived);
    // OneSignal.removeEventListener('ids', this.onIds);
    // OneSignal.removeEventListener('opened', this.onOpened);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    const { currentScreen } = this.state;
    let mainScreen = currentScreen === 'Splash' ? <Splash /> : <App />;
    return mainScreen;
  }
}

AppRegistry.registerComponent(appName, () => Main);
