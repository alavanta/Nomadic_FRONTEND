import React, { Component } from 'react'
import {
	Animated,
	Image,
	ScrollView,
	Dimensions,
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import PackageMenu from '../../components/ExplorePackageMenu';

class Explore extends Component {

	constructor(props) {
		super(props);

		this.state = {
			headerImage: 'https://www.thoughtco.com/thmb/V6Mz1MdaTkVXMhuA1GkGbC6v6NA=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-599927824-589770da3df78caebcf39797.jpg',
			scrollY: new Animated.Value(0),
		};
	}

	_renderScrollViewContent() {
		const data = Array.from({ length: 30 });
		return (
			<View style={styles.scrollViewContent}>
				{data.map((_, i) =>
					<View key={i} style={styles.row}>
						<Text> </Text>
					</View>
				)}
			</View>
		);
	}

	render() {
		const headerHeight = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE],
			outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
			extrapolate: 'clamp',
		});
		const imageOpacity = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
			outputRange: [1, 1, 0],
			extrapolate: 'clamp',
		});
		const imageTranslate = this.state.scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE],
			outputRange: [0, -50],
			extrapolate: 'clamp',
		});
		return (
			<View style={styles.container}>
				<ScrollView
					style={styles.fill}
					scrollEventThrottle={16}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
					)}
				>

					<PackageMenu navigation={this.props.navigation} />

					{this._renderScrollViewContent()}

				</ScrollView>
				<Animated.View style={[styles.header, { height: headerHeight }]}>
					<Animated.Image
						style={[
							styles.backgroundImage,
							{ opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },
						]}
						source={{
							uri: this.state.headerImage
						}}
					/>
					<Animated.View>
						<View style={styles.bar}>
							<Image style={styles.icon} source={require('../../assets/icon.png')} />
							<TouchableOpacity onPress={() =>  this.props.navigation.navigate('Package')} style={styles.search}>
								<Text style={{ color: '#F8F8F8', fontSize: 12 }}>Search ... </Text>
							</TouchableOpacity>
						</View>
					</Animated.View>
				</Animated.View>
			</View>
		)
	}
}

export default withNavigation(Explore);

const { height, width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5'
	},
	fill: {
		flex: 1,
		paddingTop: HEADER_MAX_HEIGHT,
	},
	row: {
		height: 100,
		margin: 16,
		backgroundColor: '#FFF',
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: '#EF4453',
		overflow: 'hidden',
	},
	bar: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		flexWrap: 'wrap'
	},
	search: {
		marginLeft: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		padding: 8,
		width: '50%',
		borderWidth: 1,
		borderColor: '#F6F6F6',
		borderRadius: 5,
		justifyContent: 'center',
	},
	icon: {
		marginRight: 20,
		height: width / 15,
		width: (width / 15) * 3,
		marginBottom: 10
	},
	scrollViewContent: {
		marginTop: HEADER_MAX_HEIGHT,
	},
	backgroundImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		width: null,
		height: HEADER_MAX_HEIGHT,
		resizeMode: 'cover',
	},
});