import React, { Component } from 'react'
import {
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native'

import { Icon } from 'react-native-elements';

class Destination extends Component {
	render() {
		return (
			<View style={{
				flex: 1,
			}}>
				<View style={{
					backgroundColor: '#FFF',
					height: 60,
					width: '100%',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					padding: 10,
				}}>
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
						<Icon name="arrowleft" type="antdesign" color="#444" size={25} />
					</TouchableOpacity>
					<View
						style={{
							alignItems: 'center',
							flex: 1,
							marginRight: 10,
							flexDirection: 'row',
							justifyContent: 'center'
						}}
					>
					</View>
				</View>
				<View style={{
					flex:1,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<Image style={{ width: 283, height: 221 }} source={require('../../assets/undraw_warning_cyit.png')} />
					<Text style={{fontSize:18, fontWeight:'400'}}>Data Not Found !</Text>
				</View>
			</View>
		)
	}
}

export default Destination;