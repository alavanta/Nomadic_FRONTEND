import React,{Component} from 'react';
import { 
	View, 
	Text,
	ActivityIndicator,
	StatusBar,
	AsyncStorage
} from 'react-native';

class AuthLoading extends Component {

	constructor(props) {
	  	super(props);
	
	  	StatusBar.setHidden(true);

	}

	componentDidMount() {
		AsyncStorage.getItem('login', (error, result) => {
			if (result) {
				this.props.navigation.navigate('App')
			} else {
				this.props.navigation.navigate('Auth')
			}
		})
	}

    render(){
        return(
            <View style={{
				flex: 1,
				justifyContent: 'center',
				AlignItems: 'center'
			}}>
				<ActivityIndicator size="large" color="#EF4453" />
			</View>
        )
    }
}

export default AuthLoading;