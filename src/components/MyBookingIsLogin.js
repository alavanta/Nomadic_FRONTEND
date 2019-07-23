import React, { Component } from 'react';
import { View,Text,Image } from "react-native";
import { Button } from "react-native-elements";

export default class MyBookingIsLogin extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{alignSelf:'center'}}>
            <Image 
				source={require('../assets/no-booking.png')}
				style={{width:200,height:200}}
				/>
				<Text style={{
					fontSize: 30,
                    fontWeight: 'bold',
                    alignSelf:'center'
				}}>
					My Bookings
				</Text>
				<Text
				style={{fontSize:12,alignSelf:'center'}}
				>Login to your check orders</Text>
				 <Button
                 containerStyle={{alignSelf:'center'}}
				buttonStyle={{backgroundColor:'#EF4453',width:100,marginTop:10}}
				title='Login'
				/>
                </View>
        )
    }
}

