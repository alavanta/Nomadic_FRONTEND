import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
  TouchableHighlight
} from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { fetchUser } from '../public/redux/action';

import Entypo from 'react-native-vector-icons/dist/Entypo';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errEmail: '',
      errPassword: '',
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
      <SafeAreaView style={{ flex: 1 , backgroundColor:'white'}}>
        <View style={styles.bodyParent}>

          <View style={styles.parentHeader}>
            <Button 
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
              icon={
                  <Entypo
                    name="chevron-left"
                    size={25}
                    color="black"
                  />
              }
              onPress={() => {
                this.props.navigation.goBack()
              }}
            />
            <View style={styles.textWrap}>
              <Text style={styles.headerText}>Login</Text>
            </View>

          </View>


          <View style={styles.imageWrap}>
            <Image
              style={styles.welcomeImage}
              source={require('../assets/undraw_secure_data_0rwp.png')}
            />
          </View>

          <View style={styles.bodyContain}>

            <View style={{ width: '100%', paddingHorizontal: 30}}>

              <View style={styles.form}>

                <TextInput 
                  placeholder="E - Mail" 
                  style={styles.textInput} 
                  value={this.state.email}
                  onChangeText={this.changeEmail}
                />
                <Text style={{color: 'red', top: 5, left: 10}}>{this.state.errEmail}</Text>
              </View>

              <View style={styles.form}>

                <TextInput 
                  placeholder="Password" 
                  style={styles.textInput} 
                  value={this.state.password}
                  onChangeText={this.changePassword}
                  secureTextEntry={true}
                />
                <Text style={{color: 'red', top: 5, left: 10}}>{this.state.errPassword}</Text>
              </View>

              <View style={styles.buttonWrap}>
                <Button
                  disabled={
                            this.state.errEmail !== false ? true :
                            this.state.errPassword !== false ? true : false
                        }
                  buttonStyle={styles.loginButton}
                  title="Next"
                  onPress={this.validate}
                />
              </View>

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('ForgotPassword') }} style={{ alignSelf: 'center', paddingTop: 10 }}>
                <Text style={{ fontSize: 15, color: 'black' }}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>

        {
          this.state.isLoading ?
            <View style={{ backgroundColor: 'white', position: 'absolute', width: '100%', height: '100%', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#FF4453" />
            </View>
            :
            <View />
        }

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  btnLogin: {
    backgroundColor: '#EF4453',
    width: '90%',
    alignSelf: 'center',
    marginTop: 40
  },
  bodyParent: {
    flex: 1,
    backgroundColor: 'white'
  },
  imageWrap: {
    flex: 1,
    zIndex: -999,
    alignItems: 'flex-start',
    top: -350,
    right: -100,
    position: 'absolute'
  },
  welcomeImage: {
    width: 450,
    resizeMode: 'contain',
    paddingVertical: 0,
    transform: [{ rotate: '-220deg' }]
  },
  parentHeader: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textWrap: {
    flex: 1,
    alignItems: 'flex-end'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    right: 20
  },
  bodyContain: {
    flex: 1,
    justifyContent: 'center'
  },
  form: {
    width: '100%',
    marginVertical: 10
  },
  titleInput: {
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#FF4453'
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
  }
})

const mapStateToProps = state => {
  return {
    data: state.user.data,
    token: state.user.token
  };
};

export default connect(mapStateToProps)(withNavigation(Login));
