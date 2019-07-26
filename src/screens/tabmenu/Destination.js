import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    TextInput,
    AsyncStorage
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';

//============= Reducer =============//
import { fetchPackages } from '../../public/redux/action';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            search: ''
        };
    }

    async componentWillMount() {
        await AsyncStorage.getItem('token', (error, result) => {
            if (result) {
                this.props.dispatch(fetchPackages(result)).then(data => {
                    this.setState({ data: data.value.data.data });
                });
            }
        });
    }

    async packagesSearch(search) {
        await AsyncStorage.getItem('token', (error, result) => {
            if (result) {
                this.props.dispatch(fetchPackages(result, search)).then(data => {
                    this.setState({ data: data.value.data.data });
                });
            }
        });
    }

    kFormatter = (num) => {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }

    renderContent = () => {
        if (this.state.data !== null) {
            return (
                <FlatList
                    style={{height:'100%'}}
                    data={this.state.data}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('PackageDetail', {
                                        packageId: item.id
                                    })
                                }
                                style={styles.card}
                            >
                                <Image
                                    source={{
                                        uri: item.package_image
                                    }}
                                    style={styles.image}
                                />
                                <View>
                                    <Text numberOfLines={1} style={styles.name}>
                                        {item.package_name}
                                    </Text>
                                    <Text numberOfLines={2} style={styles.description}>
                                        {item.package_description}
                                    </Text>
                                </View>
                                <View style={styles.priceBullet}>
                                    <Text style={styles.price}>Rp{this.kFormatter(item.package_price)}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    )}
                />
            );
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
                <View style={styles.header}>
                    <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 30, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 19, fontWeight: '500' }}>PACKAGES</Text>
                    </View>
                </View>
                <View style={styles.body}>{this.renderContent()}</View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        packages: state.packages.data
    };
};

export default connect(mapStateToProps)(withNavigation(Destination));

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    body: {
        backgroundColor: '#FFF',
        flex:1
    },
    list:{
        padding:20
    },
    card: {
        padding: 7,
        borderRadius: 2,
        elevation: 3,
        backgroundColor: '#FFF'
    },
    image: {
        borderRadius: 2,
        height: width / 3
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        margin: 4,
        color: '#555'
    },
    description: {
        margin: 4
    },
    priceBullet:{
        position:'absolute',
        backgroundColor:'#EF4453',
        width:width/5,
        height:width/5,
        borderRadius:(width/5)/2,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'flex-end',
        bottom:45,
        elevation:4
    },
    price:{
        color:'#FFF'
    }
});
