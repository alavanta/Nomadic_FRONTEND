import React, { Component } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { fetchBookingById } from '../public/redux/action';
import { connect } from 'react-redux';

class BookingDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      isLoading: false
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        console.log(this.props.navigation.getParam('id'));
        this.props
          .dispatch(
            fetchBookingById(result, this.props.navigation.getParam('id'))
          )
          .then(() => {
            this.setState({ isLoading: false });
          });
      }
    });
  }

  priceFormating = price => {
    let totalPrice = price;
    let number_string = totalPrice.toString(),
      remains = number_string.length % 3,
      idr = number_string.substr(0, remains),
      Thousands = number_string.substr(remains).match(/\d{3}/g);

    if (Thousands) {
      separator = remains ? '.' : '';
      idr += separator + Thousands.join('.');
    }
    return idr;
  };

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.9],
      extrapolate: 'clamp'
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -(width * 0.3)],
      extrapolate: 'clamp'
    });

    if (this.state.isLoading) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator
            style={{ marginTop: height / 2 }}
            size="large"
            color="red"
            animating={true}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          <View style={styles.priceTag}>
            <Text style={styles.subTitle}>Tour Guide Name</Text>
            <Text style={styles.caption}>
              {this.props.bookingById.guide_name}
            </Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.subTitle}>Price</Text>
            <Text style={styles.caption}>
              Rp. {this.props.bookingById.package_price}
            </Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.subTitle}>Destinations</Text>
            {/* <FlatList
                            data={this.props.packages.package.destinations}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            horizontal={true}
                            style={styles.flatlist}
                            showsHorizontalScrollIndicator={false}
                        /> */}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('PrivateChat', {
                id: this.props.navigation.getParam('id')
              })
            }
            style={styles.button}
          >
            <Text style={{ color: '#FFF', fontWeight: '500', fontSize: 16 }}>
              CHAT
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={{ uri: this.props.bookingById.package_image }}
          />
          <Animated.View>
            <View style={styles.bar}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="arrowleft"
                  type="antdesign"
                  color="#FFF"
                  size={25}
                />
              </TouchableOpacity>
              <View style={styles.headerContent}>
                <Text numberOfLines={1} style={styles.name}>
                  {this.props.bookingById.package_name}
                </Text>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = width;
const HEADER_MIN_HEIGHT = width * 0.4;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  fill: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#EF4453',
    overflow: 'hidden',
    elevation: 4
  },
  headerContent: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  },
  bar: {
    height: '100%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 20
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover'
  },
  name: {
    color: '#FFF',
    fontSize: 18,
    marginRight: 10,
    marginLeft: 50
  },
  priceTag: {
    marginTop: HEADER_MAX_HEIGHT + 20,
    backgroundColor: '#FFF',
    padding: 10
  },
  description: {
    backgroundColor: '#FFF',
    marginTop: 20,
    padding: 10
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 16
  },
  caption: {
    fontSize: 12
  },
  footer: {
    backgroundColor: '#FFF',
    height: 50,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#EF4453',
    padding: 10,
    width: width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 5,
    width: '100%',
    height: '100%'
  },
  flatlist: {
    marginTop: 20
  },
  destinations: {
    elevation: 4
  },
  destination: {
    backgroundColor: '#FFF',
    elevation: 4,
    margin: 6,
    width: width / 4
  }
});

const mapStateToProps = state => {
  return {
    booking: state.booking,
    bookingById: state.booking.bookingById
  };
};

export default connect(mapStateToProps)(withNavigation(BookingDetail));
