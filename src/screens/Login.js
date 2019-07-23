import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from "react-redux";
import { withNavigation } from 'react-navigation';
import { fetchUser } from '../public/redux/action';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errEmail: false,
            errPassword: false
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

    validate = () => {
        if (this.state.errEmail === false && this.state.errPassword == false ) {
            this.loginHandler()
            console.log('masuk ke redux')
        }
    }

    loginHandler = () => {
        let {email, password} = this.state;
        let data = {
            email,
            password
        }
        this.props.dispatch(fetchUser(data))
        this.props.navigation.navigate('Home')
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <TouchableOpacity style={{ margin: 10, flexDirection: 'row' }} onPress={()=>this.props.navigation.goBack()}>
                        <Icon
                            name='arrowleft'
                            type='antdesign'
                            color='#808080'
                            size={25} />
                    </TouchableOpacity>
                    <View onPress={() => alert('goBack')}>
                        <Text>Login</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', margin: 15 }}>

                    <TextInput
                        placeholder='Email'
                        clearButtonMode='always'
                        value={this.state.email}
                        onChangeText={(text) => this.changeEmail(text)}
                        style={{ width: '90%', alignSelf: 'center' }}
                        underlineColorAndroid='#EF4453'
                    // inputContainerStyle={{borderBottomColor:'#EF4453',borderBottomWidth:2}}
                    />
                    {
                        this.state.errEmail !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errEmail}</Text> : null
                    }
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(text) => this.changePassword(text)}
                        style={{ width: '90%', alignSelf: 'center' }}
                        underlineColorAndroid='#EF4453'
                    // inputContainerStyle={{borderBottomColor:'#EF4453',borderBottomWidth:2}}
                    />
                    {
                        this.state.errPassword !== false ? <Text style={{ color: '#ff0000', marginLeft: 5 }}>{this.state.errPassword}</Text> : null
                    }
                    <Button
                        title='Login'
                        disabled={
                            this.state.email == '' ? true :
                                this.state.password == '' ? true : false
                        }
                        buttonStyle={{ backgroundColor: '#EF4453', width: '90%', alignSelf: 'center', marginTop: 40 }}
                        disabledStyle={{ backgroundColor: '#A8A8A8' }}
                        disabledTitleStyle={{ color: '#FFF' }}
                        onPress={this.validate()}
                    />
                    <TouchableOpacity
                        style={{ alignSelf: 'center', paddingTop: 10 }}
                    >
                        <Text
                            style={{ fontSize: 12, color: '#F4B086' }}
                        >Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.user.data,
        token: state.user.token
    }
}

export default connect(mapStateToProps)(withNavigation(Login));