import React, { Component } from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


class PackageMenu extends Component {

	constructor(props) {
		super(props);

		this.state = {
			image: 'https://www.thoughtco.com/thmb/V6Mz1MdaTkVXMhuA1GkGbC6v6NA=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-599927824-589770da3df78caebcf39797.jpg',

		};
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Package</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Package')}>
						<Text style={styles.showAll}>Show All</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.body}>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image }} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image }} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image }} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image }} />
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default PackageMenu;

const { height, width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		marginTop: 20,
		backgroundColor: '#F9F9F9',
		elevation: 1
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		color: '#555',
		flex: 1,
		fontWeight: '500'
	},
	showAll: {
		color: 'red',
		fontSize: 12,
		marginRight: 5
	},
	body: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	card: {
		backgroundColor: '#FFF',
		borderRadius: 5,
		width: width / 5,
		elevation: 3,
		margin: 5
	},
	image: {
		height: width / 5,
		width: width / 5,
		borderRadius: 5
	},
	name: {
		margin: 3
	}
})