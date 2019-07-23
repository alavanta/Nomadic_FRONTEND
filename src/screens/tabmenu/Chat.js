import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	FlatList
} from 'react-native'

import { ListItem } from 'react-native-elements';

import { withNavigation } from 'react-navigation'


class RenderItem extends Component {
	render () {
		return (
			<ListItem
			  	leftAvatar={{
			    	title: this.props.item.name[0],
			    	source: { uri: this.props.item.photo },
			  	}}
			  	title={this.props.item.name}
			  	subtitle="last Message..."
			  	containerStyle={{borderBottomWidth: 1, borderColor: '#f5f5f5'}}
			  	chevron
			  	onPress={() => {
					this.props.navigation.navigate('PrivateChat', this.props.item)
			  	}}
			/>
		)
	}
}

class Chat extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		users: [
	  			{
	  				id: 1,
	  				photo: 'https://vignette.wikia.nocookie.net/p__/images/c/cb/SpongeBob_SquarePants_Render.png/revision/latest?cb=20190120193322&path-prefix=protagonist',
	  				name: 'SpongeBob'
	  			},
	  			{
	  				id: 2,
	  				photo: 'https://cdn.newsday.com/polopoly_fs/1.9901897.1423024182!/httpImage/image.JPG_gen/derivatives/landscape_768/image.JPG',
	  				name: 'Patrick'
	  			},
	  			{
	  				id: 3,
	  				photo: 'https://vignette.wikia.nocookie.net/p__/images/c/cb/SpongeBob_SquarePants_Render.png/revision/latest?cb=20190120193322&path-prefix=protagonist',
	  				name: 'SpongeBob'
	  			},
	  			{
	  				id: 4,
	  				photo: 'https://cdn.newsday.com/polopoly_fs/1.9901897.1423024182!/httpImage/image.JPG_gen/derivatives/landscape_768/image.JPG',
	  				name: 'Patrick'
	  			},
	  			{
	  				id: 5,
	  				photo: 'https://vignette.wikia.nocookie.net/p__/images/c/cb/SpongeBob_SquarePants_Render.png/revision/latest?cb=20190120193322&path-prefix=protagonist',
	  				name: 'SpongeBob'
	  			},
	  			{
	  				id: 6,
	  				photo: 'https://cdn.newsday.com/polopoly_fs/1.9901897.1423024182!/httpImage/image.JPG_gen/derivatives/landscape_768/image.JPG',
	  				name: 'Patrick'
	  			},
	  			{
	  				id: 7,
	  				photo: 'https://vignette.wikia.nocookie.net/p__/images/c/cb/SpongeBob_SquarePants_Render.png/revision/latest?cb=20190120193322&path-prefix=protagonist',
	  				name: 'SpongeBob'
	  			},
	  			{
	  				id: 8,
	  				photo: 'https://cdn.newsday.com/polopoly_fs/1.9901897.1423024182!/httpImage/image.JPG_gen/derivatives/landscape_768/image.JPG',
	  				name: 'Patrick'
	  			},
	  			{
	  				id: 9,
	  				photo: 'https://vignette.wikia.nocookie.net/p__/images/c/cb/SpongeBob_SquarePants_Render.png/revision/latest?cb=20190120193322&path-prefix=protagonist',
	  				name: 'SpongeBob'
	  			},
	  			{
	  				id: 10,
	  				photo: 'https://cdn.newsday.com/polopoly_fs/1.9901897.1423024182!/httpImage/image.JPG_gen/derivatives/landscape_768/image.JPG',
	  				name: 'Patrick'
	  			},
	  		]
	  	};
	}	


	render () {
		return (
			<View style={styles.bodyParent}>
				<Text style={styles.headerText}>
					Message
				</Text>
				<FlatList
					data={this.state.users}
					keyExtractor={(item) => {item.id.toString()}}
					renderItem={({item, index}) => {
						return(
							<RenderItem navigation={this.props.navigation} item={item} index={index}/>
						)
					}}
				/>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	bodyParent: {
		flex: 1,
		backgroundColor: 'white',
	},
	headerText: {
		fontSize: 25,
		margin: 30,
		fontWeight: 'bold',
	}
})

export default withNavigation(Chat);