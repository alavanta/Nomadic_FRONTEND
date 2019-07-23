import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { Avatar, Icon, ListItem } from 'react-native-elements';

class Account extends Component {

    constructor() {
        super()
        this.state = {
            modalVisible: false
        }
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
                    <View style={styles.line}></View>
                    <TouchableOpacity style={styles.accountOption}>
                        <View style={{ alignSelf: 'center', margin: 10 }}>
                            <Text>Notifications</Text>
                        </View>
                        <View style={{ alignSelf: 'center', marginRight: 10 }} >
                            <Icon name='ios-arrow-forward' type='ionicon' color='#999999' />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity style={styles.accountOption}>
                        <View style={{ alignSelf: 'center', margin: 10 }}>
                            <Text>Edit Profile</Text>
                        </View>
                        <View style={{ alignSelf: 'center', marginRight: 10 }} >
                            <Icon name='ios-arrow-forward' type='ionicon' color='#999999' />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity style={styles.accountOption}>
                        <View style={{ alignSelf: 'center', margin: 10 }}>
                            <Text>Change Password</Text>
                        </View>
                        <View style={{ alignSelf: 'center', marginRight: 10 }} >
                            <Icon name='ios-arrow-forward' type='ionicon' color='#999999' />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <TouchableOpacity style={styles.accountOption} onPress={() => this.setModalVisible(true)}>
                        <View style={{ alignSelf: 'center', margin: 10 }}>
                            <Text>Logout</Text>
                        </View>
                        <View style={{ alignSelf: 'center', marginRight: 10 }} >
                            <Icon name='ios-arrow-forward' type='ionicon' color='#999999' />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                </View>
                
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
        borderColor: '#999999',
        margin: 10,
        height: '3%',
        backgroundColor: '#999999'
    },
    accountOption: {
        borderWidth: 2,
        borderColor: '#999999',
        flexDirection: 'row',
        height: '15%',
        justifyContent: 'space-between'
    }
})

export default Account;
