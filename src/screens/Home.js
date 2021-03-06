import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  AsyncStorage
} from 'react-native';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';

//======= React Native Tab View =======//

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

//============= Tab Menu =============//

import Explore from './tabmenu/Explore';
import Destination from './tabmenu/Destination';
import Booking from './tabmenu/Booking';
import Profile from './tabmenu/Profile';

//============= Reducer =============//
import { fetchPackages } from '../public/redux/action';
import { connect } from 'react-redux';

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
          title: 'Booking',
          icon: 'profile'
        },
        {
          key: 'third',
          title: 'Profile',
          icon: 'user'
        }
      ]
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        this.props.dispatch(fetchPackages(result));
      }
    });
  }

  render() {
    return (
      <View style={styles.bodyParent}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <TabView
          tabBarPosition="bottom"
          navigationState={this.state}
          renderScene={SceneMap({
            first: Explore,
            second: Booking,
            third: Profile
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

const mapStateToProps = state => {
  return {
    packages: state.packages.data
  };
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  bodyParent: {
    flex: 1
  }
});
