import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, AsyncStorage } from 'react-native';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';

//======= React Native Tab View =======//

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

//============= Tab Menu =============//

import Explore from './tabmenu/Explore';
import Destination from './tabmenu/Destination';
import Booking from './tabmenu/Booking';
import Profile from './tabmenu/Profile';
import Chat from './tabmenu/Chat';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        {
          key: 'first',
          title: 'Explore',
          icon: 'home'
        },
        {
          key: 'second',
          title: 'Destination',
          icon: 'rocket1'
        },
        {
          key: 'third',
          title: 'Chat',
          icon: 'message1'
        },
        {
          key: 'fourth',
          title: 'Booking',
          icon: 'profile'
        },
        {
          key: 'five',
          title: 'Profile',
          icon: 'user'
        }
      ]
    };
  }

  async componentWillMount() {
    const userToken = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user');
    console.log('TOKEN ', userToken);
    console.log('DATA ', userData);
  }

  render() {
    return (
      <View style={styles.bodyParent}>
        <TabView
          tabBarPosition="bottom"
          navigationState={this.state}
          renderScene={SceneMap({
            first: Explore,
            second: Destination,
            third: Chat,
            fourth: Booking,
            five: Profile
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: '#EF4453' }}
              style={{ backgroundColor: 'white', height: 50 }}
              labelStyle={{ color: 'black', fontSize: 0 }}
              renderIcon={({ route, focused, color }) => (
                <AntDesign
                  name={route.icon}
                  color={focused ? '#EF4453' : 'grey'}
                  size={20}
                />
              )}
            />
          )}
        />
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  bodyParent: {
    flex: 1
  }
});
