import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

//=============== Icons ================//

import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

//======== React Native Elements ========//

import Header from './Header'

import {
    Button
} from 'react-native-elements'

import LinearGradient from 'react-native-linear-gradient';

import DateTimePicker from "react-native-modal-datetime-picker";



class Checkout extends Component {


    constructor(props) {
        super(props);

        const price = 458000
        const totalPassenger = 1

        this.state = {
            isDateTimePickerVisible: false,
            date: '',
            totalPassenger: 1,
            price: 547000,
        };
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
 
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({
            date: date
        })

        this.hideDateTimePicker();
    };

    totalPassengerChange = (value) => {
        this.setState({
            totalPassenger: value
        })
    }


    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header navigation={this.props.navigation} title="Checkout" />
                <View style={styles.background}>
                    <LinearGradient colors={['#F4A386','#EF4453']} style={styles.redBackground}>

                    </LinearGradient>
                    <View style={styles.whiteBackground}>

                    </View>
                </View>

                <View style={styles.package}>
                    <Text style={styles.price}>
                       Rp {this.state.price * this.state.totalPassenger}
                    </Text>
                    <View style={styles.imageWrap}>
                        <Image 
                            style={styles.image}
                            source={{uri: 'https://img.inews.id/media/822/files/inews_new/2018/06/29/prambanan1.jpg'}}
                        />
                    </View>
                </View>

                <ScrollView style={styles.container}>
                    
                    <View style={[styles.form, {
                        flexDirection: 'row',
                        alignItems: 'flex-end'
                    }]}>

                        <View style={{flex: 1}}>
                            <TextInput 
                                placeholder="Date" 
                                style={styles.textInput} 
                                value={this.state.date.toString()}
                                editable={false}
                            />
                        </View>

                        <Button 
                            buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
                            icon={
                                <Fontisto
                                  name="date"
                                  size={25}
                                  color="#ff4453"
                                />
                            }
                            onPress={this.showDateTimePicker}
                        />    
                    </View>
                    <View style={[styles.form, {
                        flexDirection: 'row',
                        alignItems: 'flex-end'
                    }]}>

                        <View>
                            <TextInput 
                                placeholder="Total Passenger" 
                                style={styles.textInput}
                                onChangeText={this.totalPassengerChange}
                                value={this.state.totalPassenger.toString()}
                                keyboardType={'numeric'}
                                maxLength={3}
                            />
                        </View>

                        <Button 
                            buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
                            icon={
                                <AntDesign
                                  name="addusergroup"
                                  size={25}
                                  color="#ff4453"
                                />
                            }
                        />

                    </View>

                    <Text style={{fontSize: 18, marginTop: 30}}>
                        Traveler Information
                    </Text>

                    <View>
                        <TextInput 
                            placeholder="Full Name" 
                            style={styles.textInput}
                            
                        />
                    </View>

                    <View>
                        <TextInput 
                            placeholder="Phone Number (for Emergency)" 
                            style={styles.textInput}
                            keyboardType={'numeric'}
                            maxLength={12}
                        />
                    </View>
                    <View>
                        <TextInput 
                            placeholder="Address" 
                            style={styles.textInput}

                        />
                    </View>

                    <View style={styles.buttonWrap}>
                        <Button
                            buttonStyle={styles.loginButton}
                            title="Checkout"
                        />
                    </View>
                    <View style={{height: 50}} />
                </ScrollView>


                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
                

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -999,
        flexDirection: 'column'
    },
    redBackground: {
        height: 230,
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15, 
    },
    whiteBackground: {
        flex: 1,
        backgroundColor: 'white'
    },
    package: {
        marginHorizontal: 20
    },
    price: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'flex-start'
    },
    imageWrap: {
        height: 150,
        marginTop: 10,
        borderRadius: 50,
        elevation: 10
    },
    image: {
        resizeMode: 'cover',
        height: '100%',
        borderRadius: 10,
        zIndex: -99
    },
    container: {
        height: 300,
        backgroundColor: 'white',
        padding: 20,
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
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#FF4453'
    },
})

export default Checkout;
