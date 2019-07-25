import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { Button, Icon, Card } from 'react-native-elements';
import MyBookingIsLogin from '../../components/MyBookingIsLogin';
import { fetchBooking } from '../../public/redux/action';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      bookingData: booking
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        console.log(result);
        this.props.dispatch(fetchBooking(result));
      }
    });
  }

  BookedList = ({ item, index }) => (
    <TouchableOpacity
      style={{ flex: 1, flexDirection: 'row' }}
      onPress={() =>
        this.props.navigation.navigate('BookingDetail', { id: item.id })
      }
    >
      <Card
        image={{ uri: item.package_image }}
        containerStyle={{ width: '90%' }}
        title={item.package_name}
      >
        <View style={{ flexDirection: 'column' }}>
          <Text>{item.date_start}</Text>
          <Text style={{ fontWeight: 'bold' }}>Rp. {item.package_price}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  render() {
    if (this.props.booking.isLoading) {
      return (
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center'
          }}
        >
          <ActivityIndicator size="large" color="#FF4453" animating={true} />
        </View>
      );
    } else {
      // console.log(this.props.booking.isError, 'DARI BOOKING');
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: '100%',
              height: '10%',
              flexDirection: 'row',
              justifyContent: 'flex-start'
              // alignItems: 'center'
            }}
          >
            <View>
              <Text style={{ fontSize: 20, margin: 25, fontWeight: 'bold' }}>
                My Bookings
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {this.state.isLogin === false ? (
              <MyBookingIsLogin
                title={'My Bookings'}
                description={'Login to check your orders'}
              />
            ) : this.props.booking.isError == true ? (
              <View>
                <Image
                  source={require('../../assets/list.png')}
                  style={{
                    alignSelf: 'center',
                    width: 80,
                    height: 80,
                    marginBottom: 15
                  }}
                />
                <Text style={{ fontSize: 17, alignSelf: 'center' }}>
                  No booking..yet
                </Text>
                <Button
                  containerStyle={{ alignSelf: 'center' }}
                  buttonStyle={{
                    backgroundColor: '#EF4453',
                    width: 120,
                    marginTop: 10
                  }}
                  title="Explore Now"
                />
              </View>
            ) : (
              <View style={{ flex: 1, marginBottom: 10 }}>
                <FlatList
                  keyExtractor={item => {
                    item.id.toString();
                  }}
                  data={this.props.booking.booking}
                  renderItem={this.BookedList}
                />
              </View>
            )}
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    booking: state.booking
  };
};

export default connect(mapStateToProps)(withNavigation(Booking));
