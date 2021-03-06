import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { Button } from 'react-native-elements';

import { forgetPassword } from '../../public/redux/action/user';
import { connect } from 'react-redux';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      errEmail: ''
    };
  }

  sendEmail = async userEmail => {
    await this.props
      .dispatch(forgetPassword(userEmail))
      .then(success => {
        this.props.navigation.navigate('otpCode');
      })
      .catch(err => {
        Alert.alert('Invalid Email, please check again your email.');
      });
  };
  emailChange = email => {
    let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailVal.test(email) === false) {
      this.setState({
        email: email,
        errEmail: 'Wrong email format'
      });
    } else {
      this.setState({
        email: email,
        errEmail: false
      });
    }
  };

  validate = () => {
    if (this.errEmail === false) {
      //validate with email match or not
    }
  };

  render() {
    return (
      <View style={styles.bodyParent}>
        <View style={styles.parentHeader}>
          <Button
            buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
            icon={<Entypo name="chevron-left" size={25} color="black" />}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <View style={styles.textWrap}>
            <Text style={styles.headerText}>Forgot Password</Text>
          </View>
        </View>

        <View style={styles.imageWrap}>
          <Image
            style={styles.welcomeImage}
            source={require('../../assets/undraw_secure_data_0rwp.png')}
          />
        </View>

        <View style={styles.bodyContain}>
          <View style={{ width: '100%', paddingHorizontal: 30 }}>
            <View style={styles.form}>
              <TextInput
                placeholder="E Mail"
                style={styles.textInput}
                value={this.state.email}
                onChangeText={this.emailChange}
              />
              {this.state.errEmail !== false ? (
                <Text style={{ color: 'red', top: 5, left: 10 }}>
                  {this.state.errEmail}
                </Text>
              ) : null}
            </View>

            <View style={styles.buttonWrap}>
              <Button
                disabled={this.state.errEmail !== false ? true : false}
                buttonStyle={styles.loginButton}
                title="Next"
                onPress={() => {
                  this.sendEmail(this.state.email);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    height: 100,
    alignItems: 'center',
    paddingHorizontal: 15
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
    marginBottom: 10
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
});

const mapStateToProps = state => {
  return {
    data: state.user.data
  };
};

export default connect(mapStateToProps)(ForgotPassword);
