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
			image: [
				'https://www.thoughtco.com/thmb/V6Mz1MdaTkVXMhuA1GkGbC6v6NA=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-599927824-589770da3df78caebcf39797.jpg',
				'https://cdn.idntimes.com/content-images/community/2018/09/22621da2b30ee577f10f7ed81431baef.jpg',
				'https://www.paketwisatajogja.info/wp-content/uploads/2017/10/Paket-Wisata-Jogja-5-Hari-4-Malam-Terbaik.jpg',
				'https://www.1001malam.com/travel/wp-content/uploads/2016/08/Wisata-Tenang-di-Desa-Wisata-Yogyakarta-Sumber-plesirwisata-wordpresscom.jpg',
				'http://travelmahasiswa.com/wp-content/uploads/2016/12/Goa-Kiskendo-Jogja-1.jpg1_-1.jpg',
				'http://bakpiajogja.id/wp-content/uploads/2016/11/pantai-sepanjang-gunung-kidul-yogyakarta.jpg',
				'https://blog.airpaz.com/wp-content/uploads/Wisata-Yogyakarta-Blue-Lagoon.png',
				'http://www.pegipegi.com/travel/wp-content/uploads/2014/04/Pantai-Krakal.jpg',			
			]
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Gallery</Text>
				</View>
				<View style={styles.body}>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image[0] }} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image[1] }} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image[2] }} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image[3] }} />
					</TouchableOpacity>
				</View>
				<View style={styles.body}>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image[4] }} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image[5] }} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image[6] }} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.card}>
						<Image style={styles.image} source={{ uri: this.state.image[7] }} />
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default PackageMenu;

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		marginTop: 10,
		backgroundColor: '#F9F9F9',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		margin:10
	},
	title: {
		color: '#555',
		flex: 1,
		fontWeight: '500',
		fontSize:20
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
		borderRadius: 3,
		elevation: 3,
		margin: 5
	},
	image: {
		height: (width / 5)-10,
		width: (width / 5)-10,
		borderRadius: 3,
		margin:5
	},
	name: {
		margin: 3
	}
})