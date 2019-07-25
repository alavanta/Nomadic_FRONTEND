import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class Splash extends Component {
    render (){
        return (
                <LinearGradient colors={['#F4A386','#EF4453']} style={styles.linearGradient}>
                    <StatusBar backgroundColor='#F4A386' barStyle='dark-content' />
                    <Image source={require('../assets/icon.png')} style={styles.logoSplash}/>
                </LinearGradient>
        );
    }

};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    logoSplash: {
        width: 120,
        height: 40,
    }
});
