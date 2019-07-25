import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Picker, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import { addUser } from '../public/redux/action/user';
import { connect } from 'react-redux';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            address: '',
            phone: '',
            gender: 'M',
            errName: false,
            errEmail: false,
            errPassword: false,
            errAddress: false,
            errPhone: false
        }
    }

    sendUser = (name, password, email, phone, address, gender) => {
        this.props.dispatch(addUser(name, password, email, phone, address, gender))
        Alert.alert('Success','Data has created successfully, please login an application.')
        this.props.navigation.goBack();
    }
    validate = () => {
        let { name, password, email, phone, address, gender } = this.state
        if (this.state.errName === false && this.state.errEmail === false && this.state.errPassword == false && this.state.errAddress === false && this.state.errPhone === false) {
            // this.sendUser(name, email, phone, address, gender)
            this.registerHandler(name, email, phone, address, gender)
            console.warn('validate masuk ke function register redux')
        }
    }

    // registerHandler = async (name, password, email, phone, address, gender) => {
    //     this.setState({
    //       isLoading: true
    //     })
    
    //     let { email, password } = this.state;
    //     let data = {
    //       email,
    //       password
    //     };
    //     await this.props
    //       .dispatch(fetchUser(data))
    //       .then(success => {
    //         Alert.alert(`${data.email}`)
    //         this.setState({
    //           isLoading: false
    //         })
    //       })
    //       .catch(err => {
    //         this.setState({ errAuth: true });
    //       });
    //   };

    changeName = (name) => {
        let nameVal = /^[A-Za-z0-9 ]+$/
        if (nameVal.test(name) === false) {
            this.setState({
                errName: 'Name input only text'
            })
            this.setState({ name })
            return false;
        } else {
            this.setState({
                name: name,
                errName: false
            })
        }
    }

    changeEmail = (email) => {
        let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailVal.test(email) === false) {
            this.setState({
                errEmail: "Wrong email format"
            })
            this.setState({ email })
            return false;
        }
        else {
            this.setState({
                email: email,
                errEmail: false
            })
        }
    }

    changePassword = (password) => {
        if (password.length < 6) {
            this.setState({
                errPassword: 'Password must more than 6 character'
            })
            this.setState({ password })
            return false;
        } else {
            this.setState({
                password: password,
                errPassword: false
            })
        }
    }

    changeAddress = (address) => {
        if (address.length < 6) {
            this.setState({
                errAddress: 'Address must more than 6 character'
            })
            this.setState({ address })
            return false;
        } else {
            this.setState({
                address: address,
                errAddress: false
            })
        }
    }

    changePhone = (phone) => {
        let phoneVal = /^[0-9]*$/
        if (phoneVal.test(phone) === false) {
            this.setState({
                errPhone: 'Input only numbers'
            })
            this.setState({ phone })
            return false;
        } else {
            this.setState({
                phone: phone,
                errPhone: false
            })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ margin: 10 }} onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            name='arrowleft'
                            type='antdesign'
                            color='#808080'
                            size={25} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 27, color: 'black' }}>Sign Up</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextInput
                            placeholder='Name'
                            style={styles.input}
                            underlineColorAndroid="#EF4453"
                            onChangeText={(name) => this.changeName(name)}
                            value={this.state.name} />
                        {
                            this.state.errName !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errName}</Text> : null
                        }
                        <TextInput
                            placeholder='Email address'
                            style={styles.input}
                            underlineColorAndroid="#EF4453"
                            onChangeText={(email) => this.changeEmail(email)}
                            value={this.state.email} />
                        {
                            this.state.errEmail !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errEmail}</Text> : null
                        }
                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            underlineColorAndroid="#EF4453"
                            onChangeText={(password) => this.changePassword(password)}
                            value={this.state.password}
                            secureTextEntry={true} />
                        {
                            this.state.errPassword !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errPassword}</Text> : null
                        }
                        <TextInput
                            placeholder='Address'
                            style={styles.input}
                            underlineColorAndroid="#EF4453"
                            onChangeText={(address) => this.changeAddress(address)}
                            value={this.state.address} />
                        {
                            this.state.errAddress !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errAddress}</Text> : null
                        }
                        <TextInput
                            placeholder='Phone Number'
                            style={styles.input}
                            underlineColorAndroid="#EF4453"
                            keyboardType={'numeric'}
                            onChangeText={(phone) => this.changePhone(phone)}
                            value={this.state.phone} />
                        {
                            this.state.errPhone !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errPhone}</Text> : null
                        }
                        <Picker
                            selectedValue={this.state.gender}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ gender: itemValue })
                            }>
                            <Picker.Item label="Male" value="M" />
                            <Picker.Item label="Female" value="F" />
                        </Picker>
                    </View>
                    <Button
                        title='Sign Up'
                        disabled={
                            this.state.name == '' ? true :
                                this.state.email == '' ? true :
                                    this.state.password == '' ? true :
                                        this.state.address == '' ? true :
                                            this.state.phone == '' ? true : false
                        }
                        buttonStyle={styles.btnSignUp}
                        TouchableComponent={TouchableHighlight}
                        disabledStyle={{ backgroundColor: '#A8A8A8' }}
                        disabledTitleStyle={{ color: '#FFF' }}
                        onPress={()=>this.sendUser(this.state.name,this.state.password, this.state.email, this.state.phone, this.state.address, this.state.gender)} />
                    <Text style={{ fontSize: 12, color: '#F4B086', marginTop: 10, alignSelf: 'center' }}>Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')}>Login</Text></Text>
                </ScrollView>
            </View>
        )
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
    input: {
        width: '100%',
        marginTop: 5
    },
    picker: {
        height: 50,
        width: 100,
        marginTop: 10
    },
    btnSignUp: {
        backgroundColor: '#EF4453',
        width: '90%',
        alignSelf: 'center'
    }
})


const mapStateToProps = state => {
    return {
        data: state.user.data,
    };
};

export default connect(mapStateToProps)(withNavigation(Register));
