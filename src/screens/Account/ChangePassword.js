import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Entypo from 'react-native-vector-icons/dist/Entypo';

class ChangePassword extends Component {
    constructor(props) {
		super(props);

		this.state = {
			oldPassword: '',
            newPassword: '',
            errOldPassword: '',
			errNewPassword: '',
			confirmNewPassword: '',
			errConfirmNewPassword: '',
		};
	}

	changePassword = async (otp, newPass) => {
		await this.props.dispatch(changePass(otp, newPass)).then((success) => {
			Alert.alert('Success', 'Password has been changed, please login your account again !')
			this.props.navigation.navigate('Login')
		}).catch(err =>{
			Alert.alert('Error','Something wrong on otp code');
		});
	}

	oldPassword = (oldPassword) => {
        if (oldPassword.length < 6) {
            this.setState({
                errOldPassword: 'Password must more than 6 character'
            })
            this.setState({ oldPassword })
            return false;
        } else {
            this.setState({
                oldPassword: oldPassword,
                errOldPassword: false
            })
        }
	}

	passwordChange = (newPassword) => {

		if (this.state.newPassword.length < 5) {

			this.setState({

				errNewPassword: 'Password should be at least 6 characters',
				newPassword: newPassword,

			})

            return false;
		} else {

			this.setState({

				errNewPassword: false,
				newPassword: newPassword,

			})
		}
	}

	confirmPasswordChange = async (confirmNewPassword) => {

		await this.setState({

			confirmNewPassword: confirmNewPassword
		})

		if (this.state.confirmNewPassword !== this.state.newPassword) {

			this.setState({

				errConfirmNewPassword: 'Password not Match',

			})
		} else {

			this.setState({
				errConfirmNewPassword: false,
			})
		}
	}



	render() {
		return (
			<View style={styles.bodyParent}>

				<View style={styles.parentHeader}>
					<Button
						buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
						icon={
							<Entypo
								name="chevron-left"
								size={25}
								color="black"
							/>
						}
						onPress={() => {

							this.props.navigation.goBack()
						}}
					/>
					<View style={styles.textWrap}>
						<Text style={styles.headerText}>Change Password</Text>
					</View>
				</View>


				<View style={styles.imageWrap}>
					<Image
						style={styles.welcomeImage}
						source={require('../../assets/undraw_secure_data_0rwp.png')}
					/>
				</View>

				<View style={styles.bodyContain}>

					<View style={{ width: '100%', paddingHorizontal: 30 }}>

						<View style={styles.form}>

							<TextInput
								placeholder="Old Password"
								style={styles.textInput}
								value={this.state.oldPassword}
								onChangeText={this.oldPassword}
								secureTextEntry={true}
                                
							/>
							<Text style={{ color: 'red', top: 5, left: 10 }}>{this.state.errOldPassword}</Text>
						</View>

						<View style={styles.form}>

							<TextInput
								placeholder="New Password"
								style={styles.textInput}
								value={this.state.newPassword}
								onChangeText={this.passwordChange}
								secureTextEntry={true}
							/>
							<Text style={{ color: 'red', top: 5, left: 10 }}>{this.state.errNewPassword}</Text>
						</View>

						<View style={styles.form}>

							<TextInput
								placeholder="Re-type New Password"
								style={styles.textInput}
								value={this.state.confirmNewPassword}
								onChangeText={this.confirmPasswordChange}
								secureTextEntry={true}
							/>
							<Text style={{ color: 'red', top: 5, left: 10 }}>{this.state.errConfirmPassword}</Text>
						</View>

						<View style={styles.buttonWrap}>
							<Button
								disabled={
									this.state.errPassword !== false ? true
										: this.state.errConfirmPassword !== false ? true
											: false
								}
								buttonStyle={styles.loginButton}
								title="Next"
								onPress={() => {
									this.changePassword(this.state.otp, this.state.password)
								}}
							/>
						</View>

					</View>

				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	bodyParent: {
		flex: 1,
		backgroundColor: 'white'
	},
	imageWrap: {
		flex: 1,
		zIndex: -999,
		alignItems: 'flex-start',
		top: -350,
		right: -100,
		position: 'absolute'
	},
	welcomeImage: {
		width: 450,
		resizeMode: 'contain',
		paddingVertical: 0,
		transform: [{ rotate: '-220deg' }]
	},
	parentHeader: {
		flexDirection: 'row',
		height: 100,
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	textWrap: {
		flex: 1,
		alignItems: 'flex-end'
	},
	headerText: {
		fontSize: 18,
		fontWeight: 'bold',
		right: 20
	},
	bodyContain: {
		flex: 1,
		justifyContent: 'center'
	},
	form: {
		width: '100%'
	},
	titleInput: {
		fontSize: 18,
		marginLeft: 10,
		marginBottom: 10,
	},
	textInput: {
        borderWidth: 1,
        borderRadius: 15,
		borderColor: '#FF4453'
	},
	buttonWrap: {
		width: '100%',
		marginTop: 20
	},
	loginButton: {
		backgroundColor: '#FF4453',
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		paddingVertical: 7
	}
})


// const mapStateToProps = state => {
// 	return {
// 		data: state.user.data,
// 	};
// };

export default withNavigation(ChangePassword);