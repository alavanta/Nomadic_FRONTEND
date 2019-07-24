import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image
} from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { fetchUser } from '../public/redux/action';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errEmail: false,
      errPassword: false,
      errAuth: false,
      isLoading: false,
    };
  }

  changeEmail = email => {
    let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailVal.test(email) === false) {
      this.setState({
        errEmail: 'Wrong email format'
      });
      this.setState({ email });
      return false;
    } else {
      this.setState({
        email: email,
        errEmail: false
      });
    }
  };

  changePassword = password => {
    if (password.length < 6) {
      this.setState({
        errPassword: 'Password must more than 6 character'
      });
      this.setState({ password });
      return false;
    } else {
      this.setState({
        password: password,
        errPassword: false
      });
    }
  };

  validate = () => {
    if (this.state.errEmail === false && this.state.errPassword == false) {
      console.log('masuk ke redux');
      this.loginHandler();
    }
  };

  loginHandler = async () => {

    this.setState({
      isLoading: true
    })

    let { email, password } = this.state;
    let data = {
      email,
      password
    };
    await this.props
      .dispatch(fetchUser(data))
      .then(success => {
        this.props.navigation.navigate('Home');
        this.setState({
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({ errAuth: true });
      });
  };

  renderError = () => {
    if (this.state.errAuth) {
      alert('Authentikasi Gagal');
      this.setState({ 
        errAuth: false,
        isLoading: false
      });
    }
  };

  render() {
    this.renderError();

    return (
      <SafeAreaView style={{ flex: 1 , backgroundColor:'#F4B086'}}>
        <View
          style={{
            width: '100%',
            height: '10%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            style={{ margin: 10, flexDirection: 'row' }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="arrowleft" type="antdesign" color="#808080" size={25} />
          </TouchableOpacity>
          <View onPress={() => this.props.navigation.navigate('Main')}>
            <Text>Login</Text>
          </View>
        </View>
       
        <View style={{ flex: 1, justifyContent: 'flex-start', margin: 15 }}>
        <View style={{alignSelf:'center'}}>
            <Image
            source={require('../assets/nomadic.png')}
            style={{height:200,width:200}}
            />
            {/* <Text style={{margin: 8, fontSize: 15, color: '#FFF'}}>For Tour Guide</Text> */}
          </View>
          <TextInput
            placeholder="Email"
            clearButtonMode="always"
            value={this.state.email}
            onChangeText={text => this.changeEmail(text)}
            style={{ width: '90%', alignSelf: 'center' }}
            underlineColorAndroid="#EF4453"
          />
          {this.state.errEmail !== false ? (
            <Text style={{ color: '#ff0000', marginLeft: 5 }}>
              {this.state.errEmail}
            </Text>
          ) : null}
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={text => this.changePassword(text)}
            style={{ width: '90%', alignSelf: 'center' }}
            underlineColorAndroid="#EF4453"
            // inputContainerStyle={{borderBottomColor:'#EF4453',borderBottomWidth:2}}
          />
          {this.state.errPassword !== false ? (
            <Text style={{ color: '#ff0000', marginLeft: 5 }}>
              {this.state.errPassword}
            </Text>
          ) : null}
          <Button
            title="Login"
            disabled={
              this.state.email == ''
                ? true
                : this.state.password == ''
                ? true
                : false
            }
            buttonStyle={{
              backgroundColor: '#EF4453',
              width: '90%',
              alignSelf: 'center',
              marginTop: 40
            }}
            disabledStyle={{ backgroundColor: '#A8A8A8' }}
            disabledTitleStyle={{ color: '#FFF' }}
            onPress={this.validate}
          />
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('ForgotPassword')}} style={{ alignSelf: 'center', paddingTop: 10 }}>
            <Text style={{ fontSize: 12, color: '#F4B086' }}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>

        {
          this.state.isLoading ?
            <View style={{backgroundColor: 'white', position: 'absolute', width: '100%', height: '100%', justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="#FF4453" />
            </View>
          :
          <View />
        }

      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.user.data,
    token: state.user.token
  };
};

export default connect(mapStateToProps)(withNavigation(Login));
