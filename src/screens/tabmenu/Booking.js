import React, { Component } from 'react';
import {
	View,
	Text,
	Image
} from 'react-native';
import { Button } from 'react-native-elements';



class Booking extends Component {
	render () {
		return (
			<View style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Image 
				source={{uri:require('../../assets/no-booking.jpg')}}
				style={{width:90,height:90}}
				/>
				<Text style={{
					fontSize: 30,
					fontWeight: 'bold'
				}}>
					My Bookings
				</Text>
				<Text>Login to check orders</Text>
				<Button
				title='Login'
				/>
			</View>
		)
	}
}

export default Booking;