import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
}
from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const width = Dimensions.get('window').width
const widthImg = width * 0.94

export default class LoopCarousel extends Component {
    ads = [
        <Image style={styles.image} source={{uri:   'https://media.travelingyuk.com/wp-content/uploads/2018/10/cover-Pink-girl-visit-Prambanan-Temple-at-the-sunset-time-Copy-1.jpg'}} />,
        <Image style={styles.image} source={{uri:   'https://tripjogja.co.id/wp-content/uploads/2017/10/the-lost-world-castle-jogja-dunia-yang-hilang.png'}} />,
        <Image style={styles.image} source={{uri:   'https://media.travelingyuk.com/wp-content/uploads/2017/08/page-24.jpg'}} />,
        <Image style={styles.image} source={{uri:   'https://dolandolen.com/wp-content/uploads/2015/11/Brown-Canyon-Cover.jpg'}} />,
        <Image style={styles.image} source={{uri:   'https://www.seomedan.com/wp-content/uploads/2018/05/paket-tour-jogja.jpg'}} />,
        <Image style={styles.image} source={{uri:   'https://www.mediawisata.id/wp-content/uploads/10-Tempat-Wisata-Alam-di-Jogja-Terbaru-Yang-Bagus-Lagi-Hits-2019.jpg'}} />,
    ]
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:3, justifyContent:'center'}}>
                        <Carousel
                            ref={ ref => this.carouselRef = ref }
                            data={ this.ads }
                            renderItem={ ({ item }) => item }
                            onSnapToItem={ i => this.setState({ activeTab : i }) }
                            sliderWidth={ width }
                            itemWidth={ widthImg }
                            slideStyle={{paddingHorizontal:4}}
                            inactiveSlideOpacity={ 0.6 }
                            inactiveSlideScale={ 1 }
                            loop={true}
                            autoplay={true}
                            autoplayInterval={1500}
                        />
                </View>   
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:15,
        height:130,
        justifyContent:'center'
    },
    image: {
        height: (width * 0.35),
        width: width * 0.93,
        borderRadius: 3,
        alignSelf: 'center',
    },
});