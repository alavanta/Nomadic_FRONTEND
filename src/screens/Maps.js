import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class Maps extends Component {
    state = {
        destinations:this.props.navigation.getParam('destinations'),
        markers: this.props.navigation.getParam('destinations'),
        region: {
            latitude: 45.52220671242907,
            longitude: -122.6653281029795,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
    };

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }
    componentDidMount() {
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.state.markers.length) {
                index = this.state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const marker = this.state.markers[index];
                    this.map.animateToRegion(
                        {
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    }

    render() {
        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                ((index - 1) * CARD_WIDTH) + 20,
                (index * CARD_WIDTH) + 20,
                ((index + 1) * CARD_WIDTH) + 20,
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });

        return (
            <View style={styles.container}>
                <MapView
                    ref={map => this.map = map}
                    initialRegion={this.state.region}
                    style={styles.container}
                >
                    {this.state.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker key={index} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]} />
                                    <View style={styles.marker}><Text style={{ color: '#FFF', fontSize: 10, alignItems: 'center' }}>{index + 1}</Text></View>
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backButton}>
                    <Icon
                        name="arrowleft"
                        type="antdesign"
                        color="#555"
                        size={25}
                    />
                </TouchableOpacity>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >
                    {this.state.markers.map((marker, index) => (
                        <View style={styles.card} key={index}>
                            <Image
                                source={{ uri: marker.destination_image }}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardTitle}>{index + 1}. {marker.destination_name}</Text>
                                <Text numberOfLines={2} style={styles.cardDescription}> {marker.destination_description}</Text>
                            </View>
                        </View>
                    ))}
                </Animated.ScrollView>
            </View>
        );
    }
}

export default withNavigation(Maps);

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0152;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 4,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
    },
    backButton: {
        position:'absolute',
        backgroundColor:'#FFF',
        margin:20,
        height:40,
        width:40,
        alignItems:'center',
        justifyContent:'center',
        elevation:3,
        borderRadius:20
    },
    cardTitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 10,
        marginTop: 5,
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40
    },
    marker: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#FFF',
        borderWidth: 1,
        backgroundColor: "rgba(255,10,10, 1)",
    },
    ring: {
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: "rgba(255,10,10, 0.3)",
        position: "absolute",
    },
});