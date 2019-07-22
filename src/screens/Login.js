import React,{Component} from 'react';
import { View,Text,TextInput,StyleSheet,TouchableOpacity,SafeAreaView } from 'react-native';
import { Button,Input,Icon } from 'react-native-elements';
import { connect } from "react-redux";


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    render(){
        
        return(
            <SafeAreaView style={{flex:1}}>
               <View style={{ width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{margin: 10,flexDirection:'row'}}>
                        <Icon
                            name='arrowleft'
                            type='antdesign'
                            color='#808080'
                            size={25} />
                        </View>
                        <TouchableOpacity
                        onPress={() => alert('goBack')}
                        >
                        <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
            <View style={{flex:1,justifyContent:'center',margin:15}}>
                
                <TextInput
                placeholder='Email'
                clearButtonMode='always'
                value={this.state.email}
                onChangeText={(text)=> this.setState({ email:text })}
                style={{width:'90%',alignSelf:'center'}}
                underlineColorAndroid='#EF4453'
                // inputContainerStyle={{borderBottomColor:'#EF4453',borderBottomWidth:2}}
                />
                <TextInput
                placeholder='Password'
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text)=> this.setState({ password:text })}
                style={{width:'90%',alignSelf:'center'}}
                underlineColorAndroid='#EF4453'
                // inputContainerStyle={{borderBottomColor:'#EF4453',borderBottomWidth:2}}
                
                />
                <Button
                title='Login'
                disabled={
                    this.state.email == '' ? true :
                    this.state.password == '' ? true : false
                        }
                buttonStyle={{backgroundColor:'#EF4453',width:'90%',alignSelf:'center',marginTop:40}}
                disabledStyle={{backgroundColor:'#A8A8A8'}}
                disabledTitleStyle={{color:'#FFF'}}
                />
                <TouchableOpacity
                style={{alignSelf:'center',paddingTop:10}}
                >
                    <Text
                    style={{fontSize:12,color:'#F4B086'}}
                    >Forgot your password?</Text>
                </TouchableOpacity>

                
            </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(Login);