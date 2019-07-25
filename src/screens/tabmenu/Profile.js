import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableHighlight, Alert, AsyncStorage } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class Profile extends Component {

	constructor() {
		super()
		this.state = {
			modalVisible: false
		}
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	logout = async () => {
		await AsyncStorage.clear()
    	this.props.navigation.navigate('AuthLoading')
	}


	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#FFF' }}>

				<View style={styles.topContainer}>
					<View style={{ alignItems: 'center' }}>
						<Avatar size="large" rounded title="JD" />
						<Text style={{ fontSize: 35, fontWeight: 'bold' }}>John Doe</Text>
					</View>
				</View>

				<View style={styles.bottomContainer}>

					<View style={styles.line} />
					<TouchableOpacity style={styles.accountOption} onPress={() => this.props.navigation.navigate('Notification')}>
						<View style={{ alignSelf: 'center', margin: 10 }}>
							<Text>Notifications</Text>
						</View>
						<View style={{ alignSelf: 'center', marginRight: 10 }} >
							<Icon name='ios-arrow-forward' type='ionicon' color='#999999' />
						</View>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity style={styles.accountOption} onPress={() => this.props.navigation.navigate('ProfileEdit')}>
						<View style={{ alignSelf: 'center', margin: 10 }}>
							<Text>Edit Profile</Text>
						</View>
						<View style={{ alignSelf: 'center', marginRight: 10 }} >
							<Icon name='ios-arrow-forward' type='ionicon' color='#999999' />
						</View>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity style={styles.accountOption} onPress={() => this.props.navigation.navigate('ChangePassword')}>
						<View style={{ alignSelf: 'center', margin: 10 }}>
							<Text>Change Password</Text>
						</View>
						<View style={{ alignSelf: 'center', marginRight: 10 }} >
							<Icon name='ios-arrow-forward' type='ionicon' color='#999999' />
						</View>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity style={[styles.accountOption, {backgroundColor: '#EF4453'}]} onPress={() => this.setModalVisible(true)}>
						<View style={{ alignSelf: 'center', margin: 10 }}>
							<Text>Logout</Text>
						</View>
						<View style={{ alignSelf: 'center', marginRight: 10 }} >
							<Icon name='ios-arrow-forward' type='ionicon' color='#999999' />
						</View>
					</TouchableOpacity>
					<View style={styles.line} />
				</View>

				<Modal
					animationType='fade'
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setModalVisible(!this.state.modalVisible);
					}}>
					<View style={styles.modalTransparent}>
						<View style={{ flexDirection: 'column', backgroundColor: '#fff', borderRadius: 15, height: '20%', width: '60%' }}>
							<View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#00000020' }}>
								<Text style={{ fontSize: 19 }}>Are you sure want to log out?</Text>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 10, marginRight: 10, marginTop: 16 }}>
								<TouchableOpacity onPress={() => {this.logout()}} style={[styles.btnModal, { backgroundColor: '#62CA90', borderColor: '#62CA90', }]}>
									<Text>Yes</Text>
								</TouchableOpacity >
								<TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)} style={[styles.btnModal, { backgroundColor: '#E75E3F', borderColor: '#E75E3F', }]}>
									<Text>No</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	topContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EF4453',
		height: '30%'
	},
	bottomContainer: {
		width: '94%',
		height: '50%',
		marginTop: 20,
		alignContent: 'center',
		margin: 10
	},
	line: {
		borderWidth: 2,
		borderColor: '#f5f5f5',
		margin: 10,
		height: '3%',
		backgroundColor: '#f5f5f5'
	},
	accountOption: {
		borderWidth: 1,
		borderColor: '#999999',
		flexDirection: 'row',
		height: '15%',
		justifyContent: 'space-between',
		borderRadius: 5,
	},
	modalTransparent: {
		width: '100%',
		height: '100%',
		backgroundColor: '#00000090',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnModal: {
		borderWidth: 1,
		borderRadius: 10,
		width: '40%',
		alignItems: 'center'
	}
})

export default withNavigation(Profile);
