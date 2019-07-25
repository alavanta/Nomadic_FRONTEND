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
    OneSignal.configure(); // triggers the ids event
  }

  render() {
    const { currentScreen } = this.state;
    let mainScreen = currentScreen === 'Splash' ? <Splash /> : <App />;
    return mainScreen;
  }
}

AppRegistry.registerComponent(appName, () => Main);
