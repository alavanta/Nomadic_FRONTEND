import React, { Component } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	ImageBackground,
	StyleSheet
} from 'react-native'
import { thisExpression } from '@babel/types';


class Footer extends Component {
	constructor(props){
		super(props);
		this.state={
			image_url:'https://blog.reservasi.com/wp-content/uploads/2017/03/Rumah-Kurcaci-di-Wisata-Seribu-Songgo-Langit-Yogyakarta-Instagram-@dhani_saputraa-min.png',
			title:'Destinasi Wisata Seribu Batu Songgo Langit Yogyakarta, Wisata Baru yang Wajib Kamu Kunjungi',
			description:'Yap, sesuai dengan namanya, di tempat ini terdapat ribuan batu yang sangat indah dan bisa kamu jadikan sebagai spot selfie paling favorit. Tapi, jika sudah berada di Seribu Batu Songgo Langit nanti, jangan lupa untuk tetap menjaga lingkungan sekitar dan dilarang membuat sampah apapun disana ya.'
		}
	}
	render () {
		return (
			<ImageBackground source={{uri: this.state.image_url}} style={styles.ImageBackground}>
				<View style={styles.content}>
					<Text style={{color:'#FFF', fontSize:30,margin:30}}>Media</Text>
					<Text style={{color:'#FFF', fontSize:20,marginBottom:5}} numberOfLines={1}>{this.state.title}</Text>
					<Text style={{color:'#FFF'}} numberOfLines={4}>{this.state.description}</Text>
				</View>
			</ImageBackground>
		)
	}
}

export default Footer;

const { height, width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const styles = StyleSheet.create({
	ImageBackground:{
		marginBottom:HEADER_MAX_HEIGHT,
		height:width*0.8,
		width:width,
	},
	content:{
		height:'100%',
		width:'100%',
		backgroundColor:'rgba(0,0,0, 0.5)',
		alignItems:'center',
		justifyContent:'center',
		padding:30
	}
})