import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  Picker
} from 'react-native';
import { Icon } from 'react-native-elements';

//=============== Icons ================//

import Fontisto from 'react-native-vector-icons/dist/Fontisto';

//======== React Native Elements ========//

import Header from './Header';

import { Button } from 'react-native-elements';

import LinearGradient from 'react-native-linear-gradient';

import DateTimePicker from 'react-native-modal-datetime-picker';

import { withNavigation } from 'react-navigation';
import OneSignal from 'react-native-onesignal';

import { addCheckout } from '../../public/redux/action/checkout';
import { connect } from 'react-redux';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      date: '',
      totalPassenger: 1,
      price: 0,
      ccName: '',
      cvcNum: '',
      cardExpiry: '',
      creditCardNumber: '',
      name: '',
      address: '',
      phone: '',
      gender: 'M',
      item: null,
      userToken: null,
      errName: false,
      errCcName: '',
      errAddress: false,
      errPhone: false,
      guideId: null
    };

    OneSignal.init('90673f44-2b1e-4f5b-9de9-4b008c53d201');
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
  }

  componentWillMount() {
    this.setState({
      item: this.props.navigation.getParam('selectedItem'),
      guideId: this.props.navigation.getParam('selectedGuide')
    });
    AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        let packageId = this.props.navigation.getParam('packageId');
        this.setState({
          userToken: result,
          isloading: false
        });
      }
    });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onIds = device => {
    this.setState({ appId: device.userId });
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    let dateTrav = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    this.setState({
      date: dateTrav
    });

    this.hideDateTimePicker();
  };

  totalPassengerChange = value => {
    this.setState({
      totalPassenger: value
    });
  };

  _handlingCcNumberInput(ccNum) {
    if (ccNum.indexOf('.') >= 0 || ccNum.length > 19) {
      return;
    }
    if (ccNum.length === 4 || ccNum.length === 9 || ccNum.length === 14) {
      ccNum += ' ';
    }
    this.setState({
      creditCardNumber: ccNum
    });
  }

  _handlingCardExpiry(exDate) {
    if (exDate.indexOf('.') >= 0 || exDate.length > 5) {
      return;
    }
    if (exDate.length === 2 && this.state.cardExpiry.length === 1) {
      exDate += '/';
    }
    this.setState({
      cardExpiry: exDate
    });
  }

  nameChange = name => {
    let nameVal = /^[A-Za-z0-9 ]+$/;
    if (nameVal.test(name) === false) {
      this.setState({
        errName: 'Name input only text'
      });
      this.setState({ name });
      return false;
    } else {
      this.setState({
        name: name,
        errName: false
      });
    }
  };

  phoneChange = phone => {
    let num = /^[0-9]*$/;
    if (num.test(phone) === false) {
      this.setState({
        errPhone: 'input only numbers'
      });
      this.setState({ phone });
      return false;
    } else {
      this.setState({
        phone: phone,
        errPhone: false
      });
    }
  };

  CcNameChange = ccName => {
    let nameVal = /^[A-Za-z0-9 ]+$/;
    if (nameVal.test(ccName) === false) {
      this.setState({
        errCcName: 'Name input only text'
      });
      this.setState({ ccName });
      return false;
    } else {
      this.setState({
        ccName: ccName,
        errCcName: false
      });
    }
  };

  totalPassengerDecrement = () => {
    let dec = this.state.totalPassenger;
    let min = dec - 1;
    this.setState({
      totalPassenger: min
    });
  };

  totalPassengerIncrement = () => {
    let inc = this.state.totalPassenger;
    let plus = inc + 1;
    this.setState({
      totalPassenger: plus
    });
  };

  priceFormating = totalPrice => {
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

  checkoutHandler = () => {
    // console.log(this.state.item.package.id)
    // console.log(this.props.navigation.getParam('selectedItem'))
    this.setState({ isloading: true });
    const data = {
      number: this.state.creditCardNumber,
      cvc: this.state.cvcNum,
      amount: this.state.totalPassenger * this.state.item.package_price,
      date: this.state.date,
      totalPassenger: this.state.totalPassenger,
      packageId: this.state.item.id,
      month: parseInt(this.state.cardExpiry.toString().substring(0, 2)),
      year: parseInt(20 + this.state.cardExpiry.toString().substring(3, 5)),
      appId: this.state.appId,
      guideId: this.state.guideId
    };

    console.log(this.state, 'INI STATE');
    console.log(data, 'INI DATA YG DIKIRIM');

    this.props
      .dispatch(addCheckout(this.state.userToken, data))
      .then(() => {
        alert('Transaction Processed');
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        alert('Invalid Credit Card');
      });
    // this.props.navigation.navigate('Home')
  };

  render() {
    console.log(this.state.item);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title="Checkout" />
        <View style={styles.background}>
          <LinearGradient
            colors={['#F4A386', '#EF4453']}
            style={styles.redBackground}
          />
          <View style={styles.whiteBackground} />
        </View>

        <View style={styles.package}>
          <Text style={styles.price}>
            Rp{' '}
            {this.priceFormating(
              this.state.item.package_price * this.state.totalPassenger
            )}
          </Text>
          <View style={styles.imageWrap}>
            <Image
              style={styles.image}
              source={{
                uri: this.state.item.package_image
              }}
            />
          </View>
        </View>

        <ScrollView style={styles.container}>
          <View
            style={[
              styles.form,
              {
                flexDirection: 'row',
                alignItems: 'flex-end'
              }
            ]}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="Date"
                style={styles.textInput}
                value={this.state.date.toString()}
                editable={false}
              />
            </View>

            <Button
              buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
              icon={<Fontisto name="date" size={25} color="#ff4453" />}
              onPress={this.showDateTimePicker}
            />
          </View>

          <View style={styles.personBorder}>
            <TouchableOpacity
              style={styles.leftPersonBorder}
              disabled={this.state.totalPassenger === 1 ? true : false}
              onPress={this.totalPassengerDecrement}
            >
              <Text style={{ alignSelf: 'center', fontSize: 20 }}>-</Text>
            </TouchableOpacity>
            <View style={styles.centerPersonBorder}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  alignSelf: 'center'
                }}
              >
                {this.state.totalPassenger}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.rightPersonBorder}
              disabled={this.state.totalPassenger === 999 ? true : false}
              onPress={this.totalPassengerIncrement}
            >
              <Text style={{ alignSelf: 'center', fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 18, marginTop: 30 }}>
            Traveler Information
          </Text>

          <View>
            <TextInput
              placeholder="Full Name"
              style={styles.textInput}
              value={this.state.name}
              onChangeText={name => this.nameChange(name)}
            />
          </View>

          <View>
            <TextInput
              placeholder="Phone Number (for Emergency)"
              style={styles.textInput}
              keyboardType={'numeric'}
              maxLength={12}
              value={this.state.phone}
              onChangeText={phone => this.phoneChange(phone)}
            />
          </View>
          <View>
            <TextInput placeholder="Address" style={styles.textInput} />
          </View>

          <Text style={{ fontSize: 18, marginTop: 30 }}>
            Payment Information
          </Text>

          <View>
            <TextInput
              placeholder="Name on Credit Card"
              style={styles.textInput}
              onChangeText={ccName => this.CcNameChange(ccName)}
              value={this.state.ccName}
            />
          </View>

          <View>
            <TextInput
              placeholder="CC numbers"
              style={styles.textInput}
              keyboardType={'numeric'}
              maxLength={19}
              value={this.state.creditCardNumber}
              onChangeText={this._handlingCcNumberInput.bind(this)}
            />
          </View>

          <View>
            <TextInput
              placeholder="ex Date : MM/YY"
              style={styles.textInputPayment}
              keyboardType={'numeric'}
              maxLength={5}
              onChangeText={this._handlingCardExpiry.bind(this)}
              value={this.state.cardExpiry}
            />
          </View>

          <View>
            <TextInput
              placeholder="CVC"
              style={styles.textInputPayment}
              keyboardType={'numeric'}
              maxLength={4}
              onChangeText={cvcNum => this.setState({ cvcNum })}
              value={this.state.cvcNum}
            />
          </View>

          <View style={styles.buttonWrap}>
            <Button
              buttonStyle={styles.loginButton}
              title="Checkout"
              onPress={() => this.checkoutHandler()}
            />
          </View>
          <View style={{ height: 50 }} />
        </ScrollView>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -999,
    flexDirection: 'column'
  },
  redBackground: {
    height: 230,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: 'white'
  },
  package: {
    marginHorizontal: 20
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-start'
  },
  imageWrap: {
    height: 150,
    marginTop: 10,
    borderRadius: 50,
    elevation: 10
  },
  image: {
    resizeMode: 'cover',
    height: '100%',
    borderRadius: 10,
    zIndex: -99
  },
  container: {
    height: 300,
    backgroundColor: 'white',
    padding: 20
  },
  buttonWrap: {
    width: '100%',
    marginTop: 20
  },
  loginButton: {
    backgroundColor: '#FF4453',
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: 7
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#FF4453'
  },
  textInputPayment: {
    borderBottomWidth: 1,
    borderColor: '#FF4453',
    width: '35%'
  },
  picker: {
    height: 50,
    width: 100,
    marginTop: 10
  },
  personBorder: {
    flexDirection: 'row',
    height: '5%',
    width: '40%',
    marginTop: 20,
    alignItems: 'center'
  },
  leftPersonBorder: {
    borderWidth: 1,
    borderColor: '#ff4453',
    height: '100%',
    width: '30%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20
  },
  rightPersonBorder: {
    borderWidth: 1,
    borderColor: '#ff4453',
    height: '100%',
    width: '30%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 20
  },
  centerPersonBorder: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ff4453',
    width: '40%',
    height: '100%'
  }
});

const mapStateToProps = state => {
  return {
    packages: state.packages
  };
};

export default connect(mapStateToProps)(Checkout);
