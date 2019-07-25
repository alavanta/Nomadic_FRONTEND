import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker, TextInput, ScrollView,Alert, AsyncStorage } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';

import { editUser } from '../../public/redux/action/user';
import { connect } from 'react-redux';

class ProfileEdit extends Component {

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
    userEdit = (name, password, email, phone, address, gender) => {
        this.props.dispatch(editUser(name, password, email, phone, address, gender))
        console.warn(this.state.name,this.state.password,this.state.email,this.state.phone,this.state.address,this.state.gender)
        console.warn(this.state.errName)
        Alert.alert('Success','Data Has Been Edited');

    }

    validate = () => {
        let { name, password, email, phone, address, gender} = this.state
        if (this.state.errName === false && this.state.errEmail === false && this.state.errAddress === false && this.state.errPhone === false) {
            this.userEdit(name, password,email, phone, address, gender)
            console.log('validate masuk ke function register redux')
        } 
    }

    changeName = (name) => {
        let nameVal = /^[a-zA-Z ]*$/
        if (nameVal.test(name) === false && name.length < 6) {
            this.setState({
                errName: 'Name input only text and input must more than 6'
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

    componentDidMount() {
       AsyncStorage.getItem('userToken')
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFF', height: '100%', width: '100%' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            name='arrowleft'
                            type='antdesign'
                            color='#808080'
                            size={25} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 19, marginLeft: 5 }}>Edit Profile</Text>
                    <TouchableOpacity
                        onPress={this.validate}
                        disabled={
                            this.state.name == '' ? true :
                                this.state.email == '' ? true :
                                    this.state.address == '' ? true :
                                        this.state.phone == '' ? true : false
                        }
                    >
                        {
                            this.state.name == '' ? (<Icon name='check-circle' type='feather' color='#808080' />) :
                                this.state.email == '' ? (<Icon namev='check-circle' type='feather' color='#808080' />) :
                                    this.state.address == '' ? (<Icon name='check-circle' type='feather' color='#808080' />) :
                                        this.state.phone == '' ? (<Icon name='check-circle' type='feather' color='#808080' />) : (<Icon name='check-circle' type='feather' color='green' />)
                        }

                    </TouchableOpacity>
                </View>
                <ScrollView style={{ margin: 20, height: '80%' }}>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Avatar size="large" rounded title="JD" />
                    </View>
                    <View style={styles.profileContainer}>
                        <View style={{ margin: 10 }}>
                            <TextInput
                                placeholder='Name'
                                style={styles.input}
                                onChangeText={(name) => this.changeName(name)}
                                value={this.state.name} />
                            {
                                this.state.errName !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errName}</Text> : null
                            }
                            <TextInput
                                placeholder='Email address'
                                style={styles.input}
                                onChangeText={(email) => this.changeEmail(email)}
                                value={this.state.email} />
                            {
                                this.state.errEmail !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errEmail}</Text> : null
                            }
                            <TextInput
                                placeholder='Password'
                                style={styles.input}
                                onChangeText={(password) => this.changePassword(password)}
                                value={this.state.password}
                                secureTextEntry={true} />
                            {
                                this.state.errPassword !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errPassword}</Text> : null
                            }
                            <TextInput
                                placeholder='Address'
                                style={styles.input}
                                onChangeText={(address) => this.changeAddress(address)}
                                value={this.state.address} />
                            {
                                this.state.errAddress !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errAddress}</Text> : null
                            }
                            <TextInput
                                placeholder='Phone Number'
                                style={styles.input}
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
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        borderBottomWidth: 2,
        borderRadius: 10,
        width: '100%',
        borderBottomColor: '#999999',
    },
    line: {
        borderWidth: 2,
        borderColor: '#999999',
        margin: 10,
        height: '3%',
        backgroundColor: '#999999'
    },
    picker: {
        height: 50,
        width: 100,
        marginTop: 10
    },
    profileContainer: {
        marginTop: 20,
        borderWidth: 2,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#F4CB86',
        borderColor: '#F4E586',
        shadowColor: "#F4CB86",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
})
const mapStateToProps = state => {
    return {
        data: state.user.data,
    };
};

export default connect(mapStateToProps)(ProfileEdit);
