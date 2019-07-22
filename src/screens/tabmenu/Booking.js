import React, { Component } from 'react'
import {
	View,
	Text
} from 'react-native'


class Booking extends Component {
	render () {
		return (
			<View style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Text style={{
					fontSize: 30,
					fontWeight: 'bold'
				}}>
					Booking
				</Text>
			</View>
		)
	}
}

export default Booking;