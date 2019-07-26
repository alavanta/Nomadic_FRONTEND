import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  AsyncStorage
}
  from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';
import { fetchTestimonial } from '../public/redux/action';

const width = Dimensions.get('window').width
const widthImg = width * 0.94

class Testimonial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testimonial: this.props.testimonial,
    }
  }

  async componentDidMount() {
    await AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        this.props.dispatch(fetchTestimonial(result)).then(data => {
          this.setState({ testimonial: data.value.data.data });
        });
      }
    });

    this.subs = [
      this.props.navigation.addListener('willFocus', async () => {
        await AsyncStorage.getItem('token', (error, result) => {
          if (result) {
            this.props.dispatch(fetchTestimonial(result)).then(data => {
              this.setState({ testimonial: data.value.data.data });
            });
          }
        });
      })
    ];
  }

  renderTestimoni(item) {
    return (
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: item.image_url }} />
        <Text style={styles.title} numberOfLines={1}> {item.title} </Text>
        <Text style={styles.caption} numberOfLines={2}> {item.caption} </Text>
        <View style={styles.cardDecoration}>
          <View style={styles.tape} />
          <View style={{ height: width * 0.64 }} />
          <View style={styles.tape} />
        </View>
      </View>
    );
  }

  render() {
    if (this.state.testimonial == null) { return (<View></View>) }
    else {
      return (
        <View style={styles.container}>
          <View style={{ flex: 3, justifyContent: 'center', backgroundColor: '#FAFAFA' }}>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, color: '#666', fontWeight: '500' }}>Experiences</Text>
            <Carousel
              ref={ref => this.carouselRef = ref}
              data={this.state.testimonial}
              renderItem={({ item }) => this.renderTestimoni(item)}
              onSnapToItem={i => this.setState({ activeTab: i })}
              sliderWidth={width}
              itemWidth={width * 0.6}
              slideStyle={{ paddingHorizontal: 10 }}
              inactiveSlideOpacity={0.6}
              inactiveSlideScale={1}
            />
          </View>
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    testimonial: state.packages.testimonial
  };
};

export default connect(mapStateToProps)(withNavigation(Testimonial));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    height: width + 30,
    justifyContent: 'center'
  },
  card: {
    margin: 50,
    height: width * 0.6,
    width: width * 0.5,
    borderRadius: 3,
    backgroundColor: '#FFF',
    padding: 10,
    alignSelf: 'center',
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '10deg' }]
  },
  image: {
    height: '80%',
    width: '100%',
  },
  title: {
    fontSize: 13,
    alignSelf: 'flex-start',
  },
  caption: {
    fontSize: 10,
    marginRight: 10
  },
  cardDecoration: {
    position: 'absolute',
    transform: [{ rotate: '-37deg' }]
  },
  tape: {
    backgroundColor: '#f6ffba',
    height: (width / 5) / 5,
    width: width / 5,
    elevation: 1

  }
});