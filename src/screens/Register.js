import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Picker } from 'react-native';
import { Icon, Button } from 'react-native-elements';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            address: '',
            phone: '',
            gender: 'Male',
            errName: false,
            errEmail: false,
            errPassword: false,
            errAddress: false,
            errPhone: false
        }
    }

    validate = () => {
        if (this.state.errName === false && this.state.errEmail === false && this.state.errPassword == false && this.state.errAddress === false && this.state.errPhone === false) {
            // this.register()
            console.log('validate masuk ke function register redux')
        }
    }

    // register = () => {

    // }

    Loginhandler = () => {

    }

    changeName = (text) => {
        let nameVal = /^[a-zA-Z ]*$/
        if (nameVal.test(text) === false) {
            this.setState({
                errName: 'Name input only text'
            })
        } else {
            this.setState({
                name: text,
                errName: false
            })
        }
    }

    changeEmail = (text) => {
        let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailVal.test(text) === false) {
            this.setState({
                errEmail: "Wrong email format"
            })
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({
                email: text,
                errEmail: false
            })
        }
    }

    changePassword = (text) => {
        if (text.length < 6) {
            this.setState({
                errPassword: 'Password must more than 6 character'
            })
        } else {
            this.setState({
                password: text,
                errPassword: false
            })
        }
    }

    changeAddress = (text) => {
        if (text.length < 6) {
            this.setState({
                errAddress: 'Address must more than 6 character'
            })
        } else {
            this.setState({
                address: text,
                errAddress: false
            })
        }
    }

    changePhone = (text) => {
        let phoneVal = /^[0-9]*$/
        if (phoneVal.test(text) === false) {
            this.setState({
                errPhone: 'Input only numbers'
            })
        } else {
            this.setState({
                phone: text,
                errPhone: false
            })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={styles.header}>
                    <View style={{ margin: 10 }}>
                        <Icon
                            name='arrowleft'
                            type='antdesign'
                            color='#808080'
                            size={25} />
                    </View>
                </View>
                <ScrollView style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 27, color: 'black' }}>Sign Up</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextInput
                            placeholder='Name'
                            style={styles.input}
                            onChangeText={this.changeName}
                            value={this.state.name} />
                        {
                            this.state.errName !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errName}</Text> : null
                        }
                        <TextInput
                            placeholder='Email address'
                            style={styles.input}
                            onChangeText={(text) => this.changeEmail(text)}
                            value={this.state.email} />
                        {
                            this.state.errEmail !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errEmail}</Text> : null
                        }
                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            onChangeText={(text) => this.changePassword(text)}
                            value={this.state.password}
                            secureTextEntry={true} />
                        {
                            this.state.errPassword !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errPassword}</Text> : null
                        }
                        <TextInput
                            placeholder='Address'
                            style={styles.input}
                            onChangeText={(text) => this.changeAddress(text)}
                            value={this.state.address} />
                        {
                            this.state.errAddress !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errAddress}</Text> : null
                        }
                        <TextInput
                            placeholder='Phone Number'
                            style={styles.input}
                            onChangeText={(text) => this.changePhone(text)}
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
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
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
                        disabledStyle={{ backgroundColor: '#A8A8A8' }}
                        disabledTitleStyle={{ color: '#FFF' }}/>
                        <Text style={{ fontSize: 12, color: '#F4B086', marginTop: 10, alignSelf: 'center' }}>Already have an account? <Text>Login</Text></Text>
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
        borderBottomWidth: 2,
        width: '100%',
        borderBottomColor: '#EF4453',
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

export default Register