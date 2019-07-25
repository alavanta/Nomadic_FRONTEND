import React, { Component } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { fetchPackageById } from '../public/redux/action';
import { connect } from 'react-redux';

class PackageDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      package: {
        id: 1,
        name: 'Wisata Jogja',
        price: 500000,
        description:
          'Bandung merupakan salah satu kota terbesar di Indonesia. Bandung juga dijuluki sebagai paris van java. Semua ada di Bandung. Masyarakat yang ramah membuat Bandung menjadi salah satu kota dengan ketertiban yang tinggi. Tata kota yang apik dan fasilitas yang memadai membuat kota Bandung semakin maju.',
        included:
          'Included Bandung merupakan salah satu kota terbesar di Indonesia. Bandung juga dijuluki sebagai paris van java. Semua ada di Bandung. Masyarakat yang ramah membuat Bandung menjadi salah satu kota dengan ketertiban yang tinggi. Tata kota yang apik dan fasilitas yang memadai membuat kota Bandung semakin maju.',
        not_included:
          'Not Included Bandung merupakan salah satu kota terbesar di Indonesia. Bandung juga dijuluki sebagai paris van java. Semua ada di Bandung. Masyarakat yang ramah membuat Bandung menjadi salah satu kota dengan ketertiban yang tinggi. Tata kota yang apik dan fasilitas yang memadai membuat kota Bandung semakin maju.',
        notes:
          'Notes Bandung merupakan salah satu kota terbesar di Indonesia. Bandung juga dijuluki sebagai paris van java. Semua ada di Bandung. Masyarakat yang ramah membuat Bandung menjadi salah satu kota dengan ketertiban yang tinggi. Tata kota yang apik dan fasilitas yang memadai membuat kota Bandung semakin maju.',
        image:
          'https://www.thoughtco.com/thmb/V6Mz1MdaTkVXMhuA1GkGbC6v6NA=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-599927824-589770da3df78caebcf39797.jpg',
        destination: [
          {
            id: 1,
            name: 'Prambanan',
            city: 'Jogjakarta',
            image:
              'https://img.inews.id/media/822/files/inews_new/2018/06/29/prambanan1.jpg'
          },
          {
            id: 2,
            name: 'Prambanan',
            city: 'Jogjakarta',
            image:
              'https://img.inews.id/media/822/files/inews_new/2018/06/29/prambanan1.jpg'
          },
          {
            id: 3,
            name: 'Prambanan',
            city: 'Jogjakarta',
            image:
              'https://img.inews.id/media/822/files/inews_new/2018/06/29/prambanan1.jpg'
          },
          {
            id: 4,
            name: 'Prambanan',
            city: 'Jogjakarta',
            image:
              'https://img.inews.id/media/822/files/inews_new/2018/06/29/prambanan1.jpg'
          },
          {
            id: 5,
            name: 'Prambanan',
            city: 'Jogjakarta',
            image:
              'https://img.inews.id/media/822/files/inews_new/2018/06/29/prambanan1.jpg'
          },
          {
            id: 6,
            name: 'Prambanan',
            city: 'Jogjakarta',
            image:
              'https://img.inews.id/media/822/files/inews_new/2018/06/29/prambanan1.jpg'
          },
          {
            id: 7,
            name: 'Prambanan',
            city: 'Jogjakarta',
            image:
              'https://img.inews.id/media/822/files/inews_new/2018/06/29/prambanan1.jpg'
          },
          {
            id: 8,
            name: 'Prambanan',
            city: 'Jogjakarta',
            image:
              'https://img.inews.id/media/822/files/inews_new/2018/06/29/prambanan1.jpg'
          },
          {
            id: 9,
            name: 'Prambanan',
            city: 'Jogjakarta',
            image:
              'https://img.inews.id/media/822/files/inews_new/2018/06/29/prambanan1.jpg'
          }
        ]
      },
      scrollY: new Animated.Value(0),
      isLoading: true
    };
  }

  bookingHandler = () => {
    this.props.navigation.navigate('Checkout')
    console.warn('booking');
  };

  gotoMap = () => {
    // console.warn('Map');
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <View style={styles.destinations} key={item.id}>
      <View style={styles.destination}>
        <Image
          style={{ height: width / 4, width: width / 4 }}
          source={{ uri: item.image }}
        />
        <Text numberOfLines={1}>{item.name}</Text>
      </View>
    </View>
  );

  componentWillMount() {
    AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        let packageId = this.props.navigation.getParam('packageId');
        this.props.dispatch(fetchPackageById(result, packageId)).then(data => {
          this.setState({ isLoading: false });
        });
      }
    });
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.9],
      extrapolate: 'clamp'
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -(width * 0.3)],
      extrapolate: 'clamp'
    });

    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="red" animating={true} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.fill}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
            ])}
          >
            <View style={styles.priceTag}>
              <Text style={styles.subTitle}>{this.state.package.name}</Text>
              <Text style={styles.caption}>Rp{this.state.package.price}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.subTitle}>Description</Text>
              <Text style={styles.caption}>
                {this.state.package.description}
              </Text>
            </View>

            <View style={styles.description}>
              <Text style={styles.subTitle}>Destinations</Text>
              <FlatList
                data={this.state.package.destination}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                horizontal={true}
                style={styles.flatlist}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.description}>
              <Text style={styles.subTitle}>Included</Text>
              <Text style={styles.caption}>{this.state.package.included}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.subTitle}>Not included</Text>
              <Text style={styles.caption}>
                {this.state.package.not_included}
              </Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.subTitle}>Notes</Text>
              <Text style={styles.caption}>{this.state.package.notes}</Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.detailFooter}>
              <Text numberOfLines={1} style={{ color: '#000', fontSize: 16 }}>
                Rp{this.state.package.price}
              </Text>
              <Text numberOfLines={1} style={{ color: '#444', fontSize: 10 }}>
                {this.state.package.name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.bookingHandler()}
              style={styles.button}
            >
              <Text style={{ color: '#FFF', fontWeight: '500', fontSize: 16 }}>
                BOOKING
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.gotoMap()}
              style={styles.mapButton}
            >
              <Icon name="map" type="Entypo" color="#EF4453" size={25} />
            </TouchableOpacity>
          </View>
          <Animated.View style={[styles.header, { height: headerHeight }]}>
            <Animated.Image
              style={[
                styles.backgroundImage,
                {
                  opacity: imageOpacity,
                  transform: [{ translateY: imageTranslate }]
                }
              ]}
              source={{
                uri: this.state.package.image
              }}
            />
            <Animated.View>
              <View style={styles.bar}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                  <Icon
                    name="arrowleft"
                    type="antdesign"
                    color="#FFF"
                    size={25}
                  />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                  <Text numberOfLines={1} style={styles.name}>
                    {this.state.package.name}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    packages: state.packages
  };
};
export default connect(mapStateToProps)(withNavigation(PackageDetail));

const { height, width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = width;
const HEADER_MIN_HEIGHT = width * 0.4;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  fill: {
    flex: 1
    // paddingTop: HEADER_MAX_HEIGHT,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#EF4453',
    overflow: 'hidden',
    elevation: 4
  },
  headerContent: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  },
  bar: {
    height: '100%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 20
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover'
  },
  name: {
    color: '#FFF',
    fontSize: 18,
    marginRight: 10,
    marginLeft: 50
  },
  priceTag: {
    marginTop: HEADER_MAX_HEIGHT + 20,
    backgroundColor: '#FFF',
    padding: 10
  },
  description: {
    backgroundColor: '#FFF',
    marginTop: 20,
    padding: 10
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 16
  },
  caption: {
    fontSize: 12
  },
  footer: {
    backgroundColor: '#FFF',
    height: 50,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#EF4453',
    padding: 10,
    width: width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 5
  },
  detailFooter: {
    flex: 1
  },
  mapButton: {
    margin: 10
  },
  flatlist: {
    marginTop: 20
  },
  destinations: {
    margin: 10,
    elevation: 4
  },
  destination: {
    backgroundColor: '#FFF',
    elevation: 4,
    padding: 4,
    margin: 5
  },
  loading: {
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  }
});
