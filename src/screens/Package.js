import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    StatusBar,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';


class Package extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#FFF' barStyle='dark-content'/>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            name='arrowleft'
                            type='antdesign'
                            color='#444'
                            size={25} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', flex: 1, marginRight: 10, flexDirection: 'row', justifyContent: 'center' }}>
                        <TextInput placeholderTextColor='#999' placeholder="Type here..." style={styles.searchInput} />
                        <TouchableOpacity>
                            <Text style={styles.searchButton}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>

                    <TouchableOpacity style={styles.card}>
                        <Image source={{ uri: 'https://cdn.getyourguide.com/img/tour_img-991770-148.jpg' }} style={styles.image} />
                        <View>
                            <Text numberOfLines={1} style={styles.name}>Judul Package</Text>
                            <Text numberOfLines={2} style={styles.description}>Disini deskripsinya yg banyak banget cukDisini deskripsinya yg banyak banget cukDisini deskripsinya yg banyak banget cukDisini deskripsinya yg banyak banget cuk</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

export default withNavigation(Package);


const { height, width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#FFF',
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        elevation: 5
    },
    searchInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC',
        marginHorizontal: 10,
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor:'rgba(30,30,30,0.1)',
    },
    searchButton: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#555',
        padding: 8,
        backgroundColor: '#555',
        color: '#FFF',
        elevation:4
    },
    body: {
        backgroundColor: '#FFF',
        margin: 10
    },
    card: {
        padding: 7,
        borderRadius: 2,
        elevation: 3,
        backgroundColor: '#FFF'
    },
    image: {
        borderRadius: 2,
        height: width / 3,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        margin: 4,
        color: '#555',
    },
    description: {
        margin: 4,

    }
})