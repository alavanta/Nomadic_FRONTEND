import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation'

import { Button } from 'react-native-elements';

import Entypo from 'react-native-vector-icons/dist/Entypo';

import { GiftedChat } from 'react-native-gifted-chat'


function Header(props) {
	return (
		<View style={headStyle.headerContainer}>
			<Button
				buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
				onPress={() => {props.navigation.goBack()}}
			  	icon={
			    	<Entypo
			      		name="chevron-left"
			      		size={23}
			    	/>
			  	}
			/>
			<Text style={headStyle.headText}>
				{props.data.name}
			</Text>
		</View>
	)
}

const headStyle = StyleSheet.create({
	headerContainer: {
		width: '100%',
		height: 80,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 20,
		paddingHorizontal: 15,
		backgroundColor: 'white'
	},
	headText: {
		fontSize: 17,
		fontWeight: 'bold',
		left: 20
	}
})


class PrivateChat extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		messages: []
	  	};
	}

	componentWillMount() {
	    this.setState({
	      	messages: [
	        	{
	          		_id: 1,
	          		text: 'Hello developer',
	          		createdAt: new Date(),
	          		user: {
	            		_id: 2,
	            		name: 'React Native',
	            		avatar: this.props.navigation.state.params.photo,
	          		},
	        	},
	      	],
	    })
	}

  	onSend(messages = []) {
    	this.setState(previousState => ({
      		messages: GiftedChat.append(previousState.messages, messages),
    	}))
  	}

	render () {
		return (
			<View style={{
				flex: 1,
				backgroundColor: '#fafafa'
			}}>
				<Header data={this.props.navigation.state.params} navigation={this.props.navigation} />
				<GiftedChat
			        messages={this.state.messages}
			        onSend={messages => this.onSend(messages)}
			        user={{
			          _id: 1,
			        }}
		      	/>
			</View>
		)
	}
}


export default withNavigation(PrivateChat)