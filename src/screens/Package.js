import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TextInput,
  AsyncStorage
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';

//============= Reducer =============//
import { fetchPackages } from '../public/redux/action';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

class Package extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  async componentWillMount() {
    await AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        this.props.dispatch(fetchPackages(result)).then(data => {
          this.setState({ data: data.value.data.data });
        });
      }
    });
  }

  renderContent = () => {
    if (this.state.data !== null) {
      return (
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PackageDetail', {
                  packageId: item.id
                })
              }
              style={styles.card}
            >
              <Image
                source={{
                  uri: item.package_image
                }}
                style={styles.image}
              />
              <View>
                <Text numberOfLines={1} style={styles.name}>
                  {item.package_name}
                </Text>
                <Text numberOfLines={2} style={styles.description}>
                  {item.package_description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      );
    }
  };

  render() {
    // console.log(this.state.data, 'DATA YANG ADA');

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrowleft" type="antdesign" color="#444" size={25} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              marginRight: 10,
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <TextInput
              placeholderTextColor="#999"
              placeholder="Type here..."
              style={styles.searchInput}
            />
            <TouchableOpacity>
              <Text style={styles.searchButton}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>{this.renderContent()}</View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    packages: state.packages.data
  };
};

export default connect(mapStateToProps)(withNavigation(Package));

const { height, width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#FFF',
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    marginHorizontal: 10,
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(30,30,30,0.1)'
  },
  searchButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#555',
    padding: 8,
    backgroundColor: '#555',
    color: '#FFF',
    elevation: 4
  },
  body: {
    backgroundColor: '#FFF',
    margin: 10
  },
  card: {
    padding: 7,
    borderRadius: 2,
    elevation: 3,
    backgroundColor: '#FFF'
  },
  image: {
    borderRadius: 2,
    height: width / 3
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    margin: 4,
    color: '#555'
  },
  description: {
    margin: 4
  }
});
