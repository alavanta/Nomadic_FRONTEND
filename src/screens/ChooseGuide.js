import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  AsyncStorage
} from 'react-native';

import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { connect } from 'react-redux';
import { fetchTourGuide } from '../public/redux/action';

const { width, height } = Dimensions.get('window');

class ChooseGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: this.props.navigation.getParam('selectedItem'),
      guide: [],
      data: [
        {
          id: 1,
          guide_name: 'Ahmad Hadi Jaelani',
          guide_email: 'ahmadhadijaelani@gmail.com',
          guide_photo:
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/musician-shawn-mendes-performs-on-nbcs-today-at-rockefeller-news-photo-965176864-1563915069.jpg',
          guide_abilities:
            'bisa segalanya, bisa bahasa semutjbja jhgjgchfddrg vgvghghjjkh hvhvjjkhjkhjkn bmnbnb hvjhvjhvjkhvjkh sdkdb  wsbdjkwa,sbfjsabfjasbkjcbaws,kdnsam, jjhasbjkbjbjkb;jkvafs',
          guide_gender: 'M',
          guide_age: 18
        },
        {
          id: 2,
          guide_name: 'Ahmad Hadi Jaelani',
          guide_email: 'ahmadhadijaelani@gmail.com',
          guide_photo:
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/musician-shawn-mendes-performs-on-nbcs-today-at-rockefeller-news-photo-965176864-1563915069.jpg',
          guide_abilities: 'bisa segalanya, bisa bahasa semut',
          guide_gender: 'F',
          guide_age: 18
        }
      ]
    };
  }

  async componentDidMount() {
    await AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        this.props.dispatch(fetchTourGuide(result)).then(data => {
          this.setState({ guide: data.value.data.data });
        });
      }
    });

    this.subs = [
      this.props.navigation.addListener('willFocus', async () => {
        await AsyncStorage.getItem('token', (error, result) => {
          if (result) {
            this.props.dispatch(fetchTourGuide(result)).then(data => {
              this.setState({ guide: data.value.data.data });
            });
          }
        });
      })
    ];
  }

  componentWillUnmount = () => {
    this.subs.forEach(sub => {
      sub.remove();
    });
  };

  chooseHandler = item => {
    this.props.navigation.navigate('Checkout', {
      selectedItem: this.state.selectedItem,
      userToken: this.state.userToken,
      selectedGuide: item.id
    });
  };

  renderTestimoni(item) {
    return (
      <View style={styles.card}>
        <View style={{ flex: 1, width: '100%' }}>
          <View
            style={{ alignItems: 'center', alignSelf: 'center', width: '100%' }}
          >
            <Image style={styles.image} source={{ uri: item.guide_photo }} />
            <Text style={styles.name} numberOfLines={1}>
              {' '}
              {item.guide_name}{' '}
            </Text>
          </View>
          <View style={{ margin: 5, marginTop: 10 }}>
            <Text style={styles.biodata} numberOfLines={1}>
              Age : {item.guide_age}{' '}
            </Text>
            <Text style={styles.biodata} numberOfLines={1}>
              Gender :{' '}
              {item.guide_gender == 'M'
                ? 'Male'
                : item.guide_gender == 'F'
                ? 'Female'
                : 'Unknow'}{' '}
            </Text>
          </View>
          <View style={{ margin: 5 }}>
            <Text style={styles.title}>Summary :</Text>
            <Text style={styles.description} numberOfLines={6}>
              {' '}
              {item.guide_abilities}{' '}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.chooseHandler(item)}
          style={styles.choose}
        >
          <Text style={{ color: '#FFF' }}>CHOOSE</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            backgroundColor: '#FAFAFA'
          }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrowleft" type="antdesign" color="#555" size={25} />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 20,
                color: '#666',
                fontWeight: '500'
              }}
            >
              Choose Your Tour Guide
            </Text>
          </View>
          <Carousel
            ref={ref => (this.carouselRef = ref)}
            data={this.state.guide}
            renderItem={({ item }) => this.renderTestimoni(item)}
            onSnapToItem={i => this.setState({ activeTab: i })}
            sliderWidth={width}
            itemWidth={width * 0.9}
            slideStyle={{ paddingHorizontal: 10 }}
            inactiveSlideOpacity={0.6}
            inactiveSlideScale={1}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    packages: state.packages.data
  };
};

export default connect(mapStateToProps)(withNavigation(ChooseGuide));

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  card: {
    margin: 50,
    height: width * 1.2,
    width: width * 0.8,
    borderRadius: 3,
    backgroundColor: '#FFF',
    padding: 20,
    alignSelf: 'center',
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: width * 0.3,
    width: width * 0.3,
    margin: 15,
    borderRadius: width * 0.15,
    alignSelf: 'center'
  },
  name: {
    fontSize: 17,
    color: '#000',
    marginBottom: 10,
    marginLeft: 5
  },
  title: {
    fontSize: 16
  },
  biodata: {
    fontSize: 13
  },
  description: {
    fontSize: 13
  },
  choose: {
    backgroundColor: '#EF4453',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 3
  }
});
