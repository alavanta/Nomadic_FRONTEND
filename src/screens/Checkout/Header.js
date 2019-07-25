import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import {withNavigation} from 'react-navigation';
import { Icon } from 'react-native-elements';

//=============== Icons ================//

import Entypo from 'react-native-vector-icons/dist/Entypo';

//======== React Native Elements ========//

import {
    Button
} from 'react-native-elements'


class Checkout extends Component {
    render() {
        return (
            <View style={styles.parentHeader}>
                <Button 
                    buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
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
                    <Text style={styles.headerText}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parentHeader: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    textWrap: {
        flex: 1,
        alignItems: 'flex-end'
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        right: 20
    }
})

export default withNavigation(Checkout);
