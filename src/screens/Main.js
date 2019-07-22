import React,{Component} from 'react';
import { 
	View,
	Text,
	Image,
	StyleSheet,
	StatusBar,
	Dimensions
} from 'react-native';

import { Button } from 'react-native-elements';

class Main extends Component {

    render(){
        return(
            <View style={styles.bodyParent}>
            	<StatusBar 
					translucent
		        	barStyle="dark-content"
		        	backgroundColor="rgba(0, 0, 0, 0.0)" 
		        />

		        <View style={styles.containParent}>
		        	<Text style={styles.text}>
		        		Hello
		        	</Text>
		        	<Text style={styles.text}>
		        		Everyone!
		        	</Text>
		        	<Text style={styles.welcomeText}>
		        		Ready for the Trip?
		        	</Text>

		        </View>

		        <View style={styles.buttonParent}>

		        	<Button
					  	title="Register"
					  	buttonStyle={[
					  		styles.button,
					  		{
					  			backgroundColor: '#EF4453'
					  		}
					  	]}
					  	titleStyle={{color: 'white'}}
					/>

					<Button
					  	title="Login"
					  	buttonStyle={[
					  		styles.button,
					  		{
					  			backgroundColor: '#F4D886'
					  		}
					  	]}
					  	titleStyle={{color: 'rgba(0,0,0,0.7)'}}
					/>

		        </View>

		        <View style={styles.bgWrapper}>
		        	<Image
		        		source={require('../assets/bgMain.jpg')}
		        		style={styles.background}
		        	/>
		        </View>
            	
            </View>
        )
    }
}

export default Main;

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
	bodyParent: {
		flex: 1,
		backgroundColor: 'white',
		position: 'relative'
	},
	bgWrapper: {
		flex: 1,
		position: 'absolute',
		zIndex: -999,
	},
	background: {
		height: height,
		resizeMode: 'cover',
		left: width / -2,
	},
	containParent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingHorizontal: 30
	},
	buttonParent: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 20
	},
	button: {
		margin: 10,
		paddingVertical: 10,
		elevation: 3,
		borderRadius: 5
	},
	text: {
		fontSize: 60,
		color: 'black',
		fontWeight: 'bold',
		elevation: 3
	},
	welcomeText: {
		fontSize: 30,
		left: 2,
		top: 3,
		color: 'grey'
	}
})