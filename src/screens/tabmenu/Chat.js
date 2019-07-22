import React, { Component } from 'react'
import {
	View,
	Text
} from 'react-native'


class Chat extends Component {
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
					Chat
				</Text>
			</View>
		)
	}
}

export default Chat;